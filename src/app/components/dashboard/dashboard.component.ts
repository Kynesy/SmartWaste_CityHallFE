import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeeStatistics } from 'src/app/models/fee-statistics';
import { WasteStatistics } from 'src/app/models/waste-statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { StorageService } from 'src/app/services/storage.service';
import { TaxService } from 'src/app/services/tax.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  year: number = new Date().getFullYear();
  userRole: string | undefined;
  userId: string | void | undefined;
  wasteStatsDataset: any = [
    { data: [], label: 'Numero KG', backgroundColor: ["#34A853", "#1264E0"] },
  ];
  paidFee: FeeStatistics = {
    year: 0,
    paid: 0,
    totalSortedWaste: 0,
    totalUnsortedWaste: 0,
    totalSortedTax: 0,
    totalUnsortedTax: 0
  }
  unpaidFee: FeeStatistics = {
    year: 0,
    paid: 0,
    totalSortedWaste: 0,
    totalUnsortedWaste: 0,
    totalSortedTax: 0,
    totalUnsortedTax: 0
  }
  wasteStats: WasteStatistics = {
    userId: '',
    year: 0,
    totalSortedWaste: 0,
    totalUnsortedWaste: 0
  }
  
  constructor(private storageService: StorageService, private route: ActivatedRoute, private taxService: TaxService, private statisticService: StatisticsService){}


  async ngOnInit() {
    this.userRole = this.route.snapshot.data['requiredRole'];
  
    if (this.userRole == 'ADMIN') {
      this.getAdminData();
    }
  
    if (this.userRole == 'USER') {
      if (this.storageService.isUserLogged()) {
        this.userId = this.storageService.getData("id")!;
        this.getUserData();
      }
    }
  }
  

  getAdminData(){
    this.statisticService.getCityStatistics(this.year).subscribe(
      (stats) => {
        this.wasteStats = stats;
        this.wasteStatsDataset[0].data = [this.wasteStats.totalSortedWaste, this.wasteStats.totalUnsortedWaste];
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
    this.statisticService.getSumAllofAllFeesByPayment(this.year, 0).subscribe(
      (unpaid) => {this.unpaidFee = unpaid},
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
    this.statisticService.getSumAllofAllFeesByPayment(this.year, 1).subscribe(
      (paid) => {this.paidFee = paid},
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }
  
  getUserData(){
    this.statisticService.getUserStatistics(this.userId!, this.year).subscribe(
      (stats) => {
        this.wasteStats = stats;
        this.wasteStatsDataset[0].data = [this.wasteStats.totalSortedWaste, this.wasteStats.totalUnsortedWaste];
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
    this.statisticService.getSumAllofAllUserFeesByPayment(this.userId!, this.year, 0).subscribe(
      (unpaid) => {this.unpaidFee = unpaid},
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
    this.statisticService.getSumAllofAllUserFeesByPayment(this.userId!, this.year, 1).subscribe(
      (paid) => {this.paidFee = paid},
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }
  
}

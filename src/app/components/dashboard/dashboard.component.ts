import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeeStatistics } from 'src/app/models/fee-statistics';
import { WasteStatistics } from 'src/app/models/waste-statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
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
  
  constructor(private route: ActivatedRoute, private taxService: TaxService, private statisticService: StatisticsService){}


  async ngOnInit() {
    this.userRole = this.route.snapshot.data['requiredRole'];
  
    if (this.userRole == 'ADMIN') {
      this.getAdminData();
    }
  
    if (this.userRole == 'USER') {
      this.userId = await this.getUserID().catch(error => {
        console.error("Error getting user ID: " + error);
      });
      if (this.userId) {
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

  getUserID(): Promise<string> {
    return new Promise((resolve, reject) => {
      /*
      this.authService.user$.subscribe(
        (profile: any) => {
          const profileJson = JSON.stringify(profile, null, 2);
          const profileData = JSON.parse(profileJson || "");
          const subField = profileData['sub'] || '';
          const subParts = subField.split('|');
  
          if (subParts.length === 2 && subParts[0] === 'auth0') {
            resolve(subParts[1]); // Resolve the Promise with the user ID
          } else {
            reject("Invalid sub field format");
          }
        },
        (error: any) => {
          reject("Error while getting user profile: " + error);
        }
      );
      */
    });
  }
  
}

import { Component, OnInit } from '@angular/core';
import { Fee } from 'src/app/models/fee';
import { WasteStatistics } from 'src/app/models/waste-statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TaxService } from 'src/app/services/tax.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
  wasteStatsList!: WasteStatistics[];
  lastIssuedTaxes: Fee[] | undefined;
  idList!: string[];

  constructor(
    private statService: StatisticsService,
    private taxService: TaxService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getAllId().subscribe(
      (response) => {
        this.idList = response;
      }
    );
  }

  calculateFees() {
    this.lastIssuedTaxes = undefined;

    const inputYear = prompt('Enter the YEAR for which you want to calculate Fees:');
    const year = parseInt(inputYear!, 10); // Parse the input as an integer
    if (isNaN(year)) {
      alert('Please enter a valid year.');
      return;
    }

    this.statService.getAllUsersWasteStats(this.idList, year).subscribe(
      (response) => {
        this.wasteStatsList = response;

        this.taxService.createAllTaxes(this.wasteStatsList).subscribe(
          (response) => {
            if(response.length != 0){
              this.lastIssuedTaxes = response;
            }else{
              this.lastIssuedTaxes = undefined;
            }
          }
        );
      }
    );
  }
}

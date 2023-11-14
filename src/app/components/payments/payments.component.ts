import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fee } from 'src/app/models/fee';
import { TaxService } from 'src/app/services/tax.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  feeList: Fee[] = [];
  year: number = new Date().getFullYear();
  userRole: string | undefined;
  userId: string | void | undefined;

  constructor(private route: ActivatedRoute, private taxService: TaxService, private toastService: ToastService) {}

  async ngOnInit(): Promise<void> {

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
    this.taxService.getAllTaxes().subscribe(
      (fees: Fee[]) => {
        this.feeList = fees;
      },
      (error: any) => {
        console.error('Error retrieving taxes:', error);
      }
    );
  }

  getUserData(){
    this.taxService.getAllUserTaxes(this.userId!).subscribe(
      (fees: Fee[]) => {
        this.feeList = fees;
      },
      (error: any) => {
        console.error('Error retrieving taxes:', error);
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

  payTax(taxId: string){
    this.taxService.payTax(taxId).subscribe(
      (response) => {
        console.log(response);
        this.toastService.showSuccessToast('Tax paid with success.');
        this.feeList = [];
        this.ngOnInit();
      }
    );
  }
}

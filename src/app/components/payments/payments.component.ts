import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fee } from 'src/app/models/fee';
import { StorageService } from 'src/app/services/storage.service';
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

  constructor(private storageService: StorageService, private route: ActivatedRoute, private taxService: TaxService, private toastService: ToastService) {}

  async ngOnInit(): Promise<void> {

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

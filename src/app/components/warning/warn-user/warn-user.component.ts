import { Component, OnInit } from '@angular/core';
import { Warning } from 'src/app/models/warning';
import { StorageService } from 'src/app/services/storage.service';
import { WarningService } from 'src/app/services/warning.service';

@Component({
  selector: 'app-warn-user',
  templateUrl: './warn-user.component.html',
  styleUrls: ['./warn-user.component.scss']
})
export class WarnUserComponent implements OnInit{
  warningList: Warning[] | undefined;
  userId: string | void | undefined;

  constructor(private storageService: StorageService, private warningService: WarningService){}

  async ngOnInit(): Promise<void> {
    this.userId = this.storageService.getData('id')!;
    
    if (this.userId) {
      this.warningService.getAllByUserID(this.userId).subscribe(
        (response: any) => {
          if(response.length != 0){
            this.warningList = response;
          }else{
            this.warningList = undefined;
          }
        }
      );
    }
  }

  delete(warningId: string){
    this.warningService.deleteByID(warningId).subscribe(
      (response: any) => {
        console.log(response);
        this.warningList = [];
        this.ngOnInit();
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Warning } from 'src/app/models/warning';
import { WarningService } from 'src/app/services/warning.service';

@Component({
  selector: 'app-warn-user',
  templateUrl: './warn-user.component.html',
  styleUrls: ['./warn-user.component.scss']
})
export class WarnUserComponent implements OnInit{
  warningList: Warning[] | undefined;
  userId: string | void | undefined;

  constructor(private warningService: WarningService, private authService: AuthService){}

  async ngOnInit(): Promise<void> {
    this.userId = await this.getUserID().catch(error => {
      console.error("Error getting user ID: " + error);
    });
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

  getUserID(): Promise<string> {
    return new Promise((resolve, reject) => {
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
    });
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

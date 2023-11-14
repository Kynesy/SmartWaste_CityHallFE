import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  constructor(@Inject(DOCUMENT) public document: Document) {}
  
  logout(){
    //this.authService.logout({ logoutParams: { returnTo: document.location.origin } })
  }
}

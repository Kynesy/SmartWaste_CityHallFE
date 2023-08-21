import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public authService: AuthService) {}
  
  logout(){
    this.authService.logout({ logoutParams: { returnTo: document.location.origin } })
  }
}

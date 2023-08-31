import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styles: [
  ]
})
export class LogoutButtonComponent implements OnInit {
  constructor(public auth: AuthService, @Inject(DOCUMENT) private doc: Document, private storageService: StorageService){}

  ngOnInit(): void {
  }

  logout(): void{
    this.storageService.clearData();
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin}});
  }
}

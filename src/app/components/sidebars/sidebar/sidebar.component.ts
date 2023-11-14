import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{
  constructor(private storageService: StorageService) {}
  
  email: string | null = null;
  role: string | null = null;

  isUserLogged(){
    this.role = this.storageService.getData("role");
    const userEmail = this.storageService.getData('email');
    if (userEmail) {
      this.email = userEmail.split('@')[0]; // Get the first part of the email before '@'
    }
    return this.storageService.isUserLogged();
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{
  constructor(private storageService: StorageService) {}
  
  username: string | null = null;
  role: string | null = null;

  isUserLogged(){
    this.role = this.storageService.getData("role");
    this.username = this.storageService.getData('username');
    return this.storageService.isUserLogged();
  }
}

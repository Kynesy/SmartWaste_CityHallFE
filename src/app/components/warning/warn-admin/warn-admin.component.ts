import { Component, OnInit } from '@angular/core';
import { Warning } from 'src/app/models/warning';
import { WasteStatistics } from 'src/app/models/waste-statistics';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { WarningService } from 'src/app/services/warning.service';

@Component({
  selector: 'app-warn-admin',
  templateUrl: './warn-admin.component.html',
  styleUrls: ['./warn-admin.component.scss']
})
export class WarnAdminComponent implements OnInit {
  idList!: string[];
  statList!: WasteStatistics[];
  warn: Warning = {
    id: null,
    userId: '',
    message: ''  
  };

  constructor(
    private userService: UserService,
    private statService: StatisticsService,
    private toastService: ToastService,
    private warningService: WarningService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.userService.getAllId().subscribe(
      (idList) => {
        this.idList = idList;
        this.statService.getAllUsersWasteStats(idList, new Date().getFullYear()).subscribe(
          (response) => {
            this.statList = response;
          }
        );
      }
    );
  }

  sensibilize(userId: string) {
    const message = prompt('Enter the message to send:');
    if (message) {
      this.warn.userId = userId;
      this.warn.message = message;
      this.warningService.createWarning(this.warn).subscribe(
        (response) => console.log(response)
      );
    }
  }
}

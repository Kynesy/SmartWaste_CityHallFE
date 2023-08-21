import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private route: ActivatedRoute){}
  userRole: string | undefined
  ngOnInit(): void {
    this.userRole = this.route.snapshot.data['requiredRole'];
  }

}

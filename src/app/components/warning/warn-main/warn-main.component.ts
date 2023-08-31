import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warn-main',
  templateUrl: './warn-main.component.html',
  styleUrls: ['./warn-main.component.scss']
})
export class WarnMainComponent implements OnInit{
  userRole: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userRole = this.route.snapshot.data['requiredRole'];
  }


}

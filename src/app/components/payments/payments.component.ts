import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit{

  constructor(private route: ActivatedRoute){}

  userRole: string | undefined

  ngOnInit(): void {
    this.userRole = this.route.snapshot.data['requiredRole'];
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './order-details.component.html',
  standalone: true
})
export class OrderDetailsComponent implements OnInit {
  bill: any;
  billId!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.billId = Number(this.route.snapshot.paramMap.get('billId'));
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8888/billing-service/api/bills/' + this.billId)
      .subscribe({
        next: (data) => {
          this.bill = data;
        },
        error: (error) => {
          console.error('Error fetching bills:', error);
        }
      });
  }
}

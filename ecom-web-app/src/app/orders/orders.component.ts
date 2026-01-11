import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './orders.component.html',
  standalone: true
})
export class OrdersComponent implements OnInit {
  bills: any;
  customerId!: number;
  loading = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.customerId = params['customerId'];
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.http.get<any>('http://localhost:8888/billing-service/api/bills/search/byCustomerId?customerId=' + this.customerId)
      .subscribe({
        next: (data) => {
          // Spring Data REST search endpoints return array directly or _embedded structure
          if (Array.isArray(data)) {
            this.bills = { _embedded: { bills: data } };
          } else if (data._embedded) {
            this.bills = data;
          } else {
            this.bills = { _embedded: { bills: [] } };
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching bills:', error);
          this.error = 'Unable to load orders. Ensure billing service is running.';
          this.loading = false;
        }
      });
  }

  getOderDetails(b: any) {
    this.router.navigateByUrl('/order-details/' + b.id);
  }
}

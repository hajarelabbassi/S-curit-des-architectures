import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './customers.component.html',
  standalone: true
})
export class CustomersComponent implements OnInit {
  customers: any;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.http.get<any>('http://localhost:8888/customer-service/api/customers')
      .subscribe({
        next: (data) => {
          // Spring Data REST returns PagedModel with _embedded structure
          console.log('Customers data received:', data);
          if (data._embedded && data._embedded.customers) {
            this.customers = { _embedded: { customers: data._embedded.customers } };
          } else if (Array.isArray(data)) {
            this.customers = { _embedded: { customers: data } };
          } else {
            this.customers = data;
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching customers:', error);
          this.error = 'Failed to load customers. Please check if backend services are running.';
          this.loading = false;
        }
      });
  }

  getOders(c: any) {
    this.router.navigateByUrl('/orders/' + c.id);

  }
}

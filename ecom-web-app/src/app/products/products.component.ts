import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [
    NgForOf,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './products.component.html',
  standalone: true
})
export class ProductsComponent implements OnInit {
  products: any;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.error = null;
    this.http.get<any>('http://localhost:8888/inventory-service/api/products')
      .subscribe({
        next: (data) => {
          // Spring Data REST returns PagedModel with _embedded structure
          console.log('Products data received:', data);
          if (data._embedded && data._embedded.products) {
            this.products = { _embedded: { products: data._embedded.products } };
          } else if (Array.isArray(data)) {
            this.products = { _embedded: { products: data } };
          } else {
            this.products = data;
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.error = 'Failed to load products. Please check if backend services are running.';
          this.loading = false;
        }
      });
  }


}

import { Component, OnInit } from '@angular/core';
import { Product,ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-display-product',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './display-product.component.html',
  styleUrl: './display-product.component.css'
})
export class DisplayProductComponent implements OnInit{
  products: Product[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error fetching products: ',err)
    });
  }

}

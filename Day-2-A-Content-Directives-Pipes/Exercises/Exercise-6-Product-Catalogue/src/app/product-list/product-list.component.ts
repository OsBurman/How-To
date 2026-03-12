// product-list.component.ts — Exercise 6: Product Catalogue
// Demonstrates: built-in pipes (date, currency, uppercase)
// The pipe classes are already imported below — your task is to APPLY them in the template.

import { Component } from '@angular/core';
import { DatePipe, CurrencyPipe, UpperCasePipe, SlicePipe } from '@angular/common';

// The shape of one product
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  launchDate: string; // ISO 8601 date string — e.g., '2024-03-15'
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  // DatePipe, CurrencyPipe, UpperCasePipe, and SlicePipe are imported here
  // so they are available in the template. You do NOT need to change this file.
  // Open product-list.component.html and apply the pipes in the template.
  imports: [DatePipe, CurrencyPipe, UpperCasePipe, SlicePipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  readonly products: Product[] = [
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones',
      category: 'audio',
      price: 249.99,
      launchDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Ultra Slim Laptop Stand',
      category: 'accessories',
      price: 49.95,
      launchDate: '2023-11-01'
    },
    {
      id: 3,
      name: 'Smart Home Hub',
      category: 'smart home',
      price: 129.00,
      launchDate: '2024-01-20'
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      category: 'peripherals',
      price: 175.50,
      launchDate: '2023-08-05'
    },
    {
      id: 5,
      name: 'Portable SSD 2TB',
      category: 'storage',
      price: 89.99,
      launchDate: '2024-06-10'
    },
    {
      id: 6,
      name: 'Webcam Pro 4K',
      category: 'accessories',
      price: 199.00,
      launchDate: '2022-12-03'
    }
  ];
}

/**
 * order-list.component.ts
 *
 * CONCEPTS: @switch / @case, [ngClass]
 *
 * OrderListComponent displays a list of orders.
 * Each order has a status that should be rendered as a coloured badge.
 *
 * TASKS (all work is in order-list.component.html and order-list.component.css):
 * 1. Replace the raw {{ order.status }} text with a @switch block that
 *    renders a human-readable label for each status value.
 * 2. Add [ngClass] to each <span> inside the switch cases to apply a
 *    colour class matching the status (e.g., 'badge-pending').
 * 3. Define the badge CSS classes in order-list.component.css.
 *
 * NgClass is already imported below.
 */

import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

// Order interface — defines the shape of each order object
export interface Order {
  id: number;
  reference: string;
  customer: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    NgClass  // required for [ngClass] in the template; from @angular/common
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  // Sample order data — already provided; do not change
  readonly orders: Order[] = [
    { id: 1, reference: 'ORD-001', customer: 'Alice Martin',  total: 59.99,  status: 'delivered'  },
    { id: 2, reference: 'ORD-002', customer: 'Bob Chen',      total: 124.50, status: 'shipped'     },
    { id: 3, reference: 'ORD-003', customer: 'Cara Singh',    total: 34.00,  status: 'processing'  },
    { id: 4, reference: 'ORD-004', customer: 'David Park',    total: 249.99, status: 'pending'     },
    { id: 5, reference: 'ORD-005', customer: 'Elena Rossi',   total: 18.75,  status: 'cancelled'   },
    { id: 6, reference: 'ORD-006', customer: 'Finn O\'Brien', total: 89.00,  status: 'processing'  },
  ];

}

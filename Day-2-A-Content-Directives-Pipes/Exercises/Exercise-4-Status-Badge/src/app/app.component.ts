/**
 * app.component.ts
 *
 * Root component for Exercise 4 — Order Status Badge.
 * This file is complete — no changes needed here.
 */

import { Component } from '@angular/core';
import { OrderListComponent } from './order-list/order-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrderListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

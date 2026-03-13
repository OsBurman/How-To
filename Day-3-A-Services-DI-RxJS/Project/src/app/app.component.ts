import { Component } from '@angular/core';
import { CartHeaderComponent } from './cart-header/cart-header.component';
import { CartPageComponent } from './cart-page/cart-page.component';

// ─── AppComponent ─────────────────────────────────────────────────────────────
// Shell component. Composes the header and the main cart page.
// No logic lives here — routing and data concerns belong to the child components
// and their injected services.
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CartHeaderComponent, CartPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

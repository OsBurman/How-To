import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../services/cart.service';

// ─── CartHeaderComponent ─────────────────────────────────────────────────────
// Demonstrates:
//   • inject() to pull CartService into a component (no constructor needed)
//   • toSignal() — converts an Observable into a Signal so the template
//     can read it directly with count() instead of the async pipe
//   • initialValue — required when the Observable hasn't emitted yet so
//     the Signal always has a value at render time
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-cart-header',
  standalone: true,
  imports: [],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.css'
})
export class CartHeaderComponent {

  // inject() fetches the singleton CartService from Angular's DI system
  private readonly cartService = inject(CartService);

  // toSignal() subscribes to count$ and exposes the latest value as a Signal.
  // The component re-renders automatically when the Signal's value changes.
  readonly count = toSignal(this.cartService.count$, { initialValue: 0 });
}

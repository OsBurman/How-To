import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../services/cart.service';
import { NotificationService, Notification } from '../services/notification.service';
import { CartItem } from '../models/cart-item.model';

// ─── Product interface ────────────────────────────────────────────────────────
// Represents a browseable product before it enters the cart.
// CartItem extends this with a quantity field once added.

interface Product {
  id: number;
  name: string;
  price: number;
}

// Hardcoded catalog — in a real app this would come from an API
const PRODUCTS: Product[] = [
  { id: 1, name: 'Angular Hoodie',      price: 49.99 },
  { id: 2, name: 'RxJS T-Shirt',        price: 24.99 },
  { id: 3, name: 'TypeScript Mug',      price: 14.99 },
  { id: 4, name: 'Signal Sticker Pack', price:  7.99 },
];

// ─── CartPageComponent ────────────────────────────────────────────────────────
// Demonstrates:
//   • inject() for two services — CartService and NotificationService
//   • toSignal() for items$, total$, error$ — template reads them as Signals
//   • Coordinated service calls: cart mutation → notification push
//   • @if / @for control flow with Signal reads
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  private readonly cartService        = inject(CartService);
  private readonly notificationService = inject(NotificationService);

  // The product catalog is a plain array — no Observable needed
  readonly products = PRODUCTS;

  // Convert each service Observable to a Signal with an initialValue so
  // the template always has a defined value on first render
  readonly items         = toSignal(this.cartService.items$,  { initialValue: [] as CartItem[] });
  readonly total         = toSignal(this.cartService.total$,  { initialValue: 0 });
  readonly error         = toSignal(this.cartService.error$,  { initialValue: null });
  readonly notifications = toSignal(this.notificationService.notifications, { initialValue: [] as Notification[] });

  // ── addToCart ──────────────────────────────────────────────────────────────
  // Pass the product to CartService, then push a success toast.
  addToCart(product: Product): void {
    this.cartService.addItem(product);
    this.notificationService.push(`${product.name} added to cart`, 'success');
  }

  // ── removeItem ─────────────────────────────────────────────────────────────
  // Read the current Signal value with this.items() to find the item name
  // before the CartService removes it.
  removeItem(id: number): void {
    const item = this.items().find(i => i.id === id);
    this.cartService.removeItem(id);
    if (item) {
      this.notificationService.push(`${item.name} removed`, 'info');
    }
  }

  // ── clearCart ──────────────────────────────────────────────────────────────
  clearCart(): void {
    this.cartService.clearCart();
    this.notificationService.push('Cart cleared', 'info');
  }

  // ── dismissNotification ────────────────────────────────────────────────────
  dismissNotification(id: number): void {
    this.notificationService.dismiss(id);
  }
}

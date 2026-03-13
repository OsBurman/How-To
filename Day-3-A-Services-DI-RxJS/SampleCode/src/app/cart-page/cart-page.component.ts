// CartPageComponent — demonstrates:
//   inject()    — two services injected with no constructor
//   toSignal()  — three different Observables each converted to signals
//   error$      — reading the paired error stream and displaying messages
//
// This component never calls .subscribe() manually.
// toSignal() handles subscription and cleanup automatically.
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';
import { NotificationService } from '../services/notification.service';

// Catalog of available items to add
interface CatalogItem {
  name: string;
  price: number;
}

const CATALOG: CatalogItem[] = [
  { name: 'RxJS in Action (Book)',      price: 39.99 },
  { name: 'Angular T-Shirt',            price: 24.99 },
  { name: 'TypeScript Hoodie',          price: 49.99 },
  { name: 'VS Code Mug',                price: 14.99 },
  { name: 'NgRx Sticker Sheet',         price: 6.99  },
];

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

  // inject() — two separate services, no constructor needed
  private readonly cartService         = inject(CartService);
  private readonly notificationService = inject(NotificationService);

  // toSignal() for the item list.
  // initialValue: [] ensures the @for loop in the template
  // always has an array to iterate — never undefined.
  readonly items = toSignal(
    this.cartService.items,
    { initialValue: [] as CartItem[] }
  );

  // toSignal() for the total — shown in the cart summary
  readonly total = toSignal(this.cartService.total$, { initialValue: 0 });

  // toSignal() for the error stream.
  //   initialValue: null = "no error right now"
  //   The template uses @if (error() !== null) to conditionally show the banner.
  readonly error = toSignal(
    this.cartService.error,
    { initialValue: null as string | null }
  );

  // Expose the catalog so the template can iterate over it
  readonly catalog = CATALOG;

  addItem(item: CatalogItem): void {
    this.cartService.addItem(item.name, item.price);
    this.notificationService.push(`Added "${item.name}" to cart`, 'success');
  }

  removeItem(id: number, name: string): void {
    this.cartService.removeItem(id);
    this.notificationService.push(`Removed "${name}"`, 'info');
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.notificationService.push('Cart cleared', 'info');
  }
}

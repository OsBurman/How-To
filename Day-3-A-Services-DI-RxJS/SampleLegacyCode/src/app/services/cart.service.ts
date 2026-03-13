// LEGACY CartService — same BehaviorSubject logic as the modern version.
//
// Key differences from the modern CartService:
//   NONE in the service itself — @Injectable({ providedIn: 'root' }) works
//   the same in both legacy and modern apps.
//
// The differences show up in HOW COMPONENTS USE this service:
//   LEGACY: constructor(private cartService: CartService) — constructor injection
//   MODERN: private readonly cartService = inject(CartService) — inject() function
//
// This service file is intentionally kept identical to the modern version to
// show students that the SERVICE ITSELF doesn't change — only the injection pattern.
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// @Injectable({ providedIn: 'root' }) works identically in NgModule-based apps.
// You do NOT need to add the service to AppModule.providers[].
@Injectable({ providedIn: 'root' })
export class CartService {

  private readonly items$ = new BehaviorSubject<CartItem[]>([
    { id: 1, name: 'Angular Sticker Pack', price: 9.99,  quantity: 1 },
    { id: 2, name: 'TypeScript Mug',        price: 14.99, quantity: 2 },
  ]);

  private readonly error$ = new BehaviorSubject<string | null>(null);

  readonly items: Observable<CartItem[]>    = this.items$.asObservable();
  readonly error: Observable<string | null> = this.error$.asObservable();

  readonly count$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  readonly total$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + (item.price * item.quantity), 0))
  );

  addItem(name: string, price: number): void {
    try {
      const current = this.items$.getValue();
      const existing = current.find(i => i.name === name);
      if (existing) {
        this.items$.next(
          current.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i)
        );
      } else {
        this.items$.next([...current, { id: Date.now(), name, price, quantity: 1 }]);
      }
      this.error$.next(null);
    } catch (err) {
      this.error$.next('Failed to add item. Please try again.');
    }
  }

  removeItem(id: number): void {
    try {
      this.items$.next(this.items$.getValue().filter(item => item.id !== id));
      this.error$.next(null);
    } catch (err) {
      this.error$.next('Failed to remove item.');
    }
  }

  clearCart(): void {
    this.items$.next([]);
    this.error$.next(null);
  }
}

// CartService — demonstrates:
//   @Injectable({ providedIn: 'root' }) — singleton service, tree-shakable
//   BehaviorSubject — reactive state container; always has a current value
//   error$ pattern — paired BehaviorSubject<string | null> for surfacing errors
//   map() operator — derived Observable streams (equivalent to computed() for signals)
//   try/catch — safe mutation methods; errors surface via error$ instead of crashing
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define the shape of a cart item — always define interfaces for shared data models
export interface CartItem {
  id: number;
  name: string;
  price: number;    // in dollars
  quantity: number;
}

// @Injectable({ providedIn: 'root' })
//   providedIn: 'root' means Angular creates ONE instance for the entire app (singleton).
//   Any component that calls inject(CartService) gets the same instance.
//   This is also "tree-shakable" — if nothing injects CartService, it won't be bundled.
@Injectable({ providedIn: 'root' })
export class CartService {

  // BehaviorSubject: the main state container.
  //   "Behavior" means it ALWAYS has a current value — new subscribers get it immediately.
  //   private: components cannot push values directly; they must call our safe methods.
  //   $  suffix: RxJS convention for Observables and Subjects.
  private readonly items$ = new BehaviorSubject<CartItem[]>([
    { id: 1, name: 'Angular Sticker Pack', price: 9.99,  quantity: 1 },
    { id: 2, name: 'TypeScript Mug',        price: 14.99, quantity: 2 },
  ]);

  // error$ pattern — a paired BehaviorSubject for errors.
  //   null = no error. Non-null = show the message to the user.
  //   Components read this stream and display a message when it's non-null.
  //   This prevents service errors from crashing components.
  private readonly error$ = new BehaviorSubject<string | null>(null);

  // Expose read-only Observables — components can subscribe but cannot push values
  readonly items: Observable<CartItem[]>       = this.items$.asObservable();
  readonly error: Observable<string | null>    = this.error$.asObservable();

  // Derived streams using map() — the RxJS equivalent of computed() with signals.
  // These recalculate automatically whenever items$ emits a new value.
  readonly count$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  readonly total$: Observable<number> = this.items$.pipe(
    map(items => items.reduce((sum, item) => sum + (item.price * item.quantity), 0))
  );

  // Safe mutation — always wrap BehaviorSubject updates in try/catch.
  // Errors surface via error$ so the UI can display a user-friendly message.
  addItem(name: string, price: number): void {
    try {
      const current = this.items$.getValue(); // getValue() reads the current value synchronously
      const existing = current.find(i => i.name === name);

      if (existing) {
        // Immutable update: create a new array instead of mutating in place
        this.items$.next(
          current.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i)
        );
      } else {
        const newItem: CartItem = { id: Date.now(), name, price, quantity: 1 };
        this.items$.next([...current, newItem]); // spread: new array reference
      }

      this.error$.next(null); // clear any previous error on success

    } catch (err) {
      // Surface the error — never re-throw in a service; let the component handle messaging
      this.error$.next('Failed to add item. Please try again.');
    }
  }

  removeItem(id: number): void {
    try {
      const current = this.items$.getValue();
      this.items$.next(current.filter(item => item.id !== id));
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

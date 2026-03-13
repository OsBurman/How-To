import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';

// ─── CartService ────────────────────────────────────────────────────────────
// Demonstrates:
//   • @Injectable({ providedIn: 'root' }) — single shared instance for the app
//   • BehaviorSubject — holds current state AND replays the latest value to
//     any new subscriber (unlike Subject, which only forwards future emissions)
//   • Paired error$ stream — surfaces errors without breaking the items$ stream
//   • Derived Observables via map — count$ and total$ are calculated from the
//     same source of truth (itemsBs$) so they stay in sync automatically
// ────────────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CartService {

  // Private BehaviorSubjects — only this service can push new values
  private readonly itemsBs$ = new BehaviorSubject<CartItem[]>([]);
  private readonly errorBs$ = new BehaviorSubject<string | null>(null);

  // Public Observables — components subscribe to these read-only views
  readonly items$: Observable<CartItem[]> = this.itemsBs$.asObservable();
  readonly error$: Observable<string | null> = this.errorBs$.asObservable();

  // Derived Observables — recalculate automatically whenever items$ emits.
  // map() transforms each emission without creating a new stream from scratch.
  readonly count$: Observable<number> = this.itemsBs$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  readonly total$: Observable<number> = this.itemsBs$.pipe(
    map(items => items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  );

  // ── addItem ────────────────────────────────────────────────────────────────
  // Accepts a product without a quantity (we manage that internally).
  // If the item already exists we increment its quantity instead of duplicating.
  addItem(item: Omit<CartItem, 'quantity'>): void {
    this.errorBs$.next(null); // clear any previous error before each operation
    try {
      const current = this.itemsBs$.getValue(); // BehaviorSubject exposes current value
      const existing = current.find(i => i.id === item.id);

      if (existing) {
        // Immutable update — spread the old array and replace only the target item
        this.itemsBs$.next(
          current.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        );
      } else {
        // New item — add with quantity 1
        this.itemsBs$.next([...current, { ...item, quantity: 1 }]);
      }
    } catch (err) {
      this.errorBs$.next(err instanceof Error ? err.message : 'Failed to add item');
    }
  }

  // ── removeItem ─────────────────────────────────────────────────────────────
  removeItem(id: number): void {
    this.errorBs$.next(null);
    try {
      const current = this.itemsBs$.getValue();
      this.itemsBs$.next(current.filter(i => i.id !== id));
    } catch (err) {
      this.errorBs$.next(err instanceof Error ? err.message : 'Failed to remove item');
    }
  }

  // ── clearCart ──────────────────────────────────────────────────────────────
  clearCart(): void {
    this.errorBs$.next(null);
    try {
      this.itemsBs$.next([]);
    } catch (err) {
      this.errorBs$.next(err instanceof Error ? err.message : 'Failed to clear cart');
    }
  }
}

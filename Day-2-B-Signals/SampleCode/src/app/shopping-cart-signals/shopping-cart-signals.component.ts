/**
 * shopping-cart-signals.component.ts — Shopping Cart (Signal Version)
 *
 * This is the SOLUTION — the same cart rebuilt with signals.
 *
 * WHAT CHANGED FROM THE PLAIN VERSION:
 * 1. items is now a signal() — Angular tracks reads of this signal and
 *    knows exactly which DOM nodes depend on it.
 * 2. total and itemCount are now computed() — they are CACHED and only
 *    recalculate when the items signal changes.
 * 3. Fine-grained updates — only the DOM nodes that read the changed
 *    signals are updated, not the entire component tree.
 *
 * ─────────────────────────────────────────────────────────────
 * ANGULAR DIRECTION CALLOUT:
 * Zoneless (stable in v21+) is the payoff — signals tell Angular
 * exactly what changed, so zone.js is no longer needed. With signals,
 * Angular can skip Zone.js entirely and still know when to update the DOM.
 * ─────────────────────────────────────────────────────────────
 *
 * CLI command:
 *   ng generate component shopping-cart-signals --standalone
 */

import { Component, signal, computed } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart-signals',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart-signals.component.html',
  styleUrl: './shopping-cart-signals.component.css'
})
export class ShoppingCartSignalsComponent {

  /**
   * signal() — items is now a REACTIVE signal.
   *
   * Angular's template engine tracks every read of items().
   * When items() changes, only the DOM nodes that read it are updated.
   * This is "fine-grained change detection" — no Zone.js needed.
   *
   * Read: this.items()
   * Set:  this.items.set([...])
   * Update: this.items.update(current => [...current, newItem])
   */
  readonly items = signal<CartItem[]>([
    { id: 1, name: 'Angular in Action', price: 29.99, quantity: 1 },
    { id: 2, name: 'TypeScript Handbook', price: 19.99, quantity: 1 }
  ]);

  /**
   * computed() — total is a DERIVED, READ-ONLY signal.
   *
   * - Recalculates automatically when items() changes.
   * - Cached between changes — Angular does NOT call this on every event,
   *   only when a dependency signal (items) actually changes.
   * - READ-ONLY: you cannot call this.total.set() — computed() has no setter.
   *
   * This replaces the plain getter from the non-signal version.
   */
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  /**
   * computed() — another derived signal.
   * Recalculates only when items() changes — not on every change detection cycle.
   */
  readonly itemCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  /**
   * increment — updates the signal using .update().
   *
   * .update() takes a function that receives the CURRENT value and returns the NEW value.
   * We never mutate the array in place — we always create a new array reference
   * so the signal knows the value changed.
   */
  increment(id: number): void {
    this.items.update(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  decrement(id: number): void {
    this.items.update(current =>
      current.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  removeItem(id: number): void {
    // .update() creates a new array — signals always need a new reference
    this.items.update(current => current.filter(item => item.id !== id));
  }
}

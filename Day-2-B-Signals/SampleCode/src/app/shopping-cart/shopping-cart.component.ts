/**
 * shopping-cart.component.ts — Shopping Cart (Plain Properties — The Problem)
 *
 * This component demonstrates the PROBLEM that signals solve.
 * It uses plain class properties and manual calculations.
 *
 * PROBLEMS WITH THIS APPROACH:
 * 1. Angular uses Zone.js to check the ENTIRE component tree on every event —
 *    it doesn't know which properties changed or which DOM nodes need updating.
 * 2. Derived values (like total) are regular getters — Angular can't cache them
 *    or know when to skip recalculating them.
 * 3. There is no way to automatically run a side effect when the cart changes.
 *
 * The signal version (shopping-cart-signals.component.ts) solves all three.
 *
 * CLI command:
 *   ng generate component shopping-cart --standalone
 */

import { Component } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  /**
   * PLAIN PROPERTY — items is just an array.
   * Angular doesn't know when this changes.
   * Zone.js detects the (click) event and checks everything.
   */
  items: CartItem[] = [
    { id: 1, name: 'Angular in Action', price: 29.99, quantity: 1 },
    { id: 2, name: 'TypeScript Handbook', price: 19.99, quantity: 1 }
  ];

  /**
   * PLAIN GETTER — recalculates on every change detection cycle.
   * Angular runs change detection for the whole tree on every event,
   * so this getter may be called many more times than needed.
   * Compare with computed() in the signal version — which is CACHED
   * and only recalculates when its signal dependencies change.
   */
  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /**
   * increment / decrement — mutate the items array directly.
   * Angular detects the change via Zone.js (because a (click) event fired),
   * but it has to re-check the ENTIRE component tree to find what changed.
   */
  increment(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item) item.quantity++;
  }

  decrement(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item && item.quantity > 1) item.quantity--;
  }

  removeItem(id: number): void {
    // MUTATION PROBLEM: If a pure pipe were filtering this array,
    // mutating the reference like this would NOT trigger the pipe.
    // You'd need to reassign: this.items = this.items.filter(...)
    this.items = this.items.filter(i => i.id !== id);
  }
}

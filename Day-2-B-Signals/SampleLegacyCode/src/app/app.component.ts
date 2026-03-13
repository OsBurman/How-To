// app.component.ts — Legacy Root Component
//
// LEGACY PAIN: No standalone: true. No imports: [].
// This component can use ShoppingCartComponent and OnChangesDemoComponent only
// because they are declared in AppModule. The connection is invisible from this file.
//
// MODERN EQUIVALENT: standalone: true + imports: [ShoppingCartComponent, OnChangesDemoComponent]
// directly in this decorator. The dependency is explicit and co-located.

import { Component } from '@angular/core';

// LEGACY: No signals. Parent passes data to children with @Input().
// To trigger child re-calculation, the parent must produce a NEW object reference.
// Passing the same object mutated in-place will NOT trigger ngOnChanges.
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-root',
  // LEGACY: no standalone: true, no imports array
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // MODERN: styleUrl (singular, string) — not styleUrls (array)
})
export class AppComponent {
  title = 'D2B Signals — Legacy';

  // LEGACY: Plain mutable property passed as @Input() to child.
  // MODERN: signal<CartItem[]>([...]) — child reads items() and computed() derives totals.
  cartItems: CartItem[] = [
    { id: 1, name: 'Keyboard', price: 79.99, quantity: 1 },
    { id: 2, name: 'Mouse',    price: 29.99, quantity: 2 }
  ];

  // LEGACY: The parent mutates the array directly and must trigger change detection
  // by replacing the array reference to make ngOnChanges fire in the child.
  addItem(): void {
    // Mutating works for Zone.js re-render, but won't trigger ngOnChanges
    // in the child because the array reference hasn't changed.
    this.cartItems.push({ id: Date.now(), name: 'New Item', price: 9.99, quantity: 1 });

    // To trigger ngOnChanges you must replace the reference:
    // this.cartItems = [...this.cartItems, newItem];
  }

  // LEGACY: To reset, replace the reference so ngOnChanges fires.
  clearCart(): void {
    this.cartItems = [];
  }

  // LEGACY: onChangesCount displayed in parent to show how often the child re-ran.
  // MODERN: computed() only recalculates when its signal dependencies change.
  // No equivalent needed — signals are lazy and granular by design.
  onChangesCount: number = 0;
  onChildChanges(count: number): void {
    this.onChangesCount = count;
  }

  // -- ngOnChanges demo input --
  demoValue: number = 10;
  incrementDemo(): void { this.demoValue++; }
}

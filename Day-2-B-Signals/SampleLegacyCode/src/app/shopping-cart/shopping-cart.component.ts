// shopping-cart.component.ts — Legacy Shopping Cart
//
// LEGACY PATTERN: @Input() receives a plain array from the parent.
// The component uses a plain getter (get total()) to calculate derived values.
//
// PROBLEM: Angular's Zone.js change detection calls this getter on EVERY
// change-detection cycle — not just when items actually changed. As the app
// grows, this wasted work adds up across dozens of components.
//
// Also: ngOnChanges fires only when the INPUT REFERENCE changes, not when
// the array is mutated in-place. This creates subtle bugs where the UI
// doesn't update even though the data changed.
//
// MODERN EQUIVALENT:
//   readonly items = signal<CartItem[]>([...]);
//   readonly total = computed(() => items().reduce(...));
// computed() only recalculates when items() changes — no wasted work.

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  // LEGACY: no standalone: true — declared in AppModule instead
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
  // MODERN: styleUrl (singular string), standalone: true
})
export class ShoppingCartComponent implements OnChanges {

  // LEGACY: @Input() decorator — parent pushes data in.
  // MODERN: readonly items = input<CartItem[]>([])  — signal-based, same one-way flow
  @Input() items: CartItem[] = [];

  // LEGACY: @Output() + new EventEmitter() — boilerplate required.
  // MODERN: readonly countChange = output<number>()  — no EventEmitter instantiation.
  @Output() countChange = new EventEmitter<number>();

  // Tracks how many times ngOnChanges fired — displayed in parent.
  ngOnChangesCount = 0;

  // ngOnChanges fires when a REFERENCE-TYPE @Input() value changes to a new reference.
  // MODERN EQUIVALENT: computed() — no lifecycle hook needed.
  // derived values recalculate automatically when their signal dependency changes.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.ngOnChangesCount++;
      this.countChange.emit(this.ngOnChangesCount);
      console.log('[Legacy] ngOnChanges fired. Previous:',
        changes['items'].previousValue,
        '→ Current:', changes['items'].currentValue);
    }
  }

  // LEGACY: Plain getter. Angular calls this on EVERY change-detection cycle
  // via Zone.js — even when nothing in this component changed.
  // MODERN EQUIVALENT: readonly total = computed(() => ...) — called only when items() changes.
  get total(): number {
    console.log('[Legacy] total getter called — Zone.js triggered full tree check');
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // LEGACY: Another plain getter called every cycle.
  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // LEGACY: Mutates the @Input() array directly.
  // This is an anti-pattern — @Input() data is owned by the parent.
  // With signals, you'd emit an event up and let the parent update the signal.
  increment(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item) { item.quantity++; }
    // NOTE: This works with Zone.js because mutation triggers a re-render,
    // but ngOnChanges will NOT fire since the array reference hasn't changed.
  }

  decrement(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item && item.quantity > 1) { item.quantity--; }
  }

  removeItem(id: number): void {
    // To trigger ngOnChanges in a parent, we'd need to emit an event up.
    // Here we filter in-place for Zone.js rendering — reference still unchanged.
    const idx = this.items.findIndex(i => i.id === id);
    if (idx > -1) { this.items.splice(idx, 1); }
  }
}

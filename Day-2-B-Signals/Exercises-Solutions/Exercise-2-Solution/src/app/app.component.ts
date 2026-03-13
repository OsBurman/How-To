import { Component, signal, WritableSignal, computed } from '@angular/core';

// computed() can read multiple signals — it re-calculates when ANY of them change.
// Because each item's quantity is itself a signal, computed() picks up quantity changes too.

interface CartItem {
  name: string;
  price: number;
  quantity: WritableSignal<number>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Each item's quantity is a WritableSignal — the template can call .update() on it directly
  items: CartItem[] = [
    { name: 'Mechanical Keyboard', price: 89.99, quantity: signal(1) },
    { name: 'USB-C Hub',           price: 34.50, quantity: signal(1) },
    { name: 'Monitor Stand',       price: 49.00, quantity: signal(1) },
  ];

  // computed() reads item.quantity() for every item — when any quantity signal changes,
  // this recalculates, which then triggers tax and grandTotal to recalculate too
  readonly subtotal = computed(() =>
    this.items.reduce((sum, item) => sum + item.price * item.quantity(), 0)
  );

  // computed() reading another computed() — creates a reactive chain
  readonly tax = computed(() => this.subtotal() * 0.10);

  readonly grandTotal = computed(() => this.subtotal() + this.tax());
}

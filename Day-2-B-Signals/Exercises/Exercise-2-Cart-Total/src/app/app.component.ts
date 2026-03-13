import { Component, signal, WritableSignal } from '@angular/core';

// TODO 1: Add computed to the import above
//         import { Component, signal, WritableSignal, computed } from '@angular/core';

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

  // Items are pre-defined — each quantity is already a writable signal
  items: CartItem[] = [
    { name: 'Mechanical Keyboard', price: 89.99, quantity: signal(1) },
    { name: 'USB-C Hub',           price: 34.50, quantity: signal(1) },
    { name: 'Monitor Stand',       price: 49.00, quantity: signal(1) },
  ];

  // TODO 2: Declare readonly subtotal = computed(...)
  //         Sum of (item.price * item.quantity()) for every item in this.items

  // TODO 3: Declare readonly tax = computed(...)
  //         10% of subtotal (multiply subtotal() by 0.10)

  // TODO 4: Declare readonly grandTotal = computed(...)
  //         subtotal() + tax()
}

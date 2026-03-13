import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OrderSummaryComponent, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // The parent drives price and discount as signals.
  // These are passed DOWN to OrderSummaryComponent.
  // After conversion, the child will use input() to receive them.
  readonly price = signal<number>(99.99);
  readonly discount = signal<number>(10);  // percent (0–100)

  // Two preset price points students can toggle between
  setPriceStandard(): void {
    this.price.set(99.99);
    this.discount.set(10);
  }

  setPricePremium(): void {
    this.price.set(249.00);
    this.discount.set(20);
  }

  setPriceSale(): void {
    this.price.set(49.99);
    this.discount.set(30);
  }
}

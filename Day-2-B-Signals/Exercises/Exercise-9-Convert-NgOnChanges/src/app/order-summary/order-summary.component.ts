// ============================================================
// LEGACY — This component uses @Input() and ngOnChanges.
// Your job is to convert it to modern signal patterns:
//   @Input() price      → input<number>(0)
//   @Input() discount   → input<number>(0)
//   discountedPrice     → computed()
//   savings             → computed()
//   ngOnChanges body    → effect()
//
// After conversion: delete ngOnChanges and the SimpleChanges import.
// The app must work identically before and after.
// ============================================================

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnChanges {

  // LEGACY: mutable @Input() properties — the child receives values but Angular
  // has no reactive tracking of when they change. All re-calculation happens manually
  // inside ngOnChanges using the SimpleChanges object.
  @Input() price: number = 0;
  @Input() discount: number = 0;  // 0–100 percent

  // LEGACY: plain class properties, recalculated manually in ngOnChanges
  discountedPrice: number = 0;
  savings: number = 0;

  // LEGACY: a plain array for logging price history — this stays as-is after conversion
  priceHistory: number[] = [];

  // LEGACY: ngOnChanges fires whenever a bound @Input() changes.
  // It uses the SimpleChanges map to check WHICH inputs changed and what the new values are.
  // Replace this entire method with computed() and effect() during your conversion.
  ngOnChanges(changes: SimpleChanges): void {
    // Recalculate derived values when either price or discount changes
    if (changes['price'] || changes['discount']) {
      this.discountedPrice = this.price * (1 - this.discount / 100);
      this.savings = this.price - this.discountedPrice;
    }

    // Side effect: log the new discounted price and record history
    if (changes['price']) {
      this.priceHistory.push(this.discountedPrice);
      console.log(`Discounted price updated: ${this.discountedPrice.toFixed(2)}`);
    }
  }
}

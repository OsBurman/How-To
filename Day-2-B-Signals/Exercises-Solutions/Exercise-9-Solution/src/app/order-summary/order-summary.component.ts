import { Component, input, computed, effect } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

// What replaced ngOnChanges, and why is it better?
//
// ngOnChanges used a SimpleChanges map to detect which @Input() properties changed,
// then manually recalculated derived values and ran side effects inside one method.
// It was easy to forget to check the right key, and the SimpleChanges API was clunky.
//
// With signals:
//   computed() handles derived values automatically — no manual check needed.
//   effect() handles side effects — it runs whenever its signal dependencies change.
// Both are lazily tracked: Angular knows exactly which signals they read, so they
// only re-run when relevant data actually changes.

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {

  // input() replaces @Input() — read-only signal; the parent writes this value
  readonly price = input<number>(0);
  readonly discount = input<number>(0); // 0–100 percent

  // computed() replaces the manual recalculation from ngOnChanges.
  // Automatically re-evaluates whenever price() or discount() changes.
  readonly discountedPrice = computed(() =>
    this.price() * (1 - this.discount() / 100)
  );

  // computed() reading another computed() — forms a reactive chain
  readonly savings = computed(() => this.price() - this.discountedPrice());

  // Plain array — not reactive; only modified as a side effect
  priceHistory: number[] = [];

  constructor() {
    // effect() replaces the side-effect branch of ngOnChanges.
    // It reads price() and discountedPrice() — so it re-runs when either changes.
    // Note: unlike the original (which only logged on price changes), this effect
    // also fires when discount changes because discountedPrice depends on discount().
    // That's a minor behavioral difference, but it demonstrates how effect() works:
    // it tracks every signal it reads, not just the one you want.
    effect(() => {
      const currentPrice = this.price();           // tracked — re-runs when price changes
      const discounted = this.discountedPrice();   // tracked — re-runs when discount changes too
      this.priceHistory.push(discounted);
      console.log(`Discounted price updated: ${discounted.toFixed(2)}`);
    });
  }
}

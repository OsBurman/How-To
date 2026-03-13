import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CurrencyPipe]
})
export class AppComponent {

  // Three independent BehaviorSubjects — one per input control.
  // BehaviorSubject holds the current value and replays it to new subscribers.
  readonly basePrice$ = new BehaviorSubject<number>(100);
  readonly discount$ = new BehaviorSubject<number>(0);
  readonly quantity$ = new BehaviorSubject<number>(1);

  // combineLatest subscribes to all three sources simultaneously.
  // Whenever ANY of them emits, it takes the LATEST value from ALL of them
  // and passes the combined array to map(). No manual "recalculate" call needed.
  readonly result = toSignal(
    combineLatest([this.basePrice$, this.discount$, this.quantity$]).pipe(
      map(([base, disc, qty]) => {
        const discountedPrice = base * (1 - disc / 100);
        const total = discountedPrice * qty;
        return { discountedPrice, total };
      })
    ),
    { initialValue: { discountedPrice: 100, total: 100 } }
  );

  onBasePriceChange(value: number): void {
    this.basePrice$.next(value);
  }

  onDiscountChange(value: number): void {
    this.discount$.next(value);
  }

  onQuantityChange(value: number): void {
    this.quantity$.next(value);
  }
}

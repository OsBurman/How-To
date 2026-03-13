import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
// TODO 2: Import combineLatest and map from 'rxjs'
// TODO 3: Import toSignal from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [CurrencyPipe]
})
export class AppComponent {
  // These three BehaviorSubjects are the "sources" for combineLatest.
  // They hold the current value and emit a new value whenever .next() is called.
  readonly basePrice$ = new BehaviorSubject<number>(100);
  readonly discount$ = new BehaviorSubject<number>(0);
  readonly quantity$ = new BehaviorSubject<number>(1);

  // TODO 1: Replace this stub signal with a real combineLatest pipeline.
  //
  // Step 1 — Create a derived Observable:
  //   const result$ = combineLatest([this.basePrice$, this.discount$, this.quantity$]).pipe(
  //     map(([base, disc, qty]) => {
  //       const discountedPrice = base * (1 - disc / 100);
  //       const total = discountedPrice * qty;
  //       return { discountedPrice, total };
  //     })
  //   );
  //
  // Step 2 — Convert to a signal so the template can read it:
  //   readonly result = toSignal(result$, {
  //     initialValue: { discountedPrice: 100, total: 100 }
  //   });
  //
  // Step 3 — Delete the stub line below once you have the real version working.
  //
  // Why combineLatest?
  //   combineLatest emits a new array every time *any* of the source streams emits.
  //   That means changing the base price re-runs the calculation automatically —
  //   you never need to call a "recalculate" function manually.
  readonly result = signal({ discountedPrice: 100, total: 100 });

  // Called by the base price input. Pushes the new value into the stream.
  onBasePriceChange(value: number): void {
    this.basePrice$.next(value);
  }

  // Called by the discount slider. Pushes the new percentage.
  onDiscountChange(value: number): void {
    this.discount$.next(value);
  }

  // Called by the quantity input. Pushes the new count.
  onQuantityChange(value: number): void {
    this.quantity$.next(value);
  }
}

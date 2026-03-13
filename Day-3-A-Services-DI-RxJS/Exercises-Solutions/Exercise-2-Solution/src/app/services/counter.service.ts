import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CounterService {

  // BehaviorSubject holds the current count and replays it to every new subscriber.
  // Private — only this service calls .next() to change the value.
  private readonly countBs$ = new BehaviorSubject<number>(0);

  // Read-only Observable exposed to consumers.
  // .asObservable() strips .next() so components can only subscribe, not push.
  readonly count: Observable<number> = this.countBs$.asObservable();

  // Derived Observable — emits true when count is 0, false otherwise.
  // map() transforms each value from the source without creating a new subscription.
  readonly isAtZero$: Observable<boolean> = this.countBs$.pipe(
    map(n => n === 0)
  );

  increment(): void {
    // .getValue() reads the current value synchronously — no subscription needed.
    this.countBs$.next(this.countBs$.getValue() + 1);
  }

  decrement(): void {
    // Guard: never go below 0.
    const current = this.countBs$.getValue();
    if (current > 0) {
      this.countBs$.next(current - 1);
    }
  }

  reset(): void {
    this.countBs$.next(0);
  }
}

import { Injectable } from '@angular/core';
// TODO 1: Import BehaviorSubject and Observable from 'rxjs'
// TODO 1: Import map from 'rxjs/operators'
//
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CounterService {

  // TODO 1a: Declare a private BehaviorSubject<number> initialized to 0.
  //          BehaviorSubject holds the current value and replays it to every new subscriber.
  //
  //   private readonly countBs$ = new BehaviorSubject<number>(0);

  // TODO 1b: Expose count as a read-only Observable.
  //          .asObservable() removes the .next() method — components can read but not write.
  //
  //   readonly count: Observable<number> = this.countBs$.asObservable();

  // TODO 1c: Expose isAtZero$ as a derived Observable using map().
  //          map() transforms each emitted value from the source Observable.
  //          This stream emits true when count is 0, false otherwise.
  //
  //   readonly isAtZero$: Observable<boolean> = this.countBs$.pipe(
  //     map(n => n === 0)
  //   );

  increment(): void {
    // TODO 1d: Push the next value: current + 1.
    //          Use .getValue() to read the current value synchronously.
    //   this.countBs$.next(this.countBs$.getValue() + 1);
  }

  decrement(): void {
    // TODO 1e: Guard against going below 0, then push the new value.
    //   const current = this.countBs$.getValue();
    //   if (current > 0) { this.countBs$.next(current - 1); }
  }

  reset(): void {
    // TODO 1f: Reset the count to 0.
    //   this.countBs$.next(0);
  }
}

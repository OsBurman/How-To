import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';

// This service simulates an async data load with a deliberate delay.
// The BehaviorSubject starts with null — that null is the source of the problem
// you'll observe in Part A.
@Injectable({ providedIn: 'root' })
export class UserService {

  // BehaviorSubject<string | null>(null):
  //   - The initial value IS null because we don't have the user data yet.
  //   - BehaviorSubject always holds its current value.
  //   - When the async pipe (or any subscriber) subscribes, it IMMEDIATELY
  //     receives whatever the current value is — in this case, null.
  //   - That null gets rendered in the template until the timer fires.
  private readonly userBs$ = new BehaviorSubject<string | null>(null);

  // Expose as read-only — components can subscribe but can't push values.
  readonly user$ = this.userBs$.asObservable();

  constructor() {
    // Simulate an API response arriving after 1.5 seconds.
    // After this fires, the BehaviorSubject emits 'Ada Lovelace' and the
    // template updates — but the null flash has already happened.
    timer(1500).subscribe(() => {
      this.userBs$.next('Ada Lovelace');
    });
  }
}

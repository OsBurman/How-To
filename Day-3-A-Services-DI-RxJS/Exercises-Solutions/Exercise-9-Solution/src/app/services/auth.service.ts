import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // false = logged out by default.
  private readonly loggedIn$ = new BehaviorSubject<boolean>(false);

  login(): void {
    // Push true — any subscriber (including the guard) sees the change immediately.
    this.loggedIn$.next(true);
  }

  logout(): void {
    this.loggedIn$.next(false);
  }

  // Guards call this synchronously — they need a boolean right now, not an Observable.
  // .getValue() reads the current value without subscribing.
  isLoggedIn(): boolean {
    return this.loggedIn$.getValue();
  }
}

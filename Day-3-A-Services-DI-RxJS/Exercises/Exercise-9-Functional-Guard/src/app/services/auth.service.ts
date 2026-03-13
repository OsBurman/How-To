import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Holds the current logged-in state. false = logged out, true = logged in.
  private readonly loggedIn$ = new BehaviorSubject<boolean>(false);

  // TODO 1: Implement login().
  //   Push true into loggedIn$: this.loggedIn$.next(true)
  login(): void {
    // TODO: implement
  }

  // TODO 2: Implement logout().
  //   Push false into loggedIn$: this.loggedIn$.next(false)
  logout(): void {
    // TODO: implement
  }

  // TODO 3: Implement isLoggedIn().
  //   Return the current value of the BehaviorSubject using .getValue().
  //   Guards will call this synchronously — no Observable needed.
  isLoggedIn(): boolean {
    // TODO: implement
    return false;
  }
}

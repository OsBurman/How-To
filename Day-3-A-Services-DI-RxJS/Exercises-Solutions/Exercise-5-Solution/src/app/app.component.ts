import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './services/user.service';

// PART B SOLUTION — toSignal() replaces the async pipe.
//
// What changed:
//   1. Removed AsyncPipe from imports (template no longer uses the async pipe)
//   2. Added toSignal() to convert user$ to a signal
//   3. Provided initialValue: 'Loading...' so the signal is never null
//   4. Template now uses {{ user() }} instead of {{ user$ | async }}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],  // AsyncPipe removed — no longer needed
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly userService = inject(UserService);

  // toSignal() with initialValue: 'Loading...' ensures:
  //   - The signal always has a string value (never null, never undefined)
  //   - On load the template shows "Loading..." immediately
  //   - After 1.5 seconds it shows "Ada Lovelace"
  //   - No null flash, no *ngIf null guard needed
  readonly user = toSignal(this.userService.user$, { initialValue: 'Loading...' });

  // user$ is no longer needed — the template reads user() instead.
}

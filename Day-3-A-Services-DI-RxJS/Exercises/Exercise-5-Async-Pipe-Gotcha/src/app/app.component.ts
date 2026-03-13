import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserService } from './services/user.service';

// ─── PART A: The Gotcha (already implemented — run the app and observe) ─────
//
// The template uses {{ user$ | async }} without any null guard.
//
// On page load:
//   1. UserService creates a BehaviorSubject with initial value: null
//   2. The component subscribes via the async pipe
//   3. BehaviorSubject immediately emits its current value: null
//   4. The template renders "null" — literally the word "null"
//   5. After 1.5 seconds, the real name arrives and replaces it
//
// This is the "null flash" — a common source of template bugs when using
// BehaviorSubject with the async pipe and no null guard.
//
// ─── PART B: Your Task ───────────────────────────────────────────────────────
//
// Convert this component to use toSignal() so the null problem disappears.
//
// TODO B1: Import toSignal from '@angular/core/rxjs-interop'
//          import { toSignal } from '@angular/core/rxjs-interop';
//
// TODO B2: Remove AsyncPipe from the imports array below.
//          The template won't need it once you're using a signal.
//
// TODO B3: Add this line to the class body:
//          readonly user = toSignal(this.userService.user$, { initialValue: 'Loading...' });
//          initialValue means the signal returns 'Loading...' immediately —
//          no null, no empty string, no crash.
//
// TODO B4: Remove the user$ property (or leave it — it won't cause an error).
//
// TODO B5: In the template, replace {{ user$ | async }} with {{ user() }}.
//          The template becomes simpler AND the null problem is gone.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe],  // TODO B2: Remove AsyncPipe once you've added toSignal()
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly userService = inject(UserService);

  // Part A: raw Observable — exposed for the async pipe in the template.
  // TODO B4: Remove this once you've replaced it with the toSignal() version.
  readonly user$ = this.userService.user$;

  // TODO B3: Add this line when you're ready to fix the problem:
  // readonly user = toSignal(this.userService.user$, { initialValue: 'Loading...' });
}

import { Component, signal } from '@angular/core';
// The signal import is already there — you need it for the waiting flag in runTimer().
//
// As you implement each method, add to the import list:
//   import { Component, signal } from '@angular/core';     ← already done
//   import { of, from, timer, Subject, BehaviorSubject } from 'rxjs';
//   import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // The log signal holds every line printed by your Observable demos.
  // The template already loops over log() — you just need to populate it.
  readonly log = signal<string[]>([]);

  // Used by runTimer() to show "waiting..." while the 2-second timer ticks.
  readonly waiting = signal(false);

  // Helper — call this.addLog('some text') from inside any method below.
  private addLog(message: string): void {
    this.log.update(lines => [...lines, message]);
  }

  clearLog(): void {
    this.log.set([]);
    this.waiting.set(false);
  }

  // ─── TODO: Implement the six methods below ──────────────────────────────────

  runOf(): void {
    // Use of(10, 20, 30, 40) with map(n => n * 2).
    // Call this.addLog() for each emitted value.
    // Expected output in the log: 20, 40, 60, 80
    this.addLog('--- of() ---');
    // YOUR CODE HERE
  }

  runFrom(): void {
    // Use from(['Angular', 'RxJS', 'TypeScript']).
    // Call this.addLog() for each item.
    this.addLog('--- from() ---');
    // YOUR CODE HERE
  }

  runFilter(): void {
    // Use of(1, 2, 3, 4, 5, 6, 7, 8) with filter(n => n % 2 === 0).
    // Call this.addLog() for each even number only.
    // Expected output: 2, 4, 6, 8
    this.addLog('--- filter() ---');
    // YOUR CODE HERE
  }

  runTap(): void {
    // Use of('a', 'b', 'c') piped through:
    //   tap(x => this.addLog('before: ' + x))
    //   map(x => x.toUpperCase())
    //   tap(x => this.addLog('after: ' + x))
    // Subscribe with NO handler — the tap operators do all the logging.
    // Expected output: before: a, after: A, before: b, after: B, ...
    this.addLog('--- tap() ---');
    // YOUR CODE HERE
  }

  runTimer(): void {
    // Set this.waiting.set(true) FIRST so the template shows "waiting...".
    // Use timer(2000).subscribe(() => { ... }).
    // Inside the callback: log "timer fired!", set waiting back to false.
    this.addLog('--- timer(2000) ---');
    // YOUR CODE HERE
  }

  runSubjectVsBehaviorSubject(): void {
    // Create a Subject<number> and a BehaviorSubject<number>(99).
    // Subscribe to BOTH before calling .next().
    // Then call .next(42) on each.
    // Log what each subscriber receives.
    //
    // Expected output:
    //   BehaviorSubject subscriber received: 99   ← fires immediately on subscribe
    //   Subject subscriber received: 42           ← fires only when .next() is called
    //   BehaviorSubject subscriber received: 42   ← also fires on .next()
    //
    // KEY INSIGHT: Subject has NO initial value — new subscribers miss past emissions.
    //              BehaviorSubject ALWAYS replays its current value to new subscribers.
    this.addLog('--- Subject vs BehaviorSubject ---');
    // YOUR CODE HERE
  }
}

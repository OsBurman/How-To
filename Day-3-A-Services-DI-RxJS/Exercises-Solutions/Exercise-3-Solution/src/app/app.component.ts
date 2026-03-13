import { Component, signal } from '@angular/core';
import { of, from, timer, Subject, BehaviorSubject } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // The log signal holds every line printed by the Observable demos.
  readonly log = signal<string[]>([]);

  // Used by runTimer() to show "waiting..." while the 2-second timer ticks.
  readonly waiting = signal(false);

  private addLog(message: string): void {
    this.log.update(lines => [...lines, message]);
  }

  clearLog(): void {
    this.log.set([]);
    this.waiting.set(false);
  }

  runOf(): void {
    // of() creates a cold Observable from static values.
    // It emits each value synchronously, then completes.
    // map() transforms each number before it reaches the subscriber.
    this.addLog('--- of() ---');
    of(10, 20, 30, 40)
      .pipe(map(n => n * 2))
      .subscribe(n => this.addLog(`${n}`));
  }

  runFrom(): void {
    // from() converts an iterable (array, Promise, etc.) into an Observable.
    // Each array element becomes one emission.
    this.addLog('--- from() ---');
    from(['Angular', 'RxJS', 'TypeScript'])
      .subscribe(item => this.addLog(item));
  }

  runFilter(): void {
    // filter() only passes values where the predicate returns true.
    // Values that don't pass are silently dropped — the subscriber never sees them.
    this.addLog('--- filter() ---');
    of(1, 2, 3, 4, 5, 6, 7, 8)
      .pipe(filter(n => n % 2 === 0))
      .subscribe(n => this.addLog(`${n}`));
  }

  runTap(): void {
    // tap() is a side-effect operator — it lets you log or inspect values
    // without changing what flows through the stream.
    // The subscribe() call here has no handler — tap does all the work.
    this.addLog('--- tap() ---');
    of('a', 'b', 'c')
      .pipe(
        tap(x => this.addLog('before: ' + x)),
        map(x => x.toUpperCase()),
        tap(x => this.addLog('after:  ' + x))
      )
      .subscribe();
  }

  runTimer(): void {
    // timer(2000) emits the value 0 after 2000ms, then completes.
    // We set waiting to true before the subscribe, and back to false inside the callback.
    this.addLog('--- timer(2000) ---');
    this.waiting.set(true);
    timer(2000).subscribe(() => {
      this.addLog('timer fired!');
      this.waiting.set(false);
    });
  }

  runSubjectVsBehaviorSubject(): void {
    // KEY DIFFERENCE:
    //   Subject: no current value — new subscribers get nothing until .next() is called.
    //   BehaviorSubject: has a current value — new subscribers receive it immediately.
    this.addLog('--- Subject vs BehaviorSubject ---');

    const subject = new Subject<number>();
    const behaviorSubject = new BehaviorSubject<number>(99);

    // Subscribe to BehaviorSubject FIRST — it immediately emits 99.
    behaviorSubject.subscribe(v =>
      this.addLog(`BehaviorSubject subscriber received: ${v}`)
    );

    // Subscribe to Subject — nothing emits yet (no current value).
    subject.subscribe(v =>
      this.addLog(`Subject subscriber received: ${v}`)
    );

    // Now push 42 into both. Both subscribers fire.
    subject.next(42);
    behaviorSubject.next(42);
  }
}

// RxJSOperatorsComponent — interactive playground demonstrating:
//   of()           — cold Observable; creates a fresh sequence for each subscriber
//   from()         — converts an array or Promise to a cold Observable
//   timer()        — emits once after a delay
//   Subject        — hot; no initial value; event bus
//   BehaviorSubject — hot; always has a current value
//   map            — transforms each emitted value
//   filter         — passes only values that meet a condition
//   tap            — side effect without changing the stream (logging, debugging)
//   switchMap      — cancels the previous inner Observable when a new outer value arrives
//   combineLatest  — combines latest values from multiple Observables
//   debounceTime   — waits for a pause before forwarding the value
//   takeUntilDestroyed() — auto-unsubscribes when the component is destroyed
import { Component, inject, DestroyRef, signal } from '@angular/core';
import {
  of, from, timer, Subject, BehaviorSubject, Observable, combineLatest
} from 'rxjs';
import {
  map, filter, tap, switchMap, debounceTime, take
} from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-operators.component.html',
  styleUrl: './rxjs-operators.component.css'
})
export class RxJSOperatorsComponent {

  // Log output shown in the template
  readonly log = signal<string[]>([]);

  // Search subject — drives the debounceTime + switchMap demo
  private readonly search$ = new Subject<string>();

  // Search results shown below the search input
  readonly searchResults = signal<string[]>([]);

  // DestroyRef — passed to takeUntilDestroyed() so the search subscription
  // is automatically cleaned up when this component is destroyed.
  // Without this, the subscription would outlive the component.
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // ================================================================
    // SEARCH DEMO: debounceTime + switchMap
    //
    // debounceTime(400): wait 400ms after the last keystroke before
    //   forwarding the search term. Prevents a request on every character.
    //
    // switchMap: when a new search term arrives, CANCEL the previous
    //   inner Observable and switch to a new one. This prevents stale
    //   results from a slow earlier request overwriting fresh results.
    //
    // takeUntilDestroyed(this.destroyRef): auto-cleanup on destroy.
    //   Without this, the subscription leaks after the component is removed.
    // ================================================================
    this.search$.pipe(
      tap(term => this.addLog(`Keystroke: "${term}"`)),
      debounceTime(400),
      tap(term => this.addLog(`debounceTime passed — searching: "${term}"`)),
      switchMap(term => this.fakeSearch(term)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(results => {
      this.searchResults.set(results);
    });
  }

  // ================================================================
  // OPERATOR DEMOS
  // Each method is triggered by a button click in the template.
  // ================================================================

  runMapDemo(): void {
    // map: transform each value — here, squaring each number
    this.addLog('--- map demo ---');
    of(1, 2, 3, 4, 5).pipe(
      map(n => n * n)
    ).subscribe(n => this.addLog(`  map result: ${n}`));
  }

  runFilterDemo(): void {
    // filter: only pass values that meet the condition
    this.addLog('--- filter demo ---');
    of(1, 2, 3, 4, 5, 6).pipe(
      filter(n => n % 2 === 0) // only even numbers pass through
    ).subscribe(n => this.addLog(`  filter (even only): ${n}`));
  }

  runTapDemo(): void {
    // tap: run a side effect (like logging) without changing the stream.
    // The values before and after map are the same Observable pipeline —
    // tap lets you inspect values at any point without interrupting it.
    this.addLog('--- tap demo ---');
    of('a', 'b', 'c').pipe(
      tap(x => this.addLog(`  tap BEFORE map: "${x}"`)),
      map(x => x.toUpperCase()),
      tap(x => this.addLog(`  tap AFTER map: "${x}"`))
    ).subscribe(); // subscribe() triggers the pipeline
  }

  runFromDemo(): void {
    // from(): converts an array to an Observable that emits each element individually
    this.addLog('--- from (array) demo ---');
    from(['Angular', 'RxJS', 'TypeScript']).subscribe(
      item => this.addLog(`  from: ${item}`)
    );
  }

  // ================================================================
  // HOT vs COLD Observable demo
  //
  // COLD Observable (of, from): each subscriber gets its own execution.
  //   Every .subscribe() call restarts the Observable from scratch.
  //   Think of a cold Observable like a Netflix movie — each viewer
  //   starts from the beginning.
  //
  // HOT Observable (Subject, BehaviorSubject): all subscribers share
  //   the same execution. They see the same values at the same time.
  //   Think of a hot Observable like a live TV broadcast — you see
  //   whatever is currently airing when you tune in.
  // ================================================================

  runColdDemo(): void {
    this.addLog('--- COLD Observable (of) demo ---');
    // of() is COLD — each subscriber runs the Observable independently.
    // Notice both subscribers get their own copy of all three values.
    const cold$ = of('cold A', 'cold B', 'cold C');
    cold$.subscribe(v => this.addLog(`  Subscriber 1 got: ${v}`));
    cold$.subscribe(v => this.addLog(`  Subscriber 2 got: ${v}`));
    this.addLog('  ^ Both subscribers ran independently (cold)');
  }

  runHotDemo(): void {
    this.addLog('--- HOT Observable (BehaviorSubject) demo ---');
    // BehaviorSubject is HOT — all subscribers share the same execution.
    // Both subscribers immediately get the current value ('initial value'),
    // then both get the updated value when we call .next().
    const hot$ = new BehaviorSubject<string>('initial value');
    hot$.subscribe(v => this.addLog(`  Hot sub 1: "${v}"`));
    hot$.subscribe(v => this.addLog(`  Hot sub 2: "${v}"`));
    hot$.next('updated value'); // both subscribers receive this
    this.addLog('  ^ Both subscribers shared the same stream (hot)');
  }

  runCombineLatestDemo(): void {
    this.addLog('--- combineLatest demo ---');
    // combineLatest: waits for all sources to emit at least once,
    // then combines the LATEST value from each on every subsequent emission.
    const name$  = new BehaviorSubject<string>('Alice');
    const score$ = new BehaviorSubject<number>(95);
    combineLatest([name$, score$]).pipe(
      map(([name, score]) => `${name}: ${score} pts`),
      take(1) // take(1) auto-completes after the first emission
    ).subscribe(combined => this.addLog(`  combineLatest: "${combined}"`));
  }

  runTimerDemo(): void {
    this.addLog('--- timer() demo ---');
    this.addLog('  timer(1500) started — waiting 1.5s...');
    // timer(1500): emits the value 0 after 1500ms, then completes.
    // takeUntilDestroyed cleans up if the component is destroyed before timer fires.
    timer(1500)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.addLog('  timer fired after 1.5s!'));
  }

  // Triggered by the search input in the template
  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.search$.next(term); // push value into the Subject
  }

  clearLog(): void {
    this.log.set([]);
    this.searchResults.set([]);
  }

  // Simulates an asynchronous search — returns an Observable of results
  private fakeSearch(term: string): Observable<string[]> {
    const catalog = [
      'Angular', 'RxJS', 'TypeScript', 'JavaScript',
      'Signals', 'Services', 'Observables', 'Subjects', 'Pipes'
    ];
    const results = term
      ? catalog.filter(i => i.toLowerCase().includes(term.toLowerCase()))
      : [];
    return of(results); // of() is cold — a fresh Observable for each switchMap invocation
  }

  private addLog(message: string): void {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    this.log.update(logs => [...logs, `[${time}] ${message}`]);
  }
}

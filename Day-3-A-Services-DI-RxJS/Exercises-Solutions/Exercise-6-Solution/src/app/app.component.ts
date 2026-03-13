import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';

const LANGUAGES = [
  'TypeScript', 'JavaScript', 'Python', 'Rust', 'Go',
  'Swift', 'Kotlin', 'Java', 'C#', 'Ruby'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {

  private readonly destroyRef = inject(DestroyRef);

  // Subject acts as the input channel — every keystroke pushes a new string here.
  readonly search$ = new Subject<string>();

  readonly results = signal<string[]>([]);
  readonly log = signal<string[]>([]);

  constructor() {
    this.search$.pipe(
      // tap() is a side-effect operator — it logs but does NOT change the stream value.
      tap(term => this.addLog(`Keystroke: "${term}"`)),

      // debounceTime(400) waits for 400ms of silence before passing the value through.
      // If the user types again within 400ms, the timer resets and the previous value is dropped.
      debounceTime(400),

      // tap() again — this fires only AFTER the debounce, so it appears less often than the first tap.
      tap(term => this.addLog(`Searching for: "${term}"`)),

      // switchMap() calls filterLanguages() with the debounced term.
      // If a new term arrives while filterLanguages() is still running, switchMap() cancels
      // the previous inner Observable and switches to the new one — no stale results.
      switchMap(term => this.filterLanguages(term)),

      // takeUntilDestroyed() automatically unsubscribes when the component is destroyed.
      // No ngOnDestroy needed — Angular handles cleanup.
      takeUntilDestroyed(this.destroyRef)

    ).subscribe(matches => this.results.set(matches));
  }

  // Returns an Observable of filtered languages.
  // of() wraps a plain value in a cold Observable that emits once and completes.
  // In a real app this would be an HTTP call — same API, just async.
  private filterLanguages(term: string): Observable<string[]> {
    return of(
      LANGUAGES.filter(lang => lang.toLowerCase().includes(term.toLowerCase()))
    );
  }

  private addLog(message: string): void {
    const time = new Date().toLocaleTimeString();
    this.log.update(lines => [...lines, `[${time}] ${message}`]);
  }
}

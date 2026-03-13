import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, of } from 'rxjs';
// TODO 2: Import debounceTime, switchMap, and tap from 'rxjs/operators'

// The list of programming languages to search through.
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
  // inject() puts DestroyRef in the field — takeUntilDestroyed() needs it.
  private readonly destroyRef = inject(DestroyRef);

  // The Subject acts as the "input channel." Every keystroke pushes a new value here.
  // It's private because nothing outside this class should push to it directly.
  readonly search$ = new Subject<string>();

  // Signals hold UI state. When you update them, Angular re-renders automatically.
  readonly results = signal<string[]>([]);
  readonly log = signal<string[]>([]);

  constructor() {
    // TODO 1: Build the search pipeline here.
    //
    // The shape of the pipeline is:
    //   this.search$.pipe(
    //     tap(term => this.addLog(`Keystroke: "${term}"`)),
    //     debounceTime(400),
    //     tap(term => this.addLog(`Searching for: "${term}"`)),
    //     switchMap(term => this.filterLanguages(term)),
    //     takeUntilDestroyed(this.destroyRef)
    //   ).subscribe(matches => this.results.set(matches));
    //
    // Steps:
    //   1a. Add the tap, debounceTime, tap, switchMap operators.
    //   1b. Call takeUntilDestroyed(this.destroyRef) as the last operator.
    //   1c. Subscribe and call this.results.set(matches) in the subscriber.
  }

  // TODO 3: Implement this method. It should:
  //   - Filter the LANGUAGES array by whether the language name includes `term` (case-insensitive).
  //   - Wrap the result in of() and return it.
  //   - of() turns a plain value into a cold Observable that emits once and completes.
  //
  // Hint:
  //   return of(LANGUAGES.filter(lang => lang.toLowerCase().includes(term.toLowerCase())));
  private filterLanguages(term: string): Observable<string[]> {
    return of([]); // Replace this stub once you implement the filter above.
  }

  // Helper: appends a timestamped line to the log signal.
  private addLog(message: string): void {
    const time = new Date().toLocaleTimeString();
    this.log.update(lines => [...lines, `[${time}] ${message}`]);
  }
}

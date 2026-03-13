import { Component, signal, computed, effect } from '@angular/core';

// effect() runs a side effect whenever its dependency signals change.
// Returning a function from effect() registers a cleanup — it runs before
// the next execution. Here we use that to debounce the console.log.

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  readonly countries: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia',
    'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
    'Colombia', 'Croatia', 'Czech Republic', 'Denmark', 'Egypt',
    'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'India',
    'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
    'Japan', 'Jordan', 'Kenya', 'South Korea', 'Mexico', 'Morocco',
    'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan',
    'Peru', 'Philippines', 'Poland', 'Portugal', 'Romania', 'Russia',
    'Saudi Arabia', 'South Africa', 'Spain', 'Sweden', 'Switzerland',
    'Thailand', 'Turkey', 'Ukraine', 'United Kingdom', 'United States',
    'Venezuela', 'Vietnam',
  ];

  readonly query = signal('');

  // computed() filters the list — recalculates every time query() changes.
  // When query is empty, return all countries; otherwise case-insensitive filter.
  readonly results = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return this.countries;
    return this.countries.filter(c => c.toLowerCase().includes(q));
  });

  // computed() reading another computed() — only re-runs when results() changes
  readonly resultCount = computed(() => this.results().length);

  constructor() {
    // effect() re-runs whenever query() or resultCount() change (both are read inside).
    // setTimeout debounces the log — wait 300ms after the last keystroke before logging.
    // The cleanup function (return () => clearTimeout) cancels the timer before the NEXT
    // execution, so we never log a stale query.
    effect(() => {
      const q = this.query();
      const count = this.resultCount();
      const timer = setTimeout(() => {
        console.log(`Query: "${q}" — ${count} result(s)`);
      }, 300);
      return () => clearTimeout(timer); // cleanup: cancel the old timer on next run
    });
  }
}

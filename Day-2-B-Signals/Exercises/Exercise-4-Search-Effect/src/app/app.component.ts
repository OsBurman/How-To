import { Component, signal } from '@angular/core';

// TODO 1: Add computed and effect to the import above
//         import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Full list of countries to filter through
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

  // Current search query — wire this to the input in the template (TODO 5)
  readonly query = signal('');

  // TODO 2: Declare readonly results = computed(...)
  //         When query() is empty, return the full countries array
  //         Otherwise, filter countries where the name includes the query
  //         (case-insensitive: use .toLowerCase() on both sides)

  // TODO 3: Declare readonly resultCount = computed(...)
  //         Return results().length

  // TODO 4: Add an effect() in the constructor that:
  //         - Reads query() and resultCount() inside the effect
  //         - Uses setTimeout to log them after a 300ms debounce
  //         - Returns clearTimeout as the cleanup function
  //         constructor() {
  //           effect(() => {
  //             const q = this.query();
  //             const count = this.resultCount();
  //             const timer = setTimeout(() => {
  //               console.log(`Query: "${q}" — ${count} result(s)`);
  //             }, 300);
  //             return () => clearTimeout(timer);  // cleanup
  //           });
  //         }
}

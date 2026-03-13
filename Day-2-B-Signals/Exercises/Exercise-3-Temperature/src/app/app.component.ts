import { Component, signal } from '@angular/core';

// TODO 1: Add computed to the import above
//         import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Starting temperature — already wired to the range slider in the template
  readonly celsius = signal(20);

  // TODO 2: Declare readonly fahrenheit = computed(...)
  //         Formula: (celsius() * 9 / 5) + 32
  //         Round to 1 decimal place: Math.round(value * 10) / 10

  // TODO 3: Declare readonly kelvin = computed(...)
  //         Formula: celsius() + 273.15
  //         Round to 2 decimal places: Math.round(value * 100) / 100

  // TODO 4: Declare readonly description = computed(...)
  //         Return a descriptive string based on celsius():
  //           below 0   → 'Freezing'
  //           0 to 14   → 'Cold'
  //           15 to 24  → 'Comfortable'
  //           25 to 34  → 'Warm'
  //           35+       → 'Hot'

  // This method is pre-wired to the slider — no changes needed here
  onCelsiusChange(event: Event): void {
    this.celsius.set(+(event.target as HTMLInputElement).value);
  }
}

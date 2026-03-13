import { Component, signal, computed } from '@angular/core';

// Each computed() signal reads celsius() — they all recalculate together
// whenever the slider moves and celsius() changes.

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  readonly celsius = signal(20);

  // computed() runs a function and caches the result until celsius() changes
  readonly fahrenheit = computed(() => {
    const value = (this.celsius() * 9 / 5) + 32;
    return Math.round(value * 10) / 10;
  });

  readonly kelvin = computed(() => {
    const value = this.celsius() + 273.15;
    return Math.round(value * 100) / 100;
  });

  // computed() can contain any logic — conditionals, string returns, whatever you need
  readonly description = computed(() => {
    const c = this.celsius();
    if (c < 0)  return 'Freezing';
    if (c < 15) return 'Cold';
    if (c < 25) return 'Comfortable';
    if (c < 35) return 'Warm';
    return 'Hot';
  });

  onCelsiusChange(event: Event): void {
    this.celsius.set(+(event.target as HTMLInputElement).value);
  }
}

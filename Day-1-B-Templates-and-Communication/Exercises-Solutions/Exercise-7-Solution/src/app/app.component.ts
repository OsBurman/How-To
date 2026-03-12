import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // ===== SIGNALS =====

  // Writable signal: holds the current Celsius temperature
  readonly celsius = signal(0);

  // Computed signal: derives Fahrenheit from Celsius automatically
  readonly fahrenheit = computed(() => this.celsius() * 9 / 5 + 32);

  // Computed signal: returns a human-readable description based on temperature
  readonly description = computed(() => {
    const c = this.celsius();
    if (c <= 0) {
      return 'Freezing';
    }
    if (c < 15) {
      return 'Cold';
    }
    if (c < 25) {
      return 'Comfortable';
    }
    return 'Hot';
  });

  // ===== METHODS =====

  // Uses .update() to transform the current value — adds 1
  increaseTemp(): void {
    this.celsius.update(c => c + 1);
  }

  // Uses .update() to transform the current value — subtracts 1
  decreaseTemp(): void {
    this.celsius.update(c => c - 1);
  }

  // Uses .set() to replace the current value entirely — resets to 0
  resetTemp(): void {
    this.celsius.set(0);
  }
}

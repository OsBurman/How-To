import { Component } from '@angular/core';
// TODO: Import signal and computed from '@angular/core'
// import { signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // ===== SIGNALS =====

  // TODO: Create a writable signal for Celsius, initialized to 0
  // readonly celsius = signal(0);

  // TODO: Create a computed signal that converts Celsius to Fahrenheit
  // Formula: celsius * 9 / 5 + 32
  // readonly fahrenheit = computed(() => this.celsius() * 9 / 5 + 32);

  // TODO: Create a computed signal that returns a description string:
  //   - 'Freezing' when celsius <= 0
  //   - 'Cold' when celsius < 15
  //   - 'Comfortable' when celsius < 25
  //   - 'Hot' when celsius >= 25
  // readonly description = computed(() => { ... });

  // ===== METHODS =====

  // TODO: Implement increaseTemp() — use .update() to add 1 to celsius
  // increaseTemp(): void {
  //   this.celsius.update(c => c + 1);
  // }

  // TODO: Implement decreaseTemp() — use .update() to subtract 1 from celsius
  // decreaseTemp(): void {
  //   this.celsius.update(c => c - 1);
  // }

  // TODO: Implement resetTemp() — use .set() to reset celsius to 0
  // resetTemp(): void {
  //   this.celsius.set(0);
  // }
}

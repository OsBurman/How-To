import { Component, signal, computed } from '@angular/core';

// signal() creates a reactive container for a value.
// computed() creates a read-only derived signal that recalculates automatically.

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // signal(0) — initial value is 0; the type is inferred as signal<number>
  readonly count = signal(0);

  // computed() reads count() — recalculates only when count() changes
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    // update() receives the current value and returns the new value
    this.count.update(c => c + 1);
  }

  decrement(): void {
    this.count.update(c => c - 1);
  }

  reset(): void {
    // set() replaces the value entirely — no reference to the previous value needed
    this.count.set(0);
  }
}

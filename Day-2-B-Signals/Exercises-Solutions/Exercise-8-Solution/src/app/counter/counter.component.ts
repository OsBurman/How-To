import { Component, signal, computed } from '@angular/core';

// Step 7 reflection:
// Fine-grained change detection means Angular only re-runs a computed() function
// when the specific signals it reads have changed — NOT when unrelated signals change.
//
// doubled() reads count() — it does NOT read time().
// So even though the clock ticks every second, doubled() never re-runs during that tick.
// You can verify this: "Counter: doubled computing" only logs when you click a button,
// never when the clock updates. Angular tracks signal dependencies at the level of
// individual expressions, not at the level of components.

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  readonly count = signal(0);

  // Step 3: console.log added — watch this carefully.
  // This fires ONLY when count() changes (when you click a button).
  // It does NOT fire every second when the clock ticks — because doubled()
  // has no dependency on the time signal. This IS fine-grained change detection.
  readonly doubled = computed(() => {
    console.log('Counter: doubled computing');
    return this.count() * 2;
  });

  increment(): void {
    this.count.update(c => c + 1);
  }

  decrement(): void {
    this.count.update(c => c - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}

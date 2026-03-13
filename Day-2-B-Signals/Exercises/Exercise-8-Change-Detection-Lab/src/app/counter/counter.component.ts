import { Component, signal, computed } from '@angular/core';

// TODO (step 7): Add a multi-line comment HERE in your own words explaining
// what "fine-grained change detection" means based on your console observations.
// Example prompt: "Fine-grained change detection means Angular only re-runs..."

// CounterComponent — completely independent of ClockComponent.
// It has its own signal (count) and its own computed (doubled).
// The clock ticking does NOT cause doubled to re-compute —
// because doubled does not read the time signal.
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  // count is the source signal — only changes when the user clicks
  readonly count = signal(0);

  // TODO (step 3): Add a console.log inside this computed() callback:
  //   console.log('Counter: doubled computing');
  // Then watch the console — does it fire every second when the clock ticks?
  readonly doubled = computed(() => {
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

import { Component, input, computed } from '@angular/core';

// input() creates a read-only signal that the PARENT writes into.
// The child cannot call .set() — the parent owns the value.
// input.required() has no default — Angular throws a compile error if the parent omits it.

@Component({
  selector: 'app-rating-display',
  standalone: true,
  templateUrl: './rating-display.component.html',
  styleUrl: './rating-display.component.css'
})
export class RatingDisplayComponent {

  // Optional input with a default — parent can override with [rating]="score()"
  readonly rating = input<number>(0);

  // Optional input with a default — parent can override with [maxStars]="10"
  readonly maxStars = input<number>(5);

  // Required input — no default; parent MUST pass label="..." or [label]="someSignal()"
  readonly label = input.required<string>();

  // computed() reads both maxStars() and rating() — re-evaluates when either changes.
  // Array.from builds an array of { filled } objects, one per star.
  readonly stars = computed(() =>
    Array.from({ length: this.maxStars() }, (_, i) => ({
      filled: i < this.rating()
    }))
  );
}

/**
 * rating-input.component.ts — Rating Input
 *
 * Demonstrates ALL THREE new signal-based component communication APIs:
 *
 * 1. input() — signal-based @Input replacement (READ-ONLY)
 *    - maxStars: readonly input for configuration
 *    - label: readonly input for the label text
 *    ⚠️ You CANNOT call .set() on an input() — the PARENT owns the value.
 *       Attempting to call this.maxStars.set(10) would throw an error.
 *
 * 2. model() — two-way signal binding (READ + WRITE)
 *    - rating: two-way binding between parent and child
 *    - Parent binds with [(rating)]="parentSignal"
 *    - Child reads rating() and writes with rating.set(newValue)
 *    - Both parent and child stay in sync automatically
 *
 * 3. output() — signal-based @Output replacement
 *    - rated: emits when the user confirms a selection
 *    - Parent handles with (rated)="handler($event)"
 *    - Emitted value is passed to the parent handler as $event
 *
 * CLI command:
 *   ng generate component rating-input --standalone
 */

import { Component, signal, input, output, model, computed } from '@angular/core';

@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.css'
})
export class RatingInputComponent {

  // ── SIGNAL-BASED input() ──

  /**
   * input() — receives a value from the parent component (read-only).
   *
   * In the parent template: [label]="'Product Quality'"
   * Read inside this component: this.label()
   *
   * ⚠️ READONLY: You CANNOT call this.label.set('new value').
   *    The parent owns this value. If you try, Angular throws a runtime error.
   *    This is by design — it enforces unidirectional data flow.
   *
   * Compare with the legacy @Input() which was a plain mutable property —
   * nothing stopped you from writing to it in the child, which caused bugs.
   */
  readonly label = input<string>('Rating');

  /**
   * input() with a default value — maxStars configures how many stars to show.
   * Required version: input.required<number>() — would throw if parent omits it.
   * Optional version (shown here): input<number>(5) — defaults to 5.
   */
  readonly maxStars = input<number>(5);

  // ── SIGNAL-BASED model() ──

  /**
   * model() — two-way signal binding between parent and child.
   *
   * In the parent template: [(rating)]="parentRatingSignal"
   * - When the child calls this.rating.set(4), the parent's signal updates too.
   * - When the parent's signal changes, this.rating() reflects the new value.
   *
   * This replaces the boilerplate @Input() + @Output() pair pattern:
   *   Legacy:  @Input() rating: number; @Output() ratingChange = new EventEmitter<number>();
   *   Modern:  readonly rating = model<number>(1);
   *
   * The default value (1) is used when the parent doesn't provide an initial value.
   */
  readonly rating = model<number>(1);

  // ── SIGNAL-BASED output() ──

  /**
   * output() — emits a one-way event to the parent.
   *
   * In the parent template: (rated)="onRated($event)"
   *
   * Use output() for events that are DISTINCT from model() updates.
   * Here, 'rated' fires when the user explicitly CONFIRMS the selection,
   * while 'rating' (model) updates on every hover/click preview.
   *
   * Compare with legacy: @Output() rated = new EventEmitter<number>();
   */
  readonly rated = output<number>();

  // ── computed() from input() ──

  /**
   * stars — an array of star indices for @for rendering.
   * Recalculates when maxStars() input changes.
   */
  readonly stars = computed(() =>
    Array.from({ length: this.maxStars() }, (_, i) => i + 1)
  );

  /**
   * hoverRating — the currently hovered star index for visual preview.
   * This is a plain signal (not model()) because the parent doesn't need it.
   */
  readonly hoverRating = signal<number>(0);

  /**
   * displayRating — the rating to visually highlight.
   * Shows hoverRating during hover, rating during normal display.
   */
  readonly displayRating = computed(() =>
    this.hoverRating() > 0 ? this.hoverRating() : this.rating()
  );

  /**
   * setRating — updates the model() signal with a new value.
   * This propagates the change to the parent automatically.
   */
  setRating(value: number): void {
    this.rating.set(value); // Updates model() — parent sees this change immediately
  }

  /**
   * confirmRating — emits the output() event to the parent.
   * The parent receives the current rating() value as $event.
   */
  confirmRating(): void {
    this.rated.emit(this.rating()); // Emits via output() — parent's (rated) handler fires
  }

  setHover(value: number): void {
    this.hoverRating.set(value);
  }

  clearHover(): void {
    this.hoverRating.set(0);
  }
}



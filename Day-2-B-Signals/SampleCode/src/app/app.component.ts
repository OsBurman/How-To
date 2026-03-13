/**
 * app.component.ts — Root Application Component
 *
 * The parent orchestrator that demonstrates:
 * - Hosting all child signal-demo components
 * - Passing model() values to child components with [(rating)] two-way binding
 * - Receiving output() events from children
 * - Using signal() at the parent level to track app state
 *
 * CLI command that generated this file:
 *   ng new d2b-signals --standalone
 */

import { Component, signal } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartSignalsComponent } from './shopping-cart-signals/shopping-cart-signals.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { BudgetTrackerComponent } from './budget-tracker/budget-tracker.component';
import { RatingInputComponent } from './rating-input/rating-input.component';

@Component({
  selector: 'app-root',
  standalone: true,            // No NgModule — component manages its own dependencies
  imports: [
    ShoppingCartComponent,       // Enables <app-shopping-cart>
    ShoppingCartSignalsComponent, // Enables <app-shopping-cart-signals>
    SearchBoxComponent,           // Enables <app-search-box>
    BudgetTrackerComponent,       // Enables <app-budget-tracker>
    RatingInputComponent          // Enables <app-rating-input>
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly pageTitle: string = 'Day 2 Part B — Signals';

  /**
   * productRating — a signal at the parent level, bound to RatingInputComponent
   * via model() two-way binding: [(rating)]="productRating".
   *
   * When the child updates its model(), this signal is updated automatically.
   * When this signal changes, the child's display updates automatically.
   * This is the modern replacement for @Input() + @Output() pairs.
   */
  readonly productRating = signal<number>(3);

  /**
   * lastRatingEvent — records the last "rated" output() event emitted by
   * RatingInputComponent. Updated via (rated)="onRated($event)".
   */
  lastRatingEvent: string = 'None yet';

  /**
   * onRated — handles the output() event from RatingInputComponent.
   * Called when the user confirms a rating (distinct from model() two-way sync).
   */
  onRated(rating: number): void {
    this.lastRatingEvent = `Confirmed: ${rating} stars at ${new Date().toLocaleTimeString()}`;
  }
}

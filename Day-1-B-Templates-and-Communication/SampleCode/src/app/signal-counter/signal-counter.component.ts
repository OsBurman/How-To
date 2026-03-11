/**
 * signal-counter.component.ts — Signal Counter Component (Day 2 Preview)
 *
 * ═══════════════════════════════════════════════════════════════
 *  🔮 DAY 2 PREVIEW — Signals
 *  This is a first look at Angular Signals. You are NOT required
 *  to use signals in today's exercises. We go deep on Day 2.
 *  For now, just see the pattern and understand the basic idea.
 * ═══════════════════════════════════════════════════════════════
 *
 * Demonstrates:
 * - signal() — creating a piece of reactive state
 * - computed() — creating a derived value that auto-recalculates
 * - Reading signals in templates with signal() syntax: {{ count() }}
 * - Updating signals with .set() and .update()
 *
 * CLI command that generated this file:
 *   ng generate component signal-counter --standalone
 *   (shorthand: ng g c signal-counter --standalone)
 */

import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signal-counter', // Use as <app-signal-counter>
  standalone: true,                // No NgModule needed
  imports: [],                     // No child components or directives needed
  templateUrl: './signal-counter.component.html', // External template
  styleUrl: './signal-counter.component.css'      // External styles
})
export class SignalCounterComponent {

  /**
   * signal() creates a REACTIVE value.
   *
   * - Read the current value by calling it like a function: this.count()
   * - Set a new value with .set(): this.count.set(5)
   * - Update based on the current value with .update(): this.count.update(c => c + 1)
   *
   * In the template, you read it with {{ count() }} — note the parentheses.
   * This is different from regular properties which use {{ count }} (no parens).
   *
   * Why signals? They give Angular fine-grained reactivity — Angular knows
   * exactly which parts of the template to update when a signal changes.
   * On Day 2, you'll see how this is more efficient than traditional change detection.
   */
  readonly count = signal(0);

  /**
   * computed() creates a DERIVED value that automatically recalculates
   * whenever any signal it reads changes.
   *
   * doubled depends on count — when count changes, doubled automatically
   * recalculates. You never manually update it.
   *
   * In the template: {{ doubled() }}
   */
  readonly doubled = computed(() => this.count() * 2);

  /**
   * Another computed signal — derives a user-friendly message.
   * Every time count changes, this recalculates automatically.
   */
  readonly message = computed(() =>
    this.count() === 0
      ? 'Click a button to start counting!'
      : `You've clicked ${this.count()} time${this.count() === 1 ? '' : 's'}`
  );

  /**
   * increment — updates the count signal by adding 1.
   * .update() takes a function that receives the current value and returns the new value.
   */
  increment(): void {
    this.count.update(current => current + 1);
  }

  /**
   * decrement — updates the count signal by subtracting 1.
   */
  decrement(): void {
    this.count.update(current => current - 1);
  }

  /**
   * reset — sets the count signal to 0.
   * .set() replaces the current value entirely (unlike .update which transforms it).
   */
  reset(): void {
    this.count.set(0);
  }
}

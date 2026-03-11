/**
 * legacy/character-counter.component.ts — Character Counter (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * KEY LEGACY DIFFERENCES:
 * - No standalone: true — declared in AppModule instead.
 * - No imports: [FormsModule] on the component — FormsModule is imported in
 *   AppModule, making [(ngModel)] available to ALL declared components.
 *   You can't tell from this file that it needs FormsModule.
 * - styleUrls (plural array) instead of styleUrl (singular string).
 *
 * PAIN POINT: If someone removes FormsModule from app.module.ts (maybe cleaning
 * up unused imports), this component's [(ngModel)] silently stops working.
 * The dependency is invisible. In modern Angular, FormsModule is imported directly
 * in the component's imports array — the dependency is explicit and localized.
 *
 * The binding syntax itself (interpolation, property, event, two-way) is
 * identical in legacy and modern Angular.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  // No standalone: true — declared in app.module.ts
  // No imports: [FormsModule] — FormsModule comes from the NgModule
  selector: 'app-character-counter',
  templateUrl: './character-counter.component.html',
  // LEGACY: styleUrls (plural array)
  // Modern equivalent: styleUrl: './character-counter.component.css'
  styleUrls: ['./character-counter.component.css']
})
export class CharacterCounterComponent implements OnInit, OnDestroy {
  // Two-way binding target: [(ngModel)] keeps this in sync with the textarea.
  message: string = '';

  // Property binding source: controls input behavior and visual indicators.
  maxLength: number = 140;

  // Interpolation source: displayed in the template with {{ }}.
  autoSaveCount: number = 0;

  // Timer ID for cleanup in ngOnDestroy — prevents memory leaks.
  private autoSaveTimerId: number | null = null;

  /**
   * ngOnInit — Start a simulated auto-save interval.
   * Init logic goes here, not in the constructor, because Angular
   * hasn't fully set up the component in the constructor.
   */
  ngOnInit(): void {
    // Simulates periodic auto-save — runs every 5 seconds.
    this.autoSaveTimerId = window.setInterval(() => {
      if (this.message.length > 0) {
        this.autoSaveCount++;
        console.log(`[Legacy] Auto-saved draft #${this.autoSaveCount}`);
      }
    }, 5000);
  }

  /** Computed-style getter: remaining characters before the limit. */
  get remainingChars(): number {
    return this.maxLength - this.message.length;
  }

  /** Computed-style getter: true when the message exceeds the limit. */
  get isOverLimit(): boolean {
    return this.message.length > this.maxLength;
  }

  /**
   * Event binding handler: called on every keystroke via (input).
   * Demonstrates event binding as one of the four binding types.
   */
  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    console.log(`[Legacy] Input event — length: ${target.value.length}`);
  }

  /** Resets the message — clears the textarea via two-way binding. */
  clearMessage(): void {
    this.message = '';
  }

  /**
   * ngOnDestroy — Clean up the auto-save interval to prevent memory leaks.
   * This runs when the component is removed from the DOM.
   * Always cancel timers, intervals, and subscriptions here.
   */
  ngOnDestroy(): void {
    if (this.autoSaveTimerId !== null) {
      window.clearInterval(this.autoSaveTimerId);
      this.autoSaveTimerId = null;
      console.log('[Legacy] Auto-save interval cleared — no memory leak!');
    }
  }
}

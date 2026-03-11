/**
 * character-counter.component.ts — Character Counter Component
 *
 * Demonstrates ALL FOUR binding types in one component:
 *   1. Interpolation {{ }}  — displaying charCount, remainingChars, autoSaveCount
 *   2. Property binding []  — [disabled] on the Clear button, [class.over-limit] on the counter
 *   3. Event binding ()     — (input) on the textarea to track keystrokes
 *   4. Two-way binding [()] — [(ngModel)] keeps the message property and textarea in sync
 *
 * Also demonstrates:
 * - FormsModule import — required in the standalone component's imports array for [(ngModel)]
 * - ngOnInit — starting an auto-save interval timer
 * - ngOnDestroy — clearing the interval to prevent memory leaks
 *
 * CLI command that generated this file:
 *   ng generate component character-counter --standalone
 *   (shorthand: ng g c character-counter --standalone)
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)] two-way binding

@Component({
  selector: 'app-character-counter', // Use as <app-character-counter>
  standalone: true,                   // No NgModule needed
  imports: [
    FormsModule // ← REQUIRED: Without this, [(ngModel)] silently does nothing.
    //               In standalone components, you import FormsModule directly here.
    //               In legacy Angular, FormsModule was imported in the NgModule instead.
  ],
  templateUrl: './character-counter.component.html', // External template
  styleUrl: './character-counter.component.css'      // External styles
})
export class CharacterCounterComponent implements OnInit, OnDestroy {

  /**
   * message — the text bound to the textarea via [(ngModel)].
   * Two-way binding means:
   *   - When the user types, Angular updates this property automatically
   *   - When code changes this property, Angular updates the textarea automatically
   *   - The component and the DOM are always in sync
   */
  message: string = '';

  /**
   * maxLength — the character limit. Used with property binding [disabled]
   * to disable the submit button when the limit is exceeded.
   */
  readonly maxLength: number = 140;

  /**
   * charCount — tracks total characters typed (including deleted ones).
   * Incremented by the (input) event binding on the textarea.
   * This is different from message.length — charCount tracks ALL keystrokes.
   */
  charCount: number = 0;

  /**
   * autoSaveCount — counts how many times the "auto-save" has fired.
   * Updated by the interval timer started in ngOnInit.
   */
  autoSaveCount: number = 0;

  /**
   * Timer ID for the auto-save interval. Stored so we can clear it in ngOnDestroy.
   * Using window.setInterval explicitly to get the browser's number return type.
   */
  private autoSaveTimerId: number | null = null;

  // ── LIFECYCLE: ngOnInit ──

  /**
   * ngOnInit — start the auto-save interval timer.
   *
   * Initialization logic goes here, not in the constructor.
   * The constructor is for simple assignments. ngOnInit runs after Angular
   * has fully initialized the component (including setting @Input() values,
   * though this component doesn't have any).
   */
  ngOnInit(): void {
    // Simulate an auto-save feature: every 5 seconds, "save" the draft
    this.autoSaveTimerId = window.setInterval(() => {
      if (this.message.length > 0) {
        this.autoSaveCount++;
        // In a real app, you'd call a service to save the draft (Day 3)
      }
    }, 5000);
  }

  // ── COMPUTED PROPERTIES (getters) ──

  /**
   * remainingChars — how many characters the user can still type.
   * Displayed via interpolation {{ remainingChars }}.
   */
  get remainingChars(): number {
    return this.maxLength - this.message.length;
  }

  /**
   * isOverLimit — true when the message exceeds maxLength.
   * Used with property binding [disabled]="isOverLimit" on the submit button
   * and [class.over-limit]="isOverLimit" to add a CSS class conditionally.
   */
  get isOverLimit(): boolean {
    return this.message.length > this.maxLength;
  }

  // ── EVENT HANDLERS ──

  /**
   * onInput — called on every (input) event from the textarea.
   * This is EVENT BINDING: (input)="onInput($event)"
   * The $event object is the native DOM InputEvent.
   */
  onInput(event: Event): void {
    this.charCount++; // Track every keystroke — demonstrates event binding side effects
  }

  /**
   * clearMessage — resets the message. Because of two-way binding [(ngModel)],
   * setting this.message = '' also clears the textarea automatically.
   */
  clearMessage(): void {
    this.message = '';
  }

  // ── LIFECYCLE: ngOnDestroy ──

  /**
   * ngOnDestroy — clean up when Angular removes this component from the DOM.
   *
   * ⚠️ WHY THIS MATTERS:
   * If you start a timer (setInterval, setTimeout) or subscribe to a stream
   * and don't clean it up, it keeps running even after the component is gone.
   * This is a MEMORY LEAK — the callback still fires, references the old
   * component, and wastes resources. Always clean up in ngOnDestroy.
   *
   * Rule of thumb: if you create it in ngOnInit, destroy it in ngOnDestroy.
   */
  ngOnDestroy(): void {
    if (this.autoSaveTimerId !== null) {
      window.clearInterval(this.autoSaveTimerId); // Stop the timer
      this.autoSaveTimerId = null;                // Clear the reference
    }
  }
}

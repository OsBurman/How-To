/**
 * search-box.component.ts — Search Box
 *
 * Demonstrates:
 * - signal() for the search query — .set() on every keystroke
 * - computed() for filtered results — auto-recalculates when query changes
 * - effect() with a CLEANUP FUNCTION — logs to the console and simulates
 *   an analytics ping; cleanup runs before the next execution and on destroy
 *
 * CLI command:
 *   ng generate component search-box --standalone
 */

import { Component, signal, computed, effect, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule], // Required for [(ngModel)] on the search input
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnDestroy {

  /**
   * All available items to search through.
   * This is a plain readonly property — it never changes, so no signal needed.
   */
  readonly allItems: string[] = [
    'Angular Signals', 'signal()', 'computed()', 'effect()', 'input()',
    'output()', 'model()', 'Zone.js', 'Fine-grained reactivity',
    'ViewEncapsulation', 'NgModule', 'bootstrapApplication'
  ];

  /**
   * signal() — query holds the current search string.
   *
   * Every time the user types, we call this.query.set(newValue).
   * Angular tracks every template read of query() and updates
   * only those DOM nodes when the signal changes.
   */
  readonly query = signal<string>('');

  /**
   * computed() — results filters allItems based on query().
   *
   * Angular calls this function ONLY when query() changes.
   * If the user clicks a button elsewhere in the app that doesn't
   * affect query, this computed() is NOT re-evaluated.
   *
   * Results are CACHED until query() changes.
   */
  readonly results = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.allItems;
    return this.allItems.filter(item => item.toLowerCase().includes(q));
  });

  /**
   * computed() — result count for display in the template.
   * Derived from results(), so it also recalculates only when results() changes.
   */
  readonly resultCount = computed(() => this.results().length);

  /**
   * effectLog — stores the log messages produced by effect() for display.
   * This is a plain property (not a signal) because the effect writes to it.
   * If it were a signal, the effect writing to it could cause infinite loops.
   */
  effectLog: string[] = [];

  /**
   * effect() — runs whenever query() changes.
   *
   * Use effect() for side effects: logging, analytics, localStorage, etc.
   *
   * THE CLEANUP FUNCTION:
   * The function returned from effect() runs before the NEXT execution
   * and when the component is destroyed. This is how you prevent memory leaks.
   *
   * Example: if you start a debounce timer inside effect(), you must clear it
   * in the cleanup. Without cleanup: the old timer fires after the new one
   * starts, causing duplicate requests.
   *
   * ⚠️ COMMON MISTAKE: Forgetting to return a cleanup function when the
   * effect sets up a timer or subscription. Always return a cleanup if you
   * create anything that outlives the current execution.
   */
  private readonly searchEffect = effect(() => {
    const currentQuery = this.query(); // Track this signal as a dependency

    // Simulate an analytics ping for every search
    const timerId = window.setTimeout(() => {
      const message = `[effect] Searched: "${currentQuery}" → ${this.results().length} results`;
      this.effectLog = [...this.effectLog.slice(-4), message]; // Keep last 5 entries
    }, 300); // Debounce: wait 300ms before firing

    // CLEANUP FUNCTION — runs before the next effect execution
    // and when the component is destroyed.
    // Without this, every keystroke would create a new pending timer.
    return () => {
      window.clearTimeout(timerId); // Cancel the debounced timer
    };
  });

  /**
   * onSearch — called by the (input) event on the search field.
   * Updates the query signal, which triggers the computed() and effect().
   */
  onSearch(value: string): void {
    this.query.set(value); // .set() replaces the entire signal value
  }

  /**
   * clearSearch — resets the query signal to an empty string.
   */
  clearSearch(): void {
    this.query.set('');
  }

  /**
   * ngOnDestroy — the effect() cleanup runs automatically when the component
   * is destroyed, so no manual cleanup is needed here for the effect itself.
   * This is included to show that effect cleanup is handled for you.
   */
  ngOnDestroy(): void {
    // Angular automatically runs the effect's cleanup function on destroy.
    // No manual clearTimeout needed here — the effect's return function handles it.
    console.log('[SearchBoxComponent] Destroyed — effect cleanup ran automatically.');
  }
}

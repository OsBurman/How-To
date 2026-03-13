/**
 * budget-tracker.component.ts — Budget Tracker
 *
 * Demonstrates computed() for multiple derived values from one signal source.
 *
 * - expenses is a signal<Expense[]> — the single source of truth
 * - totalBudget is a signal<number> — the configured budget
 * - totalSpent, remaining, percentUsed are ALL computed() from those two signals
 * - Adding an expense triggers ALL computed() recalculations automatically
 *
 * No manual "update total after change" logic — computed() handles everything.
 *
 * CLI command:
 *   ng generate component budget-tracker --standalone
 */

import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: 'food' | 'tech' | 'travel' | 'other';
}

@Component({
  selector: 'app-budget-tracker',
  standalone: true,
  imports: [FormsModule], // For [(ngModel)] on the add-expense form
  templateUrl: './budget-tracker.component.html',
  styleUrl: './budget-tracker.component.css'
})
export class BudgetTrackerComponent {

  /**
   * signal() — totalBudget is the user-configurable budget.
   * Changing this instantly recalculates remaining and percentUsed.
   */
  readonly totalBudget = signal<number>(500);

  /**
   * signal() — expenses is the list of all recorded expenses.
   * All computed signals depend on this list.
   */
  readonly expenses = signal<Expense[]>([
    { id: 1, description: 'Angular course', amount: 99, category: 'tech' },
    { id: 2, description: 'Conference ticket', amount: 150, category: 'travel' }
  ]);

  // ── computed() DERIVED SIGNALS ──
  // All of these recalculate automatically when expenses() or totalBudget() changes.
  // You never call them manually — Angular tracks the dependencies.

  /**
   * computed() — sum of all expense amounts.
   * Dependencies: expenses()
   */
  readonly totalSpent = computed(() =>
    this.expenses().reduce((sum: number, e: Expense) => sum + e.amount, 0)
  );

  /**
   * computed() — how much budget is left.
   * Dependencies: totalBudget(), totalSpent()
   */
  readonly remaining = computed(() => this.totalBudget() - this.totalSpent());

  /**
   * computed() — percentage of budget consumed (capped at 100%).
   * Dependencies: totalSpent(), totalBudget()
   */
  readonly percentUsed = computed(() =>
    Math.min(100, Math.round((this.totalSpent() / this.totalBudget()) * 100))
  );

  /**
   * computed() — CSS class for the progress bar based on percentage.
   * Returns a string used in [class]="barClass()" in the template.
   */
  readonly barClass = computed(() => {
    const pct = this.percentUsed();
    if (pct >= 90) return 'bar danger';
    if (pct >= 70) return 'bar warning';
    return 'bar ok';
  });

  // ── New expense form state ──
  // These are plain signals for the form fields (not computed).

  readonly newDescription = signal<string>('');
  readonly newAmount = signal<number>(0);
  readonly newCategory = signal<Expense['category']>('other');

  private nextId: number = 3;

  /**
   * addExpense — creates a new Expense and adds it to the signal list.
   * Uses .update() to derive the new list from the current one.
   * After this call, all computed() signals recalculate automatically.
   */
  addExpense(): void {
    const desc = this.newDescription().trim();
    const amount = this.newAmount();
    if (!desc || amount <= 0) return;

    const expense: Expense = {
      id: this.nextId++,
      description: desc,
      amount,
      category: this.newCategory()
    };

    this.expenses.update((current: Expense[]) => [...current, expense]);

    // Reset form fields
    this.newDescription.set('');
    this.newAmount.set(0);
  }

  /**
   * removeExpense — removes by id using .update().
   */
  removeExpense(id: number): void {
    this.expenses.update((current: Expense[]) => current.filter((e: Expense) => e.id !== id));
  }

  /**
   * updateBudget — changes the totalBudget signal.
   * remaining() and percentUsed() recalculate automatically.
   */
  updateBudget(value: number): void {
    if (value > 0) this.totalBudget.set(value);
  }
}

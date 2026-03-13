import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, effect, computed, input, signal } from '@angular/core';
import { Expense } from '../expense.model';
import { ExpenseInputComponent } from '../expense-input/expense-input.component';

// BudgetDashboardComponent is the heart of the signals demo:
//
//   input()    — receives budgetCap from AppComponent (read-only)
//   signal()   — owns the expenses array; mutated immutably with .update()
//   computed() — derives total, remaining, percentSpent, warningLevel from signals
//   effect()   — persists to localStorage with debounce + cleanup function
//   model()    — passes draftAmount to ExpenseInputComponent for two-way reset

@Component({
  selector: 'app-budget-dashboard',
  standalone: true,
  imports: [ExpenseInputComponent, CurrencyPipe, DatePipe],
  templateUrl: './budget-dashboard.component.html',
  styleUrl: './budget-dashboard.component.css'
})
export class BudgetDashboardComponent {

  // ─────────────────────────────────────────────
  // INPUT — receives budget cap from AppComponent
  // ─────────────────────────────────────────────

  // input() — read-only signal; AppComponent is the owner.
  // The default (1000) is used if the parent doesn't provide a value.
  // When AppComponent's budgetCap signal changes, this input() updates automatically,
  // which triggers any computed() that reads budgetCap() to recalculate.
  readonly budgetCap = input<number>(1000);

  // ─────────────────────────────────────────────
  // WRITABLE SIGNALS — owned by this component
  // ─────────────────────────────────────────────

  // signal<Expense[]>([]) — the source of truth for all expense data.
  // Always updated immutably: .update(list => [...list]) or .update(list => list.filter(...))
  readonly expenses = signal<Expense[]>([]);

  // draftAmount is shared with ExpenseInputComponent via model() two-way binding.
  // When the user submits an expense, onExpenseAdded() resets this to 0,
  // which flows DOWN into ExpenseInputComponent and clears the amount field.
  readonly draftAmount = signal<number>(0);

  // ─────────────────────────────────────────────
  // COMPUTED — derived read-only signals
  // ─────────────────────────────────────────────

  // computed() recalculates automatically when expenses() changes.
  // No manual trigger needed — Angular tracks the signal dependency.
  readonly total = computed(() =>
    this.expenses().reduce((sum, e) => sum + e.amount, 0)
  );

  // computed() reading BOTH total() AND budgetCap() — recalculates when either changes.
  // If AppComponent changes the budget cap, remaining updates instantly.
  readonly remaining = computed(() => this.budgetCap() - this.total());

  // computed() for the progress bar — capped at 100 so the bar never overflows visually
  readonly percentSpent = computed(() => {
    const cap = this.budgetCap();
    return cap > 0 ? Math.min((this.total() / cap) * 100, 100) : 0;
  });

  // computed() returning a union type — drives CSS class and warning text.
  // This is how computed() replaces an if/else chain that used to live in ngOnChanges.
  readonly warningLevel = computed((): 'ok' | 'warning' | 'danger' => {
    const ratio = this.budgetCap() > 0 ? this.total() / this.budgetCap() : 0;
    if (ratio >= 1)    return 'danger';
    if (ratio >= 0.8)  return 'warning';
    return 'ok';
  });

  // computed() for the warning message — reads warningLevel() and total()
  readonly warningMessage = computed((): string => {
    const level = this.warningLevel();
    if (level === 'danger') {
      return `Over budget by ${(this.total() - this.budgetCap()).toFixed(2)}`;
    }
    if (level === 'warning') {
      return `80% of budget used — ${this.remaining().toFixed(2)} remaining`;
    }
    return '';
  });

  // ─────────────────────────────────────────────
  // EFFECT — side effects with cleanup
  // ─────────────────────────────────────────────

  constructor() {
    // Restore persisted expenses on startup
    const saved = localStorage.getItem('budget-tracker-expenses');
    if (saved) {
      try {
        this.expenses.set(JSON.parse(saved));
      } catch {
        // Ignore malformed localStorage data
      }
    }

    // effect() runs whenever any signal it reads changes.
    // Here it reads expenses() and total() — both are tracked synchronously.
    // A 300ms debounce prevents hammering localStorage on every keystroke.
    //
    // The CLEANUP FUNCTION (return () => clearTimeout) is critical:
    //   Without it, rapid changes would queue multiple setTimeout callbacks.
    //   The cleanup cancels the stale timer before the next run,
    //   so only the LAST change in a burst actually writes to localStorage.
    effect(() => {
      const current = this.expenses();
      const runningTotal = this.total(); // tracked synchronously — included in dependency set

      const timer = setTimeout(() => {
        localStorage.setItem('budget-tracker-expenses', JSON.stringify(current));
        console.log(
          `Budget Tracker — saved: ${current.length} expense(s) | total: $${runningTotal.toFixed(2)}`
        );
      }, 300);

      // Cleanup: cancel the pending write before the next effect execution
      return () => clearTimeout(timer);
    });
  }

  // ─────────────────────────────────────────────
  // METHODS — called from template events
  // ─────────────────────────────────────────────

  onExpenseAdded(expense: Expense): void {
    // Immutable update: spread creates a new array reference.
    // A new reference is required — signals only detect change when the reference changes.
    // Never do: this.expenses().push(expense) — that mutates in place; signal won't detect it.
    this.expenses.update(list => [...list, expense]);

    // Reset the draft amount signal — because BudgetDashboard owns draftAmount
    // and ExpenseInputComponent receives it via model(), setting it to 0 here
    // flows DOWN into the child and clears the amount input field.
    this.draftAmount.set(0);
  }

  removeExpense(id: number): void {
    // .filter() creates a new array — immutable update pattern
    this.expenses.update(list => list.filter(e => e.id !== id));
  }

  clearAll(): void {
    // .set() replaces the entire signal value — clears the list
    this.expenses.set([]);
    localStorage.removeItem('budget-tracker-expenses');
  }
}

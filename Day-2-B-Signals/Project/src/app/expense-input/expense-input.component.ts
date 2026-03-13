import { Component, model, output, signal } from '@angular/core';
import { Expense } from '../expense.model';

// ============================================================
// ExpenseInputComponent
//
// Demonstrates:
//   model()   — two-way signal binding for the amount field.
//               The parent (BudgetDashboardComponent) holds the
//               source draftAmount signal and passes it via
//               [(draftAmount)]="draftAmount". When the parent
//               calls draftAmount.set(0) after submission, this
//               input field clears automatically.
//
//   output()  — emits the completed Expense object up to the
//               parent so the parent can update its own signals.
//
//   signal()  — description is internal state only; no need to
//               share it with the parent, so plain signal() is
//               the right choice here (not model()).
// ============================================================

@Component({
  selector: 'app-expense-input',
  standalone: true,
  imports: [],
  templateUrl: './expense-input.component.html',
  styleUrl: './expense-input.component.css'
})
export class ExpenseInputComponent {

  // model() — two-way binding with the parent.
  // The parent provides the current value AND can write to it.
  // Use case: parent resets this field to 0 after submission,
  // which automatically clears the amount input in this template.
  readonly draftAmount = model<number>(0);

  // signal() — description is only used internally.
  // The parent never needs to read or reset it, so signal() is
  // the right choice. After submission, we reset it ourselves.
  readonly description = signal<string>('');

  // output() — one-way upward; emits a completed Expense object
  // to the parent when the user submits the form.
  readonly expenseAdded = output<Expense>();

  onSubmit(): void {
    const amount = this.draftAmount();
    const description = this.description().trim();

    // Guard: do nothing if either field is empty / zero
    if (amount <= 0 || !description) {
      return;
    }

    // Build the Expense object to emit
    const expense: Expense = {
      id: Date.now(),       // simple unique ID from timestamp
      description,
      amount,
      date: new Date()
    };

    // Emit up to the parent — the parent adds it to expenses signal
    this.expenseAdded.emit(expense);

    // Reset description (internal signal — we reset it ourselves)
    // The parent resets draftAmount via model() — no action needed here
    this.description.set('');
  }
}

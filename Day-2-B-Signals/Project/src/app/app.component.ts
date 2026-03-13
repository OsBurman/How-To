import { Component, signal } from '@angular/core';
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';

// AppComponent is the shell — it owns the budget cap signal and passes it
// down to BudgetDashboardComponent via input().
//
// This demonstrates the one-way data flow pattern:
//   AppComponent (owner) → [budgetCap]="budgetCap()" → BudgetDashboardComponent (receiver)
//
// The child receives it as a read-only input() signal.
// The parent can change it here (e.g. the cap adjuster input), and the child reacts.

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BudgetDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // signal() — writable; the parent owns this value
  // BudgetDashboardComponent receives it as a readonly input()
  readonly budgetCap = signal<number>(1000);

  onBudgetCapChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    // Guard: only update if the user entered a positive number
    if (value > 0) {
      this.budgetCap.set(value);
    }
  }
}

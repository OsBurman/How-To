// Shared Expense interface — used by both BudgetDashboardComponent and ExpenseInputComponent.
// Placing it in a dedicated model file avoids duplicating the interface definition.
export interface Expense {
  id: number;         // unique id — we use Date.now() for simplicity
  description: string;
  amount: number;     // in dollars
  date: Date;
}

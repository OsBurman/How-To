# Budget Tracker — Day 2B Sample Project

A working Angular application that demonstrates every **signal pattern** introduced in Day 2B: `signal()`, `computed()`, `effect()` with cleanup, `input()`, `output()`, and `model()`.

---

## What This App Does

Track personal expenses against a budget cap. Add expenses, watch the progress bar change color as you approach the limit, and see warnings appear when you hit 80% or 100% of your budget. Data is automatically saved to `localStorage` so it persists across page reloads.

---

## Concepts Demonstrated

| Concept | Where to find it |
|---|---|
| `signal()` — writable signal | `AppComponent` → `budgetCap`; `BudgetDashboardComponent` → `expenses`, `draftAmount` |
| `computed()` — derived signal | `BudgetDashboardComponent` → `total`, `remaining`, `percentSpent`, `warningLevel` |
| `effect()` with cleanup | `BudgetDashboardComponent` constructor → localStorage persistence + debounce |
| `input()` — read-only signal input | `BudgetDashboardComponent` → receives `budgetCap` from parent |
| `output()` — event emitter | `ExpenseInputComponent` → emits `expenseAdded` to parent |
| `model()` — two-way signal binding | `ExpenseInputComponent` → `draftAmount`; parent resets it after submission |
| Immutable signal update | `expenses.update(list => [...list, expense])` — never mutate in place |

---

## Component Tree

```
AppComponent
│   owns: budgetCap = signal<number>(1000)
│   template: header with budget cap input
│
└── BudgetDashboardComponent  [budgetCap]="budgetCap()"
        owns: expenses = signal<Expense[]>([])
              draftAmount = signal<number>(0)
        computed: total, remaining, percentSpent, warningLevel
        effect(): localStorage persistence with debounce cleanup
        │
        └── ExpenseInputComponent  [(draftAmount)]="draftAmount"
                                   (expenseAdded)="onExpenseAdded($event)"
                owns: description = signal<string>('')
                model: draftAmount  ← two-way with parent
                output: expenseAdded
```

---

## Signal Flow Diagram

```
AppComponent
  budgetCap signal ──[input()]──► BudgetDashboardComponent
                                    expenses signal
                                    draftAmount signal ──[model()]──► ExpenseInputComponent
                                                                            │
                                    ◄────────────[output()] expenseAdded───┘
                                    computed signals:
                                      total ◄── expenses
                                      remaining ◄── total + budgetCap (input)
                                      percentSpent ◄── total + budgetCap
                                      warningLevel ◄── total + budgetCap
                                    effect():
                                      reads expenses + total → localStorage
```

### Key insight: `draftAmount` and model()

`BudgetDashboardComponent` holds `draftAmount = signal<number>(0)` and passes it to the child with `[(draftAmount)]="draftAmount"`. This two-way binding means:

- **Child reads** `draftAmount()` to populate the amount input field
- **Child writes** `draftAmount.set(...)` on every keystroke
- **Parent resets** `draftAmount.set(0)` after submission — the child's field clears automatically

---

## File Structure

```
Day-2-B-Signals/Project/
├── package.json
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── README.md
├── instructions.md
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    └── app/
        ├── app.config.ts
        ├── app.component.ts          ← owns budgetCap signal
        ├── app.component.html
        ├── app.component.css
        ├── expense.model.ts          ← Expense interface
        ├── budget-dashboard/
        │   ├── budget-dashboard.component.ts   ← input(), computed(), effect()
        │   ├── budget-dashboard.component.html
        │   └── budget-dashboard.component.css
        └── expense-input/
            ├── expense-input.component.ts       ← model(), output()
            ├── expense-input.component.html
            └── expense-input.component.css
```

---

## Running the App

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start
```

Open `http://localhost:4200` in your browser.

---

## Things to Try

1. **Add expenses** — watch the progress bar grow and change color
2. **Change the budget cap** — all computed values recalculate instantly (no method calls needed)
3. **Reach 80% of budget** — the warning banner appears
4. **Exceed the budget** — the banner turns red, the remaining amount goes negative
5. **Reload the page** — expenses are still there (localStorage via `effect()`)
6. **Open DevTools console** — watch the `effect()` log on every change
7. **Remove individual expenses** — the `@for` list updates reactively
8. **Click Clear All** — wipes the signal and removes from localStorage

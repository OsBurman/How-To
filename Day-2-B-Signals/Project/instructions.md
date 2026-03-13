# Budget Tracker — Build Instructions

Follow these steps to build the Budget Tracker from scratch. The goal is to practice every signal pattern from Day 2B. Work through each step in order — don't skip ahead.

---

## Prerequisites

- Node.js 18+ installed
- Angular CLI installed globally: `npm install -g @angular/cli`

---

## Step 1 — Scaffold the project

```bash
ng new budget-tracker --standalone --style=css --routing=false
cd budget-tracker
npm start
```

Verify the default app loads at `http://localhost:4200`.

---

## Step 2 — Create the Expense interface

Create `src/app/expense.model.ts`:

```typescript
export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: Date;
}
```

This is the shape every expense object will follow throughout the app.

---

## Step 3 — Build AppComponent with a `signal()`

Open `src/app/app.component.ts`. Replace the contents with:

- A `readonly budgetCap = signal<number>(1000)` — this is the source of truth for the user's budget
- An `onBudgetCapChange(event: Event)` method that reads the input value, guards for `> 0`, and calls `this.budgetCap.set(value)`
- Import `BudgetDashboardComponent` in the `imports` array

In `app.component.html`:

- Add a header with a number input bound to `budgetCap()`: `[value]="budgetCap()"` + `(input)="onBudgetCapChange($event)"`
- Render `<app-budget-dashboard [budgetCap]="budgetCap()" />`

**Checkpoint:** The page should render the header. The dashboard component doesn't exist yet — add it next.

---

## Step 4 — Generate BudgetDashboardComponent

```bash
ng generate component budget-dashboard --standalone
```

### Step 4a — Add `input()` for the budget cap

In `budget-dashboard.component.ts`, add:

```typescript
// input() — read-only signal; the parent owns this value
readonly budgetCap = input<number>(1000);
```

This is how the component receives data from AppComponent. The default value `1000` means the component works even if no parent passes anything.

### Step 4b — Add `signal()` for the expense list

```typescript
// signal() — this component owns the expense list
readonly expenses = signal<Expense[]>([]);

// signal() — shared with child component via model() two-way binding
readonly draftAmount = signal<number>(0);
```

`draftAmount` will be explained in Step 5 when you build ExpenseInputComponent.

### Step 4c — Build the `computed()` chain

Add these four computed signals, in this order:

```typescript
// Each one reads from signals above it — they stay in sync automatically

readonly total = computed(() =>
  this.expenses().reduce((sum, e) => sum + e.amount, 0)
);

readonly remaining = computed(() =>
  this.budgetCap() - this.total()
);

readonly percentSpent = computed(() =>
  this.budgetCap() > 0
    ? Math.min((this.total() / this.budgetCap()) * 100, 100)
    : 0
);

readonly warningLevel = computed((): 'ok' | 'warning' | 'danger' => {
  const ratio = this.total() / this.budgetCap();
  if (ratio >= 1) return 'danger';
  if (ratio >= 0.8) return 'warning';
  return 'ok';
});
```

**Why computed():** These values are derived — you never set them manually. Angular recalculates them only when their dependencies change.

### Step 4d — Add `effect()` with cleanup

In the constructor, add:

```typescript
constructor() {
  effect(() => {
    const current = this.expenses();
    const runningTotal = this.total();

    // Debounce: wait 300ms before writing to localStorage
    const timer = setTimeout(() => {
      localStorage.setItem('budget-tracker-expenses', JSON.stringify(current));
      console.log(`Budget: $${runningTotal.toFixed(2)} | ${current.length} expense(s)`);
    }, 300);

    // Cleanup: cancel the pending write before the NEXT effect run.
    // Without this, rapid additions would schedule multiple stale writes.
    return () => clearTimeout(timer);
  });
}
```

Also restore from localStorage above the `effect()` call:

```typescript
const saved = localStorage.getItem('budget-tracker-expenses');
if (saved) {
  try { this.expenses.set(JSON.parse(saved)); } catch { /* ignore */ }
}
```

### Step 4e — Add methods for mutations

```typescript
onExpenseAdded(expense: Expense): void {
  // Immutable update — always create a new array reference
  this.expenses.update(list => [...list, expense]);
  // Reset the draft amount — flows back into ExpenseInputComponent via model()
  this.draftAmount.set(0);
}

removeExpense(id: number): void {
  this.expenses.update(list => list.filter(e => e.id !== id));
}

clearAll(): void {
  this.expenses.set([]);
  localStorage.removeItem('budget-tracker-expenses');
}
```

### Step 4f — Build the template

In `budget-dashboard.component.html`, add:

1. **Summary cards row** — three cards showing `budgetCap()`, `total()`, `remaining()` — format with `| currency` pipe
2. **Progress bar** — `[style.width.%]="percentSpent()"` with `[class]="'progress-fill level-' + warningLevel()"`
3. **Warning banner** — `@if (warningLevel() !== 'ok')` with dynamic class based on `warningLevel()`
4. **Expense form slot** — `<app-expense-input [(draftAmount)]="draftAmount" (expenseAdded)="onExpenseAdded($event)" />`
5. **Expense list** — `@for (expense of expenses(); track expense.id)` with `@empty` block and a remove button per row

Add `CurrencyPipe` and `DatePipe` from `@angular/common` to the component's `imports` array.

**Checkpoint:** You should be able to type in the amount field (even though ExpenseInputComponent doesn't exist yet, a placeholder should render).

---

## Step 5 — Generate ExpenseInputComponent

```bash
ng generate component expense-input --standalone
```

### Step 5a — Add `model()` for the amount field

```typescript
// model() — two-way signal binding with the parent.
// The parent passes the current draft value AND can reset it to 0 after submission.
readonly draftAmount = model<number>(0);
```

**Key point:** `model()` creates a signal that reads AND writes through to the parent. When `BudgetDashboardComponent` calls `this.draftAmount.set(0)` in `onExpenseAdded()`, this component's field clears automatically — no event needed.

### Step 5b — Add `signal()` and `output()`

```typescript
// signal() — description is internal; parent never needs to read or reset it
readonly description = signal<string>('');

// output() — emits the completed expense object up to the parent
readonly expenseAdded = output<Expense>();
```

### Step 5c — Add `onSubmit()`

```typescript
onSubmit(): void {
  const amount = this.draftAmount();
  const description = this.description().trim();
  if (amount <= 0 || !description) return;

  this.expenseAdded.emit({ id: Date.now(), description, amount, date: new Date() });
  this.description.set('');   // reset internal signal
  // draftAmount is reset by the parent via model() — no action needed here
}
```

### Step 5d — Build the template

In `expense-input.component.html`, add a form with:

- Description input: `[value]="description()"` + `(input)="description.set($any($event.target).value)"`
- Amount input (the `model()` demo): `[value]="draftAmount()"` + `(input)="draftAmount.set(+$any($event.target).value)"`
- Submit button: `(click)="onSubmit()"` disabled when either field is empty

Add `(submit)="$event.preventDefault(); onSubmit()"` to the `<form>` element so Enter key works.

**Checkpoint:** The full form should render. Add an expense — it should appear in the list.

---

## Step 6 — Wire up routing and verify

No router needed for this project. Verify these behaviors:

- [ ] Adding an expense updates the summary cards and progress bar instantly
- [ ] Changing the budget cap input in the header recalculates all computed values
- [ ] Reaching 80% fills the progress bar and shows the warning banner
- [ ] Exceeding 100% shows the danger state (red)
- [ ] Removing an expense updates everything reactively
- [ ] Reloading the page restores expenses from localStorage
- [ ] DevTools console shows the `effect()` log after each change

---

## Step 7 — Style (optional)

Add visual polish to each component's `.css` file:

- **`app.component.css`** — header bar, flex layout for the budget cap control
- **`budget-dashboard.component.css`** — summary card grid, progress bar with color transitions, warning banner styles for `level-warning` and `level-danger`, expense list rows
- **`expense-input.component.css`** — horizontal form row, input fields, submit button

---

## Signal patterns checklist

Once complete, verify you've used each pattern:

| Pattern | Used in | Line to check |
|---|---|---|
| `signal()` | `AppComponent.budgetCap` | app.component.ts |
| `signal()` | `BudgetDashboardComponent.expenses` | budget-dashboard.component.ts |
| `computed()` | `BudgetDashboardComponent.total` | budget-dashboard.component.ts |
| `computed()` — chained | `remaining`, `percentSpent`, `warningLevel` | budget-dashboard.component.ts |
| `effect()` + cleanup | constructor localStorage logic | budget-dashboard.component.ts |
| `input()` | `BudgetDashboardComponent.budgetCap` | budget-dashboard.component.ts |
| `output()` | `ExpenseInputComponent.expenseAdded` | expense-input.component.ts |
| `model()` | `ExpenseInputComponent.draftAmount` | expense-input.component.ts |
| Immutable `.update()` | `onExpenseAdded`, `removeExpense` | budget-dashboard.component.ts |
| Template signal call | `expenses()`, `total()`, etc. in HTML | budget-dashboard.component.html |

# Exercise 6 — Product Catalogue

**Difficulty:** BEGINNER
**Concepts practiced:** Built-in pipes — `date`, `currency`, `uppercase`, pipe arguments, pipe chaining

## Setup

```bash
# From the Exercises/ workspace root
npm install
cd Exercise-6-Product-Catalogue && npx ng serve
```

Open your browser at **http://localhost:4200**

## What you'll build

A product catalogue table. The starter renders raw, unformatted data — ISO date strings, plain decimal prices, and lowercase category names. Your job is to apply built-in Angular pipes to make it presentable.

## Your Tasks

All your work is in `src/app/product-list/product-list.component.html`.
The component class and pipe imports are already complete — do not change `product-list.component.ts`.

---

### Step 1 — Apply the `date` pipe

Find the `{{ product.launchDate }}` binding and add the `date` pipe:

```html
{{ product.launchDate | date:'mediumDate' }}
```

Before: `2024-03-15`
After: `Mar 15, 2024`

---

### Step 2 — Apply the `currency` pipe

Find the `{{ product.price }}` binding and add the `currency` pipe:

```html
{{ product.price | currency }}
```

Before: `249.99`
After: `$249.99`

---

### Step 3 — Apply the `uppercase` pipe

Find the `{{ product.category }}` binding and add the `uppercase` pipe:

```html
{{ product.category | uppercase }}
```

Before: `audio`
After: `AUDIO`

---

### Step 4 — Try pipe arguments

Once Steps 1–3 work, experiment with format arguments:

| Pipe expression | Output example |
|---|---|
| `date:'shortDate'` | `3/15/24` |
| `date:'mediumDate'` | `Mar 15, 2024` |
| `date:'longDate'` | `March 15, 2024` |
| `date:'fullDate'` | `Friday, March 15, 2024` |
| `currency` | `$249.99` |
| `currency:'EUR'` | `€249.99` |
| `currency:'GBP':'symbol'` | `£249.99` |

---

### Step 5 — Chain two pipes

In one category cell, chain `uppercase` and `slice` together:

```html
{{ product.category | uppercase | slice:0:6 }}
```

Pipes run left to right — `uppercase` transforms the string first, then `slice` truncates the result.

---

## Acceptance Criteria

- [ ] All launch dates are formatted with `| date` (no raw ISO strings)
- [ ] All prices are formatted with `| currency`
- [ ] All categories are displayed with `| uppercase`
- [ ] At least one pipe uses a format argument (e.g., `date:'longDate'`)
- [ ] At least one example chains two pipes
- [ ] No console errors

## Bonus

- Add a `stockCount: number` property to each product and a `Stock` column
- Use `@if (product.stockCount === 0)` to show "Out of Stock" in red
- Format large stock numbers with `| number:'1.0-0'` to add comma separators

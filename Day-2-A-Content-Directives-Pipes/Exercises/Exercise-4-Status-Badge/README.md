# Exercise 4 — Order Status Badge

**Concepts practiced:** `@switch` / `@case`, `[ngClass]`

## Setup

```bash
# From the Exercises/ workspace root
npm install
npx nx serve exercise-4-status-badge
# or
cd Exercise-4-Status-Badge && npx ng serve
```

Open your browser at **http://localhost:4200**

## What you'll build

An order management table where each row shows a status badge. The badge colour changes depending on the order status: pending, processing, shipped, delivered, or cancelled.

## Your Tasks

### Step 1 — Replace the raw status text with `@switch`

In `src/app/order-list/order-list.component.html`, find the `<!-- TODO -->` comment inside `<td>`.

Replace the `<span>{{ order.status }}</span>` placeholder with a `@switch` block:

```html
@switch (order.status) {
  @case ('pending')    { <span>Pending</span>    }
  @case ('processing') { <span>Processing</span> }
  @case ('shipped')    { <span>Shipped</span>    }
  @case ('delivered')  { <span>Delivered</span>  }
  @case ('cancelled')  { <span>Cancelled</span>  }
  @default             { <span>Unknown</span>    }
}
```

### Step 2 — Add `[ngClass]` to each `<span>`

Add `[ngClass]` to every `<span>` in your switch cases. Use the dynamic shorthand to build the class name from the data:

```html
<span [ngClass]="'badge-' + order.status">Pending</span>
```

This will apply `badge-pending`, `badge-shipped`, etc. automatically.

### Step 3 — Style the badge classes

Open `src/app/order-list/order-list.component.css`. You'll find five empty `.badge-*` classes.
Replace each `background-color: transparent` placeholder with a real colour and a matching `color`.

Suggested palette:
| Class | Background | Text |
|---|---|---|
| `.badge-pending` | `#fef3c7` | `#92400e` |
| `.badge-processing` | `#dbeafe` | `#1d4ed8` |
| `.badge-shipped` | `#ede9fe` | `#6d28d9` |
| `.badge-delivered` | `#dcfce7` | `#166534` |
| `.badge-cancelled` | `#fee2e2` | `#991b1b` |

## Acceptance Criteria

- [ ] Each order row shows a styled badge instead of raw text
- [ ] All 5 statuses render with visually distinct colours
- [ ] The badge class is applied via `[ngClass]` — not hardcoded `class`
- [ ] `@switch` has a `@default` case
- [ ] No TypeScript errors

## Bonus

- Add a `sortBy` button that re-orders rows by status alphabetically
- Filter out `'cancelled'` orders using `@if` around the `<tr>`

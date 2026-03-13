# Exercise 2 — Derived Cart Total

**Difficulty:** Beginner | **Type:** Generate

## Goal

Use `computed()` to derive a subtotal, tax, and grand total from a list of cart items whose quantities are each writable signals.

## What You'll Practice

- Reading writable signals inside a `computed()`
- Chaining computed signals (grand total depends on subtotal)
- Calling `.update()` on a signal inside an array
- Using `@for` in a template with signal-powered data

## Your Tasks

### In `app.component.ts`

1. Add `computed` to the `@angular/core` import
2. Declare `readonly subtotal = computed(...)` — sum `item.price * item.quantity()` for all items
3. Declare `readonly tax = computed(...)` — `subtotal() * 0.10`
4. Declare `readonly grandTotal = computed(...)` — `subtotal() + tax()`

### In `app.component.html`

5. Replace the `$???` placeholders with `{{ subtotal().toFixed(2) }}`, `{{ tax().toFixed(2) }}`, and `{{ grandTotal().toFixed(2) }}`
6. Inside the `@for` loop, add **−** and **+** buttons:
   - `(click)="item.quantity.update(q => q - 1)"`
   - `(click)="item.quantity.update(q => q + 1)"`

## Expected Result

- Each item shows quantity controls that update the quantity signal
- Subtotal, tax, and grand total all recompute instantly when any quantity changes

## Run It

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

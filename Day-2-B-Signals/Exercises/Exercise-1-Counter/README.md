# Exercise 1 — Counter with Signals

**Difficulty:** Beginner | **Type:** Generate

## Goal

Use `signal()` and `computed()` to build a counter that tracks a value and automatically derives a doubled display.

## What You'll Practice

- Declaring a `signal()` with an initial value
- Reading a signal with `signal()`
- Writing a signal with `.set()` and `.update()`
- Deriving state with `computed()`

## Your Tasks

### In `app.component.ts`

1. Add `signal` and `computed` to the `@angular/core` import
2. Declare `readonly count = signal(0)`
3. Declare `readonly doubled = computed(() => this.count() * 2)`
4. Implement `increment()` — use `this.count.update(c => c + 1)`
5. Implement `decrement()` — use `this.count.update(c => c - 1)`
6. Implement `reset()` — use `this.count.set(0)`

### In `app.component.html`

7. Replace the `???` placeholder in the count display with `{{ count() }}`
8. Replace the `???` placeholder in the doubled display with `{{ doubled() }}`

## Expected Result

- Clicking **+** increments the count
- Clicking **−** decrements the count
- Clicking **Reset** resets the count to 0
- The doubled value always updates automatically — you never call it manually

## Run It

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

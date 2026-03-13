# Exercise 3 — Temperature Converter

**Difficulty:** Beginner | **Type:** Generate

## Goal

Use `computed()` to automatically convert a Celsius signal into Fahrenheit, Kelvin, and a descriptive label whenever the slider moves.

## What You'll Practice

- Reading from an existing `signal()` inside multiple `computed()` calls
- Rounding floating-point computed values
- Conditional logic inside `computed()`
- A pre-wired range slider with two-way signal binding

## Your Tasks

### In `app.component.ts`

1. Add `computed` to the `@angular/core` import
2. Declare `readonly fahrenheit = computed(...)` — formula: `(celsius() * 9 / 5) + 32`, round to 1 decimal
3. Declare `readonly kelvin = computed(...)` — formula: `celsius() + 273.15`, round to 2 decimals
4. Declare `readonly description = computed(...)` — return:
   - `'Freezing'` when celsius < 0
   - `'Cold'` when 0–14
   - `'Comfortable'` when 15–24
   - `'Warm'` when 25–34
   - `'Hot'` when 35+

### In `app.component.html`

5. Replace each `???` placeholder with the matching computed signal call:
   - `{{ fahrenheit() }}`
   - `{{ kelvin() }}`
   - `{{ description() }}`

## Expected Result

- Moving the slider updates all three derived values instantly
- The description label changes as the temperature crosses each threshold
- The slider label shows the current Celsius value live

## Run It

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

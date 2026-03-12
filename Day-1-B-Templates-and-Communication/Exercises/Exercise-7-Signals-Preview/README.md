# Exercise 7: Signals Preview — Temperature Converter

**Difficulty:** BEGINNER
**Concepts practiced:** `signal()`, `computed()`, reading signals with `()`, `.set()`, `.update()`

## What You're Building

A simple temperature converter. A `signal` holds a Celsius value. A `computed` signal derives the Fahrenheit equivalent. Buttons adjust the Celsius value, and both temperatures update automatically.

## Instructions

1. Open `app.component.ts`. At the top, add the imports:
   ```typescript
   import { signal, computed } from '@angular/core';
   ```
2. In the class body, create a writable signal:
   ```typescript
   readonly celsius = signal(0);
   ```
3. Create a computed signal that converts to Fahrenheit:
   ```typescript
   readonly fahrenheit = computed(() => this.celsius() * 9 / 5 + 32);
   ```
4. Create a `description` computed signal that returns:
   - `'Freezing'` when celsius is 0 or below
   - `'Cold'` when below 15
   - `'Comfortable'` when below 25
   - `'Hot'` when 25 or above
5. Implement three methods:
   - `increaseTemp()`: `this.celsius.update(c => c + 1)`
   - `decreaseTemp()`: `this.celsius.update(c => c - 1)`
   - `resetTemp()`: `this.celsius.set(0)`
6. Open `app.component.html`. Display the signals — **remember the parentheses!**
   - `{{ celsius() }}°C`
   - `{{ fahrenheit() }}°F`
   - `{{ description() }}`
7. Wire the three buttons with event binding:
   - `(click)="decreaseTemp()"`
   - `(click)="resetTemp()"`
   - `(click)="increaseTemp()"`
8. Save and run. Click the buttons — both Celsius and Fahrenheit update together. The description changes as the temperature crosses thresholds.

## Acceptance Criteria

- [ ] `celsius` is a writable signal initialized to 0
- [ ] `fahrenheit` is a computed signal that derives from `celsius()`
- [ ] `description` is a computed signal with at least 3 temperature ranges
- [ ] All template displays use parentheses: `{{ celsius() }}`, `{{ fahrenheit() }}`, `{{ description() }}`
- [ ] Increase, decrease, and reset buttons all work correctly
- [ ] Fahrenheit and description update automatically when Celsius changes
- [ ] No `effect()` used — only `signal()` and `computed()`

## Hints

**Hint 1 — Reading signals:** In the template, `{{ celsius() }}` with parentheses — this is a function call. Without parentheses, you'd display the signal object itself (not the value).

**Hint 2 — .update() vs .set():** `.update(c => c + 1)` transforms the current value. `.set(0)` replaces the current value entirely. Use `.update()` when you need the current value, `.set()` when you don't.

**Hint 3 — computed():** `computed(() => this.celsius() * 9 / 5 + 32)` — the arrow function reads `celsius()`. Angular tracks this dependency. When `celsius` changes, `fahrenheit` automatically recalculates. You never manually update a computed signal.

**Hint 4 — Day 2 preview:** Don't worry if signals feel unfamiliar. We'll cover them thoroughly tomorrow. For now, just practice the syntax: `signal()` to create, `()` to read, `.set()` and `.update()` to write, `computed()` for derived values.

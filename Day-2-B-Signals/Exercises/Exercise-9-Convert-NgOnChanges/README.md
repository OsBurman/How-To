# Exercise 9 — Convert ngOnChanges to Signals

**Difficulty:** Intermediate | **Type:** Convert

## Goal

You have a working `OrderSummaryComponent` that uses legacy `@Input()` and `ngOnChanges(SimpleChanges)`. Convert it to modern signal patterns — `input()`, `computed()`, and `effect()` — while keeping the app behavior **identical**.

## What You'll Practice

- Reading and understanding `ngOnChanges` with `SimpleChanges`
- Mapping `@Input()` → `input()`
- Mapping derived calculations in `ngOnChanges` → `computed()`
- Mapping side effects in `ngOnChanges` → `effect()`
- Deleting all `ngOnChanges` code after conversion

## Run the Legacy App First

```bash
npm install
npm start
```

Open `http://localhost:4200`. Click the pricing tier buttons. Verify: the discounted price and savings update, and the console logs a message on each price change. **Understand the current behavior before you change anything.**

## Your Conversion Tasks

All changes are in `src/app/order-summary/order-summary.component.ts` and `order-summary.component.html`.

### Step 1 — Update the import

Replace:
```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
```
With:
```typescript
import { Component, input, computed, effect } from '@angular/core';
```

### Step 2 — Convert inputs

Replace the two `@Input()` properties:
```typescript
// BEFORE (legacy)
@Input() price: number = 0;
@Input() discount: number = 0;

// AFTER (modern)
readonly price = input<number>(0);
readonly discount = input<number>(0);
```

### Step 3 — Convert derived values

Replace the plain `discountedPrice` and `savings` properties and their ngOnChanges calculations with `computed()` signals:
```typescript
readonly discountedPrice = computed(() =>
  this.price() * (1 - this.discount() / 100)
);
readonly savings = computed(() =>
  this.price() - this.discountedPrice()
);
```

### Step 4 — Convert the side effect

Replace the `ngOnChanges` method with an `effect()`:
```typescript
private readonly priceLogger = effect(() => {
  const current = this.discountedPrice();
  this.priceHistory.push(current);
  console.log(`Discounted price updated: ${current.toFixed(2)}`);
});
```

### Step 5 — Delete ngOnChanges

Remove the `ngOnChanges(changes: SimpleChanges)` method entirely. Remove `implements OnChanges` from the class declaration.

### Step 6 — Update the template

In `order-summary.component.html`, add `()` to every signal read:
- `price` → `price()`
- `discount` → `discount()`
- `discountedPrice` → `discountedPrice()`
- `savings` → `savings()`

(`priceHistory` is a plain array — no change needed there.)

## Expected Result

The app looks and behaves identically. The console still logs on each price change. The history chips still accumulate. **Zero `ngOnChanges` code remains.**

## Mapping Reference

| Legacy pattern | Modern equivalent |
|---|---|
| `@Input() price: number` | `readonly price = input<number>(0)` |
| Calculation in `ngOnChanges` | `computed(() => ...)` |
| Side effect in `ngOnChanges` | `effect(() => ...)` |
| `implements OnChanges` | (delete) |
| `SimpleChanges` import | (delete) |

## Run It

```bash
npm start
```

# Exercise 7 – combineLatest Live Price Calculator

## Goal

Use `combineLatest` to combine three independent `BehaviorSubject` streams into a single derived value, then convert it to a signal with `toSignal`.

## What's Already Set Up

- Three `BehaviorSubject` fields: `basePrice$`, `discount$`, `quantity$`
- Three handler methods that push values into those streams on input events
- A stub `result` signal initialised to `{ discountedPrice: 100, total: 100 }`
- The template is **fully built** — it reads from `result()` and uses `CurrencyPipe`

## Your Tasks

### Task 1 — Replace the stub with a real combineLatest pipeline

Delete the stub `result` signal and replace it:

```typescript
readonly result = toSignal(
  combineLatest([this.basePrice$, this.discount$, this.quantity$]).pipe(
    map(([base, disc, qty]) => {
      const discountedPrice = base * (1 - disc / 100);
      const total = discountedPrice * qty;
      return { discountedPrice, total };
    })
  ),
  { initialValue: { discountedPrice: 100, total: 100 } }
);
```

### Task 2 — Add missing imports

At the top of the file, add to the rxjs imports:
- `combineLatest` from `'rxjs'`
- `map` from `'rxjs'`

Add to Angular imports:
- `toSignal` from `'@angular/core/rxjs-interop'`

## Why combineLatest?

`combineLatest` subscribes to **all** sources simultaneously. Whenever *any* one of them emits, it grabs the latest value from **all** of them and passes the combined array downstream. You never need to "re-trigger" the calculation manually — any change to base price, discount, or quantity automatically re-runs the `map`.

## Expected Behaviour

1. Page loads showing $100.00 base price, 0% discount, quantity 1 → total $100.00
2. Change base price → total updates immediately
3. Drag the discount slider → price after discount and total both update
4. Change quantity → total updates

## Getting Started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

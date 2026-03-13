# Exercise 2: Shared Counter State

**Difficulty:** BEGINNER
**Concepts practiced:** `BehaviorSubject` with `.next()`, `map()`, `toSignal()`, multiple components sharing one service

## What You're Building

A click counter with two components that both show the same count. A `CounterService` holds the count in a `BehaviorSubject`. A `CounterDisplayComponent` shows the current count. A `CounterControlsComponent` has increment, decrement, and reset buttons. Both components inject the same service — when one updates the count, the other reflects it immediately.

## Instructions

1. `CounterService` is stubbed out. Implement:
   - `private readonly countBs$ = new BehaviorSubject<number>(0)`
   - Expose `readonly count: Observable<number> = this.countBs$.asObservable()`
   - `increment()`: `this.countBs$.next(this.countBs$.getValue() + 1)`
   - `decrement()`: guards against going below 0
   - `reset()`: `this.countBs$.next(0)`
   - A derived stream: `readonly isAtZero$: Observable<boolean>` using `map(n => n === 0)`
2. In `CounterDisplayComponent`: inject the service, convert `count` and `isAtZero$` to signals with `toSignal()`.
3. In `CounterControlsComponent`: inject the service, call `increment()`, `decrement()`, `reset()` from button click handlers.
4. In `app.component.html`, render both child components side by side.

## Acceptance Criteria

- [ ] Both components inject the same `CounterService` singleton
- [ ] Count updates in `CounterDisplayComponent` immediately when buttons are clicked in `CounterControlsComponent`
- [ ] Decrement button is disabled when count is 0 (use `isAtZero$` → `toSignal()`)
- [ ] No component has a constructor

## Hints

- `map()` is in `rxjs/operators`: `import { map } from 'rxjs/operators'`
- `BehaviorSubject.getValue()` reads the current value synchronously inside service methods
- Both components get the SAME instance because of `providedIn: 'root'` — that's the whole point

## Setup

```bash
npm install
npm start
```

## Solution

Compare your work with `Day-3-A-Services-DI-RxJS/Exercises-Solutions/Exercise-2-Solution/`.

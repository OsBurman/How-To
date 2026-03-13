# Exercise 3: Observable Playground

**Difficulty:** BEGINNER
**Concepts practiced:** `of()`, `from()`, `timer()`, `Subject` vs `BehaviorSubject`, `map`, `filter`, `tap`

## What You're Building

An interactive playground where buttons trigger different Observable patterns and a log panel displays the output. All Observables are created and subscribed inside the component class — no services. The focus is on understanding how each Observable creation function and each operator works.

The starter gives you a **fully built template** with buttons wired to empty methods. You implement the methods.

## Instructions

Implement each method in `app.component.ts`:

1. **`runOf()`**: Use `of(10, 20, 30, 40)` with `map(n => n * 2)`. Log each result.
2. **`runFrom()`**: Use `from(['Angular', 'RxJS', 'TypeScript'])`. Log each item.
3. **`runFilter()`**: Use `of(1, 2, 3, 4, 5, 6, 7, 8)` with `filter(n => n % 2 === 0)`. Log only even numbers.
4. **`runTap()`**: Use `of('a', 'b', 'c')` with `tap(x => log('before: ' + x))`, then `map(x => x.toUpperCase())`, then `tap(x => log('after: ' + x))`. Subscribe with no handler — the tap does the logging.
5. **`runTimer()`**: Use `timer(2000)`. Log `"timer fired!"` when it emits. Show `"waiting..."` immediately before using the `waiting` signal already in the starter.
6. **`runSubjectVsBehaviorSubject()`**: Create a `Subject<number>` and a `BehaviorSubject<number>(99)`. Subscribe to both. Then call `.next(42)` on each. Log what each subscriber receives. Notice the Subject subscriber only gets 42, but the BehaviorSubject subscriber gets 99 first, then 42.

## Acceptance Criteria

- [ ] `runOf()` logs `20, 40, 60, 80`
- [ ] `runFrom()` logs each framework name
- [ ] `runFilter()` logs `2, 4, 6, 8`
- [ ] `runTap()` shows before/after for each letter
- [ ] `runTimer()` shows "waiting..." then "timer fired!" 2 seconds later
- [ ] Subject vs BehaviorSubject demo shows the initial value difference in the log

## Hints

- Subscribe inside each method — no services needed for this exercise
- For `runTimer()`, set `this.waiting.set(true)` before the timer, then `this.waiting.set(false)` inside the subscription callback
- `Subject` and `BehaviorSubject` are both in `rxjs`
- `tap()`, `map()`, and `filter()` are in `rxjs/operators`
- The difference: `BehaviorSubject` fires the current value immediately on subscribe; `Subject` does not

## Setup

```bash
npm install
npm start
```

## Solution

Compare your work with `Day-3-A-Services-DI-RxJS/Exercises-Solutions/Exercise-3-Solution/`.

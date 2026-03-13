# Exercise 5: The async Pipe Gotcha → Fix with toSignal()

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `async` pipe null behavior, `toSignal()` with `initialValue`, understanding why `toSignal()` is preferred

## What You're Building

This exercise has two parts that you work through in sequence:

**Part A — The Gotcha (already built):** A component uses the `async` pipe without any null guard. Run the app, watch the template display "null" for 1.5 seconds, then update. Read the comments in the code that explain exactly why this happens.

**Part B — The Fix (your task):** Convert the async pipe to `toSignal()` with `initialValue`. The null problem disappears and the template gets simpler.

## Instructions

### Part A (already implemented — just run and observe)

- `UserService` has a `BehaviorSubject<string | null>(null)` — initial value is `null`
- The template uses `{{ user$ | async }}` without a null guard
- After 1500ms a `timer()` sets the user to `'Ada Lovelace'`
- On page load, you see the word "null" for 1.5 seconds, then the name
- Read the comments in `app.component.ts` explaining why

### Part B (your task — convert to toSignal)

1. Import `toSignal` from `@angular/core/rxjs-interop`
2. Remove `AsyncPipe` from the `imports` array
3. Add: `readonly user = toSignal(this.userService.user$, { initialValue: 'Loading...' })`
4. Update the template to use `{{ user() }}` — no async pipe, no null
5. Notice: the template now shows `'Loading...'` for 1.5 seconds instead of `null`

## Acceptance Criteria

- [ ] The starter app (before your changes) shows `null` briefly — you observed this in Part A
- [ ] After your changes, the template shows `'Loading...'` instead of `null`
- [ ] `toSignal()` includes `initialValue: 'Loading...'`
- [ ] `AsyncPipe` is removed from the component's `imports` array
- [ ] No `async` pipe remains in the template

## Hints

- `toSignal()` is in `@angular/core/rxjs-interop`
- The `initialValue` option sets what the signal returns BEFORE the Observable emits anything
- `BehaviorSubject(null)` is a common cause of the null flash — the initial value IS null, so the async pipe emits null immediately
- `toSignal()` with `initialValue` bypasses this entirely — the signal starts with your provided value

## Setup

```bash
npm install
npm start
```

## Solution

Compare your work with `Day-3-A-Services-DI-RxJS/Exercises-Solutions/Exercise-5-Solution/`.

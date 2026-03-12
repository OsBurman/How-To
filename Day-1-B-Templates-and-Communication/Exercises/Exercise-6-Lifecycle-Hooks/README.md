# Exercise 6: Lifecycle Hooks in Action

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `ngOnInit`, `ngOnDestroy`, `@Input()`, interval timer, cleanup

## What You're Building

A countdown timer component. The parent passes a `startValue` via `@Input()`. The timer
component uses `ngOnInit` to start an interval that decrements the count every second.
When the component is removed, `ngOnDestroy` clears the interval to prevent a memory leak.

## Instructions

1. Open `Exercise-6-Lifecycle-Hooks/`. The `AppComponent` has a `showTimer: boolean = true`
   property and a `toggleTimer()` method that flips it. The template has a button bound
   to `toggleTimer()`.
2. A `CountdownComponent` exists in `src/app/countdown/` with starter files.
3. Open `countdown.component.ts`. Add:
   - `@Input() startValue: number = 10`
   - A `currentValue: number = 0` property
   - A `private timerId: number | null = null` property
   - A `status: string = 'Ready'` property
4. Implement `OnInit` interface. In `ngOnInit()`:
   - Set `this.currentValue = this.startValue` (uses the `@Input()` value — this is why
     we use ngOnInit, not the constructor)
   - Set `this.status = 'Running'`
   - Start an interval with `window.setInterval()` that decrements `currentValue` by 1
     every second. When `currentValue` reaches 0, clear the interval and set `status`
     to `'Done!'`
   - Store the timer ID in `this.timerId`
5. Implement `OnDestroy` interface. In `ngOnDestroy()`:
   - Check if `timerId` is not null, then call `window.clearInterval(this.timerId)`
   - Set `this.timerId = null`
6. Open `countdown.component.html`. Display:
   - `{{ currentValue }}` as a large number
   - `{{ status }}` as the status text
7. Open `app.component.html`. The template already contains an `@if (showTimer)` block —
   this is a **micro-preview** of `@if` (covered fully on Day 2). For now, just know it
   adds/removes elements from the DOM based on a condition. Place
   `<app-countdown [startValue]="15"></app-countdown>` inside the `@if` block.
   Then add `CountdownComponent` to `AppComponent`'s `imports` array.
8. Save and run. The timer counts down from 15. Click the toggle button to hide the component
   (it gets destroyed), then show it again (it recreates and starts over from 15).
9. Open the browser console. Verify no interval keeps running after the component is hidden —
   `ngOnDestroy` should have cleared it.

## Acceptance Criteria

- [ ] `CountdownComponent` receives `startValue` via `@Input()`
- [ ] `ngOnInit` sets `currentValue` from the input and starts the interval
- [ ] The countdown decrements every second and displays the current value
- [ ] When count reaches 0, the interval stops and status shows "Done!"
- [ ] `ngOnDestroy` clears the interval when the component is removed
- [ ] Toggling the component off and on restarts the countdown cleanly — no ghost timers
- [ ] `CountdownComponent` is in `AppComponent`'s `imports` array

## Hints

**Hint 1 — ngOnInit, not constructor:** `this.startValue` is set by `@Input()`. In the
constructor, it would still be the default value (10). In `ngOnInit`, it has the actual
value the parent passed (15).

**Hint 2 — Storing the timer ID:** `this.timerId = window.setInterval(() => { ... }, 1000)`
returns a number ID. Store it so you can call `window.clearInterval(this.timerId)` later.

**Hint 3 — Cleanup habit:** Every time you start something in `ngOnInit`, immediately write
the cleanup code in `ngOnDestroy`. Don't wait until later — do it right away.

**Hint 4 — Conditional rendering:** The starter code provides an `@if (showTimer)` block.
`@if` is covered fully on Day 2 — for now, just know that when the condition is `false`,
Angular removes the element from the DOM (calling `ngOnDestroy`). When it becomes `true`
again, Angular creates a fresh instance (calling `ngOnInit`). Just place your component
inside the block.

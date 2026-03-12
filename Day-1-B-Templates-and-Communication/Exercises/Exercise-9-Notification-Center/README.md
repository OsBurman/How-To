# Exercise 9: All Concepts — Notification Center

**Difficulty:** CHALLENGE
**Concepts practiced:** All four binding types, `@Input()`, `@Output()`, `ngOnInit`, `ngOnDestroy`, template refs, safe navigation `?.`, nullish coalescing `??`

## What You're Building

A notification center with two components. `AppComponent` manages a list of notifications and renders multiple `NotificationCardComponent` children. Each card receives notification data via `@Input()`, builds a formatted timestamp in `ngOnInit`, starts a "time ago" auto-updater interval, cleans it up in `ngOnDestroy`, and emits a dismiss event via `@Output()`. The parent handles optional/null notification fields with safe navigation and nullish coalescing.

## Instructions

1. Review the `Notification` interface in `notification.model.ts`:
   ```typescript
   { id: number; title: string; message?: string; sender?: { name: string; avatar?: string } }
   ```

2. Open `notification-card.component.ts`:
   - Add `@Input() notification: Notification | null = null`
   - Add `@Output() dismiss = new EventEmitter<number>()`
   - Add `formattedTime: string = ''` and `secondsAgo: number = 0`
   - Add `private timerId: number | null = null`
   - In `ngOnInit`: set `formattedTime` to the current time, set `secondsAgo` to 0, start an interval that increments `secondsAgo` every second
   - In `ngOnDestroy`: clear the interval
   - Add `onDismiss()`: emit `this.notification?.id ?? -1`

3. Open `notification-card.component.html`:
   - Display `{{ notification?.title ?? 'Untitled' }}`
   - Display `{{ notification?.message ?? 'No message content' }}`
   - Display `{{ notification?.sender?.name ?? 'System' }}`
   - Display `{{ notification?.sender?.avatar ?? '👤' }}`
   - Display `{{ formattedTime }}` and `Received {{ secondsAgo }}s ago`
   - Add dismiss button: `(click)="onDismiss()"`

4. Open `app.component.ts`:
   - The `notifications` array is already provided with mixed data
   - Implement `onDismiss(id: number)` to filter the notification out
   - Add `NotificationCardComponent` to the `imports` array

5. Open `app.component.html`:
   - Render one `<app-notification-card>` per notification (manually — no `@for` yet)
   - Pass `[notification]="notifications[0]"`, etc.
   - Bind `(dismiss)="onDismiss($event)"` on each card
   - Show the count: `{{ notifications.length }} notifications`

6. Save and run. Cards display with safe navigation handling, the seconds counter ticks up, and dismissing a card removes it.

## Acceptance Criteria

- [ ] `NotificationCardComponent` receives data via `@Input()` and emits via `@Output()`
- [ ] `ngOnInit` starts an interval that increments `secondsAgo`
- [ ] `ngOnDestroy` clears the interval — no ghost timers after dismissal
- [ ] Safe navigation `?.` is used on every notification field access in the template
- [ ] Nullish coalescing `??` provides fallbacks for missing fields
- [ ] Dismissing a card removes it from the parent's array
- [ ] The notification count updates after each dismissal
- [ ] No console errors at any point

## Hints

**Hint 1 — Nested safe navigation:** `notification?.sender?.name ?? 'System'` — two levels of `?.` before the `??` fallback. If `notification` is null, the whole chain stops. If `sender` is missing, it stops there.

**Hint 2 — ngOnDestroy timing:** When you dismiss a card and the parent removes it from the array, Angular destroys that component instance. That's when `ngOnDestroy` fires and your interval should be cleaned up.

**Hint 3 — @Output with ID:** `this.dismiss.emit(this.notification?.id ?? -1)` sends the notification's ID up to the parent. The parent uses that ID to find and remove the notification from the array.

**Hint 4 — Without @for:** We haven't learned `@for` yet (that's Day 2). For now, just render a fixed number of `<app-notification-card>` elements manually — one for each notification in the starter array.

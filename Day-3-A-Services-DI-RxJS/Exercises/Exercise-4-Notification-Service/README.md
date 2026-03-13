# Exercise 4: Notification Service with Auto-Dismiss

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `Subject` (not `BehaviorSubject`), `timer()`, `takeUntilDestroyed()`, `inject()` in a component

## What You're Building

A notification system. `NotificationService` holds a `Subject<string[]>` that emits the current list of notifications. Calling `push(message)` adds a notification and schedules an auto-dismiss via `timer(3000)`. The `AppComponent` converts the Subject to a signal and renders the list. Three buttons in the template trigger different notification messages.

## Instructions

1. In `NotificationService`:
   - Use `Subject<string[]>` (NOT `BehaviorSubject`) — a comment in the stub explains why
   - Keep an internal `private current: string[] = []` array
   - `push(message)`: add to `current`, emit with `notifications$.next([...current])`, then set up `timer(3000)` to auto-dismiss
   - `dismiss(index)`: remove from `current`, re-emit
   - Inject `DestroyRef` and pipe all `timer()` calls through `takeUntilDestroyed(this.destroyRef)`
2. In `AppComponent`:
   - Inject `NotificationService`
   - `toSignal(this.notificationService.notifications, { initialValue: [] as string[] })`
   - Wire the three buttons and the dismiss button
3. Template: replace the placeholder with a real `@for` loop over `notifications()`

## Acceptance Criteria

- [ ] Notifications appear when buttons are clicked
- [ ] Each notification auto-dismisses after 3 seconds
- [ ] Manual dismiss button removes the notification immediately
- [ ] `timer()` subscriptions use `takeUntilDestroyed()` — no memory leaks
- [ ] `Subject` is used (not `BehaviorSubject`) — a comment in the service explains why

## Hints

- `Subject` doesn't have an initial value; that's intentional — `toSignal()` needs `initialValue: []` to compensate
- `DestroyRef` is injected at the class body level: `private readonly destroyRef = inject(DestroyRef)`
- `takeUntilDestroyed(this.destroyRef)` goes inside `.pipe()` before `.subscribe()`
- Use spread when re-emitting: `this.notifications$.next([...this.current])` — never mutate in place

## Setup

```bash
npm install
npm start
```

## Solution

Compare your work with `Day-3-A-Services-DI-RxJS/Exercises-Solutions/Exercise-4-Solution/`.

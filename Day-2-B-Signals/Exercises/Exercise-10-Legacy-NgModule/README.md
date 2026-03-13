# Exercise 10 — ⚠️ LEGACY — Notification Center NgModule → Signals

**Difficulty:** Intermediate | **Type:** Legacy Convert

## Goal

You have a fully working legacy Angular app — a notification center using `NgModule`, `@Input()`, `@Output() EventEmitter`, and `ngOnChanges`. Convert the entire app to modern standalone patterns: `standalone: true`, `bootstrapApplication()`, `signal()`, `input()`, `output()`, and `computed()`.

This exercise is about **recognition and conversion** — you already know all the modern APIs. The skill here is reading legacy code and mapping each pattern to its modern equivalent.

## Run the Legacy App First

```bash
npm install
npm start
```

Open `http://localhost:4200`. Confirm:
- Three notifications show, each with a Dismiss button
- Unread count at the top is correct
- Clicking Dismiss removes the notification and updates the count

**Understand the behavior before you convert anything.**

## Files to Read Before Starting

| File | What to notice |
|---|---|
| `src/app/app.module.ts` | NgModule with `declarations` — every component must be listed here |
| `src/app/notification-list/notification-list.component.ts` | `@Input()`, `@Output() EventEmitter`, `ngOnChanges(SimpleChanges)` |
| `src/app/app.component.ts` | plain array property, re-assignment on dismiss |
| `src/main.ts` | `platformBrowserDynamic().bootstrapModule(AppModule)` |

## Conversion Steps

### Step 1 — Convert `NotificationListComponent`

In `notification-list/notification-list.component.ts`:

1. Add `standalone: true` and `imports: []` to `@Component`
2. Replace the `@Input()` property:
   ```typescript
   // BEFORE
   @Input() notifications: Notification[] = [];
   // AFTER
   readonly notifications = input<Notification[]>([]);
   ```
3. Replace the `@Output() + EventEmitter`:
   ```typescript
   // BEFORE
   @Output() dismissed = new EventEmitter<number>();
   // AFTER
   readonly dismissed = output<number>();
   ```
4. Add `computed` to the import and replace `unreadCount` + `ngOnChanges`:
   ```typescript
   readonly unreadCount = computed(() =>
     this.notifications().filter(n => !n.read).length
   );
   ```
5. Delete the `ngOnChanges(changes: SimpleChanges)` method entirely
6. Remove `OnChanges` from `implements` and remove `SimpleChanges` from the import
7. Change `this.dismissed.emit(id)` — no change needed (`.emit()` is the same for both `EventEmitter` and `output()`)
8. **Add a comment** at the top of the file: "What replaced ngOnChanges, and why is it better?"

### Step 2 — Update the template (optional)

The `*ngFor` and `*ngIf` directives still work in standalone components when you add `NgFor` and `NgIf` to the `imports` array. Either:
- Add `NgFor, NgIf` to `imports: [NgFor, NgIf]` and keep the `*ngFor`/`*ngIf` syntax, OR
- Convert to `@for` / `@if` (modern control flow — no imports needed)

### Step 3 — Convert `AppComponent`

In `app.component.ts`:

1. Add `standalone: true` and `imports: [NotificationListComponent]` to `@Component`
2. Replace the plain `notifications` array with a signal:
   ```typescript
   readonly notifications = signal<Notification[]>([
     { id: 1, message: 'Your order has shipped.', read: false },
     { id: 2, message: 'New comment on your post.', read: false },
     { id: 3, message: 'Password changed successfully.', read: true },
   ]);
   ```
3. Update `onDismissed()` to use `.update()`:
   ```typescript
   onDismissed(id: number): void {
     this.notifications.update(list => list.filter(n => n.id !== id));
   }
   ```
4. Update the template binding: `[notifications]="notifications()"` (add the `()`)

### Step 4 — Create `app.config.ts`

Replace the TODO comment in `src/app/app.config.ts` with:
```typescript
import { ApplicationConfig } from '@angular/core';
export const appConfig: ApplicationConfig = { providers: [] };
```

### Step 5 — Update `main.ts`

Replace the NgModule bootstrap with:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
```

### Step 6 — Delete `app.module.ts`

Delete `src/app/app.module.ts`. It is no longer needed.

### Step 7 — Verify

Run `ng serve` again. The app must work identically:
- Three notifications show
- Unread count is correct
- Dismissing a notification removes it and updates the count

## Acceptance Criteria

- [ ] `app.module.ts` is deleted
- [ ] `main.ts` uses `bootstrapApplication(AppComponent, appConfig)`
- [ ] `app.config.ts` exports a valid `ApplicationConfig`
- [ ] `NotificationListComponent` has `standalone: true`
- [ ] `@Input()` replaced by `input<Notification[]>([])`
- [ ] `@Output() + EventEmitter` replaced by `output<number>()`
- [ ] `unreadCount` is a `computed()` signal
- [ ] `ngOnChanges` is completely removed
- [ ] `AppComponent` stores notifications in `signal<Notification[]>([...])`
- [ ] Dismiss uses `.update(list => list.filter(...))`
- [ ] App builds and runs without errors
- [ ] A comment in `notification-list.component.ts` explains what replaced `ngOnChanges`

## Mapping Reference

| Legacy | Modern |
|---|---|
| `NgModule` with `declarations` | `standalone: true` on each component |
| `platformBrowserDynamic().bootstrapModule()` | `bootstrapApplication(AppComponent, appConfig)` |
| `@Input() prop: T` | `readonly prop = input<T>(defaultValue)` |
| `@Output() event = new EventEmitter<T>()` | `readonly event = output<T>()` |
| `ngOnChanges(changes: SimpleChanges)` | `computed()` for derived values, `effect()` for side effects |
| Direct array assignment | `signal.update(arr => [...arr])` |

## Run It

```bash
npm install
npm start
```

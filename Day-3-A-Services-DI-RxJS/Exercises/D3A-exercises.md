# Day 3 Part A — Exercises
## Services, Dependency Injection & RxJS

10 exercises progressing from beginner drills to challenge combinations.
Every concept from the slides is practiced at least once.

Work through them in order — each exercise builds on the vocabulary of the last.

---

## Exercise 1: Your First Service

**Difficulty:** BEGINNER
**Concepts practiced:** `@Injectable({ providedIn: 'root' })`, `inject()` in a component, basic `BehaviorSubject`

### What You're Building

A color palette app. A `PaletteService` holds a list of color names in a `BehaviorSubject`. The `AppComponent` injects the service using `inject()`, reads the list with `toSignal()`, and renders each color as a swatch.

The starter gives you an `AppComponent` with TODO comments and an empty `PaletteService` stub. You implement the service and wire up the component.

### Instructions

1. Open `src/app/services/palette.service.ts`. It contains a stub class with a `@Injectable` decorator but no implementation.
2. Add a `BehaviorSubject<string[]>` initialized with the colors: `['Crimson', 'Teal', 'Gold', 'Slate', 'Coral']`.
3. Expose it as a read-only Observable named `colors$`.
4. Open `src/app/app.component.ts`. Inject `PaletteService` using `inject()` — no constructor.
5. Use `toSignal(this.paletteService.colors$, { initialValue: [] })` to create a `colors` signal.
6. In `app.component.html`, use `@for (color of colors(); track color)` to render each color name in a `<li>`.
7. In `app.component.css`, add a `.swatch` class that uses the color name to set a background using `[style.background]="color"` in the template.

### Acceptance Criteria

- [ ] `PaletteService` has `@Injectable({ providedIn: 'root' })`
- [ ] `AppComponent` uses `inject()` — no constructor
- [ ] The color list renders in the template
- [ ] The template uses `@for` with `track`
- [ ] `toSignal()` includes `initialValue: []`

### Hints

- `inject()` goes at the class body level, not inside a method: `private readonly paletteService = inject(PaletteService);`
- `BehaviorSubject` lives in `rxjs`: `import { BehaviorSubject } from 'rxjs';`
- Expose the Observable with `.asObservable()` so components can't push values directly

---

## Exercise 2: Shared Counter State

**Difficulty:** BEGINNER
**Concepts practiced:** `BehaviorSubject` with `.next()`, `map()`, `toSignal()`, multiple components sharing one service

### What You're Building

A click counter with two components that both show the same count. A `CounterService` holds the count in a `BehaviorSubject`. A `CounterDisplayComponent` shows the current count. A `CounterControlsComponent` has increment, decrement, and reset buttons. Both components inject the same service — when one updates the count, the other reflects it immediately.

### Instructions

1. `CounterService` is stubbed out. Implement:
   - `private readonly count$ = new BehaviorSubject<number>(0)`
   - Expose `readonly count: Observable<number> = this.count$.asObservable()`
   - `increment()`: `this.count$.next(this.count$.getValue() + 1)`
   - `decrement()`: guards against going below 0
   - `reset()`: `this.count$.next(0)`
   - A derived stream: `readonly isAtZero$: Observable<boolean>` using `map(n => n === 0)`
2. In `CounterDisplayComponent`: inject the service, convert `count` and `isAtZero$` to signals with `toSignal()`.
3. In `CounterControlsComponent`: inject the service, call `increment()`, `decrement()`, `reset()` from button click handlers.
4. In `app.component.html`, render both child components side by side.

### Acceptance Criteria

- [ ] Both components inject the same `CounterService` singleton
- [ ] Count updates in `CounterDisplayComponent` immediately when buttons are clicked in `CounterControlsComponent`
- [ ] Decrement button is disabled when count is 0 (use `isAtZero$` → `toSignal()`)
- [ ] No component has a constructor

### Hints

- `map()` is in `rxjs/operators`: `import { map } from 'rxjs/operators'`
- `BehaviorSubject.getValue()` reads the current value synchronously inside service methods
- Both components get the SAME instance because of `providedIn: 'root'` — that's the whole point

---

## Exercise 3: Observable Playground

**Difficulty:** BEGINNER
**Concepts practiced:** `of()`, `from()`, `timer()`, `Subject` vs `BehaviorSubject`, `map`, `filter`, `tap`

### What You're Building

An interactive playground where buttons trigger different Observable patterns and a log panel displays the output. All Observables are created and subscribed inside the component class — no services. Focus is on understanding how each Observable creation function and each operator works.

The starter gives you a fully built template with buttons wired to empty methods. You implement the methods.

### Instructions

Implement each method in `app.component.ts`:

1. **`runOf()`**: Use `of(10, 20, 30, 40)` with `map(n => n * 2)`. Log each result.
2. **`runFrom()`**: Use `from(['Angular', 'RxJS', 'TypeScript'])`. Log each item.
3. **`runFilter()`**: Use `of(1, 2, 3, 4, 5, 6, 7, 8)` with `filter(n => n % 2 === 0)`. Log only even numbers.
4. **`runTap()`**: Use `of('a', 'b', 'c')` with `tap(x => log('before: ' + x))`, then `map(x => x.toUpperCase())`, then `tap(x => log('after: ' + x))`. Subscribe with no handler — the tap does the logging.
5. **`runTimer()`**: Use `timer(2000)`. Log "timer fired!" when it emits. Show a "waiting..." message immediately before the timer fires using a `signal<boolean>`.
6. **`runSubjectVsBehaviorSubject()`**: Create a `Subject<number>` and a `BehaviorSubject<number>(99)`. Subscribe to both. Then call `.next(42)` on each. Log what each subscriber receives. Notice that the `Subject` subscriber only gets 42 (no initial value), but the `BehaviorSubject` subscriber gets 99 first, then 42.

### Acceptance Criteria

- [ ] `runOf()` logs `20, 40, 60, 80`
- [ ] `runFrom()` logs each framework name
- [ ] `runFilter()` logs `2, 4, 6, 8`
- [ ] `runTap()` shows before/after for each letter
- [ ] `runTimer()` shows "waiting..." then "timer fired!" 2 seconds later
- [ ] Subject vs BehaviorSubject demo clearly shows the initial value difference in the log

### Hints

- Subscribe inside each method — no services needed for this exercise
- For `runTimer()`, set a `waiting = signal(true)` before the timer, then `waiting.set(false)` inside the subscription callback
- `Subject` and `BehaviorSubject` are both in `rxjs`
- `tap()`, `map()`, and `filter()` are in `rxjs/operators`
- The difference: `BehaviorSubject` fires the current value immediately on subscribe; `Subject` does not

---

## Exercise 4: Notification Service with Auto-Dismiss

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `Subject` (not `BehaviorSubject`), `timer()`, `takeUntilDestroyed()`, `inject()` in a component

### What You're Building

A notification system. `NotificationService` holds a `Subject<string[]>` that emits the current list of notifications. Calling `push(message)` adds a notification and schedules an auto-dismiss via `timer(3000)`. The `AppComponent` converts the Subject to a signal and renders the list. Buttons in the template trigger different notification messages.

### Instructions

1. In `NotificationService`:
   - Use `Subject<string[]>` (NOT `BehaviorSubject`) — explain in a comment why: notifications are an event stream; new subscribers don't need to see old messages
   - Keep an internal `private current: string[] = []` array
   - `push(message: string)`: add to `current`, call `notifications$.next([...current])`, then set up `timer(3000)` to remove it
   - `dismiss(index: number)`: remove from `current`, re-emit
   - Inject `DestroyRef` and pipe all `timer()` calls through `takeUntilDestroyed(this.destroyRef)`
2. In `AppComponent`:
   - Inject `NotificationService`
   - `toSignal(this.notificationService.notifications, { initialValue: [] })`
   - Three buttons: "Info", "Success", "Warning" — each calls `push()` with a different message
3. Template: `@for` over `notifications()`, show each message with a manual dismiss button

### Acceptance Criteria

- [ ] Notifications appear when buttons are clicked
- [ ] Each notification auto-dismisses after 3 seconds
- [ ] Manual dismiss button also removes the notification
- [ ] `timer()` subscriptions use `takeUntilDestroyed()` — no memory leaks
- [ ] `Subject` is used (not `BehaviorSubject`) — comment in code explains why

### Hints

- `Subject` doesn't have an initial value; that's intentional — `toSignal()` needs `initialValue: []` to compensate
- `DestroyRef` is injected with `inject(DestroyRef)` at the class body level
- `takeUntilDestroyed(this.destroyRef)` goes inside `.pipe()` before `.subscribe()`
- Use spread when re-emitting: `this.notifications$.next([...this.current])` — never mutate in place

---

## Exercise 5: The async Pipe Gotcha → Fix with toSignal()

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `async` pipe null behavior, `toSignal()` with `initialValue`, understanding why `toSignal()` is preferred

### What You're Building

This exercise has two parts that you run side by side to see the difference:

**Part A — The Gotcha:** A component uses the `async` pipe WITHOUT any null guard. Open the browser and watch the template crash or display "null" before the Observable emits. Read the comment in the code that explains exactly why this happens.

**Part B — The Fix:** Convert the async pipe to `toSignal()` with `initialValue`. The null problem disappears. The template gets simpler too.

The starter already has Part A working (and broken in the expected way). You convert it to Part B.

### Instructions

**Part A (already built — just run it and observe):**
- A `UserService` has a `BehaviorSubject<string | null>(null)` — initial value is `null`
- The template uses `{{ user$ | async }}` without a null guard
- After 1500ms a `timer()` sets the user to `'Ada Lovelace'`
- On page load, you see "null" for 1.5 seconds, then the name
- Read the comment in `app.component.ts` explaining why

**Part B (your task — convert to toSignal):**
1. Remove the `async` pipe usage from the template
2. In the component class, add: `readonly user = toSignal(this.userService.user$, { initialValue: 'Loading...' })`
3. Update the template to use `{{ user() }}` — no async pipe, no null
4. Remove the `AsyncPipe` from the `imports` array if it was there
5. Notice: the template now shows `'Loading...'` for 1.5 seconds instead of `null`

### Acceptance Criteria

- [ ] Part A template (before your changes) shows `null` briefly — you can see this in git diff or the starter code comments
- [ ] Part B template shows `'Loading...'` instead of `null`
- [ ] `toSignal()` includes `initialValue: 'Loading...'`
- [ ] No `async` pipe in the final solution
- [ ] A comment in the component explains the difference

### Hints

- `toSignal()` is in `@angular/core/rxjs-interop`
- The `initialValue` option sets what the signal returns BEFORE the Observable emits anything
- `BehaviorSubject(null)` is a common cause of the null flash — the initial value IS null, so the async pipe emits null immediately
- `toSignal()` with `initialValue` bypasses this entirely — the signal starts with your provided value

---

## Exercise 6: Search with debounceTime + switchMap

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `Subject`, `debounceTime`, `switchMap`, `takeUntilDestroyed()`, `toSignal()`

### What You're Building

A live search box that queries a list of programming languages. As the user types, a `Subject<string>` receives each keystroke. `debounceTime(400)` waits for a 400ms pause before searching. `switchMap` cancels any in-progress search when a new term arrives. Results are displayed below the input. A log panel shows what's happening at each step.

### Instructions

1. In the component class, create:
   ```
   private readonly search$ = new Subject<string>();
   readonly results = signal<string[]>([]);
   readonly log = signal<string[]>([]);
   ```
2. In the constructor, set up the pipeline:
   ```
   this.search$.pipe(
     tap(term => addLog('Keystroke: ' + term)),
     debounceTime(400),
     tap(term => addLog('Searching: ' + term)),
     switchMap(term => this.filterLanguages(term)),
     takeUntilDestroyed(this.destroyRef)
   ).subscribe(results => this.results.set(results));
   ```
3. `filterLanguages(term: string)`: returns `of(LANGUAGES.filter(...))` — a cold Observable
4. Template: an `<input>` with `(input)="search$.next($any($event.target).value)"` — push directly into the Subject
5. Display `results()` in a list and `log()` in a log panel

### Acceptance Criteria

- [ ] Typing fast does NOT trigger a search on every character — debounceTime batches them
- [ ] The log shows "Keystroke" on every key, but "Searching" only after the 400ms pause
- [ ] Clearing the search box shows an empty results list
- [ ] `takeUntilDestroyed()` is used — no manual subscription management
- [ ] `switchMap` returns `of(filteredResults)` — a cold Observable

### Hints

- `DestroyRef` is injected: `private readonly destroyRef = inject(DestroyRef)`
- `LANGUAGES` can be a constant array in the file: `['TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', ...]`
- `switchMap` cancels the previous inner Observable before subscribing to a new one — with a real API call, this prevents stale results
- The input element pushes directly to the Subject with `(input)="search$.next(...)"` — no method call needed

---

## Exercise 7: combineLatest — Live Price Calculator

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `combineLatest`, `BehaviorSubject`, `map`, `toSignal()`

### What You're Building

A price calculator where three independent inputs (base price, discount percentage, quantity) each have their own `BehaviorSubject`. A `combineLatest` stream combines them and computes the final price whenever any one changes. The result updates in real time as the user adjusts any slider or input.

### Instructions

1. Create three `BehaviorSubject` instances: `basePrice$(100)`, `discount$(0)`, `quantity$(1)`
2. Use `combineLatest([basePrice$, discount$, quantity$])` with `map` to compute:
   - `discountedPrice = basePrice * (1 - discount / 100)`
   - `total = discountedPrice * quantity`
3. Convert the result Observable to a signal with `toSignal({ initialValue: { discountedPrice: 0, total: 0 } })`
4. Build three range inputs or number inputs — each calls `.next()` on its respective BehaviorSubject when it changes
5. Template displays `total()?.total | currency` and `total()?.discountedPrice | currency`

### Acceptance Criteria

- [ ] Changing any one of the three inputs updates the result immediately
- [ ] `combineLatest` is used — not separate subscriptions
- [ ] All three inputs start with sensible defaults (base: $100, discount: 0%, quantity: 1)
- [ ] Result is formatted with the `currency` pipe

### Hints

- `combineLatest` is in `rxjs`
- `combineLatest` only emits after ALL source Observables have emitted at least once — `BehaviorSubject` guarantees this immediately because it always has a current value
- Each input's `(input)` handler calls `.next(+$any($event.target).value)` — the `+` converts string to number
- `toSignal()` with `initialValue` avoids the need for optional chaining in the template

---

## Exercise 8: Error-Handling Service

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `BehaviorSubject` data/error pair pattern, `try/catch` in service methods, surfacing errors to components, `toSignal()`

### What You're Building

A "task board" service where tasks can be added, completed, and deleted. The service wraps every mutation in `try/catch`. A paired `error$ BehaviorSubject<string | null>` surfaces errors to the component. To demonstrate the error path: a "corrupt task" button triggers a deliberate error inside the service method.

### Instructions

1. `TaskService` should have:
   - `private readonly tasks$ = new BehaviorSubject<Task[]>([])`
   - `private readonly error$ = new BehaviorSubject<string | null>(null)`
   - Expose both as read-only Observables
   - `addTask(title: string)`: guards against empty title — calls `error$.next('Title cannot be empty')` and returns early; otherwise adds task and clears error
   - `completeTask(id: number)`: immutable update; clears error on success
   - `deleteTask(id: number)`: immutable filter; clears error on success
   - `triggerCorruptTask()`: throws inside a `try/catch`; calls `error$.next('Internal error: task data corrupted')`
2. In `AppComponent`:
   - `readonly tasks = toSignal(this.taskService.tasks$, { initialValue: [] })`
   - `readonly error = toSignal(this.taskService.error$, { initialValue: null })`
   - `@if (error() !== null)` shows the error banner
3. Template: task list, an add-task input, a "Trigger Error" button

### Acceptance Criteria

- [ ] Adding an empty title shows the error banner without crashing
- [ ] "Trigger Error" button shows the error message
- [ ] Completing or deleting a task clears the error banner
- [ ] Service methods always use immutable updates (spread for add, `filter` for delete, `map` for update)
- [ ] `error$.next(null)` is called on every success to clear the previous error

### Hints

- `Task` interface: `{ id: number; title: string; completed: boolean }`
- `clearError()` can be a helper method in the service: `this.error$.next(null)`
- `try/catch` in a service method: throw inside `try`, call `this.error$.next(message)` in `catch`
- Never re-throw inside a service — let the component show the message

---

## Exercise 9: inject() in a Functional Guard

**Difficulty:** CHALLENGE
**Concepts practiced:** `inject()` outside a component, functional route guard, `CanActivateFn`, `Router`, service injection in a guard

### What You're Building

A simple two-page app with a "Dashboard" route that is protected. An `AuthService` holds a `BehaviorSubject<boolean>(false)` for the logged-in state. A functional guard uses `inject(AuthService)` and `inject(Router)` to check the state — if the user isn't logged in, it redirects to `/login`. The login page has a button that calls `AuthService.login()` to set the state to `true`.

This exercise demonstrates the key insight: **`inject()` is not limited to components.** It works anywhere Angular's injection context is active — including functional guards.

### Instructions

1. Create `AuthService`:
   - `private readonly loggedIn$ = new BehaviorSubject<boolean>(false)`
   - `readonly isLoggedIn$ = this.loggedIn$.asObservable()`
   - `login()`: `this.loggedIn$.next(true)`
   - `logout()`: `this.loggedIn$.next(false)`
   - `isLoggedIn(): boolean`: returns `this.loggedIn$.getValue()`
2. Create `auth.guard.ts` as a functional guard:
   ```typescript
   export const authGuard: CanActivateFn = () => {
     const authService = inject(AuthService);  // inject() in a guard!
     const router = inject(Router);
     return authService.isLoggedIn() ? true : router.createUrlTree(['/login']);
   };
   ```
3. Set up two routes: `/dashboard` (protected by `authGuard`), `/login` (no guard)
4. `LoginComponent`: shows a "Log In" button that calls `authService.login()`, then navigates to `/dashboard`
5. `DashboardComponent`: shows "Welcome" + a "Log Out" button
6. `AppComponent`: add `<router-outlet />`

### Acceptance Criteria

- [ ] Navigating to `/dashboard` while logged out redirects to `/login`
- [ ] Clicking "Log In" allows navigation to `/dashboard`
- [ ] "Log Out" redirects back to `/login`
- [ ] The guard uses `inject()` — no constructor, no class — it's a plain function
- [ ] `provideRouter(routes)` is in `app.config.ts` (not `RouterModule.forRoot()`)

### Hints

- `CanActivateFn` is in `@angular/router`
- `inject()` works in a functional guard because Angular calls the guard function inside an injection context
- `router.createUrlTree(['/login'])` is the modern way to redirect from a guard — cleaner than returning `false`
- `provideRouter(routes)` goes in `app.config.ts` providers array
- `RouterLink` and `RouterOutlet` must be in each component's `imports` array (standalone)

---

## Exercise 10: ⚠️ LEGACY — Convert NgModule App to Modern Standalone

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Recognizing legacy patterns, converting constructor injection to `inject()`, replacing `async` pipe with `toSignal()`, removing `NgModule`, replacing `takeUntil + ngOnDestroy` with `takeUntilDestroyed()`

### What You're Building

You are given a fully working legacy Angular app that uses `NgModule`, constructor injection, `async` pipe with null guards, and `takeUntil + ngOnDestroy` for cleanup. Your task is to convert it to modern standalone patterns without breaking any functionality.

The app is a simple "Team Feed" — a `FeedService` with a `BehaviorSubject<string[]>` of messages. A `FeedListComponent` shows the messages. A `FeedFormComponent` adds new ones.

### Instructions

**Study the legacy app first — do not change anything until you understand what each file does.**

Then make the following conversions:

1. **Remove `AppModule`**: Delete `app.module.ts`. Convert `AppComponent`, `FeedListComponent`, and `FeedFormComponent` to `standalone: true`.
2. **Update `main.ts`**: Replace `platformBrowserDynamic().bootstrapModule(AppModule)` with `bootstrapApplication(AppComponent, appConfig)`.
3. **Create `app.config.ts`** with `provideRouter([])`.
4. **Convert constructor injection to `inject()`**:
   - Before: `constructor(private feedService: FeedService) {}`
   - After: `private readonly feedService = inject(FeedService);`
5. **Replace `async` pipe + null guard with `toSignal()`**:
   - Before: `*ngIf="messages$ | async as messages"` then `*ngFor="let m of messages"`
   - After: `readonly messages = toSignal(this.feedService.messages$, { initialValue: [] })`; template uses `@for (m of messages(); track m)` with no null guard
6. **Replace `takeUntil + ngOnDestroy`**:
   - Before: `private destroy$ = new Subject<void>()` + `pipe(takeUntil(this.destroy$))` + `ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }`
   - After: `pipe(takeUntilDestroyed())` in the constructor — no `ngOnDestroy` needed
7. **Replace `*ngFor` with `@for`** and `*ngIf` with `@if`

### Acceptance Criteria

- [ ] `app.module.ts` is deleted — no `NgModule` anywhere
- [ ] All three components have `standalone: true`
- [ ] No constructor injection — all use `inject()`
- [ ] No `async` pipe — `toSignal()` used with `initialValue`
- [ ] No `ngOnDestroy` — `takeUntilDestroyed()` used
- [ ] `*ngFor` and `*ngIf` replaced with `@for` and `@if`
- [ ] The app still works — same functionality, modern patterns

### Hints

- Work file by file: `main.ts` → `app.config.ts` → each component → delete `app.module.ts`
- `bootstrapApplication` is in `@angular/platform-browser`
- `takeUntilDestroyed()` without arguments works inside a constructor or field initializer because Angular's injection context is active there
- The `FeedService` itself doesn't change — `@Injectable({ providedIn: 'root' })` works in both legacy and modern apps
- If you get stuck, compare with the sample code in `Day-3-A-Services-DI-RxJS/SampleCode/`

---

> **Solutions:** When you're ready to compare your work, see the completed versions in
> `Day-3-A-Services-DI-RxJS/Exercises-Solutions/Exercise-N-Solution/`.
> Try to complete each exercise before looking — even a partial attempt teaches more than reading the solution.

# Day 3A — Services, Dependency Injection & RxJS

---

## Slide 1: Day 3A — Services, DI & RxJS

**Day 3 · Part A**

### Services, Dependency Injection & RxJS

By the end of this session you'll know how to move shared logic and state out of components, wire it up with Angular's dependency injection system, and work with Observables — the backbone of async data in Angular.

---

## Slide 2: What You'll Be Able to Do

- Create a service with `@Injectable` and inject it anywhere using `inject()`
- Model shared app state with `BehaviorSubject` and surface errors cleanly
- Describe what an Observable is and how it differs from a Promise
- Use core RxJS operators — `map`, `filter`, `switchMap`, `debounceTime` — to transform streams
- Prevent memory leaks automatically with `takeUntilDestroyed()`
- Convert an Observable into a signal using `toSignal()` for clean template binding

---

## Slide 3: Why Services Exist

You've been putting logic directly in components. That works — until it doesn't.

**The prop-drilling problem:**

```
AppComponent
  └── DashboardComponent
        └── SidebarComponent
              └── UserAvatarComponent  ← needs the logged-in user
```

To get the user down to `UserAvatarComponent` you'd have to pass it through every layer as `@Input()` — even through components that don't care about it at all.

**Services solve this.** A service holds shared logic or state in one place. Any component that needs it just asks Angular for it — no passing data through layers.

---

## Slide 4: What a Service Looks Like

A service is just a TypeScript class with a decorator. Nothing magic.

```typescript
// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // ← makes this a singleton available anywhere
})
export class UserService {
  // Shared logic and state live here
  getUserName(): string {
    return 'Ada Lovelace';
  }
}
```

- The class holds logic or state that multiple components share
- `@Injectable` tells Angular this class can be injected as a dependency
- `providedIn: 'root'` is almost always what you want — we'll cover what it means next

---

## Slide 5: @Injectable({ providedIn: 'root' })

`providedIn: 'root'` does three things:

```typescript
@Injectable({
  providedIn: 'root', // registered with the root injector — app-wide singleton
})
export class CartService { }
```

1. **Singleton** — Angular creates exactly one instance for the entire app. Every component that injects `CartService` gets the same object.
2. **Available everywhere** — No need to register it in any module or component. It just works.
3. **Tree-shakable** — If nothing ever injects `CartService`, Angular's build tool removes it from the bundle entirely. No waste.

> Think of `providedIn: 'root'` as "this service belongs to the whole app." That's the right default for almost every service you'll write.

---

## Slide 6: Angular DI — One Instance, Whole App

When you ask Angular for a service, here's what happens:

```
Component A ──inject(CartService)──┐
                                    ▼
Component B ──inject(CartService)──► [ Root Injector ] ──► CartService INSTANCE
                                    ▲
Component C ──inject(CartService)──┘
```

The **injector** is Angular's registry — a lookup table that maps a class token (like `CartService`) to a single shared instance. The first time something asks for `CartService`, Angular creates one instance and stores it. Every subsequent request gets the **same instance** back. This is how shared state works — it lives in the service, and everyone reads/writes the same object.

---

## Slide 7: inject() in a Component

Instead of constructor injection, Angular 14+ gives you `inject()` — a function you call in the class body.

```typescript
// product-list.component.ts
import { Component, inject } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  // Call inject() at class field level — NOT inside a method
  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    // Now use the service wherever you need it
    this.productService.loadProducts();
  }
}
```

- `inject()` is called as a class field initializer — Angular resolves it at construction time
- Mark it `private readonly` — it's an internal dependency, and it never changes

---

## Slide 8: inject() Syntax — Where It Goes

`inject()` has one rule: **it must run inside an injection context**.

An **injection context** is any moment when Angular's injector is active and able to resolve dependencies. This happens during class construction — which is exactly when class field initializers run.

```typescript
export class MyComponent {
  // ✅ CORRECT — class field initializer, runs during construction
  private readonly myService = inject(MyService);

  doSomething(): void {
    // ❌ WRONG — method runs after construction; injector is gone
    const svc = inject(MyService);
  }
}
```

> **Rule of thumb:** All `inject()` calls go at the top of the class as field declarations — never inside `ngOnInit`, event handlers, or any method.

You'll see "injection context" mentioned again with `takeUntilDestroyed()` and `toSignal()` — same rule applies to both.

---

## Slide 9: inject() Beyond Components

`inject()` isn't just for components. It works anywhere Angular has an injection context:

| Use case | Where inject() works |
|---|---|
| Components | ✅ Class field |
| Services | ✅ Class field |
| Pipes | ✅ Class field |
| Guards (functional) | ✅ Inside the guard function |
| Interceptors (functional) | ✅ Inside the interceptor function |
| Factory functions | ✅ Inside the factory |

This is a big deal for functional APIs introduced in Angular 14–15. You no longer need a class just to access a service.

---

## Slide 10: inject() in a Functional Guard

Here's a functional guard — no class, no constructor, just a function. `inject()` still works because Angular calls this function inside an injection context:

```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  // Angular runs this function inside an injection context
  // so inject() works here just like it does in a component class field
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirect to login if not authenticated
  return router.createUrlTree(['/login']);
};
```

Guards, interceptors, and other functional APIs all support `inject()`. You'll see this pattern again in Day 4A when we cover routing in depth.

---

## Slide 11: The data$/error$ Pattern

Services often need to share both data **and** error state. Use paired `BehaviorSubject`s:

```typescript
// recipe.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  // Private — only this service can push new values into these subjects
  private readonly _recipes$ = new BehaviorSubject<string[]>([]);
  private readonly _error$ = new BehaviorSubject<string | null>(null);

  // .asObservable() strips the .next() method off the BehaviorSubject
  // Components get a read-only Observable — they can subscribe but never push
  readonly recipes$ = this._recipes$.asObservable();
  readonly error$ = this._error$.asObservable();
}
```

- **Why `.asObservable()`?** A `BehaviorSubject` has `.next()` on it — any code holding a reference could push bad data into the stream. `.asObservable()` wraps it in a plain Observable with no `.next()`. The service owns the write end; components only get the read end.
- `string | null` for errors — `null` means "no error right now"

---

## Slide 12: Wrapping Updates in try/catch

When something can fail, catch it in the service and push the error to `_error$`:

```typescript
// recipe.service.ts (continued)
async loadRecipes(): Promise<void> {
  // Clear any previous error before trying
  this._error$.next(null);

  try {
    const data = await fetch('/api/recipes').then(r => r.json());
    // Success — push data to the stream
    this._recipes$.next(data);
  } catch (err) {
    // Failure — push a readable message instead of crashing
    this._error$.next('Could not load recipes. Please try again.');
    // Don't re-throw — the service handled it; components just react
  }
}
```

- The service owns the error; the component just reacts to it
- Always clear `_error$` before a new attempt so stale errors disappear
- Keep error messages user-friendly — don't expose stack traces

---

## Slide 13: Displaying Errors in a Component

The component reads both streams and lets the template decide what to show:

```typescript
// recipe-list.component.ts
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeService } from './recipe.service';

@Component({
  standalone: true,
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  private readonly recipeService = inject(RecipeService);

  // Convert Observables to signals for the template
  readonly recipes = toSignal(this.recipeService.recipes$, { initialValue: [] });
  readonly errorMessage = toSignal(this.recipeService.error$, { initialValue: null });
}
```

```html
<!-- recipe-list.component.html -->
@if (errorMessage()) {
  <p class="error">{{ errorMessage() }}</p>
}
@for (recipe of recipes(); track recipe) {
  <li>{{ recipe }}</li>
}
```

---

## Slide 14: What an Observable Is

An Observable is a **stream of values over time**.

```
Observable:  ──── value ──── value ──── value ──── complete ──►
                   "a"        "b"        "c"
```

Key characteristics:

- **Push-based** — the Observable decides when to emit; you react to it
- **Lazy** — nothing happens until someone subscribes. The Observable is just a definition of what will happen — not a running process. This is different from a Promise, which starts running the moment you create it.
- **Can emit zero, one, or many values** — unlike a Promise which always delivers exactly one
- **Can complete** (no more values) or **error out**

```typescript
const data$ = of(1, 2, 3); // nothing printed yet — the Observable is just defined

data$.subscribe(n => console.log(n)); // NOW it runs: 1, 2, 3
```

---

## Slide 15: Observable vs Promise

| | Promise | Observable |
|---|---|---|
| Values delivered | Exactly one | Zero, one, or many |
| Lazy? | ❌ Starts immediately | ✅ Starts on subscribe |
| Cancellable? | ❌ No | ✅ Yes (unsubscribe) |
| Composable? | Limited | ✅ Rich operator library |
| When resolved | Asynchronously | Sync or async |

```typescript
// Promise — one value, fire and forget
const name: Promise<string> = fetchUser().then(u => u.name);

// Observable — a stream; you decide when to start and stop
const name$: Observable<string> = userService.name$;
// Nothing happens yet — subscribe to start receiving values
```

> For a single HTTP call, the difference is small. For live search, real-time updates, or combined streams, Observables win by a lot.

---

## Slide 16: The subscribe() Method

`subscribe()` is how you "turn on" an Observable and start receiving values:

```typescript
import { of } from 'rxjs';

const numbers$ = of(1, 2, 3); // creates an Observable — nothing runs yet

// subscribe() takes an observer with up to three callbacks
numbers$.subscribe({
  next: (value) => console.log('Got:', value),   // called for each emitted value
  error: (err)  => console.error('Error:', err), // called if something goes wrong; stream stops
  complete: ()  => console.log('Done!'),          // called when the stream ends normally
});

// Output:
// Got: 1
// Got: 2
// Got: 3
// Done!
```

- `next` — runs every time a value arrives
- `error` — runs if the stream errors; stream stops after this
- `complete` — runs when the stream finishes normally (not all streams complete)

> In Angular templates you'll use `toSignal()` instead of `subscribe()` directly. But you need to understand `subscribe()` to understand what's happening under the hood.

---

## Slide 17: of() — Static Values

`of()` creates an Observable from values you provide right now. It emits them all and completes immediately.

```typescript
import { of } from 'rxjs';

// Emits each argument as a separate value, then completes
const colors$ = of('red', 'green', 'blue');

colors$.subscribe({
  next: (color) => console.log(color), // 'red', 'green', 'blue'
  complete: () => console.log('done'), // fires immediately after 'blue'
});
```

**When you'd use it:**
- Writing tests — provide fake data without real HTTP calls
- Fallback values — return `of([])` when a cache is empty
- Combining with operators to transform static data into a stream

---

## Slide 18: from() — Array or Promise

`from()` converts an existing array or Promise into an Observable:

```typescript
import { from } from 'rxjs';

// From an array — emits each item individually, then completes
const items$ = from(['apple', 'banana', 'cherry']);
items$.subscribe(item => console.log(item));
// 'apple', 'banana', 'cherry'

// From a Promise — wraps it in an Observable that emits one value
const user$ = from(fetch('/api/user').then(r => r.json()));
user$.subscribe(user => console.log(user.name));
```

> **`of()` vs `from()`:** `of(['a','b','c'])` emits the whole array as one value. `from(['a','b','c'])` emits `'a'`, then `'b'`, then `'c'` — three separate emissions. Pick the one that matches how you need the data downstream.

---

## Slide 19: timer() — Delayed or Interval Emissions

`timer()` emits after a delay, optionally repeating on an interval:

```typescript
import { timer } from 'rxjs';

// Emit once after 2 seconds, then complete
const oneShot$ = timer(2000);
oneShot$.subscribe(() => console.log('2 seconds passed'));

// Emit after 1 second, then every 3 seconds after that
const repeating$ = timer(1000, 3000);
repeating$.subscribe(n => console.log('tick', n)); // 0, 1, 2, ...
```

**When you'd use it:**
- Polling — check for updates every N seconds
- Delayed UI feedback — hide a success banner after a short pause
- Throttling retries — wait before retrying a failed request

---

## Slide 20: Subject — Push Values In

A `Subject` is an Observable you can also push values into. It's both a producer and a consumer. This is what makes it **multicast** — one Subject can have many subscribers all receiving the same emissions simultaneously.

```typescript
import { Subject } from 'rxjs';

const click$ = new Subject<string>();

// Subscribe before pushing values
click$.subscribe(val => console.log('Received:', val));

// Push a value in — all current subscribers receive it at the same time
click$.next('button-save');   // logs: Received: button-save
click$.next('button-cancel'); // logs: Received: button-cancel

// Late subscriber misses everything emitted before they subscribed
click$.subscribe(val => console.log('Late subscriber:', val));
click$.next('button-ok'); // BOTH subscribers get 'button-ok'
```

- Great for **event streams** — user actions, notifications, cross-component signals
- Late subscribers get nothing from before they subscribed — that's the key limitation

---

## Slide 21: BehaviorSubject — Always Has a Value

`BehaviorSubject` is a `Subject` with memory. It holds its **current value** and gives it to new subscribers immediately.

```typescript
import { BehaviorSubject } from 'rxjs';

// Must provide an initial value
const count$ = new BehaviorSubject<number>(0);

count$.subscribe(n => console.log('Subscriber A:', n)); // immediately logs: 0

count$.next(1); // A logs: 1
count$.next(2); // A logs: 2

// Late subscriber gets the current value (2) right away
count$.subscribe(n => console.log('Subscriber B:', n)); // immediately logs: 2

// Access current value synchronously without subscribing
console.log(count$.getValue()); // 2
```

This is why `BehaviorSubject` is the go-to choice for shared state in services — any component that subscribes immediately knows the current state.

---

## Slide 22: Subject vs BehaviorSubject

| | Subject | BehaviorSubject |
|---|---|---|
| Initial value | ❌ None required | ✅ Required |
| Late subscribers get | Nothing from the past | Current value immediately |
| `.getValue()` | ❌ Not available | ✅ Synchronous read |
| Best for | Event streams | State / current value |

**Use `BehaviorSubject` when:** you need components to know the current state as soon as they subscribe — loaded data, auth status, selected item, error messages.

**Use `Subject` when:** you only care about future events — a button click stream, a "save completed" notification.

---

## Slide 23: Cold Observables

A **cold** Observable creates a fresh execution for each subscriber. Every subscriber gets the full sequence from the start, independently.

```typescript
import { of } from 'rxjs';

const data$ = of(1, 2, 3); // cold — creates a new producer per subscriber

// Each subscribe() gets its own independent run
data$.subscribe(n => console.log('Sub A:', n)); // 1, 2, 3
data$.subscribe(n => console.log('Sub B:', n)); // 1, 2, 3 — independent copy
```

**Cold Observables you'll encounter:**
- `of()` and `from()`
- `HttpClient.get()` — each subscriber triggers a new HTTP request
- Most RxJS creation functions

---

## Slide 24: Hot Observables

A **hot** Observable has a single shared source. All subscribers tap into the same stream — late subscribers miss what happened before they joined.

```typescript
import { Subject } from 'rxjs';

const events$ = new Subject<string>(); // hot — one shared stream

events$.subscribe(e => console.log('Sub A:', e));

events$.next('click'); // only Sub A gets it — Sub B doesn't exist yet

events$.subscribe(e => console.log('Sub B:', e));

events$.next('hover'); // BOTH get it — they share the same source
```

**Hot Observables you'll encounter:**
- `Subject` and `BehaviorSubject`
- DOM events (mouse, keyboard)
- WebSocket streams
- Router events

---

## Slide 25: Hot vs Cold — Why It Matters

The practical impact shows up most with HTTP:

```typescript
// http.get() is COLD — each subscriber sends its own request
const users$ = this.http.get<User[]>('/api/users');

users$.subscribe(); // → HTTP GET /api/users
users$.subscribe(); // → HTTP GET /api/users again!
users$.subscribe(); // → HTTP GET /api/users a third time!
```

If you need multiple subscribers sharing one HTTP result, the clean Angular pattern is to store the result in a `BehaviorSubject` inside a service — fetch once, push to the subject, and let all subscribers read from it:

```typescript
// In a service — fetch once, share via BehaviorSubject
loadUsers(): void {
  this.http.get<User[]>('/api/users').subscribe(users => {
    this._users$.next(users); // push to the hot BehaviorSubject
  });
}
```

> **Day-to-day rule:** HTTP is cold (one request per subscriber). Services that expose `BehaviorSubject.asObservable()` are hot (all subscribers share the same value).

---

## Slide 26: pipe() — Chaining Operators

Before we look at individual operators, you need to understand `pipe()` — the method that lets you chain them.

`pipe()` takes a sequence of operators and wires them together into a pipeline. Each operator receives the output of the previous one.

```typescript
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  filter(n => n % 2 === 0), // step 1: only let even numbers through → 2, 4
  map(n => n * 10)          // step 2: multiply each by 10 → 20, 40
).subscribe(n => console.log(n));
// 20
// 40
```

- `pipe()` does **not** change the original Observable — it returns a new one
- You can chain as many operators as you need
- The Observable doesn't start running until `.subscribe()` is called — `pipe()` just describes the transformations

Think of it like a kitchen assembly line: raw ingredients go in one end, each station does one job, and finished food comes out the other end.

---

## Slide 27: map — Transform Values

`map` transforms every emitted value, just like `Array.prototype.map`.

```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const prices$ = of(10, 20, 30);

const discounted$ = prices$.pipe(
  map(price => price * 0.9) // apply 10% discount to each emitted value
);

discounted$.subscribe(p => console.log(p));
// 9, 18, 27
```

**In a service — transforming an HTTP response:**

```typescript
this.http.get<{ items: Product[] }>('/api/products').pipe(
  map(response => response.items) // unwrap the nested array from the response
);
```

---

## Slide 28: filter — Pass Matching Values

`filter` only lets through values that pass a condition. Values that don't match are silently dropped from the stream.

```typescript
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

const scores$ = of(45, 82, 91, 37, 76);

const passing$ = scores$.pipe(
  filter(score => score >= 60) // drop values below 60; only pass the rest
);

passing$.subscribe(s => console.log(s));
// 82, 91, 76
```

**Common real-world use — narrow out null values:**

```typescript
const name$ = userSubject$.pipe(
  filter((user): user is User => user !== null) // TypeScript type guard + null filter
);
```

---

## Slide 29: tap — Side Effects Only

`tap` lets you run a side effect (like logging) without changing the stream at all. The value passes through completely unchanged.

```typescript
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

of(1, 2, 3).pipe(
  tap(n => console.log('Before map:', n)), // peek at the raw value; stream unchanged
  map(n => n * 10),                        // transform the value
  tap(n => console.log('After map:', n)),  // peek at the transformed value; stream unchanged
).subscribe();

// Before map: 1 → After map: 10
// Before map: 2 → After map: 20
// Before map: 3 → After map: 30
```

**When to reach for `tap`:**
- Debugging a pipeline — log values at different stages without breaking the chain
- Triggering analytics or side-channel updates alongside the main data flow
- Don't use it to transform data — that's `map`'s job

---

## Slide 30: switchMap — Cancel and Switch

`switchMap` maps each incoming value to a new inner Observable — and **cancels the previous inner Observable** when a new value arrives.

```typescript
import { fromEvent } from 'rxjs';
import { switchMap, debounceTime, map } from 'rxjs/operators';

// Every time the user types, start a new HTTP search request
fromEvent(searchInput, 'input').pipe(
  map(event => (event.target as HTMLInputElement).value),
  debounceTime(300),
  // switchMap starts a new HTTP call for each search term
  // if the user types again before the response arrives, the previous call is cancelled
  switchMap(term => this.http.get<Result[]>(`/api/search?q=${term}`))
).subscribe(results => this.results$.next(results));
```

**The key rule:** only the **most recent** inner Observable matters. Previous in-flight requests are cancelled automatically — no stale results arriving out of order.

---

## Slide 31: combineLatest — Merge Latest Values

`combineLatest` watches multiple Observables and emits a combined array whenever **any** of them emits — using the latest value from each.

```typescript
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const user$ = new BehaviorSubject({ name: 'Ada' });
const settings$ = new BehaviorSubject({ theme: 'dark' });

combineLatest([user$, settings$]).pipe(
  map(([user, settings]) => ({   // destructure the combined array into named variables
    greeting: `Hello, ${user.name}`,
    theme: settings.theme,
  }))
).subscribe(data => console.log(data));
// { greeting: 'Hello, Ada', theme: 'dark' }
```

> **Gotcha:** `combineLatest` won't emit until every source has emitted at least once. If one stream is silent, you get nothing. That's why `BehaviorSubject` (which emits immediately on subscribe) pairs so well with it — each source already has a value, so `combineLatest` fires immediately.

---

## Slide 32: debounceTime — Wait for a Pause

`debounceTime` holds back emissions until a specified quiet period has passed. If a new value arrives before the timer expires, the timer resets.

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const searchBox = document.querySelector('#q') as HTMLInputElement;

fromEvent(searchBox, 'input').pipe(
  map(e => (e.target as HTMLInputElement).value),
  debounceTime(400) // only emit after the user stops typing for 400ms
).subscribe(term => {
  // Only fires after the user pauses — not on every single keystroke
  console.log('Search for:', term);
});
```

**Why this matters:** Without `debounceTime`, a user typing "angular" triggers 7 HTTP requests. With it, you wait until they pause and fire one.

You'll use `debounceTime` in almost every search input you build.

---

## Slide 33: takeUntilDestroyed() — Auto Cleanup

Every `subscribe()` you start creates a live connection. If you don't clean it up, it keeps running after the component is destroyed — a **memory leak**.

`takeUntilDestroyed()` solves this automatically:

```typescript
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({ standalone: true, selector: 'app-ticker', templateUrl: './ticker.component.html' })
export class TickerComponent {
  private readonly tickerService = inject(TickerService);

  constructor() {
    this.tickerService.tick$.pipe(
      takeUntilDestroyed() // ← no arguments needed when called in the constructor
    ).subscribe(tick => console.log(tick));
    // subscription automatically cancelled when component is destroyed
  }
}
```

- `takeUntilDestroyed()` must be called inside an **injection context** — the constructor or a class field initializer
- No `ngOnDestroy`, no extra cleanup code needed

---

## Slide 34: ⚠️ WARNING — takeUntilDestroyed() Placement

This is one of the most common mistakes with `takeUntilDestroyed()`:

```typescript
export class MyComponent {
  private readonly dataService = inject(DataService);

  // ❌ WRONG — ngOnInit runs after construction; injection context is gone
  ngOnInit(): void {
    this.dataService.data$.pipe(
      takeUntilDestroyed() // RuntimeError: injection context not found
    ).subscribe(d => this.data = d);
  }

  // ✅ CORRECT — move the subscription into the constructor
  constructor() {
    this.dataService.data$.pipe(
      takeUntilDestroyed() // injection context is active during construction
    ).subscribe(d => this.data = d);
  }
}
```

**If you genuinely need to set up subscriptions outside the constructor** — for example, inside a method — inject `DestroyRef` explicitly and pass it in. The next slide shows you how.

---

## Slide 35: takeUntilDestroyed() with DestroyRef

`DestroyRef` is Angular's handle on a component's destruction lifecycle — it knows when the component is about to be torn down. When you pass it to `takeUntilDestroyed()`, Angular uses it to trigger cleanup from outside an injection context.

```typescript
import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({ standalone: true, selector: 'app-notifications', templateUrl: './notifications.component.html' })
export class NotificationsComponent {
  private readonly notificationService = inject(NotificationService);
  // Capture DestroyRef as a field — injection context is active here
  private readonly destroyRef = inject(DestroyRef);

  setupSubscription(): void {
    // We're outside the constructor, so we pass destroyRef explicitly
    this.notificationService.alerts$.pipe(
      takeUntilDestroyed(this.destroyRef) // DestroyRef carries the context to wherever you need it
    ).subscribe(alert => console.log(alert));
  }
}
```

> **Rule:** Constructor or class field → no argument needed. Outside those contexts → inject `DestroyRef` as a field and pass it in.

---

## Slide 36: Why Cleanup Matters

What actually happens without cleanup:

```typescript
// Without takeUntilDestroyed()
export class PriceTickerComponent {
  constructor() {
    priceService.prices$.subscribe(price => {
      this.currentPrice = price; // writing to a destroyed component instance
    });
    // Component is destroyed — but subscription is still alive
    // prices$ keeps emitting, callback keeps running → memory leak
  }
}
```

**The symptoms:**
- Multiple subscriptions piling up each time the component mounts
- Event handlers running on objects that no longer exist in the DOM
- State mutations landing on destroyed component instances

`takeUntilDestroyed()` is the one-line fix. Get in the habit of adding it to every `subscribe()` call inside a component.

---

## Slide 37: toSignal() — Observable to Signal

`toSignal()` converts an Observable into a **signal** that your template can read directly — no `subscribe()`, no manual cleanup.

```typescript
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeService } from './recipe.service';

@Component({
  standalone: true,
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  private readonly recipeService = inject(RecipeService);

  // toSignal() subscribes to the Observable and wraps each emission as a signal value
  readonly recipes = toSignal(this.recipeService.recipes$);
}
```

```html
@for (recipe of recipes(); track recipe.id) {
  <li>{{ recipe.name }}</li>
}
```

- Must be called in an **injection context** (class field or constructor) — same rule as `inject()`
- Angular automatically unsubscribes when the component is destroyed — no `takeUntilDestroyed()` needed

> **Going the other direction?** If you ever need to convert a signal *into* an Observable — to feed it into an RxJS pipeline — Angular provides `toObservable()`. That's covered in Extended Topics.

---

## Slide 38: toSignal() with initialValue

By default, `toSignal()` returns `Signal<T | undefined>` — the signal is `undefined` until the first emission arrives. That can cause template errors.

Fix it with `initialValue`:

```typescript
// Without initialValue — type is Signal<Recipe[] | undefined>
readonly recipes = toSignal(this.recipeService.recipes$);
// @for will error if recipes() is undefined on first render

// With initialValue — type is Signal<Recipe[]>
readonly recipes = toSignal(this.recipeService.recipes$, {
  initialValue: [] as Recipe[] // always an array — safe to iterate immediately
});

// For nullable state
readonly errorMessage = toSignal(this.recipeService.error$, {
  initialValue: null // matches the BehaviorSubject<string | null> type
});
```

> **Always provide `initialValue`** unless you intentionally need to distinguish "no data yet" from "empty data." In most cases, a sensible empty value (empty array, `null`, `''`) is exactly what you want.

---

## Slide 39: When to Use toSignal()

The short answer: **any time you need an Observable in a template**.

```typescript
export class DashboardComponent {
  private readonly dataService = inject(DataService);

  // ✅ Use toSignal() for template binding — clean, null-safe, auto-unsubscribed
  readonly users = toSignal(this.dataService.users$, { initialValue: [] });
  readonly isLoading = toSignal(this.dataService.loading$, { initialValue: false });
  readonly error = toSignal(this.dataService.error$, { initialValue: null });

  // ✅ Keep subscribe() for side effects that don't affect the template
  constructor() {
    this.dataService.saveComplete$.pipe(
      takeUntilDestroyed() // side-effect subscription still needs cleanup
    ).subscribe(() => this.router.navigate(['/dashboard']));
  }
}
```

**Rule of thumb:**
- Observable → template? Use `toSignal()`
- Observable → side effect (navigation, logging, analytics)? Use `subscribe()` + `takeUntilDestroyed()`

---

## Slide 40: ⚠️ WARNING — async pipe null Problem

The `async` pipe (the older way of subscribing in templates) has a frustrating timing bug:

```html
<!-- Legacy template — async pipe -->
<ul *ngIf="recipes$ | async as recipes">
  <li *ngFor="let r of recipes">{{ r.name }}</li>
</ul>
```

**The problem:**

```
Component created:   async pipe emits null (before first value)
                            ↓
*ngIf evaluates null → template hidden
                            ↓
HTTP response arrives → async pipe emits the real data
                            ↓
*ngIf now true → template shown (flickers, or never shows if timing is off)
```

You always needed `*ngIf="(data$ | async) ?? []"` or other workarounds. It was error-prone and required constant vigilance.

---

## Slide 41: toSignal() Solves the Null Problem

`toSignal()` with `initialValue` eliminates the timing issue entirely:

```typescript
// Component
readonly recipes = toSignal(this.recipeService.recipes$, {
  initialValue: [] as Recipe[] // ← value is ALWAYS an array, never null
});
```

```html
<!-- Modern template — no null guard needed -->
@for (recipe of recipes(); track recipe.id) {
  <li>{{ recipe.name }}</li>
}
```

- `recipes()` is `[]` from the very first render — `@for` runs immediately and produces nothing (empty list), then re-renders when data arrives
- No flicker, no null guard, no `??`, no extra `*ngIf`

**Guidance: use `toSignal()` in all new code. Reserve `async` pipe for legacy codebases you're maintaining, not writing.**

---

## Slide 42: Coming Up — Modern vs Classic (Legacy) Angular

You've just learned the modern way to write services, inject dependencies, manage subscriptions, and bind Observables to templates.

Before we move on — a quick look back.

The patterns you just learned replaced older Angular approaches that many teams still use in production today. You'll encounter legacy code in interviews, open-source projects, and jobs.

**The next few slides show you:**
- What the old patterns looked like
- What pain they caused
- Why the modern approach is better

You write the **modern** code. You recognize the **legacy** code.

---

## Slide 43: Legacy — Service Injection (Modern)

First, the modern way you already know:

```typescript
// modern-component.component.ts
import { Component, inject } from '@angular/core';
import { UserService } from './user.service';
import { OrderService } from './order.service';
import { CartService } from './cart.service';

@Component({ standalone: true, selector: 'app-checkout', templateUrl: './checkout.component.html' })
export class CheckoutComponent {
  // Clean, explicit, each on its own line
  private readonly userService = inject(UserService);
  private readonly orderService = inject(OrderService);
  private readonly cartService = inject(CartService);
}
```

- Each dependency is a named, typed field
- Easy to read — you see exactly what a component needs at a glance
- No constructor at all unless you need it for `takeUntilDestroyed()`

---

## Slide 44: Legacy — Constructor Injection

The old way — all dependencies crammed into the constructor signature:

```typescript
// legacy-component.component.ts  ← LEGACY — do not write this
import { Component } from '@angular/core';
import { UserService } from './user.service';
import { OrderService } from './order.service';
import { CartService } from './cart.service';

@Component({ selector: 'app-checkout', templateUrl: './checkout.component.html' })
export class CheckoutComponent {
  // All dependencies as constructor parameters — gets unwieldy fast
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private cartService: CartService,
    // A real enterprise component might have 8–10 of these
  ) { }
}
```

**The pain:**
- Constructor bloat — 8+ parameters was common in complex components
- Harder to add/remove dependencies — you edit both the parameter list and any test scaffolding
- Constructor injection is the only way this worked — Angular 14+ unlocked `inject()`

---

## Slide 45: Legacy — Service Scope (Modern)

The modern way — register once, available everywhere:

```typescript
// modern — user.service.ts
@Injectable({
  providedIn: 'root', // one line, works app-wide, tree-shakable
})
export class UserService { }
```

- Works out of the box — no configuration in any module
- Tree-shakable — if nothing uses `UserService`, the bundler drops it
- Singleton guaranteed — Angular manages the single instance

---

## Slide 46: Legacy — NgModule Providers Registration

The old way — every service had to be manually registered in a module:

```typescript
// legacy — app.module.ts  ← LEGACY
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from './user.service';
import { OrderService } from './order.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, CheckoutComponent], // components also listed here
  providers: [
    UserService,   // forget this → runtime error: NullInjectorError
    OrderService,  // add every service by hand
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

**The pain:**
- Forget to add a service → runtime crash, not a compile-time error
- Services scattered across multiple NgModules — hard to track scope
- Not tree-shakable — unused services still bundled
- One more file to touch every time you create a service

---

## Slide 47: Legacy — RxJS Cleanup (Modern)

The modern one-liner with `takeUntilDestroyed()`:

```typescript
// modern
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class PriceComponent {
  constructor() {
    priceService.prices$.pipe(
      takeUntilDestroyed() // one line, no ngOnDestroy, no manual Subject
    ).subscribe(price => this.currentPrice = price);
  }
}
```

Clean. Declarative. Hard to get wrong.

---

## Slide 48: Legacy — Manual takeUntil + ngOnDestroy

The old way required a whole ceremony every time you had a subscription:

```typescript
// legacy  ← LEGACY — do not write this
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class PriceComponent implements OnDestroy {
  // Boilerplate Subject just to signal teardown
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    priceService.prices$.pipe(
      takeUntil(this.destroy$) // must remember to add this to EVERY pipe
    ).subscribe(price => this.currentPrice = price);
  }

  ngOnDestroy(): void {
    // Must remember to implement OnDestroy and emit here
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**The pain:**
- 3 places to touch for every subscription: the field, the pipe, and `ngOnDestroy`
- Forget one → memory leak, no compile-time warning
- `takeUntilDestroyed()` replaced all of this with one line in Angular 16+

---

## Slide 49: Legacy — Observable in Template (Modern)

The modern way — `toSignal()` with an `initialValue`:

```typescript
// modern
readonly products = toSignal(
  this.productService.products$,
  { initialValue: [] as Product[] } // immediately has a value — no null timing issue
);
```

```html
@for (p of products(); track p.id) {
  <li>{{ p.name }}</li>
}
```

- `products()` is `[]` on first render — no null check needed
- Re-renders automatically when the Observable emits
- Angular handles the subscription lifecycle

---

## Slide 50: Legacy — async Pipe with Null Guard

The old way — `async` pipe required a null guard workaround in every template:

```typescript
// legacy  ← LEGACY
export class ProductListComponent {
  // Expose the raw Observable — async pipe subscribes in the template
  readonly products$ = this.productService.products$;
}
```

```html
<!-- legacy template — must add ?? [] to avoid null on first render -->
<ul *ngIf="(products$ | async) ?? [] as products">
  <li *ngFor="let p of products">{{ p.name }}</li>
</ul>

<!-- Alternative null guard pattern you'll also see in the wild -->
<ng-container *ngIf="products$ | async as products; else loading">
  <li *ngFor="let p of products">{{ p.name }}</li>
</ng-container>
<ng-template #loading>Loading...</ng-template>
```

**The pain:**
- `async` emits `null` before the first value — templates had to guard against it everywhere
- The `?? []`, `*ngIf ... else`, and `ng-template` boilerplate repeated in every template
- Easy to forget one guard and get a runtime error when `*ngFor` received `null`

---

## Slide 51: Key Takeaways

- **Services + `inject()`** — move shared logic and state out of components; `inject()` replaces constructor injection everywhere Angular has an injection context; expose state read-only using `.asObservable()` so only the service can push new values
- **`BehaviorSubject` with `data$` / `error$`** — the clean pattern for exposing reactive state from a service; `of()`, `from()`, `Subject`, and `BehaviorSubject` cover most creation needs; chain operators with `pipe()` to shape streams before they reach your components
- **Observables are lazy streams** — nothing runs until someone subscribes; core operators (`map`, `filter`, `tap`, `switchMap`, `debounceTime`) let you transform, filter, and combine those streams cleanly
- **`takeUntilDestroyed()` + `toSignal()`** — the two tools that make Observables safe and ergonomic in components: auto-unsubscription and null-free template binding, both in one line each; both require an injection context — constructor or class field
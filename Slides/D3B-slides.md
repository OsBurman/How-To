## Slide 1: Day 3B — HTTP & Async Data

**Day 3 · Part B**

### HTTP & Async Data

By the end of this session you will connect your Angular app to a real API, handle errors gracefully, and wire HTTP responses directly into your templates using signals.

---

## Slide 2: What You'll Be Able to Do

- **Configure** Angular's HTTP client in a standalone app using `provideHttpClient()`
- **Type** every HTTP response with a TypeScript interface so your IDE catches mismatches
- **Fetch, create, update, and delete** data with `HttpClient` and handle errors with `catchError`
- **Cancel stale requests** automatically using `switchMap`
- **Track loading state** with a signal and the `finalize()` operator
- **Intercept every request** to attach headers or log traffic using `HttpInterceptorFn`

---

## Slide 3: What is HttpClient?

`HttpClient` is Angular's built-in service for communicating with a backend server over HTTP. It provides methods for every HTTP verb — `GET`, `POST`, `PUT`, `PATCH`, `DELETE` — and returns Observables so the rest of your Angular app can react to the data once it arrives.

Think of it as Angular's answer to the browser's native `fetch` API, but with TypeScript generics for response typing, automatic JSON serialization and deserialization, and seamless integration with RxJS operators.

```typescript
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class UserListComponent {
  private readonly http = inject(HttpClient);

  loadUsers(): void {
    // http.get() describes the request but does NOT send it yet —
    // nothing happens until something subscribes. That comes in the next few slides.
    this.http.get('/api/users');
  }
}
```

- `HttpClient` is a service — you get it with `inject(HttpClient)`, the same way you inject any Angular service
- Every method returns an **Observable** — the request runs only when something subscribes
- Before you can inject it, you need to register it once for the whole app — that's the next slide

---

## Slide 4: Enable HTTP for the Whole App

Before you can inject `HttpClient`, you have to register the provider once in `app.config.ts`.

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // import from @angular/common/http

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient() // registers HttpClient for the entire app — one call, done
  ]
};
```

- One line in `providers` and every component in the app can inject `HttpClient`
- Nothing else to configure for basic use — interceptors and options come later

---

## Slide 5: HTTP Builds on Part A

**Quick reminder from Part A:** An `Observable` is a lazy stream of values. "Lazy" means nothing runs until you subscribe. When you call `http.get()`, Angular describes *what will happen* — subscribing is what actually sends the request and starts delivering data.

You already know `Observable` from Part A. `HttpClient` returns Observables — that knowledge applies directly here.

```typescript
// Part A gave you this mental model:
const obs$ = someService.getData();    // nothing happens yet
obs$.subscribe(data => console.log(data)); // THIS triggers the work

// HttpClient follows the exact same rule:
const users$ = this.http.get<User[]>('/api/users'); // nothing happens yet
users$.subscribe(users => console.log(users));      // THIS sends the request
```

- **An HTTP call is lazy** — the request is not sent until something subscribes
- `toSignal()` and `subscribe()` are the two ways you'll use to subscribe in this session
- Everything from Part A — `pipe()`, operators, error handling — works on HTTP Observables

---

## Slide 6: Type Every Response

A **TypeScript interface** defines the shape of an object — it tells the compiler exactly what properties to expect and what types they should be. Interfaces exist only at compile time and are erased from the JavaScript that runs in the browser. Without one, Angular treats an HTTP response as `any`, which means TypeScript cannot catch typos, missing fields, or wrong property types. Adding an interface gives the compiler a blueprint to check your work.

```typescript
// AVOID: Without an interface — 'users' is any, no autocomplete, no error catching
this.http.get('/api/users').subscribe(users => {
  console.log(users.name); // TypeScript won't warn you if 'name' doesn't exist
});

// PREFER: With an interface — TypeScript knows the exact shape
interface User {
  id: number;
  name: string;
  email: string;
}

this.http.get<User[]>('/api/users').subscribe(users => {
  console.log(users[0].name); // autocomplete works, typos caught at compile time
});
```

- The generic `<User[]>` tells TypeScript "trust me, this API returns an array of User"
- Angular does not validate the response against the interface at runtime — TypeScript checks happen at compile time only

---

## Slide 7: Define the User Interface

Here's a real interface shaped for the JSONPlaceholder `/users` endpoint used in examples today.

```typescript
// user.interface.ts — keep interfaces in their own file for reuse

export interface Address {
  street: string;
  city: string;
  zipcode: string;
}

export interface User {
  id: number;        // unique identifier
  name: string;      // full display name
  username: string;  // login handle
  email: string;     // contact email
  address: Address;  // nested object — define a separate interface for it
}
```

- Nest interfaces when the API returns nested objects — don't flatten everything into one big type
- You don't have to model every field — include what your component actually uses
- Prefix nothing — plain names like `User`, not `IUser` or `UserModel`

---

## Slide 8: Typing the HTTP Call

The generic type parameter you put on `get<T>()` flows through the entire chain — every operator and every subscriber downstream automatically knows the correct type without any extra annotations.

```typescript
// user-list.component.ts
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from './user.interface';

export class UserListComponent {
  private readonly http = inject(HttpClient);

  // <User[]> sets the type for everything downstream
  loadUsers(): void {
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(users => {
        // 'users' is User[] here — full autocomplete and type safety
        console.log(users[0].email);
      });
  }
}
```

- The generic is a *hint to TypeScript*, not a runtime cast — the API still has to actually return that shape
- Use the exact interface shape the API documents — don't guess field names

---

## Slide 9: GET — Fetching Data

`GET` is the most common call. It reads data from the server and returns `Observable<T>`. No body is sent — data travels in the URL or as query parameters.

```typescript
private readonly http = inject(HttpClient);
private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

// Fetch a list — users$ holds the Observable, not the data yet.
// It needs toSignal() or subscribe() to actually fire the request.
readonly users$ = this.http.get<User[]>(`${this.apiUrl}/users`);

// Fetch a single item by ID
getUser(id: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  //  returns Observable<User>, not User — subscribe to get the actual value
}
```

- `GET` does not send a body — data goes in the URL or as query params
- Always return the Observable from a method — let the caller decide when to subscribe

---

## Slide 10: POST — Creating Data

`POST` sends a body to the server and gets back the newly created resource. Angular automatically serializes a plain JavaScript object to JSON and sets the `Content-Type` header for you.

```typescript
interface CreateUserDto {
  name: string;
  email: string;
}

createUser(payload: CreateUserDto): Observable<User> {
  return this.http.post<User>(
    `${this.apiUrl}/users`,  // URL
    payload                  //  body — Angular serializes this to JSON automatically
  );
}

// Usage
this.userService.createUser({ name: 'Ada', email: 'ada@example.com' })
  .subscribe(newUser => {
    console.log('Created:', newUser.id); // server assigns the id
  });
```

- Angular sets `Content-Type: application/json` automatically when you pass a plain object
- The generic `<User>` is what you *expect back*, not what you send

---

## Slide 11: PUT and DELETE

`PUT` replaces an entire resource on the server. `DELETE` removes it. Both follow the same Observable pattern as `GET` and `POST` — you return the Observable and let the caller subscribe.

```typescript
// PUT — replace the whole resource; send the full updated object
updateUser(id: number, payload: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrl}/users/${id}`, payload);
}

// DELETE — no body; server typically returns nothing or a confirmation
deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  // <void> because we don't expect a meaningful response body
}
```

- Use `PATCH` (not shown) when you only want to send the *changed* fields
- `DELETE` often returns `204 No Content` — type it as `<void>` or `<unknown>`

---

## Slide 12: ⚠️ Nothing Happens Until You Subscribe

This is the number-one mistake with `HttpClient`. The request is not sent until something subscribes.

```typescript
// BAD: BROKEN — this creates an Observable but never subscribes
loadUsers(): void {
  this.http.get<User[]>('/api/users'); // request never fires, no error thrown
}

// PREFER: subscribe() triggers the request
loadUsers(): void {
  this.http.get<User[]>('/api/users')
    .subscribe(users => this.users.set(users));
}

// PREFER: toSignal() subscribes automatically
readonly users = toSignal(
  this.http.get<User[]>('/api/users'),
  { initialValue: [] }
);
```

- Angular won't warn you about an unsubscribed HTTP call — it just silently does nothing
- If your component loads and the screen stays empty, this is the first thing to check

---

## Slide 13: Build Query Strings with HttpParams

`HttpParams` is Angular's utility class for constructing URL query strings safely. Instead of manually concatenating strings — which breaks the moment a value contains a space, ampersand, or other special character — `HttpParams` handles URL encoding automatically and gives you a chainable API for adding parameters one at a time.

One important detail: `HttpParams` is **immutable**. Every call to `.set()` returns a brand-new `HttpParams` object rather than modifying the existing one — so you must chain the calls or reassign the variable.

```typescript
// AVOID: Fragile — manual string concatenation; special characters break things
this.http.get(`/api/posts?userId=${userId}&page=${page}`);

// PREFER: HttpParams — handles encoding, is immutable (each .set() returns a new instance)
import { HttpParams } from '@angular/common/http';

const params = new HttpParams()
  .set('userId', userId)   // .set() returns a new HttpParams — chain the calls
  .set('page', page)
  .set('limit', 10);

this.http.get<Post[]>('/api/posts', { params }); // pass as options object
```

- Angular URL-encodes values automatically — no need to call `encodeURIComponent()`

---

## Slide 14: Pass HttpParams to a Request

Here is a complete service method putting `HttpParams` to work. The method builds the query string, passes it as the options argument, and returns the Observable without subscribing. The component decides when to subscribe — this keeps the service flexible and easy to test.

```typescript
// This method returns an Observable — it does NOT subscribe internally.
// The component decides when to subscribe, which keeps the service flexible.
getPosts(userId: number, page: number): Observable<Post[]> {
  const params = new HttpParams()
    .set('userId', userId)  // becomes ?userId=1
    .set('_page', page)     // &_page=2
    .set('_limit', 10);     // &_limit=10

  return this.http.get<Post[]>(       // return the Observable, don't subscribe here
    'https://jsonplaceholder.typicode.com/posts',
    { params }                        // second argument is the options object
  );
}
```

- The resulting URL: `/posts?userId=1&_page=2&_limit=10`
- You can also build `HttpParams` from an object: `new HttpParams({ fromObject: { userId, page } })`

---

## Slide 15: The Stale Request Problem

`switchMap` is an RxJS operator that subscribes to an inner Observable and **automatically cancels the previous inner subscription** the moment a new value arrives from the outer Observable. In HTTP terms: if a new request fires before the previous one has completed, `switchMap` cancels the old request at the network level and only tracks the new one.

Before seeing how `switchMap` fixes things, it helps to understand the problem it solves. Without it, fast typing sends multiple overlapping requests and old responses can silently overwrite new ones:

```
User types: "ang"    → request A fires   ─────────────────────────────────────── arrives last (BAD)
User types: "angul"  → request B fires   ──────────────── arrives first (then overwritten)

Result: screen shows results for "ang" even though user typed "angul"
```

- This is a **race condition** — you can't predict which response arrives first
- The longer the query the faster the API usually responds (fewer results), making this worse in practice
- Subscriptions from request A are still alive — you're wasting bandwidth too

---

## Slide 16: switchMap Cancels Stale Requests

With `switchMap` in the pipeline, the race condition disappears. The moment a new value arrives from the outer Observable — a new search term in this case — `switchMap` cancels the in-flight request and starts a fresh one. Only the response from the most recent request ever reaches the template.

```
User types: "ang"    → switchMap subscribes to request A   ─── (cancelled)
User types: "angul"  → switchMap cancels A, subscribes to request B  ──── arrives (GOOD)
```

- "switch" = switch your attention to the new Observable, abandon the old one
- The in-flight HTTP request is cancelled at the network level (Angular calls `abort()`)
- Rule of thumb: **search inputs and route param changes** → `switchMap`

---

## Slide 17: switchMap in Practice

A search input wired to an API call. We use a `Subject` — a stream you push values into manually — to connect the template event to the pipeline. You covered `Subject` in Part A.

```typescript
import { Subject } from 'rxjs';

// Subject is a stream you control — .next() pushes a new value into the pipe
readonly searchTerm$ = new Subject<string>();

readonly results = toSignal(
  this.searchTerm$.pipe(
    debounceTime(300),                      // wait 300ms after last keystroke
    filter(term => term.length >= 2),       // ignore very short queries
    switchMap(term =>
      this.http.get<User[]>(`/api/users?q=${term}`) // new request per term
      // previous request is cancelled automatically before this one fires
    )
  ),
  { initialValue: [] as User[] }
);
```

```html
<!-- Push each keystroke into the Subject -->
<input (input)="searchTerm$.next($event.target.value)" placeholder="Search users" />
```

- `debounceTime` reduces how many requests fire; `switchMap` handles the ones that do fire
- The two work together — they are not interchangeable

---

## Slide 18: Handle Errors with catchError

`catchError` is an RxJS operator that intercepts errors in a pipeline and lets you handle them gracefully instead of letting them propagate. When an HTTP request fails, RxJS normally terminates the Observable stream with an error — meaning your template stops receiving future updates entirely. `catchError` intercepts that error, lets you decide what to do, and requires you to return a new Observable to keep the stream alive.

```typescript
import { catchError, of } from 'rxjs';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    catchError(err => {
      console.error('Request failed:', err);
      return of([]); // return a fallback Observable so the stream survives
      // of([]) emits an empty array and completes — the template gets [] instead of crashing
    })
  );
}
```

- `catchError` must return an Observable — use `of(fallback)` for a safe default value
- If you rethrow: `return throwError(() => err)` — useful when the caller handles the error

---

## Slide 19: catchError with a User Message

Set a signal inside `catchError` to surface the error in your template. You used this same pattern with `BehaviorSubject` and a paired error stream in Part A — this is the signal equivalent.

```typescript
readonly error = signal<string | null>(null);

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    catchError(err => {
      this.error.set('Could not load users. Please try again.'); // surface to template
      return of([]); // stream continues with empty data instead of dying
    })
  );
}
```

```html
@if (error()) {
  <p class="error-message">{{ error() }}</p>
}
```

- Set a signal inside `catchError` to show the message in your template
- Always return a valid Observable — never return `undefined` or throw synchronously

---

## Slide 20: Retry Pattern — Re-Calling the Load Function

The simplest retry is a button that calls your load function again. No special RxJS operator needed.

```typescript
readonly users = signal<User[]>([]);
readonly error = signal<string | null>(null);

loadUsers(): void {
  this.error.set(null); // clear the previous error before retrying

  this.http.get<User[]>('/api/users').pipe(
    catchError(err => {
      this.error.set('Failed to load. Try again.');
      return of([]);
    })
  ).subscribe(users => this.users.set(users));
}
```

```html
@if (error()) {
  <p class="error-message">{{ error() }}</p>
  <button (click)="loadUsers()">Retry</button>  <!-- re-triggers the whole load -->
}
```

- Calling `loadUsers()` again resets the error, fires a fresh request, and updates the signal
- This handles the majority of real retry use cases without any additional RxJS operators

---

## Slide 21: ⚠️ HttpErrorResponse — Know Your Error Object

When Angular's `HttpClient` encounters a failed HTTP request, it does not give you a plain JavaScript `Error` object. Instead, it wraps everything into an `HttpErrorResponse` — a specialized class that packages the HTTP status code, the response body, the response headers, and a human-readable message together in one place. Typing the catch parameter explicitly unlocks all of those fields.

```typescript
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    catchError((err: HttpErrorResponse) => { // type the catch parameter explicitly
      // err.status  — 0 for network errors, or the actual HTTP status code (404, 500, etc.)
      // err.message — a generic description of what went wrong
      // err.error   — the parsed response body (often contains server error details)
      console.log(err.status, err.message);
      return of([]);
    })
  );
}
```

- `err.status === 0` means the browser could not reach the server at all (no network, CORS block)
- `err.status === 404` means the server responded but the resource wasn't found
- `err.status === 500` means the server crashed — not your fault, but you still have to handle it

---

## Slide 22: Branch on HttpErrorResponse Status

Now that you can read `err.status`, you can write logic that gives users a specific, actionable message for each failure mode rather than a generic "something went wrong." Here's a helper method you can drop into any service.

```typescript
private getErrorMessage(err: HttpErrorResponse): string {
  if (err.status === 0) {
    // Network error or CORS — the request never reached the server
    return 'Network error. Check your connection and try again.';
  }

  switch (err.status) {
    case 400: return 'Invalid request. Please check your input.';
    case 401: return 'You need to log in to do that.';
    case 403: return 'You do not have permission for this action.';
    case 404: return 'That resource could not be found.';
    case 500: return 'Server error. Our team has been notified.';
    default:  return `Unexpected error (${err.status}). Please try again.`;
  }
}
```

- Pull this into a shared utility — every service will need it
- `err.status === 0` is the silent killer — it looks like a crash but it's just a network problem

---

## Slide 23: Run Multiple Requests in Parallel — forkJoin

`forkJoin` is an RxJS operator that takes a collection of Observables, fires them all **simultaneously**, and emits a single combined result once every one of them has completed. It is the right tool when a page needs data from multiple endpoints before it can render anything useful — rather than waiting for each request to finish before starting the next one.

```typescript
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

loadDashboard(): void {
  forkJoin({
    // Add catchError to each request — if one fails, the others still deliver their data
    users: this.http.get<User[]>('/api/users').pipe(
      catchError(() => of([] as User[]))  // fail gracefully; return empty array
    ),
    posts: this.http.get<Post[]>('/api/posts').pipe(
      catchError(() => of([] as Post[]))  // without this, one failure kills both
    ),
  }).subscribe(({ users, posts }) => {
    // arrives here only after BOTH requests have completed (or safely failed)
    this.users.set(users);
    this.posts.set(posts);
  });
}
```

- Without `catchError` on each inner Observable, a single failure cancels the entire `forkJoin`
- With it, each request fails independently and you still get data from the ones that succeeded

---

## Slide 24: forkJoin Is Promise.all for Observables

The mental model maps directly if you know `Promise.all`:

```typescript
// Promise.all — waits for all promises, resolves when all succeed
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);

// forkJoin — same idea for Observables
forkJoin({
  users: this.http.get<User[]>('/api/users'),
  posts: this.http.get<Post[]>('/api/posts')
}).subscribe(({ users, posts }) => { /* both ready */ });
```

- Key difference: `forkJoin` only works with Observables that **complete** — HTTP calls do complete, so it's safe here
- For Observables that keep emitting indefinitely (like a `BehaviorSubject`), use `combineLatest` instead — it emits every time *any* source emits rather than waiting for all to finish

---

## Slide 25: Track Loading State with a Signal

You now know how to fetch data, fire parallel requests, and handle errors. The missing piece is communicating status back to the user — what is happening right now, did something go wrong, is the data ready? Angular signals make this straightforward.

Always tell users something is happening — blank screens feel broken.

```typescript
readonly isLoading = signal(false); // drives the spinner in the template
readonly users = signal<User[]>([]);
readonly error = signal<string | null>(null);

loadUsers(): void {
  this.isLoading.set(true);  // show spinner before the request fires
  this.error.set(null);      // clear any previous error

  this.http.get<User[]>('/api/users').subscribe({
    next: users => this.users.set(users),
    error: err  => this.error.set('Failed to load users.'),
    complete: () => this.isLoading.set(false) // runs on success only — see finalize()
  });
}
```

- `complete` only runs on success — errors skip it. You need `finalize()` to hide the spinner either way.

---

## Slide 26: finalize() Runs No Matter What

`finalize()` is an RxJS operator that registers a callback to run when an Observable **completes or errors** — the Observable equivalent of a `try/catch/finally` block. This makes it perfect for cleanup work like hiding a loading spinner, because the callback fires regardless of whether the request succeeded or failed. Without it, an error leaves `isLoading` permanently stuck at `true`.

Here is the complete loading-state pattern — all three states handled and rendered in one template:

```typescript
import { finalize } from 'rxjs/operators';

loadUsers(): void {
  this.isLoading.set(true);

  this.http.get<User[]>('/api/users').pipe(
    catchError(err => {
      this.error.set('Failed to load users.');
      return of([]);
    }),
    finalize(() => this.isLoading.set(false)) // always runs — success OR error
  ).subscribe(users => this.users.set(users));
}
```

```html
<!-- All three states in one template — only one renders at a time -->
@if (isLoading()) {
  <div class="spinner">Loading…</div>
} @else if (error()) {
  <p class="error-message">{{ error() }}</p>
  <button (click)="loadUsers()">Retry</button>
} @else {
  @for (user of users(); track user.id) {
    <li>{{ user.name }}</li>
  }
}
```

---

## Slide 27: What an Interceptor Does

An interceptor is middleware that runs automatically on every HTTP request — before it leaves and/or after it returns.

```
Component calls http.get(url)
        ↓
  [ Interceptor 1 ]  ← can add headers, log the request
        ↓
  [ Interceptor 2 ]  ← can attach auth token
        ↓
  HTTP request hits the server
        ↓
  [ Interceptor 2 ]  ← can handle 401 responses
        ↓
  [ Interceptor 1 ]  ← can log the response time
        ↓
Component's subscribe() callback fires
```

- Common uses: attaching auth tokens, logging, adding correlation IDs, handling 401 redirects globally
- Interceptors run for **every** request — you don't wire them per-call

---

## Slide 28: HttpInterceptorFn — A Plain Function

The modern Angular interceptor is written as a plain TypeScript function — no class, no `@Injectable`, no interface to implement. The function receives two arguments:

- `req` — the outgoing `HttpRequest`, which is **immutable** by design
- `next` — a handler representing the rest of the interceptor chain (and ultimately the HTTP call itself)

Two rules apply to every interceptor you write:
1. **Always `clone()` before modifying the request** — you cannot mutate `req` directly
2. **Always `return next(authReq)`** — skipping this silently blocks all HTTP traffic

```typescript
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // req is immutable — clone it to add headers
  const token = localStorage.getItem('auth_token');

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` } // clone adds the header
  });

  console.log(`[HTTP] ${authReq.method} ${authReq.url}`); // log every request

  return next(authReq); // ALWAYS return next() — this passes the request down the chain
};
```

- The return type is `Observable<HttpEvent<unknown>>` — TypeScript infers it automatically from `HttpInterceptorFn`
- A regular function — easy to test, easy to tree-shake, no DI ceremony

---

## Slide 29: Register Interceptors in provideHttpClient

Interceptors are registered once in `app.config.ts` using `withInterceptors`.

```typescript
// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { loggingInterceptor } from './logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor,   // runs first — attaches the token
        loggingInterceptor // runs second — logs the request with headers already set
      ])
    )
  ]
};
```

- Interceptors run in **order** — put auth before logging so the log captures the final headers
- `withInterceptors` accepts an array — add as many as you need

---

## Slide 30: Wire HTTP to a Signal with toSignal()

You used `toSignal()` in Part A to connect a `BehaviorSubject` to a template. Here it connects an HTTP Observable — same function, same rules.

```typescript
import { toSignal } from '@angular/core/rxjs-interop';

export class UserListComponent {
  private readonly http = inject(HttpClient);

  // toSignal() must be called here — at the class field level during initialization.
  // Calling it inside ngOnInit() or a method throws a runtime error because
  // Angular's injection context is only active during class construction.
  readonly users = toSignal(
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users'),
    { initialValue: [] as User[] } // value before the request completes
  );
}
```

```html
@for (user of users(); track user.id) {
  <li>{{ user.name }}</li>
}
```

- `toSignal()` manages the subscription automatically — no manual unsubscribe needed
- If you call `toSignal()` inside a method or `ngOnInit`, Angular throws: *"toSignal() can only be used within an injection context"*

---

## Slide 31: toSignal() initialValue Matters

Without `initialValue`, the signal is `undefined` until the request resolves — your template needs to handle that.

```typescript
// AVOID: Without initialValue — signal type is User[] | undefined
readonly users = toSignal(
  this.http.get<User[]>('/api/users')
  //  before the response arrives, users() === undefined
);

// PREFER: With initialValue — signal is always User[], never undefined
readonly users = toSignal(
  this.http.get<User[]>('/api/users'),
  { initialValue: [] as User[] } // template always has an array to iterate
);
```

- Use `initialValue: []` for lists, `initialValue: null` for single items you'll check with `@if`
- `as User[]` is a type assertion — it tells TypeScript the empty array matches the expected type

---

## Slide 32: What Are Environment Files?

Environment files are TypeScript files that store configuration values — like API base URLs, feature flags, or log levels — that change depending on where your app is running. Rather than scattering those values throughout your code and remembering to change them before every deployment, you put them in one place and let Angular handle the rest.

Angular's build system knows which file to use based on the build command:

- During development (`ng serve`) → Angular loads `environment.development.ts`
- For production (`ng build`) → Angular swaps in `environment.ts` automatically

Your application code always imports from the same path — `environments/environment` — and never needs to know which environment it is in. The right values are already in the right file for that build.

Common things to put in environment files:
- API base URLs (the most common use case)
- Feature flags that enable or disable work-in-progress features
- Logging levels (`verbose` in dev, `error` only in production)
- Third-party API keys that differ per environment

---

## Slide 33: ⚠️ Generate Environment Files First

In Angular 17+, environment files are **not created automatically** when you generate a project. You have to run one command to add them.

```bash
# Run this once per project — creates both environment files
ng generate environments
```

This produces:

```
src/
  environments/
    environment.ts             ← used in production builds (ng build)
    environment.development.ts ← used during development (ng serve)
```

- If you skip this step and try to import from `environments/environment`, Angular throws a module-not-found error
- Run `ng generate environments` before writing any environment-dependent code

---

## Slide 34: Environment Files for API URLs

Hard-coding `localhost:3000` in your service means manually changing it before every deployment. Environment files solve this — each file exports the same shape, so your code imports from one path and Angular swaps the file at build time.

```typescript
// environment.development.ts — your local API
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'  // points to your local backend
};

// environment.ts — the production API
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com'  // points to the real server
};
```

- Both files export the **same shape** — your code imports from one file name; Angular swaps which file that resolves to at build time
- Add any value that differs between environments here: API keys, feature flags, logging levels

---

## Slide 35: Use the Environment in a Service

Import from `environment` and Angular handles the swap automatically at build time.

```typescript
// user.service.ts
import { environment } from '../environments/environment';
//  always import from 'environment' (not environment.development)
//    Angular replaces this file with environment.ts during production builds

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
    //  ↑ in dev:   http://localhost:3000/users
    //  ↑ in prod:  https://api.myapp.com/users
  }
}
```

- Never concatenate `environment.apiUrl` with a leading slash already in `apiUrl` — pick one convention and stick to it

---

## Slide 36: How ng build Swaps Environments

The swap happens automatically based on the build configuration — you never touch your source code. Here are the commands you'll encounter most often:

```bash
# Development server — Angular uses environment.development.ts
ng serve

# Production build — Angular replaces environment.development.ts with environment.ts
ng build --configuration production

# Custom environment (e.g. staging) — defined in angular.json
ng build --configuration staging
```

- The file replacement is configured in `angular.json` under `configurations` → `fileReplacements`
- In CI/CD pipelines you always run `ng build --configuration production` — the correct URL is used automatically

---

## Slide 37: Coming Up — Modern vs. Classic Angular

You've just learned the modern way to do HTTP in Angular.

Before we wrap up, we're going to look at the **classic (legacy) approach** — the patterns you'll see in older codebases and documentation written before Angular 17.

**You should write the modern code.**
The classic code is shown so you can read it, debug it, and understand what your teammates are talking about when they mention `HttpClientModule` or `HTTP_INTERCEPTORS`. On your first job, you will almost certainly open a codebase that looks like this.

---

## Slide 38: HTTP Setup — Legacy

You set up HTTP with `provideHttpClient()` back on Slide 4. Here's what that same setup looked like in a legacy NgModule-based app. The key difference is that HTTP was a module you imported, not a provider function you called.

```typescript
// app.module.ts — NgModule-based app (pre-Angular 17 style)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // a whole module import

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule // had to be listed here or HttpClient injection failed at runtime
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

- **Pain:** Forgetting `HttpClientModule` caused a runtime `NullInjectorError` with a confusing message
- **Pain:** Every library that needed `HttpClient` had to import `HttpClientModule` too — often in multiple places
- **Modern:** `provideHttpClient()` in `app.config.ts` — one line, no module required

---

## Slide 39: Interceptors — Modern vs. Legacy Setup

Both approaches achieve the same thing — attaching a token to every request. The modern version is a plain function registered in one line. The legacy version required a class, an interface, four extra imports, and a multi-token provider pattern for registration. Here's the full comparison side by side.

**Modern — plain function, registered with `withInterceptors`:**

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${getToken()}` }
  });
  return next(authReq);
};

// app.config.ts
provideHttpClient(
  withInterceptors([authInterceptor, loggingInterceptor]) // left-to-right execution order
)
```

**Legacy — class implementing an interface, registered with a multi-token provider:**

```typescript
// auth.interceptor.ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req.clone({ // next.handle() not next() — easy to mix up
      setHeaders: { Authorization: `Bearer ${getToken()}` }
    }));
  }
}

// app.module.ts
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  //  multi: true must be repeated for every interceptor — forget it and only the last one runs
]
```

- `next.handle()` vs. `next()` — the most common mistake when reading legacy interceptor code
- `multi: true` — forgetting it is a silent bug; no error is thrown, only the last interceptor runs

---

## Slide 40: Response Typing & Environment Config — Same in Both

Two things that did not change between modern and legacy Angular — good news for any older docs you find.

```typescript
// GOOD: http.get<MyType>(url) — identical in modern and legacy

// Modern (standalone, inject()):
readonly http = inject(HttpClient);
this.http.get<User[]>('/api/users');

// Legacy (NgModule, constructor injection):
constructor(private http: HttpClient) {}
this.http.get<User[]>('/api/users'); // same generic syntax — nothing changed
```

```typescript
// GOOD: environment.ts file swap — same mechanism in both

import { environment } from '../environments/environment'; // same import path
this.http.get(`${environment.apiUrl}/users`);              // same usage
```

- If you learned typed HTTP calls or environment config from older documentation, that knowledge transfers directly
- The only difference is *how* you inject `HttpClient` — `inject()` vs. constructor

---

## Slide 41: Key Takeaways

- **`provideHttpClient()` is the one setup call** — register it in `app.config.ts` and every component can inject `HttpClient`; always type your responses with a TypeScript interface using `http.get<MyType>(url)`; run `ng generate environments` once per project to create your environment files
- **Operators shape the data pipeline** — `switchMap` cancels stale requests, `catchError` keeps the stream alive on failure, `finalize` always runs cleanup, and `forkJoin` fires multiple requests in parallel — add `catchError` to each inner Observable so one failure doesn't cancel the rest
- **Interceptors run on every request** — write them as plain `HttpInterceptorFn` functions, always `clone()` before modifying the request, always `return next()`, and register them with `withInterceptors([])` inside `provideHttpClient()`
- **`toSignal()` must be called at the class field level** — not inside methods or lifecycle hooks; use `initialValue` to give the template a safe default before the request completes
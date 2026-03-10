# 5-Day Modern Angular Curriculum

**Target audience:** Beginners with JavaScript/TypeScript fundamentals
**Angular version:** Angular 17+
**Approach:** Modern Angular first — standalone components, signals, functional APIs. Legacy patterns are covered in comparison tables at every section so students can read and work in any codebase they encounter.

---

## Day 1 — The Angular Foundation

> **Why this day matters:** You'll go from zero to a running multi-component app. By the end, you'll understand how Angular thinks about UI — and get your first taste of signals, the future of Angular reactivity.

### Part A: What is Angular & Getting Started

- What Angular is, why it exists, how it compares to vanilla JS
- Installing the CLI, generating a project, understanding the file structure
- What `main.ts` does — `bootstrapApplication()` and `app.config.ts`
- Your first standalone component — decorators, metadata, selector, template, styles
- The `imports` array on a standalone component — how a component declares its own dependencies
- **Common beginner error:** forgetting to add something to the `imports` array produces a cryptic "not a known element" error; knowing how to read it and fix it is a skill worth learning on day one
- **Angular CLI commands** — `ng serve` (first thing you run after generating); `ng generate component/service/pipe/guard/directive`; `ng build`, `ng test`; what each produces and when to use them
- **Angular DevTools** — install on Day 1, use throughout the course; inspecting the component tree, viewing bindings, and profiling change detection
- Brief mention of `ViewEncapsulation` — why component styles are scoped by default and when you'd change it

*Code sample:* Walk through a freshly generated standalone project file by file

*Exercise:* Generate a project, create a `HeaderComponent` and `FooterComponent`, render both in `AppComponent`, experiment with scoped styles

*Sample project:* A static personal bio card rendered via components

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| App entry point | `bootstrapApplication(AppComponent, appConfig)` | `bootstrapModule(AppModule)` |
| Component registration | `imports: []` on the component itself | `declarations: []` inside `NgModule` |
| App config | `app.config.ts` with `providers: []` | `AppModule` providers array |
| Feature grouping | Standalone components grouped by folder | `NgModule` per feature |

- `NgModule` is a *container* Angular used to need to know what belonged together — standalone components carry that information themselves
- The vast majority of production codebases still use `NgModule`; students will encounter it on their first job

---

### Part B: Templates, Data Binding & Component Communication

> **Why this part matters:** These are the core mechanics of every Angular template you will ever write. Everything else builds on this.

*Data binding:*
- Interpolation `{{ }}`
- Property binding `[property]`
- Event binding `(event)`
- Two-way binding `[(ngModel)]` — importing `FormsModule` in the component's `imports`
- **Template reference variables** — `#myRef` for reading input values, passing refs to event handlers, and wiring sibling elements together
- **Safe navigation in templates** — the optional chaining operator `?.` (`user?.address?.city`) for values that may be null or undefined; nullish coalescing `??` for fallback values; why this matters immediately when working with async data that arrives as `null` before loading completes

*Component communication:*
- `@Input()` — passing data down from parent to child
- `@Output()` and `EventEmitter` — passing events up to the parent

*Lifecycle hooks — the two students need right now:*
- **`ngOnInit`** — the right place for initialization logic, HTTP calls, and processing inputs; why the constructor is not the right place (DI timing, side effects don't belong there)
- **`ngOnDestroy`** — cleanup: unsubscribing from Observables, cancelling timers, releasing resources; build the habit of thinking about cleanup from day one

*Signals — first look:*
- What a signal is — a value container that tracks who reads it and notifies them when it changes
- `signal()`, `computed()` — a simple counter example showing how derived values update automatically
- **Why introduce this now:** Students get a taste of modern reactivity before they've felt the pain it solves; full depth and the "why signals exist" story comes on Day 2 after they've worked with plain properties

*Code sample:* A product card component receiving data via `@Input`, using `ngOnInit` to process that data, emitting an "add to cart" event via `@Output`, with a live character counter demonstrating all four binding types — then a quick signal-based version of the counter for contrast

*Exercise:* Build a star rating widget that accepts a max rating via `@Input`, uses `ngOnInit` to build the star array, and emits the selected rating back to the parent via `@Output`. Use only `@Input`/`@Output` — no signals required yet.

*Sample project:* A tip calculator where a reusable input component passes values up to a parent result component

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| `ngModel` setup | Import `FormsModule` in component `imports: []` | Import `FormsModule` in the `NgModule` imports array |
| Passing data down | `@Input()` decorator | `@Input()` decorator (same) |
| Passing events up | `@Output()` + `EventEmitter` | `@Output()` + `EventEmitter` (same) |
| Lifecycle hooks | `implements OnInit`, `implements OnDestroy` (same) | `implements OnInit`, `implements OnDestroy` (same) |

---

## Day 2 — Components in Depth, Directives, Pipes & Signals

> **Why this day matters:** You'll learn to build truly reusable UI components and meet signals in full — the Angular feature that changes how you think about reactive state.

### Part A: Content Projection, Directives & Pipes

*Content projection:*
- **`ng-content`** — single-slot projection for wrapper and shell components
- Named slots with `select` — multi-slot projection for components with distinct regions (header, body, footer)
- **`ngAfterContentInit`** — introduced here, right after `ng-content`, where it belongs: fires once projected content has been inserted and is safe to access
- **Note on `@ViewChild`** — if you ever need to access a child component instance or DOM element directly from the parent class, that's `@ViewChild`; it's covered in Extended Topics and pairs with `ngAfterViewInit`, which fires once the component's own view is fully rendered

*Structural tools:*
- **`ng-container`** — a grouping element with no real DOM node; essential when you need a directive without adding an extra wrapper element
- **`ng-template`** — a template fragment that renders nothing by default; used for `@else` blocks and reusable snippets

*Control flow — modern syntax:*
- `@if` / `@else` blocks
- `@for` with required `track` — what `track` does for DOM reconciliation and why it is required
- `@switch` / `@case`

*Attribute directives:*
- Built-in: `[ngClass]`, `[ngStyle]`

*Pipes:*
- Built-in pipes: `date`, `currency`, `uppercase`, `lowercase`, `json`, `async`
- **Pure vs. impure pipes** — pure pipes only run when the input reference changes; why a pipe filtering a mutated array won't update; when to use `pure: false` and the performance cost
- Creating a custom pure pipe with `@Pipe` and `transform()`

*Code sample:* A task list using `@for` with `track`, `@if` / `@else` with an `ng-template` else block, a reusable card shell with named `ng-content` slots, and a custom `statusLabel` pipe

*Exercise:* Build a filterable movie list using `@for` and `@if`, a custom `truncate` pipe, and an `ng-content`-based card wrapper

*Sample project:* A movie listing with genre filters, formatted release dates, and a reusable card component with named content slots

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| Conditional rendering | `@if` / `@else` block syntax | `*ngIf` structural directive; `<ng-template #else>` |
| List rendering | `@for (item of items; track item.id)` | `*ngFor="let item of items; trackBy: trackFn"` |
| Switch | `@switch` / `@case` blocks | `[ngSwitch]` / `*ngSwitchCase` |
| Performance tracking | `track` required in `@for` | `trackBy` optional in `*ngFor`; defined as a named method on the component class: `trackById(index, item) { return item.id; }` |

- `*ngIf` and `*ngFor` are still in every major codebase — students need to recognize them immediately
- The asterisk (`*`) is shorthand that Angular desugars to `<ng-template>` — worth showing once so legacy code isn't mysterious

---

### Part B: Signals

> **Why this part matters:** Signals are Angular's architectural answer to how UI state should work. Understanding them now makes everything else — services, HTTP, forms, routing — cleaner and more intuitive.

*Students have now written components with `@Input()`, `@Output()`, and bound data in templates. They've seen that plain properties don't propagate efficiently, derived values require manual updates, and side effects have no clean home. This is exactly the right moment.*

- What signals are — the problem with zone.js checking the entire component tree on every event
- `signal()` — creating a writable signal; `.set()`, `.update()`
- `computed()` — deriving values from signals; read-only; only recalculates when a dependency changes
- `effect()` — running side effects reactively; **cleanup functions** — returning a function from `effect()` to cancel timers or subscriptions before the next run
- **Signal-based `input()` and `output()`** — the modern alternative to `@Input()`/`@Output()` taught on Day 1; now taught in full with proper context
- **`input()` is always readonly** — you cannot call `.set()` on a signal input from inside the component; it is owned by the parent; a common beginner mistake worth calling out explicitly
- `model()` — two-way signal binding between parent and child
- How signals improve change detection — Angular only re-renders the specific DOM nodes that depend on changed signals
- `ngOnChanges` introduced here as legacy contrast — it exists because without signals, responding to `@Input()` changes required a lifecycle hook with a `SimpleChanges` object; this is the old way of doing what `computed()` and `effect()` do naturally. Example: detecting when a parent passes a new `userId` and re-fetching data in response

> **Angular's direction (2026):** Now that you understand signals, the bigger picture makes sense. Zoneless change detection is stable and default in Angular v21+ — zone.js is no longer needed because signals tell Angular exactly what changed and where. This means smaller bundles, deterministic updates, and faster tests. Many modern apps also use SSR with incremental hydration — the server renders HTML fast, and the client hydrates only the parts that need interactivity, powered by signals and `@defer`. Everything you've learned today is the foundation for both.

*Code sample:* A shopping cart rebuilt twice — first with plain properties, then with signals — demonstrating where and how updates propagate differently; includes an `effect()` with a cleanup function

*Exercise:* Build a live search box where the input is a `signal()`, filtered results are `computed()`, and an `effect()` with cleanup logs each search term to a history list

*Sample project:* A budget tracker where total, spent, and remaining are all `computed()` signals derived from a writable expense list signal

#### ⟳ Legacy vs. Modern
| | Modern (Signals) | Legacy |
|---|---|---|
| Component input | `input<T>()` — returns a readonly `Signal<T>` | `@Input() value: T` — plain mutable property |
| Component output | `output<T>()` | `@Output() event = new EventEmitter<T>()` |
| Two-way binding | `model<T>()` | `@Input()` + `@Output()` naming-convention pair |
| Reacting to input changes | `computed()` or `effect()` reads the signal | `ngOnChanges(changes: SimpleChanges)` — checks `changes['inputName'].currentValue` |
| Derived state | `computed(() => ...)` — automatic | Getter method or manual `ChangeDetectorRef` call |
| Side effects | `effect()` with cleanup return | `ngOnChanges()`, `ngDoCheck()`, `ngOnDestroy()` |
| Change detection | Fine-grained — only affected DOM nodes update | Zone.js — whole component tree checked by default |
| Manual optimization | Not needed with signals | `ChangeDetectionStrategy.OnPush` + `markForCheck()` |

---

## Day 3 — Services, RxJS & HTTP

> **Why this day matters:** Real apps share data and fetch it from APIs. Today you'll learn how Angular separates logic from UI — and how `toSignal()` connects the RxJS world to the signals world you already know.

### Part A: Services, Dependency Injection & RxJS

*Services & DI:*
- What a service is — separating business logic and shared state from components
- `@Injectable({ providedIn: 'root' })` — singleton by default, tree-shakable
- Injecting with the `inject()` function in component class bodies
- **`inject()` beyond components** — `inject()` works in functional guards, interceptors, and factory functions too; this is a core reason why functional patterns in modern Angular are so powerful and flexible
- **Error handling in services** — wrapping state updates safely so a failed operation doesn't leave a `BehaviorSubject` in a broken state; surfacing errors to components via a dedicated error stream or signal alongside the data stream; the pattern of pairing a `data$` stream with an `error$` stream

*RxJS — the essentials:*
- What an Observable is — a stream of values over time vs. a one-time Promise; push vs. pull
- Creating Observables: `of()`, `from()`, `timer()`, `Subject`, `BehaviorSubject`
- Core operators: `map`, `filter`, `tap`, `switchMap`, `combineLatest`, `debounceTime`
- Subscription cleanup with `takeUntilDestroyed()` using `DestroyRef`
- **`toSignal()`** — converting any Observable into a signal; the primary bridge between the RxJS world and the signals world; using an Observable's stream in a template without subscribing manually
- **`async` pipe vs. `toSignal()`** — use `toSignal()` in new code for a cleaner, signal-native approach; you'll see `async` pipe in existing codebases and it still works perfectly; one important gotcha: `async` pipe emits `null` before the Observable emits its first value, which causes template errors unless you guard with `@if` — `toSignal()` lets you provide an `initialValue` instead

*Code sample:* A `CartService` using a `BehaviorSubject` to share cart state across two unrelated components; a mapped total; a paired `error$` stream; `toSignal()` used to display the Observable in a template without `async` pipe or manual subscribe

*Exercise:* Build a `NotificationService` that any component can push messages to, with 3-second auto-dismiss using RxJS `timer` and `takeUntilDestroyed()`; use `toSignal()` to drive the template

*Sample project:* A shopping cart where the header cart count and cart page stay in sync through a shared `BehaviorSubject` service

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| Service injection | `inject(MyService)` in class body | Constructor parameter `constructor(private svc: MyService)` |
| Service scope | `providedIn: 'root'` (default) | Listed in `NgModule.providers` |
| RxJS cleanup | `takeUntilDestroyed()` with `DestroyRef` | `takeUntil(this.destroy$)` + `ngOnDestroy()` Subject pattern |
| Observable in template | `toSignal(obs$)` — provide `initialValue` to avoid null | `async` pipe — emits `null` before first value; guard with `@if` |

- The `takeUntil` + `ngOnDestroy` pattern is in virtually every legacy codebase — students need to recognize it even if they write the modern version
- Constructor injection still works perfectly in modern Angular — `inject()` is more flexible for use outside constructors

---

### Part B: HTTP & Async Data

> **Why this part matters:** Nearly every real app talks to an API. This is how Angular does it.

- Providing `HttpClient` with `provideHttpClient()` in `app.config.ts`
- **TypeScript interfaces for HTTP responses** — always define an interface for your API response shape; `HttpClient.get<MyType>()` for type safety and autocompletion
- GET, POST, PUT, DELETE — every call returns an Observable
- **`HttpParams`** — building query strings programmatically for API requests: `new HttpParams().set('userId', 1).set('page', 2)`; passing via `http.get(url, { params })`; essential the moment a search hits an API endpoint rather than filtering locally
- Connecting HTTP to RxJS: `switchMap` to cancel stale requests, `catchError` for failures, `forkJoin` for parallel requests that all need to complete before rendering
- **`HttpErrorResponse`** — the typed error object Angular passes to `catchError`; using `.status` (404, 500), `.message`, and `.error` to branch error handling — a network failure, a not-found, and a server error all need different responses
- Loading and error state patterns
- Functional HTTP interceptors with `HttpInterceptorFn` — adding auth headers, logging requests
- **Environment files** — `environment.ts` / `environment.development.ts`; storing API base URLs; how `ng build` swaps the correct file at build time

*Code sample:* A typed user list fetched from a public API with a defined `User` interface, a loading spinner, `HttpErrorResponse`-aware error handling branching on status code, a search box using `HttpParams` and `switchMap` to cancel in-flight requests, a functional interceptor adding an auth header, and the API base URL sourced from environment config

*Exercise:* Fetch typed posts from JSONPlaceholder, implement search that cancels stale requests with `switchMap`, add a retry button on error, inspect the `HttpErrorResponse` status in the error handler, and define a `Post` interface

*Sample project:* A weather dashboard with a typed response interface, loading and error states with status-aware messaging, and the API key stored in environment config

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| HTTP setup | `provideHttpClient()` in `app.config.ts` | `HttpClientModule` in `AppModule` imports |
| HTTP interceptors | `HttpInterceptorFn` — a plain function | Class implementing `HttpInterceptor` with `intercept()` method |
| Interceptor registration | `withInterceptors([fn])` in `provideHttpClient()` | Listed in `NgModule.providers` with `HTTP_INTERCEPTORS` multi-token |
| Response typing | `http.get<MyType>(url)` (same) | `http.get<MyType>(url)` (same) |
| Environment config | `environment.ts` file swap (same mechanism) | `environment.ts` file swap (same mechanism) |

---

## Day 4 — Routing & Forms

> **Why this day matters:** Navigation and user input are the two things that make an app feel like a real product. Today you wire them both together.

### Part A: Angular Router

- Defining routes as a plain array, providing with `provideRouter(routes)` in `app.config.ts`
- `<router-outlet>`, `routerLink`, `routerLinkActive`
- **Programmatic navigation** — `Router.navigate()` and `Router.navigateByUrl()` via `inject(Router)`; navigating after a form submission, after login, or in response to an event; the difference between the two methods
- **Route parameters vs. query parameters** — route params (`/recipe/42`) for identity; query params (`/recipes?category=italian`) for optional state; when to use each
- **`withComponentInputBinding()`** — binding route params directly to component `input()` signals; eliminates manually injecting `ActivatedRoute` for simple param reading
- Child routes and nested `<router-outlet>`
- Lazy loading with `loadComponent()` — deferring a standalone component until its route is hit
- **Other `provideRouter` options** — `withHashLocation()` for hash-based URLs (common in environments that can't configure server-side redirects); `withPreloading()` for preloading lazy routes in the background after the app loads; students will encounter these in existing configs
- **Functional `canActivate` guard** — a plain function returning `boolean | UrlTree`
- **Functional `canDeactivate` guard** — preventing navigation away from a route with unsaved form changes; introduced here because students build a form on the same day and the use case is immediately concrete

*Code sample:* A multi-page app with a nav bar, list page, and detail page; route params via `withComponentInputBinding()`; query params driving list filtering; programmatic navigation after a mock login; an auth guard protecting an admin route; a `canDeactivate` guard wired to a form shell

*Exercise:* Add a 404 page, an auth guard checking an `isLoggedIn` signal in an `AuthService`, a `canDeactivate` guard on a form route that warns before leaving, and a button that navigates programmatically using `Router.navigate()`

*Sample project:* A recipe browser with a list page, a detail page, query params for category filtering, programmatic navigation after creating a recipe, and a guard on the create-recipe route

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| Router setup | `provideRouter(routes)` in `app.config.ts` | `RouterModule.forRoot(routes)` in `AppModule` |
| Feature routes | Child route arrays | `RouterModule.forChild(routes)` in feature module |
| Lazy loading | `loadComponent: () => import('./...')` | `loadChildren: () => import('./...').then(m => m.FeatureModule)` |
| Route params as inputs | `withComponentInputBinding()` | Manually inject `ActivatedRoute` |
| Programmatic navigation | `inject(Router).navigate(['/path'])` | Constructor-injected `Router` |
| `canActivate` guard | Plain function returning `boolean \| UrlTree` | Class implementing `CanActivate` |
| `canDeactivate` guard | Plain function with component type param | Class implementing `CanDeactivate<T>` |

- `AppRoutingModule` is one of the most common things students will encounter in existing codebases — worth showing the full setup once so it isn't mysterious

---

### Part B: Forms

- **Template-driven forms** — `ngModel`, template reference variables, `ngForm`, HTML5 validators, showing errors with `#field.invalid && #field.touched`
- **Reactive forms** — `FormGroup`, `FormControl`, `FormBuilder`, `Validators`, watching values with `valueChanges`
- **`FormArray`** — dynamic fields: adding and removing controls at runtime; `FormArray.push()`, `.removeAt()`, iterating with `@for` over `controls`
- Custom validators — synchronous and async
- Disabling submit until the form is valid
- **Handling form submission** — `(ngSubmit)` on the form element; reading the form's `.value` on submit; calling a service and navigating away on success; resetting the form with `.reset()`
- Connecting reactive forms to signals — `toSignal(form.valueChanges)` to treat live form values as reactive state
- **Common mistake: `ngModel` inside a reactive form** — mixing `ngModel` with `FormGroup` / `FormControl` causes a runtime error; template-driven and reactive forms are separate systems and should not be combined in the same form

*Code sample:* A user registration form with email validation, a custom password-match validator, a `FormArray` for adding multiple phone numbers, a live strength indicator as a `computed()` signal, and a full submission handler that calls a service, navigates on success, and resets on failure

*Exercise:* Build a contact form with name, email, and message — all validated, submit disabled until valid — with a `FormArray` for attaching multiple tags, a character-count signal on the message field, and a submit handler that logs the value and resets the form

*Sample project:* A multi-step checkout form with validation at each step, a `FormArray` for cart line items, a `computed()` completion-percentage signal, and programmatic navigation to a confirmation page on submit

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| `FormsModule` | Imported in standalone component `imports: []` | Imported in `NgModule` imports array |
| `ReactiveFormsModule` | Imported in standalone component `imports: []` | Imported in `NgModule` imports array |
| Form value as signal | `toSignal(form.valueChanges)` | Manual subscription in `ngOnInit`, unsubscribed in `ngOnDestroy` |
| `FormArray` | Identical API | Identical API (same) |

- The form APIs (`FormGroup`, `FormControl`, `FormArray`, validators, `ngModel`) are completely unchanged between modern and legacy — this is the day where the legacy contrast is smallest; knowing these APIs means knowing them for any Angular codebase

---

## Day 5 — Testing & Capstone

> **Why this day matters:** Untested code is unfinished code. The morning gives you the tools to verify your work. The afternoon is yours to build.

### Part A: Angular Testing

- Angular's testing setup — Jasmine + Karma out of the box; Jest as a common team alternative; what each provides
- `TestBed` — the Angular test environment; `ComponentFixture`, `debugElement`, `detectChanges()`
- **Testing standalone components** — `TestBed.configureTestingModule` with `imports: [MyComponent]`; why this is simpler than module-based setup
- Testing `@Input` bindings and `@Output` emissions
- **Testing signal inputs** — setting signal inputs via `fixture.componentRef.setInput()`
- **Testing `computed()` signals** — asserting derived values update when source signals change
- Unit testing a service — mocking dependencies with `jasmine.createSpyObj`; testing `BehaviorSubject`-based state including error stream behavior
- Testing HTTP with `provideHttpClientTesting()` and `HttpTestingController` — flushing mock responses, asserting on request URLs and methods, simulating `HttpErrorResponse` to test error handling branches
- Testing a pipe — instantiate, call `transform()`, assert; the simplest test to write
- Testing lifecycle hooks — triggering `ngOnInit` via `detectChanges()`, testing `ngOnDestroy` cleanup
- **Unit vs. integration testing tradeoffs** — `NO_ERRORS_SCHEMA` to fully isolate a component from its children vs. importing real child components for integration coverage; when each approach is appropriate

*Code sample:* A complete test suite for a `TaskService` and `TaskListComponent` — covering signal state changes, `input()`/`output()` communication, the pipe, an HTTP call with `HttpTestingController`, and a simulated error response

*Exercise:* Write tests for the `truncate` pipe from Day 2, a counter component with signal state, and a mock HTTP service call including error handling

*Sample project:* Write a test suite for the Day 4 recipe browser — service tests, component input/output tests, and one HTTP test

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| Component test setup | `imports: [StandaloneComponent]` in `configureTestingModule` | `declarations: [MyComponent]` + all module deps replicated in `TestBed` |
| HTTP testing | `provideHttpClientTesting()` | `HttpClientTestingModule` in `imports` |
| Signal input testing | `fixture.componentRef.setInput('name', value)` | Set `component.inputProp = value` directly |
| Change detection | `fixture.detectChanges()` (same) | `fixture.detectChanges()` (same) |

- NgModule-based component tests require significantly more `TestBed` boilerplate — one of the areas where standalone components are noticeably cleaner to test

---

### Part B: Capstone Project — Task Management App

Students build a **Task Management App** that ties every day of the course together. A group debugging and code review session runs midway through to surface common issues before final walkthroughs.

**API note:** The capstone uses `json-server` with a custom `db.json` file defining a `tasks` collection with `{ id, title, description, status, subtasks[] }`. This avoids the shape mismatch of using JSONPlaceholder's `/todos` endpoint against a custom `Task` interface. Setup instructions provided at the start of the capstone.

| Day | Feature |
|---|---|
| Day 1 | Standalone components, `@Input()`/`@Output()`, `ngOnInit` for data loading, `ngOnDestroy` for cleanup |
| Day 2 | `@for` / `@if` for the task list, a custom `statusLabel` pipe, a reusable task card with `ng-content` |
| Day 2 | `computed()` signals for filtered task lists and aggregate counts |
| Day 3 | A `TaskService` using `BehaviorSubject` for shared state with a paired error stream, typed HTTP calls with a `Task` interface, environment config for the API base URL |
| Day 4 | Routing between dashboard, task list, and task detail; query params for status filtering; `canDeactivate` guard on the create/edit form; programmatic navigation to the task list after saving |
| Day 4 | Reactive form for creating and editing tasks with a `FormArray` for subtasks, a `toSignal(form.valueChanges)` character counter, and a full submit handler with `.reset()` |
| Day 5 | At least one passing test each for the service, a component, and the pipe |

Students walk through what they built at the end of the day.

---

## Extended Topics — Going Further

*These are real Angular concepts students will encounter in production work. They are not required for the capstone but serve as a reference after the course.*

### Signals — Advanced
- `linkedSignal()` — a writable signal whose default value derives from another signal; fills the gap between `computed()` (read-only) and `signal()` (fully independent)
- `untracked()` — reading a signal's value inside `effect()` without creating a reactive dependency
- `toObservable()` — converting a signal into an Observable to drive RxJS pipelines from signal state
- `viewChild()` / `contentChild()` signal queries — the signal-based replacement for `@ViewChild` / `@ContentChild` decorators

### Component Architecture — Advanced
- `@ViewChild` and `ngAfterViewInit` — accessing a child component or DOM element from the parent; `ngAfterViewInit` fires once the component's own view is fully rendered and is the earliest safe access point
- `@ContentChild` — querying projected content; pairs with `ngAfterContentInit` introduced in Day 2
- `@ViewChildren` / `@ContentChildren` — querying multiple children as a reactive `QueryList`
- **Custom attribute directives** — building a `[appHighlight]` or `[appTooltip]` directive with `@Directive`, `@HostBinding`, and `@HostListener`; these appear constantly in production codebases
- `@defer` / Deferrable Views — `@defer`, `@placeholder`, `@loading`, `@error` blocks; built-in lazy rendering of heavy components; powers incremental hydration in SSR; improves initial load and LCP
- `ControlValueAccessor` — building a fully custom form control that integrates with both `ngModel` and reactive forms
- `InjectionToken` — injecting non-class dependencies like configuration objects, feature flags, and API base URLs

### RxJS — Going Deeper
- `ReplaySubject` — replays the last N emissions to new subscribers; contrast with `BehaviorSubject`
- `forkJoin` — parallel Observables, waiting for all to complete; the RxJS equivalent of `Promise.all`; introduced in Day 3 Part B for HTTP use — this entry covers advanced patterns like combining non-HTTP streams
- `mergeMap` — like `switchMap` but doesn't cancel; useful when all inner Observables should complete regardless of new emissions
- `withLatestFrom`, `distinctUntilChanged`, `startWith`, `scan` — common production operators
- Advanced interceptor patterns — retry logic with `retry()`, response caching

### Router — Advanced
- Route resolvers with `ResolveFn` — preloading data before a component renders; eliminating the flash of empty content
- `canMatch` guard — controls whether a lazy-loaded route is even considered for matching
- `ActivatedRouteSnapshot` vs `ActivatedRoute` — one-time reads vs. reactive updates when params change in the same component instance

### State Management — Landscape
- When a service + `BehaviorSubject` or `signal()` isn't enough
- `signalStore()` from `@ngrx/signals` — a structured, signal-native approach
- NgRx — actions, reducers, selectors, effects as concepts; when a team reaches for it

### Performance & Architecture
- Zoneless Angular — stable and default in Angular v21+; use `provideZonelessChangeDetection()` in `app.config.ts`; `provideExperimentalZonelessChangeDetection()` is the older pre-stable API name you'll see in pre-v21 codebases; signals are the foundation that makes zoneless possible; smaller bundles, deterministic updates, faster tests
- `ChangeDetectionStrategy.OnPush` — manual optimization for non-signal code; what it does and when legacy codebases use it

### Accessibility & Deployment
- Accessibility basics — ARIA roles, focus management, semantic HTML in Angular templates
- Deployment — `ng build`, the `dist/` output, common hosting options (Netlify, Vercel, Firebase Hosting)
- `ng test --code-coverage` — reading Istanbul HTML reports; what line, branch, and function coverage mean

---

## Modern vs. Legacy Master Reference

| Concept | Modern | Legacy |
|---|---|---|
| App bootstrap | `bootstrapApplication()` | `bootstrapModule(AppModule)` |
| Component registration | `imports: []` on component | `declarations: []` in NgModule |
| HTTP setup | `provideHttpClient()` | `HttpClientModule` |
| HTTP interceptors | `HttpInterceptorFn` function | Class implementing `HttpInterceptor` |
| Router setup | `provideRouter(routes)` | `RouterModule.forRoot(routes)` |
| Lazy loading | `loadComponent()` | `loadChildren()` + feature module |
| Route params as inputs | `withComponentInputBinding()` | Inject `ActivatedRoute` manually |
| Programmatic navigation | `inject(Router).navigate()` | Constructor-injected `Router` |
| `canActivate` guard | Plain function | Class implementing `CanActivate` |
| `canDeactivate` guard | Plain function with component type | Class implementing `CanDeactivate<T>` |
| Resolver | `ResolveFn<T>` function | Class implementing `Resolve<T>` |
| Service injection | `inject(MyService)` | Constructor parameter |
| Service scope | `providedIn: 'root'` | `NgModule.providers` array |
| Component inputs | `input<T>()` — readonly signal | `@Input()` decorator — mutable property |
| Component outputs | `output<T>()` | `@Output()` + `EventEmitter` |
| Two-way binding | `model<T>()` | `@Input()` + `@Output()` pair |
| Reacting to input changes | `computed()` / `effect()` | `ngOnChanges()` with `SimpleChanges` |
| Control flow | `@if`, `@for`, `@switch` | `*ngIf`, `*ngFor`, `*ngSwitch` |
| Template local variable | `@let name = expr;` | `*ngIf="expr as name"` or `let-name` in `ng-template` |
| trackBy | `track` expression in `@for` | `trackBy` method on component class |
| Shared state (light) | `signal()` in a service | `BehaviorSubject` in a service |
| Shared state (structured) | `signalStore()` | NgRx store |
| RxJS cleanup | `takeUntilDestroyed()` | `takeUntil()` + `ngOnDestroy` |
| Observable in template | `toSignal(obs$, { initialValue })` | `async` pipe — emits `null` before first value |
| Change detection | Signals / fine-grained | Zone.js / `OnPush` + `markForCheck()` |
| Form modules | Imported per component | Imported in NgModule |
| Component test setup | `imports: [MyComponent]` | `declarations: [MyComponent]` + module deps |
| HTTP test setup | `provideHttpClientTesting()` | `HttpClientTestingModule` |
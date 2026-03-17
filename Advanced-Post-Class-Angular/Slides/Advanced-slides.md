## Slide 1: Extended Topics — Angular Beyond the Course

### Going Further with Angular

This deck covers real Angular concepts you'll encounter in production codebases. Nothing here is required for the capstone — this is your reference for what comes after. Every section shows both the modern approach and the legacy equivalent you'll find in existing projects.

---

## Slide 2: What You'll Be Able to Do

- Use advanced signal APIs: `linkedSignal()`, `untracked()`, `toObservable()`, and `resource()`
- Access DOM elements and child components directly with `@ViewChild` and signal queries
- Build custom attribute directives and custom form controls
- Handle server-side rendering, hydration, and platform-aware code
- Apply production RxJS patterns: `ReplaySubject`, `mergeMap`, retry logic
- Understand state management options beyond a single service
- Configure change detection, zoneless Angular, deployment, and accessibility

---

## Slide 3: linkedSignal() — Writable with a Derived Default

You know two signal types already: `computed()` is read-only — you can never call `.set()` on it. `signal()` is fully independent — its default doesn't react to anything. `linkedSignal()` fills the gap between them: **a writable signal whose default value is derived from another signal, but can be overridden by the user.**

Think of it as: "start here based on this other value, but let me override it."

```typescript
import { signal, linkedSignal } from '@angular/core';

readonly selectedCategory = signal('all');

// linkedSignal derives its DEFAULT from selectedCategory.
// Unlike computed(), you CAN call .set() on it to override the derived value.
// When selectedCategory changes, selectedPage resets back to the derived default (1).
readonly selectedPage = linkedSignal(() =>
  this.selectedCategory() ? 1 : 1 // resets to 1 whenever category changes
);

goToPage(page: number): void {
  this.selectedPage.set(page); // override — user is now on page 3
  // if selectedCategory changes NOW, selectedPage resets back to 1
}
```

**The decision rule:**
- `computed()` — always derived, never manually set
- `linkedSignal()` — derived default, but manually overridable
- `signal()` — fully independent, no derived default

---

## Slide 4: untracked() — Reading Without a Dependency

Inside `effect()` or `computed()`, Angular automatically tracks every signal you call. **A reactive dependency means: "when this signal changes, re-run this function."** That tracking is what makes reactivity work — but sometimes you need to read a signal's value without adding it as a trigger.

`untracked()` lets you read a signal inside a reactive context without creating that dependency.

```typescript
import { signal, effect, untracked } from '@angular/core';

readonly userId   = signal(1);
readonly logLevel = signal('verbose');
// You want to USE logLevel inside the effect, but you don't want
// the effect to re-run every time logLevel changes — only when userId changes.

constructor() {
  effect(() => {
    const id = this.userId(); // TRACKED — effect re-runs when userId changes

    // untracked() reads the signal's current value without registering
    // it as a dependency — the effect does NOT re-run when logLevel changes
    const level = untracked(() => this.logLevel());

    if (level === 'verbose') {
      console.log(`Loading user ${id}`);
    }
  });
}
```

Without `untracked()`, a change to `logLevel` would re-trigger the effect even though nothing meaningful changed. Use it when a signal provides context but shouldn't be a trigger.

---

## Slide 5: toObservable() — Signals into RxJS

`toSignal()` converts an Observable into a signal. `toObservable()` goes the other direction: it converts a signal into an Observable so you can use RxJS operators on it.

The reason you'd do this round-trip — signal → Observable → signal — is to get RxJS operators that have no signal equivalent: `debounceTime` to wait for the user to stop typing, `switchMap` to cancel stale in-flight requests, `distinctUntilChanged` to skip unchanged values. These behaviors live in RxJS. `toObservable()` lets you enter that world from a signal, then `toSignal()` brings the result back out.

```typescript
import { signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

readonly searchTerm = signal('');
private readonly http = inject(HttpClient);

// Step 1: signal → Observable (enter RxJS world)
// Step 2: apply operators that don't exist on signals
// Step 3: Observable → signal (return to signal world for the template)
readonly results = toSignal(
  toObservable(this.searchTerm).pipe(
    debounceTime(300),          // wait 300ms after user stops typing
    distinctUntilChanged(),     // skip re-fetch if value didn't actually change
    switchMap(term =>           // cancel the previous request when a new term arrives
      this.http.get<Result[]>(`/api/search?q=${term}`)
    ),
  ),
  { initialValue: [] }
);
```

---

## Slide 6: viewChild() / contentChild() — Signal Queries

`@ViewChild` and `@ContentChild` are decorator-based and require `ngAfterViewInit` to safely access their values. The signal-based replacements — `viewChild()` and `contentChild()` — return a signal instead, which means you can use them in `computed()` and `effect()` without worrying about lifecycle timing.

```typescript
import { Component, viewChild, contentChild, ElementRef } from '@angular/core';

@Component({ standalone: true, ... })
export class MyComponent {
  // viewChild — queries the component's OWN template
  // Returns Signal<ElementRef<HTMLCanvasElement> | undefined>
  readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvasRef');

  // contentChild — queries content projected in from the parent via ng-content
  // Returns Signal<HeaderComponent | undefined>
  readonly header = contentChild(HeaderComponent);

  constructor() {
    effect(() => {
      const el = this.canvas(); // undefined until view renders, then the ElementRef
      if (el) {
        // effect re-runs once canvas() is populated — no ngAfterViewInit needed
        const ctx = el.nativeElement.getContext('2d');
      }
    });
  }
}
```

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| Query own template | `viewChild(Ref)` — returns a signal | `@ViewChild('ref') el!: ElementRef` |
| Query projected content | `contentChild(Type)` — returns a signal | `@ContentChild(Type) child?: Type` |
| Safe access timing | `effect()` handles it automatically | Must wait for `ngAfterViewInit` / `ngAfterContentInit` |

---

## Slide 7: resource() — Signal-Based Async Data (Angular 19+)

`resource()` is Angular's signal-native way to load async data. Instead of `http.get() + toSignal()`, you declare the async operation and Angular manages the loading, value, and error states for you as signals.

```typescript
import { Component, input, resource, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({ standalone: true, ... })
export class RecipeDetailComponent {
  readonly id = input<string>();
  private readonly http = inject(HttpClient);

  readonly recipeResource = resource({
    request: this.id,                    // re-fetches whenever id() changes
    loader: ({ request: id }) =>
      // resource() expects a Promise — use firstValueFrom() to convert HttpClient's Observable
      firstValueFrom(this.http.get<Recipe>(`/api/recipes/${id}`))
  });

  // resource exposes these built-in signals — no manual loading/error state needed
  readonly recipe  = this.recipeResource.value;    // Signal<Recipe | undefined>
  readonly loading = this.recipeResource.isLoading; // Signal<boolean>
  readonly error   = this.recipeResource.error;     // Signal<unknown>
}
```

**Resource state lifecycle:**

| State | `isLoading()` | `value()` | `error()` |
|---|---|---|---|
| Initial (no request yet) | `false` | `undefined` | `undefined` |
| Loading | `true` | previous value or `undefined` | `undefined` |
| Resolved | `false` | the data | `undefined` |
| Error | `false` | `undefined` | the error |

> `rxResource()` is a variant that accepts an Observable-returning loader instead of a Promise — no `firstValueFrom()` needed. Available in Angular 19+; use `http.get() + toSignal()` in earlier versions.

---

## Slide 8: input.required() — Required Signal Inputs

Regular `input<string>()` is optional — TypeScript types it as `Signal<string | undefined>`. `input.required<string>()` declares that the parent **must** provide a value. TypeScript types it as `Signal<string>` — never undefined — and Angular throws a runtime error if the parent omits the binding.

The `transform` option lets you coerce the incoming value. The two type parameters `<OutputType, InputType>` tell TypeScript what type goes in and what type comes out.

```typescript
import { Component, input } from '@angular/core';

@Component({ standalone: true, ... })
export class RecipeCardComponent {
  // Optional — parent may or may not pass this
  // TypeScript type: Signal<string | undefined>
  readonly subtitle = input<string>();

  // Required — parent must pass this or Angular throws at runtime
  // TypeScript type: Signal<string>  (never undefined)
  readonly title = input.required<string>();

  // Required with transform — two type params: <OutputType, InputType>
  // Angular receives the value as a string from the template, transforms it to a number
  readonly recipeId = input.required<number, string>({
    transform: (v) => Number(v), // parent passes "42" (string), component gets 42 (number)
  });
}
```

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| Optional input | `input<string>()` | `@Input() title?: string` |
| Required input | `input.required<string>()` | `@Input({ required: true }) title!: string` |
| Transform on input | `input.required<T, U>({ transform })` | `@Input({ transform: fn }) value: T` |

---

## Slide 9: @ViewChild, @ContentChild, and Timing

`@ViewChild` lets a parent access a child component instance or DOM element from TypeScript. `@ContentChild` does the same for content projected in via `<ng-content>`. Both are populated by specific lifecycle hooks — and accessing them before those hooks fire crashes your app.

```typescript
import { Component, ViewChild, ContentChild,
         AfterViewInit, AfterContentInit, ElementRef } from '@angular/core';

@Component({ standalone: true, imports: [ChartComponent], template: `
  <app-chart #chart />
  <ng-content select="app-card-header" />  <!-- projected from parent -->
` })
export class ParentComponent implements AfterViewInit, AfterContentInit {
  @ViewChild('chart')  chart!: ChartComponent;          // own template — ready in ngAfterViewInit
  @ContentChild(CardHeaderComponent) header?: CardHeaderComponent; // projected — ready in ngAfterContentInit

  ngAfterViewInit(): void {
    // EARLIEST safe access for @ViewChild — own view is fully rendered
    this.chart.refresh();
  }

  ngAfterContentInit(): void {
    // EARLIEST safe access for @ContentChild — projected content has been inserted
    this.header?.setTheme('dark');
  }
}
```

**⚠️ The most common mistake — accessing before the view renders:**
```typescript
ngOnInit(): void {
  this.chart.refresh(); //  TypeError — view hasn't rendered yet at ngOnInit
}
constructor() {
  this.chart.refresh(); //  Also crashes — constructor runs before any view exists
}
```

> **Prefer signal queries** (`viewChild()`, `contentChild()`) for new code — they handle timing automatically inside `effect()` without requiring lifecycle hooks.

---

## Slide 10: @ViewChildren / @ContentChildren

When you need to query **multiple** children of the same type, use the plural forms. They return a `QueryList<T>` — a live, iterable list that updates automatically when children are added or removed.

```typescript
import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({ standalone: true, ... })
export class TabGroupComponent implements AfterViewInit {
  @ViewChildren(TabComponent) tabs!: QueryList<TabComponent>;
  // QueryList has: .first, .last, .length — iterable with @for
  // .changes is an Observable that emits whenever the list updates

  ngAfterViewInit(): void {
    this.tabs.first?.activate(); // activate the first tab on init

    // React to tabs being added or removed dynamically
    this.tabs.changes.subscribe(() => {
      console.log(`Tab count: ${this.tabs.length}`);
    });
  }
}
```

The signal equivalent is `viewChildren(TabComponent)` which returns `Signal<readonly TabComponent[]>` — reactive without `.changes` subscriptions.

`@ContentChildren` works identically but queries projected content instead of the component's own template.

---

## Slide 11: Custom Attribute Directives

Attribute directives attach custom behavior to any existing element. The directive doesn't replace the element or add a wrapper — it runs alongside it, reading and modifying its properties and responding to its events.

Two decorators do the heavy lifting:
- **`@HostBinding`** — binds a property of your directive class to a property on the **host element** (the element the directive is applied to). When your class property changes, the DOM property updates automatically.
- **`@HostListener`** — listens for a DOM event on the host element and calls a method on your directive when it fires. Angular manages the listener lifecycle — no `addEventListener` or `removeEventListener` needed.

```typescript
// highlight.directive.ts
import { Directive, HostBinding, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]', // applied as an HTML attribute: <p appHighlight>
  standalone: true,
})
export class HighlightDirective {
  readonly color = input<string>('yellow'); // configurable by the parent

  // @HostBinding maps THIS class property to the host element's style.backgroundColor
  // When bgColor changes, the DOM updates automatically
  @HostBinding('style.backgroundColor') bgColor = '';

  // @HostListener listens for 'mouseenter' on the host element
  // Fires onEnter() when triggered — Angular removes the listener when the directive is destroyed
  @HostListener('mouseenter') onEnter(): void {
    this.bgColor = this.color(); // set the background color on hover
  }

  @HostListener('mouseleave') onLeave(): void {
    this.bgColor = ''; // remove it when the mouse leaves
  }
}
```

```html
<!-- Import HighlightDirective in the component's imports array -->
<p appHighlight [color]="'lightblue'">Hover over me</p>
```

---

## Slide 12: ⚠️ WARNING — Directive Cleanup and DestroyRef

If your directive manually adds event listeners or starts timers, you must clean them up. Angular manages the lifecycle of `@HostListener` automatically — but anything you wire up manually is your responsibility.

**`DestroyRef`** is the underlying Angular primitive for cleanup. It's an injectable object that lets you register a callback to run when the current context (component, directive, or service) is destroyed. `takeUntilDestroyed()` from Day 3 uses `DestroyRef` internally.

```typescript
//  Wrong — manually adding a listener with no cleanup → memory leak
@Directive({ selector: '[appClickOutside]', standalone: true })
export class ClickOutsideDirective implements OnInit {
  ngOnInit(): void {
    document.addEventListener('click', this.handler);
    // This listener is NEVER removed — it lives forever even after the directive is gone
  }
}

//  Option 1 — use @HostListener (Angular owns the lifecycle)
@Directive({ selector: '[appClickOutside]', standalone: true })
export class ClickOutsideDirective {
  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    // Angular removes this automatically when the directive is destroyed
  }
}

//  Option 2 — inject DestroyRef for cleanup you manage manually
@Directive({ selector: '[appClickOutside]', standalone: true })
export class ClickOutsideDirective {
  private readonly destroyRef = inject(DestroyRef); // inject the destroy lifecycle hook

  constructor() {
    const handler = (e: MouseEvent) => { /* ... */ };
    document.addEventListener('click', handler);

    // Register a cleanup callback — runs when the directive is destroyed
    this.destroyRef.onDestroy(() =>
      document.removeEventListener('click', handler)
    );
  }
}
```

---

## Slide 13: @defer — Deferrable Views

`@defer` lazy-loads a component at the **template level** — no route change needed. Angular splits the deferred content into a separate JS chunk automatically at build time, and only downloads it when the trigger condition is met.

**Incremental hydration** (SSR context) means the server renders the placeholder HTML, and the browser only downloads and hydrates the deferred component when it's needed — instead of hydrating the entire page at once on load.

```html
<!-- recipe-detail.component.html -->

<!-- The ReviewsComponent chunk is NOT in the initial JS bundle -->
@defer (on viewport) {             <!-- trigger: download + render when scrolled into view -->
  <app-reviews [recipeId]="id()" />
} @placeholder {
  <div class="placeholder">Reviews</div>  <!-- shown immediately, before defer triggers -->
} @loading (minimum 300ms) {
  <app-spinner />                   <!-- shown while the JS chunk is downloading -->
} @error {
  <p>Failed to load reviews.</p>    <!-- shown if the download fails -->
}

<!-- Using a signal as the trigger condition -->
@defer (when isVisible()) {         <!-- triggers when the signal becomes true -->
  <app-heavy-chart />
}
```

**Trigger options:**
- `on viewport` — when the block scrolls into view
- `on interaction` — when the user clicks or focuses the placeholder
- `on idle` — when the browser has finished initial work
- `when condition` — when a signal or expression becomes truthy
- `on timer(2s)` — after a fixed delay

---

## Slide 14: @defer Legacy Contrast

Before `@defer`, deferring a component's render and download required manual infrastructure — none of the approaches were clean.

**Modern — `@defer`:**
```html
@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <div>Chart loading...</div>
}
```

**Legacy — manual approaches:**
```typescript
// Option 1: *ngIf + IntersectionObserver — verbose setup, manual cleanup
showChart = false;

ngAfterViewInit(): void {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { this.showChart = true; observer.disconnect(); }
  });
  observer.observe(this.chartContainer.nativeElement);
}

// Option 2: ViewContainerRef + dynamic import — even more verbose
@ViewChild('chartContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

async loadChart(): Promise<void> {
  const { HeavyChartComponent } = await import('./heavy-chart.component');
  this.container.createComponent(HeavyChartComponent);
}
```

`@defer` replaces IntersectionObserver setup, `ViewContainerRef`, dynamic imports, and manual cleanup with four declarative HTML lines.

---

## Slide 15: ControlValueAccessor — Custom Form Controls

`ControlValueAccessor` (CVA) is the interface that connects your custom component to Angular's form system. Without it, Angular has no way to push values into your component or receive values back out of it.

**The data flow in plain English:**
- **`writeValue(val)`** — Angular calls this to push a value **into** your component (e.g., when the form is initialized or `patchValue()` is called). You receive the value and update your internal display.
- **`registerOnChange(fn)`** — Angular gives you a callback. You store it. You call it when the user changes the value — this is how Angular hears about changes.
- **`registerOnTouched(fn)`** — Angular gives you a callback. You call it when the user blurs or interacts with the control — this is how Angular knows to show validation errors.
- **`setDisabledState(isDisabled)`** — Angular calls this when the control is programmatically disabled or enabled. Optional but recommended.

```typescript
// star-rating.component.ts
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  template: `<!-- star UI here -->`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarRatingComponent), // forwardRef: class not defined yet at this point
    multi: true,                                        // multiple CVA providers can coexist
  }],
})
export class StarRatingComponent implements ControlValueAccessor {
  value = 0;
  private onChange:  (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(val: number): void    { this.value = val ?? 0; }        // Angular → component
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }   // store callback
  registerOnTouched(fn: () => void): void         { this.onTouched = fn; }  // store callback
  setDisabledState(isDisabled: boolean): void      { /* update UI */ }       // optional

  onStarClick(rating: number): void {
    this.value = rating;
    this.onChange(rating);  // component → Angular: "value changed"
    this.onTouched();       // component → Angular: "user interacted"
  }
}
```

---

## Slide 16: ControlValueAccessor in Use

Once you implement `ControlValueAccessor`, your component integrates with both reactive forms and template-driven forms. From the parent's perspective, it behaves identically to a native `<input>` — the fact that it's implemented as a custom component is entirely internal.

```typescript
@Component({
  standalone: true,
  imports: [StarRatingComponent, ReactiveFormsModule, FormsModule],
  template: `
    <!-- Reactive form — works with formControlName -->
    <form [formGroup]="form">
      <app-star-rating formControlName="rating" />
    </form>

    <!-- Template-driven — works with ngModel -->
    <app-star-rating [(ngModel)]="myRating" />
  `,
})
export class ParentComponent {
  readonly form = new FormGroup({
    rating: new FormControl(0),
  });
  myRating = 3;
}
```

`form.value`, `patchValue()`, `reset()`, validators, `statusChanges` — all of it works on your custom component. This is how Angular Material, PrimeNG, and every major third-party form component library is built.

---

## Slide 17: InjectionToken — Injecting Non-Class Values

DI isn't just for services. `InjectionToken` lets you inject configuration objects, feature flags, API base URLs, or any value that isn't a class.

**Decision rule:** use a service when you need logic and behavior — methods, state, reactive streams. Use `InjectionToken` when you need to inject a plain value or configuration object that has no behavior.

```typescript
// tokens.ts — define the token and its type
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiUrl: string;
  featureFlags: { darkMode: boolean; betaFeatures: boolean };
}

// The string argument is for debugging only — it appears in error messages
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
```

```typescript
// app.config.ts — provide the value
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_CONFIG,
      useValue: {
        apiUrl: 'https://api.myapp.com',
        featureFlags: { darkMode: true, betaFeatures: false },
      },
    },
  ],
};
```

```typescript
// any.component.ts — inject it with the token, not a class name
readonly config = inject(APP_CONFIG); // fully typed as AppConfig
readonly apiUrl = this.config.apiUrl;
```

---

## Slide 18: APP_INITIALIZER — Running Code Before Bootstrap

`APP_INITIALIZER` is a built-in injection token that lets you run async code **before** the Angular app fully bootstraps — before any component renders. You'll see it constantly in production codebases for loading remote config, checking auth state, or pre-fetching lookup data.

```typescript
// app.config.ts
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { ConfigService } from './config.service';

function initializeApp(configService: ConfigService): () => Promise<void> {
  // Return a factory function — Angular calls it and WAITS for the Promise to resolve
  return () => configService.loadConfig(); // fetches config from /api/config before anything renders
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], // dependencies to inject into the factory
      multi: true,           // multiple APP_INITIALIZER providers can coexist
    },
  ],
};
```

- Angular awaits the returned Promise before rendering any component
- `multi: true` is required — `APP_INITIALIZER` is a multi-provider token; removing it replaces all other initializers instead of adding yours
- If the Promise rejects, the app fails to bootstrap — always handle errors

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| Pre-bootstrap async setup | `APP_INITIALIZER` in `app.config.ts` | `APP_INITIALIZER` in `AppModule.providers` (same API, different location) |

---

## Slide 19: afterRender / afterNextRender

Two lifecycle functions (Angular 17+) for DOM work that needs to happen after rendering. They're safer alternatives to `ngAfterViewInit` — especially for SSR, where accessing browser APIs in `ngAfterViewInit` can crash the server.

Angular determines which environment it's in using the same `PLATFORM_ID` token you'll see in the SSR slides — `afterNextRender` and `afterRender` check it internally and automatically skip execution on the server.

```typescript
import { Component, afterRender, afterNextRender, ElementRef, inject } from '@angular/core';

@Component({ standalone: true, ... })
export class ChartComponent {
  private readonly el = inject(ElementRef);

  constructor() {
    // afterNextRender — runs ONCE after the NEXT render cycle completes
    // Use for: one-time DOM setup, measuring elements, initializing third-party libraries
    // Automatically skipped on the server — safe for SSR
    afterNextRender(() => {
      const width = this.el.nativeElement.offsetWidth; // safe — DOM exists here
      this.initChart(width);
    });

    // afterRender — runs after EVERY render cycle
    // Use when: you need to react to DOM changes on each update
    afterRender(() => {
      this.resizeChart();
    });
  }
}
```

**Why prefer these over `ngAfterViewInit` for DOM work:**
- They're functions, not interface implementations — no class ceremony
- Automatically browser-only — won't crash your SSR server
- `ngAfterViewInit` runs in both environments and requires manual platform checks if it touches any browser API

---

## Slide 20: NgOptimizedImage

`NgOptimizedImage` is Angular's built-in image directive. Swap `src` for `ngSrc` and you automatically get lazy loading, layout shift prevention, and priority loading hints — for free.

```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  template: `...`,
})
export class RecipeCardComponent {}
```

```html
<!-- Use ngSrc instead of src — that's the only required change -->
<!-- width and height are REQUIRED — Angular uses them to prevent layout shift (CLS) -->
<img ngSrc="/images/recipe.jpg"
     width="400"
     height="300"
     alt="Chicken tikka masala" />

<!-- priority — for above-the-fold images that must load immediately -->
<!-- Skips lazy loading and adds a <link rel="preload"> to the document head -->
<img ngSrc="/images/hero.jpg"
     width="1200"
     height="600"
     priority
     alt="Hero banner" />
```

- Without `priority`, all images lazy-load automatically
- `width` and `height` are required — they prevent cumulative layout shift (CLS), a Core Web Vitals metric
- Works with image CDNs (Cloudinary, imgix) via a one-line loader config in `app.config.ts`

---

## Slide 21: @let — Template Local Variables

`@let` (Angular 18+) declares a local variable inside a template. It replaces the old `*ngIf="expr as name"` workaround with a clean, explicit syntax that doesn't have side effects.

`@let` variables are **block-scoped** — a variable declared inside an `@if` or `@for` block is not accessible outside it. This works the same way as `const` in JavaScript.

```html
<!--  Modern — @let declares a typed local variable in the current block scope -->
@let fullName = user().firstName + ' ' + user().lastName;
@let total    = price() * quantity();

<h2>{{ fullName }}</h2>
<p>{{ total | currency }}</p>

@if (user().isAdmin) {
  @let adminLabel = 'Admin: ' + fullName; <!-- scoped to this @if block only -->
  <span>{{ adminLabel }}</span>
}
<!-- adminLabel is NOT accessible here — out of scope -->
```

```html
<!--  Legacy — *ngIf "as" hack: only works if the value is truthy -->
<ng-container *ngIf="user().firstName + ' ' + user().lastName as fullName">
  <h2>{{ fullName }}</h2>
  <!-- If fullName were an empty string or 0, this block would be hidden entirely -->
</ng-container>
```

`@let` variables are recalculated on every change detection cycle and can reference signals, method calls, or any template expression.

---

## Slide 22: ReplaySubject vs BehaviorSubject

You know `BehaviorSubject` — it holds one current value and replays it to any new subscriber. `ReplaySubject` replays the last **N** emissions to new subscribers — not just the most recent one — and doesn't require an initial value.

```typescript
import { ReplaySubject, BehaviorSubject } from 'rxjs';

// BehaviorSubject — requires an initial value
// Late subscribers always get exactly the current value
const b$ = new BehaviorSubject<string>('initial');
b$.next('a');
b$.next('b');
// New subscriber receives: 'b'   ← only the current value

// ReplaySubject — no initial value needed
// Buffers the last N emissions and replays them all to new subscribers
const r$ = new ReplaySubject<string>(3); // buffer the last 3 values
r$.next('a');
r$.next('b');
r$.next('c');
r$.next('d');
// New subscriber receives: 'b', 'c', 'd'   ← last 3 in order
```

**Decision rule:**
- `BehaviorSubject` — for current state any subscriber should start from: user profile, cart contents, auth status
- `ReplaySubject` — for streams where context matters: notification history, activity feeds, audit logs where "just the latest" isn't enough

---

## Slide 23: mergeMap vs switchMap

`switchMap` cancels the previous inner Observable when a new outer value arrives. `mergeMap` doesn't cancel — it lets every inner Observable run to completion, regardless of new emissions. Getting this choice wrong causes either lost data or stale responses.

```typescript
// switchMap — cancels stale requests when a new value arrives
// RIGHT for search — you only care about the result for the current term
searchTerm$.pipe(
  switchMap(term => this.http.get(`/api/search?q=${term}`))
  // User types 'a', 'an', 'ang' — only the request for 'ang' completes
)

// mergeMap — all inner Observables run concurrently, none are cancelled
// RIGHT for file uploads — you want EVERY file to finish uploading
filesToUpload$.pipe(
  mergeMap(file => this.uploadService.upload(file))
  // Each file upload runs independently — none cancels the others
)
```

| Operator | Cancels previous? | Best for |
|---|---|---|
| `switchMap` | Yes — only latest | Search, autocomplete, navigation after user action |
| `mergeMap` | No — all concurrent | File uploads, fire-and-forget events |
| `concatMap` | No — queues them | Sequential operations, ordered writes |
| `exhaustMap` | Ignores new while busy | Login button, form submission (ignore re-clicks) |

---

## Slide 24: withLatestFrom, distinctUntilChanged, startWith, scan

Four operators you'll encounter constantly in production pipelines.

```typescript
// withLatestFrom — on each emission from the source, grab the latest value
// from a SECOND stream without subscribing to it as a trigger
buttonClick$.pipe(
  withLatestFrom(this.currentUser$),       // "what user was logged in when this button was clicked?"
  map(([click, user]) => ({ userId: user.id }))
)

// distinctUntilChanged — skip emission if the value is the same as the previous
searchTerm$.pipe(
  distinctUntilChanged()  // 'ng', 'ng', 'ngx' → emits 'ng', 'ngx' (skips duplicate 'ng')
)

// startWith — emit an initial value immediately before the source emits anything
// Useful for giving a template an immediate value to render while waiting for data
data$.pipe(
  startWith([]) // template renders with [] right away, then with real data when it arrives
)

// scan — like Array.reduce() but for streams; accumulates state over time
// Each emission builds on the previous accumulated value
action$.pipe(
  scan((accumulated, newAction) => [...accumulated, newAction], [] as Action[])
  // emits a growing array: [a1], [a1, a2], [a1, a2, a3]...
)
```

---

## Slide 25: Advanced Interceptors — Retry and Caching

Interceptors aren't just for auth headers. Two production patterns: automatic retry on server failures, and in-memory response caching.

```typescript
// retry.interceptor.ts — retry failed requests up to 3 times with exponential backoff
import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timer, throwError } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    retry({
      count: 3,
      delay: (error, attempt) =>
        error.status >= 500              // only retry server errors (5xx)
          ? timer(attempt * 1000)        // wait 1s, 2s, 3s before each retry
          : throwError(() => error),     // don't retry client errors (4xx) — they won't improve
    })
  );
```

```typescript
// cache.interceptor.ts — return cached responses for repeated GET requests
const cache = new Map<string, HttpResponse<unknown>>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') return next(req);  // only cache GET — never cache mutations

  const cached = cache.get(req.url);
  if (cached) return of(cached);               // return the cached response immediately

  return next(req).pipe(
    tap(res => {
      if (res instanceof HttpResponse) cache.set(req.url, res); // store on first fetch
    })
  );
};
```

---

## Slide 26: ResolveFn — Route Resolvers

A resolver preloads data **before** the component renders. Angular waits for the resolver to complete, then activates the component with the data already available — eliminating the "flash of empty content" you get when a component renders before its HTTP call returns.

**The UX tradeoff:** the user stays on the current page with no visual feedback while the resolver is running. For fast APIs this is seamless. For slow APIs it can make navigation feel sluggish. Use a resolver when data must be present before render. Use in-component loading state when you want navigation to feel instant and can show a skeleton or spinner.

```typescript
// recipe.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

export const recipeResolver: ResolveFn<Recipe> = (route) => {
  const id = route.paramMap.get('id')!; // route snapshot — one-time read; resolver always runs fresh
  return inject(RecipeService).getById(id); // return an Observable or Promise — Angular awaits it
};
```

```typescript
// app.routes.ts
{
  path: 'recipes/:id',
  component: RecipeDetailComponent,
  resolve: { recipe: recipeResolver }, // 'recipe' is the key the component reads
}
```

```typescript
// recipe-detail.component.ts — with withComponentInputBinding(), resolved data arrives as an input
readonly recipe = input<Recipe>(); // Angular injects the resolved value automatically
```

#### ⟳ Legacy vs. Modern
| | Modern | Legacy |
|---|---|---|
| Resolver | `ResolveFn<T>` — plain function | Class implementing `Resolve<T>` interface |

---

## Slide 27: canMatch — Conditional Route Matching

`canActivate` blocks a user from entering a route but the route still matches. `canMatch` is more fundamental — it controls whether a route is **considered** during matching at all. If `canMatch` returns false, Angular skips that route entirely and tries the next one in the array.

This enables a powerful pattern: two routes with the **same path** serving different components based on a condition.

```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canMatch: [adminGuard], // if adminGuard returns false, Angular skips this route
                            // and tries the NEXT route in the array that also matches 'dashboard'
  },
  {
    path: 'dashboard',      // same path — Angular falls through to this when canMatch above returns false
    component: UserDashboardComponent,
    // No canMatch here — always matches as the fallback
  },
];
```

```typescript
// admin.guard.ts
import { CanMatchFn } from '@angular/router';

export const adminGuard: CanMatchFn = () =>
  inject(AuthService).hasRole('admin');
  // true  → AdminDashboardComponent loads
  // false → Angular skips this route, tries the next 'dashboard' route → UserDashboardComponent loads
```

Use `canMatch` when two routes share a path but should serve different components based on a condition. Use `canActivate` when you want to block access and stay on the same route config entry.

---

## Slide 28: ActivatedRouteSnapshot vs ActivatedRoute

Both provide access to route parameters, query params, and data. The difference is whether you need a one-time read or reactive updates that fire while the component stays alive.

```typescript
// ActivatedRouteSnapshot — a frozen snapshot of the route at a single point in time
// Does NOT update if params change while the component is alive
// Good for: resolvers, guards, components recreated on every navigation

export const recipeResolver: ResolveFn<Recipe> = (route) => {
  const id = route.paramMap.get('id'); // snapshot — correct here; resolver always runs fresh
  return inject(RecipeService).getById(id!);
};
```

```typescript
// ActivatedRoute — a live, reactive Observable-based service
// DOES emit new values when params change while the component stays alive
// Good for: components that persist while route params change (pagination, tabs, detail views)

@Component({ standalone: true, ... })
export class RecipeDetailComponent {
  private readonly route = inject(ActivatedRoute);

  // paramMap is an Observable — emits a new value each time :id changes
  // even if Angular keeps the same component instance alive (same route, new param)
  readonly id$ = this.route.paramMap.pipe(map(p => p.get('id')));
}
```

> **With `withComponentInputBinding()`** this distinction mostly disappears — signal inputs are already reactive and update automatically. But guards and resolvers always use the snapshot, and you'll see both forms in existing codebases.

---

## Slide 29: When Services Aren't Enough

A service with a `BehaviorSubject` or `signal()` handles state well in small-to-medium apps. At a certain scale, that breaks down.

Signs you're outgrowing simple service state:

- Multiple services depend on each other's state, creating circular reference risks
- Async side effects (HTTP calls triggered by state changes) are scattered across many files
- You need time-travel debugging or the ability to replay state for bug reproduction
- Multiple developers are colliding in the same service file
- State transitions must be auditable — fintech, healthcare, compliance applications

At this point two structured options: `@ngrx/signals` for a signal-native container, or NgRx for the full Redux pattern.

---

## Slide 30: signalStore() from @ngrx/signals

`signalStore()` is a structured, signal-native state container. It keeps state, computed values, and methods together in one place — without the full complexity of NgRx.

```typescript
// recipe.store.ts
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
// patchState — the function used to update store state immutably; imported from @ngrx/signals

export const RecipeStore = signalStore(
  { providedIn: 'root' },

  withState({                            // define the initial state shape
    recipes: [] as Recipe[],
    loading: false,
    selectedId: null as string | null,
  }),

  withComputed(({ recipes, selectedId }) => ({
    // computed signals derived from state — same computed() you already know
    selectedRecipe: computed(() => recipes().find(r => r.id === selectedId())),
    totalCount:     computed(() => recipes().length),
  })),

  withMethods((store) => ({
    async loadAll(): Promise<void> {
      patchState(store, { loading: true });                      // partial state update
      const recipes = await inject(RecipeService).getAll();
      patchState(store, { recipes, loading: false });
    },
  })),
);
```

```typescript
// In any component — inject the store directly
readonly store = inject(RecipeStore);
// store.recipes(), store.loading(), store.selectedRecipe() — all signals
```

---

## Slide 31: NgRx — The Big Picture

NgRx is the full Redux pattern for Angular. Every state change goes through a strict pipeline: actions are dispatched, reducers produce new state, selectors compute derived values, and effects handle async work. Nothing mutates state directly.

```
User clicks "Add to Cart"
        ↓
  Dispatch Action      { type: '[Cart] Add Item', item: product }
                       — a plain object describing what happened
        ↓
  Reducer runs         pure function: (currentState, action) → newState
                       — never mutates; always returns a new object
        ↓
  State updates        immutable — old state is preserved in history
        ↓
  Selectors compute    derived values from state (like computed())
                       — memoized; only recalculate when their slice changes
        ↓
  Components update    subscribe to selectors — re-render when their slice changes
        ↓
  Effects handle       an Effect listens for a specific action, does async work
  async side effects   (an HTTP call, for example), then dispatches a new action
                       — either '[Cart] Add Item Success' or '[Cart] Add Item Failure'
                       — the reducer handles those actions to finalize state
```

Every state change is logged, replayable, and debuggable via Redux DevTools. **Reach for NgRx when:** the team is large, state changes must be audited, or async side effects need a structured home.

---

## Slide 32: Server-Side Rendering — What and Why

By default, Angular runs entirely in the browser — the server sends an empty `index.html` and JavaScript builds the UI. SSR means Angular runs on the **server first**, generates complete HTML, and sends it to the browser so content appears instantly.

```
Client-Side Rendering (default):
  Browser → empty index.html → downloads main.js → runs Angular → renders UI
  First paint: slow (JS must download and execute first)

Server-Side Rendering (SSR):
  Browser → server runs Angular → sends complete HTML → browser displays instantly
         → downloads JS in background → Angular "hydrates" (attaches event handlers)
  First paint: fast

Static Site Generation (SSG / prerender):
  At BUILD time → Angular renders HTML for each route → deployed as static files
  First paint: fastest (CDN-served static HTML, no server computation)
  Use when: content doesn't change often (marketing pages, docs, blogs)
  Enable in angular.json: "prerender": { "routesFile": "routes.txt" }
```

**Why SSR matters:** Search engines index actual HTML content — not JavaScript that renders later. Core Web Vitals (LCP, FID, CLS) improve dramatically. Users on slow devices see content before JS executes.

---

## Slide 33: Setting Up SSR — ng add @angular/ssr

Angular's SSR support is built-in — one command to add it.

```bash
ng add @angular/ssr          # add SSR to an existing project
ng new my-app --ssr          # new project with SSR from the start
```

What gets added:

```
src/app/
  app.config.ts              ← unchanged (client config)
  app.config.server.ts       ← NEW: server-side providers merged with client config
  main.server.ts             ← NEW: server entry point
server.ts                    ← NEW: Express server that handles SSR requests
```

```typescript
// app.config.server.ts — merges with app.config.ts; adds server-only providers
import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

export const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [
    provideServerRendering(), // tells Angular it's running in Node.js, not a browser
  ],
});
```

---

## Slide 34: provideClientHydration()

After the server sends HTML to the browser, Angular needs to **hydrate** it — attach event listeners and wire up change detection without destroying and re-rendering the existing DOM. `provideClientHydration()` enables this.

Without hydration, Angular throws away the server-rendered HTML and re-renders everything from scratch — causing a visible flash of blank content and wasting the SSR work entirely.

```typescript
// app.config.ts
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(
      // withEventReplay (Angular 19+): captures user clicks and keystrokes that happen
      // DURING hydration and replays them once Angular is ready — prevents lost interactions
      withEventReplay()
    ),
  ],
};
```

| Without hydration | With hydration |
|---|---|
| Server HTML discarded | Server HTML reused |
| Full client re-render | Angular attaches to existing DOM |
| Flash of blank content | No visible flash |
| SSR benefit mostly lost | Full SSR benefit realized |

---

## Slide 35: isPlatformBrowser() and Renderer2

Your Angular code runs in two environments with SSR: the browser and Node.js on the server. Browser APIs (`window`, `document`, `localStorage`, `navigator`) don't exist in Node.js. Calling them crashes SSR.

**`isPlatformBrowser()`** lets you guard platform-specific code. **`Renderer2`** is the safer alternative for DOM manipulation — it abstracts the DOM behind a platform-aware API that works in both environments without any guard needed.

```typescript
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({ standalone: true, ... })
export class LayoutComponent {
  private readonly platformId = inject(PLATFORM_ID); // injected token identifying the platform

  ngOnInit(): void {
    //  Crashes SSR — window doesn't exist in Node.js
    // const width = window.innerWidth;

    //  Guard with isPlatformBrowser before using any browser API
    if (isPlatformBrowser(this.platformId)) {
      const width = window.innerWidth; // safe — only runs in the browser
    }
  }
}
```

```typescript
// Renderer2 — safer for DOM manipulation; works in both browser and server
import { Renderer2 } from '@angular/core';

@Component({ standalone: true, ... })
export class TooltipComponent {
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);

  show(): void {
    // Renderer2 abstracts the DOM — no platform check needed
    this.renderer.addClass(this.el.nativeElement, 'visible');
    this.renderer.setStyle(this.el.nativeElement, 'top', '10px');
  }
}
```

> `afterNextRender()` is automatically skipped on the server and is the cleanest option when browser-only code is DOM-related.

---

## Slide 36: TransferState — Server-to-Client Data Handoff

Without `TransferState`, an SSR app fetches the same data twice: once on the server to render the HTML, and again in the browser during hydration when the component initializes. `TransferState` serializes the server-fetched data into the HTML payload so the browser can read it directly instead of re-fetching.

```typescript
import { inject } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/core';

// makeStateKey creates a typed key — the string is just an identifier
const RECIPES_KEY = makeStateKey<Recipe[]>('recipes');

@Component({ standalone: true, ... })
export class RecipeListComponent implements OnInit {
  private readonly transferState = inject(TransferState);
  private readonly http          = inject(HttpClient);
  readonly recipes = signal<Recipe[]>([]);

  ngOnInit(): void {
    if (this.transferState.hasKey(RECIPES_KEY)) {
      // Running in the BROWSER: data was embedded in the HTML by the server
      // Read it directly — no HTTP call needed
      this.recipes.set(this.transferState.get(RECIPES_KEY, []));
      this.transferState.remove(RECIPES_KEY); // clean up after reading
    } else {
      // Running on the SERVER (or browser without transferred data): fetch from API
      this.http.get<Recipe[]>('/api/recipes').subscribe(data => {
        this.transferState.set(RECIPES_KEY, data); // embed data in the HTML for the browser to pick up
        this.recipes.set(data);
      });
    }
  }
}
```

---

## Slide 37: ⚠️ SSR Common Gotchas

Five things that will break SSR if you're not expecting them.

```typescript
//  1. Direct browser API access — window/document/localStorage don't exist in Node.js
const stored = localStorage.getItem('token'); // ReferenceError: localStorage is not defined
//  Use isPlatformBrowser() guard, Renderer2, or afterNextRender()

//  2. setTimeout / setInterval without cleanup — Node.js keeps the process alive
setTimeout(() => this.refresh(), 5000); // SSR server process may never exit
//  Guard with isPlatformBrowser(), or use RxJS timer() with takeUntilDestroyed()

//  3. Relative URLs for HTTP calls made during SSR
this.http.get('/api/recipes') // works in browser (relative to origin)
// Crashes on server: Node.js is making a real HTTP call and has no base URL to resolve against
//  Use an absolute URL from environment config: this.http.get(`${env.apiUrl}/api/recipes`)

//  4. Third-party libraries that touch window or document on import
import 'some-charting-lib'; // may throw at module load time if it references window
//  Dynamic import inside isPlatformBrowser() block

//  5. Unguarded access to values that are null before data loads
//  Use @if to guard optional data in templates before rendering
```

---

## Slide 38: NgZone — What It Is and When You'll See It

Zone.js is the library Angular has historically used to detect when async operations complete and trigger change detection. It does this by **monkey-patching** browser APIs — wrapping `setTimeout`, `Promise`, `addEventListener`, and others so Angular knows when they fire.

`NgZone` is the Angular service that wraps zone.js behavior.

```typescript
import { NgZone, inject } from '@angular/core';

@Component({ standalone: true, ... })
export class MapComponent {
  private readonly ngZone = inject(NgZone);

  initThirdPartyMap(): void {
    // Problem: third-party libraries often run their callbacks outside Angular's zone
    // Angular doesn't detect these changes and the template doesn't update
    thirdPartyMap.on('click', (coords) => {
      //  This update may not trigger change detection
      this.selectedCoords = coords;
    });

    //  Wrap the callback in ngZone.run() to bring it back into Angular's awareness
    thirdPartyMap.on('click', (coords) => {
      this.ngZone.run(() => {
        this.selectedCoords = coords; // Angular now detects this change
      });
    });
  }
}
```

You'll see `ngZone.run()` in legacy codebases whenever a third-party library (maps, charting, WebSocket libraries) fires callbacks outside Angular. With signals and zoneless Angular, this problem largely disappears — signals notify Angular directly, no zone monitoring needed.

---

## Slide 39: ChangeDetectionStrategy.OnPush

In zone.js Angular, every async event (click, HTTP response, timer) causes Angular to check the **entire component tree** for changes. `OnPush` is an opt-in optimization that tells Angular: "only check this component when its `@Input` references change, an event fires inside it, or it calls `markForCheck()` explicitly."

```typescript
import { Component, ChangeDetectionStrategy, Input,
         ChangeDetectorRef, inject } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // opt in to smarter checking
  templateUrl: './recipe-card.component.html',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe; // OnPush watches for reference changes here

  private readonly cdr = inject(ChangeDetectorRef);

  onAsyncEvent(data: Recipe): void {
    this.recipe = data;
    this.cdr.markForCheck(); // tell Angular: "I changed, please check me on the next cycle"
    // Without this call, the template would NOT update even though recipe changed
  }
}
```

**With signals you don't need OnPush.** Signals notify Angular of exactly which DOM nodes changed — no whole-tree checking, no `markForCheck()`. You'll see `OnPush` constantly in existing codebases as a performance workaround that signals make unnecessary.

---

## Slide 40: OnPush — Modern vs Legacy Contrast

**Legacy — OnPush with manual change detection:**
```typescript
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  count = 0; // plain property — Angular won't detect changes without help

  increment(): void {
    this.count++;
    this.cdr.markForCheck(); // must be called manually — easy to forget; silent bug if missed
  }
}
```

**Modern — signals handle it automatically:**
```typescript
@Component() // no OnPush annotation needed — signals are inherently fine-grained
export class RecipeCardComponent {
  readonly recipe = input.required<Recipe>(); // signal input — Angular tracks reference changes
  readonly count  = signal(0);                // signal state — Angular tracks every .set() and .update()

  increment(): void {
    this.count.update(c => c + 1); // Angular knows exactly which DOM node to update
  }
}
```

---

## Slide 41: Zoneless Angular

Signals made zone.js unnecessary — Angular now knows exactly what changed and where without monitoring every Promise and event listener. Zoneless Angular removes zone.js entirely.

```typescript
// app.config.ts — Angular 21+ (stable and default in v21)
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZonelessChangeDetection(), // zone.js is no longer loaded or needed
  ],
};

// For Angular 18–20 — same concept, pre-stable API name
// (you'll see this in codebases doing early adoption before v21)
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
```

**What you gain:**
- Smaller bundle — zone.js is ~50KB you no longer ship
- Deterministic change detection — no surprise updates from unrelated async operations
- Faster tests — zone.js monkey-patching was a significant source of test flakiness
- Better SSR compatibility — zone.js had known issues with some server-side patterns

**Migration path for existing apps:** You can adopt signals incrementally in a zone.js app. Enable zoneless only when all mutable `@Input()` properties, plain component state, and `markForCheck()` calls have been replaced with signals. It's a gradual migration — you don't have to convert everything at once.

---

## Slide 42: Accessibility — ARIA in Angular Templates

Accessibility isn't a feature you add at the end. Angular doesn't add it automatically — you have to write it into your templates from the start.

```html
<!-- Semantic HTML first — use the right element before reaching for ARIA -->
<button (click)="submit()">Submit</button>     <!--  focusable, keyboard-operable, announced -->
<div (click)="submit()">Submit</div>           <!--  not focusable, not announced by screen readers -->

<!-- role="alert" — announces dynamic content to screen readers when it appears -->
<div role="alert">
  @if (errorMessage()) {
    {{ errorMessage() }}                        <!-- announced automatically when content changes -->
  }
</div>

<!-- aria-label — label interactive elements that have no visible text -->
<button (click)="closeModal()" aria-label="Close modal">
  <span class="icon-x"></span>                 <!-- icon-only button must have a text label -->
</button>

<!-- aria-describedby — associate an input with its error message -->
<input [attr.aria-describedby]="hasError() ? 'email-error' : null" />
@if (hasError()) {
  <p id="email-error">Invalid email address</p>
}
```

> **Angular CDK** provides `A11yModule` with focus trapping, live announcer, and keyboard navigation — covered in the ecosystem slide.

---

## Slide 43: Accessibility — Focus Management

Focus management is required for any UI that dynamically shows or hides content. When a modal opens, focus should move into it. When it closes, focus should return to what opened it.

```typescript
// modal.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div role="dialog"
         aria-modal="true"
         aria-labelledby="modal-title">
      <h2 id="modal-title">Confirm Delete</h2>
      <button #firstFocus>Cancel</button>
      <button>Delete</button>
    </div>
  `,
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('firstFocus') firstButton!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    // Move focus into the modal when it opens
    // Screen readers announce the dialog and its label automatically
    this.firstButton.nativeElement.focus();
  }
}
```

**Three rules for every interactive component:**
1. Every interactive element must be keyboard-reachable (`Tab`, `Enter`, `Space`, arrow keys)
2. Content that appears dynamically should receive focus or announce itself via `aria-live`
3. When a modal closes, focus must return to the element that opened it — otherwise the user is stranded

---

## Slide 44: Deployment — ng build, dist/, and Hosting

`ng build` compiles your app into static files. Everything lands in `dist/`.

```bash
ng build  # production build — optimized, minified, tree-shaken, hashed filenames
```

```
dist/your-app-name/browser/
  index.html        ← entry point (always served for any route)
  main-HASH.js      ← your app code  (hash changes when content changes → cache busting)
  chunk-HASH.js     ← lazy-loaded route chunks (one per loadComponent route)
  styles-HASH.css
  assets/
```

**Hosting options:**

| Platform | Best for | SPA config needed? |
|---|---|---|
| **Netlify** | CSR apps, fast deploys | Add `_redirects`: `/* /index.html 200` |
| **Vercel** | CSR + SSR, edge functions | Auto-detected |
| **Firebase Hosting** | CSR + SSR, Google ecosystem | `ng add @angular/fire` handles it |
| **GitHub Pages** | Static CSR only | Add `withHashLocation()` |
| **Nginx** | Self-hosted, full control | `try_files $uri /index.html` |
| **Node.js server** | SSR | Run `dist/server/server.mjs` |

The Nginx rewrite rule is the most important one to understand: without it, a user refreshing `/recipes/42` gets a 404 — the server doesn't know that route, Angular does.

---

## Slide 45: Code Coverage — ng test --code-coverage

```bash
ng test --code-coverage
# Report lands in: coverage/your-app-name/index.html — open in a browser
```

**The four metrics:**

| Metric | What it measures |
|---|---|
| **Statements** | Was each line of executable code reached? |
| **Branches** | Was each `if`/`else`/`ternary`/`switch` path taken? |
| **Functions** | Was each function called at all? |
| **Lines** | Similar to statements — executable lines hit |

**Branch coverage is the most valuable.** 100% statement coverage still leaves untested `else` branches. A guard function that returns early on error has two branches — both need tests.

```bash
# Enforce minimum thresholds — CI fails if coverage drops below these values
ng test --code-coverage \
  --coverage-thresholds='{"statements": 80, "branches": 70, "functions": 80}'
```

---

## Slide 46: The Angular UI Ecosystem — CDK and Material

**Angular CDK (Component Dev Kit)** is Angular's toolkit for building UI behavior without prescribing visual design. It's the unstyled foundation under Angular Material, and it's what you'd use to build a design system.

```typescript
import { A11yModule }    from '@angular/cdk/a11y';     // FocusTrap, LiveAnnouncer, FocusMonitor
import { DragDropModule } from '@angular/cdk/drag-drop'; // cdkDrag, cdkDropList
import { OverlayModule }  from '@angular/cdk/overlay';   // dropdown, tooltip, popover positioning
import { PortalModule }   from '@angular/cdk/portal';    // render content outside the component tree
```

**Angular Material** is Google's official component library built directly on the CDK. It follows Material Design guidelines and is the most widely-used Angular component library in production.

```bash
ng add @angular/material  # adds Material, CDK, and sets up theming
```

```html
<!-- Material components follow Angular patterns exactly -->
<mat-form-field>
  <mat-label>Recipe Name</mat-label>
  <input matInput [formControl]="nameControl" />
  <mat-error>Name is required</mat-error>
</mat-form-field>

<button mat-raised-button color="primary" (click)="save()">Save</button>
<mat-table [dataSource]="recipes()">...</mat-table>
```

Material integrates with reactive forms, signal inputs, accessibility, and CSS custom property theming. You'll encounter it in the majority of enterprise Angular applications.

---

## Slide 47: i18n — Internationalization

Angular has built-in i18n that compiles translations at build time — no runtime overhead. You mark strings in templates, extract them to a translation file, and `ng build` generates one optimized build per locale.

```html
<!-- Mark strings with the i18n attribute — the @@ prefix sets a stable ID -->
<h1 i18n="@@page.title">Recipe Browser</h1>
<p i18n>{{ recipeCount }} recipes found</p>
<button i18n="@@button.save">Save Recipe</button>
```

```bash
ng extract-i18n          # extracts all marked strings to messages.xlf (XLIFF format)
                         # send this file to translators
ng build --localize      # builds one complete app bundle per locale defined in angular.json
```

```json
// angular.json — register your locales
"i18n": {
  "sourceLocale": "en-US",
  "locales": {
    "es": "src/locale/messages.es.xlf",
    "fr": "src/locale/messages.fr.xlf"
  }
}
```

> `@ngx-translate` is a popular third-party alternative that loads translations at runtime instead of build time — useful when you need dynamic locale switching without a full page reload.

---

## Slide 48: PWA — Progressive Web Apps

A PWA makes your Angular app installable and capable of loading offline. `ng add @angular/pwa` handles all the scaffolding.

```bash
ng add @angular/pwa
# Adds: service worker, web manifest, icons, ngsw-config.json
```

**What you get:**

```json
// ngsw-config.json — configure what gets cached and how
{
  "assetGroups": [
    {
      "name": "app-shell",
      "installMode": "prefetch",    // cache immediately on first load
      "resources": { "files": ["/index.html", "/*.css", "/*.js"] }
    }
  ],
  "dataGroups": [
    {
      "name": "api-recipes",
      "urls": ["/api/recipes"],
      "cacheConfig": {
        "strategy": "freshness",    // try network first; fall back to cache if offline
        "maxAge": "1h"
      }
    }
  ]
}
```

**What the user gets:**
- Browser "install" prompt — app appears on home screen like a native app
- Loads offline — service worker serves cached assets when there's no network
- Faster repeat loads — assets are cached after the first visit

---

## Slide 49: Modern vs. Legacy Master Reference

A complete cheat sheet of every major modern/legacy pairing.

| Concept | Modern | Legacy |
|---|---|---|
| App bootstrap | `bootstrapApplication()` | `bootstrapModule(AppModule)` |
| Component registration | `imports: []` on component | `declarations: []` in NgModule |
| Component input | `input<T>()` — readonly signal | `@Input()` — mutable property |
| Required input | `input.required<T>()` | `@Input({ required: true })` |
| Component output | `output<T>()` | `@Output()` + `EventEmitter` |
| Two-way binding | `model<T>()` | `@Input()` + `@Output()` pair |
| Reacting to input changes | `computed()` / `effect()` | `ngOnChanges()` + `SimpleChanges` |
| DOM/child queries | `viewChild()` / `contentChild()` signals | `@ViewChild` / `@ContentChild` decorators |
| Host element property | `@HostBinding('prop')` | `Renderer2.setProperty()` |
| Host element event | `@HostListener('event')` | `Renderer2` + manual `addEventListener` |
| After view renders | `afterNextRender()` | `ngAfterViewInit()` |
| Template local var | `@let name = expr;` | `*ngIf="expr as name"` |
| Control flow | `@if`, `@for`, `@switch` | `*ngIf`, `*ngFor`, `*ngSwitch` |
| Deferred rendering | `@defer` with trigger | `ViewContainerRef` + dynamic import |
| Pre-bootstrap setup | `APP_INITIALIZER` in `app.config.ts` | `APP_INITIALIZER` in `AppModule.providers` |
| Service injection | `inject(MyService)` | Constructor parameter |
| Service scope | `providedIn: 'root'` | `NgModule.providers` |
| Non-class DI value | `InjectionToken` + `inject(TOKEN)` | `InjectionToken` + constructor injection |
| HTTP setup | `provideHttpClient()` | `HttpClientModule` |
| HTTP interceptors | `HttpInterceptorFn` function | Class implementing `HttpInterceptor` |
| Router setup | `provideRouter(routes)` | `RouterModule.forRoot(routes)` |
| Feature routes | Child route arrays | `RouterModule.forChild()` + feature module |
| Lazy loading | `loadComponent()` | `loadChildren()` + NgModule |
| Route params as inputs | `withComponentInputBinding()` | Inject `ActivatedRoute` manually |
| Route resolver | `ResolveFn<T>` function | Class implementing `Resolve<T>` |
| `canActivate` guard | Plain `CanActivateFn` function | Class implementing `CanActivate` |
| `canDeactivate` guard | `CanDeactivateFn<T>` function | Class implementing `CanDeactivate<T>` |
| `canMatch` guard | `CanMatchFn` function | Class implementing `CanMatch` |
| Programmatic navigation | `inject(Router).navigate()` | Constructor-injected `Router` |
| Zone awareness | `ngZone.run()` rarely needed | `NgZone.run()` for third-party callbacks |
| RxJS cleanup | `takeUntilDestroyed()` | `takeUntil()` + `ngOnDestroy` Subject |
| Observable in template | `toSignal(obs$, { initialValue })` | `async` pipe |
| Change detection | Signals / fine-grained | Zone.js + `OnPush` + `markForCheck()` |
| Zoneless | `provideZonelessChangeDetection()` | Not available |
| SSR setup | `provideServerRendering()` | `@nguniversal/express-engine` |
| Hydration | `provideClientHydration()` | Manual / not standardized |
| Component test setup | `imports: [MyComponent]` | `declarations: []` + all module deps |
| HTTP test setup | `provideHttpClientTesting()` | `HttpClientTestingModule` |
| Signal input testing | `fixture.componentRef.setInput()` | Direct property assignment |

---

## Slide 50: Key Takeaways

- **Signals keep expanding** — `linkedSignal()`, `resource()`, `viewChild()`, and `input.required()` are all signal-first APIs replacing older decorator and Observable patterns; learning them now puts you ahead of most Angular developers you'll work with
- **SSR is one command away** — `ng add @angular/ssr` sets up everything; the concepts to internalize are `isPlatformBrowser()` for platform-aware code, `Renderer2` for safe DOM manipulation, and `provideClientHydration()` to prevent re-rendering the server's HTML
- **Most legacy codebases use `@ViewChild`, `OnPush`, `NgZone`, `APP_INITIALIZER`, constructor injection, class-based guards, and NgModule** — you now know what all of these are, why they exist, and what they map to in modern Angular
- **The ecosystem is deep but not required all at once** — CDK and Material for UI, `@ngrx/signals` or NgRx when a service isn't enough, `@defer` for template-level lazy loading, PWA and i18n when the project needs them; add these as you encounter them
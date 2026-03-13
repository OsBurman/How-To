# Day 2 Part B — Signals

---

## Slide 1: Day 2 Part B — Signals

**Day 2 · Part B**

### Signals

By the end of this session, you will be able to manage reactive state with `signal()`, derive values with `computed()`, run side effects with `effect()`, and wire up parent-child communication using signal-based `input()`, `output()`, and `model()` — the foundation of Angular's future.

---

## Slide 2: What You'll Be Able to Do

- **Create** writable signals with `signal()` and update them with `.set()` and `.update()`
- **Derive** read-only values with `computed()` that recalculate only when their dependencies change
- **Run** side effects with `effect()` and return a cleanup function to prevent memory leaks
- **Replace** `@Input()` and `@Output()` with signal-based `input()`, `output()`, and `model()`
- **Explain** how signals enable fine-grained change detection — and why that matters for performance
- **Recognize** the legacy patterns signals replaced: `ngOnChanges`, plain getters, and `OnPush` with `markForCheck()`

---

## Slide 3: How Zone.js Works

Before signals, Angular used a library called **zone.js** to know when to update the screen. Zone.js works by patching every browser event — every click, keystroke, timer, and HTTP response.

- When any event fires, zone.js tells Angular: "something happened"
- Angular responds by running **change detection on the entire component tree** — from root to every leaf
- Every binding in every template gets re-evaluated to see if anything changed

Think of it like checking every room in a building every time someone knocks on the front door.

---

## Slide 4: Why Zone.js Is a Problem

Zone.js doesn't know **what** changed — it only knows **something** happened. So Angular has to check everything, every time.

- A button click in the footer triggers change detection in the header, sidebar, and every child component
- Getters used in templates (`get total()`) run on **every** change detection cycle — even if their data hasn't changed
- As the app grows, this wasted work adds up: more components = slower re-renders
- Performance degrades invisibly — there's no error, things just get sluggish

---

## Slide 5: What Signals Change

Signals flip the model. Instead of Angular asking "did anything change?" after every event, **signals tell Angular exactly what changed**.

- A signal notifies Angular when its value updates
- Angular knows which DOM nodes read that signal
- Only those specific nodes re-render — everything else is untouched
- No more checking the entire tree — updates are **surgical**

This is the core idea behind everything you'll learn today.

---

## Slide 6: What Is a Signal?

A **signal** is a reactive container that holds a value and notifies Angular whenever that value changes. You create it with `signal()`, read it by calling it as a function, and write to it with `.set()` or `.update()`.

**Key facts:**

- Imported from `@angular/core` — not a third-party library
- Reading a signal always requires parentheses: `count()` in TypeScript, `{{ count() }}` in templates
- Signals are **synchronous** — no Observables, no subscriptions
- Angular tracks which template expressions depend on which signals automatically

---

## Slide 7: Creating and Reading a Signal

Create a signal with an initial value. Read it by calling it like a function — parentheses are required.

```typescript
import { signal } from '@angular/core';

// Create a signal with initial value 0
readonly count = signal(0);

// Read the current value — returns 0
console.log(this.count());
```

In templates, the same rule applies — parentheses:

```html
<p>Count: {{ count() }}</p>
```

If you forget the parentheses, you'll see `[Signal]` instead of the value. This is the most common beginner mistake.

---

## Slide 8: Updating with .set()

`.set()` replaces the signal's value entirely. Use it when you know the exact new value.

```typescript
readonly count = signal(0);

// Replace the value with 5
this.count.set(5);

// Replace with a completely different value
this.count.set(100);
```

**When to use `.set()`:** You have the new value directly — a form input, a hardcoded reset, a value from an API response.

---

## Slide 9: Updating with .update()

`.update()` takes a callback that receives the current value and returns the new value. Use it when the new value depends on the old one.

```typescript
readonly count = signal(0);

// Increment: current value → current value + 1
this.count.update(current => current + 1);

// Double: current value → current value * 2
this.count.update(current => current * 2);
```

**When to use `.update()`:** The new value is derived from the current value — incrementing, toggling, appending to an array.

---

## Slide 10: signal() in a Component

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**counter.component.ts**

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  // Create a writable signal with initial value 0
  readonly count = signal(0);

  increment(): void {
    this.count.update(c => c + 1);  // derive from current
  }

  reset(): void {
    this.count.set(0);  // replace entirely
  }
}
```

**counter.component.html**

```html
<!-- Read the signal with parentheses -->
<p>Count: {{ count() }}</p>

<button (click)="increment()">+1</button>
<button (click)="reset()">Reset</button>
```

---

## Slide 11: What Is computed()?

`computed()` creates a **read-only signal** whose value is automatically derived from one or more other signals. It recalculates only when at least one of its dependency signals changes, and caches the result otherwise.

**Key facts:**

- Imported from `@angular/core` alongside `signal`
- Read it with parentheses, same as `signal()`: `this.total()`
- You **cannot** call `.set()` or `.update()` on a computed signal — it's strictly read-only
- Angular tracks dependencies automatically — you don't declare them

---

## Slide 12: How computed() Works

`computed()` takes a callback function. Inside that callback, every signal you **read** becomes a dependency.

- When any dependency changes, the computed value is marked **stale**
- The next time something reads the computed signal, it recalculates
- If no dependency has changed, it returns the **cached** value instantly — zero work

This is what makes `computed()` better than a plain getter. A getter runs on every change detection cycle. A computed signal only recalculates when it actually needs to.

---

## Slide 13: computed() — Code Example

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**cart.component.ts**

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  readonly price = signal(29.99);
  readonly quantity = signal(2);

  // Automatically recalculates when price or quantity changes
  readonly total = computed(() => this.price() * this.quantity());
  readonly label = computed(() =>
    this.quantity() === 1 ? '1 item' : `${this.quantity()} items`
  );
}
```

**cart.component.html**

```html
<p>{{ label() }} — ${{ total().toFixed(2) }}</p>
```

---

## Slide 14: ⚠️ WARNING — computed() Is Read-Only

You **cannot** write to a computed signal. Calling `.set()` or `.update()` on a computed signal is a compile-time error.

```typescript
readonly total = computed(() => this.price() * this.quantity());

// ❌ ERROR — computed signals are read-only
this.total.set(100);
this.total.update(t => t + 10);
```

**If you need to write to it, it's not a computed — it's a signal.**

Ask yourself: "Does this value come from other signals?" → `computed()`. "Do I need to set it directly?" → `signal()`.

---

## Slide 15: What Is effect()?

`effect()` registers a **side-effect function** that runs automatically whenever any signal it reads changes. Use it for work that needs to happen *outside* the template — logging, saving to local storage, or interacting with non-Angular APIs.

**Key facts:**

- Imported from `@angular/core`
- Runs once initially, then re-runs whenever a dependency signal changes
- Must be created in an **injection context** — inside a component field initializer or constructor
- Should **not** be used to set other signals (use `computed()` for that)

---

## Slide 16: When to Use effect()

`effect()` is for **side effects** — work that interacts with the outside world, not template rendering.

**Good uses:**
- Logging signal changes to the console
- Saving a value to `localStorage`
- Calling a non-Angular API when data changes
- Starting a debounced timer

**Bad uses (use computed() instead):**
- Calculating a derived value from other signals
- Setting another signal's value inside the effect

Rule of thumb: if the result shows up in the template, use `computed()`. If it talks to the outside world, use `effect()`.

---

## Slide 17: effect() — Code Example

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.css'
})
export class LoggerComponent {
  readonly searchTerm = signal('');

  // Runs once immediately, then re-runs when searchTerm changes
  private readonly logEffect = effect(() => {
    console.log('User searched for:', this.searchTerm());
  });

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }
}
```

Angular automatically tracks that this effect depends on `searchTerm`. When `searchTerm` changes, the effect re-runs.

---

## Slide 18: The Cleanup Function

`effect()` can return a **cleanup function** that runs *before* the next execution and when the component is destroyed. This prevents resource leaks — open timers, pending requests, manual subscriptions.

**The pattern:** return a function from your effect callback.

```typescript
private readonly autoSave = effect(() => {
  const data = this.formData();  // dependency

  const timerId = window.setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(data));
  }, 1000);

  // Cleanup: cancel the pending timer before the next run
  return () => {
    window.clearTimeout(timerId);
  };
});
```

Every time `formData` changes, the previous timer is cleared before a new one starts.

---

## Slide 19: effect() with Cleanup — Full Example

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  readonly query = signal('');

  private readonly debounceEffect = effect(() => {
    const currentQuery = this.query();  // track dependency

    // Start a debounced operation
    const timerId = window.setTimeout(() => {
      console.log('Searching for:', currentQuery);
    }, 300);

    // Cleanup: cancel previous timeout when query changes again
    return () => window.clearTimeout(timerId);
  });

  onInput(value: string): void {
    this.query.set(value);
  }
}
```

---

## Slide 20: ⚠️ WARNING — Forgetting Cleanup

If your effect creates a timer, subscription, or any resource — and you don't return a cleanup function — **you have a memory leak**.

```typescript
// ❌ BAD — timer is never cancelled
private readonly broken = effect(() => {
  const data = this.formData();
  window.setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(data));
  }, 1000);
  // No cleanup! Every signal change adds another timer.
});

// ✅ GOOD — previous timer cancelled on each re-run
private readonly working = effect(() => {
  const data = this.formData();
  const id = window.setTimeout(() => {
    localStorage.setItem('draft', JSON.stringify(data));
  }, 1000);
  return () => window.clearTimeout(id);
});
```

**Rule: If you open it, close it. Always return a cleanup function.**

---

## Slide 21: What Is input()?

`input()` is the signal-based replacement for the `@Input()` decorator. It creates a **readonly signal** whose value is controlled by the parent component. The child reads the value by calling it as a function — just like any other signal.

**Key facts:**

- Imported from `@angular/core`
- Always `readonly` — the child component **cannot** call `.set()` or `.update()` on it
- The parent owns the value and passes it via property binding: `[name]="value"`
- Works with `computed()` and `effect()` — just like any signal

---

## Slide 22: input() — Code Example

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**greeting.component.ts**

```typescript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  // Signal-based input — readonly, parent-controlled
  readonly name = input<string>('Guest');

  // Works seamlessly with computed()
  readonly message = computed(() =>
    `Hello, ${this.name()}!`
  );
}
```

**Parent template:**

```html
<!-- Parent passes value via property binding -->
<app-greeting [name]="userName" />
```

**greeting.component.html**

```html
<h2>{{ message() }}</h2>
```

---

## Slide 23: ⚠️ WARNING — input() Is Always Readonly

You **cannot** modify an `input()` signal from inside the child component. The parent owns the value.

```typescript
readonly name = input<string>('Guest');

// ❌ COMPILE ERROR — input signals are readonly
this.name.set('New Name');

// ❌ COMPILE ERROR — cannot update either
this.name.update(n => n.toUpperCase());
```

**If the child needs to change a shared value, use `model()` instead** — that's two-way binding, covered in a few slides.

Think of it this way: the parent gives you the value. You cannot change something your parent gave you.

---

## Slide 24: Required vs Optional Inputs

By default, `input()` signals are optional — you provide a default value. Use `input.required()` when the parent **must** provide a value.

```typescript
// Optional — has a default value
readonly label = input<string>('Untitled');

// Required — parent MUST provide a value
readonly userId = input.required<number>();
```

If a parent uses a component with a required input and doesn't bind to it, Angular gives a **compile-time error** — not a silent runtime bug.

```html
<!-- ❌ ERROR: Required input 'userId' is not provided -->
<app-profile />

<!-- ✅ Works — required input is provided -->
<app-profile [userId]="42" />
```

---

## Slide 25: What Is output()?

`output()` is the signal-based replacement for the `@Output()` decorator and `EventEmitter`. It creates a typed event emitter that the child uses to send data up to the parent.

**Key facts:**

- Imported from `@angular/core`
- Call `.emit(value)` to fire the event — same as `EventEmitter`
- The parent listens with event binding: `(eventName)="handler($event)"`
- No `new EventEmitter()` boilerplate — `output()` handles it

---

## Slide 26: output() — Code Example

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**color-picker.component.ts**

```typescript
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css'
})
export class ColorPickerComponent {
  // Signal-based output — no new EventEmitter() needed
  readonly colorSelected = output<string>();

  pick(color: string): void {
    this.colorSelected.emit(color);  // send data to parent
  }
}
```

**Parent template:**

```html
<!-- Parent listens with event binding -->
<app-color-picker (colorSelected)="onColorPicked($event)" />
```

**color-picker.component.html**

```html
<button (click)="pick('red')">Red</button>
<button (click)="pick('blue')">Blue</button>
<button (click)="pick('green')">Green</button>
```

---

## Slide 27: What Is model()?

`model()` creates a **two-way signal binding** between a parent and child component. The parent and child share the same value — either side can read it and write to it. It replaces the old `@Input()` + `@Output()` pair pattern for two-way data flow.

**Key facts:**

- Imported from `@angular/core`
- The child can call `.set()` and `.update()` — unlike `input()`, this is writable
- The parent uses banana-in-a-box syntax: `[(value)]="parentSignal"`
- One line replaces what used to take an `@Input()`, an `@Output()`, and an `EventEmitter`

---

## Slide 28: How model() Replaces the Old Pattern

**The old way** — two-way binding required three pieces in the child and careful naming in the parent:

- `@Input() value: number` — receives the value
- `@Output() valueChange = new EventEmitter<number>()` — the name **must** be `inputName` + `Change`
- Parent uses `[(value)]="data"` — which was shorthand for `[value]="data" (valueChange)="data = $event"`

**The model() way** — one line does all of it:

```typescript
readonly value = model<number>(0);
```

The child reads with `this.value()`, writes with `this.value.set(newVal)`, and the parent sees the change instantly.

---

## Slide 29: model() — Code Example

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**rating.component.ts**

```typescript
import { Component, input, output, model, computed }
  from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  readonly maxStars = input<number>(5);     // readonly config
  readonly rating = model<number>(1);       // two-way value
  readonly confirmed = output<number>();    // one-way event

  readonly stars = computed(() =>
    Array.from({ length: this.maxStars() }, (_, i) => i + 1)
  );

  select(star: number): void {
    this.rating.set(star);  // updates parent too
  }

  confirm(): void {
    this.confirmed.emit(this.rating());
  }
}
```

**Parent template:**

```html
<!-- Two-way binding with banana-in-a-box -->
<app-rating
  [(rating)]="userRating"
  [maxStars]="10"
  (confirmed)="onConfirmed($event)" />

<p>Current: {{ userRating() }}</p>
```

---

## Slide 30: model() Template Syntax

The parent uses **banana-in-a-box** syntax `[( )]` to bind to a `model()` signal:

```html
<!-- [(rating)] is shorthand for: -->
<!-- [rating]="userRating" (ratingChange)="userRating.set($event)" -->
<app-rating [(rating)]="userRating" />
```

**The parent must pass a writable signal** — not a plain property:

```typescript
// ✅ Parent component — writable signal
readonly userRating = signal(3);
```

When the child calls `this.rating.set(5)`, the parent's `userRating` signal updates to `5` automatically.

---

## Slide 31: input() vs model() vs output() — Quick Comparison

| | `input()` | `model()` | `output()` |
|---|---|---|---|
| **Direction** | Parent → Child | Parent ↔ Child | Child → Parent |
| **Child can write?** | ❌ No — readonly | ✅ Yes — `.set()` / `.update()` | N/A — `.emit()` only |
| **Parent syntax** | `[name]="value"` | `[(name)]="signal"` | `(name)="handler($event)"` |
| **Use case** | Configuration, display data | Shared editable state | Notifications, events |

**Rule of thumb:**
- Parent sends, child reads → `input()`
- Both sides edit the same value → `model()`
- Child sends an event up → `output()`

---

## Slide 32: Fine-Grained Change Detection

With signals, Angular knows exactly **which DOM nodes** depend on **which signals**. When a signal changes, only the expressions that read that signal are re-evaluated — not the entire component tree.

- Signal A changes → only DOM nodes that read Signal A update
- Signal B is unchanged → its DOM nodes are untouched
- No other component is checked unless it also reads Signal A

This is called **fine-grained reactivity**, and it's the fundamental shift from zone.js "check everything" to signals "update only what changed."

---

## Slide 33: Zone.js vs Signals — Side by Side

**Zone.js (the old model):**

1. User clicks a button
2. Zone.js intercepts the click
3. Angular checks **every component** from root to leaves
4. Every getter and binding in every template is re-evaluated
5. DOM updates wherever values differ

**Signals (the new model):**

1. User clicks a button
2. Button handler calls `count.set(count() + 1)`
3. Angular knows `count` changed
4. **Only** the `{{ count() }}` text node updates
5. Nothing else is checked

Same click, dramatically less work.

---

## Slide 34: Zoneless Angular — The Payoff

**Zoneless mode is stable in Angular v21+.** Signals are what made this possible.

- Zone.js is no longer required — Angular can rely entirely on signals to know what changed
- Apps start faster (no zone.js monkey-patching of browser APIs)
- Change detection is faster (no tree walks)
- Debugging is simpler (no zone.js stack traces)

**What this means for you:** Everything you just learned — `signal()`, `computed()`, `effect()`, `input()`, `output()`, `model()` — is not just a nicer API. It's the foundation that Angular's entire future is built on. You're learning the right patterns from day one.

---

## Slide 35: Coming Up — Modern vs Classic (Legacy) Angular

You've just learned modern Angular's signal-based patterns for component state, derived values, side effects, and parent-child communication.

Now let's see how the same things were done **before Angular 17** using the classic (legacy) approach. **Modern Angular is what you should write.** Classic is shown for recognition only — so you can read it when you encounter older codebases.

---

## Slide 36: Modern — Signal-Based input()

**Reinforcement — the pattern you just learned:**

```typescript
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  // Readonly signal — parent owns this value
  readonly name = input<string>('Guest');

  // Works with computed() automatically
  readonly upper = computed(() => this.name().toUpperCase());
}
```

The `input()` is a signal. You read it with `this.name()`. You can pass it to `computed()` and `effect()`. Angular tracks dependencies automatically.

---

## Slide 37: Legacy — @Input() Mutable Property

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  // No standalone — declared in NgModule
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']  // plural array
})
export class GreetingComponent {
  // Mutable — nothing stops the child from overwriting it
  @Input() name: string = 'Guest';
}
```

**The pain:**

- Nothing prevents the child from writing `this.name = 'Hacked'` — the parent doesn't know
- Angular can't track when the input is read in the template — no reactive dependency graph
- To react to changes, you needed `ngOnChanges()` — a separate lifecycle hook with its own complexity

---

## Slide 38: Modern output() vs Legacy @Output()

**Modern — `output()`:**

```typescript
readonly colorSelected = output<string>();

pick(color: string): void {
  this.colorSelected.emit(color);
}
```

**Legacy — `@Output()` + `EventEmitter`:**

```typescript
import { Output, EventEmitter } from '@angular/core';

@Output() colorSelected = new EventEmitter<string>();

pick(color: string): void {
  this.colorSelected.emit(color);
}
```

**The pain:** Two imports (`Output`, `EventEmitter`), explicit instantiation with `new EventEmitter<T>()`, and the property was mutable — you could accidentally overwrite the emitter.

---

## Slide 39: Modern model() vs Legacy @Input/@Output Pair

**Modern — one line with `model()`:**

```typescript
readonly rating = model<number>(1);
// Child reads: this.rating()
// Child writes: this.rating.set(5)
// Parent binds: [(rating)]="userRating"
```

**Legacy — three pieces required:**

```typescript
@Input() rating: number = 1;
@Output() ratingChange = new EventEmitter<number>();

select(star: number): void {
  this.rating = star;
  this.ratingChange.emit(star);  // must manually emit!
}
```

**The pain:** The output **must** be named `propertyName` + `Change` (e.g., `ratingChange`) or the banana-in-a-box syntax silently breaks. Forget to call `.emit()` → parent never updates. Two declarations for one concept.

---

## Slide 40: Modern — Reacting with computed() and effect()

**Reinforcement — deriving values and running side effects from signal inputs:**

```typescript
readonly price = input.required<number>();
readonly quantity = input<number>(1);

// Derived value — recalculates only when price or quantity changes
readonly total = computed(() => this.price() * this.quantity());

// Side effect — logs when total crosses a threshold
private readonly alertEffect = effect(() => {
  if (this.total() > 1000) {
    console.log('Large order:', this.total());
  }
});
```

No lifecycle hooks. No manual change tracking. Dependencies are automatic.

---

## Slide 41: Legacy — ngOnChanges(SimpleChanges)

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export class OrderComponent implements OnChanges {
  @Input() price: number = 0;
  @Input() quantity: number = 1;
  total: number = 0;  // manually maintained

  ngOnChanges(changes: SimpleChanges): void {
    // Must check each input individually
    if (changes['price'] || changes['quantity']) {
      this.total = this.price * this.quantity;  // manual recalculation
      if (this.total > 1000) {
        console.log('Large order:', this.total);  // side effect mixed in
      }
    }
  }
}
```

**The pain:**

- Must check `changes['inputName']` for each property — easy to miss one
- Derived values and side effects both crammed into one lifecycle hook
- `SimpleChanges` uses string keys — no type safety, no autocomplete
- Only fires when input **references** change — mutating an object skips it silently

---

## Slide 42: Modern — computed() for Derived State

**Reinforcement:**

```typescript
readonly items = signal<CartItem[]>([]);

// Derived — recalculates only when items changes
readonly total = computed(() =>
  this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
);

readonly isEmpty = computed(() => this.items().length === 0);
```

`computed()` is lazy (only runs when read), cached (returns stored value if nothing changed), and tracked (Angular knows which DOM nodes depend on it).

---

## Slide 43: Legacy — Getters and ChangeDetectorRef

```typescript
export class CartComponent {
  items: CartItem[] = [];

  // Getter — runs on EVERY change detection cycle
  get total(): number {
    return this.items.reduce((sum, item) =>
      sum + item.price * item.qty, 0
    );
  }

  get isEmpty(): boolean {
    return this.items.length === 0;
  }
}
```

**The pain:**

- Getters run on **every** change detection cycle — even if `items` hasn't changed
- No caching — the `reduce()` runs every time Angular checks this component
- With `OnPush` change detection, you needed `ChangeDetectorRef.markForCheck()` to force updates — more boilerplate, more bugs

---

## Slide 44: Modern — effect() with Cleanup

**Reinforcement:**

```typescript
private readonly persistEffect = effect(() => {
  const items = this.cartItems();  // dependency

  const timerId = window.setTimeout(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, 500);

  // Cleanup runs before next execution AND on destroy
  return () => window.clearTimeout(timerId);
});
```

One function. Dependency tracking is automatic. Cleanup is co-located with the code that needs it. No lifecycle hooks.

---

## Slide 45: Legacy — Scattered Cleanup Across Hooks

```typescript
export class CartComponent implements OnChanges, OnDestroy {
  @Input() cartItems: CartItem[] = [];
  private timerId: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartItems']) {
      // Must manually clear previous timer
      if (this.timerId !== null) {
        window.clearTimeout(this.timerId);
      }
      // Start new debounced save
      this.timerId = window.setTimeout(() => {
        localStorage.setItem('cart',
          JSON.stringify(this.cartItems));
      }, 500);
    }
  }

  ngOnDestroy(): void {
    // Must also clean up here — easy to forget
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
    }
  }
}
```

**The pain:** Cleanup logic is scattered across `ngOnChanges` and `ngOnDestroy`. The timer state must be tracked as a class property. Forget either cleanup location → memory leak.

---

## Slide 46: Modern Signals vs Legacy Zone.js — Change Detection

**Modern (signals):**

```typescript
readonly count = signal(0);
readonly doubled = computed(() => this.count() * 2);
```

When `count` changes → only `{{ count() }}` and `{{ doubled() }}` update. The rest of the page is untouched.

**Legacy (zone.js):**

```typescript
count = 0;
get doubled(): number { return this.count * 2; }
```

When *any* event fires → Angular checks *every* component. The `doubled` getter runs whether `count` changed or not. In a tree of 200 components, that's 200 unnecessary checks.

**Signals don't just change syntax — they change the performance model.**

---

## Slide 47: Modern Signals vs Legacy OnPush + markForCheck()

**Modern — signals handle optimization automatically:**

```typescript
readonly items = signal<Item[]>([]);
readonly total = computed(() => /* ... */);
// That's it. Angular knows what to update.
```

**Legacy — manual optimization with OnPush:**

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  updateItems(newItems: Item[]): void {
    this.items = newItems;
    this.cdr.markForCheck();  // must manually tell Angular
  }
}
```

**The pain:**

- `OnPush` skips change detection *unless* you explicitly call `markForCheck()`
- Forget it → component shows stale data with no error
- Every service call, every timer, every async result needs `markForCheck()` or the UI doesn't update
- Signals eliminate this entire problem — updates are tracked, not requested

---

## Slide 48: Key Takeaways

**`signal()` is a reactive value container, `computed()` derives from it, and `effect()` runs side effects.** These three primitives replace getters, `ngOnChanges`, and manual change tracking. `computed()` is read-only and cached. `effect()` must return a cleanup function when it creates resources.

**`input()`, `output()`, and `model()` replace `@Input()`, `@Output()`, and the `@Input/@Output` pair.** `input()` is readonly — the parent owns it. `model()` is writable — both sides share it. `output()` emits events up. All three work seamlessly with `computed()` and `effect()`.

**Signals enable fine-grained change detection.** Instead of zone.js checking every component on every event, Angular tracks which DOM nodes depend on which signals and updates only those nodes. This is faster, simpler, and requires no manual optimization like `OnPush` or `markForCheck()`.

**Zoneless Angular (stable in v21+) is the payoff.** Everything you learned today — signals, computed, effect, input, output, model — is what made it possible to remove zone.js entirely. You're learning the patterns that define Angular's future.

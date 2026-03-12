# Day 1 Part B — Templates, Data Binding & Component Communication

---

## Slide 1: Day 1 Part B — Templates, Data Binding & Component Communication

**Day 1 Part B**

### Templates, Data Binding & Component Communication

By the end of this session, you will be able to wire up interactive Angular templates using all four types of data binding, pass data between parent and child components with @Input() and @Output(), and manage component lifecycle with ngOnInit and ngOnDestroy.

---

## Slide 2: What You'll Be Able to Do

- **Use** all four Angular data binding types — interpolation, property binding, event binding, and two-way binding
- **Create** template reference variables to read DOM element values without two-way binding
- **Apply** safe navigation (`?.`) and nullish coalescing (`??`) to handle null and undefined data safely
- **Pass** data from parent to child with `@Input()` and from child to parent with `@Output()` and `EventEmitter`
- **Explain** why `ngOnInit` is the correct place for initialization logic instead of the constructor
- **Prevent** memory leaks by cleaning up timers and subscriptions in `ngOnDestroy`

---

## Slide 3: What Is Interpolation?

**Interpolation** is Angular's simplest data binding — you wrap a TypeScript expression in double curly braces `{{ }}` and Angular replaces it with the evaluated result as text in your HTML.

```html
<h1>Hello, {{ userName }}</h1>
```

**Key facts:**

- Read-only — data flows one direction: component → template
- The result is always converted to a **string**
- Works between HTML tags and inside attribute values

---

## Slide 4: Interpolation Examples

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**app.component.ts**

```typescript
export class AppComponent {
  userName = 'Angela';
  itemCount = 3;
  unitPrice = 9.99;

  getGreeting(): string {
    return `Welcome back, ${this.userName}!`;
  }
}
```

**app.component.html**

```html
<!-- Simple property -->
<h1>Hello, {{ userName }}</h1>

<!-- Math expression -->
<p>Total: ${{ itemCount * unitPrice }}</p>

<!-- Method call -->
<p>{{ getGreeting() }}</p>

<!-- Ternary -->
<p>{{ itemCount > 0 ? 'Ready to check out' : 'Cart is empty' }}</p>
```

---

## Slide 5: What Is Property Binding?

**Property binding** sets a DOM element's property to a value from your component using square brackets: `[property]="expression"`.

```html
<button [disabled]="isSubmitDisabled">Submit</button>
```

**Key facts:**

- Preserves the data type — a boolean stays a boolean, a number stays a number
- The target inside `[ ]` is a **DOM property**, not an HTML attribute
- Data flows one direction: component → template (same as interpolation)

---

## Slide 6: Interpolation vs Property Binding — When to Use Which

**Use interpolation `{{ }}` when:**

- Displaying text content between HTML tags
- Showing a value inline with other text: `Hello, {{ name }}!`

**Use property binding `[prop]` when:**

- Setting a non-string property (boolean, number, object)
- Binding to `[disabled]`, `[hidden]`, `[src]`, etc.

**Rule of thumb:** Between tags → `{{ }}`. Setting an element property → `[prop]`.

---

## Slide 7: Property Binding Examples

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**app.component.ts**

```typescript
export class AppComponent {
  isFormValid = false;
  profileImageUrl = 'https://example.com/avatar.png';
  isSecretVisible = false;
  highlightClass = 'text-primary';
}
```

**app.component.html**

```html
<!-- Boolean binding -->
<button [disabled]="!isFormValid">Submit</button>

<!-- String binding -->
<img [src]="profileImageUrl" alt="Profile photo">

<!-- Boolean binding -->
<p [hidden]="!isSecretVisible">Secret message</p>

<!-- String binding -->
<span [class]="highlightClass">Highlighted text</span>
```

---

## Slide 8: What Is Event Binding?

**Event binding** lets your template respond to user actions — clicks, keystrokes, form inputs. You wrap the event name in parentheses: `(event)="handler()"`. Data flows from the template **back** to the component.

```html
<button (click)="onSave()">Save</button>
```

**Key facts:**

- The opposite direction of interpolation and property binding
- The handler is a method on your component class
- Use `$event` to pass the native DOM event object (`MouseEvent`, `KeyboardEvent`, etc.)

---

## Slide 9: Event Binding Examples

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**app.component.ts**

```typescript
export class AppComponent {
  clickCount = 0;
  lastKey = '';
  searchTerm = '';

  onButtonClick(): void { this.clickCount++; }

  onKeyPressed(event: KeyboardEvent): void {
    this.lastKey = event.key;  // $event is a KeyboardEvent
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;  // $event is a generic Event
  }
}
```

**app.component.html**

```html
<!-- (click) — no $event needed -->
<button (click)="onButtonClick()">
  Clicked {{ clickCount }} times
</button>

<!-- (keyup) — $event is the KeyboardEvent -->
<input (keyup)="onKeyPressed($event)" placeholder="Press any key">
<p>Last key: {{ lastKey }}</p>

<!-- (input) — $event is the input Event -->
<input (input)="onSearchInput($event)" placeholder="Search...">
<p>Searching for: {{ searchTerm }}</p>
```

---

## Slide 10: What Is Two-Way Binding?

**Two-way binding** keeps a component property and a form input in perfect sync using `[(ngModel)]` — called **"banana in a box"** (parentheses inside square brackets).

```html
<input [(ngModel)]="userName">
```

**How it works under the hood:**

- `[ngModel]="userName"` — sets the input from the property (property binding direction)
- `(ngModelChange)="userName = $event"` — updates the property from the input (event binding direction)
- `[(ngModel)]` is shorthand for both combined

---

## Slide 11: What Is FormsModule?

`ngModel` is a **directive** that lives inside Angular's `FormsModule`. Without importing it in your standalone component, Angular doesn't know what `ngModel` means.

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],  // ← Required for [(ngModel)]
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  query = '';
}
```

Each standalone component that uses `[(ngModel)]` must import `FormsModule` individually.

---

## Slide 12: ⚠️ WARNING — FormsModule Silent Failure

If you forget to import `FormsModule`, there is **no error message**. Your `[(ngModel)]` just silently does nothing — the input renders, you can type in it, but the component property never updates.

**If your two-way binding isn't working, the first thing to check is: did you import FormsModule?**

This is the most common "why isn't my binding working?" moment for Angular beginners.

---

## Slide 13: Two-Way Binding in Action

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**message-editor.component.ts**

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-editor.component.html',
  styleUrl: './message-editor.component.css'
})
export class MessageEditorComponent {
  message = '';
}
```

**message-editor.component.html**

```html
<!-- Typing updates 'message'; changing 'message' updates the textarea -->
<textarea [(ngModel)]="message"
          placeholder="Type your message...">
</textarea>

<!-- Both update in real time, keystroke by keystroke -->
<p>Preview: {{ message }}</p>
<p>Character count: {{ message.length }}</p>
```

---

## Slide 14: What Is a Template Reference Variable?

A **template reference variable** gives you a direct handle to a DOM element right in the template. Add `#name` to any element and use that name elsewhere in the same template.

```html
<input #myInput type="text">
<button (click)="doSomething(myInput.value)">Go</button>
```

**What you can do with a ref:**

- Read the element's value: `myInput.value`
- Pass it to an event handler at the moment of a click
- Wire two sibling elements together without `[(ngModel)]`
- The ref is only available in the template — not in the TypeScript class

---

## Slide 15: Using a Ref to Read Input Values

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**search.component.ts**

```typescript
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  onSearch(term: string): void {
    console.log('Searching for:', term);
  }
}
```

**search.component.html**

```html
<!-- #searchBox creates a reference to this input element -->
<input #searchBox type="text" placeholder="Search...">

<!-- Button reads searchBox.value at the moment of the click -->
<button (click)="onSearch(searchBox.value)">Search</button>

<!-- Displays the current value (updates on change detection) -->
<p>Current input: "{{ searchBox.value }}"</p>
```

No `FormsModule` needed — just grab the value at the moment you need it.

---

## Slide 16: Refs vs Two-Way Binding — When to Use Which

**Use `[(ngModel)]` when:**

- You need the value updating on **every keystroke** in real time
- Building a live preview, character counter, or search-as-you-type
- You need to programmatically clear the input in code

**Use `#ref` when:**

- You only need the value at a **specific moment** (e.g., a button click)
- You want to skip importing `FormsModule` for something simple

**Summary:** `[(ngModel)]` = constant sync. `#ref` = on-demand access.

---

## Slide 17: What Is Safe Navigation?

The **safe navigation operator** `?.` lets you access nested properties on objects that might be `null` or `undefined` without crashing your app.

```html
<!-- CRASHES if user is null -->
<p>{{ user.address.city }}</p>

<!-- Safe — returns blank if user is null -->
<p>{{ user?.address?.city }}</p>
```

**Key facts:**

- `?.` checks each step — if anything is null, it stops and returns `undefined`
- Angular renders `undefined` as an empty string (blank, no crash)
- You'll use this constantly on Day 3 when fetching API data that starts as `null`

---

## Slide 18: Safe Navigation Example

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**profile.component.ts**

```typescript
export class ProfileComponent {
  currentUser: User | null = {
    name: 'Angela',
    address: { city: 'Portland', state: 'OR' }
    // street is undefined
  };

  guestUser: User | null = null;
}
```

**profile.component.html**

```html
<!-- currentUser exists — passes through safely -->
<p>Name: {{ currentUser?.name }}</p>
<!-- "Angela" -->

<p>City: {{ currentUser?.address?.city }}</p>
<!-- "Portland" -->

<p>Street: {{ currentUser?.address?.street }}</p>
<!-- "" (undefined renders blank) -->

<!-- guestUser is null — short-circuits immediately -->
<p>Guest: {{ guestUser?.name }}</p>
<!-- "" (blank, no crash) -->
```

---

## Slide 19: What Is Nullish Coalescing?

The **nullish coalescing operator** `??` provides a fallback value when an expression is `null` or `undefined` — and only then.

```html
<p>{{ user?.name ?? 'Guest' }}</p>
```

**`??` vs `||` — why `??` is safer:**

```html
<!-- || triggers on 0, '', and false too — often wrong -->
<p>{{ itemCount || 'No items' }}</p>  <!-- Shows 'No items' when count is 0! -->

<!-- ?? only triggers on null/undefined — correct -->
<p>{{ itemCount ?? 'No items' }}</p>  <!-- Shows 0 correctly -->
```

---

## Slide 20: Combining ?. and ??

Navigate safely with `?.`, then show a meaningful fallback with `??` instead of blank space.

```html
<!-- ?. alone — renders blank if null -->
<p>{{ user?.address?.city }}</p>

<!-- Combined — renders a helpful fallback -->
<p>{{ user?.address?.city ?? 'Unknown city' }}</p>
```

**Real-world pattern — a complete user display:**

```html
<h2>{{ user?.name ?? 'Anonymous' }}</h2>
<p>{{ user?.email ?? 'No email on file' }}</p>
<p>{{ user?.address?.city ?? 'Location unknown' }}</p>
```

This pattern appears in almost every Angular template that works with API data.

---

## Slide 21: What Is @Input()?

`@Input()` is a decorator that marks a component property as **receivable from a parent component**. The parent sends data down to the child using property binding.

```typescript
// Child
@Input() name: string = '';
```

```html
<!-- Parent template -->
<app-greeting [name]="currentUser"></app-greeting>
```

**Key facts:**

- One-way data pipeline: parent → child only
- When the parent's value changes, Angular updates the child automatically
- The child cannot send data back through the same `@Input()`

---

## Slide 22: @Input() Example

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**parent — app.component.ts**

```typescript
export class AppComponent {
  currentUser = 'Angela';
  currentAge = 28;
}
```

**child — greeting.component.ts**

```typescript
export class GreetingComponent {
  @Input() name: string = '';
  @Input() age: number = 0;
}
```

**parent — app.component.html**

```html
<!-- Square brackets = TypeScript expression -->
<app-greeting [name]="currentUser" [age]="currentAge">
</app-greeting>

<!-- No brackets = literal string value -->
<app-greeting name="Guest" [age]="0"></app-greeting>
```

**child — greeting.component.html**

```html
<p>Hello, {{ name }}! You are {{ age }} years old.</p>
```

---

## Slide 23: @Input() Data Flows One Direction Only

```
┌─────────────┐    [name]="currentUser"    ┌──────────────────┐
│   Parent     │ ─────────────────────────→ │   Child          │
│ AppComponent │    data flows DOWN         │ GreetingComponent │
│              │                            │                  │
│ currentUser  │    ← NO reverse flow       │  @Input() name   │
└─────────────┘                             └──────────────────┘
```

If a child could change the parent's data, bugs would be hard to track — data could change from anywhere. One-way means: if something changed, the parent changed it.

**"What if the child needs to tell the parent something?"** → That's `@Output()`, coming next.

---

## Slide 24: What Is @Output()?

`@Output()` lets a child component **send events up to its parent**. The child doesn't modify the parent's data — it emits an event, and the parent decides what to do.

```typescript
@Output() countChanged = new EventEmitter<number>();
```

**How it works:**

1. Child creates an `EventEmitter` typed with the payload: `EventEmitter<number>`
2. Child emits a value: `this.countChanged.emit(this.count)`
3. Parent listens with event binding: `(countChanged)="onCountChanged($event)"`
4. `$event` contains whatever was passed to `.emit()`

---

## Slide 25: @Output() Example

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**child — counter.component.ts**

```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  count = 0;
  @Output() countChanged = new EventEmitter<number>();

  increment(): void {
    this.count++;
    this.countChanged.emit(this.count);
  }
}
```

**child — counter.component.html**

```html
<button (click)="increment()">Count: {{ count }}</button>
```

**parent — app.component.html**

```html
<app-counter (countChanged)="onCountChanged($event)">
</app-counter>
<p>Parent received: {{ latestCount }}</p>
```

---

## Slide 26: The Complete Parent-Child Pattern

```
┌─────────────────┐                           ┌───────────────────┐
│     Parent       │   [price]="29.99"         │     Child         │
│  AppComponent    │ ──────────────────────→   │ ProductComponent  │
│                  │   @Input() data DOWN       │                   │
│                  │                           │                   │
│  onAddToCart()   │   (addToCart)="handler()"  │  @Output() event  │
│    ←─────────────│ ←─────────────────────── │  .emit() UP       │
└─────────────────┘                           └───────────────────┘
```

- `[prop]="value"` → data flows **down** via `@Input()`
- `(event)="handler($event)"` → events flow **up** via `@Output()`
- The parent owns the data; the child requests changes by emitting events

---

## Slide 27: Angular Component Lifecycle

A **lifecycle hook** is a method Angular calls automatically at a specific stage in a component's life. You never call these methods yourself — Angular calls them for you.

| Hook | When Angular calls it |
|---|---|
| `ngOnChanges` | When an `@Input()` value changes |
| **`ngOnInit`** | **Once, after inputs are set and ready** |
| `ngDoCheck` | On every change detection cycle |
| `ngAfterContentInit` | Once, after projected content is initialized |
| `ngAfterViewInit` | Once, after the view is fully rendered |
| **`ngOnDestroy`** | **Once, just before the component is removed** |

**For most components, you'll only use two:** `ngOnInit` and `ngOnDestroy`.

---

## Slide 28: What Is ngOnInit?

`ngOnInit` is the lifecycle hook Angular calls **once, right after it sets the component's @Input() values for the first time**. It is the correct place for initialization logic that depends on input data.

**Key facts:**

- Implement `OnInit` and define `ngOnInit(): void`
- Runs **once** — not on every change detection cycle
- `@Input()` values are set and ready to use — unlike the constructor
- Use it for: deriving display properties, triggering initial data fetches, processing inputs

---

## Slide 29: Why Not the Constructor?

The constructor runs **before** Angular sets `@Input()` values. If you initialize there, inputs will still be at their defaults.

```
1. constructor() runs
   → @Input() are still at defaults ('' and 0)

2. Angular sets @Input() values from parent
   → name is now 'TypeScript Handbook', price is now 29.99

3. ngOnInit() runs
   → NOW it is safe to use this.name and this.price
```

**Constructor → inputs not ready. ngOnInit → inputs ready.**

---

## Slide 30: ⚠️ WARNING — Constructor Initialization Mistake

**❌ WRONG — constructor runs too early:**

```typescript
constructor() {
  // BUG: this.name is '' and this.price is 0 here!
  this.displayLabel = `${this.name} — $${this.price.toFixed(2)}`;
  // Result: " — $0.00"
}
```

**✅ CORRECT — ngOnInit runs after inputs are set:**

```typescript
ngOnInit(): void {
  this.displayLabel = `${this.name} — $${this.price.toFixed(2)}`;
  // Result: "TypeScript Handbook — $29.99" ✓
}
```

---

## Slide 31: ngOnInit Example

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**product-card.component.ts**

```typescript
export class ProductCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() inStock: boolean = true;

  displayLabel: string = '';
  statusBadge: string = '';

  ngOnInit(): void {
    this.displayLabel =
      `${this.name} — $${this.price.toFixed(2)}`;
    this.statusBadge =
      this.inStock ? '✅ In Stock' : '❌ Sold Out';
  }
}
```

**product-card.component.html**

```html
<div class="card">
  <h3>{{ displayLabel }}</h3>
  <span>{{ statusBadge }}</span>
</div>
```

---

## Slide 32: What Is ngOnDestroy?

`ngOnDestroy` is the lifecycle hook Angular calls **once, right before it removes a component from the DOM**. Use it to clean up anything the component started.

**When a component is destroyed:**

- User navigates to a different page
- An `@if` condition removes it from the template
- The parent component is destroyed

**What to clean up:**

- Timers from `setInterval()` / `setTimeout()`
- Subscriptions to observables (Day 3)
- Manually added event listeners

If you skip cleanup, these keep running in memory — that's a **memory leak**.

---

## Slide 33: Memory Leak Example

```typescript
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    // Runs FOREVER — even after this component is removed
    setInterval(() => {
      console.log('Still running...');
    }, 1000);
  }
  // No ngOnDestroy → no cleanup → memory leak!
}
```

User navigates away → component destroyed → interval keeps running. Come back → a second interval starts. Repeat 10 times → 10 intervals running simultaneously, consuming memory and CPU.

---

## Slide 34: ngOnDestroy Example — Clearing an Interval

```typescript
export class DashboardComponent implements OnInit, OnDestroy {
  private timerId: number | null = null;
  refreshCount = 0;

  ngOnInit(): void {
    this.timerId = window.setInterval(() => {
      this.refreshCount++;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
```

**The pattern:** Start in `ngOnInit`. Clean up in `ngOnDestroy`. Always store the resource handle so you can cancel it.

---

## Slide 35: Signals — First Look

🟠 **Day 2 Preview** — Exercises do not require signals yet.

A **signal** is a reactive value container. When you update a signal, anything that reads it automatically knows the value changed.

```typescript
import { signal } from '@angular/core';

const count = signal(0);  // create with initial value

count();          // READ — call it like a function → 0
count.set(5);     // WRITE — replace the value → 5
count.update(c => c + 1);  // WRITE — transform the value → 6
```

In templates: `{{ count() }}` — you must include the **parentheses**.

---

## Slide 36: computed() — Derived Signals

🟠 **Day 2 Preview**

`computed()` creates a **derived value** that recalculates automatically whenever its source signal changes. It returns a read-only signal.

```typescript
import { signal, computed } from '@angular/core';

const count = signal(0);
const doubled = computed(() => count() * 2);

count.set(3);
console.log(doubled());  // 6  ← recalculated automatically

count.set(10);
console.log(doubled());  // 20 ← recalculated again
```

Full coverage on Day 2. For now, just get comfortable with the syntax.

---

## Slide 37: Signals in a Component

🟠 **Day 2 Preview** — for reference only.

> 📐 **Two-Column Layout — TypeScript (left) | Template (right)**

**signal-demo.component.ts**

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [],
  templateUrl: './signal-demo.component.html',
  styleUrl: './signal-demo.component.css'
})
export class SignalDemoComponent {
  readonly count = signal(0);
  readonly doubled = computed(() => this.count() * 2);

  increment(): void { this.count.update(c => c + 1); }
  reset(): void { this.count.set(0); }
}
```

**signal-demo.component.html**

```html
<p>Count: {{ count() }}</p>
<p>Doubled: {{ doubled() }}</p>
<button (click)="increment()">+1</button>
<button (click)="reset()">Reset</button>
```

---

## Slide 38: Coming Up — Modern vs Classic (Legacy) Angular

You've just learned the modern Angular way — standalone components, direct imports, FormsModule in the component that uses it, and clean parent-child data flow.

Now let's see how the same things were done **before Angular 17** using the classic (legacy) approach. **Modern Angular is what you should write.** Classic is shown here for recognition only — so you can read it when you encounter it in older code.

---

## Slide 39: Modern ngModel vs Legacy ngModel

**Modern — FormsModule imported directly in the component:**

```typescript
@Component({
  standalone: true,
  imports: [FormsModule],  // ← visible right here
})
export class CharacterCounterComponent { message = ''; }
```

**Legacy — FormsModule buried in a separate NgModule:**

```typescript
@NgModule({
  declarations: [AppComponent, CharacterCounterComponent],
  imports: [BrowserModule, FormsModule],  // ← invisible from the component
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**The pain:** Can't tell from the component file that it depends on FormsModule. Remove it from the module → `[(ngModel)]` silently breaks.

---

## Slide 40: Modern @Input() vs Legacy @Input()

**Modern — parent imports the child directly:**

```typescript
@Component({
  standalone: true,
  imports: [GreetingComponent],  // ← explicit
})
export class AppComponent { userName = 'Angela'; }
```

**Legacy — components registered in an NgModule:**

```typescript
@NgModule({
  declarations: [AppComponent, GreetingComponent],  // ← must be here
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**The pain:** Can't tell from `app.component.ts` which children it uses. `declarations` grew to dozens of components in large apps.

---

## Slide 41: Modern @Output() vs Legacy @Output()

**@Output() and EventEmitter syntax is identical in modern and legacy.** The only difference is component registration.

| | Modern | Legacy |
|---|---|---|
| `@Output()` code | Same | Same |
| `EventEmitter` | Same | Same |
| Component decorator | `standalone: true` | No standalone flag |
| Style file key | `styleUrl` (singular) | `styleUrls` (plural array) |
| Registration | `imports` on parent | `declarations` in NgModule |

In legacy, if a child component was in a *different* module, you had to export it there and import that entire module here — multiple files to edit just to use one component.

---

## Slide 42: Legacy Lifecycle Hooks

**Lifecycle hooks work identically in modern and legacy.** The `OnInit` and `OnDestroy` interfaces, method names, and timing are the same.

**Legacy component setup looks like this:**

```typescript
// Legacy — no standalone: true, styleUrls plural
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']  // ← plural array
})
export class TimerComponent implements OnInit, OnDestroy {
  ngOnInit(): void { /* same */ }
  ngOnDestroy(): void { /* same */ }
}
```

The code *inside* `ngOnInit()` and `ngOnDestroy()` is unchanged between modern and legacy.

---

## Slide 43: Binding Syntax Cheat Sheet

| Type | Syntax | Direction | Example |
|---|---|---|---|
| **Interpolation** | `{{ expression }}` | Component → Template | `{{ userName }}` |
| **Property Binding** | `[property]="expr"` | Component → Template | `[disabled]="!isValid"` |
| **Event Binding** | `(event)="handler()"` | Template → Component | `(click)="onSave()"` |
| **Two-Way** | `[(ngModel)]="prop"` | Both directions | `[(ngModel)]="searchTerm"` |

**Quick rules:**

- Between tags? → `{{ }}`
- Setting a property? → `[prop]`
- Reacting to action? → `(event)`
- Input sync? → `[(ngModel)]` + import `FormsModule`

---

## Slide 44: Key Takeaways

1. **Angular has four binding types, each with a clear direction:** `{{ }}` and `[prop]` send data to the template. `(event)` sends actions back. `[(ngModel)]` does both — but requires `FormsModule`.

2. **@Input() sends data down, @Output() sends events up:** Parents use `[prop]="value"` to pass data and `(event)="handler($event)"` to listen. Data flow is always explicit and one-directional per channel.

3. **Use ngOnInit for initialization, ngOnDestroy for cleanup:** The constructor runs too early — before inputs are set. Always clean up timers and subscriptions in `ngOnDestroy()` to prevent memory leaks.

4. **Safe navigation `?.` and nullish coalescing `??` protect against null:** Use `?.` to safely navigate nested properties. Combine with `??` for helpful fallback values. You'll use this pair constantly starting on Day 3.

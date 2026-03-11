# Day 1 Part B — Templates, Data Binding & Component Communication

---

## Slide 1: Day 1 Part B — Templates, Data Binding & Component Communication

**Day 1 Part B**

### Templates, Data Binding & Component Communication

By the end of this session, you will be able to wire up interactive Angular templates using all four types of data binding, pass data between parent and child components with @Input() and @Output(), and manage component lifecycle with ngOnInit and ngOnDestroy.

---

## Slide 2: What You'll Be Able to Do

- **Use** all four Angular data binding types — interpolation, property binding, event binding, and two-way binding — in templates
- **Create** template reference variables to read DOM element values without two-way binding
- **Apply** safe navigation (`?.`) and nullish coalescing (`??`) to handle null and undefined data safely
- **Pass** data from parent to child with `@Input()` and from child to parent with `@Output()` and `EventEmitter`
- **Explain** why `ngOnInit` is the correct place for initialization logic instead of the constructor
- **Prevent** memory leaks by cleaning up timers and subscriptions in `ngOnDestroy`

---

## Slide 3: What Is Interpolation?

Interpolation is the simplest way to display component data in the template. You wrap a TypeScript expression in double curly braces `{{ }}` and Angular replaces it with the evaluated result.

**How it works:**

1. You define a property in your component class (e.g., `pageTitle = 'My App'`)
2. In the template, you write `{{ pageTitle }}`
3. Angular evaluates the expression and renders the result as text in the HTML

**Key facts:**

- Interpolation is **read-only** — it displays data; it doesn't change it
- The expression is evaluated every time Angular runs change detection
- The result is always converted to a **string** for display
- Interpolation works between HTML tags and inside attribute values

Think of `{{ }}` as a one-way window: the template can look at component data, but it can't reach through and change it.

---

## Slide 4: Interpolation Examples

```typescript
// app.component.ts
export class AppComponent {
  userName = 'Angela';
  itemCount = 3;
  unitPrice = 9.99;

  getGreeting(): string {
    return `Welcome back, ${this.userName}!`;
  }
}
```

```html
<!-- app.component.html -->

<!-- Simple property -->
<h1>Hello, {{ userName }}</h1>

<!-- Number property -->
<p>You have {{ itemCount }} items in your cart.</p>

<!-- Expression — math inside {{ }} -->
<p>Total: ${{ itemCount * unitPrice }}</p>

<!-- Method call — Angular calls getGreeting() and displays the return value -->
<p>{{ getGreeting() }}</p>

<!-- Ternary expression — inline conditional -->
<p>{{ itemCount > 0 ? 'Ready to check out' : 'Your cart is empty' }}</p>
```

**What's happening:** Every `{{ }}` evaluates a TypeScript expression — it can be a property, a calculation, a method call, or even a ternary. Angular converts the result to a string and inserts it into the HTML.

---

## Slide 5: What Is Property Binding?

Property binding sets an **element property** (not an HTML attribute) to a value from your component. You use square brackets around the property name: `[property]="expression"`.

**How it works:**

1. You define a property in your component (e.g., `isSubmitDisabled = true`)
2. In the template, you write `[disabled]="isSubmitDisabled"`
3. Angular evaluates the expression and sets the DOM element's `disabled` property to `true`
4. When `isSubmitDisabled` changes, Angular automatically updates the DOM property

**Key facts:**

- The target inside `[ ]` is a **DOM property**, not an HTML attribute
- The right side `"expression"` is evaluated as TypeScript — it's not a plain string
- Data flows **one direction**: component → template (just like interpolation)
- Property binding can set booleans, numbers, objects, and arrays — not just strings

This is different from interpolation because interpolation always produces a string. Property binding preserves the data type — a boolean stays a boolean, a number stays a number.

---

## Slide 6: Property Binding vs Interpolation

Both property binding and interpolation display component data in the template. When do you use which?

**Use interpolation `{{ }}` when:**

- You're displaying text content between HTML tags
- You need to show a value inline with other text: `Hello, {{ name }}!`

**Use property binding `[prop]` when:**

- You're setting a non-string property (boolean, number, object)
- You're binding to an element property like `[disabled]`, `[hidden]`, `[src]`

**Example — these two lines do the same thing:**

```html
<!-- Interpolation — works because src accepts a string -->
<img src="{{ imageUrl }}" alt="Photo">

<!-- Property binding — also works, and is preferred for element properties -->
<img [src]="imageUrl" alt="Photo">
```

**Why prefer `[src]`?** Property binding is explicit — you're saying "this is a dynamic value bound to a component property." Interpolation inside an attribute can be confusing because it looks like a static string at first glance.

**Rule of thumb:** If it goes between tags, use `{{ }}`. If it sets an element property, use `[prop]`.

---

## Slide 7: Property Binding Examples

```typescript
// app.component.ts
export class AppComponent {
  isFormValid = false;
  profileImageUrl = 'https://example.com/avatar.png';
  isSecretVisible = false;
  highlightClass = 'text-primary';
}
```

```html
<!-- app.component.html -->

<!-- [disabled] — boolean binding; button is disabled when isFormValid is false -->
<button [disabled]="!isFormValid">Submit</button>

<!-- [src] — string binding; the image source updates when profileImageUrl changes -->
<img [src]="profileImageUrl" alt="Profile photo">

<!-- [hidden] — boolean binding; the paragraph is hidden when isSecretVisible is false -->
<p [hidden]="!isSecretVisible">This is a secret message.</p>

<!-- [class] — string binding; sets the CSS class to whatever highlightClass contains -->
<span [class]="highlightClass">Highlighted text</span>
```

**Notice:** Each binding targets a different DOM property type — `disabled` is a boolean, `src` is a string, `hidden` is a boolean, `class` is a string. Property binding handles all of them naturally because it preserves the data type.

---

## Slide 8: What Is Event Binding?

Event binding lets your template **respond to user actions** — clicks, keystrokes, mouse movements, form inputs. You wrap the event name in parentheses: `(event)="handler()"`.

**How it works:**

1. The user does something (clicks a button, types in an input)
2. The browser fires a DOM event
3. Angular intercepts it and calls the method you specified
4. Your component method runs, updating component state
5. Angular re-renders the template to reflect the new state

**Key facts:**

- Data flows **one direction**: template → component (the opposite of interpolation and property binding)
- The handler is a method on your component class
- You can pass `$event` to access the native DOM event object
- You can also pass other values, like template ref values or literals

**Direction summary so far:**

- `{{ }}` Interpolation: component → template (display data)
- `[prop]` Property binding: component → template (set properties)
- `(event)` Event binding: template → component (react to actions)

---

## Slide 9: Event Binding Examples

```typescript
// app.component.ts
export class AppComponent {
  clickCount = 0;
  lastKey = '';
  searchTerm = '';

  onButtonClick(): void {
    this.clickCount++;
  }

  onKeyPressed(event: KeyboardEvent): void {
    this.lastKey = event.key;
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }
}
```

```html
<!-- app.component.html -->

<!-- (click) — calls onButtonClick() when the button is clicked -->
<button (click)="onButtonClick()">Clicked {{ clickCount }} times</button>

<!-- (keyup) with $event — passes the native KeyboardEvent to the handler -->
<input (keyup)="onKeyPressed($event)" placeholder="Press any key">
<p>Last key pressed: {{ lastKey }}</p>

<!-- (input) with $event — fires on every keystroke in the input -->
<input (input)="onSearchInput($event)" placeholder="Search...">
<p>Searching for: {{ searchTerm }}</p>
```

**What's `$event`?** It's a special Angular variable that contains the native DOM event object. For `(click)` it's a `MouseEvent`, for `(keyup)` it's a `KeyboardEvent`, for `(input)` it's a generic `Event`. You use `$event` when you need details about the event — which key was pressed, what the input value is, where the mouse was clicked.

---

## Slide 10: What Is Two-Way Binding?

Two-way binding keeps a **component property and a form input in perfect sync**. When the user types, the property updates. When the property changes in code, the input updates. Data flows in both directions simultaneously.

**The syntax: `[(ngModel)]`**

```html
<input [(ngModel)]="userName">
```

This is called **"banana in a box"** — parentheses `()` inside square brackets `[]`. The memory trick: the banana `()` goes inside the box `[]`.

**How it works:**

1. Angular sets the input's value from `userName` (property binding direction: `[ngModel]`)
2. When the user types, Angular updates `userName` from the input (event binding direction: `(ngModelChange)`)
3. Both happen automatically — you just write `[(ngModel)]` and Angular handles both directions

**Two-way binding = property binding + event binding combined.** You could manually write `[ngModel]="userName" (ngModelChange)="userName = $event"` to achieve the same thing, but `[(ngModel)]` is the shorthand.

---

## Slide 11: Why FormsModule Is Needed

`ngModel` is a **directive** — a special instruction that Angular attaches to an element. It lives inside Angular's `FormsModule`. If you don't import `FormsModule`, Angular doesn't know what `ngModel` means and your binding silently fails.

**In a standalone component, import FormsModule directly:**

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],  // ← Required for [(ngModel)] to work
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  query = '';
}
```

**Key points:**

- `FormsModule` must be in the component's `imports` array — not somewhere else
- If you forget it, there's no error message — `[(ngModel)]` just silently does nothing
- This is a common "why isn't my binding working?" debugging moment
- Each standalone component that uses `[(ngModel)]` imports `FormsModule` individually

⚠️ **If your two-way binding isn't working, the first thing to check is: did you import FormsModule?**

---

## Slide 12: Two-Way Binding in Action

```typescript
// message-editor.component.ts
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

```html
<!-- message-editor.component.html -->

<!-- Two-way binding: typing updates 'message', and 'message' updates the input -->
<textarea [(ngModel)]="message" placeholder="Type your message..."></textarea>

<!-- This paragraph updates in real time as you type -->
<p>Preview: {{ message }}</p>

<!-- This also updates in real time — it reads the same property -->
<p>Character count: {{ message.length }}</p>
```

**What the user sees:** They type in the textarea and the preview and character count update instantly, keystroke by keystroke. There's no button to click, no event handler to wire up — `[(ngModel)]` handles everything.

---

## Slide 13: What Are Template Reference Variables?

A template reference variable gives you a **direct handle to a DOM element** right in the template. You create one by adding `#name` to any HTML element.

**Syntax:**

```html
<input #myInput type="text">
```

Now `myInput` refers to the actual `<input>` DOM element. You can use it anywhere in the same template.

**What can you do with a ref?**

- Read the element's value: `myInput.value`
- Read other properties: `myInput.placeholder`, `myInput.type`
- Pass it to an event handler: `(click)="doSomething(myInput.value)"`
- Wire sibling elements together: a button reads a nearby input's value

**Key facts:**

- The ref is only available within that template — not in the TypeScript class
- It points to the **DOM element** itself (for plain HTML elements)
- For Angular components, it points to the **component instance**
- You can have multiple refs in the same template — each needs a unique name

---

## Slide 14: Using a Ref to Read Input Values

```typescript
// search.component.ts
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

```html
<!-- search.component.html -->

<!-- #searchBox creates a reference to this input element -->
<input #searchBox type="text" placeholder="Search...">

<!-- The button reads searchBox.value and passes it to the handler -->
<button (click)="onSearch(searchBox.value)">Search</button>

<!-- You can also display the ref's value directly -->
<p>Current input: "{{ searchBox.value }}"</p>
```

**What's happening:** The `#searchBox` ref gives us a handle to the input element. When the button is clicked, we read `searchBox.value` and pass that string to `onSearch()`. We never needed `[(ngModel)]` — we just grabbed the value at the moment we needed it.

**Important:** The paragraph showing `{{ searchBox.value }}` updates when Angular runs change detection — typically after a click or other event. It does NOT update on every keystroke like `[(ngModel)]` would.

---

## Slide 15: Refs vs Two-Way Binding

Both template refs and two-way binding give you access to input values. When do you use which?

**Use `[(ngModel)]` (two-way binding) when:**

- You need the value to update on **every keystroke** in real time
- You're building a live preview (e.g., character counter, search-as-you-type)
- You want the component property to always reflect the current input state
- You need to programmatically update the input (setting `message = ''` clears it)

**Use `#ref` (template reference variable) when:**

- You only need the value at a **specific moment** (e.g., when a button is clicked)
- You're passing a value to an event handler as a one-time read
- You want to avoid the overhead of importing `FormsModule`
- You're wiring two sibling elements together in the template

**Summary:** `[(ngModel)]` keeps data in constant sync. `#ref` reads the value on demand. Choose based on whether you need continuous updates or point-in-time access.

---

## Slide 16: What Is Safe Navigation?

The safe navigation operator `?.` lets you access nested properties on objects that **might be null or undefined** without crashing your app.

**The problem:**

```typescript
// Component class
user: { name: string; address: { city: string } } | null = null;
```

```html
<!-- WITHOUT safe navigation — this CRASHES if user is null -->
<p>{{ user.address.city }}</p>
<!-- Error: Cannot read properties of null (reading 'address') -->
```

**The solution:**

```html
<!-- WITH safe navigation — returns undefined (blank) if user is null -->
<p>{{ user?.address?.city }}</p>
<!-- Renders nothing — no crash -->
```

**How it works:** `?.` checks each step in the chain. If any value is `null` or `undefined`, it short-circuits and returns `undefined` instead of throwing an error. Angular renders `undefined` as an empty string — so the page stays intact.

---

## Slide 17: Why Safe Navigation Matters

In real apps, data often starts as `null` and gets populated later — especially when loading from an API.

**Common scenario:**

```typescript
export class ProfileComponent {
  user: User | null = null;  // null until API responds

  constructor() {
    // Imagine an API call that takes 2 seconds
    // During those 2 seconds, user is null
  }
}
```

**Without `?.`** — the template crashes the moment Angular tries to render it, because `user` is null and you're trying to read `user.name`.

**With `?.`** — the template renders safely with blank values, and then fills in the data when the API response arrives.

**Key facts:**

- `?.` is built into Angular's template expression parser — it works everywhere in `{{ }}` and `[ ]`
- It works on deeply nested chains: `user?.address?.street?.number`
- It also works on method calls: `user?.getName()`
- Each `?.` is a null check — it stops at the first null/undefined in the chain

You'll use this constantly starting on Day 3 when you begin fetching data from APIs.

---

## Slide 18: Safe Navigation Example

```typescript
// profile.component.ts
interface User {
  name: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
  };
}

export class ProfileComponent {
  currentUser: User | null = {
    name: 'Angela',
    address: {
      city: 'Portland',
      state: 'OR'
    }
    // Note: street is undefined, email is undefined
  };

  guestUser: User | null = null;  // Entire object is null
}
```

```html
<!-- profile.component.html -->

<!-- currentUser exists — ?. passes through safely -->
<p>Name: {{ currentUser?.name }}</p>           <!-- "Angela" -->
<p>City: {{ currentUser?.address?.city }}</p>   <!-- "Portland" -->
<p>Street: {{ currentUser?.address?.street }}</p> <!-- "" (undefined renders blank) -->

<!-- guestUser is null — ?. short-circuits at the first step -->
<p>Guest: {{ guestUser?.name }}</p>             <!-- "" (blank, no crash) -->
<p>Guest city: {{ guestUser?.address?.city }}</p> <!-- "" (blank, no crash) -->
```

---

## Slide 19: What Is Nullish Coalescing?

The nullish coalescing operator `??` provides a **fallback value** when an expression is `null` or `undefined`.

**Syntax:** `expression ?? fallbackValue`

```html
<!-- If user?.name is null or undefined, display 'Guest' instead -->
<p>{{ user?.name ?? 'Guest' }}</p>
```

**How it works:**

- If the left side is **not** null/undefined → use the left side
- If the left side **is** null or undefined → use the right side (the fallback)

**Key facts:**

- `??` only triggers on `null` and `undefined` — not on `0`, `''`, or `false`
- This is different from `||` which triggers on all falsy values
- `??` is especially useful with `?.` because `?.` returns `undefined` when it short-circuits

**Why not use `||`?**

```html
<p>{{ itemCount || 'No items' }}</p>  <!-- Shows 'No items' when itemCount is 0 — WRONG! -->
<p>{{ itemCount ?? 'No items' }}</p>  <!-- Shows 0 when itemCount is 0 — CORRECT! -->
```

`??` is the safer choice because it only falls back when data is truly missing.

---

## Slide 20: Combining ?. and ??

The most powerful pattern combines safe navigation with nullish coalescing: navigate safely through the chain, and if anything is null, show a meaningful fallback instead of blank space.

```html
<!-- Safe navigation alone — renders blank if null -->
<p>{{ user?.address?.city }}</p>           <!-- "" when city is missing -->

<!-- Combined with ?? — renders a helpful fallback instead of blank -->
<p>{{ user?.address?.city ?? 'Unknown city' }}</p>  <!-- "Unknown city" when missing -->
```

**Real-world pattern — a complete user display:**

```html
<div class="user-card">
  <h2>{{ user?.name ?? 'Anonymous' }}</h2>
  <p>{{ user?.email ?? 'No email on file' }}</p>
  <p>{{ user?.address?.city ?? 'Location unknown' }},
     {{ user?.address?.state ?? '' }}</p>
</div>
```

**This pattern shows up everywhere in Angular apps** — any time you display data that might not exist yet (loading from an API) or might be optional (user didn't fill in their profile). Get comfortable with `?.` and `??` as a pair.

---

## Slide 21: What @Input() Does

`@Input()` marks a component property as **receivable from a parent component**. It's how parents send data down to their children.

**In the child component:**

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  @Input() name: string = '';    // ← Parent can set this
  @Input() age: number = 0;     // ← Parent can set this too
}
```

**How it works:**

1. The child class decorates a property with `@Input()`
2. The parent uses property binding to pass data: `[name]="someValue"`
3. Angular sets the child's `name` property to whatever `someValue` evaluates to
4. When `someValue` changes in the parent, Angular updates the child's `name` automatically

**Key fact:** `@Input()` creates a **one-way data flow** — parent → child only. The child receives data but cannot send data back through the same `@Input()`.

---

## Slide 22: How Property Binding Drives @Input

The parent component uses **property binding** `[inputName]="value"` to pass data to the child's `@Input()` property.

```typescript
// parent: app.component.ts
export class AppComponent {
  currentUser = 'Angela';
  currentAge = 28;
}
```

```html
<!-- parent: app.component.html -->

<!-- Property binding sends data INTO the child component -->
<app-greeting [name]="currentUser" [age]="currentAge"></app-greeting>

<!-- You can also pass literal values -->
<app-greeting name="Guest" [age]="0"></app-greeting>
```

```html
<!-- child: greeting.component.html -->
<p>Hello, {{ name }}! You are {{ age }} years old.</p>
```

**Important details:**

- `[name]="currentUser"` — square brackets mean the right side is a TypeScript expression
- `name="Guest"` — no brackets means the right side is a literal string
- `[age]="0"` — you need brackets for numbers because without them `"0"` would be the string `"0"`, not the number `0`
- The child uses `{{ name }}` and `{{ age }}` to display the received values

---

## Slide 23: @Input Data Flows One Direction Only

Data through `@Input()` flows **one way: parent → child**. The child cannot modify the parent's data through an `@Input()`.

```
┌─────────────┐    [name]="currentUser"    ┌──────────────────┐
│   Parent     │ ─────────────────────────→ │   Child          │
│ AppComponent │    data flows DOWN         │ GreetingComponent │
│              │                            │                  │
│ currentUser  │    ← NO reverse flow       │  @Input() name   │
└─────────────┘                             └──────────────────┘
```

**Why one-way?** This makes your app predictable. If a child could change the parent's data, you'd have data changing from multiple places and it would be very hard to track down bugs. One-way data flow means: if data changed, the parent changed it.

**"But what if the child needs to tell the parent something?"**

That's what `@Output()` is for — coming up next. The pattern is:

- **@Input()** → data flows **down** (parent → child)
- **@Output()** → events flow **up** (child → parent)

---

## Slide 24: What @Output() Does

`@Output()` lets a child component **send events up to its parent**. The child doesn't modify the parent's data directly — it emits an event, and the parent decides what to do with it.

**In the child component:**

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
  @Output() countChanged = new EventEmitter<number>();

  count = 0;

  increment(): void {
    this.count++;
    this.countChanged.emit(this.count);  // ← Send event to parent
  }
}
```

**How it works:**

1. Declare an `@Output()` property with type `EventEmitter<T>` where T is the data type you're sending
2. Call `.emit(value)` to fire the event and send data upward
3. The parent listens with event binding: `(countChanged)="handleIt($event)"`

---

## Slide 25: EventEmitter — Creating, Emitting, and Receiving

**Step 1 — Child creates the EventEmitter:**

```typescript
// child: counter.component.ts
@Output() countChanged = new EventEmitter<number>();
```

`EventEmitter<number>` means this event carries a `number` payload.

**Step 2 — Child emits the event:**

```typescript
// Somewhere in the child's method:
this.countChanged.emit(42);  // sends the number 42 to the parent
```

**Step 3 — Parent listens with event binding:**

```html
<!-- parent: app.component.html -->
<app-counter (countChanged)="onCountChanged($event)"></app-counter>
```

**Step 4 — Parent handles the event:**

```typescript
// parent: app.component.ts
onCountChanged(newCount: number): void {
  console.log('The counter is now:', newCount);
  // $event contains the value passed to .emit() — in this case, 42
}
```

**`$event`** is the value that was passed to `.emit()`. For `emit(42)`, `$event` is `42`. For `emit({ name: 'Book', qty: 2 })`, `$event` is that entire object.

---

## Slide 26: The Complete Parent-Child Pattern

Here's the full picture — `@Input()` sends data **down**, `@Output()` sends events **up**:

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

**Parent template showing both:**

```html
<app-product
  [name]="'TypeScript Handbook'"
  [price]="29.99"
  (addToCart)="onAddToCart($event)"
></app-product>
```

**The rules:**

- Data flows **down** through `@Input()` via property binding `[prop]="value"`
- Events flow **up** through `@Output()` via event binding `(event)="handler($event)"`
- The parent owns the data; the child requests changes via events
- This keeps data flow predictable and traceable

---

## Slide 27: What Is ngOnInit?

`ngOnInit` is a **lifecycle hook** — a method that Angular calls automatically at a specific moment in a component's life. Specifically, Angular calls `ngOnInit()` **once, right after it sets the component's @Input() values for the first time**.

**How to use it:**

```typescript
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() price: number = 0;

  displayLabel: string = '';

  ngOnInit(): void {
    // This runs AFTER Angular sets name and price from the parent
    this.displayLabel = `${this.name} — $${this.price.toFixed(2)}`;
  }
}
```

**Key facts:**

- Implement the `OnInit` interface (optional but recommended for clarity)
- `ngOnInit()` runs **once** — not on every change
- At this point, `@Input()` values are available and ready to use
- This is the correct place for initialization logic that depends on inputs

---

## Slide 28: Why Not the Constructor?

The constructor runs **before** Angular sets `@Input()` values. If you put initialization logic in the constructor, your inputs will still be at their default values.

**Timeline:**

```
1. Angular creates the component instance → constructor() runs
   - @Input() properties are still at their defaults ('' and 0)

2. Angular sets @Input() values from the parent's property bindings
   - name is now 'TypeScript Handbook', price is now 29.99

3. Angular calls ngOnInit()
   - NOW you can safely use this.name and this.price
```

**Constructor → inputs not ready. ngOnInit → inputs ready.**

Use the constructor only for simple variable declarations or dependency injection setup. Put any logic that reads `@Input()` values in `ngOnInit()`.

---

## Slide 29: ⚠️ WARNING — Constructor Initialization Mistake

This is the **#1 beginner mistake** with Angular lifecycle hooks. It's so common that it's worth its own warning.

**❌ WRONG — using the constructor:**

```typescript
export class ProductCardComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  displayLabel: string;

  constructor() {
    // BUG: this.name is '' and this.price is 0 here!
    this.displayLabel = `${this.name} — $${this.price.toFixed(2)}`;
    // displayLabel becomes " — $0.00" — not what you wanted!
  }
}
```

**✅ CORRECT — using ngOnInit:**

```typescript
export class ProductCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() price: number = 0;
  displayLabel: string = '';

  ngOnInit(): void {
    // this.name and this.price are set by the parent now
    this.displayLabel = `${this.name} — $${this.price.toFixed(2)}`;
    // displayLabel becomes "TypeScript Handbook — $29.99" ✓
  }
}
```

**The fix is always the same:** Move the code from the constructor to `ngOnInit()`.

---

## Slide 30: ngOnInit Example — Building a Display Label

```typescript
// product-card.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() inStock: boolean = true;

  displayLabel: string = '';
  statusBadge: string = '';

  ngOnInit(): void {
    // Process inputs AFTER they're set by the parent
    this.displayLabel = `${this.name} — $${this.price.toFixed(2)}`;
    this.statusBadge = this.inStock ? '✅ In Stock' : '❌ Sold Out';
  }
}
```

```html
<!-- product-card.component.html -->
<div class="card">
  <h3>{{ displayLabel }}</h3>
  <span>{{ statusBadge }}</span>
</div>
```

**What this shows:** `ngOnInit` is the right place to combine, transform, or process `@Input()` data into display-ready properties.

---

## Slide 31: What Is ngOnDestroy?

`ngOnDestroy` is a lifecycle hook that Angular calls **once, right before it removes a component from the DOM**. This is your chance to clean up anything the component started.

**When does a component get destroyed?**

- When the user navigates to a different page (routing)
- When a conditional removes it from the template (e.g., `@if` evaluates to false)
- When the parent component is itself destroyed

**What do you clean up?**

- **Timers** created with `setInterval()` or `setTimeout()`
- **Subscriptions** to observables (covered on Day 3)
- **Event listeners** added manually to the window or document
- **WebSocket connections** or other open resources

If you don't clean up, these things keep running in memory even after the component is gone. That's a **memory leak**.

---

## Slide 32: Why Cleanup Matters — Memory Leaks

A memory leak happens when your code holds onto resources it no longer needs. In Angular, the most common cause is forgetting to cancel timers or unsubscribe from data streams when a component is destroyed.

**Example of a leak:**

```typescript
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    // This interval runs FOREVER — even after the component is removed
    setInterval(() => {
      console.log('Still running...');  // Logs forever, wasting CPU
    }, 1000);
  }
  // No ngOnDestroy → no cleanup → memory leak!
}
```

**What goes wrong:**

1. User navigates to the dashboard — component is created, interval starts
2. User navigates away — component is destroyed, but the interval keeps running
3. User comes back — another interval starts (now two are running)
4. Repeat 10 times — 10 intervals running simultaneously, consuming memory and CPU

**The fix:** Store the timer ID and cancel it in `ngOnDestroy`.

---

## Slide 33: ngOnDestroy Example — Clearing an Interval

```typescript
// dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  refreshCount = 0;
  private timerId: number | null = null;  // Store the timer ID

  ngOnInit(): void {
    // Start an interval that simulates periodic data refresh
    this.timerId = window.setInterval(() => {
      this.refreshCount++;
      console.log(`Refresh #${this.refreshCount}`);
    }, 5000);
  }

  ngOnDestroy(): void {
    // Clean up the interval — this prevents the memory leak
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
      console.log('Timer cleared — no memory leak!');
    }
  }
}
```

**The pattern:** Start in `ngOnInit`, clean up in `ngOnDestroy`. Always store the resource handle (timer ID, subscription, etc.) so you can cancel it later.

---

## Slide 34: Signals First Look — signal()

🟠 **Day 2 Preview** — This is a first look at signals. Exercises do not require signals yet. Full coverage comes on Day 2.

**What is a signal?** A signal is a reactive value container. When you update a signal, anything that reads it automatically knows the value changed.

```typescript
import { signal } from '@angular/core';

// Create a signal with an initial value
const count = signal(0);

// READ the signal's value — call it like a function
console.log(count());  // 0

// UPDATE with .set() — replace the value entirely
count.set(5);
console.log(count());  // 5

// UPDATE with .update() — transform the current value
count.update(current => current + 1);
console.log(count());  // 6
```

**Key facts:**

- `signal(0)` creates a signal initialized to `0`
- Read by calling: `count()` — note the parentheses
- Write with `.set(newValue)` or `.update(fn)`
- In templates: `{{ count() }}` — you must include the parentheses

---

## Slide 35: Signals First Look — computed()

🟠 **Day 2 Preview** — Exercises do not require signals yet.

**`computed()` creates a derived value** that recalculates automatically whenever its source signal changes.

```typescript
import { signal, computed } from '@angular/core';

const count = signal(0);

// computed() reads count() and doubles it
const doubled = computed(() => count() * 2);

console.log(doubled());  // 0

count.set(3);
console.log(doubled());  // 6  ← automatically recalculated!

count.set(10);
console.log(doubled());  // 20 ← recalculated again!
```

**Key facts:**

- `computed()` takes a function that reads one or more signals
- It returns a **read-only** signal — you can't `.set()` or `.update()` a computed
- It recalculates lazily — only when you read it and a dependency changed
- You read it the same way: `doubled()` with parentheses

**Why signals matter:** They're Angular's modern replacement for tracking reactive state. On Day 2, you'll learn how they replace older patterns and make your components more efficient. For now, just get comfortable with the `signal()` and `computed()` syntax.

---

## Slide 36: Signals in a Component (Preview)

🟠 **Day 2 Preview** — Exercises do not require signals yet. This slide shows the complete pattern for reference only.

```typescript
// signal-demo.component.ts
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signal-demo',
  standalone: true,
  imports: [],
  templateUrl: './signal-demo.component.html',
  styleUrl: './signal-demo.component.css'
})
export class SignalDemoComponent {
  // Writable signal — the source of truth
  readonly count = signal(0);

  // Computed signal — derived from count, updates automatically
  readonly doubled = computed(() => this.count() * 2);

  increment(): void {
    this.count.update(c => c + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
```

```html
<!-- signal-demo.component.html -->
<p>Count: {{ count() }}</p>
<p>Doubled: {{ doubled() }}</p>
<button (click)="increment()">+1</button>
<button (click)="reset()">Reset</button>
```

**Notice:** In templates, you read signals with parentheses: `{{ count() }}`, not `{{ count }}`. This is different from regular properties. On Day 2, you'll learn why this matters and how it makes change detection more efficient.

---

## Slide 37: Coming Up — Modern vs Classic (Legacy) Angular

You've just learned the modern Angular way to build templates and wire up component communication — standalone components with direct imports, FormsModule imported in the component that uses it, and clean parent-child data flow.

Now let's see how the same things were done **before Angular 17** using the classic (legacy) approach. The legacy patterns still work, and you'll encounter them in older codebases and tutorials online.

**Modern Angular is what you should write.** The classic approach is shown here for recognition only — so you can read it when you see it, but you don't need to build with it.

---

## Slide 38: Modern ngModel Setup

**Modern approach — FormsModule imported directly in the component:**

```typescript
// character-counter.component.ts (Modern)
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-counter',
  standalone: true,
  imports: [FormsModule],  // ← Imported RIGHT HERE, in the component that uses it
  templateUrl: './character-counter.component.html',
  styleUrl: './character-counter.component.css'
})
export class CharacterCounterComponent {
  message = '';
}
```

**What's great about this:**

- You can see exactly which components use FormsModule — it's declared in the component itself
- No hidden dependencies — everything the component needs is listed in its `imports` array
- If you remove this component, FormsModule goes with it — no dead imports left behind

---

## Slide 39: Legacy ngModel Setup

**Classic (legacy) approach — FormsModule imported in an NgModule:**

```typescript
// app.module.ts (Legacy)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CharacterCounterComponent } from './character-counter/character-counter.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCounterComponent  // ← Component registered HERE, not in itself
  ],
  imports: [
    BrowserModule,
    FormsModule  // ← FormsModule imported HERE, available to ALL declared components
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**What this caused:**

- `FormsModule` imported once → available to **every** component in the module, even ones that don't use it
- Can't tell from `character-counter.component.ts` that it depends on FormsModule — the dependency is invisible
- If someone removes FormsModule from the module (cleaning up "unused" imports), `[(ngModel)]` silently breaks
- Every new component had to be added to the `declarations` array — forget it, and you get "is not a known element"

---

## Slide 40: Modern @Input() — Standalone Approach

**Modern approach — the child component is standalone and imported directly:**

```typescript
// greeting.component.ts (Modern)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})
export class GreetingComponent {
  @Input() name: string = '';
}
```

```typescript
// app.component.ts (Modern) — parent imports the child directly
import { Component } from '@angular/core';
import { GreetingComponent } from './greeting/greeting.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GreetingComponent],  // ← Parent lists exactly which children it uses
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userName = 'Angela';
}
```

**What's great:** The parent's `imports` array explicitly shows which child components are used. The dependency is visible and traceable.

---

## Slide 41: Legacy @Input() — NgModule Approach

**Classic (legacy) approach — @Input() itself works identically, but the registration context is different:**

```typescript
// greeting.component.ts (Legacy) — no standalone: true, no imports array
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']  // Note: styleUrls (plural array)
})
export class GreetingComponent {
  @Input() name: string = '';
}
```

```typescript
// app.module.ts (Legacy) — components registered in the module's declarations
@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent  // ← Must be declared here for <app-greeting> to work
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**What this caused:**

- Can't tell from `app.component.ts` which child components it uses — you must check `app.module.ts`
- The `declarations` array grew to dozens of components in large apps
- Two components in the same module could use each other without explicit imports — hidden coupling

---

## Slide 42: Modern @Output() — Standalone Approach

**Modern approach — the parent imports the child and binds to its @Output():**

```typescript
// counter.component.ts (Modern)
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

```html
<!-- app.component.html (Modern) -->
<app-counter (countChanged)="onCountChanged($event)"></app-counter>
```

**@Output() and EventEmitter syntax is exactly the same in modern and legacy.** The difference is only in how the child component is registered — standalone `imports` vs NgModule `declarations`.

---

## Slide 43: Legacy @Output() — NgModule Approach

**Classic (legacy) approach — same @Output() code, but registered in an NgModule:**

```typescript
// counter.component.ts (Legacy)
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']  // styleUrls — plural array
  // No standalone: true — must be in a module's declarations
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

```typescript
// app.module.ts (Legacy)
@NgModule({
  declarations: [AppComponent, CounterComponent],  // ← registered here
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**The pain:** If `CounterComponent` was declared in a *different* module, you'd need to export it from that module and import that module into this one — multiple files to edit just to use a component. Standalone components eliminated this entirely.

---

## Slide 44: Modern Lifecycle Hooks — Standalone

**Modern approach — ngOnInit and ngOnDestroy in a standalone component:**

```typescript
// timer-display.component.ts (Modern)
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer-display',
  standalone: true,
  imports: [],
  templateUrl: './timer-display.component.html',
  styleUrl: './timer-display.component.css'
})
export class TimerDisplayComponent implements OnInit, OnDestroy {
  seconds = 0;
  private timerId: number | null = null;

  ngOnInit(): void {
    this.timerId = window.setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }
  }
}
```

**Lifecycle hooks work exactly the same in modern and legacy.** The `OnInit` and `OnDestroy` interfaces, the method names, and the timing are identical. The only difference is the component registration context.

---

## Slide 45: Legacy Lifecycle Hooks — NgModule

**Classic (legacy) approach — same lifecycle hooks, but the component lives in an NgModule:**

```typescript
// timer-display.component.ts (Legacy)
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer-display',
  templateUrl: './timer-display.component.html',
  styleUrls: ['./timer-display.component.css']  // styleUrls — plural
  // No standalone: true
})
export class TimerDisplayComponent implements OnInit, OnDestroy {
  seconds = 0;
  private timerId: number | null = null;

  ngOnInit(): void {
    this.timerId = window.setInterval(() => {
      this.seconds++;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
    }
  }
}
```

**Key takeaway for lifecycle hooks:** The code inside `ngOnInit()` and `ngOnDestroy()` is identical between modern and legacy. The legacy difference is:

- No `standalone: true` on the component
- `styleUrls` (plural array) instead of `styleUrl` (singular string)
- The component must be declared in an NgModule's `declarations` array

Lifecycle hooks are a **core Angular concept** — they haven't changed. What changed is how components are organized and registered.

---

## Slide 46: Key Takeaways

1. **Angular has four binding types, each with a clear direction:** Interpolation `{{ }}` and property binding `[prop]` send data from the component to the template. Event binding `(event)` sends actions from the template back to the component. Two-way binding `[(ngModel)]` does both simultaneously — but requires importing `FormsModule`.

2. **@Input() sends data down, @Output() sends events up:** This is the fundamental parent-child communication pattern. Parents use `[prop]="value"` to pass data and `(event)="handler($event)"` to listen for events. Data flow is always explicit and one-directional per channel.

3. **Use ngOnInit for initialization, ngOnDestroy for cleanup:** The constructor runs too early — before inputs are set. Always put initialization logic in `ngOnInit()`. Always clean up timers, intervals, and subscriptions in `ngOnDestroy()` to prevent memory leaks.

4. **Safe navigation `?.` and nullish coalescing `??` protect against null:** Use `?.` to safely access nested properties that might not exist. Combine with `??` to provide fallback values instead of blank space. You'll use this pattern constantly when working with API data starting on Day 3.

# Angular Course — Day 2A Slide Deck
# Content Projection, Directives & Pipes

---

## Slide 1: Day 2A — Content, Directives & Pipes

**Day 2 · Part A**

### Content Projection, Attribute Directives & Pipes

By the end of this session you'll know how to build reusable wrapper components, control what renders in your template with modern control-flow syntax, and transform your data cleanly with pipes — all without touching the DOM directly.

---

## Slide 2: What You'll Be Able to Do

- **Project** external content into a component using `ng-content` and named slots
- **Control rendering** with `@if`, `@for`, `@switch`, and `@let` — Angular's modern control-flow syntax
- **Apply dynamic styling** cleanly with `[ngClass]` and `[ngStyle]`
- **Transform display values** using Angular's built-in pipes (`date`, `currency`, `json`, and more)
- **Write your own** custom pure pipe with `@Pipe` and `transform()`
- **Explain the difference** between a pure and an impure pipe — and why it matters for performance

---

## Slide 3: ng-content — Single-Slot Projection

**What it is in plain English:**
Imagine you're building a reusable Card component. You want the card's border, shadow, and padding to always look the same — but you want whoever uses the card to decide what goes *inside* it. `ng-content` is how you do that. It's a placeholder you put in your component's HTML that says: "whatever the parent puts between my tags, render it right here."

- The projected content belongs to the **parent** — the wrapper component never sees or controls it
- The wrapper has no idea what's inside — it just provides the shell
- Think of it like a picture frame: you build the frame, the parent chooses the picture

> This is Angular's version of React's `children` prop or the web platform's `<slot>`.

---

## Slide 4: ng-content — Code

**`card.component.ts`**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {}
// CardComponent has no logic — it is purely a structural wrapper
```

**`card.component.html`**
```html
<!-- ng-content is the "hole" — whatever the parent puts inside <app-card> renders here -->
<div class="card">
  <ng-content />
</div>
```

**Parent using the card:**
```html
<app-card>
  <p>I was written in the parent template!</p>
</app-card>
```

**What's happening:** The parent puts a `<p>` tag between the `<app-card>` opening and closing tags. Angular takes that `<p>` and drops it exactly where `<ng-content />` sits inside the card's template. The card component never touches or controls that content — it just provides the `<div class="card">` wrapper around whatever gets projected in.

---

## Slide 5: Named ng-content Slots

**What it is in plain English:**
Single-slot projection gives you one hole. But what if your card needs three separate areas — a header, a body, and a footer — and you want the parent to fill each one independently?

Named slots let you cut **multiple holes** in your component, each with a label. The parent stamps content into a specific hole by matching that label. The `select` attribute is what links a hole to a label — it works exactly like a CSS selector.

- `select="[slot-header]"` matches any element the parent marks with the `slot-header` attribute
- `select=".card-body"` matches by CSS class name
- `select="h2"` matches by HTML element type
- A bare `<ng-content />` with no `select` is the catch-all — it collects everything the parent didn't route to a named slot

> Attribute selectors like `slot-header` are the most common naming convention — they're descriptive and won't collide with real CSS class names.

---

## Slide 6: Named Slots — Code

**`card.component.html`**
```html
<div class="card">

  <div class="card-header">
    <!-- Only renders content the parent tagged with the slot-header attribute -->
    <ng-content select="[slot-header]" />
  </div>

  <div class="card-body">
    <!-- Only renders content the parent tagged with the slot-body attribute -->
    <ng-content select="[slot-body]" />
  </div>

  <div class="card-footer">
    <!-- Catch-all: anything without a matching slot attribute lands here -->
    <ng-content />
  </div>

</div>
```

**Parent filling the slots:**
```html
<app-card>
  <h2 slot-header>User Profile</h2>       <!-- matched by select="[slot-header]" -->
  <p slot-body>Here are your details.</p>  <!-- matched by select="[slot-body]" -->
  <button>Save Changes</button>            <!-- no slot attribute → goes to bare ng-content -->
</app-card>
```

**What's happening:** The parent labels its elements with attributes (`slot-header`, `slot-body`). Angular reads those attributes, matches them against the `select` values in the card template, and routes each piece of content to the correct hole. The `<button>` has no label, so it falls through to the bare `<ng-content />` at the bottom — the catch-all.

---

## Slide 7: ngAfterContentInit

**What it is in plain English:**
When Angular builds your component, it runs a sequence of steps. Two matter here:

1. Your component's own setup runs (`ngOnInit`)
2. Angular then inserts any projected content into the `ng-content` slots

The problem: during step 1, the projected content doesn't exist yet. If you try to read it in `ngOnInit`, you'll get `undefined`.

`ngAfterContentInit` is a lifecycle hook that fires **after step 2 finishes** — the projected content is fully inserted and safe to read. It fires once, and only once.

- Add `implements AfterContentInit` to your class to use it (imported from `@angular/core`)
- The method must be named exactly `ngAfterContentInit()`
- Almost always used alongside `@ContentChild` or `@ContentChildren` to access what was projected (covered on the next slides)

---

## Slide 8: ngAfterContentInit — Code

```typescript
import { Component, AfterContentInit, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements AfterContentInit {

  // @ContentChild looks for a projected element marked with #sectionTitle
  // This property is undefined until ngAfterContentInit fires
  @ContentChild('sectionTitle') titleRef!: ElementRef;

  ngAfterContentInit(): void {
    // By the time this method runs, Angular has finished inserting projected content
    // titleRef now holds a reference to the actual DOM element the parent projected in
    if (this.titleRef) {
      console.log('Projected title text:', this.titleRef.nativeElement.textContent);
    }
  }
}
```

**What's happening:** The parent will project an element marked with `#sectionTitle`. `@ContentChild('sectionTitle')` tells Angular "find that element and populate this property with a reference to it." But Angular can only find it after projection is complete — so the code waits for `ngAfterContentInit` before accessing `titleRef`. Trying to use `titleRef` in `ngOnInit` returns `undefined` every time.

---

## Slide 9: What Are @ContentChild and @ViewChild?

When you build a wrapper component, you sometimes need to reach inside and get a JavaScript reference to a specific element — so you can read its properties, call a method on it, or respond to its state.

Angular gives you two decorators for this:

**`@ContentChild`** — queries content that was **projected into your component** by the parent (content that came through `ng-content`).

**`@ViewChild`** — queries elements that are defined **inside your own component's template** (your own HTML, not what the parent sent in).

A simple way to remember the difference:
- **ContentChild** → "give me something the *parent* sent into me"
- **ViewChild** → "give me something I defined in *my own* template"

**Why both are introduced here:**
You just learned `ng-content`, which is where projected content comes from. `@ContentChild` is how you access that projected content from TypeScript — so this is the natural place to introduce it. `@ViewChild` follows the same pattern but for your own template, so it makes sense to define both together.

> **`@ViewChild` is covered fully in Extended Topics.** Know it exists and what it does — you will see it in real codebases.

---

## Slide 10: ng-container — The Invisible Wrapper

**What it is in plain English:**
Sometimes you need to group a few HTML elements together — for example, so they can all sit inside the same `@if` block. The obvious move is to wrap them in a `<div>`. But a `<div>` shows up in your real browser DOM, and that can break CSS layouts — especially flexbox and grid, which care about what direct children exist.

`ng-container` is a wrapper that **only exists in your template code**. Angular reads it, uses it to understand the grouping, and then **removes it entirely** before rendering to the browser. The elements inside it render as normal — but the container itself leaves zero trace. Not a div, not a span, nothing.

Use `ng-container` any time you need to group elements for Angular's purposes, but don't want to introduce a real DOM node to do it.

---

## Slide 11: ng-container — Code

```html
<!-- Problem: <div> wrapper keeps the grouping but shows up in the DOM -->
@if (isLoggedIn) {
  <div>                          <!-- this <div> appears in your browser's DevTools -->
    <h2>Welcome back!</h2>
    <span>Last login: today</span>
  </div>
}

<!-- Solution: ng-container groups the same elements but disappears completely -->
@if (isLoggedIn) {
  <ng-container>                 <!-- Angular removes this before rendering -->
    <h2>Welcome back!</h2>
    <span>Last login: today</span>
  </ng-container>
}
```

**What you see in DevTools for the second version:**
```html
<h2>Welcome back!</h2>
<span>Last login: today</span>
<!-- No wrapper element whatsoever -->
```

**What's happening:** Both versions produce the same visible output on screen. But the first version puts an unwanted `<div>` into the HTML structure that CSS rules can react to. The second version is clean — `ng-container` satisfied Angular's syntax needs and then vanished. The browser only ever sees `<h2>` and `<span>`.

---

## Slide 12: ng-template — The Hidden Definition

**What it is in plain English:**
`ng-template` is like writing a recipe and filing it away. The recipe exists and can be referenced — but nothing gets cooked until you explicitly say so.

When Angular encounters an `ng-template` tag, it reads what's inside, saves it in memory, and **renders nothing to the screen**. The content stays hidden until you point at it and say "render this now."

You give it a name using a `#` reference variable. Then you reference that name elsewhere — using a directive called `[ngTemplateOutlet]` — to tell Angular exactly when and where to show it.

This is useful when you have a piece of UI (like a loading spinner, or an empty-state message) that you need to reuse in several places. Define it once as an `ng-template`, then stamp it wherever you need it.

```html
<!-- Defined here — renders NOTHING to the screen on its own -->
<ng-template #loadingSpinner>
  <div class="spinner">Loading…</div>
</ng-template>
```

The spinner stays invisible until something uses `[ngTemplateOutlet]="loadingSpinner"`.

---

## Slide 13: ng-template — Practical Use

Defining a reusable loading state once and stamping it in multiple places:

```typescript
import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [NgTemplateOutlet],   // NgTemplateOutlet is what actually renders the template
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  @Input() products: { id: number; name: string }[] = [];
  @Input() isLoading = false;
}
```

```html
<!-- Define the loading spinner template once — renders nothing here -->
<ng-template #loading>
  <div class="spinner">Loading…</div>
</ng-template>

<!-- Stamp it in two different places using [ngTemplateOutlet] -->
@if (isLoading) {
  <ng-container [ngTemplateOutlet]="loading" />        <!-- render the template here -->
} @else if (products.length === 0) {
  <ng-container [ngTemplateOutlet]="loading" />        <!-- reuse it here too -->
} @else {
  <app-product-list [products]="products" />
}
```

**What's happening:** `[ngTemplateOutlet]="loading"` is the instruction that tells Angular: "take the contents of the `#loading` template and render them right here." `ng-container` is used as the host so no extra DOM wrapper appears. Without `[ngTemplateOutlet]`, the `ng-template` definition would just sit quietly in memory doing nothing.

---

## Slide 14: @if / @else Blocks

**What it is in plain English:**
`@if` is how you show or hide parts of your template based on a condition. When the condition is true, the block renders. When it's false, Angular removes those elements from the DOM entirely — they're not just hidden with CSS, they genuinely do not exist in the page.

`@else` gives you the fallback — what to show when the condition is false. `@else if` lets you chain multiple conditions. The whole syntax reads exactly like a JavaScript `if/else` statement, because Angular 17 intentionally designed it that way.

Before Angular 17, this was done with `*ngIf` — a structural directive with awkward syntax, especially for the else case. The legacy slides at the end of this session show exactly what that looked like.

- The condition inside `@if()` can be any TypeScript expression — comparisons, method calls, nullish checks, anything
- Each block is scoped: variables declared inside stay inside that block
- Write HTML directly inside `@else { }` — no `ng-template` wrapper needed

---

## Slide 15: @if — Code

```typescript
@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [],
  templateUrl: './auth-status.component.html',
  styleUrl: './auth-status.component.css'
})
export class AuthStatusComponent {
  @Input() role: 'admin' | 'user' | null = null;
}
```

```html
<!-- auth-status.component.html -->

@if (role === 'admin') {
  <div class="admin-panel">
    <h2>Admin Dashboard</h2>
    <p>Full access granted.</p>
  </div>
} @else if (role === 'user') {
  <p>Welcome! You have standard access.</p>
} @else {
  <!-- role is null — neither condition matched -->
  <p>Please log in to continue.</p>
}
```

**What's happening:** Angular evaluates `role === 'admin'` first. If true, the admin panel renders and the rest is skipped entirely. If false, it checks `role === 'user'`. If that's also false (meaning `role` is `null`), the `@else` block renders. At any given moment, exactly one of these three blocks exists in the DOM — the others are completely absent.

---

## Slide 16: @for with Required track

**What it is in plain English:**
`@for` is how you render a list of items. It loops over an array and outputs a block of HTML for each item — think of it as a `forEach` that generates DOM elements instead of running code.

The `track` property is **required** (Angular won't compile without it). It tells Angular how to uniquely identify each item in the list. Here's why that matters: when the list changes — say a new item is added — Angular needs to figure out which DOM nodes already exist and which need to be created. Without tracking, Angular's only option is to throw everything away and rebuild the entire list from scratch. With tracking, it can reuse the DOM nodes that haven't changed and only create or destroy what actually changed.

The `@empty` block is optional — it renders automatically when the array is empty, saving you from a separate `@if` check above the loop.

- Always track by a stable unique property like `item.id`
- Avoid `track $index` if your list can reorder — positions shift when items move, defeating the purpose

---

## Slide 17: @for — Code

```typescript
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: { id: number; title: string; done: boolean }[] = [];
}
```

```html
@for (task of tasks; track task.id) {
  <!-- Angular links this DOM node to this task by its id -->
  <!-- Adding or removing a task only touches that specific node -->
  <div class="task" [class.completed]="task.done">
    <span>{{ task.title }}</span>
  </div>
} @empty {
  <!-- Renders automatically when tasks array is empty — no extra @if needed -->
  <p class="no-tasks">No tasks yet. Add one!</p>
}
```

**What's happening:** For each item in `tasks`, Angular creates one `<div class="task">`. The `track task.id` line is the identity contract — it tells Angular "this particular DOM node belongs to the task with this id." When tasks change, Angular walks the id list, reuses existing nodes where the id matches, creates new nodes for new ids, and destroys nodes for removed ids. Only the minimum DOM work happens.

---

## Slide 18: @for — Built-in Loop Variables

`@for` gives you free variables about where you are in the current iteration. You declare which ones you want using `let`.

```html
@for (item of items; track item.id; let i = $index, let isFirst = $first, let isLast = $last, let isEven = $even) {

  <div
    class="row"
    [class.first-row]="isFirst"   <!-- add CSS class only on the very first item -->
    [class.last-row]="isLast"     <!-- add CSS class only on the very last item -->
    [class.shaded]="isEven"       <!-- alternate shading on even-indexed rows -->
  >
    <!-- $index is zero-based — add 1 to show a 1-based row number -->
    <span class="row-number">{{ i + 1 }}</span>
    <span>{{ item.name }}</span>

    @if (!isLast) {
      <!-- Show a divider after every row except the last one -->
      <hr />
    }
  </div>

}
```

**What's happening:** After the `track` expression, you add `let varName = $builtIn` for each variable you want. `$index` is the current loop position (0, 1, 2…). `$first` and `$last` are booleans — true only on the first or last iteration. `$even` and `$odd` flip back and forth — useful for zebra striping without CSS `:nth-child`. All six built-in variables: `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`.

---

## Slide 19: @switch / @case

**What it is in plain English:**
`@switch` is the right tool when you have one variable that can be several different values, and you want to show a different piece of UI for each one.

It works exactly like a JavaScript `switch` statement. You point it at a value, define a `@case` block for each possible match, and Angular renders exactly one block — the one whose value matches. If nothing matches, `@default` renders as the fallback.

Use `@switch` instead of a long chain of `@else if` when you're checking the same variable against multiple specific values. It's cleaner to read and easier to extend.

- Each `@case` comparison uses strict equality (`===`) — same as JavaScript
- No `break` needed — there is no fallthrough between cases
- `@default` is optional but always a good idea to include

---

## Slide 20: @switch — Code

```typescript
@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  @Input() status: 'active' | 'pending' | 'suspended' | 'unknown' = 'unknown';
}
```

```html
@switch (status) {
  @case ('active') {
    <!-- Renders when status === 'active' exactly -->
    <span class="badge green">Active</span>
  }
  @case ('pending') {
    <span class="badge yellow">Pending Approval</span>
  }
  @case ('suspended') {
    <span class="badge red">Suspended</span>
  }
  @default {
    <!-- Catches 'unknown' or any value not listed above -->
    <span class="badge grey">Unknown Status</span>
  }
}
```

**What's happening:** Angular evaluates `status` once, then walks the `@case` blocks comparing with `===`. The first match renders its content and the others are skipped entirely. If no `@case` matches, `@default` renders. At any moment, exactly one badge exists in the DOM.

---

## Slide 21: @let — Local Template Variables

**What it is in plain English:**
`@let` lets you create a named shortcut inside your template. That's the whole idea.

If you have a long property chain — like `user.profile.address.city` — and you need to reference it five times in your template, you can write it once with `@let city = user.profile.address.city` and then use `city` everywhere after that. It makes templates shorter and much easier to read.

It also helps when a method call produces a value you use in multiple places — calling the method once and giving the result a name is cleaner than calling it repeatedly.

- `@let` exists only in the template — you cannot access it in your TypeScript class
- It re-evaluates on every change detection cycle — it is not cached or stored
- It is scoped to the block it's declared in — a `@let` inside an `@if` stays inside that `@if`

---

## Slide 22: @let — Code

```typescript
@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  @Input() order!: {
    id: string;
    items: { price: number }[];
    discount: number;
  };

  getTotal(): number {
    return this.order.items.reduce((sum, i) => sum + i.price, 0);
  }
}
```

```html
<!-- Call getTotal() once and give the result the name 'total' -->
@let total = getTotal();

<!-- Derive a second value from the first — no extra method needed -->
@let discounted = total - order.discount;

<h3>Order #{{ order.id }}</h3>
<p>Subtotal:  {{ total          | currency }}</p>
<p>Discount:  {{ order.discount | currency }}</p>
<p>You pay:   {{ discounted     | currency }}</p>
```

**What's happening:** Without `@let`, `getTotal()` would be called once per `{{ total }}` reference — potentially three times. `@let total = getTotal()` calls it once and makes the result available under the name `total` for the rest of the template. `discounted` is then derived from `total` without needing a second method. Both aliases are re-evaluated on the next change detection cycle.

---

## Slide 23: What Is computed()?

Before looking at how `@let` and `computed()` differ, you need to understand what `computed()` actually is.

**`computed()` is a signal-based derived value.** You define it in your component *class*, and it automatically recalculates whenever the signals it depends on change. Between those changes, it returns a cached result — it doesn't do the work again until something it depends on actually updates.

```typescript
import { signal, computed } from '@angular/core';

export class PriceCalculatorComponent {
  // Two raw signals — these are the source values
  readonly quantity = signal(3);
  readonly unitPrice = signal(29.99);

  // computed() derives a new value from those signals
  // It recalculates ONLY when quantity or unitPrice changes
  // Between changes, it returns the same cached result without re-running
  readonly totalPrice = computed(() => this.quantity() * this.unitPrice());
}
```

Key facts about `computed()`:
- Lives in the **class**, not the template
- Only recalculates when its signal dependencies change
- Caches the last result — calling `totalPrice()` multiple times returns the same value until signals change
- Fully usable in TypeScript, tests, and services

> `computed()` is covered in depth in Day 2B. What matters now is: it's a class-level, signal-aware, memoized derived value.

---

## Slide 24: ⚠️ WARNING — @let vs computed()

Now that you know what both are, here's the comparison that trips up nearly every student:

| | `@let` | `computed()` |
|---|---|---|
| **Lives in** | Template only | Component class |
| **Reactive?** | Re-runs on every CD cycle | Re-runs only when signals change |
| **Memoized?** | ❌ No — recalculates every time | ✅ Yes — cached until deps change |
| **Usable in class?** | ❌ No | ✅ Yes |
| **Works with signals?** | ✅ Can read signal values | ✅ Built for signals |

**Rule of thumb:**
- Use `@let` to **reduce repetition** in your template — it's a display shortcut, nothing more
- Use `computed()` for **derived state** that needs to be cached, shared with other class code, or tested

```html
<!-- @let: a template alias — re-runs on every change detection cycle -->
@let fullName = user.firstName + ' ' + user.lastName;
```

```typescript
// computed(): signal-aware, memoized, lives in the class
readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
```

---

## Slide 25: [ngClass] — Dynamic CSS Classes

**What it is in plain English:**
Normally you add CSS classes to elements by writing them directly in the HTML. But what if a class should only appear sometimes — like adding `active` when a tab is selected, or `hidden` when an alert is dismissed?

`[ngClass]` lets you pass Angular an object where the **keys are class names** and the **values are conditions**. Angular adds the class when the condition is true and removes it when the condition is false — automatically, every time the underlying data changes. No manual DOM manipulation needed.

Import `NgClass` from `@angular/common` in your `imports` array.

```typescript
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() type: 'success' | 'warning' | 'error' = 'success';
  @Input() isDismissed = false;
}
```

```html
<div
  [ngClass]="{
    'alert': true,                    <!-- true = always apply this class -->
    'alert-success': type === 'success',
    'alert-warning': type === 'warning',
    'alert-error':   type === 'error',
    'hidden':        isDismissed       <!-- adds 'hidden' when isDismissed is true -->
  }"
>
  <ng-content />
</div>
```

**What's happening:** Angular evaluates each condition in the object. Classes whose value is `true` are added to the element's class list. Classes whose value is `false` are removed. When `type` or `isDismissed` changes, Angular re-evaluates the whole object and updates the class list automatically.

---

## Slide 26: [ngStyle] — Dynamic Inline Styles

**What it is in plain English:**
`[ngStyle]` does for inline styles what `[ngClass]` does for CSS classes — it lets you set style properties whose *values* come from your component data.

The important rule: **reach for `[ngClass]` first.** If you can define a CSS class with the style you want and toggle it conditionally, do that. Use `[ngStyle]` only when the actual value of a style is dynamic — something you can't know at CSS-writing time. A progress bar width driven by a data percentage is the classic case.

Import `NgStyle` from `@angular/common` in your `imports` array.

```typescript
import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() percent = 0;        // 0–100 — can't express this as a fixed CSS class
  @Input() color = '#4caf50';  // user-defined color passed in from the parent
}
```

```html
<div class="progress-track">
  <div
    class="progress-fill"
    [ngStyle]="{
      'width.%': percent,        <!-- Angular unit shorthand: sets width as a % value -->
      'background-color': color  <!-- sets fill color dynamically from @Input -->
    }"
  >
  </div>
</div>
```

**What's happening:** `'width.%': percent` is Angular's unit shorthand — equivalent to `style.width = percent + '%'`. When `percent` is `75`, the element gets `style="width: 75%"`. When the parent changes either input, Angular re-evaluates the object and updates the inline styles automatically. The `'background-color'` property is standard CSS in a quoted string.

---

## Slide 27: What Are Pipes?

**The concept:**
Pipes are Angular's way of formatting data for display without modifying the actual data.

Your component might store a date as a JavaScript `Date` object and a price as the raw number `1234.5`. You don't want to change those values — they're the real data your app works with. But you also don't want to show `Mon Jun 15 2025 00:00:00 GMT` or bare `1234.5` to the user.

A pipe sits between your data and the screen. It takes the raw value in, transforms how it looks, and outputs a formatted string. The original value in your component is never touched.

**Syntax:** `{{ value | pipeName }}`
**With arguments:** `{{ value | pipeName : arg1 : arg2 }}`

```html
{{ invoiceDate | date:'mediumDate' }}   <!-- shows: Jun 15, 2025 -->
{{ amount | currency }}                 <!-- shows: $1,234.50 -->
{{ greeting | uppercase }}              <!-- shows: HELLO WORLD -->
```

Pipes are composable — chain them with `|` and the output of one becomes the input of the next:
```html
{{ username | lowercase | titlecase }}  <!-- 'JANE SMITH' → 'jane smith' → 'Jane Smith' -->
```

---

## Slide 28: Built-in Pipes — Overview

Angular ships with a set of commonly-needed pipes ready to use. Import each one you need from `@angular/common`:

| Pipe | What it does | Example output |
|---|---|---|
| `date` | Formats a Date or timestamp string | `Jun 15, 2025` |
| `currency` | Formats a number as money | `$1,234.50` |
| `uppercase` / `lowercase` | Changes case | `HELLO` / `hello` |
| `titlecase` | Capitalizes each word | `Hello World` |
| `number` (DecimalPipe) | Formats decimal places | `3.14` |
| `slice` | Returns a subset of an array or string | First 3 items |
| `json` | Pretty-prints any value as formatted JSON | `{ "id": 1 }` |
| `async` | Subscribes to an Observable or Promise | Latest emitted value |

The next slides show each group with code examples.

---

## Slide 29: date and currency Pipes

```typescript
import { Component } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  invoiceDate = new Date();
  amount = 1234.5;
  dueDate = '2025-08-01';
}
```

```html
<!-- 'mediumDate' is a named format shorthand — output: Jun 15, 2025 -->
<p>Invoice Date: {{ invoiceDate | date:'mediumDate' }}</p>

<!-- Custom format string — output: 08/01/2025 -->
<p>Due: {{ dueDate | date:'MM/dd/yyyy' }}</p>

<!-- No arguments = US dollar format — output: $1,234.50 -->
<p>Amount: {{ amount | currency }}</p>

<!-- arg1: currency code, arg2: display style, arg3: digit format -->
<p>EUR: {{ amount | currency:'EUR':'symbol':'1.2-2' }}</p>
```

**What's happening:** The `date` pipe accepts either a named shorthand (`'mediumDate'`, `'shortDate'`, `'fullDate'`) or a custom format pattern. The `currency` pipe's three arguments are: which currency to use (`'EUR'`), whether to show the symbol or the code (`'symbol'`), and the digit format string (`'1.2-2'` means at least 1 integer digit, exactly 2 decimal places).

---

## Slide 30: uppercase, lowercase, titlecase & json Pipes

```typescript
import { Component } from '@angular/core';
import { UpperCasePipe, LowerCasePipe, TitleCasePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-debug-panel',
  standalone: true,
  imports: [UpperCasePipe, LowerCasePipe, TitleCasePipe, JsonPipe],
  templateUrl: './debug-panel.component.html',
  styleUrl: './debug-panel.component.css'
})
export class DebugPanelComponent {
  username = 'jane smith';
  rawPayload = { id: 42, roles: ['admin', 'editor'], active: true };
}
```

```html
<p>{{ username | uppercase }}</p>   <!-- JANE SMITH -->
<p>{{ username | lowercase }}</p>   <!-- jane smith -->
<p>{{ username | titlecase }}</p>   <!-- Jane Smith -->

<!-- json pipe pretty-prints the full object — wrap in <pre> to preserve whitespace -->
<pre>{{ rawPayload | json }}</pre>
<!-- Output:
{
  "id": 42,
  "roles": [
    "admin",
    "editor"
  ],
  "active": true
}
-->
```

**What's happening:** `uppercase`, `lowercase`, and `titlecase` take no arguments — they just transform the string. The `json` pipe runs `JSON.stringify` with indentation on whatever value you give it, converting any object or array into readable formatted text. The `<pre>` tag is important — it tells the browser to preserve newlines and spaces, so the output renders as indented JSON rather than one collapsed line.

---

## Slide 31: number & slice Pipes

```typescript
import { Component } from '@angular/core';
import { DecimalPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [DecimalPipe, SlicePipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  ratio = 3.14159265;
  tags = ['angular', 'typescript', 'rxjs', 'signals', 'pipes'];
}
```

```html
<!-- number pipe format string: 'minIntegers.minDecimals-maxDecimals' -->
<p>{{ ratio | number:'1.2-2' }}</p>    <!-- 3.14  — capped at 2 decimal places -->
<p>{{ ratio | number:'1.4-4' }}</p>    <!-- 3.1416 — exactly 4 decimal places -->

<!-- slice:start:end works like Array.slice(start, end) -->
@for (tag of tags | slice:0:3; track tag) {
  <span class="tag">{{ tag }}</span>
}
<!-- Renders: angular  typescript  rxjs  (first 3 only, last 2 omitted) -->
```

**What's happening:** The `number` pipe format string `'1.2-2'` means: show at least 1 digit before the decimal point, and between 2 and 2 digits after it (exactly 2). The `slice` pipe can be applied directly inside `@for` — it filters the array before the loop runs, so Angular only iterates over the first 3 items. The pipe re-evaluates automatically whenever `tags` changes.

---

## Slide 32: async Pipe

```typescript
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-name',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-name.component.html',
  styleUrl: './user-name.component.css'
})
export class UserNameComponent {
  // In real code this comes from an HTTP call via a service (Day 3B)
  userName$: Observable<string> = of('Alice');
}
```

```html
<!-- async subscribes to the observable and renders its latest emitted value -->
<!-- When the component is destroyed, async unsubscribes automatically -->
<p>{{ userName$ | async }}</p>
```

**What's happening:** Without `async`, you'd need to subscribe to `userName$` in `ngOnInit`, save the value to a class property, then manually unsubscribe in `ngOnDestroy` to avoid memory leaks. The `async` pipe does all three steps automatically — subscribe, display the latest value, unsubscribe on destroy. You hand it the Observable directly and it handles the lifecycle for you.

> We'll use `async` with real HTTP calls in Day 3B. We'll also introduce `toSignal()` there — the modern alternative that replaces `async` pipe entirely.

---

## Slide 33: What Are Pure and Impure Pipes?

**The concept:**
Every pipe has to answer one question: *when should I re-run my transformation?*

Re-running on every mouse move, every keystroke, every tick of change detection would be wasteful — especially if the input hasn't actually changed. So Angular gives you two modes:

**Pure (default):** Angular checks whether the input reference has changed using `===`. If the reference is the same, return the cached result. If the reference changed, re-run the transformation. This is extremely fast.

**Impure:** Angular re-runs the pipe on every single change detection cycle, no matter what. This catches data that was changed internally (mutated), but it runs constantly and can hurt performance.

The critical word is **reference**. In JavaScript, two arrays can contain the same items but still be different references — and `===` only checks the reference, not the contents:

```javascript
const a = [1, 2, 3];
const b = a;          // same reference: a === b → true  → pure pipe does NOT re-run
const c = [...a];     // new reference:  a === c → false → pure pipe DOES re-run
```

This distinction is what the mutation gotcha on the next slide is all about.

---

## Slide 34: Pure vs Impure Pipes — The Rules

```typescript
// Pure pipe — default behavior, pure: true
// Angular checks: did the input reference change? (uses ===)
// If yes → re-run transform(). If no → return cached result.
// Fast and predictable. Always start here.
@Pipe({ name: 'filterActive', standalone: true, pure: true })
export class FilterActivePipe implements PipeTransform {
  transform(items: Item[]): Item[] {
    return items.filter(i => i.active);
  }
}

// Impure pipe — pure: false
// Angular re-runs transform() on every change detection cycle regardless of input
// Catches in-place mutations, but runs constantly — use sparingly
@Pipe({ name: 'filterActive', standalone: true, pure: false })
export class FilterActivePipe implements PipeTransform {
  transform(items: Item[]): Item[] {
    return items.filter(i => i.active);
  }
}
```

**The practical rule:** Start with pure. If your pipe is showing stale data, the answer is almost never "make it impure" — it's almost always "stop mutating the array, replace it instead." The next slide shows exactly what that means.

---

## Slide 35: ⚠️ WARNING — Pure Pipe Mutation Gotcha

This is one of the most common silent bugs beginners hit. No error, no warning — just stale data on screen.

**The trap:**
```typescript
addItem(): void {
  this.items.push({ id: 4, name: 'New Item' });
  // push() modifies the existing array in place
  // this.items still points to the same array object in memory
  // Angular checks: old reference === new reference → true
  // Pure pipe sees no change → does NOT re-run → screen shows old data
}
```

```html
{{ items | myPurePipe }}  <!-- Stale output — the pipe didn't notice anything changed -->
```

**The fix — replace the array instead of mutating it:**
```typescript
addItem(): void {
  // Spread operator creates a brand new array at a new memory address
  // Angular checks: old reference === new reference → false (different object)
  // Pure pipe detects the change → re-runs transform() → screen updates correctly
  this.items = [...this.items, { id: 4, name: 'New Item' }];
}
```

**What's happening:** `push()` modifies the array that `this.items` already points to — the reference (memory address) never changes. Angular's `===` check compares references, not contents, so it sees nothing different. Spreading into a new array creates a new object at a new address — `===` correctly identifies it as a different reference and the pipe re-runs.

> This rule applies everywhere in Angular: signals, OnPush components, and NgRx all rely on reference equality. Build the habit now.

---

## Slide 36: Custom Pipe with @Pipe

Writing a custom pipe is four steps:

1. Create a class that implements `PipeTransform`
2. Add the `@Pipe` decorator with a `name` (what you type in templates) and `standalone: true`
3. Implement `transform()` — the function Angular calls when the pipe runs
4. Add it to `imports` in any component that uses it — same as adding a component or directive

**`transform()` signature:**
```typescript
transform(value: InputType, arg1?: Type, arg2?: Type): OutputType
```

- `value` = whatever is to the left of the `|` in the template
- Extra arguments = whatever comes after `:` in the template (`| pipeName : arg1 : arg2`)
- The return value is what Angular renders to the screen

---

## Slide 37: Custom Pipe — Code

A pipe that shortens long text and appends an ellipsis:

```typescript
// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',      // what you write in templates: {{ text | truncate }}
  standalone: true,
  pure: true             // re-runs only when the input string reference changes
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 50, ellipsis = '...'): string {
    // value    = the string passed into the pipe from the template
    // limit    = first colon arg: {{ text | truncate:80 }} → limit is 80
    // ellipsis = second colon arg: {{ text | truncate:80:'…' }} → ellipsis is '…'
    if (!value || value.length <= limit) {
      return value;   // string is already short enough — return unchanged
    }
    return value.slice(0, limit).trimEnd() + ellipsis;
  }
}
```

**Usage:**
```html
<p>{{ article.body | truncate:80:'… read more' }}</p>
```

**What's happening:** Angular calls `transform(article.body, 80, '… read more')`. If `article.body` is 80 characters or fewer, the method returns it as-is. If it's longer, `slice(0, 80)` cuts it off at character 80, `trimEnd()` removes any trailing whitespace, and the ellipsis string is appended. The result is what renders in the `<p>` tag.

---

## Slide 38: Custom Pipe — Using It

```typescript
import { Component } from '@angular/core';
import { TruncatePipe } from './truncate.pipe';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [TruncatePipe],   // import your custom pipe the same way you'd import a component
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() title = '';
  @Input() body = '';
}
```

```html
<article>
  <!-- Passes 60 as the limit argument — overrides the default of 50 -->
  <h2>{{ title | truncate:60 }}</h2>

  <!-- Passes 120 as limit and overrides the default ellipsis -->
  <p>{{ body | truncate:120:'… read more' }}</p>
</article>
```

**What's happening:** `TruncatePipe` is added to `imports` exactly like any other standalone component or directive. In the template, `truncate:60` passes `60` as the `limit` argument — this overrides the default of `50`. Omitting the second argument means `ellipsis` stays at its default `'...'`. Pipes are composable: `{{ body | truncate:120 | uppercase }}` first truncates, then uppercases the result.

---

## Slide 39: Coming Up — Modern vs Classic Angular

### Legacy Contrast Section

You've been writing **modern Angular** all session — `@if`, `@for`, `@switch`, `@let`.

These were introduced in **Angular 17**. Before that, Angular used **structural directives**: `*ngIf`, `*ngFor`, `[ngSwitch]`.

**Why does this matter to you?**

- Real-world codebases are full of this older syntax
- You'll read it in Stack Overflow answers, blog posts, and open-source repos
- You may need to maintain or upgrade existing code
- Interviews may ask you to explain the difference

The next slides show **exactly what the old code looked like**, why it was painful, and how the modern syntax is cleaner. Each slide is clearly labeled to show which code is legacy and which is modern.

---

## Slide 40: Legacy *ngIf → Modern @if / @else

**LEGACY code (before Angular 17) — `*ngIf`:**
```html
<!-- LEGACY — *ngIf structural directive -->
<div *ngIf="isLoggedIn; else notLoggedIn">
  <p>Welcome back!</p>
</div>

<!-- LEGACY — the else block must be a separate ng-template defined below -->
<!-- Easy to lose track of which template ref belongs to which *ngIf -->
<ng-template #notLoggedIn>
  <p>Please log in.</p>
</ng-template>
```

**MODERN code (Angular 17+) — `@if`:**
```html
<!-- MODERN — @if block syntax -->
@if (isLoggedIn) {
  <p>Welcome back!</p>
} @else {
  <!-- else content lives right here, adjacent to the condition it belongs to -->
  <p>Please log in.</p>
}
```

**What changed and why:** The legacy pattern forced the else branch to be defined as a separate named template, often far away from the `*ngIf` it belonged to. If you misnamed the `#notLoggedIn` reference it would fail silently. Modern `@if` keeps everything together and reads top-to-bottom like JavaScript.

---

## Slide 41: Legacy *ngFor + trackBy → Modern @for track

**LEGACY code (before Angular 17) — `*ngFor`:**
```html
<!-- LEGACY — trackBy pointed to a method name on the class (and was optional) -->
<ul>
  <li *ngFor="let task of tasks; trackBy: trackByTaskId">
    {{ task.title }}
  </li>
</ul>
```

```typescript
// LEGACY — a separate boilerplate method was required in the component class
trackByTaskId(index: number, task: Task): number {
  return task.id;
}
```

**MODERN code (Angular 17+) — `@for`:**
```html
<!-- MODERN — track is inline, required at compile time, no class method needed -->
<ul>
  @for (task of tasks; track task.id) {
    <li>{{ task.title }}</li>
  }
</ul>
```

**What changed and why:** In legacy code `trackBy` was optional — beginners skipped it and Angular silently destroyed and rebuilt the entire list on every change. Modern `@for` requires `track` at compile time — the build fails without it. The boilerplate class method is gone; tracking is one inline expression.

---

## Slide 42: Legacy [ngSwitch] → Modern @switch / @case

**LEGACY code (before Angular 17) — `[ngSwitch]`:**
```html
<!-- LEGACY — requires three separate directives working together -->
<div [ngSwitch]="status">
  <span *ngSwitchCase="'active'"  class="badge green">Active</span>
  <span *ngSwitchCase="'pending'" class="badge yellow">Pending</span>
  <span *ngSwitchCase="'error'"   class="badge red">Error</span>
  <span *ngSwitchDefault          class="badge grey">Unknown</span>
</div>
```

**MODERN code (Angular 17+) — `@switch`:**
```html
<!-- MODERN — clean block syntax, no wrapper element required -->
@switch (status) {
  @case ('active')  { <span class="badge green">Active</span> }
  @case ('pending') { <span class="badge yellow">Pending</span> }
  @case ('error')   { <span class="badge red">Error</span> }
  @default          { <span class="badge grey">Unknown</span> }
}
```

**What changed and why:** The legacy version required three separate imports (`NgSwitch`, `NgSwitchCase`, `NgSwitchDefault`) in standalone components — missing one produced a confusing error. It also needed a real wrapper `<div>` in the DOM to hold the `[ngSwitch]` binding. Modern `@switch` needs no imports, no wrapper, and reads like a JavaScript switch statement.

---

## Slide 43: Legacy *ngIf as → Modern @let

**LEGACY code (before Angular 17) — `*ngIf as`:**
```html
<!-- LEGACY — *ngIf "as" ties aliasing and null-guarding together in one expression -->
<div *ngIf="getUserFullName() as name">
  <h2>{{ name }}</h2>
  <p>{{ name | uppercase }}</p>
</div>
<!-- Problem: if getUserFullName() returns null or '', the ENTIRE block disappears -->
<!-- Couldn't use this alias outside of an *ngIf context at all -->
```

**MODERN code (Angular 18+) — `@let`:**
```html
<!-- MODERN — @let creates a template alias with no side effects -->
@let name = getUserFullName();
<h2>{{ name }}</h2>
<p>{{ name | uppercase }}</p>

<!-- Null-guarding is now explicit and separate when you actually want it -->
@if (name) {
  <h2>{{ name }}</h2>
}
```

**What changed and why:** The `*ngIf as` pattern bundled two unrelated concerns — creating an alias and null-guarding the block — into a single expression. If the value was falsy, the whole block disappeared, which was often not the intent. Modern `@let` does exactly one thing: creates a template alias. When you want null-guarding, you use `@if` for it explicitly. Each tool does one job.

---

## Slide 44: Key Takeaways

- **`ng-content`** lets you build wrapper components that don't care what goes inside them — use `select` for named slots when you need multiple injection points

- **`@if`, `@for`, `@switch`, and `@let`** are Angular's modern control-flow syntax — they read like JavaScript, are block-scoped, and ship with safety features like required `track` in `@for`

- **Pipes transform display values, not data** — use built-ins like `date`, `currency`, and `json` for common formatting; write your own pure pipe with `@Pipe` and `transform()` when you need custom logic

- **Pure pipes only re-run when the input reference changes** — always replace arrays and objects instead of mutating them, or your pipe will silently serve stale data

- **Legacy structural directives (`*ngIf`, `*ngFor`, `[ngSwitch]`)** still exist in millions of codebases — you'll read them constantly, but write modern `@if`/`@for`/`@switch` in all new code
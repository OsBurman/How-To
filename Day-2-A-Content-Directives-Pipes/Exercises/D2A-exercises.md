# Day 2 Part A — Exercises

## Workspace Setup

All exercises in this folder share a single npm workspace. Before starting any exercise:

```bash
cd Day-2-A-Content-Directives-Pipes/Exercises
npm install
```

This installs all Angular dependencies **once** into a shared `node_modules/` at this root folder.
Every exercise subfolder uses the same packages — you never need to run `npm install` inside an
individual exercise folder.

To serve an exercise:

```bash
cd Exercise-1-Alert-Box
npx ng serve
```

Stop the dev server with `Ctrl+C` before switching to the next exercise.

---

## Exercise 1: Wrap It Up

**Difficulty:** BEGINNER
**Concepts practiced:** `ng-content` single-slot projection

### What You're Building

An `AlertBoxComponent` that wraps any projected content in a styled alert card. The parent
decides what message goes inside — the component just provides the border, icon, and padding.
This exercise builds the muscle memory for ng-content before named slots are introduced.

### Instructions

1. Open `Exercise-1-Alert-Box/` and run `npx ng serve`. You will see a bare page with no styled alerts — the starter code renders `<app-alert-box>` tags but nothing shows up inside them yet.
2. Open `src/app/alert-box/alert-box.component.html`. Find the `<!-- TODO -->` comment. Replace it with a single `<ng-content>` element to project whatever the parent puts inside the tags.
3. Open `src/app/app.component.html`. Notice there are three `<app-alert-box>` elements, each with different HTML content inside their tags.
4. Save and verify: each alert box now renders the content its parent provided — a heading and paragraph in the first, a plain message in the second, a list in the third.
5. Open `src/app/alert-box/alert-box.component.css`. Add a left border and background colour to the `.alert-box` wrapper to make the projection visually obvious.

### Acceptance Criteria

- [ ] `<ng-content>` appears exactly once in `alert-box.component.html`
- [ ] All three alert boxes in `app.component.html` display their projected content
- [ ] The alert box wrapper applies its own styles (border, padding, background)
- [ ] The projected content inherits no unwanted styles from the wrapper
- [ ] No console errors

### Hints

**Hint 1 — What ng-content does:** `<ng-content>` is a placeholder. Angular replaces it with
whatever HTML the parent put between the component's opening and closing tags.

**Hint 2 — No imports needed:** `ng-content` is a built-in Angular instruction, not a
directive. You do not import anything to use it.

**Hint 3 — Nothing to see without it:** If you remove `<ng-content>`, the projected HTML
is silently discarded. No error, just silence. This is Angular's default behaviour.

---

## Exercise 2: Profile Card with Named Slots

**Difficulty:** BEGINNER
**Concepts practiced:** Named `ng-content` slots with `select`, `ngAfterContentInit`

### What You're Building

A `ProfileCardComponent` with three named content slots: a header (avatar and name), a body
(bio text), and a footer (action buttons). The parent fills each slot independently.
`ngAfterContentInit` logs a message to the console when projection is complete.

### Instructions

1. Open `Exercise-2-Profile-Card/` and run `npx ng serve`. The starter renders a `<app-profile-card>` but all three slot areas are empty.
2. Open `src/app/profile-card/profile-card.component.html`. There are three `<!-- TODO -->` comments where each `<ng-content>` slot belongs.
   - Replace the first comment with `<ng-content select="[card-header]"></ng-content>`
   - Replace the second comment with `<ng-content select="[card-body]"></ng-content>`
   - Replace the third comment with `<ng-content select="[card-footer]"></ng-content>`
3. Open `src/app/profile-card/profile-card.component.ts`. Find the `TODO` comment for `ngAfterContentInit`. Implement the `AfterContentInit` interface and add a `ngAfterContentInit()` method that calls `console.log('Profile card content projected!')`.
4. Open `src/app/app.component.html`. There is a `<app-profile-card>` element with child elements that have the matching slot attributes (`card-header`, `card-body`, `card-footer`). Save and verify each section appears in the right place.
5. Open the browser DevTools console. Confirm the log message appears after the card renders.
6. Add a second `<app-profile-card>` in `app.component.html` with different content. Confirm the log fires once per card instance.

### Acceptance Criteria

- [ ] Three named `<ng-content select="...">` slots appear in `profile-card.component.html`
- [ ] The parent uses matching attribute selectors to place content in the correct slots
- [ ] `ngAfterContentInit` is implemented and logs a message to the console
- [ ] The log appears once per component instance (twice if two cards are rendered)
- [ ] Content placed in the wrong slot attribute does not appear (Angular ignores unmatched content)
- [ ] No console errors

### Hints

**Hint 1 — select syntax:** The `select` attribute takes a CSS selector. Attribute selectors
like `select="[card-header]"` match any element that has the `card-header` attribute —
e.g., `<div card-header>` or `<header card-header>`.

**Hint 2 — Implement the interface:** Import `AfterContentInit` from `@angular/core`, add it
to the `implements` clause, and add the `ngAfterContentInit()` method. Angular calls it once
after projection is complete.

**Hint 3 — ngAfterContentInit vs ngOnInit:** `ngOnInit` fires before projection. If you log
in `ngOnInit`, the slots are not yet filled. `ngAfterContentInit` fires after — that's the
hook that guarantees the content has arrived.

---

## Exercise 3: Task List with Control Flow

**Difficulty:** BEGINNER
**Concepts practiced:** `@if` / `@else`, `ng-template`, `@for` with `track`, `ng-container`, `@let`

### What You're Building

A task list that renders each task with `@for`, shows an empty-state message via `@else` when
the list is empty, and uses `@let` to compute a count of incomplete tasks that is displayed in
both the header and list summary — without computing it twice.

### Instructions

1. Open `Exercise-3-Task-List/` and run `npx ng serve`. The starter shows an unordered list placeholder with TODO comments.
2. Open `src/app/task-list/task-list.component.ts`. A `tasks` array is already defined. Look at its shape — each task has `id`, `title`, `completed`, and `dueDate` properties.
3. Open `src/app/task-list/task-list.component.html`. Complete the following steps in the template:
   a. Add `@let incompleteTasks = tasks | filter:'completed':false;` at the top of the template to define a local variable. *(Note: a `FilterPipe` is already provided in the starter — import it in the component's `imports` array.)*
   b. Use `{{ incompleteTasks.length }}` in the `<h2>` header to show the incomplete count.
   c. Wrap the `@for` loop inside an `@if (tasks.length > 0)` block, with an `@else emptyState` fallback.
   d. Define `#emptyState` as an `<ng-template>` containing a paragraph that says `No tasks yet. Add one above.`
   e. Inside the `@for` block, use `@for (task of tasks; track task.id)` to iterate and render a `<li>` for each task.
   f. Inside each `<li>`, use `ng-container` to group the task title and due date without adding an extra DOM element.
   g. Also inside the loop, show `{{ incompleteTasks.length }} remaining` in a footer line — demonstrating that `@let` is available throughout the template.
4. Temporarily set the `tasks` array to `[]` in the component. Confirm the empty-state template renders. Restore the array.

### Acceptance Criteria

- [ ] `@let` defines `incompleteTasks` at the template level and is used in at least two places
- [ ] `@if` / `@else` with an `ng-template` reference handles the empty state
- [ ] `@for` iterates over tasks using `track task.id`
- [ ] `ng-container` is used inside the loop without adding visible DOM nodes
- [ ] Emptying the `tasks` array shows the `ng-template` fallback
- [ ] No console errors

### Hints

**Hint 1 — @let scope:** A `@let` variable defined at the template root is available anywhere
in that template. Treat it like a `const` — read-only, re-evaluated on every change detection run.

**Hint 2 — ng-template reference:** Write `<ng-template #emptyState>` and then reference it
in the `@else` block: `@if (tasks.length > 0) { ... } @else { <ng-template [ngTemplateOutlet]="emptyState" /> }`. Or use the block shorthand: `@else (emptyState)`.

**Hint 3 — ng-container in a loop:** `<ng-container>` is invisible in the DOM. Use it when
you need to group sibling elements inside a loop without wrapping them in a `<div>`.

**Hint 4 — track is required:** `@for` will not compile without a `track` expression. Always
track by a unique, stable identifier like `task.id`.

---

## Exercise 4: Order Status Badge

**Difficulty:** BEGINNER
**Concepts practiced:** `@switch` / `@case`, `[ngClass]`

### What You're Building

An order tracker that displays a list of orders. Each order has a `status` property
(`'pending'`, `'processing'`, `'shipped'`, `'delivered'`, `'cancelled'`). Use `@switch` to
render a different label for each status, and `[ngClass]` to apply the matching colour class.

### Instructions

1. Open `Exercise-4-Status-Badge/` and run `npx ng serve`. The starter renders a plain list of orders with raw status text. No colour, no labels.
2. Open `src/app/order-list/order-list.component.html`.
3. Inside each order row, replace the raw `{{ order.status }}` text with a `@switch (order.status)` block:
   - `@case ('pending')` → render `<span>Pending</span>`
   - `@case ('processing')` → render `<span>Processing</span>`
   - `@case ('shipped')` → render `<span>Shipped</span>`
   - `@case ('delivered')` → render `<span>Delivered</span>`
   - `@case ('cancelled')` → render `<span>Cancelled</span>`
   - `@default` → render `<span>Unknown</span>`
4. Add `[ngClass]` to each `<span>` to apply a CSS class that matches the status:
   - Use the object syntax: `[ngClass]="{ 'badge-pending': order.status === 'pending', 'badge-shipped': order.status === 'shipped', ... }"`
   - **Or** use the string-expression shorthand: `[ngClass]="'badge-' + order.status"`
5. Open `src/app/order-list/order-list.component.css` and define `.badge-pending`, `.badge-processing`, `.badge-shipped`, `.badge-delivered`, and `.badge-cancelled` with distinct background colours.
6. Confirm `NgClass` is imported from `@angular/common` in the component's `imports` array.

### Acceptance Criteria

- [ ] `@switch` / `@case` is used to render human-readable status labels
- [ ] `@default` handles any unrecognised status value
- [ ] `[ngClass]` applies a distinct colour class for each status
- [ ] The CSS classes are scoped to the component (component-level styles file)
- [ ] `NgClass` is imported in the component's `imports` array
- [ ] No console errors

### Hints

**Hint 1 — @switch syntax:** Unlike JavaScript `switch`, Angular's `@switch` uses `@case`
and `@default` blocks (no `break` needed). The matched block renders; others are ignored.

**Hint 2 — [ngClass] string shorthand:** `[ngClass]="'badge-' + order.status"` builds the
class name dynamically from the data. Make sure the resulting class name matches what you
defined in CSS.

**Hint 3 — Import NgClass:** `NgClass` must be in the component's `imports: []` array. It
lives in `@angular/common`. Without it, the binding silently does nothing.

---

## Exercise 5: Style Playground

**Difficulty:** BEGINNER
**Concepts practiced:** `[ngStyle]`, `[ngClass]`

### What You're Building

A text preview panel where the user can change font size, text colour, and background colour
using input controls. `[ngStyle]` applies the dynamic inline styles; `[ngClass]` toggles a
bold class and a high-contrast mode class.

### Instructions

1. Open `Exercise-5-Style-Playground/` and run `npx ng serve`. The starter shows a preview box and three input controls (a range slider, a colour picker, and a background colour picker). None of the controls affect the preview yet.
2. Open `src/app/app.component.ts`. Three properties are already declared:
   - `fontSize: number = 16` (bound to the range slider)
   - `textColor: string = '#222222'` (bound to the text colour picker)
   - `bgColor: string = '#ffffff'` (bound to the background colour picker)
   - `isBold: boolean = false` (bound to a checkbox)
   - `highContrast: boolean = false` (bound to a checkbox)
3. Open `src/app/app.component.html`. Find the preview `<div>` with the `<!-- TODO [ngStyle] -->` comment. Add `[ngStyle]` with an object that sets:
   - `font-size` from `fontSize` (append `'px'`)
   - `color` from `textColor`
   - `background-color` from `bgColor`
4. On the same `<div>`, add `[ngClass]` with an object that applies:
   - `'text-bold'` when `isBold` is `true`
   - `'high-contrast'` when `highContrast` is `true`
5. Ensure the inputs use `[(ngModel)]` (starter already has `FormsModule` imported).
6. Define `.text-bold` and `.high-contrast` classes in `app.component.css`.
7. Move the sliders and colour pickers — verify the preview updates live.

### Acceptance Criteria

- [ ] `[ngStyle]` on the preview box sets `font-size`, `color`, and `background-color` from component properties
- [ ] `[ngClass]` toggles `text-bold` and `high-contrast` classes based on checkbox state
- [ ] All input controls are bound with `[(ngModel)]`
- [ ] Changes to controls reflect immediately in the preview
- [ ] `NgClass` and `NgStyle` are imported from `@angular/common`
- [ ] No console errors

### Hints

**Hint 1 — [ngStyle] object syntax:** `[ngStyle]="{ 'font-size': fontSize + 'px', 'color': textColor }"`.
CSS property names with a hyphen must be quoted in the object key.

**Hint 2 — [ngClass] object syntax:** `[ngClass]="{ 'text-bold': isBold, 'high-contrast': highContrast }"`.
Each key is a CSS class name (quoted), each value is a boolean expression.

**Hint 3 — Import NgStyle:** Like `NgClass`, `NgStyle` must be imported from `@angular/common`
in the component's `imports` array.

---

## Exercise 6: Product Catalogue

**Difficulty:** BEGINNER
**Concepts practiced:** Built-in pipes — `date`, `currency`, `uppercase`

### What You're Building

A product catalogue that displays a list of products with their launch date, price, and
category. Format dates with the `date` pipe, prices with the `currency` pipe, and category
names with the `uppercase` pipe. Chain pipes where it makes sense.

### Instructions

1. Open `Exercise-6-Product-Catalogue/` and run `npx ng serve`. The starter renders raw unformatted data — dates as ISO strings, prices as plain numbers, categories in lowercase.
2. Open `src/app/product-list/product-list.component.html`.
3. Find the date binding. Change it from `{{ product.launchDate }}` to `{{ product.launchDate | date:'mediumDate' }}`.
4. Find the price binding. Change it from `{{ product.price }}` to `{{ product.price | currency }}`.
5. Find the category binding. Change it from `{{ product.category }}` to `{{ product.category | uppercase }}`.
6. For one product, try chaining pipes: `{{ product.category | uppercase | slice:0:10 }}` — verify the pipe chain works left to right.
7. Try alternative format arguments:
   - Change `'mediumDate'` to `'longDate'` and observe the difference.
   - Change `currency` to `currency:'EUR'` and `currency:'GBP':'symbol'` to see how arguments work.
8. Open `src/app/product-list/product-list.component.ts`. Confirm `DatePipe`, `CurrencyPipe`, and `UpperCasePipe` are imported from `@angular/common` in the `imports` array.

### Acceptance Criteria

- [ ] All dates are formatted with the `date` pipe (not raw ISO strings)
- [ ] All prices are formatted with the `currency` pipe
- [ ] All category names are displayed with `uppercase`
- [ ] At least one pipe uses a format argument (e.g., `date:'longDate'`)
- [ ] At least one example chains two pipes
- [ ] All pipe imports are present in the component's `imports` array
- [ ] No console errors

### Hints

**Hint 1 — Pipe syntax:** `{{ value | pipeName }}` for basic use, `{{ value | pipeName:arg1:arg2 }}`
for arguments. The pipe name matches the pipe's registered name — always lowercase with dashes.

**Hint 2 — Chaining:** `{{ value | pipe1 | pipe2 }}` applies left to right. The output of
`pipe1` becomes the input of `pipe2`. Types must be compatible at each step.

**Hint 3 — Standalone pipe imports:** In standalone components, each pipe class must be in
the `imports` array. `DatePipe`, `CurrencyPipe`, `UpperCasePipe`, and `SlicePipe` all live in
`@angular/common`.

---

## Exercise 7: Build a WordCount Pipe

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Custom pure pipe with `transform()`, pure vs impure pipe behaviour

### What You're Building

Two custom pipes:

1. **`WordCountPipe`** — takes a string and returns the number of words as `"N words"`.
2. **`ExcerptPipe`** — truncates a string at the nearest word boundary before a configurable character limit, appending `"…"` if truncated.

After building both, you will observe how pure pipe behaviour interacts with array mutation
— and why you must create a new array reference to trigger a re-render.

### Instructions

**Part A — WordCountPipe**

1. Open `Exercise-7-Word-Count-Pipe/` and run `npx ng serve`. The starter shows a text area and a stats panel. No word count appears yet.
2. Open `src/app/pipes/word-count.pipe.ts`. There is a `@Pipe` decorator with `name: 'wordCount'` and a `transform()` method stub. Implement `transform(value: string): string` to:
   - Split the string on whitespace: `value.trim().split(/\s+/)`
   - Filter out empty strings (handles leading/trailing spaces)
   - Return `"N words"` (e.g., `"12 words"`)
3. Open `app.component.html`. Apply the pipe: `{{ message | wordCount }}`.

**Part B — ExcerptPipe**

4. Open `src/app/pipes/excerpt.pipe.ts`. Implement `transform(value: string, limit: number = 80): string`:
   - If `value.length <= limit`, return `value` unchanged.
   - Otherwise, find the last space before `limit`, slice to that index, and append `'…'`.
5. Apply it in the template: `{{ article.body | excerpt:120 }}`.

**Part C — Pure Pipe Behaviour Observation**

6. Open `app.component.ts`. There is a `notes` array and an `addNote()` method. The method currently uses `this.notes.push(newNote)` — it **mutates** the existing array.
7. In the template, `notes` is rendered through a hypothetical `filter` pipe that shows only non-empty notes.
8. Click "Add Note" and observe that the list does NOT update. Open the `TODO` comment in `addNote()` and change the push to `this.notes = [...this.notes, newNote]` — a new array reference.
9. Click "Add Note" again. Confirm the list now updates. Add the comment `// New reference required — pure pipe only re-runs when input reference changes` next to your fix.

### Acceptance Criteria

- [ ] `WordCountPipe` counts words correctly, including strings with multiple spaces
- [ ] `ExcerptPipe` truncates at a word boundary (not mid-word) and appends `'…'`
- [ ] `ExcerptPipe` accepts an optional `limit` argument (default `80`)
- [ ] Both pipes are decorated with `@Pipe({ name: '...', standalone: true, pure: true })`
- [ ] Both pipes are imported in the component's `imports` array
- [ ] The mutation observation is completed and the fix is commented
- [ ] No console errors

### Hints

**Hint 1 — @Pipe decorator:** Every pipe needs `@Pipe({ name: 'myPipe', standalone: true })`.
The `name` is what you use in the template: `{{ value | myPipe }}`.

**Hint 2 — PipeTransform:** Import `PipeTransform` from `@angular/core` and implement it:
`export class WordCountPipe implements PipeTransform`. The interface requires `transform()`.

**Hint 3 — Pure pipe and references:** A pure pipe re-runs only when the input reference
changes. For primitives (strings, numbers), any change is a new reference. For objects and
arrays, the reference only changes if you assign a new object/array — mutation is invisible.

**Hint 4 — Finding the last space:** `value.lastIndexOf(' ', limit)` returns the index of
the last space at or before `limit`. Use that index to slice.

---

## Exercise 8: Event Dashboard

**Difficulty:** CHALLENGE
**Concepts practiced:** Named `ng-content` slots, `@for` with `track`, `@if` / `@else`, `@switch` / `@case`, `@let`, `ng-container`, `[ngClass]`, `[ngStyle]`, `date` pipe, `currency` pipe, `uppercase` pipe, custom pure pipe

### What You're Building

An events dashboard that combines every concept from Day 2 Part A. You will:

- Build an `EventCardComponent` with three named ng-content slots: image, title/meta, and actions.
- Display a list of events using `@for` with `track`.
- Use `@if` / `@else` to handle an empty list with an `ng-template` fallback.
- Use `@let` to compute the count of upcoming events and show it in both the header and a summary line.
- Use `@switch` to render a different label and colour for each event category (`'music'`, `'sport'`, `'tech'`, `'food'`).
- Apply `[ngClass]` for category badge colours.
- Apply `[ngStyle]` to set the event card's accent border colour dynamically.
- Format the event date with `| date:'fullDate'`, ticket price with `| currency`, and category with `| uppercase`.
- Use the `ExcerptPipe` from Exercise 7 (provided in the starter) to truncate event descriptions.
- Use `ng-container` inside the `@for` loop to group elements without adding DOM nodes.

### Instructions

1. Open `Exercise-8-Event-Dashboard/` and run `npx ng serve`. The starter renders raw event data in a plain list. Study the `Event` interface and the sample `events` array in `app.component.ts`.
2. **Build `EventCardComponent`:**
   - Add three named slots: `[event-image]`, `[event-meta]`, `[event-actions]`
   - Add a `borderColor` input (`@Input() borderColor: string = '#ccc'`) and use `[ngStyle]` to apply it as a left border on the card wrapper
   - Log a message in `ngAfterContentInit`
3. **Build the template in `app.component.html`:**
   - Add `@let upcomingCount = events | filter:'isPast':false;` at the top *(a `FilterPipe` is provided)*
   - Use `upcomingCount.length` in the `<h1>` header and in a summary paragraph at the bottom
   - Wrap the list in `@if (events.length > 0) { ... } @else { <ng-template [ngTemplateOutlet]="noEvents" /> }`
   - Define `<ng-template #noEvents>` with a friendly empty-state message
   - Iterate with `@for (event of events; track event.id)`
   - Inside each iteration, use `ng-container` to group the `@switch` block and the `<app-event-card>` together
   - Use `@switch (event.category)` to set a `categoryLabel` local variable... wait — `@let` can't be set inside a `@switch`. Instead, move the category label logic into the component class as a method: `getCategoryLabel(category: string): string`
   - Apply `[ngClass]` on the category badge using `'badge-' + event.category`
   - Fill the three named slots of `<app-event-card>` from the parent
   - Format `event.date | date:'fullDate'`, `event.price | currency`, `event.category | uppercase`, `event.description | excerpt:100`
4. Define badge CSS classes in `app.component.css`.
5. Verify the empty state shows when `events = []`.

### Acceptance Criteria

- [ ] `EventCardComponent` has three named `ng-content` slots with `select` attributes
- [ ] `ngAfterContentInit` logs in `EventCardComponent`
- [ ] `@let` computes `upcomingCount` and it appears in two places in the template
- [ ] `@if` / `@else` with `ng-template` handles the empty state
- [ ] `@for` iterates with `track event.id`
- [ ] `ng-container` is used inside the loop
- [ ] `@switch` or a class method handles category labels
- [ ] `[ngClass]` applies category badge colours
- [ ] `[ngStyle]` applies a dynamic border colour to each card
- [ ] `date`, `currency`, `uppercase`, and `ExcerptPipe` are all used in the template
- [ ] No console errors

### Hints

**Hint 1 — Named slot order:** The order of `<ng-content>` elements in the child template
determines layout, not the order the parent provides them. Structure the card layout in the
child; fill the slots in any order from the parent.

**Hint 2 — @let limitation:** `@let` creates a read-only snapshot. You cannot assign to it
conditionally (e.g., inside `@switch`). For conditional logic that produces a value, move it
to a component method or use a pipe.

**Hint 3 — Pipe chaining:** `{{ event.price | currency:'USD':'symbol':'1.2-2' }}` is a
fully qualified currency format. Start simple with just `| currency` and refine from there.

**Hint 4 — ng-container and @switch:** Wrap `@switch` in `<ng-container>` so it groups
branches without adding a visible element.

---

## Exercise 9: ⚠️ LEGACY — Convert a Legacy Listing App

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Recognising `*ngIf`, `*ngFor` with `trackBy`, `[ngSwitch]` / `*ngSwitchCase`, NgModule pipe declarations — converting all to modern Angular 17+ patterns

> **What this exercise is for:** You will be handed a fully working Angular app built with
> the legacy patterns used before Angular 17. Your job is not to master the legacy syntax —
> it is to **recognise** it, understand what it does, and convert it to the modern patterns
> you learned today. After this exercise, you will be able to read legacy codebases and know
> exactly what needs to change.

### What You're Building

You are converting a **Book Listing** app from legacy NgModule + structural directives to
modern standalone components with `@if`, `@for`, `@switch`, and standalone pipes.

The legacy app is fully functional — run it first, understand what it does, then convert it.

### Instructions

**Step 1 — Run the legacy app**

1. Open `Exercise-9-Legacy-NgModule/` and run `npx ng serve`.
2. Explore the running app: it lists books, filters by genre, shows a status badge per book, and formats prices with a currency pipe.
3. Open `src/app/app.module.ts`. Identify every declaration, import, and provider. Notice `BookCardComponent`, `StatusBadgeComponent`, `CurrencyPipe`, and `TruncatePipe` are all declared here.
4. Open `src/app/book-list/book-list.component.html`. Identify each structural directive: `*ngIf`, `*ngFor`, `[ngSwitch]`, `*ngSwitchCase`.
5. Open `src/app/pipes/truncate.pipe.ts`. Notice it is declared in `AppModule`, not imported directly into the component.

**Step 2 — Convert to modern patterns**

Skeleton modern files are already in `Exercise-9-Legacy-NgModule/src/app/modern/` with TODO
comments. Fill them in:

6. Convert `AppModule` → delete it. Move `bootstrapModule` in `main.ts` to `bootstrapApplication` with an `app.config.ts`.
7. Convert `BookListComponent` to standalone:
   - Add `standalone: true` to `@Component`
   - Add the required imports: `NgClass`, `NgStyle`, `DatePipe`, `CurrencyPipe`, `UpperCasePipe`, `TruncatePipe`, `BookCardComponent`, `StatusBadgeComponent`
   - Replace `*ngIf` with `@if` / `@else` + `ng-template`
   - Replace `*ngFor="let book of books; trackBy: trackById"` with `@for (book of books; track book.id)`
   - Replace `[ngSwitch]` + `*ngSwitchCase` with `@switch` / `@case`
8. Convert `BookCardComponent` and `StatusBadgeComponent` to standalone.
9. Convert `TruncatePipe` to standalone (add `standalone: true` to `@Pipe`).
10. Serve the converted app and verify it looks and behaves exactly like the legacy version.

### Acceptance Criteria

- [ ] `AppModule` is removed; `bootstrapApplication` is used in `main.ts`
- [ ] All components have `standalone: true` and their own `imports` arrays
- [ ] `*ngIf` is replaced with `@if` / `@else`
- [ ] `*ngFor` with `trackBy` is replaced with `@for` using `track`
- [ ] `[ngSwitch]` / `*ngSwitchCase` is replaced with `@switch` / `@case`
- [ ] `TruncatePipe` has `standalone: true` and is imported directly into the component that uses it
- [ ] The converted app produces the same visual output as the legacy version
- [ ] No console errors

### Hints

**Hint 1 — Do not delete legacy files until you're done:** Keep the legacy files alongside
the modern ones while you work. Use the legacy version as a reference for what the output
should look like.

**Hint 2 — Structural directive → block syntax mapping:**
  - `*ngIf="expr"` → `@if (expr) { ... }`
  - `*ngIf="expr; else #tmpl"` → `@if (expr) { ... } @else { <ng-template [ngTemplateOutlet]="tmpl" /> }`
  - `*ngFor="let x of list; trackBy: fn"` → `@for (x of list; track x.id)`
  - `[ngSwitch]="val"` + `*ngSwitchCase="'a'"` → `@switch (val) { @case ('a') { ... } }`

**Hint 3 — Pipe declarations vs imports:** In NgModule, pipes are declared in `declarations`
and shared with all components in the module. In standalone, each component imports the pipes
it uses directly in its own `imports` array.

**Hint 4 — bootstrapApplication signature:** `bootstrapApplication(AppComponent, appConfig)`
where `appConfig` is exported from `app.config.ts` and contains a `providers` array.

---

> **Solutions are in `Day-2-A-Content-Directives-Pipes/Exercises-Solutions/`.**
> Each exercise has its own `Exercise-N-Solution/` folder. Compare your work file by file
> once you've attempted the exercise — the solutions follow the same multi-file component
> rules as the starter code.

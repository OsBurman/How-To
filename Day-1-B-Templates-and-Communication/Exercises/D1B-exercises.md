# Day 1 Part B — Exercises

## Exercise 1: Display and Bind

**Difficulty:** BEGINNER
**Concepts practiced:** Interpolation `{{ }}`, property binding `[]`, event binding `()`

### What You're Building

A greeting card component that displays a user's name via interpolation, disables a button via property binding when the name is empty, and responds to a button click via event binding. This exercise practices three of the four binding types individually before combining them.

### Instructions

1. Open `Exercise-1-Display-and-Bind/` and explore the starter code. The `AppComponent` has a `userName` property set to `'Angela'` and a `clickCount` property set to `0`.
2. Open `app.component.html`. Find the `<h1>` element and use **interpolation** to display: `Hello, {{ userName }}!`
3. Below the heading, find the `<p>` element. Use interpolation to display: `You have clicked {{ clickCount }} times.`
4. Find the `<button>` element. Add **property binding** to set its `disabled` property: `[disabled]="userName.length === 0"`. This disables the button when the name is empty.
5. On the same button, add **event binding**: `(click)="onGreet()"`. Open `app.component.ts` and implement the `onGreet()` method so that it increments `clickCount` by 1.
6. Below the button, add a second `<p>` tag. Use **interpolation** with an expression: `{{ clickCount > 0 ? 'Thanks for clicking!' : 'Go ahead, click the button.' }}`
7. Save all files and run `npx ng serve`. Verify the greeting shows "Hello, Angela!", the button is enabled, and clicking it updates the count.
8. Test the property binding: in `app.component.ts`, temporarily change `userName` to `''`. Save and verify the button becomes disabled.

### Acceptance Criteria

- [ ] The heading displays the user's name via interpolation
- [ ] The click count updates on every button click
- [ ] The button is disabled when `userName` is an empty string
- [ ] The conditional message changes after the first click
- [ ] No TypeScript errors in the console

### Hints

**Hint 1 — Interpolation:** `{{ }}` evaluates any TypeScript expression — properties, math, ternaries, and method calls all work.

**Hint 2 — Property binding:** `[disabled]="expression"` sets the DOM `disabled` property to the boolean result of the expression. No quotes around `true`/`false` — Angular evaluates the expression.

**Hint 3 — Event binding:** `(click)="onGreet()"` calls the `onGreet` method on the component class. Make sure the method exists and is `public` (the default).

---

## Exercise 2: Two-Way Binding with ngModel

**Difficulty:** BEGINNER
**Concepts practiced:** Two-way binding `[(ngModel)]`, `FormsModule` import, interpolation

### What You're Building

A live message preview component. A `<textarea>` is bound to a `message` property via two-way binding. As the user types, a preview paragraph updates in real time, and a character count displays below it.

### Instructions

1. Open `Exercise-2-Two-Way-Binding/`. The starter code has an `AppComponent` with a `message: string = ''` property and a `maxLength: number = 100` property.
2. Open `app.component.ts`. Notice the `imports` array in the `@Component` decorator — it's empty. You need to add `FormsModule` here so `[(ngModel)]` works.
3. At the top of the file, add: `import { FormsModule } from '@angular/forms';`
4. Add `FormsModule` to the `imports` array: `imports: [FormsModule]`.
5. Open `app.component.html`. Find the `<textarea>` element. Add two-way binding: `[(ngModel)]="message"`.
6. Below the textarea, find the preview `<p>` element. Use interpolation to display: `Preview: {{ message }}`
7. Below that, add a character count `<p>`: `{{ message.length }} / {{ maxLength }} characters`
8. Add property binding on the textarea to set a max character visual cue: add `[class.over-limit]="message.length > maxLength"` to the `<textarea>`.
9. Save and run `npx ng serve`. Type in the textarea — the preview and count should update with every keystroke.
10. Test two-way binding: the preview is empty when the page loads (because `message` is `''`), and typing immediately shows text in both places.

### Acceptance Criteria

- [ ] `FormsModule` is imported in the component's `imports` array
- [ ] The textarea is bound with `[(ngModel)]="message"`
- [ ] The preview paragraph updates on every keystroke
- [ ] The character count displays current length and max
- [ ] The `over-limit` CSS class appears when the message exceeds `maxLength`
- [ ] No console errors

### Hints

**Hint 1 — FormsModule:** Without `FormsModule` in the component's `imports` array, `[(ngModel)]` silently does nothing. No error, just no binding. This is the #1 beginner trap.

**Hint 2 — Two-way syntax:** The "banana in a box" is `[()]` — square brackets outside, parentheses inside. `[(ngModel)]="message"` means Angular reads AND writes `message`.

**Hint 3 — Class binding:** `[class.over-limit]="expression"` adds the CSS class `over-limit` when the expression is `true`, and removes it when `false`.

---

## Exercise 3: Template Reference Variables

**Difficulty:** BEGINNER
**Concepts practiced:** Template reference variables `#ref`, event binding `()`, passing ref values to handlers

### What You're Building

A quick-add form with two inputs — a task name and a priority selector — and an "Add" button. Instead of two-way binding, you'll use template reference variables to read the input values only when the button is clicked.

### Instructions

1. Open `Exercise-3-Template-Refs/`. The `AppComponent` has a `tasks` array (type `{ name: string; priority: string }[]`) initialized to `[]` and a `lastAdded: string = ''` property.
2. Open `app.component.html`. Find the text input for the task name. Add a template reference variable: `#taskInput`.
3. Find the `<select>` element for priority. Add a template reference variable: `#prioritySelect`.
4. Find the "Add Task" button. Add event binding: `(click)="onAddTask(taskInput.value, prioritySelect.value)"`.
5. Open `app.component.ts`. Implement the `onAddTask(name: string, priority: string)` method:
   - Push `{ name, priority }` into `this.tasks`
   - Set `this.lastAdded` to the task name
6. Back in the template, find the "Last added" paragraph. Use interpolation to show: `Last added: {{ lastAdded }}`
7. Find the task count paragraph. Display: `Total tasks: {{ tasks.length }}`
8. Save and run. Type a task name, select a priority, click "Add Task." The count should increase and the last added name should display.

### Acceptance Criteria

- [ ] `#taskInput` is on the text input element
- [ ] `#prioritySelect` is on the select element
- [ ] Clicking "Add Task" reads both values and adds to the array
- [ ] The "Last added" text updates after each click
- [ ] The task count reflects the total items in the array
- [ ] No `FormsModule` import needed — this exercise uses refs, not ngModel

### Hints

**Hint 1 — Template refs:** `#taskInput` gives you a reference to the DOM element. Access its value with `taskInput.value` anywhere in the template.

**Hint 2 — Passing to handlers:** `(click)="onAddTask(taskInput.value, prioritySelect.value)"` reads the values at click time and passes them as arguments. The handler receives plain strings.

**Hint 3 — Refs vs ngModel:** Template refs read values on demand (when an event fires). Two-way binding syncs constantly on every keystroke. Use refs when you only need the value at a specific moment — like form submission.

---

## Exercise 4: Safe Navigation and Fallbacks

**Difficulty:** BEGINNER
**Concepts practiced:** Safe navigation `?.`, nullish coalescing `??`, interpolation

### What You're Building

A user profile display that handles three scenarios: a fully-loaded user, a partially-loaded user with missing address fields, and a null user (not logged in). You'll use `?.` to prevent crashes and `??` to provide meaningful fallback text.

### Instructions

1. Open `Exercise-4-Safe-Navigation/`. The `AppComponent` has a `UserProfile` interface with `name`, optional `email?`, and optional `address?` (with optional `street?`, `city?`, `zip?`).
2. The starter code has three properties already declared:
   - `fullUser` — has name, email, and a complete address
   - `partialUser` — has name but no email, and an address with only city (no street, no zip)
   - `noUser: UserProfile | null = null`
3. Open `app.component.html`. In the "Full Profile" card, display:
   - `{{ fullUser?.name }}` for the name
   - `{{ fullUser?.email }}` for the email
   - `{{ fullUser?.address?.city }}, {{ fullUser?.address?.zip }}` for location
4. In the "Partial Profile" card, use `?.` combined with `??` for fallbacks:
   - `{{ partialUser?.email ?? 'No email provided' }}`
   - `{{ partialUser?.address?.street ?? 'No street on file' }}`
   - `{{ partialUser?.address?.zip ?? 'N/A' }}`
5. In the "Guest" card, handle the null user:
   - `{{ noUser?.name ?? 'Anonymous' }}`
   - `{{ noUser?.email ?? 'guest@example.com' }}`
   - `{{ noUser?.address?.city ?? 'Unknown location' }}`
6. Save and run. The Full Profile card shows real data, the Partial Profile shows a mix of real data and fallbacks, and the Guest card shows all fallbacks.

### Acceptance Criteria

- [ ] Full Profile card displays all data without fallbacks
- [ ] Partial Profile card shows "No email provided" and "No street on file" as fallbacks
- [ ] Guest card shows "Anonymous," "guest@example.com," and "Unknown location"
- [ ] No runtime errors in the console — `?.` prevents crashes on null
- [ ] Every profile card renders without blank spaces (all missing data has `??` fallbacks)

### Hints

**Hint 1 — Safe navigation:** `?.` short-circuits when it hits null or undefined. `noUser?.name` returns `undefined` (not a crash) because `noUser` is `null`.

**Hint 2 — Nullish coalescing:** `??` only triggers on `null` and `undefined` — not on empty strings, `0`, or `false`. It's the right choice for "truly missing" data.

**Hint 3 — Chaining:** `partialUser?.address?.zip ?? 'N/A'` first safely navigates the chain, then applies the fallback if the result is null or undefined.

---

## Exercise 5: Parent-Child Communication

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `@Input()`, `@Output()`, `EventEmitter`, property binding `[]`, event binding `()`

### What You're Building

A color picker app with an `AppComponent` (parent) and a `ColorSwatchComponent` (child). The parent passes a color name and hex code to each swatch via `@Input()`. When the user clicks a swatch, the child emits the selected color to the parent via `@Output()`, and the parent displays which color was selected.

### Instructions

1. Open `Exercise-5-Parent-Child/`. The starter code has `AppComponent` with a `colors` array of objects: `{ name: string; hex: string }[]` and a `selectedColor: string = ''` property. A `ColorSwatchComponent` exists in `src/app/color-swatch/` with empty files.
2. Open `color-swatch.component.ts`. Add two `@Input()` properties:
   - `colorName: string = ''`
   - `hexCode: string = '#000000'`
3. Add an `@Output()` property: `colorSelected = new EventEmitter<string>()`.
4. Add an `onSelect()` method that calls `this.colorSelected.emit(this.colorName)`.
5. Open `color-swatch.component.html`. Create a `<div>` with:
   - Property binding: `[style.background-color]="hexCode"` to set the background
   - Event binding: `(click)="onSelect()"` to emit on click
   - Interpolation: `{{ colorName }}` to display the color name
6. Open `app.component.html`. The starter has TODO comments showing where to render the swatches. For each color in the array, add an `<app-color-swatch>` element with:
   - `[colorName]="'Crimson'"` (repeat for each color with correct values)
   - `[hexCode]="'#DC143C'"` (repeat with correct hex codes)
   - `(colorSelected)="onColorSelected($event)"`
7. Open `app.component.ts`. Implement `onColorSelected(color: string)` to set `this.selectedColor = color`.
8. In `app.component.html`, display: `Selected: {{ selectedColor }}` (with a fallback if empty: use `{{ selectedColor || 'Click a swatch to choose' }}`).
9. Don't forget to add `ColorSwatchComponent` to `AppComponent`'s `imports` array.
10. Save and run. Click any swatch — the selected color name should appear in the parent.

### Acceptance Criteria

- [ ] `ColorSwatchComponent` has `@Input() colorName` and `@Input() hexCode`
- [ ] `ColorSwatchComponent` has `@Output() colorSelected` with `EventEmitter<string>`
- [ ] Each swatch displays its color name and has the correct background color
- [ ] Clicking a swatch emits the color name to the parent
- [ ] The parent displays the selected color name
- [ ] `ColorSwatchComponent` is in `AppComponent`'s `imports` array
- [ ] No "not a known element" errors

### Hints

**Hint 1 — @Input():** `@Input() colorName: string = ''` marks the property as receivable. The parent sets it with `[colorName]="'Crimson'"`.

**Hint 2 — @Output():** `@Output() colorSelected = new EventEmitter<string>()` creates the event channel. Call `this.colorSelected.emit(value)` to fire it. The parent catches it with `(colorSelected)="handler($event)"`.

**Hint 3 — imports array:** If you see "app-color-swatch is not a known element," add `ColorSwatchComponent` to the `imports` array in `app.component.ts`.

**Hint 4 — Style binding:** `[style.background-color]="hexCode"` is property binding targeting an inline style. Angular sets the element's `background-color` CSS property to the value of `hexCode`.

---

## Exercise 6: Lifecycle Hooks in Action

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `ngOnInit`, `ngOnDestroy`, `@Input()`, interval timer, cleanup

### What You're Building

A countdown timer component. The parent passes a `startValue` via `@Input()`. The timer component uses `ngOnInit` to start an interval that decrements the count every second. When the component is removed, `ngOnDestroy` clears the interval to prevent a memory leak.

### Instructions

1. Open `Exercise-6-Lifecycle-Hooks/`. The `AppComponent` has a `showTimer: boolean = true` property and a `toggleTimer()` method that flips it. The template has a button bound to `toggleTimer()`.
2. A `CountdownComponent` exists in `src/app/countdown/` with starter files.
3. Open `countdown.component.ts`. Add:
   - `@Input() startValue: number = 10`
   - A `currentValue: number = 0` property
   - A `private timerId: number | null = null` property
   - A `status: string = 'Ready'` property
4. Implement `OnInit` interface. In `ngOnInit()`:
   - Set `this.currentValue = this.startValue` (uses the `@Input()` value — this is why we use ngOnInit, not the constructor)
   - Set `this.status = 'Running'`
   - Start an interval with `window.setInterval()` that decrements `currentValue` by 1 every second. When `currentValue` reaches 0, clear the interval and set `status` to `'Done!'`
   - Store the timer ID in `this.timerId`
5. Implement `OnDestroy` interface. In `ngOnDestroy()`:
   - Check if `timerId` is not null, then call `window.clearInterval(this.timerId)`
   - Set `this.timerId = null`
6. Open `countdown.component.html`. Display:
   - `{{ currentValue }}` as a large number
   - `{{ status }}` as the status text
7. Open `app.component.html`. The template already contains an `@if (showTimer)` block — this is a **micro-preview** of `@if` (covered fully on Day 2). For now, just know it adds/removes elements from the DOM. Place `<app-countdown [startValue]="15"></app-countdown>` inside the `@if` block. Add `CountdownComponent` to `AppComponent`'s `imports` array.
8. Save and run. The timer counts down from 15. Click the toggle button to hide the component (it gets destroyed), then show it again (it recreates and starts over from 15).
9. Open the browser console. Verify no interval keeps running after the component is hidden — `ngOnDestroy` should have cleared it.

### Acceptance Criteria

- [ ] `CountdownComponent` receives `startValue` via `@Input()`
- [ ] `ngOnInit` sets `currentValue` from the input and starts the interval
- [ ] The countdown decrements every second and displays the current value
- [ ] When count reaches 0, the interval stops and status shows "Done!"
- [ ] `ngOnDestroy` clears the interval when the component is removed
- [ ] Toggling the component off and on restarts the countdown cleanly — no ghost timers
- [ ] `CountdownComponent` is in `AppComponent`'s `imports` array

### Hints

**Hint 1 — ngOnInit, not constructor:** `this.startValue` is set by `@Input()`. In the constructor, it would still be the default value (10). In `ngOnInit`, it has the actual value the parent passed (15).

**Hint 2 — Storing the timer ID:** `this.timerId = window.setInterval(() => { ... }, 1000)` returns a number ID. Store it so you can call `window.clearInterval(this.timerId)` later.

**Hint 3 — Cleanup habit:** Every time you start something in `ngOnInit`, immediately write the cleanup code in `ngOnDestroy`. Don't wait until later — do it right away.

**Hint 4 — Conditional rendering:** The starter code provides an `@if (showTimer)` block. `@if` is covered fully on Day 2 — for now, just know that when the condition is `false`, Angular removes the element from the DOM (calling `ngOnDestroy`). When it becomes `true` again, Angular creates a fresh instance (calling `ngOnInit`). Just place your component inside the block.

---

## Exercise 7: Signals First Look

**Difficulty:** BEGINNER
**Concepts practiced:** `signal()`, `computed()`, reading signals with `()`, `.set()`, `.update()`

### What You're Building

A simple temperature converter. A `signal` holds a Celsius value. A `computed` signal derives the Fahrenheit equivalent. Buttons adjust the Celsius value, and both temperatures update automatically.

### Instructions

1. Open `Exercise-7-Signals-Preview/`. The `AppComponent` has starter code with TODO comments.
2. Open `app.component.ts`. At the top, add the imports: `import { signal, computed } from '@angular/core';`
3. In the class body, create a writable signal: `readonly celsius = signal(0);`
4. Create a computed signal that converts to Fahrenheit: `readonly fahrenheit = computed(() => this.celsius() * 9 / 5 + 32);`
5. Create a `description` computed signal: `readonly description = computed(() => ...)` that returns `'Freezing'` when celsius is 0 or below, `'Cold'` when below 15, `'Comfortable'` when below 25, and `'Hot'` when 25 or above.
6. Implement three methods:
   - `increaseTemp()`: `this.celsius.update(c => c + 1)`
   - `decreaseTemp()`: `this.celsius.update(c => c - 1)`
   - `resetTemp()`: `this.celsius.set(0)`
7. Open `app.component.html`. Display the signals — **remember the parentheses!**
   - `{{ celsius() }}°C`
   - `{{ fahrenheit() }}°F`
   - `{{ description() }}`
8. Wire the three buttons with event binding: `(click)="increaseTemp()"`, `(click)="decreaseTemp()"`, `(click)="resetTemp()"`.
9. Save and run. Click the buttons — both Celsius and Fahrenheit update together. The description changes as the temperature crosses thresholds.

### Acceptance Criteria

- [ ] `celsius` is a writable signal initialized to 0
- [ ] `fahrenheit` is a computed signal that derives from `celsius()`
- [ ] `description` is a computed signal with at least 3 temperature ranges
- [ ] All template displays use parentheses: `{{ celsius() }}`, `{{ fahrenheit() }}`, `{{ description() }}`
- [ ] Increase, decrease, and reset buttons all work correctly
- [ ] Fahrenheit and description update automatically when Celsius changes
- [ ] No `effect()` used — only `signal()` and `computed()`

### Hints

**Hint 1 — Reading signals:** In the template, `{{ celsius() }}` with parentheses — this is a function call. Without parentheses, you'd display the signal object itself (not the value).

**Hint 2 — .update() vs .set():** `.update(c => c + 1)` transforms the current value. `.set(0)` replaces the current value entirely. Use `.update()` when you need the current value, `.set()` when you don't.

**Hint 3 — computed():** `computed(() => this.celsius() * 9 / 5 + 32)` — the arrow function reads `celsius()`. Angular tracks this dependency. When `celsius` changes, `fahrenheit` automatically recalculates. You never manually update a computed signal.

**Hint 4 — Day 2 preview:** Don't worry if signals feel unfamiliar. We'll cover them thoroughly tomorrow. For now, just practice the syntax: `signal()` to create, `()` to read, `.set()` and `.update()` to write, `computed()` for derived values.

---

## Exercise 8: Feedback Form Challenge

**Difficulty:** CHALLENGE
**Concepts practiced:** All four binding types, template reference variables, `@Input()`, `@Output()`, `EventEmitter`, `ngOnInit`, safe navigation `?.`, nullish coalescing `??`

### What You're Building

A feedback form app with two components. A `FeedbackFormComponent` (child) accepts a `productName` via `@Input()`, uses two-way binding for a rating textarea, a template ref for a reviewer name input, and emits the completed feedback to `AppComponent` (parent) via `@Output()`. The parent displays submitted feedback using safe navigation and nullish coalescing for graceful handling.

### Instructions

1. Open `Exercise-8-Feedback-Form/`. The `AppComponent` and a `FeedbackFormComponent` exist with starter files and TODO comments.
2. Open `feedback-form.component.ts`:
   - Add `@Input() productName: string = ''`
   - Add a `displayTitle: string = ''` property
   - Add `@Output() feedbackSubmitted = new EventEmitter<{ reviewer: string; product: string; comment: string; rating: number }>()`
   - In `ngOnInit()`, build: `this.displayTitle = 'Review: ' + this.productName` (must be ngOnInit, not constructor — the input isn't set yet in the constructor)
   - Add a `comment: string = ''` property for two-way binding
   - Import `FormsModule` in the component's `imports` array
3. Open `feedback-form.component.html`:
   - Display `{{ displayTitle }}` as the heading (interpolation of the ngOnInit-processed value)
   - Add a `<textarea>` with `[(ngModel)]="comment"` (two-way binding)
   - Add an `<input>` for the reviewer name with `#reviewerInput` (template ref)
   - Add a `<select>` for rating (1–5) with `#ratingSelect` (template ref)
   - Add a submit button with `(click)="onSubmit(reviewerInput.value, ratingSelect.value)"` (event binding passing ref values)
   - Add property binding: `[disabled]="comment.length === 0"` on the submit button
4. Implement `onSubmit(reviewer: string, ratingStr: string)` in the component class. It should emit:
   `this.feedbackSubmitted.emit({ reviewer: reviewer || 'Anonymous', product: this.productName, comment: this.comment, rating: parseInt(ratingStr, 10) })`
5. Open `app.component.html`:
   - Render `<app-feedback-form [productName]="'Angular Course'" (feedbackSubmitted)="onFeedback($event)">`
   - Below it, display the last feedback received:
     - `{{ lastFeedback?.reviewer ?? 'No feedback yet' }}`
     - `{{ lastFeedback?.comment ?? '' }}`
     - `{{ lastFeedback?.rating ?? 'N/A' }}`
6. Open `app.component.ts`. Add `lastFeedback: { reviewer: string; product: string; comment: string; rating: number } | null = null` and implement `onFeedback(fb: ...)` to set `this.lastFeedback = fb`.
7. Don't forget to add `FeedbackFormComponent` to `AppComponent`'s `imports` array.
8. Save and run. Fill out the form and submit — feedback appears in the parent with safe navigation handling.

### Acceptance Criteria

- [ ] `FeedbackFormComponent` receives `productName` via `@Input()`
- [ ] `displayTitle` is built in `ngOnInit` (not the constructor)
- [ ] Two-way binding keeps the textarea and `comment` in sync
- [ ] Template refs `#reviewerInput` and `#ratingSelect` are used on form inputs
- [ ] Submit button is disabled when comment is empty (property binding)
- [ ] Clicking submit emits a feedback object via `@Output()`
- [ ] Parent displays feedback using `?.` and `??` — no crashes before first submission
- [ ] `FormsModule` is in `FeedbackFormComponent`'s imports
- [ ] `FeedbackFormComponent` is in `AppComponent`'s imports

### Hints

**Hint 1 — All four binding types:** This exercise uses interpolation (`{{ displayTitle }}`), property binding (`[disabled]`), event binding (`(click)`), and two-way binding (`[(ngModel)]`). All in one component.

**Hint 2 — Mixed approach:** The textarea uses two-way binding (constant sync for preview). The reviewer input uses a template ref (read only at submit time). Both approaches are valid — use the one that fits.

**Hint 3 — ngOnInit:** Build `displayTitle` in `ngOnInit`, not the constructor. If you do it in the constructor, `productName` will still be `''` and your title will be wrong.

**Hint 4 — Safe navigation in parent:** `lastFeedback` starts as `null`. Without `?.`, accessing `lastFeedback.reviewer` crashes. With `?.` and `??`, you get "No feedback yet" instead.

---

## Exercise 9: All Concepts — Notification Center

**Difficulty:** CHALLENGE
**Concepts practiced:** All four binding types, `@Input()`, `@Output()`, `ngOnInit`, `ngOnDestroy`, template refs, safe navigation `?.`, nullish coalescing `??`

### What You're Building

A notification center with two components. `AppComponent` manages a list of notifications and renders multiple `NotificationCardComponent` children. Each card receives notification data via `@Input()`, builds a formatted timestamp in `ngOnInit`, starts a "time ago" auto-updater interval, cleans it up in `ngOnDestroy`, and emits a dismiss event via `@Output()`. The parent handles optional/null notification fields with safe navigation and nullish coalescing.

### Instructions

1. Open `Exercise-9-Notification-Center/`. Review the `Notification` interface in the starter code: `{ id: number; title: string; message?: string; sender?: { name: string; avatar?: string } }`.
2. Open `notification-card.component.ts`:
   - Add `@Input() notification: Notification | null = null`
   - Add `@Output() dismiss = new EventEmitter<number>()`
   - Add `formattedTime: string = ''` and `secondsAgo: number = 0`
   - Add `private timerId: number | null = null`
   - In `ngOnInit`: set `this.formattedTime` to the current time string (`new Date().toLocaleTimeString()`), set `this.secondsAgo = 0`, and start an interval that increments `secondsAgo` every second
   - In `ngOnDestroy`: clear the interval
   - Add `onDismiss()`: emit `this.notification?.id ?? -1`
3. Open `notification-card.component.html`:
   - Display `{{ notification?.title ?? 'Untitled' }}` (safe nav + nullish coalescing)
   - Display `{{ notification?.message ?? 'No message content' }}`
   - Display `{{ notification?.sender?.name ?? 'System' }}`
   - Display `{{ formattedTime }}` and `Received {{ secondsAgo }}s ago`
   - Add a dismiss button: `(click)="onDismiss()"`
4. Open `app.component.ts`:
   - The `notifications` array is provided in the starter code with mixed data (some have all fields, some have nulls)
   - Implement `onDismiss(id: number)` to remove the notification with that id from the array
5. Open `app.component.html`:
   - Render one `<app-notification-card>` per notification (the starter has TODO markers). Pass `[notification]="notifications[0]"`, etc. for each item.
   - Bind `(dismiss)="onDismiss($event)"` on each card.
   - Show the count: `{{ notifications.length }} notifications`
6. Don't forget to add `NotificationCardComponent` to `AppComponent`'s `imports` array.
7. Save and run. Cards display with safe navigation handling, the seconds counter ticks up, and dismissing a card removes it from the list.

### Acceptance Criteria

- [ ] `NotificationCardComponent` receives data via `@Input()` and emits via `@Output()`
- [ ] `ngOnInit` starts an interval that increments `secondsAgo`
- [ ] `ngOnDestroy` clears the interval — no ghost timers after dismissal
- [ ] Safe navigation `?.` is used on every notification field access in the template
- [ ] Nullish coalescing `??` provides fallbacks for missing fields
- [ ] Dismissing a card removes it from the parent's array
- [ ] The notification count updates after each dismissal
- [ ] No console errors at any point

### Hints

**Hint 1 — Nested safe navigation:** `notification?.sender?.name ?? 'System'` — two levels of `?.` before the `??` fallback. If `notification` is null, the whole chain stops. If `sender` is missing, it stops there.

**Hint 2 — ngOnDestroy timing:** When you dismiss a card and the parent removes it from the array, Angular destroys that component instance. That's when `ngOnDestroy` fires and your interval should be cleaned up.

**Hint 3 — @Output with ID:** `this.dismiss.emit(this.notification?.id ?? -1)` sends the notification's ID up to the parent. The parent uses that ID to find and remove the notification from the array.

**Hint 4 — Without @for:** We haven't learned `@for` yet (that's Day 2). For now, just render a fixed number of `<app-notification-card>` elements manually — one for each notification in the starter array.

---

## Exercise 10: ⚠️ LEGACY — Convert to NgModule

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Legacy NgModule pattern, `declarations` array, `FormsModule` in NgModule, `styleUrls` plural, `bootstrapModule`

### What You're Building

You're given a fully working modern standalone app — a simple message board with a `MessageCardComponent` that uses `@Input()`, `@Output()`, two-way binding, and lifecycle hooks. Your job is to convert it to the legacy NgModule pattern: create an `AppModule`, move FormsModule to the module, remove standalone from components, and switch the bootstrap.

### Instructions

1. Open `Exercise-10-Legacy-NgModule/`. Run `npx ng serve` to verify the modern app works — it's a message board with cards that display author, message, and a "like" button.
2. **Create `src/app/app.module.ts`:**
   - Import `NgModule` from `@angular/core`
   - Import `BrowserModule` from `@angular/platform-browser`
   - Import `FormsModule` from `@angular/forms`
   - Import `AppComponent` and `MessageCardComponent`
   - Create an `@NgModule` with:
     - `declarations: [AppComponent, MessageCardComponent]`
     - `imports: [BrowserModule, FormsModule]`
     - `providers: []`
     - `bootstrap: [AppComponent]`
   - Export the class `AppModule`
3. **Modify `src/main.ts`:**
   - Replace `bootstrapApplication` with `platformBrowserDynamic().bootstrapModule(AppModule)`
   - Update imports accordingly
4. **Modify `src/app/app.component.ts`:**
   - Remove `standalone: true`
   - Remove the `imports: [...]` array entirely
   - Change `styleUrl` (singular) to `styleUrls` (plural array): `styleUrls: ['./app.component.css']`
5. **Modify `src/app/message-card/message-card.component.ts`:**
   - Remove `standalone: true`
   - Remove the `imports: [FormsModule]` array (FormsModule now comes from the NgModule)
   - Change `styleUrl` to `styleUrls` (plural array)
6. **Delete `src/app/app.config.ts`** — the NgModule replaces it.
7. Save all files and run `npx ng serve`. The app should work exactly the same as before.
8. Observe: how many files did you have to edit? Can you tell from `message-card.component.ts` that it depends on FormsModule? (No — that's the hidden coupling problem.)

### Acceptance Criteria

- [ ] `app.module.ts` exists with `@NgModule` decorator
- [ ] `declarations` array lists both `AppComponent` and `MessageCardComponent`
- [ ] `imports` array includes `BrowserModule` and `FormsModule`
- [ ] `bootstrap` array includes `AppComponent`
- [ ] `main.ts` uses `platformBrowserDynamic().bootstrapModule(AppModule)`
- [ ] Neither component has `standalone: true`
- [ ] Neither component has its own `imports` array
- [ ] Both components use `styleUrls` (plural array) instead of `styleUrl`
- [ ] `app.config.ts` is deleted
- [ ] The app builds and runs without errors

### Hints

**Hint 1 — NgModule structure:**
```typescript
@NgModule({
  declarations: [AppComponent, MessageCardComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Hint 2 — Legacy bootstrap:**
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

**Hint 3 — styleUrls:** Legacy uses `styleUrls: ['./file.css']` (array). Modern uses `styleUrl: './file.css'` (string). This is a small but breaking difference.

**Hint 4 — Reflection:** After converting, notice that `message-card.component.ts` has no indication it needs `FormsModule`. The dependency is invisible — hidden in `app.module.ts`. This is the core pain point that standalone components fixed.

---

> **Solutions:** Compare your work with the solution files in the `Day-1-B-Templates-and-Communication/Exercises-Solutions/` folder. Each solution folder (`Exercise-1-Solution/`, `Exercise-2-Solution/`, etc.) contains only the files you needed to create or modify.

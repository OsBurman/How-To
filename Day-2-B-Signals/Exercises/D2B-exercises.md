# Day 2 Part B — Exercises

## Exercise 1: Counter with Signals

**Difficulty:** BEGINNER
**Concepts practiced:** `signal()`, `.set()`, `.update()`, `computed()`

### What You're Building

A click counter component with increment, decrement, and reset buttons. The count is stored in a `signal()`. You'll use `.update()` to add and subtract from the current value, and `.set()` to reset to zero. You'll also add a `computed()` that derives a "doubled" value from the same signal — so you can see two template expressions updating independently from a single source.

### Instructions

1. Open `Exercise-1-Counter/` and run `npx ng serve` to see the starter app. The template has three buttons and a placeholder display area with TODO comments.
2. Open `app.component.ts`. Import `signal` and `computed` from `@angular/core`.
3. Declare a writable signal in the class: `readonly count = signal(0);`
4. Declare a computed signal: `readonly doubled = computed(() => this.count() * 2);`
5. Implement three methods:
   - `increment(): void` — call `this.count.update(c => c + 1)`
   - `decrement(): void` — call `this.count.update(c => c - 1)`
   - `reset(): void` — call `this.count.set(0)`
6. Open `app.component.html`. Replace the TODO placeholders:
   - Display the count with `{{ count() }}`
   - Display the doubled value with `{{ doubled() }}`
   - Wire the buttons: `(click)="increment()"`, `(click)="decrement()"`, `(click)="reset()"`
7. Run `npx ng serve` and verify:
   - Clicking increment/decrement updates the count and the doubled value simultaneously
   - Clicking reset returns both to 0

### Acceptance Criteria

- [ ] `count` is declared as `signal(0)` using `readonly`
- [ ] `doubled` is declared as `computed(() => this.count() * 2)` using `readonly`
- [ ] `increment()` uses `.update(c => c + 1)`
- [ ] `decrement()` uses `.update(c => c - 1)`
- [ ] `reset()` uses `.set(0)`
- [ ] Both `count()` and `doubled()` display in the template
- [ ] No TypeScript errors in the console

### Hints

**Hint 1 — signal() syntax:** In a component class, declare a signal as a class property: `readonly count = signal(0)`. Read it in the class with `this.count()` and in the template with `count()`.

**Hint 2 — .update() vs .set():** Use `.set(value)` when you already have the new value (like resetting to 0). Use `.update(fn)` when the new value depends on the current value (like incrementing by 1). The callback receives the current value and must return the new one.

**Hint 3 — computed() is read-only:** `computed()` creates a derived signal — you can read it with `doubled()`, but you cannot call `.set()` or `.update()` on it. It updates automatically when `count` changes.

---

## Exercise 2: Derived Cart Total

**Difficulty:** BEGINNER
**Concepts practiced:** `computed()` for derived read-only values, multiple computed signals from one source

### What You're Building

A shopping cart component with a list of items. Each item's quantity is stored in its own `signal(1)`. Three `computed()` signals derive the subtotal, tax (8%), and grand total from the item quantities. You'll add increment and decrement buttons per item and see all three totals update automatically — without any event handlers updating the totals manually.

### Instructions

1. Open `Exercise-2-Cart-Total/` and run `npx ng serve`. The starter app shows a list of cart items with placeholder totals.
2. Open `app.component.ts`. The `CartItem` interface and `items` array are already defined. Each item has a `quantity` property that is already a `signal(1)`.
3. Add three `computed()` signals to the class:
   - `readonly subtotal = computed(() => this.items.reduce((sum, item) => sum + item.price * item.quantity(), 0));`
   - `readonly tax = computed(() => this.subtotal() * 0.08);`
   - `readonly grandTotal = computed(() => this.subtotal() + this.tax());`
4. Open `app.component.html`. Display all three values using the `currency` pipe: `{{ subtotal() | currency }}`, `{{ tax() | currency }}`, `{{ grandTotal() | currency }}`.
5. Add `+` and `-` buttons next to each item's quantity:
   - Increment: `(click)="item.quantity.update(q => q + 1)"`
   - Decrement: `(click)="item.quantity.update(q => Math.max(0, q - 1))"`
6. Display the current quantity for each item: `{{ item.quantity() }}`
7. Run `npx ng serve`. Change item quantities — all three totals should update instantly, automatically.
8. **Experiment:** Try typing `this.subtotal.set(0)` anywhere in the class. Read the TypeScript error and then delete the line. Add a comment explaining what the error means.

### Acceptance Criteria

- [ ] `subtotal`, `tax`, and `grandTotal` are all `computed()` signals declared with `readonly`
- [ ] Item quantities are `signal(1)` values on each item object
- [ ] `+` and `-` buttons update quantities using `.update()`
- [ ] Decrement prevents quantities from going below 0 using `Math.max(0, q - 1)`
- [ ] All three totals display using the `currency` pipe
- [ ] All three totals update automatically when any quantity changes
- [ ] A comment explains why `this.subtotal.set(0)` produces a TypeScript error

### Hints

**Hint 1 — computed() and arrays:** Inside a `computed()` callback, you can use `reduce`, `map`, `filter`, or any array method. Angular tracks every signal you call inside — here it tracks `item.quantity()` for every item.

**Hint 2 — computed() is read-only by design:** `computed()` returns a `Signal<T>` (not a `WritableSignal<T>`). TypeScript will not let you call `.set()` or `.update()` on it. This is intentional — derived values should only change when their sources change.

**Hint 3 — Minimum quantity:** `Math.max(0, q - 1)` ensures the quantity never drops below 0. Call it inside `.update(q => Math.max(0, q - 1))`.

---

## Exercise 3: Temperature Converter

**Difficulty:** BEGINNER
**Concepts practiced:** `computed()` — multiple derived values from a single source signal

### What You're Building

A temperature converter with a single Celsius `signal()` as the source of truth. Three `computed()` signals derive the Fahrenheit value, the Kelvin value, and a text description ("Freezing", "Cold", "Comfortable", "Warm", "Hot"). A range slider updates the Celsius signal — all three derived values update in sync without any additional event handlers.

### Instructions

1. Open `Exercise-3-Temperature/` and run `npx ng serve`. The starter app has a slider and placeholder displays.
2. Open `app.component.ts`. A `celsius = signal(20)` is already declared.
3. Add three `computed()` signals:
   - `readonly fahrenheit = computed(() => this.celsius() * 9 / 5 + 32);`
   - `readonly kelvin = computed(() => this.celsius() + 273.15);`
   - `readonly description = computed(() => { ... })` — return one of these strings based on `this.celsius()`:
     - Less than 0: `'Freezing'`
     - 0 to 15: `'Cold'`
     - 16 to 25: `'Comfortable'`
     - 26 to 35: `'Warm'`
     - Above 35: `'Hot'`
4. Open `app.component.html`. Connect the slider to the signal:
   ```html
   <input type="range" min="-50" max="100"
     [value]="celsius()"
     (input)="celsius.set(+$event.target.value)" />
   ```
5. Display all four values: `{{ celsius() }}°C`, `{{ fahrenheit() | number:'1.1-1' }}°F`, `{{ kelvin() | number:'1.1-1' }}K`, and `{{ description() }}`.
6. Run `npx ng serve`. Move the slider and verify all four values update simultaneously.
7. Add a comment above each `computed()` signal explaining: "This recalculates only when `celsius` changes — not on every change detection cycle."

### Acceptance Criteria

- [ ] `celsius` is a writable `signal(20)`
- [ ] `fahrenheit`, `kelvin`, and `description` are all `computed()` signals
- [ ] The slider updates `celsius` using `(input)="celsius.set(+$event.target.value)"`
- [ ] All four values update simultaneously when the slider moves
- [ ] `description` returns the correct label for each temperature range
- [ ] Each `computed()` has a comment explaining when it recalculates

### Hints

**Hint 1 — Slider value is a string:** HTML inputs always give you strings. The unary `+` operator converts a string to a number: `+$event.target.value`. Without it, `celsius` would hold a string and the math would break.

**Hint 2 — computed() with logic:** A `computed()` callback can contain any TypeScript, including `if` statements and early returns. It just needs to return the derived value at the end.

**Hint 3 — number pipe:** `{{ fahrenheit() | number:'1.1-1' }}` formats a number to one decimal place. The format string `'1.1-1'` means: minimum 1 integer digit, minimum 1 decimal digit, maximum 1 decimal digit.

---

## Exercise 4: Search Box with Effect

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `signal()`, `computed()`, `effect()` with cleanup function

### What You're Building

A country search component. The search query is a `signal('')`. A `computed()` signal filters a hardcoded list of country names. An `effect()` logs the search term to the console — but only after the user stops typing for 500ms, using a debounce timer. The key requirement: the `effect()` must return a cleanup function that cancels the pending timer before the next execution. Without the cleanup, every keystroke would fire its own timer.

### Instructions

1. Open `Exercise-4-Search-Effect/` and run `npx ng serve`. The starter shows a search input and an empty results list.
2. Open `app.component.ts`. A `countries: string[]` array and an empty `readonly query = signal('');` are already provided.
3. Open `app.component.html`. Wire the search input using the signal-compatible pattern:
   ```html
   <input type="text"
     [value]="query()"
     (input)="query.set($event.target.value)" />
   ```
4. Add two `computed()` signals to the class:
   - `readonly results = computed(() => this.countries.filter(c => c.toLowerCase().includes(this.query().toLowerCase())));`
   - `readonly resultCount = computed(() => this.results().length);`
5. Add an `effect()` with a debounce timer. Place it as a class property (Angular's injection context is active during class initialization):
   ```typescript
   private readonly searchLogger = effect(() => {
     const term = this.query(); // read the signal — creates the dependency
     const timer = setTimeout(() => {
       console.log(`Searching for: "${term}"`);
     }, 500);
     return () => clearTimeout(timer); // cleanup cancels the pending timer
   });
   ```
6. Display results with `@for (country of results(); track country)` and show the result count: `{{ resultCount() }} results`.
7. Run `npx ng serve`. Type quickly in the search box — the console should log only after you pause for 500ms.

### Acceptance Criteria

- [ ] `query` is declared as `signal('')`
- [ ] The input uses `[value]="query()"` and `(input)="query.set($event.target.value)"`
- [ ] `results` is a `computed()` signal that filters the array (case-insensitive)
- [ ] `resultCount` is a `computed()` signal derived from `results()`
- [ ] The `effect()` sets a `setTimeout` and returns `() => clearTimeout(timer)`
- [ ] Rapid typing does not flood the console — only one log fires after the user pauses
- [ ] Result count and list both update as the user types

### Hints

**Hint 1 — Signal-compatible input pattern:** `[(ngModel)]="query"` won't work with a signal directly. Use `[value]="query()"` (one-way read) and `(input)="query.set($event.target.value)"` (event write). This is the standard signal input pattern.

**Hint 2 — Why the cleanup matters:** Every time `query` changes, the `effect()` runs again. Without the cleanup, the previous `setTimeout` is still pending. The cleanup function runs just before the next execution, cancelling the old timer so only the latest one fires.

**Hint 3 — effect() placement:** Declare the effect as a class property — `private readonly searchLogger = effect(() => { ... })`. Angular's injection context is active during class field initialization, so `effect()` works without needing `inject()`or a constructor.

---

## Exercise 5: Configurable Rating Display

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Signal-based `input()` — readonly constraint, `input.required()`, `computed()`

### What You're Building

A `RatingDisplayComponent` that receives a rating value, a max-stars count, and a label via signal-based `input()`. It displays filled and empty star characters using a `computed()`. You'll deliberately try to call `.set()` on an input — see the TypeScript error — and understand why inputs are read-only: the parent owns the value.

### Instructions

1. Open `Exercise-5-Rating-Input/` and run `npx ng serve`. The starter shows `AppComponent` hosting an empty `RatingDisplayComponent`.
2. Open `rating-display.component.ts`. Add the signal inputs:
   ```typescript
   readonly rating = input<number>(0);
   readonly maxStars = input<number>(5);
   readonly label = input.required<string>();
   ```
3. Add a `computed()` signal that builds the star character array:
   ```typescript
   readonly stars = computed(() =>
     Array.from({ length: this.maxStars() }, (_, i) =>
       i < this.rating() ? '★' : '☆'
     )
   );
   ```
4. Open `rating-display.component.html`. Display the label and the stars:
   ```html
   <p>{{ label() }}</p>
   <span @for="(star of stars(); track $index)">{{ star }}</span>
   ```
   (Use the correct `@for` block syntax.)
5. Open `app.component.ts`. Declare `readonly score = signal(3);` and add `RatingDisplayComponent` to the component's `imports` array.
6. Open `app.component.html`. Pass values to the child:
   ```html
   <app-rating-display
     [rating]="score()"
     [maxStars]="5"
     label="Product Rating" />
   ```
7. **Read-only constraint test:** In `rating-display.component.ts`, temporarily add a button handler method that calls `this.rating.set(10)`. Read the TypeScript error. Then delete the method and add a comment at the top of the file explaining why `input()` is read-only.
8. **required input test:** Remove `label="Product Rating"` from the parent template. Save and check the browser console — Angular will throw a runtime error. Restore the attribute.

### Acceptance Criteria

- [ ] `rating` and `maxStars` use `input<number>()` with default values
- [ ] `label` uses `input.required<string>()` with no default
- [ ] `stars` is a `computed()` signal returning an array of `'★'` and `'☆'` characters
- [ ] The parent passes `[rating]="score()"` — the signal value, not the signal itself
- [ ] TypeScript error from calling `this.rating.set()` is observed and removed
- [ ] A comment in the file explains the read-only ownership rule
- [ ] Removing the required `label` input triggers a runtime error

### Hints

**Hint 1 — input() vs @Input():** `input<T>(defaultValue)` returns a read-only `Signal<T>`. The child reads the value with `this.rating()`. It cannot call `.set()` or `.update()` — the parent controls the value.

**Hint 2 — Passing a signal value vs a signal:** In the parent, write `[rating]="score()"` — the `()` reads the current number and passes it as a plain value. Writing `[rating]="score"` would pass the signal object itself, which is incorrect.

**Hint 3 — input.required():** `input.required<string>()` has no default. If the parent doesn't supply the attribute, Angular throws at runtime: "Required input 'label' was accessed before it was set." This is a helpful safety check.

---

## Exercise 6: Tag Selector

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Signal-based `output()` with `.emit()`, `signal()` with `.update()` (immutable array pattern)

### What You're Building

A `TagListComponent` that displays a set of available tags as pill buttons. When the user clicks a tag, the component emits it to the parent via `output()`. The parent `AppComponent` holds the selected tags in a `signal<string[]>([])` and handles the event by adding the tag using `.update()` with the immutable spread pattern. The parent also renders "Remove" buttons to deselect tags.

### Instructions

1. Open `Exercise-6-Tag-Selector/` and run `npx ng serve`. The starter shows `AppComponent` with a placeholder for the tag list and a selected tags area.
2. Open `tag-list.component.ts`. Add:
   - A signal input: `readonly availableTags = input<string[]>([]);`
   - A signal output: `readonly tagSelected = output<string>();`
   - A method: `onTagClick(tag: string): void { this.tagSelected.emit(tag); }`
3. Open `tag-list.component.html`. Render the tags with `@for`:
   ```html
   @for (tag of availableTags(); track tag) {
     <button (click)="onTagClick(tag)">{{ tag }}</button>
   }
   ```
4. Open `app.component.ts`. Add:
   - `readonly availableTags: string[] = ['Angular', 'TypeScript', 'Signals', 'RxJS', 'CSS'];`
   - `readonly selectedTags = signal<string[]>([]);`
   - A method that prevents duplicates:
     ```typescript
     onTagSelected(tag: string): void {
       if (!this.selectedTags().includes(tag)) {
         this.selectedTags.update(tags => [...tags, tag]);
       }
     }
     ```
   - A method to remove a tag:
     ```typescript
     removeTag(tag: string): void {
       this.selectedTags.update(tags => tags.filter(t => t !== tag));
     }
     ```
5. Open `app.component.html`. Use the child component:
   ```html
   <app-tag-list
     [availableTags]="availableTags"
     (tagSelected)="onTagSelected($event)" />
   ```
6. Display selected tags with a Remove button for each:
   ```html
   @for (tag of selectedTags(); track tag) {
     <span>{{ tag }} <button (click)="removeTag(tag)">×</button></span>
   }
   ```
7. Verify: clicking a tag adds it (once only). Clicking Remove deletes it.

### Acceptance Criteria

- [ ] `tagSelected` is declared with `output<string>()`
- [ ] Clicking a tag calls `this.tagSelected.emit(tag)`
- [ ] Parent stores selected tags in `signal<string[]>([])`
- [ ] Add uses `update(tags => [...tags, tag])` — never `push()`
- [ ] Remove uses `update(tags => tags.filter(t => t !== tag))` — never `splice()`
- [ ] A tag cannot be added twice
- [ ] Remove buttons work correctly

### Hints

**Hint 1 — output() emitting:** `output<string>()` declares an event channel. Call `this.tagSelected.emit(tag)` to fire it. The parent listens with `(tagSelected)="handler($event)"`.

**Hint 2 — Immutable array update:** Never call `.push()` on a signal's array — Angular won't detect the mutation. Always use `update(arr => [...arr, newItem])` to produce a new array reference.

**Hint 3 — The event name in the parent:** The attribute name in the parent template — `(tagSelected)` — must exactly match the property name declared with `output()` in the child.

---

## Exercise 7: Volume Slider with model()

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `model()` for two-way binding, `[()]` banana-in-a-box syntax with signals

### What You're Building

A `VolumeSliderComponent` that controls a volume value via `model()`. The parent `AppComponent` displays the volume and has a "Mute" button. Because `model()` creates a two-way binding, moving the slider in the child updates the parent's display — and clicking "Mute" in the parent moves the slider back to 0. Both sides stay in sync automatically.

### Instructions

1. Open `Exercise-7-Volume-Slider/` and run `npx ng serve`. The starter shows `AppComponent` with a "Mute" button and a placeholder for the child component.
2. Open `volume-slider.component.ts`. Declare the model:
   ```typescript
   readonly volume = model<number>(50);
   ```
3. Open `volume-slider.component.html`. Add the slider:
   ```html
   <input type="range" min="0" max="100"
     [value]="volume()"
     (input)="volume.set(+$event.target.value)" />
   <p>Slider: {{ volume() }}</p>
   ```
4. Open `app.component.ts`. Declare `readonly volume = signal<number>(50);` and add `VolumeSliderComponent` to the `imports` array.
5. Implement the `mute()` method: `this.volume.set(0);`
6. Open `app.component.html`. Use the two-way binding syntax:
   ```html
   <app-volume-slider [(volume)]="volume" />
   <p>Parent: {{ volume() }}</p>
   <button (click)="mute()">Mute</button>
   ```
   **Important:** Write `[(volume)]="volume"` — pass the signal reference, not `volume()`.
7. Run `npx ng serve` and verify:
   - Moving the slider updates both "Slider:" and "Parent:" displays
   - Clicking "Mute" resets both displays to 0 and moves the slider thumb to the left
8. Add a comment in `volume-slider.component.ts` explaining the difference between `model()` and `input()`.

### Acceptance Criteria

- [ ] `volume` in `VolumeSliderComponent` is declared with `model<number>(50)`
- [ ] The slider uses `[value]="volume()"` and `(input)="volume.set(+$event.target.value)"`
- [ ] The parent uses `[(volume)]="volume"` — passing the signal, not the signal value
- [ ] Clicking "Mute" in the parent updates the slider position
- [ ] Both parent and child displays stay in sync at all times
- [ ] A comment explains the difference between `model()` and `input()`

### Hints

**Hint 1 — model() is writable:** Unlike `input()`, `model()` returns a `WritableSignal` — the child can call `.set()` on it. That's how the child writes back to the parent.

**Hint 2 — Pass the signal, not the value:** In the parent template, write `[(volume)]="volume"` — no parentheses. Angular needs the signal reference to wire up the two-way binding. Writing `[(volume)]="volume()"` passes a number and breaks the write-back.

**Hint 3 — What [(volume)] expands to:** Behind the scenes, `[(volume)]="volume"` is shorthand for `[volume]="volume" (volumeChange)="volume.set($event)"`. Angular generates a `volumeChange` output automatically for every `model()`.

---

## Exercise 8: Change Detection Lab

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Fine-grained change detection understanding, `signal()`, `computed()`, observing re-render boundaries

### What You're Building

An observation exercise. A pre-built app has two independent components: a `ClockComponent` that ticks every second, and a `CounterComponent` with its own buttons. You'll add `console.log` calls inside `computed()` callbacks and signal update handlers to see exactly which expressions re-run — and prove that a second-by-second clock update does not cause the counter's computations to re-run.

### Instructions

1. Open `Exercise-8-Change-Detection-Lab/` and run `npx ng serve`. You'll see a live clock updating every second, and an independent increment counter below it.
2. Open `clock.component.ts`. Inside the `setInterval` callback (just before `this.time.set(...)`), add:
   ```typescript
   console.log('Clock: time signal updating');
   ```
3. Open `counter.component.ts`. Inside the `computed()` callback for `doubled`, add:
   ```typescript
   readonly doubled = computed(() => {
     console.log('Counter: doubled computing');
     return this.count() * 2;
   });
   ```
4. Open the browser DevTools console. Watch the output for 10 seconds. Answer in a comment: does `'Counter: doubled computing'` log every second?
5. Click the increment button several times. Does `'Clock: time signal updating'` appear when you click? Does `'Counter: doubled computing'` appear?
6. Add a `computed()` signal to `ClockComponent`:
   ```typescript
   readonly hourMessage = computed(() => {
     console.log('Clock: hourMessage computing');
     return `The hour is ${new Date(this.time()).getHours()}`;
   });
   ```
   Display it in `clock.component.html`. Watch the console — `'Clock: hourMessage computing'` should log every second, but `'Counter: doubled computing'` should still be silent.
7. At the top of `counter.component.ts`, add a multi-line comment in your own words explaining what "fine-grained change detection" means based on your observations.

### Acceptance Criteria

- [ ] `console.log` is added inside the `setInterval` callback in `ClockComponent`
- [ ] `console.log` is added inside the `doubled` computed callback in `CounterComponent`
- [ ] Student observes that `'Counter: doubled computing'` does NOT log every second
- [ ] `hourMessage` computed signal is added to `ClockComponent` with its own log
- [ ] Student observes that `'Clock: hourMessage computing'` logs every second
- [ ] A comment in `counter.component.ts` explains fine-grained change detection

### Hints

**Hint 1 — What to look for:** If Angular were using zone.js without signals, ALL templates would re-evaluate every second because the timer triggers global change detection. With signals, only the DOM nodes and computeds that read `time()` re-run. The counter stays silent.

**Hint 2 — DevTools filter:** In the Console tab, type `computing` into the filter box to show only your added log messages and hide Angular's own output.

**Hint 3 — The key insight:** Signal-based change detection is "fine-grained" because Angular tracks the exact dependency graph — which template expressions depend on which signals. It only re-runs the specific expressions whose dependencies changed. Nothing more.

---

## Exercise 9: Convert ngOnChanges to Signals

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Reading `ngOnChanges` with `SimpleChanges`, converting `@Input()` to `input()`, `ngOnChanges` calculations to `computed()`, `ngOnChanges` side effects to `effect()`

### What You're Building

You're given a working legacy `OrderSummaryComponent` that uses `@Input()` and `ngOnChanges(changes: SimpleChanges)` to calculate a discounted price, compute savings, and log a price history entry whenever the price changes. You'll convert it to modern patterns: `input()`, `computed()`, and `effect()` — deleting all `ngOnChanges` code while keeping identical visible behavior.

### Instructions

1. Open `Exercise-9-Convert-NgOnChanges/` and run `npx ng serve`. The app shows a product with a price and a discount percentage. Two buttons in `AppComponent` change the price. The component recalculates and logs whenever the price changes.
2. Open `order-summary.component.ts` and read it carefully. Identify:
   - The `@Input()` properties: `price` and `discount`
   - What `ngOnChanges` calculates: `discountedPrice` and `savings`
   - What `ngOnChanges` does as a side effect: pushes to `priceHistory[]` and calls `console.log()`
3. **Convert the inputs:** Replace the two `@Input()` properties with signal-based inputs:
   ```typescript
   readonly price = input<number>(0);
   readonly discount = input<number>(0);  // 0–100 percent
   ```
4. **Convert the derived values:** Replace the `discountedPrice` and `savings` class properties with `computed()` signals:
   ```typescript
   readonly discountedPrice = computed(() =>
     this.price() * (1 - this.discount() / 100)
   );
   readonly savings = computed(() =>
     this.price() - this.discountedPrice()
   );
   ```
5. **Convert the side effect:** Replace `ngOnChanges` with an `effect()`:
   ```typescript
   private readonly priceLogger = effect(() => {
     const current = this.discountedPrice();
     this.priceHistory.push(current);
     console.log(`Discounted price updated: ${current.toFixed(2)}`);
   });
   ```
6. **Delete** the `ngOnChanges` method and the `SimpleChanges` import.
7. Open `app.component.ts`. Verify that `price` and `discount` are already `signal()` values. The parent template passes them as `[price]="price()"` and `[discount]="discount()"`. Check that the bindings still work with the new `input()` declarations.
8. Run `npx ng serve`. Verify the app looks and behaves exactly as before — discounted price updates when the price changes, and the console log fires.

### Acceptance Criteria

- [ ] `@Input() price` and `@Input() discount` are replaced by `input<number>()`
- [ ] `discountedPrice` and `savings` are `computed()` signals
- [ ] An `effect()` handles the `priceHistory` push and `console.log()`
- [ ] `ngOnChanges(changes: SimpleChanges)` is completely removed
- [ ] The `SimpleChanges` import is removed
- [ ] No `@Input()` decorators remain in the component
- [ ] The app builds and behaves identically to the legacy version

### Hints

**Hint 1 — ngOnChanges maps to:** Calculations that derive a new value from inputs → `computed()`. Side effects like logging, updating arrays, or calling external APIs → `effect()`. Direct input reading → `input()`.

**Hint 2 — effect() and plain arrays:** The `priceHistory` array is a plain class property — not a signal. You can push directly to it inside `effect()`. Only writable signals need `.set()` or `.update()`.

**Hint 3 — When does effect() first run?** An `effect()` runs once immediately after the component initializes (equivalent to `ngOnInit`), then again whenever its dependencies change. This means `priceHistory` will have one entry on first load — just like the original `ngOnChanges` fired when inputs were first set.

---

## Exercise 10: ⚠️ LEGACY — Notification Center NgModule → Signals

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Modern `standalone: true` components, `signal()`, `input()`, `output()`, `computed()`, removing NgModule, removing `@Input()`/`@Output()`/`EventEmitter`, removing `ngOnChanges`

### What You're Building

You're given a fully working legacy Angular app — a notification center with a `NotificationListComponent` that receives notifications via `@Input()`, emits dismiss events via `@Output() EventEmitter`, and uses `ngOnChanges` to count unread items. Your job is to convert the entire app to modern standalone patterns: `standalone: true`, `bootstrapApplication()`, `input()`, `output()`, and `computed()`. This exercise is about **recognition and conversion** — not about learning new APIs from scratch.

### Instructions

1. Open `Exercise-10-Legacy-NgModule/` and run `npx ng serve`. Confirm the app works — you should see a list of notifications, each with a "Dismiss" button, and an unread count at the top.
2. Explore the legacy files:
   - `app.module.ts` — NgModule with `declarations` and `imports`
   - `notification-list.component.ts` — `@Input()`, `@Output() EventEmitter`, `ngOnChanges`
   - `app.component.ts` — plain array property, event handler
3. **Convert `NotificationListComponent`:**
   - Add `standalone: true` to `@Component`
   - Add `imports: []` to `@Component`
   - Replace `@Input() notifications: Notification[] = []` with `readonly notifications = input<Notification[]>([])`
   - Replace `@Output() dismissed = new EventEmitter<number>()` with `readonly dismissed = output<number>()`
   - Replace the `unreadCount` class property and its recalculation in `ngOnChanges` with:
     ```typescript
     readonly unreadCount = computed(() =>
       this.notifications().filter(n => !n.read).length
     );
     ```
   - Delete the `ngOnChanges` method and the `SimpleChanges` import
   - Delete the `OnChanges` interface from the class declaration
4. **Convert `AppComponent`:**
   - Add `standalone: true` and `imports: [NotificationListComponent]` to `@Component`
   - Replace the plain `notifications: Notification[]` array property with:
     ```typescript
     readonly notifications = signal<Notification[]>([
       { id: 1, message: 'Your order has shipped.', read: false },
       { id: 2, message: 'New comment on your post.', read: false },
       { id: 3, message: 'Password changed successfully.', read: true },
     ]);
     ```
   - Update `onDismissed(id: number)` to use `update`:
     ```typescript
     onDismissed(id: number): void {
       this.notifications.update(list => list.filter(n => n.id !== id));
     }
     ```
5. **Update `main.ts`** to use `bootstrapApplication`:
   ```typescript
   import { bootstrapApplication } from '@angular/platform-browser';
   import { appConfig } from './app/app.config';
   import { AppComponent } from './app/app.component';
   bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
   ```
6. **Create `src/app/app.config.ts`** (if it doesn't already exist):
   ```typescript
   import { ApplicationConfig } from '@angular/core';
   export const appConfig: ApplicationConfig = { providers: [] };
   ```
7. **Delete `app.module.ts`**.
8. Run `npx ng serve`. The app should work identically. Verify: notifications show, unread count is correct, and dismissing a notification removes it and updates the count.
9. **Reflect:** Add a comment to `notification-list.component.ts` answering: "What replaced ngOnChanges, and why is it better?"

### Acceptance Criteria

- [ ] `app.module.ts` is deleted
- [ ] `main.ts` uses `bootstrapApplication(AppComponent, appConfig)`
- [ ] `app.config.ts` exists with `ApplicationConfig` and `providers: []`
- [ ] `NotificationListComponent` has `standalone: true` and `imports: []`
- [ ] `@Input()` is replaced by `input<Notification[]>([])`
- [ ] `@Output() + EventEmitter` is replaced by `output<number>()`
- [ ] `ngOnChanges` is replaced by `computed(() => this.notifications().filter(n => !n.read).length)`
- [ ] `AppComponent` stores notifications in `signal<Notification[]>([...])`
- [ ] Dismiss logic uses `update(list => list.filter(n => n.id !== id))`
- [ ] App builds and runs without errors
- [ ] A comment answers the reflection question

### Hints

**Hint 1 — Convert child before parent:** Convert `NotificationListComponent` first. The parent's `[notifications]="..."` and `(dismissed)="..."` attribute bindings are the same syntax for both legacy `@Input()`/`@Output()` and modern `input()`/`output()` — so the parent template doesn't change.

**Hint 2 — ngOnChanges → computed():** Any calculation in `ngOnChanges` that reads `@Input()` properties and sets a derived class property maps directly to `computed()`. You don't need to check `changes.notifications?.currentValue` — `computed()` re-runs automatically when `notifications()` changes.

**Hint 3 — Immutable dismissal:** Use `this.notifications.update(list => list.filter(n => n.id !== id))`. Never call `splice()` on a signal's array — the mutation won't be detected and the template won't update.

---

> **Solutions:** Compare your work with the completed solution files in `Day-2-B-Signals/Exercises-Solutions/`. Each folder (`Exercise-1-Solution/`, `Exercise-2-Solution/`, etc.) contains only the files you needed to create or modify — compare them against your own work file by file.

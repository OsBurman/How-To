# Day 1 Part B — Slides Speaker Script

**Target duration: 30–40 minutes of spoken delivery**

---

## Day 1 Part B — Templates, Data Binding & Component Communication

Welcome back everyone. In Part A we got Angular set up, created our first standalone components, and learned how they fit together. Now we're going to make those components actually do things. This session is all about templates, data binding, and component communication.

By the end of this session, you'll know how to display data in your templates, respond to user actions like clicks and keystrokes, pass data between parent and child components, and handle component setup and teardown properly. We're going to cover a lot of ground, but every piece builds on the last, so it'll come together quickly.

---

## What You'll Be Able to Do

Here's what you'll walk away with after this session. You'll be able to use all four Angular data binding types — interpolation, property binding, event binding, and two-way binding. You'll know how to create template reference variables to grab DOM values without setting up two-way binding. You'll be able to use safe navigation and nullish coalescing to protect your templates from null crashes. You'll be able to pass data from parent to child with `@Input()` and from child to parent with `@Output()` and `EventEmitter`. You'll understand why `ngOnInit` is the correct place for initialization logic — and why the constructor is not. And you'll be able to prevent memory leaks by cleaning up timers and subscriptions in `ngOnDestroy`. Let's get started.

---

## What Is Interpolation?

Alright, the first binding type is interpolation, and it's the simplest one. Interpolation is how you display component data in your template. You take a TypeScript expression, wrap it in double curly braces — `{{ }}` — and Angular evaluates it and drops the result right into your HTML as text.

Here's the mental model. You have a property in your component class — say `pageTitle = 'My App'`. Over in your template, you write `{{ pageTitle }}`. When Angular renders this component, it sees those double curly braces, evaluates the expression inside, and replaces the whole thing with the string "My App."

A few important things about interpolation. First, it's read-only. The template can look at your data, but it can't change it. Data flows one direction — from the component to the template. Think of `{{ }}` as a one-way window: the template can see your data, but it can't reach through and modify it.

Second, the result is always converted to a string. If you put a number in there, Angular converts it to its string representation. If you put an object, you'll get `[object Object]` — not useful. Stick to strings, numbers, and simple expressions.

Third, interpolation works between HTML tags and inside some attribute values, though for attributes we'll see a better option in a minute with property binding.

---

## Interpolation Examples

Let's look at some examples. In our component class, we have a `userName` set to "Angela," an `itemCount` of 3, a `unitPrice` of 9.99, and a `getGreeting()` method that returns a welcome message.

Over in the template, the simplest case is just `{{ userName }}` — Angular replaces that with "Angela." Nothing fancy.

But you can put expressions inside the curly braces too. Look at `{{ itemCount * unitPrice }}` — that's multiplication happening right in the template. Angular evaluates three times nine ninety-nine and displays the result.

You can even call methods: `{{ getGreeting() }}`. Angular calls that method, gets the return value, and displays it. Now, a word of caution — don't put expensive calculations in interpolation because Angular calls them every time it checks for changes. For simple string formatting, it's fine.

And then there's the ternary expression: `{{ itemCount > 0 ? 'Ready to check out' : 'Your cart is empty' }}`. This is a conditional inside the curly braces. If `itemCount` is greater than zero, display one string; otherwise, display the other.

The key takeaway: anything that's a valid TypeScript expression can go inside `{{ }}`. Properties, math, method calls, ternaries — Angular evaluates it and renders the result as text.

---

## What Is Property Binding?

Now let's talk about the second binding type: property binding. This one sets a DOM element property to a value from your component. The syntax uses square brackets: `[property]="expression"`.

Here's the important distinction — property binding targets DOM properties, not HTML attributes. What's the difference? HTML attributes are what you write in your markup — they initialize the element. DOM properties are the live JavaScript properties on the DOM object — they represent the current state. In most cases they line up, but not always. For example, the `disabled` attribute can only be a string, but the `disabled` DOM property is a boolean.

So when you write `[disabled]="isSubmitDisabled"`, Angular evaluates that expression — which returns a boolean — and sets the DOM property directly. If `isSubmitDisabled` changes from `true` to `false`, Angular updates the DOM property and the button becomes enabled. That's the power here: Angular keeps the DOM in sync with your component state.

And here's the key difference from interpolation: property binding preserves the data type. Interpolation always produces a string. Property binding passes the actual value — a boolean stays a boolean, a number stays a number, an object stays an object. That matters when you're setting properties like `disabled` that expect a boolean, not the string "true."

Data still flows one direction — component to template — just like interpolation. But property binding gives you the ability to set any DOM property to any compatible value, not just text.

---

## Interpolation vs Property Binding — When to Use Which

So when do you use which? Both interpolation and property binding display component data, but they have different sweet spots.

Use interpolation — double curly braces — when you're displaying text content between HTML tags. Like `Hello, {{ name }}!` That's natural and readable. You're putting a value inline with other text.

Use property binding — square brackets — when you're setting an element property. `[disabled]="isFormValid"`, `[src]="imageUrl"`, `[hidden]="isSecretVisible"`. These are properties that need the right data type, and property binding gives you that.

Now, there are cases where both work. For example, setting an image source. `src="{{ imageUrl }}"` works — interpolation produces a string and `src` accepts a string. But `[src]="imageUrl"` is preferred because it's more explicit. When someone reads `[src]="imageUrl"`, they immediately know this is a dynamic value bound to a component property. With interpolation inside an attribute, it looks like it might be a static string at first glance.

Here's the rule of thumb I use: if it goes between tags, use curly braces. If it sets an element property, use square brackets.

---

## Property Binding Examples

Let's see a few more examples to make this concrete.

`[disabled]="!isFormValid"` — this is a boolean binding. The button's `disabled` property is set to `true` when the form is not valid, and `false` when it is. Notice the exclamation mark — we're negating the value right in the expression.

`[src]="profileImageUrl"` — this is a string binding. The image source changes dynamically whenever `profileImageUrl` changes in the component.

`[hidden]="!isSecretVisible"` — another boolean binding. The paragraph is hidden when `isSecretVisible` is `false`.

`[class]="highlightClass"` — this binds the entire CSS class to whatever string is in `highlightClass`. If it contains "text-primary," that becomes the element's class.

Notice how each of these targets a different type — booleans, strings — and property binding handles all of them naturally because it preserves the data type. That's the advantage over interpolation.

---

## What Is Event Binding?

Alright, now we flip the direction. The first two binding types — interpolation and property binding — send data from the component to the template. Event binding goes the other direction: from the template back to the component. It lets your template respond to user actions.

The syntax uses parentheses: `(event)="handler()"`. When the user clicks a button, types in an input, presses a key — the browser fires a DOM event. Angular intercepts that event and calls the method you specified on your component class. Your method runs, updates the component's state, and Angular re-renders the template to reflect the new state.

So let me update our direction summary. Interpolation: component to template — display data. Property binding: component to template — set properties. And now event binding: template to component — react to user actions. We've got data flowing out to the template, and actions flowing back in from the user. That's two of the four binding types accounted for.

---

## Event Binding Examples

Let's look at the syntax in action. The simplest case: `(click)="onButtonClick()"`. When the button is clicked, call `onButtonClick()` on the component. Inside that method, we increment `clickCount`, and because the template uses `{{ clickCount }}` to display it, the number updates on screen automatically.

Now, sometimes you need information about the event itself — which key was pressed, what the input value is. That's where `$event` comes in. `$event` is a special Angular variable that contains the native DOM event object.

Look at this: `(keyup)="onKeyPressed($event)"`. When a key is released, Angular calls `onKeyPressed` and passes the `KeyboardEvent` object. Inside the handler, we read `event.key` to find out which key was pressed.

Same thing with `(input)="onSearchInput($event)"`. The `input` event fires on every keystroke, and `$event` gives us the generic `Event` object. We cast `event.target` to `HTMLInputElement` and read its `value` property.

The key concept: for `(click)` events, `$event` is a `MouseEvent`. For `(keyup)`, it's a `KeyboardEvent`. For `(input)`, it's a generic `Event`. The type depends on which DOM event fired. You use `$event` when you need the details.

---

## What Is Two-Way Binding?

Now for the fourth and final binding type: two-way binding. This one combines property binding and event binding into a single operation. It keeps a component property and a form input in perfect sync — when the user types, the property updates; when the property changes in code, the input updates.

The syntax is `[(ngModel)]`. This is called "banana in a box" — the parentheses are the banana, the square brackets are the box. The banana goes inside the box. That's the memory trick: `[()]`.

Here's what Angular is actually doing behind the scenes. When you write `[(ngModel)]="userName"`, Angular splits it into two parts. The property binding half — `[ngModel]="userName"` — sets the input's value from your `userName` property. The event binding half — `(ngModelChange)="userName = $event"` — updates `userName` whenever the input changes. Two-way binding is literally just property binding plus event binding combined into one convenient syntax.

So our complete direction summary is now: interpolation goes component to template, property binding goes component to template, event binding goes template to component, and two-way binding goes both directions simultaneously.

---

## What Is FormsModule?

Now, there's a catch with `[(ngModel)]`. The `ngModel` directive — the thing that makes two-way binding work — lives inside Angular's `FormsModule`. If you don't import `FormsModule`, Angular has no idea what `ngModel` means.

In a standalone component, you import it directly in the component's `imports` array. You add `import { FormsModule } from '@angular/forms'` at the top of the file, and then add `FormsModule` to the `imports` array in the `@Component` decorator. And here's the standalone-specific detail: each standalone component that uses `[(ngModel)]` must import `FormsModule` individually. There's no central place that makes it globally available — the dependency is declared right where it's used.

---

## ⚠️ WARNING — FormsModule Silent Failure

Here's the frustrating part: if you forget this import, there's no error message. Your `[(ngModel)]` just silently does nothing. The input renders, it looks normal, you type in it — but the component property never updates. This is one of the most common "why isn't my binding working?" moments for Angular beginners.

So let me say this clearly: if your two-way binding isn't working, the very first thing to check is whether you imported `FormsModule` in the component's `imports` array. Nine times out of ten, that's the problem.

---

## Two-Way Binding in Action

Let me show you the full picture. We have a `MessageEditorComponent` with `FormsModule` in its imports and a `message` property initialized to an empty string.

In the template, we have a `<textarea>` with `[(ngModel)]="message"`. Below it, two paragraphs: one showing `{{ message }}` as a preview, and one showing `{{ message.length }}` as a character count.

What the user sees when they run this: they type in the textarea, and both the preview text and the character count update instantly, keystroke by keystroke. There's no button to click, no event handler to write — `[(ngModel)]` handles both directions of data flow automatically.

And here's the cool part — if your code sets `message = ''` somewhere (like a "clear" button), the textarea empties too, because data flows in both directions. That's the power of two-way binding.

---

## What Is a Template Reference Variable?

Alright, let's talk about template reference variables. These give you a direct handle to a DOM element right in your template. You create one by adding a hash sign followed by a name on any HTML element: `#myInput`.

After that, `myInput` refers to the actual DOM element. You can use it anywhere else in the same template — read its `value`, its `placeholder`, any DOM property. You can pass it to event handlers: `(click)="doSomething(myInput.value)"`. You can even wire two sibling elements together — a button that reads a nearby input.

The key thing to understand: the ref gives you a direct handle to the DOM element itself. It's not a property on your component class. It only exists in the template. And for regular HTML elements, it points to the native DOM object. If you put `#ref` on an Angular component, it would point to the component instance instead — but that's a more advanced pattern.

---

## Using a Ref to Read Input Values

Here's the practical pattern. We have an input with `#searchBox` on it and a button next to it. When the button is clicked, we call `onSearch(searchBox.value)`. At that exact moment, Angular reads the current value of the input element and passes it as a string to our handler.

Notice what we didn't need: we didn't need `[(ngModel)]`. We didn't need `FormsModule`. We didn't need a component property to hold the input value. We just said "hey Angular, when this button is clicked, read whatever is in that input right now and give it to my method."

Now, there's a paragraph at the bottom: `{{ searchBox.value }}`. This displays the ref's value, but there's a subtle difference from two-way binding. With a ref, Angular reads the value when change detection runs — which is typically after a click or other event — not on every keystroke. So this paragraph updates when you click the button, not as you type.

With a ref, you read the value only when you need it, instead of keeping it in sync constantly. That's the fundamental difference from two-way binding.

---

## Refs vs Two-Way Binding

So when do you use which? This is a practical decision you'll make all the time.

Use `[(ngModel)]` when you need the value updating on every keystroke in real time. A live preview, a character counter, search-as-you-type — anytime the UI needs to react continuously to what the user is typing. And when you need to programmatically update the input — like setting `message = ''` to clear it.

Use `#ref` when you only need the value at a specific moment — like when a button is clicked. When you're just passing a value to an event handler as a one-time read. When you want to avoid importing `FormsModule` for something simple. Or when you're wiring two sibling elements together in the template.

The short version: `[(ngModel)]` is constant sync. `#ref` is on-demand access. Pick the one that matches what you're building.

---

## What Is Safe Navigation?

Now let's talk about protecting your templates from null values. The safe navigation operator — question mark dot, `?.` — lets you access nested properties on objects that might be null or undefined without crashing your app.

Here's the problem. Say you have a `user` variable that could be null. If you write `{{ user.address.city }}` in your template and `user` is null, your app crashes. You get "Cannot read properties of null, reading 'address'." The template tried to access `.address` on something that doesn't exist.

The fix is `?.`: `{{ user?.address?.city }}`. Now Angular checks each step. Is `user` null? If yes, stop here and return undefined. Is `user.address` null? If yes, stop here and return undefined. Only if every step succeeds does it return the actual city value. And Angular renders `undefined` as an empty string — so you get blank space instead of a crash.

Here's the thing that makes this immediately relevant: you'll need this the moment you start loading data from an API, which you'll do on Day 3. API data arrives asynchronously — your component renders before the data shows up. During that gap, your data is null. Without `?.`, the template crashes. With `?.`, it renders blank until the data arrives, then fills in. That's the pattern. Get comfortable with it now, because starting Day 3, it'll be in almost every template you write.

---

## Safe Navigation Example

Let me walk through a concrete example. We have a `User` interface with `name`, optional `email`, and optional `address` with optional `street`, `city`, and `state`. We have `currentUser` that has a name and a city but no street and no email. And `guestUser` that's just null — the whole thing.

In the template, for `currentUser`: `{{ currentUser?.name }}` displays "Angela" because `currentUser` exists and has a name. `{{ currentUser?.address?.city }}` displays "Portland" — both checks pass. `{{ currentUser?.address?.street }}` displays blank — `street` is undefined, so `?.` returns undefined, which Angular renders as empty.

For `guestUser`: `{{ guestUser?.name }}` — `guestUser` is null, so `?.` short-circuits immediately. No crash, just blank. Same for `{{ guestUser?.address?.city }}` — null at the first check, blank output.

The pattern is consistent: `?.` either gives you the value if everything in the chain exists, or gives you blank if anything is null. No crashes, no error handling needed.

---

## What Is Nullish Coalescing?

Now, safe navigation is great for not crashing, but sometimes blank space isn't a good user experience. You want to show a fallback value instead. That's what nullish coalescing does — the double question mark, `??`.

The syntax is `expression ?? fallbackValue`. If the left side is null or undefined, use the right side instead. So `{{ user?.name ?? 'Guest' }}` means: if the user's name exists, show it; if it's null or undefined, show "Guest."

Here's an important detail: `??` only triggers on `null` and `undefined`. It does not trigger on zero, empty string, or `false`. This is different from the logical OR operator `||`, which triggers on all falsy values.

Why does that matter? Imagine you have `itemCount` and it's zero. With `||`: `{{ itemCount || 'No items' }}` — zero is falsy, so this shows "No items." That's wrong! You have zero items and you want to display that. With `??`: `{{ itemCount ?? 'No items' }}` — zero is not null or undefined, so this correctly shows "0."

Use `??` when you want fallbacks only for truly missing data. It's the safer choice.

---

## Combining ?. and ??

The real power comes when you combine both operators. Safe navigation `?.` returns undefined when something is null. Nullish coalescing `??` replaces undefined with a fallback. Together, they give you safe access with meaningful defaults.

Without `??`: `{{ user?.address?.city }}` renders blank when the city is missing. With both: `{{ user?.address?.city ?? 'Unknown city' }}` renders "Unknown city" instead. Much better user experience.

This is the pattern you'll use over and over in real Angular apps. Whenever you display data that might not exist yet — loading from an API — or data that's optional — the user didn't fill in their profile — you combine `?.` and `??` to get safe access with helpful fallback text.

Get comfortable writing something like `{{ user?.name ?? 'Anonymous' }}`. It's going to become second nature.

---

## What @Input() Does

Alright, now we're moving into component communication. In Part A, you learned that components are the building blocks of Angular apps. But components need to talk to each other. The first direction is parent to child — sending data downward. That's what `@Input()` does.

`@Input()` is a decorator you put on a component property. It marks that property as receivable from a parent component. The parent uses property binding — square brackets — to pass a value in.

So in the child component, you write `@Input() name: string = ''`. That says "this property can be set by my parent." Over in the parent's template, you write `<app-greeting [name]="currentUser"></app-greeting>`. The square brackets are property binding — the same syntax we learned earlier — but now the target is a component input instead of a DOM property.

When Angular sees `[name]="currentUser"`, it evaluates `currentUser` in the parent's context, and sets the child's `name` property to that value. When `currentUser` changes in the parent, Angular updates the child automatically.

The critical thing to understand: data flows one direction only. Parent to child. The child cannot modify the parent's data through an `@Input()`. It's a one-way pipeline.

---

## @Input() Example

Let me show the full wiring. In the parent, we have `currentUser = 'Angela'` and `currentAge = 28`. In the parent's template, we write `<app-greeting [name]="currentUser" [age]="currentAge">`. Both `name` and `age` are `@Input()` properties on `GreetingComponent`.

Angular evaluates `currentUser` — gets "Angela" — and sets the child's `name` property. Evaluates `currentAge` — gets 28 — and sets the child's `age` property. The child's template uses `{{ name }}` and `{{ age }}` to display them.

Now, a couple of syntax details. `[name]="currentUser"` — with brackets — means the right side is a TypeScript expression. Angular evaluates it. `name="Guest"` — without brackets — means the right side is a literal string. Angular just passes "Guest" directly. And `[age]="0"` — you need brackets for numbers because without them, `"0"` would be the string "zero" not the number zero.

These are the same property binding rules we learned earlier. The only difference is that now the target is a component input instead of a DOM property.

---

## @Input Data Flows One Direction Only

I want to emphasize this because it's a fundamental Angular concept. Data through `@Input()` flows one way: parent to child. The child receives data, but it cannot push data back to the parent through the same channel.

Why does Angular enforce this? Because it makes your app predictable. If data only flows downward, and something changes, you know the parent changed it. You don't have to wonder "did the parent change this, or did the child change it, or did some other component change it?" There's one source of truth — the parent — and data flows down from there.

But what if the child needs to tell the parent something? What if the user clicks a button in the child and the parent needs to know about it? That's where `@Output()` comes in. The pattern is: `@Input()` for data flowing down, `@Output()` for events flowing up. Let's look at `@Output()` now.

---

## What @Output() Does

`@Output()` is the other half of the communication pattern. While `@Input()` sends data down from parent to child, `@Output()` sends events up from child to parent.

The child doesn't modify the parent's data directly — that would violate the one-way data flow principle. Instead, the child emits an event, and the parent decides what to do with it. The child says "hey, something happened." The parent says "okay, here's how I'll respond."

To use `@Output()`, you need three things in the child: the `@Output()` decorator, an `EventEmitter`, and a call to `.emit()`. The `EventEmitter` is a typed object — `EventEmitter<number>` means this event carries a number. When you call `.emit(42)`, the number 42 gets sent up to the parent.

The parent listens using event binding — parentheses — just like we listened for clicks and keystrokes earlier: `(countChanged)="onCountChanged($event)"`. The `$event` variable contains whatever value was passed to `.emit()`.

---

## @Output() Example

Let me walk through this step by step.

Step one: the child creates an `EventEmitter`. `@Output() countChanged = new EventEmitter<number>()`. The generic type `<number>` tells Angular and TypeScript that this event carries a number payload.

Step two: the child emits the event. Inside some method — maybe an `increment()` method — the child calls `this.countChanged.emit(this.count)`. That fires the event and sends the current count value upward.

Step three: the parent listens. In the parent's template: `<app-counter (countChanged)="onCountChanged($event)"></app-counter>`. The `(countChanged)` is event binding — same parentheses syntax we use for click events — and `$event` contains whatever value was emitted.

Step four: the parent handles it. `onCountChanged(newCount: number)` — the parent's method receives the number and does whatever it needs to. Log it, store it, display it, whatever.

The key insight: `$event` is the value passed to `.emit()`. If you emit a number, `$event` is a number. If you emit an object like `{ name: 'Book', qty: 2 }`, `$event` is that entire object. The type of `$event` matches the generic type on your `EventEmitter`.

---

## The Complete Parent-Child Pattern

Let me put the whole picture together because this is the fundamental component communication pattern in Angular.

Data flows down through `@Input()` via property binding. The parent writes `[price]="29.99"`, and the child receives it on its `@Input() price` property.

Events flow up through `@Output()` via event binding. The child calls `this.addToCart.emit(item)`, and the parent handles it with `(addToCart)="onAddToCart($event)"`.

In the parent's template, you see both on the same element: `<app-product [name]="'TypeScript Handbook'" [price]="29.99" (addToCart)="onAddToCart($event)">`. Square brackets push data down, parentheses listen for events coming up.

The parent owns the data. The child requests changes by emitting events. The parent decides what to do. This is how Angular keeps data flow predictable and traceable. You'll use this pattern in every Angular app you build, so make sure you're comfortable with it.

---

## Angular Component Lifecycle

Now let's talk about lifecycle hooks. A lifecycle hook is a method Angular calls automatically at a specific stage in a component's life. You never call these yourself — Angular calls them for you at the right moment.

There are six of them, but for most of the components you'll write, only two matter. `ngOnChanges` fires whenever an `@Input()` value changes. `ngOnInit` fires once, after the component's inputs are set for the first time — this is your setup hook. `ngDoCheck` fires on every change detection cycle — you'll rarely touch it. `ngAfterContentInit` and `ngAfterViewInit` fire after projected content and the view are initialized — useful for advanced cases. And `ngOnDestroy` fires once, just before the component is removed from the DOM — that's your cleanup hook.

For the vast majority of components you write, you'll only implement two of these: `ngOnInit` for setup and `ngOnDestroy` for cleanup. Let's look at each in detail.

---

## What Is ngOnInit?

`ngOnInit` is the lifecycle hook you'll use the most. Angular calls it once, right after it sets the component's `@Input()` values for the first time. That makes it the correct place for any initialization logic that depends on input data.

To use it, implement the `OnInit` interface — `implements OnInit` — and define the `ngOnInit()` method. Inside that method, your `@Input()` values are set and ready to use.

`ngOnInit` runs exactly once — not every time an input changes. It's your setup moment: where you process input data, build display strings, and make initial calculations. Think of it as the "I'm ready to go" signal from Angular.

---

## Why Not the Constructor?

This is where things get tricky, and it's the most common beginner mistake, so I'm going to spend some extra time here.

The constructor runs before Angular sets `@Input()` values. Let me say that again — the constructor runs before inputs are set. Here's the timeline:

Step one: Angular creates the component instance. The constructor runs. At this point, your `@Input()` properties are still at their default values — empty strings, zeros, whatever you initialized them to. The parent hasn't passed anything in yet.

Step two: Angular processes the parent's template bindings and sets the `@Input()` values. Now `name` is "TypeScript Handbook" and `price` is 29.99.

Step three: Angular calls `ngOnInit()`. Now — and only now — can you safely use `this.name` and `this.price`.

In plain English: the constructor runs too early. If you try to build a display label from your inputs in the constructor, you'll get empty strings and zeros because the parent hasn't handed over the data yet.

This catches people because in regular TypeScript and other languages, the constructor is where you put initialization logic. In Angular, the constructor's job is limited — it's mainly used for dependency injection setup, which we'll cover on Day 3. For anything that reads `@Input()` values, use `ngOnInit()`.

---

## ⚠️ WARNING — Constructor Initialization Mistake

Let me show you the exact bug so you recognize it when it happens to you.

Wrong version: in the constructor, we write `this.displayLabel = ` backtick `${this.name} — $${this.price.toFixed(2)}` backtick. What happens? `this.name` is an empty string and `this.price` is zero, so `displayLabel` becomes " — $0.00." That's not what you wanted. The parent is passing "TypeScript Handbook" and 29.99, but the constructor ran before those values arrived.

Correct version: the exact same code, but in `ngOnInit()` instead of the constructor. Now `this.name` is "TypeScript Handbook" and `this.price` is 29.99, so `displayLabel` becomes "TypeScript Handbook — $29.99." That's the right answer.

The fix is always the same: move the code from the constructor to `ngOnInit()`. If you see weird default values or empty strings showing up where you expected real data, check whether you're initializing in the constructor instead of `ngOnInit`. It's almost always the problem.

---

## ngOnInit Example — Building a Display Label

Here's a practical example. We have a `ProductCardComponent` with three inputs: `name`, `price`, and `inStock`. We want to build two display properties from them: `displayLabel` that combines name and formatted price, and `statusBadge` that shows "In Stock" or "Sold Out" based on the boolean.

In `ngOnInit`, we do both: `this.displayLabel = ` template literal with `this.name` and `this.price.toFixed(2)`. And `this.statusBadge = this.inStock ? '✅ In Stock' : '❌ Sold Out'`.

The template just uses `{{ displayLabel }}` and `{{ statusBadge }}`. Clean, simple. The processing happens once in `ngOnInit`, and the template just displays the results.

This is a very common pattern — take raw `@Input()` data, process it into display-ready properties in `ngOnInit`, and use those processed properties in the template.

---

## What Is ngOnDestroy?

Alright, so `ngOnInit` is the setup hook. `ngOnDestroy` is the teardown hook. Angular calls it once, right before it removes a component from the DOM.

When does a component get destroyed? When the user navigates to a different page — that's routing, coming on Day 4. When a conditional in the template hides it. Or when the parent component itself is destroyed.

The reason `ngOnDestroy` exists is cleanup. If your component started a timer, opened a WebSocket, or subscribed to a data stream, you need to stop those things when the component goes away. If you don't, they keep running in memory — consuming CPU and memory for no reason. That's a memory leak.

---

## Memory Leak Example

Let me show you what a memory leak looks like. Here's a component that starts a `setInterval` in `ngOnInit`. Every second, it logs a message to the console. But there's no `ngOnDestroy` — no cleanup.

What happens? The user navigates to this component, the interval starts. The user navigates away, Angular destroys the component — but the interval keeps running. It's still in memory, still firing every second, still logging to the console. The user can't see it, but it's consuming resources.

The user comes back to the component, Angular creates a new instance, another interval starts. Now two intervals are running. The user navigates away and back again — three intervals. Do this ten times and you have ten intervals running simultaneously, all consuming memory and CPU.

This is why cleanup matters. Every timer, every subscription, every resource you open in `ngOnInit` needs to be closed in `ngOnDestroy`. It's a habit you need to build from day one.

---

## ngOnDestroy Example — Clearing an Interval

Here's the fix. In `ngOnInit`, we start the interval and store the timer ID in a private property: `this.timerId = window.setInterval(...)`. We use `window.setInterval` to get a number back — that number is the timer ID.

In `ngOnDestroy`, we check if the timer ID is not null, and if so, call `window.clearInterval(this.timerId)`. That stops the interval. We also set `timerId` back to null for good measure.

The pattern is simple: start in `ngOnInit`, store the handle, clean up in `ngOnDestroy`. You'll use this same pattern for RxJS subscriptions on Day 3 — the concept is identical, just with different cleanup methods.

Build this habit now. Every time you start something in `ngOnInit`, immediately add the cleanup in `ngOnDestroy`. Don't wait — do it right away while you're thinking about it.

---

## Signals — First Look

Alright, I want to give you a brief preview of something called signals. Don't worry about fully understanding this yet — we go deep on signals tomorrow on Day 2. This is just a first look so the syntax isn't completely new when you see it.

A signal is a reactive value container. Think of it as a box that holds a value, and when you change what's in the box, anything watching the box knows it changed.

You create a signal with `signal(0)` — that creates a signal initialized to zero. You read it by calling it like a function: `count()` with parentheses. You update it with `.set()` to replace the value entirely — `count.set(5)` — or `.update()` to transform the current value — `count.update(current => current + 1)`.

The parentheses on read are the key thing to notice. In templates, you write `{{ count() }}` not `{{ count }}`. That's different from regular properties. We'll explain why tomorrow.

Again — exercises today do not require signals. This is just a preview.

---

## computed() — Derived Signals

One more signals concept: `computed()`. A computed signal creates a derived value that recalculates automatically when its source changes.

You write `const doubled = computed(() => count() * 2)`. That arrow function reads `count()` and doubles it. Angular tracks that dependency. When `count` changes, `doubled` automatically recalculates.

You read a computed signal the same way — `doubled()` with parentheses. But unlike a writable signal, you can't `.set()` or `.update()` a computed. It's read-only — it derives its value from other signals.

Why does this matter? Signals are Angular's modern approach to reactive state. They make change detection more efficient and your code more declarative. But that's tomorrow's topic. For now, just get the syntax in your head — `signal()` to create, parentheses to read, `.set()` and `.update()` to write, `computed()` for derived values.

Don't worry about fully grasping the implications yet. We'll spend a full session on this tomorrow.

---

## Signals in a Component

Here's what signals look like inside a component — just for reference. A `readonly count = signal(0)` creates the writable signal. A `readonly doubled = computed(() => this.count() * 2)` creates the derived value. Methods call `this.count.update()` or `this.count.set()` to change the value.

In the template: `{{ count() }}` and `{{ doubled() }}` — both with parentheses. Buttons use `(click)="increment()"` and `(click)="reset()"` — standard event binding that you already know.

That's all I want to show you for now. Signals are a first-class feature in modern Angular and we'll dig into them properly tomorrow. Let's move on to the legacy contrast section.

---

## Coming Up — Modern vs Classic (Legacy) Angular

Alright, we're going to shift gears for a few minutes. Everything you just learned — standalone components with direct imports, FormsModule imported in the component that uses it, clean parent-child data flow — that's modern Angular. That's what you should write.

But before Angular 17, things worked differently. There was a system called NgModule that was the only way to organize an Angular app. It still works — you'll encounter it in older codebases, in Stack Overflow answers, in tutorials written before 2023.

I'm going to show you the classic approach for a few of the patterns we just covered. The goal isn't for you to learn it — it's for you to recognize it when you see it. Modern Angular is what you write. Classic is what you read.

---

## Modern ngModel vs Legacy ngModel

Let's start with `FormsModule` — reinforcing what you just learned. In the modern standalone approach, you import `FormsModule` directly in the component's `imports` array. You can see the dependency right in `character-counter.component.ts`. If you delete the component, the import goes with it. No dead dependencies hanging around.

In the classic NgModule approach, `FormsModule` was imported in `app.module.ts` — a completely separate file. It was available to every component in the module, even those that didn't use it. You couldn't tell from a component file that it depended on FormsModule. If someone cleaned up `app.module.ts` and removed it, every `[(ngModel)]` in the app would silently break — no error, just non-functional inputs.

And every new component had to be added to the `declarations` array manually. Forget to add it? "Is not a known element" error. In large apps, that array grew to dozens of entries. The standalone approach eliminated all of that boilerplate.

---

## Modern @Input() vs Legacy @Input()

The `@Input()` decorator syntax is identical in modern and legacy — same decorator, same property, same behavior. What's different is how the component is registered and how visible its dependencies are.

In the modern version, the parent has `standalone: true` and `imports: [GreetingComponent]`. You open `app.component.ts` and immediately see that it depends on `GreetingComponent`. Explicit, traceable, right there in the file.

In the legacy version, both components live in an NgModule's `declarations` array. You can't tell from `app.component.ts` which children it uses — you have to dig through `app.module.ts`. And if `GreetingComponent` was in a different module — say a `SharedModule` — you'd need to export it there and import that module here. Two files to edit just to use one component.

Also: in legacy code you'll see `styleUrls` plural with an array instead of the modern `styleUrl` singular. A small tell, but you'll spot it right away.

---

## Modern @Output() vs Legacy @Output()

This is the easiest legacy comparison of the session: the `@Output()` decorator, `EventEmitter`, and `.emit()` syntax are identical in modern and legacy Angular. There is no difference in how you create, emit, or listen to events. The code inside your component is exactly the same.

The only difference — again — is registration. Modern: `standalone: true`, parent imports the child directly. Legacy: registered in an NgModule's `declarations` array, and the cross-module component sharing headaches are the same as with `@Input()`.

If `CounterComponent` lived in a `SharedModule`, you'd export it there, import `SharedModule` in the module that needed it — two files to edit just to use one component's events. Standalone components made that entire dance unnecessary.

---

## Legacy Lifecycle Hooks

Here's the most important thing to know about lifecycle hooks in the context of legacy Angular: they work exactly the same. The `OnInit` and `OnDestroy` interfaces, the method names, the timing, the behavior — all identical between modern and legacy. `ngOnInit` and `ngOnDestroy` are a core Angular concept that has not changed.

In legacy code you'll see the familiar tells: no `standalone: true`, `styleUrls` plural as an array, and the component registered in an NgModule's `declarations`. But open up `ngOnInit()` and `ngOnDestroy()` and the code inside looks just like what you wrote today — same `setInterval`, same `clearInterval`, same cleanup pattern.

That's the overarching lesson from this entire legacy section: the core Angular features — data binding, `@Input()`, `@Output()`, lifecycle hooks — all work the same. What modern Angular fixed was the overhead around component registration. Standalone components replaced the module system and made every dependency explicit right at the point of use.

---

## Binding Syntax Cheat Sheet

Before we close, let's lock in the four binding types with a quick review of the cheat sheet on this slide. Use it as a reference card.

Interpolation — double curly braces, `{{ expression }}` — component to template. Use it for text content between HTML tags.

Property binding — square brackets, `[property]="expr"` — component to template. Use it when setting an element property, especially booleans, numbers, or anything that's not purely a string.

Event binding — parentheses, `(event)="handler()"` — template to component. Use it whenever you're reacting to a user action: a click, a keystroke, a form input.

Two-way binding — banana in a box, `[(ngModel)]="prop"` — both directions simultaneously. Use it when you need real-time sync between a form input and a component property. And always remember to import `FormsModule`.

These are the four tools you'll use every day building Angular templates.

---

## Key Takeaways

Alright, let's wrap up with the four key takeaways from this session.

First: Angular has four binding types, each with a clear direction. Interpolation `{{ }}` and property binding `[prop]` send data from the component to the template. Event binding `(event)` sends actions from the template back to the component. Two-way binding `[(ngModel)]` does both simultaneously — but don't forget to import `FormsModule`.

Second: `@Input()` sends data down, `@Output()` sends events up. That's the fundamental parent-child communication pattern. Parents use property binding to pass data and event binding to listen for events. Data flow is always explicit and one-directional per channel.

Third: use `ngOnInit` for initialization, `ngOnDestroy` for cleanup. The constructor runs too early — before inputs are set. Always put initialization logic in `ngOnInit()`. Always clean up timers, intervals, and subscriptions in `ngOnDestroy()` to prevent memory leaks. Build this habit now.

Fourth: safe navigation `?.` and nullish coalescing `??` protect against null. Use `?.` to safely access nested properties that might not exist, and combine it with `??` to provide fallback values instead of blank space. You'll use this pattern constantly when you start working with API data on Day 3.

Great work today. You now have the tools to build interactive Angular components that communicate with each other and handle their lifecycle properly. Let's take a break and then we'll move into the exercises.

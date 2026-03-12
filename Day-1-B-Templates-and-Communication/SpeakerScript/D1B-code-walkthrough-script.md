# Day 1 Part B — Code Walkthrough Speaker Script

**Target duration: 15–20 minutes of spoken delivery**

---

## Introduction — What We're About to Look At

Alright, now that we've gone through the slides and understand the concepts, let's look at actual running code. I'm going to walk you through two sample projects. First, the modern project — built the way you should write Angular today. Then the legacy project — built the way people wrote Angular before version 17. As we go through the legacy code, I'll point out exactly what changed and what pain the old patterns caused.

Both projects demonstrate the same concepts: interpolation, property binding, event binding, two-way binding, template refs, safe navigation, nullish coalescing, `@Input()`, `@Output()`, `ngOnInit`, and `ngOnDestroy`. The modern project also includes a signals preview component that the legacy project doesn't have — because signals didn't exist in legacy Angular.

Let's start with the modern project.

---

## Modern Project — main.ts

Open up `SampleCode/src/main.ts`. This is the application entry point — the very first file that runs when Angular starts up.

You can see it imports `bootstrapApplication` from `@angular/platform-browser`. This is the modern way to launch an Angular app. It takes two arguments: `AppComponent` — our root component — and `appConfig`, which holds application-wide configuration.

That's it. Two imports, one function call. The app boots by rendering `AppComponent` into the `<app-root>` element in `index.html`. You saw this same pattern in Part A. Clean, minimal, no boilerplate.

---

## Modern Project — app.config.ts

Now open `SampleCode/src/app/app.config.ts`. This is the configuration object we just passed to `bootstrapApplication`.

Right now the `providers` array is empty. That's fine for Day 1 — we're not using any application-wide services yet. On Day 3, you'll add `provideHttpClient()` here to enable HTTP calls. On Day 4, you'll add `provideRouter(routes)` for navigation. For now, it's just the shell waiting to be filled.

The key point: application configuration lives here, separate from any component. That's a clean separation of concerns.

---

## Modern Project — app.component.ts (The Parent)

Now let's look at the heart of the app: `SampleCode/src/app/app.component.ts`. This is the root component — the parent that orchestrates everything.

At the top, you can see two interfaces defined: `User` and `CartItem`. `User` has a `name`, an optional `email`, and an optional `address` with optional `street`, `city`, and `state`. Notice those question marks — those are TypeScript optional properties. Some fields might not exist, which is what makes the safe navigation operator necessary in the template. In a real app, this data would come from an API, and you'd have the same optionality.

`CartItem` is simpler — just a `name` and a `quantity`. We always define interfaces for our data shapes. Never pass loose untyped objects around.

Now look at the `@Component` decorator. `standalone: true` — this component manages its own dependencies. And the `imports` array lists exactly three child components: `ProductCardComponent`, `CharacterCounterComponent`, and `SignalCounterComponent`. This is the explicit dependency declaration we talked about in the slides. If you read this file, you know exactly which child components this template uses.

Down in the class body, we have `pageTitle` — a simple string for interpolation. Then `currentUser` — a `User` object with a name, email, and a city and state, but no street. That missing street is intentional — it demonstrates what happens when `?.` encounters an undefined property. And `guestUser` is set to `null` — simulating a scenario where no user is logged in at all.

Then `cartItems` — an empty array that will be populated when children emit events. `lastSearchTerm` for the template ref demo.

Two methods: `onAddToCart` receives a `CartItem` from the child's `@Output()` and pushes it into the array. `onSearch` receives a string from the template ref demo and stores it. Both are event handlers — they respond to actions that originate in the template.

---

## Modern Project — app.component.html (The Template)

Now switch to `SampleCode/src/app/app.component.html`. This is where all the concepts come alive.

The first thing you see is the header with `{{ pageTitle }}`. That's interpolation — the simplest binding type. Angular evaluates `pageTitle` and renders the text.

Section one is the safe navigation and nullish coalescing demo. Look at the "Logged-in User" card. `{{ currentUser?.name }}` — safe navigation through the chain. `{{ currentUser?.address?.city }}` — two levels of safe navigation. And then `{{ currentUser?.address?.street ?? 'No street on file' }}` — this combines both operators. The `?.` safely accesses `street`, which is undefined, and `??` provides the fallback text. Without `?.`, this would crash. Without `??`, it would just show blank space.

The guest user card is even more dramatic. `guestUser` is flat-out `null`. So `{{ guestUser?.name ?? 'Anonymous Guest' }}` — the `?.` immediately returns undefined because the whole object is null, and `??` catches that and shows "Anonymous Guest." Without safe navigation, this entire section would throw a runtime error.

Section two is the template reference variable demo. See `#searchInput` on the input element? That creates a reference to that DOM element. The button uses `(click)="onSearch(searchInput.value)"` — when clicked, it reads the input's current value and passes it to the handler. And then below, `{{ searchInput.value }}` wires a sibling paragraph to display what's in the input. No `ngModel`, no `FormsModule`, no component property needed. Just a direct reference to the DOM element.

Section three has the product cards. Look at this: `<app-product-card name="Angular in Action" [price]="29.99" (addToCart)="onAddToCart($event)">`. Three binding types on one element. `name="Angular in Action"` — no brackets — is a static string. `[price]="29.99"` — with brackets — is property binding that evaluates the expression as a number. `(addToCart)="onAddToCart($event)"` — parentheses — is event binding that listens for the child's `@Output()` event. Data goes down through `@Input()`, events come back up through `@Output()`. There's also a second product card that uses `[name]="'TypeScript Handbook'"` — brackets with inner quotes — which is property binding with a string expression. Both approaches work; it's good to see both.

Below the cards there's a cart summary showing `{{ cartItems.length }}` — interpolation displaying how many items have been added.

Section four just renders `<app-character-counter>` — we'll look at that component next.

Section five renders `<app-signal-counter>` — the Day 2 preview.

---

## Modern Project — product-card.component.ts

Open `SampleCode/src/app/product-card/product-card.component.ts`. This component demonstrates `@Input()`, `@Output()`, and `ngOnInit` working together.

At the top, we have a `CartEvent` interface for the output payload. Then the `@Component` decorator — `standalone: true`, empty `imports` because this component doesn't use any other components or directives in its template.

The class has two `@Input()` properties: `name` and `price`. These receive data from the parent via property binding. Remember — data flows one direction, parent to child. The child can read these values but can't push changes back through the same channel.

Then `@Output() addToCart = new EventEmitter<CartEvent>()`. This creates the event channel going the other direction — child to parent. When something happens in this component, it calls `this.addToCart.emit()` and the parent receives the event.

`displayLabel` is an empty string that gets built in `ngOnInit`. Look at that method — `this.displayLabel = ` a template literal combining `this.name` and `this.price.toFixed(2)`. This is the pattern we emphasized in the slides. This code is in `ngOnInit`, not the constructor, because `@Input()` values aren't set yet when the constructor runs. If you moved this line to the constructor, `displayLabel` would be " — $0.00" instead of "Angular in Action — $29.99."

The `onAddToCart` method receives a quantity string from the template reference variable, parses it to a number, and emits a `CartEvent`. Notice `parseInt(quantityStr, 10) || 1` — the `|| 1` provides a fallback if parsing fails. Then `this.addToCart.emit()` sends the event up to the parent.

---

## Modern Project — product-card.component.html

Now open the template: `SampleCode/src/app/product-card/product-card.component.html`.

`{{ displayLabel }}` at the top — interpolation showing the label built in `ngOnInit`.

Then look at the input element with `#quantityInput`. That's our template reference variable. It's a number input with a default value of 1.

And the button: `(click)="onAddToCart(quantityInput.value)"`. This is the key pattern — a template ref combined with event binding. When the user clicks, Angular reads `quantityInput.value` at that moment — the current text in the input — and passes it to the handler. No `ngModel`, no `FormsModule`. The ref gives you on-demand access to the DOM element.

This is a great contrast with the character counter, which uses two-way binding instead. Same goal — getting a value from an input — but two different approaches depending on whether you need constant sync or on-demand reads.

---

## Modern Project — character-counter.component.ts

Open `SampleCode/src/app/character-counter/character-counter.component.ts`. This is the showcase component — it uses all four binding types plus both lifecycle hooks.

First thing to notice: `imports: [FormsModule]`. This is critical. Without `FormsModule` in this array, `[(ngModel)]` in the template silently does nothing. In modern Angular, you import it right here, directly in the component that needs it. The dependency is explicit — anyone reading this file knows this component uses forms features.

The class has `message` — the two-way binding target. `maxLength` for the character limit. `charCount` tracking total keystrokes via event binding. `autoSaveCount` for the interval timer.

And `autoSaveTimerId` — a private property storing the timer handle. This is important — you need to hold onto this ID so you can clear the timer later.

`ngOnInit` starts the interval: `window.setInterval` runs a callback every 5000 milliseconds. If the message has content, it increments `autoSaveCount`. The timer ID is stored in `autoSaveTimerId`.

Look at the two getters: `remainingChars` subtracts the message length from the max. `isOverLimit` returns a boolean. These are computed values displayed via interpolation and used in property binding.

`onInput` is the event binding handler — called on every keystroke, incrementing `charCount`. This tracks total keystrokes, including deleted characters, which is different from `message.length`.

`clearMessage` sets `message` to an empty string. Because of two-way binding, this also clears the textarea. That's the power of `[(ngModel)]` — changes in code automatically reflect in the DOM.

And then `ngOnDestroy` — the cleanup hook. It checks if the timer ID exists and calls `window.clearInterval()`. This is the habit I want you to build: every time you start something in `ngOnInit`, immediately write the cleanup in `ngOnDestroy`. If you skip this, the interval keeps running after the component is destroyed — that's a memory leak.

---

## Modern Project — character-counter.component.html

Open the template: `SampleCode/src/app/character-counter/character-counter.component.html`.

The textarea has two bindings on it: `[(ngModel)]="message"` for two-way binding, and `(input)="onInput($event)"` for event binding. Both work simultaneously. Two-way binding keeps `message` and the textarea in sync. Event binding calls `onInput` on every keystroke to track the count.

Below, `{{ remainingChars }}` is interpolation, and `[class.over-limit]="isOverLimit"` is property binding. When `isOverLimit` is true, Angular adds the CSS class `over-limit` to the paragraph, which the component's CSS styles in red.

The submit button has `[disabled]="isOverLimit || message.length === 0"` — property binding on the `disabled` DOM property. When the expression is true, the button is grayed out. The clear button uses `(click)="clearMessage()"` — event binding to call the method.

And at the bottom, three lines of interpolation showing the current stats: message length, total keystrokes, and auto-save count. All four binding types, right here on one screen.

---

## Modern Project — signal-counter.component.ts

Last modern file: `SampleCode/src/app/signal-counter/signal-counter.component.ts`. This is clearly labeled as a Day 2 preview — you don't need to understand every detail yet.

It imports `signal` and `computed` from `@angular/core`. `readonly count = signal(0)` creates a reactive value initialized to zero. `readonly doubled = computed(() => this.count() * 2)` creates a derived value that recalculates automatically when `count` changes. And `readonly message = computed()` derives a user-friendly string.

Notice how you read a signal: `this.count()` — with parentheses. That's different from regular properties. And `.update()` takes a function: `this.count.update(current => current + 1)`. While `.set()` replaces the value directly: `this.count.set(0)`.

We'll dig deep into why signals work this way and what they buy you tomorrow on Day 2. For now, just get the syntax in your head.

---

## Modern Project — signal-counter.component.html

In the template, the key thing is those parentheses: `{{ count() }}` and `{{ doubled() }}`. Regular properties would be `{{ count }}` without parens. Signals require them because reading a signal is a function call — that's how Angular tracks which signals each template depends on.

The buttons use standard event binding — `(click)="increment()"`, `(click)="decrement()"`, `(click)="reset()"`. Event binding works exactly the same with signals as with regular properties. The template differences are only in how you read values.

That's the complete modern project. Every concept from the slides is demonstrated in real, running code.

---

## Transition to Legacy

Now let's look at the legacy version of the same app. Built with NgModule, the way Angular worked before standalone components. I want you to watch for the differences — where dependencies are declared, where `FormsModule` is imported, and what information you lose compared to the modern approach.

---

## Legacy Project — main.ts

Open `SampleLegacyCode/src/main.ts`. Compare this to the modern version we just saw.

Instead of `bootstrapApplication(AppComponent, appConfig)`, we have `platformBrowserDynamic().bootstrapModule(AppModule)`. The entry point bootstraps a module, not a component. The app doesn't start with a component — it starts with this central registry called `AppModule`. Everything in the app has to be registered in that module before Angular knows it exists.

`platformBrowserDynamic` is from `@angular/platform-browser-dynamic` — even the import path is different. This was the only way to start an Angular app before standalone components. More boilerplate, more indirection.

---

## Legacy Project — app.module.ts

Now open `SampleLegacyCode/src/app/app.module.ts`. This file is the big one — the central registry that doesn't exist in modern Angular.

The `@NgModule` decorator has four arrays. `declarations` lists every component in the app: `AppComponent`, `ProductCardComponent`, `CharacterCounterComponent`. Every single component had to go here. Forget one? "Is not a known element" error. In a large app, this array could have dozens or even hundreds of entries.

`imports` lists Angular modules: `BrowserModule` and `FormsModule`. Here's the critical difference from modern Angular — `FormsModule` is imported once at the module level, and it becomes available to every component declared in this module. In the modern version, `CharacterCounterComponent` imports `FormsModule` in its own `imports` array. Here, the dependency is invisible from the component file. You'd have to come check this file to know `FormsModule` is available.

`bootstrap` tells Angular which component to render first — `AppComponent`. In modern Angular, that's the first argument to `bootstrapApplication`.

And notice: no `SignalCounterComponent` anywhere. Signals are a modern feature with no legacy equivalent.

The pain point: this file is a bottleneck. Every new component, every new feature module, every new directive requires editing this file. And the relationship between what's imported and which components actually use it is completely hidden. If someone removed `FormsModule` from this imports array — maybe they didn't think anything used it — every `[(ngModel)]` in the entire app would silently break. No error message, just non-functional inputs.

---

## Legacy Project — app.component.ts

Open `SampleLegacyCode/src/app/app.component.ts`. Compare this to the modern `app.component.ts` we saw earlier.

Look at the `@Component` decorator. No `standalone: true`. No `imports` array. This component can use `<app-product-card>` and `<app-character-counter>` in its template, but you'd never know that from reading this file. Those components are available because they're all declared in the same module — hidden coupling.

Also notice `styleUrls` — plural, with an "s" — and it takes an array: `['./app.component.css']`. The modern version uses `styleUrl` — singular — with a plain string. It's a small difference, but it's one you'll spot in legacy codebases.

The class body is nearly identical to the modern version. The `User` interface, `currentUser`, `guestUser`, `cartItems`, `onAddToCart`, `onSearch` — all the same. That's because component logic, `@Input()`, `@Output()`, safe navigation, and nullish coalescing are Angular features that work the same in both patterns. What changed between legacy and modern is how components are organized and registered, not how they work internally.

---

## Legacy Project — app.component.html

Open the template. It's almost identical to the modern version. `{{ pageTitle }}`, safe navigation with `?.`, nullish coalescing with `??`, template refs with `#searchInput`, property binding with `[price]="29.99"`, event binding with `(addToCart)="onAddToCart($event)"` — all the same syntax.

There's a "LEGACY NgModule Pattern" badge in the header, and the styling uses a purple theme to visually distinguish it. But the template syntax itself is identical.

The one structural difference: there's no `<app-signal-counter>` section at the bottom. Signals don't exist in legacy Angular.

And there's a comment in the template that says it all: "These child components work here because AppModule declares them. In the modern version, AppComponent imports them directly." The template can use these components, but the reason why is invisible — it lives in a completely different file.

---

## Legacy Project — product-card.component.ts

Open `SampleLegacyCode/src/app/product-card/product-card.component.ts`. Compare this to the modern version.

No `standalone: true`. No `imports` array. `styleUrls` with an "s" and an array instead of `styleUrl` singular. Those are the structural differences.

But look at the actual component logic: `@Input() name`, `@Input() price`, `@Output() addToCart = new EventEmitter`, `ngOnInit` building the display label, `onAddToCart` emitting the event. Identical. The `@Input()` and `@Output()` decorators are not legacy — they're the standard pattern you learned today. On Day 2, you'll learn the signal-based alternatives, `input()` and `output()`, but the decorator versions are perfectly valid modern Angular.

The template is identical too — same interpolation, same template ref, same event binding.

---

## Legacy Project — character-counter.component.ts

Now open the most interesting legacy file: `SampleLegacyCode/src/app/character-counter/character-counter.component.ts`.

Remember the modern version? It had `imports: [FormsModule]` right in the component. This legacy version has no `imports` array at all. There's no `standalone: true`, no indication whatsoever that this component depends on `FormsModule`. The `[(ngModel)]` in its template works because `FormsModule` is imported in `app.module.ts` — a completely different file.

This is the core pain point of the legacy module system. The dependency is real — remove `FormsModule` from the module and `ngModel` breaks — but it's invisible from the component's perspective. In a large codebase with dozens of components, tracking down which components actually use which module features becomes a nightmare.

The rest of the component is functionally the same: `message` for two-way binding, `maxLength`, `autoSaveCount`, the interval timer in `ngOnInit`, the cleanup in `ngOnDestroy`, the getters for `remainingChars` and `isOverLimit`. Lifecycle hooks work identically in legacy and modern Angular. The binding syntax in the template is identical too.

---

## Legacy Project — character-counter.component.html

Open the legacy template. It's the same binding syntax: `[(ngModel)]="message"`, `(input)="onInput($event)"`, `{{ remainingChars }}`, `[class.over-limit]="isOverLimit"`, `[disabled]`, `(click)="clearMessage()"`. All four binding types, same as modern.

The comment at the top says it perfectly: "The key legacy difference is invisible here — FormsModule is imported in app.module.ts, not in this component." You can stare at this template and the component class all day, and you'll never see where `FormsModule` comes from. That's the hidden coupling problem.

---

## Summary — What Changed and What Didn't

Let me wrap up with the big picture of what you just saw.

What stayed the same between modern and legacy: all four binding types — interpolation, property, event, and two-way — use identical syntax. `@Input()` and `@Output()` decorators work exactly the same. Lifecycle hooks — `ngOnInit` and `ngOnDestroy` — are identical. Template features like safe navigation `?.`, nullish coalescing `??`, and template reference variables `#ref` are identical. The core Angular features didn't change.

What changed: how components are organized and registered. In modern Angular, each component is standalone and imports its own dependencies. In legacy Angular, a central NgModule declared all components and imported shared modules on their behalf. The result? Modern Angular gives you explicit, traceable dependencies right in the component file. Legacy Angular hides those dependencies in a separate module file, making the codebase harder to understand and maintain.

The modern project also has a signal counter component with no legacy equivalent — because signals are a new reactive primitive that only exists in Angular 17 and later.

When you encounter legacy code in the real world — in older projects, in Stack Overflow answers — you'll recognize the patterns: `NgModule`, `declarations`, `imports` at the module level, `styleUrls` plural, no `standalone: true`. And you'll know exactly what the modern equivalents are. That's the goal.

Alright, let's take a break and then dive into the exercises.

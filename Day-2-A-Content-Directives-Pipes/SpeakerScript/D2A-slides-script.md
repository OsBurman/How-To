PART 1 — THE PROBLEM: ZONE.JS

SLIDE 1 — Day 2 Part B: Signals
Welcome back everyone. This is Day 2, Part B, and we're diving into what I'd argue is the most important topic in this entire course: Signals.
By the end of this session you're going to be comfortable with four new APIs — signal(), computed(), effect(), and the signal-based input(), output(), and model() functions. These aren't just nicer syntax. They're the foundation of how Angular works going forward, and they're what Angular's entire future is built on.
Before we touch any code, I want to give you some context for why signals exist. Because understanding the "why" is going to make everything else click much faster. So let's start there.

SLIDE 2 — What You'll Be Able to Do
Here's where we're going. By the end of this session you'll be able to create writable signals and update them. Derive read-only values with computed() that are lazy and cached. Run side effects with effect() and properly clean them up. And wire up parent-child communication using the signal-based APIs.
You'll also be able to explain — not just recite, but actually explain — why signals dramatically improve performance.
We'll spend time at the end looking at the legacy patterns signals replaced: @Input, @Output, ngOnChanges, plain getters. Not because you should write them, but because you will encounter them in real codebases, and you need to be able to read them.
Modern signals are what you write. Legacy is shown for recognition only. Alright, let's go.

SLIDE 3 — How Zone.js Works
To understand why signals are such a big deal, you need to understand what Angular was doing before them. And that means understanding zone.js.
Zone.js is a library Angular has used for years to know when something in your app changed. It works by patching — basically monkey-patching — every browser event. Every click, every keystroke, every timer, every HTTP response. Zone.js wraps all of it.
When any event fires, zone.js taps Angular on the shoulder and says: something happened. Angular then responds by running change detection on the entire component tree — from the root component all the way down to every single leaf. Every binding in every template gets re-evaluated. Angular is checking: did this value change? Did this one? Did this one?
Pause.
Think of it like this: every time someone knocks on the front door, you go room by room through the entire building to check if anything changed. That's zone.js. And as your app grows, that building gets very big.

SLIDE 4 — Why Zone.js Is a Problem
Here's the core problem: zone.js doesn't know what changed. It only knows something happened. So Angular has no choice — it has to check everything, every time.
A button click in your footer triggers change detection in your header, sidebar, modal, and every child component in between — even if none of those have anything to do with that button.
Now think about getters in templates. If you have a get total() that computes a derived value, that getter runs on every single change detection cycle. Whether or not the data it depends on has actually changed.
As your app grows, this wasted work adds up. More components, more bindings, more getters — more re-evaluations per event. There's no error. Nothing breaks. Things just get sluggish. Invisibly.
💡 If anyone asks: this is exactly why the OnPush change detection strategy exists — it's a manual optimization to skip some of this. Signals make that entire approach unnecessary.

SLIDE 5 — What Signals Change
Signals flip the entire model. Instead of Angular asking "did anything change?" after every event, signals tell Angular exactly what changed.
Here's how it works. A signal notifies Angular the moment its value is updated. Angular already knows which DOM nodes read that signal — it tracked that when the template was first evaluated. So when the signal changes, Angular goes directly to those specific DOM nodes and updates only those.
Nothing else is checked. Nothing else runs. Updates are surgical.
This is the core idea behind everything you're going to learn today. Keep it in your head as we look at the individual APIs — each one is an expression of this same idea.
Point at the slide.
Signal changes → Angular knows the subscribers → only those nodes update.

PART 2 — CORE PRIMITIVES: signal(), computed(), effect()

SLIDE 6 — What Is a Signal?
Alright, let's get concrete. A signal is a reactive container. It holds a value, and it notifies Angular whenever that value changes.
Three things to know from the start.
First: signals come from @angular/core. This is not a third-party library. It's built into Angular.
Second: to read a signal's value, you call it like a function. Parentheses are required. count() in TypeScript, {{ count() }} in templates. This trips people up constantly, so I'm telling you now, before you see the code.
Third: signals are synchronous. No Observables, no subscriptions, no async plumbing. You set a value, Angular knows, the template updates. That's it.
💡 The parentheses rule is the single most common source of confusion for beginners. When you forget them, you'll see [Signal] rendered in the template instead of the actual value. That's your signal — no pun intended — that you forgot the parens.

SLIDE 7 — Creating and Reading a Signal
Creating a signal is one line. You call signal() with an initial value, and you've got a reactive container.
On this slide you can see a signal initialized to zero. To read the current value: this.count() — parentheses. In the template, same rule: {{ count() }}.
If you ever see [Signal] rendered in your browser instead of a number, your first thought should be: I forgot the parentheses. That's the fix, ninety-nine times out of a hundred.
Point at the template.
The template looks almost identical to what you already know. The only difference is those parentheses after the signal name. Small change, big habit to build early.

SLIDE 8 — Updating with .set()
There are two ways to update a signal. The first is .set(). Use it when you already know the exact new value you want to put in.
You have a form input that returned a new string? Use .set(). Reset button? this.count.set(0). Just got a value back from an API call? .set() with that value.
It replaces whatever is currently in the signal completely. Clean and direct.
A useful heuristic: if your update doesn't need to look at what's currently in the signal, reach for .set().

SLIDE 9 — Updating with .update()
The second way to update a signal is .update(). Use this when the new value depends on the current value.
.update() takes a callback. That callback receives the current value as its argument, and whatever you return becomes the new value.
Increment: current => current + 1. Double: current => current * 2. Toggle a boolean: current => !current. Append to an array: current => [...current, newItem].
The rule of thumb: if the new value is derived from the old one, use .update(). If you're replacing it with something entirely unrelated to what was there before, use .set().

SLIDE 10 — signal() in a Component
Now let's see this in a real component. A counter — simple, but it shows the full pattern.
Point at the TypeScript side.
We define count as a signal with initial value zero. The increment method uses .update() because it derives from the current value — it adds one to whatever is there. The reset method uses .set() because we know exactly what we want: zero.
Point at the template.
We read the signal with parentheses. The buttons call the methods. That's the whole component.
Give students a moment to read the code.
Notice the readonly keyword on the signal. This doesn't mean the signal's value is read-only — you can still call .set() and .update(). It means you can't reassign the signal variable itself to point to something else entirely. It's a safety net that prevents accidental overwriting.
💡 If you have time: ask the class to predict what the UI shows after clicking increment three times and then reset. Gets them actively reading the code.

SLIDE 11 — What Is computed()?
Now let's talk about derived values. Sometimes you don't want to store a value directly — you want to compute it from other values automatically. That's computed().
computed() creates a read-only signal whose value is automatically derived from one or more other signals. Whenever a dependency changes, the computed value is marked stale. The next time something reads it, it recalculates. If nothing has changed, it returns the cached result instantly — zero work.
Three things to remember: you read it with parentheses, just like a regular signal. You cannot write to it — no .set(), no .update(), those are compile errors. And Angular tracks the dependencies for you automatically — you don't declare them.

SLIDE 12 — How computed() Works
This slide gets into the mechanics, and it's worth spending a moment here because this is what separates computed() from a plain getter.
When you call computed(), you give it a callback. Angular watches which signals get read inside that callback — those become the dependencies. When any dependency changes, the computed value is flagged as stale.
But here's the key part: it doesn't recalculate immediately. It only recalculates the next time something actually reads it. And if nothing reads it — nothing triggers a recalculation at all.
Compare that to a plain JavaScript getter. A getter runs on every change detection cycle whether or not its data changed. A computed signal only runs when it needs to.
💡 The word "lazy" is useful here. Computed signals are lazy — they don't do work until asked. Getters are eager — they run whenever Angular happens to check. That distinction matters a lot in a large app.

SLIDE 13 — computed() — Code Example
Here's computed() in action. A shopping cart with a price signal and a quantity signal. We derive two things from those: total, which is price times quantity, and label, which adjusts its wording based on whether quantity is exactly one or more.
When price changes — total updates. When quantity changes — both total and label update. When nothing changes — both return their cached values instantly.
In the template, we call them exactly like any other signal: label() and total(). You can even chain method calls on the result — .toFixed(2) here formats the number to two decimal places.
Point at the computed declarations.
Notice there's no manual dependency registration. We didn't say "this computed depends on price and quantity." Angular figured that out by watching what signals were read inside the arrow function.

SLIDE 14 — ⚠️ WARNING: computed() Is Read-Only
Short, important, non-negotiable: you cannot write to a computed signal. Trying to call .set() or .update() on a computed is a compile-time error. Angular will not build.
If you find yourself wanting to write to a computed, stop and ask yourself: "Does this value come from other signals?" If yes — computed(). "Do I need to set it directly?" If yes — plain signal().
They serve different purposes. computed() is for values that are automatically derived. signal() is for values you control directly. Don't confuse them.
💡 A good analogy: a computed is a formula in a spreadsheet cell, not a variable. You wouldn't try to type a number directly into a formula cell — you'd change the input cells. Same idea here.

SLIDE 15 — What Is effect()?
We've covered reactive state and derived values. The third primitive is effect(), and this one is for side effects.
A side effect is anything that needs to happen outside the template. Logging to the console. Saving to localStorage. Calling a non-Angular API when data changes. Anything that interacts with the world beyond your component's own rendering.
effect() registers a function that runs automatically whenever any signal it reads changes. It runs once immediately when the component initializes, then re-runs whenever a relevant signal changes.
Two important constraints: it must be created in an injection context — inside a class field initializer or inside the constructor. And you should not use it to set other signals — that's what computed() is for.

SLIDE 16 — When to Use effect()
Let me give you a clean decision rule: if the result shows up in the template, use computed(). If it talks to the outside world, use effect().
Good uses: logging signal changes, saving to localStorage, calling a third-party library when data changes, starting a debounced timer.
Bad uses: calculating a derived value you'll display in the template — that's computed(). Setting another signal's value based on a change — also better handled with computed() or by restructuring.
The mistake I see most often is people reaching for effect() to set another signal. Angular actually warns you about this in development mode. The rule is: effects are for the outside world, computed() is for the reactive graph.

SLIDE 17 — effect() — Code Example
Here's the simplest possible effect: logging when a search term changes.
We have a searchTerm signal. The effect reads it — which makes searchTerm a dependency. Every time searchTerm changes, the effect re-runs and logs the new value. It also runs once immediately when the component initializes.
Note that we store the effect in a private readonly field. You don't call it or manage it — Angular handles the scheduling. You just declare it.
Point at the effect declaration.
Also notice: the effect automatically figured out its dependencies. We didn't declare anything. Angular tracked the read of this.searchTerm() inside the callback and registered it as a dependency.

SLIDE 18 — The Cleanup Function
Here's something critical that trips people up: if your effect creates a resource — a timer, a subscription, a DOM event listener — you must return a cleanup function that destroys that resource.
The pattern: inside your effect callback, create your resource, then return a function that tears it down. Angular calls that cleanup function in two situations: right before the effect re-runs because a dependency changed, and when the component is destroyed.
The example on this slide shows an auto-save using setTimeout. Every time formData changes, we want to start a one-second timer to save it. But before starting the new timer, we need to cancel the previous one — otherwise we'd have dozens of pending timers stacking up.
The cleanup function does exactly that: return () => window.clearTimeout(timerId). One timer at a time. Clean, no leaks.

SLIDE 19 — effect() with Cleanup — Full Example
This slide shows the full debounce pattern. A query signal, an effect that starts a 300ms timer whenever the query changes, and a cleanup that cancels the previous timer before the next one starts.
Give students time to read the code — it's the most involved thing so far.
Read through the shape of it: read the dependency, create the resource, return the cleanup. That's the pattern every time.
The result: if a user types three characters quickly, only the timer started after the third character ever fires. The first two get cancelled by the cleanup function before they complete. That's debouncing — and it's handled entirely within one effect, with no class properties needed to track timer IDs.
💡 If students ask why we capture the query into a local const before using it in the timeout: it's good practice. It ensures the timeout closure captures the right value at the moment the effect ran, even if the signal updates again before the timeout fires.

SLIDE 20 — ⚠️ WARNING: Forgetting Cleanup
This is the memory leak warning. Pay attention.
The broken example creates a new timer every time formData changes but never cancels the previous one. After ten changes, ten pending timers. After a hundred changes — a hundred timers. This is a memory leak, and it can cause unexpected behavior when multiple timers fire in unpredictable order.
The working example is identical except for one thing: the return statement. return () => window.clearTimeout(id). One line. That's the difference between a leak and a clean implementation.
Let this land.
The rule is: if you open it, close it. If you start a timer, cancel it. If you subscribe to something, unsubscribe. Always return a cleanup function when your effect creates any kind of resource.

PART 3 — PARENT-CHILD COMMUNICATION: input(), output(), model()

SLIDE 21 — What Is input()?
Now let's shift to parent-child communication. We've covered state management within a single component. Now: how do components talk to each other?
input() is the signal-based replacement for the @Input() decorator. When a parent passes a value down to a child component, the child receives it as an input() signal.
The key characteristic: it's readonly. The parent owns this value. The child can read it by calling it like a function — same as any signal — but the child cannot call .set() or .update() on it. The parent drives the value; the child receives it.
Because it's a signal, it composes naturally with computed() and effect(). You can derive from it, react to it — all automatically tracked.

SLIDE 22 — input() — Code Example
Here's input() in practice. The child component declares a name input with a default value of 'Guest'. In the parent template, the parent passes a value using the standard property binding syntax: [name]="userName".
Inside the child, we immediately pipe the input into a computed() signal. this.name() — reading the input signal — feeds directly into a derived greeting message. When the parent changes userName, the input updates, the computed recalculates, the template updates. No lifecycle hooks. No manual tracking. Just works.
Point at the computed declaration.
This pattern — input() feeding into computed() — is extremely common. The child receives data, derives something from it, displays the result. Zero boilerplate.

SLIDE 23 — ⚠️ WARNING: input() Is Always Readonly
Short and important: you cannot write to an input signal from inside the child component. The parent owns the value.
Trying to call .set() or .update() on an input is a compile-time error. The build will fail.
If you find yourself wanting to do this — wanting the child to modify a shared value — that's a sign you need model(), which we're about to cover. model() is designed for exactly that case: a value that both sides can read and write.
Think of input() as: the parent hands you something. You can look at it, derive from it, react to it — but you cannot change it.

SLIDE 24 — Required vs Optional Inputs
Two flavors of input signals. Optional inputs take a default value — if the parent doesn't bind to them, the child uses the default. Required inputs use input.required() — if the parent forgets to bind, Angular gives you a compile-time error.
That compile-time error is what matters here. Before this API, if a parent forgot to pass a required @Input, you'd get undefined at runtime — a silent bug that might not surface until a user hits that specific code path in production.
With input.required(), the build fails. You cannot ship code where a required input is missing. That's a substantial improvement in safety.
Point at the error message example on the slide.
The error is clear and actionable. Very different from a runtime undefined that shows up as a blank or broken UI with no indication of why.

SLIDE 25 — What Is output()?
While input() handles data flowing from parent to child, output() handles events flowing from child to parent.
output() is the signal-based replacement for @Output() and EventEmitter. The child calls .emit() with a value when something happens — a button click, a selection, a completed action. The parent listens with an event binding: (eventName)="handler($event)".
From the parent's perspective, it looks identical to the old pattern. The same event binding syntax works. The difference is entirely inside the child: no new EventEmitter(), no two imports, no mutable event emitter property.

SLIDE 26 — output() — Code Example
This color picker is a clean illustration. The child has an output signal — colorSelected — typed to string. When a button is clicked, this.colorSelected.emit(color) fires and passes the selected color up to the parent.
In the parent template: (colorSelected)="onColorPicked($event)". $event is the emitted value — in this case the color string.
Point at the child buttons.
Simple. The child doesn't know or care what the parent does with that color. It just emits the event and moves on. That separation — child announces, parent decides what to do — is exactly the pattern you want from a well-designed component.

SLIDE 27 — What Is model()?
input() is one-way — parent to child. output() is one-way — child to parent. model() is two-way — both sides can read and write the same value.
model() is the signal-based replacement for the old @Input + @Output pair pattern. When you have a value that both the parent and child need to modify — a rating widget, a checked state, a selected item — that's model().
The child calls .set() or .update() to change the value, and the parent's value updates automatically. The parent can also change it, and the child's signal reflects that immediately.
One API. One line. Replaces three things: an @Input, an @Output, and an EventEmitter.

SLIDE 28 — How model() Replaces the Old Pattern
This slide shows the before and after, and it's worth really looking at this comparison.
The old way required three separate pieces: an @Input to receive the value, an @Output with a very specific name — the input name plus the word "Change" — and a new EventEmitter instantiation. The naming convention had to be exact. If you wrote ratingChanged or ratings-change, the banana-in-a-box syntax in the parent would silently stop working. No error. Just broken two-way binding.
And inside every method that changed the value, you had to manually emit the change event. Forget to call .emit() — the parent never updates.
The new way: readonly rating = model<number>(1). The child reads with this.rating(), writes with this.rating.set(), and the parent binds with [(rating)]="userRating". Angular handles the rest.
💡 If anyone asks about the naming convention: yes, it had to be exactly the input name plus "Change" with a capital C. The number of bugs that convention caused across the Angular ecosystem is genuinely impressive.

SLIDE 29 — model() — Code Example
This rating component brings everything together: input(), model(), output(), and computed() all in one component. It's worth walking through carefully.
maxStars is an input — the parent configures it, the child reads it, can't change it. rating is a model — both sides can read and write it. confirmed is an output — the child emits it when the user finalizes their pick.
stars is a computed array derived from maxStars. Every time maxStars changes, the array automatically rebuilds.
Walk through the methods.
When the user clicks a star, select() calls this.rating.set(star). That updates both the child's display and the parent's signal simultaneously — no manual event emission needed for the model. The confirm() method is separate: it emits a one-way event when the user finalizes the selection.
Point at the parent template.
Banana-in-a-box for the model, square brackets for the input, parentheses for the output event. Clean, readable, separate concerns.

SLIDE 30 — model() Template Syntax
Let's demystify banana-in-a-box. [(rating)] is shorthand. It expands to two things: [rating]="userRating" — a property binding that passes the parent's signal value down — and (ratingChange)="userRating.set($event)" — an event binding that updates the parent's signal when the child emits a change.
model() generates both halves of this pair automatically. That's why the output in the old approach had to be named with the exact suffix "Change" — Angular's banana-in-a-box was looking for that naming pattern to expand into these two bindings.
One important constraint: the parent must pass a writable signal — not a plain property. When the child calls .set(5), Angular needs somewhere to write that value. A signal provides that write target. A plain string or number doesn't.

SLIDE 31 — input() vs model() vs output() — Quick Comparison
Let's make the decision clear with a quick comparison table.
input(): data flows from parent to child only. Child is read-only. Use it for configuration and display data the child doesn't need to modify.
model(): data flows both ways. Child can write it. Use it when both sides need to own and update the same value.
output(): events flow from child to parent only. Use it for notifications — user actions, selections, completed operations.
When you're unsure which to reach for, ask: who owns this value? If only the parent does, it's input(). If both sides do, it's model(). If the child just needs to announce something happened, it's output().

PART 4 — FINE-GRAINED REACTIVITY AND ZONELESS ANGULAR

SLIDE 32 — Fine-Grained Change Detection
Now let's come back to the big picture. We talked at the start about how zone.js has to check every component on every event. Signals solve this at the architectural level.
With signals, Angular knows which DOM nodes depend on which signals. When signal A changes, Angular goes directly to the DOM nodes that read signal A and updates only those. Signal B is untouched. The components up the tree are untouched. Sibling components are untouched.
This is called fine-grained reactivity. The term means: the granularity of updates matches the actual granularity of changes. One signal changes — one node updates. Not one signal changes — everything checks.
This is a fundamentally different performance model. Your apps feel faster because they are faster, not because of any illusion.

SLIDE 33 — Zone.js vs Signals — Side by Side
Let's walk through the exact same user action in both worlds, step by step.
Zone.js: user clicks a button. Zone.js intercepts the click. Angular checks every component from root to leaves. Every getter and binding in every template re-evaluates. DOM updates wherever values differ. That's potentially hundreds of checks for a single button click.
Signals: user clicks a button. The handler calls count.set(count() + 1). Angular knows count changed. Only the {{ count() }} text node updates. Nothing else is checked. Done.
Same click. Same result on screen. Dramatically less work happening underneath.

SLIDE 34 — Zoneless Angular — The Payoff
This is the slide I want you to remember from this entire session.
Zoneless mode is stable in Angular v21. That means Angular no longer requires zone.js at all. The entire zone.js layer — the monkey-patching, the browser API interception, the confusing stack traces — is gone. Optional. Removable.
How did this become possible? Signals. Because signals tell Angular exactly what changed and when, Angular doesn't need zone.js to intercept browser events anymore. The reactive graph is self-contained.
The benefits: apps start faster because there's no zone.js initialization overhead. Change detection is faster because there are no tree walks. Debugging is simpler because zone.js stack traces were notoriously hard to read.
Everything you've learned today — signal(), computed(), effect(), input(), output(), model() — is not just a cleaner API. It's the foundation that made zoneless possible. You're learning the patterns that define Angular's future, from day one.

PART 5 — MODERN VS LEGACY PATTERNS

SLIDE 35 — Coming Up: Modern vs Classic Angular
Alright. You've now learned the complete modern signal-based approach. Let's shift into the second half of this session.
We're going to look at the legacy patterns — the code that existed before Angular 17 introduced signals. @Input, @Output, ngOnChanges, plain getters, OnPush with markForCheck.
Why? Because you will encounter these. You'll inherit old projects, contribute to existing repos, and find Angular Stack Overflow answers that still show the old approach. You need to recognize them and understand what they're doing.
To be clear: modern signals are what you write. What we're about to look at is shown for recognition only.

SLIDE 36 — Modern: Signal-Based input()
This is a reinforcement slide for the pattern you just learned. Look at what's not here: no lifecycle hooks, no ngOnChanges, no ngOnInit. Just an input signal, a computed signal derived from it, and a template that reads both with parentheses.
Notice standalone: true on the component — that's the modern way. And input() imported directly from @angular/core, no decorators needed.
Now let's see what this looked like before signals.

SLIDE 37 — Legacy: @Input() Mutable Property
Here's the old @Input decorator. The differences start immediately.
standalone: false is implied here — this component would be declared in an NgModule rather than importing itself. styleUrls is a plural array — a small thing, but it's everywhere in older code.
But the real problem is the @Input property itself. It's a plain mutable class property. Nothing stops the child from accidentally writing this.name = 'Something Else' — the parent doesn't know, its state is now out of sync, and there's no error anywhere. Just a quietly wrong UI.
And to react to input changes — to do anything when a new value arrives from the parent — you needed a completely separate lifecycle hook: ngOnChanges. Let's look at that next.
💡 Ask the class: what happens if the child accidentally reassigns the input directly? The parent is unaware, the child is showing different data than the parent thinks it is. A class of bug that input() makes impossible.

SLIDE 38 — Modern output() vs Legacy @Output()
Side by side. Modern on top, legacy below.
Modern: one import, output() typed to string, .emit() to fire it. Three lines total.
Legacy: two imports — Output and EventEmitter. An explicit new EventEmitter<string>() instantiation. The property is mutable — you could accidentally overwrite this.colorSelected = something and your events would silently stop working entirely.
Every single difference makes the old way more fragile and more verbose. The new API is cleaner in every dimension.

SLIDE 39 — Modern model() vs Legacy @Input/@Output Pair
This one really shows how much the old approach required you to know — and how precisely you had to know it.
The old two-way binding pattern needed three things. An @Input to receive. An @Output to emit — named exactly as the input name plus "Change" with a capital C. And new EventEmitter boilerplate. If you got the naming wrong, the parent's banana-in-a-box binding silently stopped working. No error, no warning. Just nothing happening.
And inside every method that updated the value, you had to manually call .emit(). Forget it once — parent never updates.
model(): one line. Child calls .set(), both sides update. No manual emission. No naming convention to memorize. No way to forget something.

SLIDE 40 — Modern: Reacting with computed() and effect()
Reinforcement slide. Two required and optional inputs, a computed total, and an effect that logs when the total crosses a threshold.
No lifecycle hooks. The dependency tracking is automatic. The alert fires whenever total changes and exceeds 1000. The template stays in sync. Everything just works from the declarations.
Notice how readable the code is: look at the class body and you can immediately see the shape of the component's reactivity. That's by design. The reactive graph is explicit and localized.

SLIDE 41 — Legacy: ngOnChanges(SimpleChanges)
Here's the old way to react to input changes: the ngOnChanges lifecycle hook. This fires whenever any @Input value changes.
Look at the pain points carefully.
First: you have to check each input individually using string keys — changes['price'], changes['quantity']. These are string keys with no type safety. A typo gives you no error at all, just a silently broken reaction. Your component stops updating and you have no idea why.
Second: derived values and side effects are both crammed into this one hook. The total calculation and the console.log are mixed together. As the component grows, this hook becomes a dense, difficult mess.
Third — and this is subtle: ngOnChanges only fires when the input reference changes. If you have an object input and you mutate a property on it without replacing the object, ngOnChanges never fires. Silent failure with no error.
💡 Ask: what happens if someone adds a third @Input and forgets to check for it in ngOnChanges? It silently doesn't react to that input ever changing. With computed(), you just read the new signal inside the callback and you're automatically tracking it.

SLIDE 42 — Modern: computed() for Derived State
Reinforcement. Signal-based cart with two computed values derived from the items array.
Three characteristics worth saying out loud again: lazy — only recalculates when read. Cached — returns the stored value if nothing changed. Tracked — Angular knows exactly which DOM nodes depend on each computed signal.
isEmpty and total are independent of each other. Changing the items array might update one, both, or neither, depending on what actually changed. Angular handles all of that tracking automatically.

SLIDE 43 — Legacy: Getters and ChangeDetectorRef
Here's the old pattern for derived state. A plain JavaScript getter.
Looks clean. But look at the behavior: get total() runs on every change detection cycle. Every time any event fires anywhere in the app, zone.js triggers change detection, and this reduce() call runs. Whether or not items changed. Whether or not the total would be any different.
With OnPush change detection enabled, you could skip some of this — but then you had to manually call ChangeDetectorRef.markForCheck() every time you made a change. Forget that call, and your component shows stale data. No error. Just wrong output on screen.
computed() replaces both the getter and the ChangeDetectorRef dance. Runs only when needed, caches the result, and Angular knows exactly when to re-render from signal dependencies alone.

SLIDE 44 — Modern: effect() with Cleanup
Reinforcement of the effect and cleanup pattern. Cart items signal, a debounced localStorage save, cleanup to cancel the previous timer before the next one starts.
Notice how readable this is: the dependency is at the top of the effect. The side effect is below it. The cleanup is right there with the code that creates the resource. Everything you need to understand this effect is in one place.
No class properties to track timer IDs. No lifecycle hooks to split the logic across. One function, self-contained, all the relevant code together.

SLIDE 45 — Legacy: Scattered Cleanup Across Hooks
This is the old version of the exact same pattern. And this is where the fragility of lifecycle hooks really shows.
The timer ID is a class property now. The debounce logic lives in ngOnChanges, where we have to check SimpleChanges before doing anything. The previous timer has to be manually cleared. Then there's a completely separate ngOnDestroy hook that also needs to clear the timer — because if the component is destroyed while a timer is pending, that timer will still fire and may try to access a destroyed component.
Count the ways this breaks. Forget to cancel in ngOnChanges — timers stack up. Forget ngOnDestroy — timer fires after destruction. Forget the null check on timerId — runtime error. Each of these is a real category of production bug I've seen in Angular apps.
The effect() version has one place where it can go wrong: forgetting the return statement. One mistake instead of four. That's a meaningful difference over the lifetime of a codebase.

SLIDE 46 — Modern Signals vs Legacy Zone.js — Change Detection
Back to the performance comparison, but now with concrete code side by side.
Modern: count signal, doubled computed. count changes — only the two DOM nodes displaying count and doubled update. Nothing else is touched.
Legacy: plain property and getter. Any event fires anywhere in the app — Angular checks every component. The doubled getter runs unconditionally. In a tree of 200 components, that's 200 checks plus all their bindings, plus all their getters.
Signals don't just change syntax. They change the performance model. Signal-based apps feel snappier not because of placebo but because the actual number of operations per user interaction is dramatically lower.

SLIDE 47 — Modern Signals vs Legacy OnPush + markForCheck()
Last comparison: the manual optimization story.
OnPush was the performance strategy Angular developers reached for in large apps. It tells Angular: skip this component during change detection unless its input references change, or unless we explicitly tell you to check it. The "explicitly tell you" part was ChangeDetectorRef.markForCheck(). And you had to call it everywhere. Every service response, every timer result, every async update. Forget it once and the component shows stale data. Silently.
Signals solve this automatically. Angular tracks signal reads and knows exactly which nodes to update. OnPush becomes unnecessary. markForCheck() becomes unnecessary. You can remove ChangeDetectorRef from your components entirely.
Point at both sides of the slide.
The modern side: three lines. The legacy side: constructor injection, an interface to implement, a method with a manual call, and the constant mental overhead of remembering to call it everywhere across a fifty-component codebase.
💡 Ask the class: would you rather maintain the left side or the right side? Their answer makes the case better than anything you can say.

PART 6 — KEY TAKEAWAYS

SLIDE 48 — Key Takeaways
Let's land this.
signal(), computed(), and effect() are the three core primitives. signal() holds reactive state. computed() derives from it — lazily, with caching. effect() runs side effects and must return a cleanup function whenever it creates any kind of resource.
input(), output(), and model() replace @Input, @Output, and the @Input/@Output pair. input() is readonly — the parent owns it. model() is writable by both sides. output() emits events up. All three compose naturally with computed() and effect().
Signals enable fine-grained change detection. Only the DOM nodes that read a changed signal re-render. Zone.js-style full-tree checks are eliminated.
And zoneless Angular — stable in v21 — is the payoff. Everything you learned today made it possible to remove zone.js entirely. You're not learning a niche feature. You're learning the patterns that Angular's entire future is built on.
Open it up.
Questions?
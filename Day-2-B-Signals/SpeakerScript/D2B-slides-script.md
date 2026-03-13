Slide 1 — Title
"Alright, welcome to Part B of Day 2. This session is all about Signals — and I want to be upfront with you: this is probably the most important thing we're going to cover in this entire course. Not because it's the hardest, but because it's the direction Angular is moving. Everything after today builds on what you learn in the next couple hours. So let's dig in."

Slide 2 — What You'll Be Able to Do
"Here's what you'll walk away with. You'll be able to create reactive state with signal(), derive values automatically with computed(), run side effects with effect(), and wire up components to talk to each other using the new signal-based input(), output(), and model().
You'll also be able to explain why signals exist — what problem they solve — and recognize the older patterns they replaced. That last point matters because you will absolutely encounter older Angular code in the wild, and I want you to be able to read it without being confused."

Slide 3 — How Zone.js Works
"Before we touch a single line of signal code, I need to give you some context. To understand why signals are the way they are, you need to understand what Angular was doing before them.
The old approach used a library called zone.js. Zone.js works by patching — essentially intercepting — every browser event. Every click, every keystroke, every timer, every HTTP response. When any of those fire, zone.js taps Angular on the shoulder and says: 'Hey, something happened.'
Angular's response to that was to run change detection on the entire component tree. Root to every single leaf. Every binding in every template gets re-evaluated to see if anything changed.
I like to describe this as: checking every room in a building every time someone knocks on the front door. It works. But it's not efficient."

Slide 4 — Why Zone.js Is a Problem
"Here's the real issue. Zone.js doesn't know what changed. It just knows something happened. So Angular can't be selective — it has to check everything.
That means a button click in the footer triggers change detection in the header, the sidebar, and every child component — even ones that have nothing to do with that button.
And here's something that bites a lot of Angular developers: getters in templates. If you write a get total() method and use it in a template, that getter runs on every change detection cycle. Every click, every keystroke — even if the data that feeds into total hasn't changed at all. It just runs.
As your app grows, this gets worse. More components, more bindings, more wasted work. Things slow down and there's no obvious error — it just... gets sluggish."

Slide 5 — What Signals Change
"Signals flip this model completely. Instead of Angular asking 'did anything change?' after every event, signals tell Angular exactly what changed.
When a signal's value updates, Angular knows which DOM nodes are reading that signal. And only those nodes re-render. Everything else is untouched.
We call this surgical updates. Not a tree walk. Not a full sweep. Just: this signal changed, these three text nodes depend on it, update those three things. Done.
This is the core idea behind everything you're about to learn. Keep it in the back of your mind as we go through the API."

Slide 6 — What Is a Signal?
"Okay, let's get into the actual code. A signal is a reactive container — it holds a value, and it notifies Angular when that value changes.
A few things to lock in right away:
Signals come from @angular/core. Not a third-party library. This is baked into Angular itself.
You read a signal by calling it like a function. That means parentheses. In TypeScript: this.count(). In a template: {{ count() }}. No parentheses — no value. You'll see why this matters in a second.
Signals are synchronous. There are no Observables here, no subscriptions, no async pipe. You call it, you get the value back immediately.
And Angular tracks dependencies automatically. You don't have to tell it 'hey, this template expression depends on this signal.' Angular figures that out on its own."

Slide 7 — Creating and Reading a Signal
"Creating a signal is straightforward. You call signal() with an initial value and you've got one.
Reading it — parentheses. Always. this.count() in TypeScript. {{ count() }} in the template.
Now — and I'm going to call this out because I see it constantly — if you forget the parentheses in a template, you don't get an error. You get the text [Signal] rendered on screen. Angular is printing the signal object itself, not its value. So if you ever see [Signal] in your UI, the fix is almost always: add parentheses."

Slide 8 — Updating with .set()
"There are two ways to update a signal. The first is .set(). This completely replaces the value. You know what the new value is, you hand it over directly.
Good examples: resetting a counter to zero, setting a value from an API response, responding to a form input.
Straightforward — nothing fancy here."

Slide 9 — Updating with .update()
"The second way is .update(). This takes a callback. The callback receives the current value and returns the new value.
Use this when the new value depends on what's already there. Incrementing a counter, toggling a boolean, appending to an array.
The mental model: .set() is 'I know what it should be.' .update() is 'I need to know what it was to figure out what it should be.'
Both are useful. You'll use both regularly."

Slide 10 — signal() in a Component
"Here's a complete component putting it all together. We've got a counter.
The signal is declared as a class field — readonly count = signal(0). Readonly because you don't want anything externally reassigning the signal itself. You can still update the value through .set() and .update() — that's fine. The readonly just protects the reference.
increment() uses .update() because it derives from the current value. reset() uses .set() because we know exactly what we want — zero.
In the template, {{ count() }} — parentheses. The buttons call the methods. Simple, clean, reactive."

Slide 11 — What Is computed()?
"Now, signals are great for state you manage directly. But what about values that are derived from that state?
That's what computed() is for. It creates a read-only signal whose value is automatically calculated from other signals. And critically — it only recalculates when one of its dependencies actually changes. Otherwise it returns a cached result.
Key things to know: you read it with parentheses, same as any signal. And you cannot write to it. No .set(), no .update(). It's derived — you don't set it, the dependency signals drive it."

Slide 12 — How computed() Works
"Here's what makes computed() genuinely better than a plain getter.
When you read a computed signal, Angular tracks every signal you call inside that callback. Those become dependencies. When any dependency changes, the computed result is marked stale. The next time something reads it, it recalculates. If nothing changed, it returns the cached value instantly — no work at all.
Compare that to a getter, which runs every single time change detection sweeps through. A computed signal is lazy. It only does work when it needs to."

Slide 13 — computed() Code Example
"Here's a cart component with two signals — price and quantity — and two computed signals derived from them.
total multiplies them. label returns either '1 item' or 'N items' depending on the quantity.
In the template, label() and total() — parentheses again. And notice total().toFixed(2) — you call the signal to get the value, then call the method on that value. That's just normal JavaScript chaining.
Change price or quantity, both computeds update. Nothing else fires."

Slide 14 — WARNING: computed() Is Read-Only
"This one is worth stopping on. Computed signals are read-only. Period. If you try to call .set() or .update() on one, you get a compile-time error. Not a runtime error — TypeScript catches it before your code even runs.
If you find yourself wanting to write to a computed, that's a signal — no pun intended — that you've modeled it wrong. Ask yourself: 'Does this value come from other signals?' If yes, it's a computed(). 'Do I need to set it directly?' Then it should be a signal()."

Slide 15 — What Is effect()?
"The third primitive is effect(). And this one is specifically for side effects — work that needs to happen outside the template.
An effect is a function that runs automatically whenever any signal it reads changes. Angular tracks the dependencies the same way it does for computed().
Two things to know upfront: effects need to be created in an injection context — so inside a component field initializer or constructor. And you should not use effects to set other signals. That's what computed() is for. Effects are for talking to the outside world."

Slide 16 — When to Use effect()
"Let me be concrete about the line between computed() and effect().
If the result shows up in your template, use computed(). Full stop.
If it does something outside Angular — saving to localStorage, logging, firing a debounced search, calling a non-Angular API — that's effect().
A useful test: ask yourself 'where does the result go?' Template → computed(). Somewhere else → effect()."

Slide 17 — effect() Code Example
"Here's a simple example. We have a searchTerm signal. The effect reads it and logs the value.
The effect runs once immediately when the component initializes, then re-runs every time searchTerm changes. Angular sees that the effect reads this.searchTerm() inside the callback and automatically registers it as a dependency.
When onSearch is called and updates the signal, the effect fires again. No manual subscriptions. No teardown."

Slide 18 — The Cleanup Function
"Now here's where effects get a little more nuanced. When your effect creates a resource — a timer, a subscription, anything that needs to be closed — you need to return a cleanup function.
The cleanup function runs in two situations: before the effect runs again, and when the component is destroyed.
In this example, the effect sets a debounced save to localStorage. Before it fires, it creates a timer. When formData changes before that timer runs, the cleanup cancels the pending timer, and a new one starts. Without this, every change would stack up a new timer and they'd all eventually fire. That's a memory leak."

Slide 19 — effect() with Cleanup — Full Example
"Here's the full pattern in one component. query signal. Effect reads it. Creates a timeout. Returns a cleanup that clears the timeout.
So if a user types quickly — 'a', then 'ab', then 'abc' — each keystroke sets the signal, the effect fires, the previous timeout is cancelled before it runs, and a new one starts. Only the last one actually executes. That's a debounce, implemented entirely with signals and an effect."

Slide 20 — WARNING: Forgetting Cleanup
"I want to be direct here: forgetting cleanup in an effect that creates timers or subscriptions is a bug. Not a potential bug — an actual bug.
Look at the bad example. Every time formData changes, a new timer is queued. None of them are ever cancelled. After ten changes, there are ten pending timers, all about to write to localStorage. This is a memory leak and a logic error.
The fix is one line: return the cleanup. If you open it, close it. Make this a reflex — whenever you see a timer, subscription, or listener inside an effect, your next thought should be 'where's my return statement?'"

Slide 21 — What Is input()?
"Okay, now we're moving into component communication. We've covered how a single component manages its state. Now let's talk about how components talk to each other.
input() is the signal-based replacement for @Input(). When a parent passes a value down to a child, the child receives it as an input() signal. It's readonly — the child can read it, but cannot write to it. The parent owns it.
You read it exactly like any other signal: this.name(). And because it's a signal, it works seamlessly with computed() and effect()."

Slide 22 — input() Code Example
"Here's a greeting component. It has a name input with a default of 'Guest'. It has a computed() that derives message from name.
The parent passes the name in with a property binding — square brackets, like always. Nothing changes on the parent side. The binding syntax is identical to the old @Input() approach.
But inside the child, it's reactive. If the parent's userName signal changes, name() updates, message() recomputes, and the template re-renders. All automatically."

Slide 23 — WARNING: input() Is Always Readonly
"Same warning pattern. input() signals are readonly. You cannot call .set() or .update() on them from inside the child. TypeScript will stop you at compile time.
The mental model I like: the parent gave you this value. You're a guest here. You can look at it but you can't change it.
If you need the child to modify a shared value, that's a different tool — model() — which we're about to cover."

Slide 24 — Required vs Optional Inputs
"By default, input() is optional — you give it a default value and the parent doesn't have to provide anything.
If the parent must provide a value — if the component genuinely can't function without it — use input.required(). No default, no fallback. If the parent forgets to bind to it, Angular gives you a compile-time error. Not a silent bug. An actual error that tells you exactly what's missing.
This is a real improvement. A missing required input used to fail at runtime with a null reference error. Now it fails before your code ships."

Slide 25 — What Is output()?
"output() is the signal-based replacement for @Output() and EventEmitter. The child uses it to send data up to the parent.
The API is intentionally similar to EventEmitter — you still call .emit() to fire the event, and the parent still listens with event binding using parentheses. The difference is just less boilerplate on the child side. No new EventEmitter<T>(), no extra import."

Slide 26 — output() Code Example
"Here's a color picker. It has a colorSelected output. When the user clicks a button, pick() is called, which emits the color string up to the parent.
The parent template uses event binding — (colorSelected)="onColorPicked($event)". $event is the string that was emitted.
Clean, typed, minimal. One import, one line to declare it."

Slide 27 — What Is model()?
"Now the interesting one. model() creates a two-way binding between parent and child. Both sides share the same value and both sides can change it.
This replaces a pattern that used to require three things: an @Input(), an @Output(), and an EventEmitter. And the names had to be exactly right or it silently broke. We'll see that in a few slides.
With model(), one line does everything. The child reads with this.value() and writes with this.value.set(). The parent sees the change instantly."

Slide 28 — How model() Replaces the Old Pattern
"Let me show you what this used to take. Old way: you needed an @Input() to receive the value, an @Output() to send it back up, and that output had to be named exactly the input name plus 'Change'. Miss the casing, get the word wrong — the banana-in-a-box syntax silently broke and gave you no error.
Then in your method you had to manually emit and update the local property. Two operations every time.
New way: readonly rating = model<number>(1). That's it. Angular handles the sync in both directions."

Slide 29 — model() Code Example
"Here's a rating component that uses all three communication primitives at once, which is a nice illustration of when to use each.
maxStars is an input() — the parent configures it, the child just reads it. Readonly configuration.
rating is a model() — both sides share this value. The child can write to it, the parent sees the updates.
confirmed is an output() — the child fires a one-way event when the user confirms their rating.
stars is a computed() that builds an array of star indices based on maxStars. When the parent changes maxStars, the array rebuilds automatically.
In the parent template, [(rating)] is the two-way binding. [maxStars] is one-way down. (confirmed) is one-way up."

Slide 30 — model() Template Syntax
"The banana-in-a-box [( )] syntax hasn't changed. But now the parent needs to pass a writable signal, not a plain property.
[(rating)]="userRating" is actually shorthand for [rating]="userRating" (ratingChange)="userRating.set($event)". Angular expands it for you.
When the child calls this.rating.set(5), Angular fires the ratingChange event, and the parent's userRating signal updates to 5. The binding collapses all of that into two characters."

Slide 31 — Quick Comparison Table
"Here's the three-way comparison. Take a moment to look at this — it's worth memorizing.
input(): parent to child, child cannot write. Use for configuration and display data.
model(): both directions, both sides can write. Use for shared editable state.
output(): child to parent, child emits events. Use for notifications and user actions.
Quick test: the parent shows a modal and passes isOpen down. The child has a close button. Should that be input() or model()? — It should be model(), because the child needs to set it to false. If it were input(), the child couldn't close itself."

Slide 32 — Fine-Grained Change Detection
"Let's pull back and talk about what all of this means for performance.
With signals, Angular knows at a node-by-node level which DOM expressions depend on which signals. When Signal A changes, Angular updates only the nodes that read Signal A. Signal B is untouched. Components that don't read Signal A are untouched.
This is called fine-grained reactivity. It's the opposite of zone.js's 'check everything' approach. And it's why signals aren't just a nicer API — they're a fundamentally different performance model."

Slide 33 — Zone.js vs Signals Side by Side
"Let's make that concrete. Same user interaction — clicking a button.
Zone.js: click fires, zone.js intercepts it, Angular walks every component from root to leaves, evaluates every binding, updates where things differ.
Signals: click fires, handler calls count.set(...), Angular updates the one text node that reads count. Nothing else is checked.
Same end result on screen. Dramatically different amount of work to get there. In a small app you won't notice. In a large app with hundreds of components, this is the difference between 60fps and sluggish."

Slide 34 — Zoneless Angular
"And here's the payoff. In Angular v21, zoneless mode is stable. You can remove zone.js from your application entirely.
Faster startup — no monkey-patching of browser APIs. Faster change detection — no tree walks. Simpler debugging — no zone.js in your stack traces.
This was only possible because of signals. Angular now has a direct line to know exactly what changed. It doesn't need zone.js anymore.
Everything you just learned isn't just 'the new way to write Angular.' It's the foundation the framework's entire future is built on. You're learning the right patterns from day one."

Slide 35 — Modern vs Classic Transition
"Alright, quick pause before we look at the legacy patterns.
Everything you've seen so far is what you should be writing. Modern Angular. Signal-based, clean, reactive.
What comes next is for recognition, not for writing. You're going to encounter older Angular codebases. You're going to read tutorials that predate Angular 17. I want you to be able to look at that code and understand what it's doing without being confused.
So let's see how the same things were done before signals existed."

Slide 36 — Modern: Signal-Based input()
"Quick reinforcement before the comparison. Signal-based input() — the child gets a readonly signal, can derive from it with computed(), and Angular tracks everything automatically.
readonly name = input<string>('Guest'). Read it with this.name(). Pass it to computed(). Done."

Slide 37 — Legacy: @Input() Mutable Property
"Here's the old way. @Input() name: string = 'Guest'. A plain mutable property.
Three problems. First, nothing stops the child from writing this.name = 'something else'. The parent doesn't know, there's no error, the value silently diverges.
Second, Angular can't track when name is read in the template. No reactive dependency graph.
Third, if you needed to react when the input changed — say, compute a derived value — you had to implement ngOnChanges(). Separate lifecycle hook, separate interface, SimpleChanges object with string-keyed properties. We'll see that in a minute."

Slide 38 — Modern output() vs Legacy @Output()
"Side by side. Modern: output<string>(). One import, one line.
Legacy: you need two imports — Output and EventEmitter — and you have to explicitly instantiate it with new EventEmitter<string>(). The property was also mutable, so you could accidentally reassign the emitter itself.
The emit call is identical. .emit(color) works the same either way. It's really just the declaration that changed."

Slide 39 — Modern model() vs Legacy @Input/@Output Pair
"This comparison is the clearest win for signals. Old two-way binding required three pieces.
An @Input() to receive. An @Output() whose name had to be the input name plus 'Change' — ratingChange for an input named rating. Angular's banana-in-a-box was shorthand that expanded based on that naming convention. Get the name wrong, nothing worked and Angular gave you no error.
And inside your method, you had to do two things: update the local property and manually emit the change. Forget the emit, the parent never updates. No error. Just silently wrong behavior.
model() collapses all three pieces into one line. And it's harder to break."

Slide 40 — Modern: Reacting with computed() and effect()
"Reinforcement. Signal-based inputs compose naturally with computed() and effect().
price is a required input. quantity has a default. total is computed from both. The alertEffect runs whenever total crosses a threshold.
No lifecycle hooks. No manual dependency tracking. Dependencies are automatic."

Slide 41 — Legacy: ngOnChanges
"Here's what that same logic looked like before signals.
ngOnChanges fires when inputs change. But you have to check each one manually — changes['price'] and changes['quantity']. String keys, no type safety, no autocomplete.
You're manually recalculating total and mixing that derived-value logic with the side-effect logging in the same method. One hook doing two jobs.
And the subtle one: ngOnChanges only fires when the input reference changes. If you pass an object and mutate a property on it, the reference is the same, ngOnChanges doesn't fire, and your derived value silently goes stale. That's a genuinely hard bug to track down."

Slide 42 — Modern: computed() for Derived State
"Reinforcement on computed(). Lazy — only runs when read. Cached — returns stored value if nothing changed. Tracked — Angular knows which DOM nodes depend on it.
items is a signal. total and isEmpty are computed from it. Update the array via this.items.set(newItems) and both recompute automatically."

Slide 43 — Legacy: Getters and ChangeDetectorRef
"Here's the old way to derive values. A plain getter.
The problem: getters run on every change detection cycle. Every single time Angular sweeps through. Even if items hasn't been touched. The reduce() runs anyway.
And if you were using OnPush change detection — which was the performance optimization of choice — you also needed to inject ChangeDetectorRef and call markForCheck() every time you wanted Angular to notice changes. Forget it once and your component shows stale data. No error. Just wrong."

Slide 44 — Modern: effect() with Cleanup
"Reinforcement. The persistEffect pattern — reads cartItems, starts a debounced save, returns cleanup.
Everything in one place. The dependency, the timer, the cleanup. Co-located. When the component is destroyed, the cleanup runs automatically. No lifecycle hooks, no class properties to hold the timer ID."

Slide 45 — Legacy: Scattered Cleanup
"Old way. ngOnChanges to start the timer. ngOnDestroy to clean up when the component dies. Both hooks have to cancel the timer independently. The timer ID has to live as a class property so both hooks can access it.
If you forget the cleanup in either hook, you have a leak. And because they're in separate methods, it's easy to add cleanup in ngOnChanges and forget about ngOnDestroy. They're visually separated and your brain doesn't automatically link them.
With effect(), the cleanup is literally inside the code that creates the resource. You see the timer created and you see the cleanup on the very next line. It's much harder to forget."

Slide 46 — Modern Signals vs Legacy Zone.js: Change Detection
"One more comparison. Signals: change count, only {{ count() }} and {{ doubled() }} update. Nothing else fires.
Legacy: any event fires, Angular checks every component, doubled getter runs whether count changed or not.
In a tree of 200 components, that's 200 unnecessary checks on every click. In a tree of 1000 components, it's 1000. Signals don't scale worse as your app grows. Zone.js does."

Slide 47 — Modern Signals vs Legacy OnPush + markForCheck()
"Last comparison. Legacy performance optimization was ChangeDetectionStrategy.OnPush. It told Angular to skip this component during change detection unless you manually called markForCheck().
Which meant every service call, every timer result, every async operation needed markForCheck() at the end. Forget it — stale UI. No error. Just wrong.
Signals solve this without you doing anything. When a signal changes, Angular knows. You don't request updates. They happen automatically."

Slide 48 — Key Takeaways
"Let me wrap up with the four things I want you to leave this session with.
First: the three primitives. signal() holds reactive state. computed() derives from signals — read-only, cached, lazy. effect() runs side effects — and if it creates resources, it must return cleanup.
Second: the three communication tools. input() is parent to child, readonly in the child. output() is child to parent, fires events. model() is two-way, both sides can write.
Third: signals are not just nicer syntax. They change how Angular does change detection. Instead of checking everything, Angular updates only what changed. That's a performance model shift, not a style change.
Fourth: zoneless Angular is stable in v21. Everything you learned today made that possible. You're not learning a transitional API — you're learning where Angular lives from here on."
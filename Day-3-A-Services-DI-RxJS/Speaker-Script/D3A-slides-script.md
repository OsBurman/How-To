Slide 1 — Title
"Alright everyone, welcome to Day 3, Part A. Today we're covering three things that are deeply connected in Angular: Services, Dependency Injection, and RxJS. By the end of this session you'll have a solid mental model for all three, and you'll see how they fit together to solve real problems. Let's get into it."

Slide 2 — What You'll Be Able to Do
"Here's what you're walking away with today. You'll know how to create a service and inject it into any component using the modern inject() function. You'll know how to model shared state using something called a BehaviorSubject, and how to surface errors cleanly alongside that state. You'll understand what an Observable actually is — and how it's different from a Promise. You'll be able to use the core RxJS operators to transform data streams. And you'll know the two tools Angular gives you to make Observables safe in components — takeUntilDestroyed and toSignal. A lot of ground, but it all connects. Let's start at the beginning."

Slide 3 — Why Services Exist
"So far you've been putting logic directly inside components. And that works fine — until your app grows. The moment you have multiple components that need the same data or the same logic, you hit a wall.
Look at this component tree. UserAvatarComponent needs the logged-in user. But it's four levels deep. To get that data down to it, you'd have to pass it as an @Input through every single component along the way — AppComponent, DashboardComponent, SidebarComponent — even though none of those intermediate components actually care about the user at all. That's called prop-drilling, and it's painful.
Services solve this. A service is a place to put shared logic and shared state. Any component that needs it just asks Angular for it directly — no threading data through layers. That's the core idea."

Slide 4 — What a Service Looks Like
"Here's what a service looks like. It's literally just a TypeScript class with a decorator — @Injectable. Nothing magic here.
The class holds whatever logic or state you want to share. In this example, getUserName() just returns a string — but in a real app this might be fetching data from an API, managing a cart, handling auth state, whatever.
The @Injectable decorator tells Angular's dependency injection system: 'this class can be injected as a dependency.' And providedIn: 'root' — that's the part that makes it available everywhere in your app. We're going to look at what that actually does on the next slide."

Slide 5 — @Injectable({ providedIn: 'root' })
"providedIn: 'root' does three specific things, and they're all useful.
First — singleton. Angular creates exactly one instance of this service for the entire app. Every component that asks for CartService gets the same object back. That's how shared state works — everyone's reading and writing the same instance.
Second — available everywhere. You don't have to register it in any module or declare it anywhere else. You just inject it and it works.
Third — tree-shakable. This one's about bundle size. If nothing in your app ever actually injects CartService, Angular's build tool removes it from the final bundle entirely. No dead weight.
So the mental model for providedIn: 'root' is: this service belongs to the whole app. That's the right default for the vast majority of services you'll ever write."

Slide 6 — Angular DI — One Instance, Whole App
"Let's look at what's actually happening under the hood when you inject a service.
Angular has something called an injector — think of it as a registry, a lookup table that maps a class token to an instance. When Component A asks for CartService, Angular checks the registry. If an instance doesn't exist yet, it creates one and stores it. When Component B asks for CartService, it gets the same instance back. Same for Component C.
This diagram shows that all three components are pointing at the same single instance managed by the root injector. This is the foundation of how shared state works in Angular — the state lives in the service, and all components read and write the same object."

Slide 7 — inject() in a Component
"Now let's look at how you actually use a service in a component. The modern way is with inject() — a function that Angular 14 introduced.
You call it as a class field initializer — so at the top of the class, as a field declaration. Angular resolves it at construction time, so by the time your component is running, the service is already there.
You mark it private readonly — private because it's an internal implementation detail of this component, and readonly because the reference to the service never changes.
Then you use it wherever you need it — ngOnInit, event handlers, wherever. The service is just a normal field on the class."

Slide 8 — inject() Syntax — Where It Goes
"There's one rule with inject() that you need to burn into your memory: it must run inside an injection context.
An injection context is any moment when Angular's injector is active. That happens during class construction — which is exactly when class field initializers run. So class fields are safe.
What's NOT safe? Methods. ngOnInit runs after construction. The injector is gone by then. If you try to call inject() inside a method, Angular will throw a runtime error.
The rule of thumb is simple: all inject() calls go at the top of the class as field declarations. Never inside ngOnInit, never inside event handlers, never inside any method.
You'll hear 'injection context' come up again when we talk about takeUntilDestroyed() and toSignal(). Same rule applies to both."

Slide 9 — inject() Beyond Components
"inject() isn't just for components. It works anywhere Angular has an injection context — services, pipes, guards, interceptors, factory functions.
The really interesting ones here are functional guards and interceptors. In older Angular you needed a whole class just to access a service inside a guard. Now you can write a plain function, and because Angular calls that function in an injection context, inject() just works. The next slide shows you exactly what that looks like."

Slide 10 — inject() in a Functional Guard
"Here's a functional guard. No class, no constructor — just a function that returns true or a redirect URL.
Inside the function, we call inject(AuthService) and inject(Router). This works because Angular calls this guard function inside an injection context, so the injector is active.
If the user is logged in, return true — navigation proceeds. If not, we redirect to /login using router.createUrlTree.
This is a clean, concise pattern. You'll see it again in Day 4A when we cover routing properly."

Slide 11 — The data/error/error
/error Pattern

"Now let's talk about how to expose state from a service in a way that's both reactive and safe.
The pattern is: a private BehaviorSubject for the data, a private BehaviorSubject for the error state, and then public read-only Observables exposed via .asObservable().
Why .asObservable()? Because a BehaviorSubject has a .next() method on it — meaning any code that holds a reference to the subject can push values into it. That's dangerous. .asObservable() strips the .next() method off and returns a plain Observable — components can subscribe and read, but they can never write. The service owns the write end. Components only get the read end.
The string | null type for the error subject is intentional — null means 'no error right now.'"

Slide 12 — Wrapping Updates in try/catch
"When something can fail — like an HTTP call — you catch it in the service and push the error to _error$. The component never needs to handle try/catch itself.
A few things to notice here. First, we clear the error at the start of every attempt — this._error$.next(null) — so a stale error from a previous failed attempt doesn't stick around.
If the fetch succeeds, we push the data to _recipes$. If it fails, we push a user-friendly message to _error$.
Notice we don't re-throw the error. The service handled it. Components just react to what's in the streams. They don't need to know about the underlying failure mechanics."

Slide 13 — Displaying Errors in a Component
"Here's how the component uses those streams. We inject the service, then convert both Observables to signals using toSignal() — we'll dig into that in detail later. For now just know it lets the template read the values directly.
In the template, we check if errorMessage() has a value — if so, show it. Then we loop over recipes() with @for. Clean separation: the service owns the state and error logic, the component just displays what it receives."

Slide 14 — What an Observable Is
"Okay, let's step back and talk about what an Observable actually is, because this is foundational to everything that follows.
An Observable is a stream of values over time. Think of it like a sequence of events — value, value, value — that eventually either completes or errors out.
There are three key characteristics. First, it's push-based — the Observable decides when to emit. You react to it; you don't poll it.
Second, it's lazy. Nothing happens until someone subscribes. The Observable is just a definition of what will happen — it's not a running process. This is different from a Promise, which starts executing the moment you create it.
Third, it can emit zero, one, or many values. A Promise always delivers exactly one. An Observable can deliver none, one, or an endless stream.
In this code example, of(1, 2, 3) defines an Observable but nothing gets logged. Only when you call .subscribe() does it actually run."

Slide 15 — Observable vs Promise
"Here's the comparison side by side. Promises deliver exactly one value and start immediately. Observables can deliver any number of values, start lazily on subscribe, and can be cancelled by unsubscribing.
The composability point is important — Observables have an enormous operator library for transforming, filtering, combining, and timing streams. Promises have .then() and .catch(). That's it.
For a single HTTP call? The difference is small. For a live search box, real-time data feeds, or combining multiple async sources? Observables are dramatically better. That's why Angular leans on them so heavily."

Slide 16 — The subscribe() Method
"subscribe() is how you turn an Observable on and start receiving values. You pass it an observer — an object with up to three callback functions.
next is called every time a value arrives. error is called if the stream throws — and the stream stops after that. complete is called when the stream ends normally.
In this example with of(1, 2, 3), we get next called three times, then complete fires.
Now — in real Angular apps you'll mostly use toSignal() rather than calling subscribe() directly in your components. But understanding subscribe() is essential to understanding what toSignal() is doing for you under the hood."

Slide 17 — of() — Static Values
"of() is the simplest way to create an Observable. You give it values, it emits them in order and completes immediately.
You'll use this mostly in tests — when you need to fake an HTTP response without making a real call. Or when you need to return a fallback value in an operator chain. It's the 'I have data right now and I want to put it in a stream' function."

Slide 18 — from() — Array or Promise
"from() converts something that already exists into an Observable. You can pass it an array — and it'll emit each item as a separate value. Or you can pass it a Promise, and it wraps it in an Observable that emits the resolved value.
The distinction between of() and from() with an array trips people up. of(['a','b','c']) emits the whole array as one value. from(['a','b','c']) emits 'a', then 'b', then 'c' — three separate emissions. Pick the one that matches what you need downstream."

Slide 19 — timer() — Delayed or Interval Emissions
"timer() lets you emit after a delay, or on a repeating interval.
One argument gives you a one-shot — emit once after N milliseconds, then complete. Two arguments give you a delayed interval — wait the first delay, then emit every N milliseconds after that.
You'll reach for this for polling — checking an endpoint every few seconds. Or for delayed UI feedback — auto-hiding a success toast after a couple seconds. Or for retry logic — wait a moment before trying again."

Slide 20 — Subject — Push Values In
"We've talked about Observables you subscribe to. A Subject is different — it's an Observable you can also push values into. It's both a producer and a consumer.
It's also multicast — one Subject, many subscribers, all receiving the same emissions at the same time.
In this example, click$ is a Subject. We subscribe before pushing values. When we call click$.next('button-save'), the subscriber gets it immediately. When a second subscriber joins later, it only gets values emitted after it subscribed — it misses everything from before.
That last point is the key limitation of Subject. If you need late subscribers to get the current state, use BehaviorSubject instead."

Slide 21 — BehaviorSubject — Always Has a Value
"BehaviorSubject is a Subject with memory. It holds its current value and immediately gives it to any new subscriber — even if they subscribed after the last emission.
You must give it an initial value when you create it.
In this example, Subscriber A gets 0 immediately on subscribe because that's the initial value. When we push 1 and 2, A gets those too. When Subscriber B joins, it immediately gets 2 — the current value — without waiting for the next emission.
You can also call .getValue() synchronously to read the current value without subscribing at all.
This is why BehaviorSubject is the go-to for shared state in services. Any component that subscribes immediately knows where things stand."

Slide 22 — Subject vs BehaviorSubject
"Quick comparison. Subject — no initial value required, late subscribers get nothing from the past, no .getValue(). Best for event streams where you only care about what happens next.
BehaviorSubject — requires an initial value, late subscribers get the current value immediately, .getValue() available. Best for state — anything where a new component needs to know what's happening right now.
If you're ever unsure which to reach for, ask yourself: does a newly subscribed component need to know the current value? If yes, BehaviorSubject. If it only cares about future events, Subject."

Slide 23 — Cold Observables
"Now a concept that confuses a lot of people — cold vs hot Observables.
A cold Observable creates a fresh, independent execution for every subscriber. Each subscriber gets the full sequence from scratch.
of() and from() are cold. The important one for Angular is HttpClient.get() — every subscribe triggers a completely new HTTP request. If you subscribe three times, you send three requests."

Slide 24 — Hot Observables
"A hot Observable has one shared source. All subscribers tap into the same stream. Late subscribers miss what happened before they joined.
Subject and BehaviorSubject are hot. DOM events are hot — you're not creating a new click event stream per subscriber, you're all listening to the same DOM. WebSocket connections are hot. Router events are hot."

Slide 25 — Hot vs Cold — Why It Matters
"The practical impact shows up with HTTP. http.get() is cold. If you subscribe to it in three places, you send three HTTP requests. That's usually not what you want.
The clean Angular pattern for sharing an HTTP result: call the API once in a service, push the result into a BehaviorSubject, and expose that subject as an Observable. All subscribers read from the hot subject — one request, shared result.
That's the pattern we've been building toward the whole time. HTTP is cold. Services that expose BehaviorSubject.asObservable() are hot. Understanding that distinction helps you avoid a very common bug."

Slide 26 — pipe() — Chaining Operators
"Before we look at individual operators, you need to understand pipe() — the method that chains them together.
pipe() takes a sequence of operators and wires them into a pipeline. Each operator receives the output of the previous one.
In this example, we start with numbers 1 through 5. filter lets only even numbers through — so 2 and 4. Then map multiplies each by 10 — so 20 and 40. The subscribe gets 20, then 40.
Two things to remember: pipe() doesn't mutate the original Observable, it returns a new one. And nothing runs until .subscribe() is called. pipe() is just describing the transformations — it's not executing them yet.
Think of it like an assembly line. Raw ingredients go in one end, each station does one job, finished product comes out the other."

Slide 27 — map — Transform Values
"map transforms every emitted value. It works exactly like Array.prototype.map — you get a value in, you return a transformed value, and that transformed value continues down the stream.
In the service context — a very common use is unwrapping a nested HTTP response. If your API returns { items: [...] }, you can use map(response => response.items) to pull out just the array. Everything downstream sees a clean array, not the wrapper object."

Slide 28 — filter — Pass Matching Values
"filter lets through only the values that pass a condition. Values that don't match are silently dropped.
Same mental model as Array.prototype.filter.
The real-world example on this slide is important: narrowing out null values with a type guard. filter((user): user is User => user !== null) does two things — it drops null emissions from the stream, and it tells TypeScript that after this point, the type is User, not User | null. That cleans up a lot of type errors downstream."

Slide 29 — tap — Side Effects Only
"tap is a debugging and side-effect tool. It lets you peek at values as they flow through the pipeline without changing anything. The value passes through completely untouched.
The classic use is logging — you stick a tap in before and after a map to see what's going in and coming out. Great for debugging a pipeline without disrupting it.
Also useful for triggering analytics or other side channels alongside your main data flow.
The one thing tap is NOT for: transforming data. If you find yourself doing calculation work inside a tap, move it to a map."

Slide 30 — switchMap — Cancel and Switch
"switchMap is probably the most important higher-order operator you'll use. It maps each incoming value to a new inner Observable — and cancels the previous inner Observable when a new value arrives.
The live search example is perfect. User types 'a' — we start an HTTP call. User types 'an' before the call returns — switchMap cancels the first call and starts a new one. User types 'ang' — cancels that one, starts another. Only the most recent in-flight request survives.
Without switchMap, you'd get responses arriving out of order. Stale results for 'a' might arrive after results for 'angular' and overwrite them. switchMap eliminates that problem entirely — only the latest matters."

Slide 31 — combineLatest — Merge Latest Values
"combineLatest watches multiple Observables and emits a combined array whenever any of them emits — combining the latest value from each source.
In this example, we have a user$ stream and a settings$ stream. combineLatest watches both. Whenever either emits, we get the latest user AND the latest settings together.
The gotcha — and it's important — combineLatest won't emit until every source has emitted at least once. If one of your sources is silent at startup, you get nothing. This is exactly why BehaviorSubject pairs so well with combineLatest — because a BehaviorSubject emits its initial value immediately on subscribe, every source already has a value, and combineLatest fires right away."

Slide 32 — debounceTime — Wait for a Pause
"debounceTime holds back emissions until the source has been quiet for a specified duration. If a new value arrives before the timer expires, the timer resets.
The search input example is the canonical use case. Without debounceTime, every keypress fires an HTTP request. A user typing 'angular' sends 7 requests. With debounceTime(400), we wait until they pause typing and send one.
You will use this in almost every search input you build. Get comfortable with it."

Slide 33 — takeUntilDestroyed() — Auto Cleanup
"Here's a very important one. Every time you call subscribe(), you create a live connection — a subscription. If you don't clean that up when the component is destroyed, it keeps running in the background. That's a memory leak, and it can cause subtle bugs — callbacks firing on components that no longer exist.
takeUntilDestroyed() solves this automatically. You add it to your pipe, and Angular cancels the subscription when the component is destroyed. No extra code, no ngOnDestroy.
One rule: it must run in an injection context — so the constructor or a class field initializer. If you call it in ngOnInit, you'll get a runtime error. The next two slides cover that case."

Slide 34 — ⚠️ WARNING — takeUntilDestroyed() Placement
"This is one of the most common mistakes people make when they first start using takeUntilDestroyed(). They put it in ngOnInit. That doesn't work.
ngOnInit runs after construction. The injection context is gone. Angular will throw a RuntimeError: injection context not found.
The fix is simple — move the subscription into the constructor. The constructor runs during construction, so the injection context is active.
If you genuinely need to set up a subscription outside the constructor — inside a method, for example — the next slide shows you how."

Slide 35 — takeUntilDestroyed() with DestroyRef
"If you need to call takeUntilDestroyed() outside the constructor, you inject DestroyRef as a class field — which is fine, because class fields run during construction — and then pass it explicitly to takeUntilDestroyed() wherever you need it.
DestroyRef is Angular's handle on the component's destruction lifecycle. When you pass it to takeUntilDestroyed(), Angular uses it to trigger cleanup regardless of where in the code you call it.
The rule simplified: constructor or class field — no argument needed. Outside those contexts — inject DestroyRef and pass it in."

Slide 36 — Why Cleanup Matters
"Let's be concrete about why this matters. In this example, PriceTickerComponent subscribes to prices$ but never cleans up. When the component is destroyed — say, the user navigates away — the subscription lives on. prices$ keeps emitting. The callback keeps running. It's writing to this.currentPrice on an object that no longer exists in the DOM.
Do this enough times and your app starts accumulating subscriptions. Each time the component mounts, another one piles up. Eventually you see strange behavior — state updates that seem to come from nowhere, performance degradation.
takeUntilDestroyed() is one line. Make it a habit. Add it to every subscribe() call inside a component."

Slide 37 — toSignal() — Observable to Signal
"Alright, toSignal(). This is the cleaner way to use Observables in templates.
Instead of calling subscribe() manually, toSignal() converts an Observable into a signal. Angular subscribes under the hood, wraps each emission as the signal's value, and the template just calls it like any other signal.
Must be called in an injection context — same rule as inject(). Class field or constructor.
And Angular handles the subscription lifecycle automatically — no takeUntilDestroyed() needed when you use toSignal()."

Slide 38 — toSignal() with initialValue
"By default, toSignal() returns Signal<T | undefined> — the signal is undefined until the first emission. If your template tries to iterate over an undefined array, you get a runtime error.
The fix is initialValue. Pass in a sensible empty value and the type becomes Signal<T> — never undefined. recipes() is always an array, even before the first HTTP response arrives.
My strong recommendation: always provide initialValue. For arrays, pass []. For nullable state like error messages, pass null. For booleans like loading state, pass false. Make the type as specific as possible."

Slide 39 — When to Use toSignal()
"Simple rule: if an Observable needs to appear in a template, use toSignal(). If an Observable is just triggering a side effect — navigation, logging, analytics — use subscribe() with takeUntilDestroyed().
This example shows both in the same component. users, isLoading, and error are all bound to the template via toSignal(). The saveComplete$ subscription just navigates — so it's a plain subscribe() with takeUntilDestroyed().
Observable to template → toSignal(). Observable to side effect → subscribe() + cleanup."

Slide 40 — ⚠️ WARNING — async pipe null Problem
"Before we close out the modern patterns, let's look at why we moved away from the async pipe — the old way of subscribing in templates.
The async pipe has a timing issue. When the component first renders, the Observable hasn't emitted yet. The async pipe returns null. *ngIf evaluates to false — the entire template is hidden.
Then the HTTP response arrives. async emits the real data. *ngIf becomes true — the template appears. This causes a visible flicker. And if the timing is off in certain ways, the template might not show at all.
The workaround was ?? [] or a loading template with ng-template. It worked, but you had to remember it everywhere."

Slide 41 — toSignal() Solves the Null Problem
"toSignal() with initialValue eliminates this entirely.
recipes() is [] from the very first render — not null, not undefined, an actual empty array. @for runs immediately, produces nothing because the array is empty, then re-renders when data arrives. No flicker. No null guard. No boilerplate.
Use toSignal() for all new code. Use async pipe only if you're maintaining an existing legacy codebase that already uses it."

Slide 42 — Coming Up — Modern vs Classic Angular
"Okay, quick pause before we move on. You've just learned the modern way to do all of this — services with inject(), BehaviorSubject, takeUntilDestroyed(), toSignal().
But here's the reality: a lot of production Angular code out there was written before these patterns existed. You will encounter it in codebases, in interviews, in open source. The next several slides show you what the old patterns looked like, what pain they caused, and why the modern approach replaced them.
You write modern. You recognize legacy."

Slide 43 — Legacy: Service Injection (Modern)
"Here's the modern way you already know. Each dependency is a named, typed field. You can see at a glance exactly what a component depends on. No constructor needed unless you specifically need it for takeUntilDestroyed()."

Slide 44 — Legacy: Constructor Injection
"Here's the old way. Every dependency goes into the constructor as a parameter. In a simple component with three services, it's manageable. In a real enterprise component with eight or ten dependencies? The constructor becomes a wall of parameters.
Adding or removing a dependency meant editing the parameter list. In tests, you had to provide values for every constructor parameter — even ones your test didn't care about. It was verbose and high-friction. inject() replaced all of this."

Slide 45 — Legacy: Service Scope (Modern)
"Modern: one line in the service file. providedIn: 'root'. Done. Tree-shakable, app-wide, singleton."

Slide 46 — Legacy: NgModule Providers
"Old way: every service had to be manually listed in providers in an NgModule. If you forgot it — and you would forget, especially on large teams — you'd get a runtime crash. Not a compile error. A runtime crash.
Services could also be registered in feature modules with different scopes, which created confusing situations where the same service had different instances in different parts of the app.
Not tree-shakable either — unused services still ended up in the bundle. providedIn: 'root' made all of that go away."

Slide 47 — Legacy: RxJS Cleanup (Modern)
"Modern cleanup: one line. takeUntilDestroyed(). In the constructor. Done."

Slide 48 — Legacy: Manual takeUntil + ngOnDestroy
"Here's what you had to write before. A destroy$ Subject as a class field. takeUntil(this.destroy$) added to every pipe — every single one, and you had to remember to add it. An ngOnDestroy method that emitted on the subject and completed it. Three separate things to touch for every subscription.
Forget the takeUntil → memory leak. Forget to implement ngOnDestroy → memory leak. No compile-time warning either time. takeUntilDestroyed() replaced all of this with one line in Angular 16."

Slide 49 — Legacy: Observable in Template (Modern)
"Modern: toSignal() with initialValue. Always has a value, re-renders automatically, Angular handles the subscription. Template is clean."

Slide 50 — Legacy: async Pipe with Null Guard
"Old way: expose the raw Observable from the component, subscribe in the template with async. But async emits null before the first value, so you had to add ?? [] everywhere, or use *ngIf ... else with a loading template.
Every template. Every time. Miss one → runtime error when *ngFor receives null. It was one of those things that Angular developers just learned to live with. toSignal() made it a non-issue."

Slide 51 — Key Takeaways
"Let's close out with the four big ideas from today.
First: Services and inject(). Move shared logic and state out of components. inject() replaces constructor injection anywhere Angular has an injection context. Expose state read-only with .asObservable() — the service owns the write end, components own the read end.
Second: BehaviorSubject with data$ and error$. The clean pattern for reactive state from a service. Chain operators with pipe() to shape streams before they reach your components.
Third: Observables are lazy streams. Nothing runs until someone subscribes. Core operators — map, filter, tap, switchMap, debounceTime — let you transform, filter, and combine streams cleanly.
Fourth: takeUntilDestroyed() and toSignal(). These two tools make Observables safe and ergonomic in components. Auto-unsubscription and null-free template binding, both in one line each. Both require an injection context — constructor or class field.
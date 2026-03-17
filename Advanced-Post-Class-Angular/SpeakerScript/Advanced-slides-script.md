Slide 1 — Title Slide
Alright everyone. Everything you've learned this week — components, signals, services, HTTP, routing, forms, testing — that's a complete foundation. You can build real applications with what you know right now.
This session is different. We're not going deeper on things you've already built. We're going broader — giving you a map of the Angular landscape so that when you walk into a production codebase on your first day at a new job, nothing catches you completely off guard.
Some of this you'll use in your first week. Some of it you won't touch for six months. But all of it is real, all of it is common, and all of it will make more sense now than it would have on Day 1. Let's get into it.

Slide 2 — What You'll Be Able to Do
Here's the territory we're covering today.
We'll finish out the advanced signal APIs — linkedSignal, untracked, toObservable, and resource. We'll look at how to reach into the DOM and talk to child components directly. We'll build custom directives and custom form controls. We'll cover server-side rendering from scratch.
We'll go deeper on RxJS patterns you'll see in every production pipeline. We'll talk about state management options for when a single service stops being enough. And we'll wrap up with change detection, zoneless Angular, deployment, accessibility, and the broader ecosystem.
A lot of ground. But we're moving at a survey pace — you're building recognition, not mastery. Mastery comes from using these things on real projects.

Slide 3 — linkedSignal()
You already know two kinds of signals. computed() is derived and read-only — you can never call .set() on it. signal() is fully independent — you give it an initial value and it doesn't react to anything else. Those two cover most cases, but there's a gap between them.
What if you want a value that starts derived from another signal, but can be overridden by the user?
That's linkedSignal(). Think of it as: "start here based on this other value — but let me change it if needed."
The pagination example on the slide is the classic use case. When the user changes the category filter, you want the page to reset to 1. But you also want the user to be able to navigate to page 3. So the default derives from the category, but selectedPage is still writable.
The decision rule is at the bottom of the slide and it's worth memorizing: computed() when the value is always derived and never manually set. linkedSignal() when the default is derived but you need to override it. signal() when the value is fully independent of everything else.

Slide 4 — untracked()
Before I explain untracked(), let me make sure the underlying concept is clear. Inside effect() or computed(), Angular automatically tracks every signal you call. That tracking creates a reactive dependency — it means "when this signal changes, re-run this function." That automatic tracking is what makes reactivity work without you having to wire anything up manually.
But sometimes you need to read a signal's value for context — not as a trigger. You want the value, but you don't want the function to re-run when it changes.
That's what untracked() does. It reads a signal's current value without registering it as a dependency.
In the example, the effect should only re-run when userId changes. The logLevel is just used for a log message — you don't need the effect to fire again just because someone changed the log verbosity. Wrapping logLevel in untracked() reads the current value without subscribing to future changes.
You won't need this constantly, but when you do, you'll be very glad it exists.

Slide 5 — toObservable()
You know toSignal() — it converts an Observable into a signal. toObservable() goes the other direction.
The reason you'd want to do a round-trip — signal to Observable and back — is to access RxJS operators that simply don't exist in the signals world. debounceTime, switchMap, distinctUntilChanged — these are RxJS primitives. They live in RxJS. toObservable() is the bridge that lets you enter that world from a signal.
Look at the example. The search term is a signal. The user types into it. But you don't want to fire an HTTP request on every keystroke — you want to debounce, deduplicate, and cancel stale requests. All of that is pipe() logic. So you convert the signal to an Observable, apply the operators, then convert the result back to a signal for the template.
The pattern is: toObservable() to enter RxJS, operators to do the work, toSignal() to come back out. Once you've seen it once, it's very recognizable in production code.

Slide 6 — viewChild() / contentChild() Signal Queries
You know @ViewChild and @ContentChild from the course. These are the decorator-based way to query elements in your template or projected content. The signal-based replacements — viewChild() and contentChild() — work the same way but return a signal instead of a decorated property.
The key difference is timing. With the decorator approach, you have to wait for ngAfterViewInit or ngAfterContentInit before the value is populated — accessing it earlier crashes the app. With signal queries, you use the value inside an effect() and the timing takes care of itself. The effect runs when the signal has a value. Before that, it's undefined and the if check handles it.
The legacy vs. modern table on this slide is a clean summary. For new code, prefer the signal queries. For existing code you're reading, recognize the decorators and know they need lifecycle hooks.

Slide 7 — resource()
resource() is available in Angular 19 and later, and it's the clearest example of where Angular is heading with signal-native async data.
Before resource(), loading data from an API in a signal-based component meant http.get() returning an Observable, then toSignal() to convert it, then manually creating separate signals for loading state and errors. That works, but it's several moving parts.
resource() wraps all of that. You give it a request signal — which triggers a re-fetch whenever it changes — and a loader function that returns a Promise. Angular manages loading, value, and error as separate signals automatically.
Look at the state table. Before any request fires, everything is undefined and isLoading is false. While loading, isLoading is true and value holds whatever the previous value was. On success, you get the data. On error, you get the error object. You don't write any of that state management yourself.
One practical note: resource() expects a Promise, not an Observable. Since HttpClient returns Observables, wrap it with firstValueFrom() to convert. That's what the code example shows.
rxResource() is a variant that accepts an Observable loader directly, skipping the firstValueFrom conversion. Both are Angular 19+.

Slide 8 — input.required()
This is a small but important addition to what you already know about signal inputs.
Regular input<string>() is optional. TypeScript types it as Signal<string | undefined> because the parent might not pass a value. input.required<string>() makes the contract explicit — the parent must provide this value. TypeScript types it as Signal<string> with no undefined, and Angular throws at runtime if the parent forgets the binding.
The transform option is where the two type parameters come in. input.required<number, string> means: the value arrives as a string from the template binding, and your transform function converts it to a number before the component receives it. The first type parameter is the output — what the component sees. The second is the input — what comes in from the parent. Always read them in that order: output first, input second.
The legacy contrast table maps these directly to the @Input() decorator with required: true and transform options — those exist in Angular 16+ as decorator options. You'll see both in codebases.

Slide 9 — @ViewChild, @ContentChild, and Timing
Let's talk about the decorator-based approach properly so you can read it confidently in existing code.
@ViewChild queries your component's own template. @ContentChild queries content that was projected into your component via <ng-content> from the outside. Both give you a reference to a child component instance or a DOM element from your TypeScript class.
The critical rule is the timing. These queries are populated after specific lifecycle hooks fire — not before. @ViewChild is safe to use in ngAfterViewInit. @ContentChild is safe in ngAfterContentInit. Using either in the constructor or ngOnInit crashes, because the view hasn't rendered yet.
The warning is right there in the slide code — ngOnInit throws a TypeError. This is one of the most common bugs in Angular codebases that haven't adopted signal queries yet.
For new code: use viewChild() and contentChild() from Slide 6. The signal approach handles timing inside effect() without any lifecycle hooks. For code you're reading: recognize @ViewChild and @ContentChild with their required lifecycle hooks, and know what they're doing.

Slide 10 — @ViewChildren / @ContentChildren
When you need multiple children of the same type, the decorator has a plural form: @ViewChildren and @ContentChildren. They return a QueryList<T> — a live, iterable collection.
QueryList gives you .first, .last, .length, and it's iterable with @for. The thing that makes it special is .changes — an Observable that emits whenever the list updates. If tabs are added or removed dynamically, .changes fires and you can respond.
The signal equivalent is viewChildren(TabComponent) which returns Signal<readonly TabComponent[]> — reactive without any .changes subscription needed.
You'll see QueryList with .changes.subscribe() constantly in legacy Angular code for any component that manages a dynamic set of children. Tabs, accordions, stepper components — they all use this pattern.

Slide 11 — Custom Attribute Directives
Attribute directives let you attach behavior to any element without replacing it or wrapping it. The directive is invisible in the DOM — it runs alongside the element and modifies it.
Two decorators do most of the work. Let me define them clearly before we look at the code.
@HostBinding binds a property of your directive class to a property on the host element — the element the directive is applied to. When your class property changes, that change reflects immediately on the DOM. In the example, bgColor on the directive class is bound to style.backgroundColor on the host element. Set bgColor to 'yellow' and the element turns yellow.
@HostListener listens for a DOM event on the host element and calls a method on your directive when it fires. Angular adds the listener when the directive is created and removes it when the directive is destroyed. You never touch addEventListener or removeEventListener directly.
Look at the full example. The directive is [appHighlight]. Applied to any element, it watches for mouseenter and mouseleave and toggles a background color. The color is configurable via input(). This exact pattern — a directive with @HostBinding and @HostListener — is in almost every production Angular codebase you'll work in.

Slide 12 — ⚠️ WARNING: Directive Cleanup and DestroyRef
Before we move on from directives, I want to introduce DestroyRef properly because it shows up here in a practical context.
DestroyRef is an Angular primitive that lets you register cleanup callbacks. When the component, directive, or service that injected DestroyRef is destroyed, Angular calls all registered callbacks. You saw takeUntilDestroyed() on Day 3 — that function uses DestroyRef internally to complete Observables on destroy.
Now here's the directive-specific problem. @HostListener manages its own lifecycle automatically — Angular adds and removes it. But if you ever wire up a listener manually with document.addEventListener, that's entirely on you. Angular has no idea it exists. If you don't clean it up, it lives forever after the directive is gone — a memory leak, and potentially a bug where handlers fire on a destroyed component.
The three options on the slide: use @HostListener whenever possible and let Angular own it. If you need to wire something manually, either use @HostListener('document:click') which still Angular-managed, or inject DestroyRef and call this.destroyRef.onDestroy() with a cleanup callback. That callback fires when the directive is destroyed.
The lesson: anything you wire up manually, you clean up manually. DestroyRef is how you do that cleanup without implementing ngOnDestroy.

Slide 13 — @defer — Deferrable Views
You've already seen loadComponent() for lazy-loading routes. @defer does the same thing but at the template level — no route change required.
When Angular builds your app, it sees a @defer block and automatically splits the deferred component into a separate JavaScript chunk. That chunk isn't downloaded until the trigger condition fires. The user gets a faster initial load, and the heavy component only loads when it's actually needed.
Look at the trigger options. on viewport is probably the most useful — the component downloads when the user scrolls to it. when isVisible() is the signal-based trigger — when the signal becomes truthy, defer fires. You can use any signal expression there, which means you have full programmatic control over when a component loads.
The four blocks — @defer, @placeholder, @loading, and @error — each serve a different moment in the lifecycle. The placeholder is shown immediately before anything happens. Loading appears while the chunk downloads. Error handles a failed download. The deferred content is what renders when everything succeeds.
I also want to define incremental hydration because I mentioned it and it needs a proper explanation. In an SSR context, the server renders the placeholder HTML. The browser displays that instantly. Then, only when the trigger fires, the browser downloads the chunk and hydrates just that piece of the page — not the whole app. That's incremental hydration. Instead of hydrating everything at once, you hydrate pieces as they're needed.

Slide 14 — @defer Legacy Contrast
This slide shows you what your life looked like before @defer, and it's instructive.
If you wanted to defer a component's render until it scrolled into view, you needed an IntersectionObserver. That means ngAfterViewInit to set it up, a ViewChild to get the container element reference, a callback that toggles a boolean, an *ngIf that checks the boolean, and cleanup when the component destroys. That's five moving parts for what is conceptually a one-liner.
If you wanted full code-splitting — not just hiding the component but actually deferring its download — you needed ViewContainerRef, a dynamic import, and createComponent(). That's even more scaffolding.
@defer collapses all of that into four declarative HTML blocks. No IntersectionObserver, no ViewContainerRef, no ngAfterViewInit, no manual cleanup. This is one of the most impactful additions Angular has made in recent versions.

Slide 15 — ControlValueAccessor — Custom Form Controls
This is the most complex slide in this deck. Take a breath and let me walk you through the mental model before we look at any code.
Angular's form system — both reactive forms and template-driven forms — knows how to talk to native HTML elements like <input>, <select>, and <textarea>. It knows how to push values in and receive values back out. ControlValueAccessor is the interface that lets your custom component speak that same language.
There are four methods in the interface. Let me give you the plain-English version of each.
writeValue — Angular calls this when it wants to push a value into your component. Maybe the form is being initialized with patchValue(), maybe it's being reset. Angular hands your component a value and says "display this." You receive it and update your internal state.
registerOnChange — Angular hands you a callback function and says "store this. Call it when the user changes the value." This is how Angular hears about changes from your component.
registerOnTouched — Same idea, different purpose. Angular gives you a callback to call when the user interacts with or blurs your control. This is how Angular knows to display validation errors.
setDisabledState — Angular calls this when the control is programmatically enabled or disabled. Optional, but you should implement it if your component has a disabled visual state.
The data flow in one sentence: Angular pushes values in via writeValue. Your component pushes values out by calling the onChange callback. That bidirectional contract is the entire interface.
The NG_VALUE_ACCESSOR provider and forwardRef at the top of the component register your component with Angular's form system. This is the wiring that makes Angular discover your component as a form control.

Slide 16 — ControlValueAccessor in Use
Now that you understand the interface, look at how clean the consumer side is.
The parent component has absolutely no special handling for the fact that <app-star-rating> is a custom component. It uses formControlName exactly like it would with a native input. form.value, patchValue(), reset(), validators — all of it works.
And at the bottom, it works with ngModel too. Same component, no changes needed.
This is how every major Angular component library is built. Angular Material's <mat-input>, <mat-select>, <mat-datepicker> — they all implement ControlValueAccessor so they drop into your forms without any special treatment. When you build a design system for a company, this is the interface you implement for every custom input.

Slide 17 — InjectionToken
Before I get into the syntax, let me give you the decision rule, because that's what makes this slide actionable.
Use a service when you need logic and behavior — methods, reactive streams, shared state. Use an InjectionToken when you need to inject a plain value — a configuration object, an API base URL, a feature flag map, anything that's data rather than behavior.
The example on the slide defines an AppConfig interface and a token for it. In app.config.ts, you provide the actual value using useValue. In any component or service, you inject it with inject(APP_CONFIG) and get back a fully typed AppConfig object.
Two things worth noting. The string you pass to new InjectionToken() is just for debugging — it shows up in error messages so you can identify the token. And you use the token object as the argument to inject(), not a class name, because there's no class here.
You'll see this pattern used heavily for API URLs, environment-specific configuration, and feature flags that need to be injectable rather than imported directly.

Slide 18 — APP_INITIALIZER
This is one of those things that's in virtually every production Angular application and completely absent from most tutorials. When you see it in a real codebase, you'll want to know exactly what it does.
APP_INITIALIZER is a built-in injection token that lets you run code before the Angular app bootstraps — before any component renders, before the router activates, before the user sees anything. It's used for loading remote configuration, checking auth token validity, prefetching lookup data, anything that must complete before the app is usable.
The setup is: you provide a factory function that returns another function. That inner function is what Angular calls. If it returns a Promise, Angular waits for it to resolve before continuing bootstrap. The app is essentially paused until your initialization logic completes.
Three things to get right. First — deps is an array of dependencies to inject into your factory. Second — multi: true is required. APP_INITIALIZER is a multi-provider token, meaning multiple initializers can coexist. If you omit multi: true, you replace all existing initializers instead of adding yours alongside them. Third — if your Promise rejects, the app fails to bootstrap entirely. Always handle errors inside your initializer.
The legacy contrast is simple: same API, same token, just moved from AppModule.providers to app.config.ts.

Slide 19 — afterRender / afterNextRender
These are Angular 17+ lifecycle functions that replace ngAfterViewInit for DOM-specific work. Let me explain why that replacement matters.
ngAfterViewInit runs in both the browser and on the server during SSR. If your ngAfterViewInit touches window, document, or any browser-only API, it will crash your SSR server. You end up guarding every DOM operation with isPlatformBrowser() checks.
afterNextRender and afterRender handle this automatically. They're browser-only — Angular skips them entirely when running in Node.js. They check the PLATFORM_ID token internally, the same token you'll see in the SSR slides. You don't have to add any guard yourself.
afterNextRender runs once after the next render cycle. Use it for one-time setup — initializing a chart library, measuring an element's size, setting up a third-party component that needs a real DOM node to exist first.
afterRender runs after every render cycle. Use it when you need to respond to DOM updates on each change — resizing a canvas, updating scroll position.
They're also functions rather than interface implementations, which keeps your class cleaner — no implements AfterViewInit noise, no lifecycle method to implement.

Slide 20 — NgOptimizedImage
This one takes thirty seconds to learn and most Angular developers don't know it exists.
NgOptimizedImage is a directive that ships with Angular in @angular/common. You import it, swap src for ngSrc, and immediately get lazy loading, cumulative layout shift prevention, and priority hints — all for free.
The only required change beyond the attribute name is adding width and height. These aren't optional — Angular uses them to pre-calculate the space the image will occupy so the page doesn't jump around as images load. That jumping is called cumulative layout shift, and it's a metric Google uses in Core Web Vitals rankings.
The priority attribute is for above-the-fold images — the hero banner, the top product image, anything the user sees without scrolling. It skips lazy loading and injects a <link rel="preload"> into the document head so the image starts downloading as early as possible.
Without priority, every image lazy-loads automatically. No JavaScript, no IntersectionObserver, just the ngSrc attribute.

Slide 21 — @let — Template Local Variables
@let is Angular 18 syntax and it's a genuinely nice quality of life improvement.
The old way to create a local variable in a template was the *ngIf="expression as name" pattern. It worked, but it had a serious bug: the block would only render if the expression was truthy. An empty string, a zero, a null — the whole block would disappear. Students got tripped up by this constantly.
@let is clean and explicit. It's just a variable declaration inside the template, scoped to the current block.
The scoping behavior is exactly like const in JavaScript. A @let declared inside an @if block is not accessible outside that block. A @let inside a @for is scoped to that iteration. This trips people up at first — they declare a variable inside an @if and then try to use it outside and get an error. Now you know why.
@let variables recalculate on every change detection cycle, so they always reflect current signal values. You can put any valid template expression in one — signal calls, method calls, string concatenation, ternaries, anything.

Slide 22 — ReplaySubject vs BehaviorSubject
You already know BehaviorSubject. It holds a current value and replays it to any new subscriber. New subscriber arrives after five emissions — they get the most recent value and that's it.
ReplaySubject is different. It buffers the last N emissions and replays all of them to new subscribers. So if you construct a ReplaySubject(3) and five values have been emitted, a new subscriber gets the last three in order.
ReplaySubject also doesn't require an initial value, which is useful when there's no sensible default to start with.
The decision rule is straightforward. BehaviorSubject for state — current user, cart contents, auth status. Any subscriber should start from the current snapshot. ReplaySubject for history — notification feeds, audit logs, activity streams. New subscribers need context, not just the latest.
You'll encounter both in production services. Knowing the difference tells you a lot about what the developer intended when they wrote the service.

Slide 23 — mergeMap vs switchMap
Getting this choice wrong causes real bugs — either lost data or stale responses — so this is worth understanding precisely.
switchMap cancels the previous inner Observable when a new outer emission arrives. When you're searching, you type "a", then "an", then "ang". Three HTTP requests go out. With switchMap, only the last one matters — the previous two are cancelled. You only care about the current search term. This is correct for search.
mergeMap doesn't cancel anything. Every inner Observable runs to completion concurrently. When you're uploading five files, you want all five uploads to finish. Cancelling the first four because the fifth started would be a disaster. This is correct for uploads.
The table shows concatMap and exhaustMap too. concatMap queues — each inner Observable runs after the previous one completes. Use it for sequential operations where order matters. exhaustMap ignores new emissions while an inner Observable is still running. Classic use case: a login button. If the login request is in flight and the user clicks again, ignore the second click — don't fire a second login request.
Whenever you're choosing a flattening operator, ask: should previous work be cancelled? Should new work be ignored? Should everything run? Should work be queued? The answer maps directly to the operator.

Slide 24 — withLatestFrom, distinctUntilChanged, startWith, scan
Four operators that appear constantly in production pipelines. Let me walk through each one.
withLatestFrom — on each emission from your source, grab the current value from a second stream. The second stream doesn't act as a trigger — it's just providing context. "When this button is clicked, what user was logged in at that moment?" The button click is the trigger. The user stream is the context.
distinctUntilChanged — skip an emission if the value is identical to the previous one. The user types "ng", deletes, types "ng" again. Without this operator, you'd fire two identical requests. With it, the duplicate is swallowed.
startWith — emit an initial value before the source emits anything. This is extremely useful when you need the template to have an immediate value to render. Instead of handling undefined in the template while waiting for data, startWith([]) gives the template an empty array right away.
scan — this is Array.reduce() for streams. Each emission builds on the accumulated value from all previous emissions. The example builds a growing array — each new action gets appended to the history. This is how you build an activity feed, undo/redo history, or any stream of state transitions.

Slide 25 — Advanced Interceptors — Retry and Caching
You built a basic interceptor on Day 3 for auth headers. Let me show you two more production patterns.
The retry interceptor automatically retries failed requests. The key detail is the delay function inside retry. It receives the error and the attempt number. We check error.status before deciding whether to retry. A 500-series error means the server had a problem that might be temporary — retry with backoff. A 400-series error means the client did something wrong — the request won't improve with retries, so throwError passes it through immediately. The backoff formula attempt * 1000 gives you 1 second on the first retry, 2 on the second, 3 on the third. You want to give the server time to recover.
The caching interceptor stores responses in a Map keyed by URL. Before passing a request through, it checks the cache. If there's a hit, it returns the cached response immediately via of() — the server is never contacted. If there's no cache entry, it lets the request through and stores the response with tap. Two rules: only cache GETs, and never cache mutations.
In production, you'd add cache expiration logic. But the pattern here is what you'll recognize in real codebases.

Slide 26 — ResolveFn — Route Resolvers
A resolver is a function that runs before a route activates and pre-fetches data for the component. Angular waits for the resolver to complete, then navigates to the component with the data already available.
Before I show the code, let me give you the tradeoff honestly, because this is a design decision with real consequences.
Resolvers are great for eliminating the flash of empty content — the half-second where a detail page renders before the API responds and the user sees loading spinners everywhere. With a resolver, the component renders with data or not at all.
But the user stays on the current page with no feedback while the resolver runs. If the API takes two seconds, navigation feels broken. Users wonder if their click registered. For fast APIs on good connections, resolvers are seamless. For slow APIs or mobile users, a loading state inside the component often feels better because at least navigation happens immediately.
Know the tradeoff. Use resolvers when data must be present before render. Use in-component loading state when you want navigation to feel instant.
The code itself is simple — a function that reads the route snapshot and returns an Observable or Promise. Angular awaits it. The resolve key in the route config maps the resolver to a name, and with withComponentInputBinding(), the resolved data arrives as a signal input.

Slide 27 — canMatch — Conditional Route Matching
canMatch solves a specific problem that canActivate can't handle cleanly: two routes with the same path that should render different components depending on a condition.
Here's the mental model. canActivate blocks a user from entering a route, but the route itself still matched. canMatch happens earlier — it determines whether a route is even considered during matching. If canMatch returns false, Angular skips that route entirely and tries the next one in the array.
Look at the two dashboard routes. Both have path: 'dashboard'. The first has canMatch: [adminGuard]. When an admin navigates to /dashboard, adminGuard returns true, the first route matches, AdminDashboardComponent loads. When a regular user navigates to /dashboard, adminGuard returns false, Angular skips the first route and tries the next, UserDashboardComponent loads.
Same URL, different component, based on a runtime condition. You couldn't do this cleanly with canActivate alone.
The important clarification from the code comment: "falls through to the next route" means the next route in the array that also matches the path. Angular doesn't stop at the first canMatch failure — it keeps trying routes in order until one matches fully.

Slide 28 — ActivatedRouteSnapshot vs ActivatedRoute
Both give you route information. The difference is whether you need a frozen one-time read or a live reactive stream.
ActivatedRouteSnapshot is a frozen object representing the route at a specific moment. It doesn't change. It doesn't emit. It's a photograph. Resolvers and guards always use the snapshot because they run once per navigation — they don't need reactivity.
ActivatedRoute is a service with Observable properties that update when params change while the component is alive. This matters more than it might seem. Angular can keep a component instance alive while the route params change. Think about navigating from /recipes/42 to /recipes/43 — Angular might reuse the same RecipeDetailComponent instance and just update the params. If you read params from the snapshot once on init, you'd show the wrong recipe. ActivatedRoute.paramMap emits the new params and your component updates correctly.
With withComponentInputBinding(), this distinction mostly disappears because signal inputs are already reactive. But guards and resolvers always use the snapshot, and you'll absolutely encounter both in existing codebases.

Slide 29 — When Services Aren't Enough
This is a conceptual slide, not a code slide. Let me frame the problem.
A service with a BehaviorSubject or a signal() is the right answer for most state management in Angular. It's simple, it's testable, it's easy to understand. Don't over-engineer this.
But there are specific situations where that approach stops scaling. The slide lists the signs: services depending on each other's state in ways that create circular references. Async side effects scattered everywhere. Needing to replay state for debugging. Multiple developers colliding in the same service. Compliance requirements for state auditability.
If you're not experiencing these problems, you don't need structured state management. If you are, two options: @ngrx/signals for a signal-native container that adds structure without full Redux complexity, or NgRx for the full pattern with all its power and all its overhead.

Slide 30 — signalStore() from @ngrx/signals
signalStore() is the right choice when a plain service starts feeling messy but you don't need the full NgRx ceremony.
Look at the structure. withState defines the initial state shape — think of it as defining the fields. withComputed adds derived signals — same computed() you've been using all week, just organized here alongside the state it derives from. withMethods adds the actions — functions that can call patchState() to update the store immutably.
patchState is imported from @ngrx/signals and it's how you update state. You pass it the store and a partial state object. Only the fields you include get updated.
In a component, you inject the store directly and get back an object where every state property and computed property is a signal. store.recipes(), store.loading(), store.selectedRecipe() — all reactive, all usable in computed() and effect().
The structure is opinionated enough to be consistent across a team, but flexible enough to not feel like a framework within a framework.

Slide 31 — NgRx — The Big Picture
NgRx is the Redux pattern for Angular. It's the heaviest option — the most overhead, the most boilerplate, and also the most powerful and traceable.
Let me walk through the flow on the slide because the diagram is the conceptual core.
The user does something — clicks "Add to Cart". Your component dispatches an action — a plain object with a type string and a payload. Think of actions as events. Something happened.
The action flows into a reducer — a pure function that takes the current state and the action and returns new state. Pure means no side effects, no mutations. The reducer always returns a brand new state object.
The new state flows into selectors — functions that compute derived values from the state. They're memoized, like computed().
Components subscribe to selectors. When a selector's slice of state changes, the component updates.
Effects are the async piece. An Effect listens for a specific action, does some async work — typically an HTTP call — and dispatches a new action with the result. "Add Item Success" or "Add Item Failure". The reducer handles those too, finalizing the state.
Every single state change is an action in the log. You can replay the entire session. You can time-travel to any point. That's the power and the tradeoff. Reach for NgRx when you genuinely need that structure.

Slide 32 — Server-Side Rendering — What and Why
Let me make sure the three rendering models are crystal clear because they're often confused.
Client-Side Rendering is the default. The server sends an empty HTML file and a large JavaScript bundle. The browser downloads the bundle, runs Angular, and the UI renders. The user stares at a blank screen until JavaScript executes. On a slow connection or slow device, that can be several seconds.
Server-Side Rendering means Angular runs on the server. The server sends complete, rendered HTML to the browser. The user sees content immediately. Then the JavaScript downloads in the background and Angular "hydrates" the HTML — attaches event listeners and makes it interactive. First paint is fast.
Static Site Generation means the HTML is generated at build time and deployed as static files. The server just serves files — no computation per request. This is the fastest possible first paint, served directly from a CDN. But it only works when content doesn't change frequently — marketing pages, documentation, blogs. Your recipe browser with user data isn't a candidate for SSG, but the landing page for the app could be.
The prerender option in angular.json — noted on the slide — lets you prerender specific routes at build time within an otherwise dynamic SSR app. One config entry, and those routes become static files.
Why does any of this matter? SEO — search engines index actual HTML, not JavaScript that renders later. Core Web Vitals — LCP, FID, CLS all improve with real content in the initial response. Perceived performance on mobile and slow devices.

Slide 33 — Setting Up SSR
The setup is one command. ng add @angular/ssr adds everything to an existing project. ng new my-app --ssr starts with SSR from the beginning.
Look at what gets added. Two new files in src/app/: app.config.server.ts which merges server-specific providers with your existing client config, and main.server.ts which is the server entry point. One new file at the root: server.ts, which is an Express server that handles SSR requests.
The app.config.server.ts is worth understanding. It calls mergeApplicationConfig() — that function takes your existing appConfig and merges additional server-specific providers on top. provideServerRendering() is what tells Angular it's running in Node.js rather than a browser. After that, Angular knows to skip browser APIs and behave accordingly.
You don't rewrite your components for SSR. They work as-is as long as they don't make browser-specific assumptions. That's the caveat, and the next few slides address it.

Slide 34 — provideClientHydration()
After the server renders HTML and sends it to the browser, something has to connect Angular's change detection to that existing DOM. That's hydration.
Without provideClientHydration(), Angular throws away the server-rendered HTML and re-renders everything from scratch in the browser. The user sees a flash of blank content between the initial HTML and Angular's re-render. All the SSR work is essentially wasted.
With provideClientHydration(), Angular inspects the existing DOM, recognizes it as Angular-rendered HTML, and attaches to it without destroying and recreating it. The server HTML is preserved. No flash.
withEventReplay() is an Angular 19+ addition that handles a subtle problem: what if the user clicks something while hydration is still in progress? Without event replay, that click is lost — Angular wasn't ready to handle it yet. With event replay, Angular captures those early interactions and replays them once hydration completes. The user's action isn't lost.
The table at the bottom of the slide is the clearest summary: without hydration, you lose most of the SSR benefit. With it, you realize the full value.

Slide 35 — isPlatformBrowser() and Renderer2
This is the practical SSR slide — the one you'll come back to when you're actually building an SSR app and something crashes.
The problem is straightforward. Your Angular code runs in two environments: the browser, which has window, document, localStorage, and all browser APIs, and Node.js on the server, which has none of those. Angular doesn't know which environment you're in unless you check.
isPlatformBrowser() is that check. You inject PLATFORM_ID — a token Angular provides that identifies the current platform — and pass it to isPlatformBrowser(). If you're in the browser, the check passes and you can safely call browser APIs. On the server, it returns false and you skip the browser-specific code.
Renderer2 is the alternative approach for DOM manipulation specifically. Instead of manipulating the DOM directly and guarding everything with platform checks, you use Renderer2 as an abstraction layer. It knows what platform it's on and does the right thing automatically. renderer.addClass(), renderer.setStyle(), renderer.setProperty() — these all work in both environments without any platform guard needed.
The practical rule: for conditional browser logic, use isPlatformBrowser(). For DOM manipulation, prefer Renderer2. For anything DOM-related in a lifecycle hook, afterNextRender() skips server execution automatically and is often the cleanest option.

Slide 36 — TransferState
Here's the specific problem TransferState solves. An SSR app renders on the server and makes an HTTP call to fetch recipe data. It generates the HTML with that data embedded. The browser receives the HTML, displays it instantly. Then Angular hydrates and the recipe list component initializes — and calls the same HTTP endpoint again. The server fetched it, the browser fetches it again. Double the API calls, double the latency.
TransferState is the solution. On the server, after fetching data, you call transferState.set(KEY, data). This serializes the data into the HTML response as a JSON blob. On the browser side, before making an HTTP call, you check transferState.hasKey(KEY). If the key exists, you read the data directly from the transfer state — no HTTP call. If it doesn't exist, you fetch normally.
The makeStateKey function creates a typed key — the string is just an identifier. Having a typed key means TypeScript knows what type to expect when you call transferState.get().
After reading the transferred data in the browser, call transferState.remove(KEY) to clean up. It's good housekeeping and prevents stale data from lingering.

Slide 37 — ⚠️ SSR Common Gotchas
Five things. Memorize them and you'll avoid the most common SSR debugging sessions.
One: localStorage, window, document — these don't exist in Node.js. Any component that calls them directly will crash the SSR server. Use isPlatformBrowser(), Renderer2, or afterNextRender().
Two: setTimeout and setInterval without cleanup. In a browser this is a minor leak. In an SSR Node.js server, an unresolved timer can keep the server process alive and prevent the response from being sent. Always clean up, or guard with isPlatformBrowser().
Three: relative URLs for HTTP calls made during SSR. This one surprises people. In the browser, /api/recipes is relative to the origin — the browser knows the base URL. In Node.js, there is no origin. The server is making a real network request and doesn't know where /api/recipes is. Use absolute URLs from your environment config for any HTTP calls that might run during SSR.
Four: third-party libraries that access window at module load time. Some charting or mapping libraries run initialization code when imported that references window. If that import runs on the server, it crashes immediately. Wrap the import in a dynamic import() inside an isPlatformBrowser() block.
Five: unguarded null access on values that haven't loaded yet. Use @if to guard optional data before trying to render it.

Slide 38 — NgZone — What It Is and When You'll See It
Zone.js is how Angular has historically detected when asynchronous operations complete so it knows to run change detection. It does this by monkey-patching — wrapping browser APIs like setTimeout, Promise.then, and addEventListener with its own versions. When those wrapped functions complete, Angular gets notified and checks for changes.
NgZone is the Angular service that gives you access to this zone.
Here's the situation where you'll encounter ngZone.run() in production code. You're integrating a third-party library — a mapping library, a charting library, a WebSocket client. That library fires a callback when something happens. But that callback runs in the library's own context, outside Angular's zone. Angular doesn't know the callback fired. The template doesn't update.
The fix is this.ngZone.run(() => { ... }) — it wraps your state update in Angular's zone so change detection triggers.
This was a very common pattern in pre-signals Angular. If a template mysteriously wasn't updating after a third-party callback, ngZone.run() was almost always the fix.
With signals, this problem largely disappears. Signals notify Angular directly — no zone monitoring needed. When you see ngZone.run() in an existing codebase, you're looking at a workaround for zone.js-based change detection that signals eliminate.

Slide 39 — ChangeDetectionStrategy.OnPush
In a default Angular app with zone.js, every async event — a click, an HTTP response, a timer — causes Angular to walk the entire component tree and check every component for changes. In a small app, that's fine. In a large app with hundreds of components, that's expensive.
OnPush is an opt-in optimization. When you add changeDetection: ChangeDetectionStrategy.OnPush to a component, you're telling Angular: "don't check this component on every event. Only check it when one of its @Input references changes, when an event fires inside it specifically, or when I explicitly call markForCheck()."
Look at the code. The component has OnPush. It receives an @Input. When async data arrives, we update the input and call this.cdr.markForCheck(). That markForCheck() call is what tells Angular to include this component in the next change detection cycle. Without it, the update is silent — the template doesn't reflect the new data.
This is important to understand: markForCheck() is easy to forget. It's a footgun. You update a value and nothing happens and you stare at the screen wondering why. Then you remember you're using OnPush and forgot to call markForCheck().
With signals, you don't need OnPush. Signals tell Angular exactly what changed. You'll see OnPush in every legacy codebase as a performance optimization. Now you know what it does and why signals make it unnecessary.

Slide 40 — OnPush: Modern vs Legacy Contrast
This slide puts both versions side by side so the difference is unambiguous.
The legacy version has OnPush on the decorator, a plain count property, and a mandatory this.cdr.markForCheck() call after every mutation. The ChangeDetectorRef injection is required for that call. If you're on a team and a junior developer removes the markForCheck() call because it looks unnecessary, the UI silently stops updating. No error, no warning.
The modern version has no OnPush annotation. The state is a signal(). input.required() is a signal input. When this.count.update() is called, Angular knows immediately which DOM node to update. No markForCheck(). No ChangeDetectorRef. No risk of a silent bug from a forgotten call.
This is the clearest example I can show you of why signals are the future of Angular change detection.

Slide 41 — Zoneless Angular
This is where the performance and architecture conversation lands.
Signals made zone.js unnecessary. Angular now knows exactly what changed — a specific signal's value — and which DOM nodes depend on it. It doesn't need to monitor every Promise, every event listener, every setTimeout. It doesn't need to check the whole component tree.
Zoneless Angular removes zone.js entirely. provideZonelessChangeDetection() in Angular 21 is the stable, default API. In Angular 18 through 20, the same concept existed under the name provideExperimentalZonelessChangeDetection(). You'll see that longer name in codebases doing early adoption.
What you gain: zone.js is about 50KB you no longer ship to users. Change detection is deterministic — a signal changes, that exact thing updates, nothing else. Tests are faster and less flaky because zone.js monkey-patching was a significant source of test weirdness. And SSR becomes cleaner because zone.js had known issues with some server-side patterns.
The migration path matters for teams with existing apps. You don't flip a switch and go zoneless. You migrate incrementally — adopt signals for state, replace @Input() with input(), remove markForCheck() calls. When all the mutable properties and manual change detection hints are gone, you enable zoneless. It's a gradual process, not a rewrite.

Slide 42 — Accessibility — ARIA in Angular Templates
Accessibility is not a feature request you fulfill at the end of the project. It's a practice you build into your templates from the start. And Angular gives you zero accessibility automatically — it's entirely on you to write it.
The first rule is semantic HTML. Use the right element. A <button> is keyboard-focusable, fires on Enter and Space, and is announced by screen readers as a button. A <div> with a click handler is none of those things. Always reach for semantic HTML before reaching for ARIA.
role="alert" on a container tells screen readers to announce its content when it changes. When errorMessage() populates, the screen reader reads it aloud. This is how you make dynamic content accessible without moving focus.
aria-label gives interactive elements a text label when there's no visible text. An icon-only button with no text is invisible to screen readers. The aria-label is what gets announced.
aria-describedby links an input to its associated error message. When the user focuses the input, the screen reader also reads the description. This is the accessible way to connect validation errors to form fields.
I also want to mention the Angular CDK which I'll cover more in the ecosystem slide. Its A11yModule has a FocusTrap service for keeping focus inside modals, a LiveAnnouncer for programmatically announcing messages, and a FocusMonitor for tracking focus state. You don't have to build these from scratch.

Slide 43 — Accessibility — Focus Management
Focus management is where accessibility gets concrete and practical. When dynamic content appears — a modal, a drawer, a toast — focus needs to move intentionally.
The modal example on the slide demonstrates the pattern. The modal has role="dialog" and aria-modal="true" so screen readers understand what it is. It has aria-labelledby pointing to the heading so screen readers announce the modal's purpose when it opens. And in ngAfterViewInit, the first focusable element inside the modal receives focus programmatically.
Why does this matter? Without focus management, a screen reader user opens a modal and focus stays on whatever they clicked — which is now hidden behind the modal. They Tab through the page, but the modal isn't in the tab order because focus is in the wrong place. The modal is effectively invisible to them.
Three rules to internalize. Every interactive element must be keyboard-reachable. Dynamic content that appears should receive focus or announce itself. When a modal closes, focus must return to the element that opened it — otherwise the user is stranded in a part of the page that has no context for where they came from.
These aren't edge cases. They're baseline behavior that affects roughly 15% of your users.

Slide 44 — Deployment — ng build, dist/, and Hosting
ng build is all you run. It compiles, minifies, tree-shakes, and outputs everything to dist/.
Look at the file names — main-HASH.js, chunk-HASH.js. That hash is a fingerprint of the file content. When you deploy a new build, the hash changes, the filename changes, and browsers automatically download the new file instead of using a cached version. Cache busting is automatic.
The chunk files are your lazy-loaded routes. Each loadComponent you added in your routes generates a separate file in dist/browser/. When a user navigates to that route for the first time, that specific file downloads. That's the lazy loading you saw in the Network tab during Day 4A.
The hosting table covers the most common options. The column to pay attention to is "SPA config needed" — that's whether the platform needs to be configured to serve index.html for every route. Without that config, a user refreshing myapp.com/recipes/42 gets a 404 from the server. The server looks for a file at that path, finds nothing, returns 404. Angular never gets a chance to handle it.
Netlify uses a _redirects file. Nginx uses try_files. Vercel auto-detects Angular and handles it. GitHub Pages doesn't support this cleanly, which is why you'd use withHashLocation() there.

Slide 45 — Code Coverage — ng test --code-coverage
ng test --code-coverage runs your tests and generates an HTML report in the coverage/ folder. Open index.html in a browser and you get a visual overview with per-file and per-line details.
Four metrics. Statements and lines are similar — how many executable lines were reached. Functions — was each function called at all. Branches — was each conditional path taken.
Branch coverage is the most important and the most commonly neglected. Let me show you why with a simple example. A guard function that checks isLoggedIn() and returns either true or a UrlTree. You have two branches: the logged-in path and the redirect path. If your test only checks the logged-in case, you have 100% statement coverage but 50% branch coverage. The redirect branch was never exercised. A bug in that branch would slip through.
That's why teams set branch coverage thresholds. The code at the bottom shows the --coverage-thresholds flag — if coverage drops below those values, the test command exits with an error. CI fails. You get notified before the bad code ships.
80% statements and 70% branches is a reasonable starting point for most teams. The exact numbers matter less than having them.

Slide 46 — The Angular UI Ecosystem — CDK and Material
Two things worth knowing about together because CDK is literally the foundation that Material is built on.
Angular CDK — Component Dev Kit — is Angular's toolkit for UI behavior without prescribing visual design. It's not a component library. It's the primitives that you'd use to build one. A11yModule for focus trapping and live announcements. DragDropModule for drag and drop. OverlayModule for positioning dropdowns, tooltips, and popovers at the correct viewport position. PortalModule for rendering content outside your component tree — critical for modals that need to render at the document body level.
If your company is building a design system, CDK is where you start. You get the behavior, you provide the design.
Angular Material is Google's component library built directly on the CDK. It implements Material Design and it's in the majority of enterprise Angular applications. mat-form-field, mat-table, mat-dialog, mat-datepicker — these components follow Angular patterns exactly. They work with reactive forms and signal inputs out of the box. They're accessible by default because they're built on the CDK's accessibility primitives.
ng add @angular/material sets up both Material and CDK with a theming configuration. One command.

Slide 47 — i18n — Internationalization
Angular's built-in i18n compiles translations at build time, which means zero runtime overhead. The tradeoff is that switching locales requires loading a different build of the app rather than swapping strings dynamically.
The process is three steps. You mark strings in templates with the i18n attribute. The @@ prefix sets a stable ID — this prevents the translation file from breaking if you reword the English source. You run ng extract-i18n which outputs an XLIFF file containing every marked string. That file goes to your translators. When translations come back, you register them in angular.json and run ng build --localize, which generates one complete build per locale.
The angular.json config on the slide shows how locales are registered. Each locale maps to a translated XLIFF file. ng build handles swapping the correct file into each output.
@ngx-translate is the popular alternative that loads translations at runtime — useful when you need the user to switch languages without a page reload. The tradeoff is a small runtime overhead and slightly more setup. You'll encounter both in production codebases.

Slide 48 — PWA — Progressive Web Apps
ng add @angular/pwa scaffolds everything. What you get out of the box is genuinely good.
The service worker caches your app's shell — the HTML, CSS, and JavaScript — after the first visit. On subsequent visits, the app loads from cache instantly, even with no network connection. This is the offline capability.
The web manifest enables the "install" prompt. Users on mobile get a banner asking if they want to add the app to their home screen. It launches full-screen with your icon. On desktop, Chrome and Edge show an install button in the address bar.
The ngsw-config.json file is where you configure caching strategies. Look at the two groups on the slide. The app shell uses prefetch — cache it immediately on first load. The API data group uses freshness — try the network first, fall back to the cached version if the user is offline. The maxAge of one hour means cached API responses expire after an hour and are re-fetched.
You can get sophisticated with caching strategies, but the defaults from ng add @angular/pwa are reasonable starting points for most apps.

Slide 49 — Modern vs. Legacy Master Reference
This is your cheat sheet. Everything in one table.
I won't read through all of it — you can do that. But I want to highlight a few rows that represent the biggest shifts.
The bootstrap row — bootstrapApplication() vs bootstrapModule(AppModule) — that's the fundamental architectural change. Everything else flows from it.
The component registration row — imports: [] on the component vs declarations: [] in NgModule — that's what standalone means in practice.
The change detection rows — signals vs zone.js with OnPush and markForCheck() — that's the most significant runtime architecture change in Angular's history.
The SSR rows at the bottom — provideServerRendering() and provideClientHydration() vs the old @nguniversal/express-engine package — that's how much simpler SSR has become.
Every row in this table is a translation. Modern on the left, legacy on the right. When you're reading a legacy codebase and you see something unfamiliar, find it in this table and look left for the modern equivalent.
Print this. Bookmark it. It will serve you well for the first year on any Angular project.

Slide 50 — Key Takeaways
Let me leave you with four things to carry out of this session.
First: signals are expanding fast. linkedSignal, resource, viewChild, input.required — these are all signal-first APIs that replace patterns you'll see in legacy code. Learning them now puts you ahead of most developers working in Angular today.
Second: SSR is one command. ng add @angular/ssr handles the scaffolding. The mental model to internalize is: use isPlatformBrowser() or Renderer2 for anything browser-specific, use provideClientHydration() to preserve server-rendered HTML, and use TransferState to avoid double-fetching data.
Third: legacy Angular is real and it's what you'll encounter on the job. @ViewChild, OnPush, NgZone, APP_INITIALIZER, constructor injection, class-based guards, NgModule — you now know what all of these are and where they came from. You won't be confused by them. You'll recognize them and know exactly what modern equivalent they map to.
Fourth: the ecosystem is deep but you don't need it all at once. CDK and Material for UI components, @ngrx/signals or NgRx when a service stops being enough, @defer for template-level lazy loading, PWA and i18n when the project calls for them. Add these as you encounter real need for them.
That's the course. You've covered more Angular in five days than most developers learn in their first six months on the job. Go build something real with it.
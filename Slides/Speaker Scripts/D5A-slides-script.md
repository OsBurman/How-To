Slide 1 — Title
Alright, good morning everyone. Today is Day 5, and we're spending the morning on testing.
I know testing has a reputation for being the boring part of a course, but I want to push back on that right away. Testing is where you find out if your code actually works — not just "works on my machine right now" but works when someone changes something six weeks from now and your test catches it before it ships. That's the real value.
By the end of this session you're going to have a complete toolkit. You'll know how to test components, services, HTTP calls, pipes, and signals — using the patterns Angular actually ships with. Let's get into it.

Slide 2 — What You'll Be Able to Do
Here's what we're building toward today.
You'll be able to configure TestBed for a standalone component with just the setup you actually need — not a wall of boilerplate. You'll know how to trigger change detection correctly so your tests reflect what users actually see in the DOM. You'll test inputs and outputs using the right API depending on whether you're dealing with decorators or signals — and those are different, which we'll cover. You'll mock services and HTTP so your tests don't depend on a real backend. And you'll be able to make an informed decision between unit tests and integration tests depending on what you're trying to verify.
A lot of ground. Let's start at the beginning.

Slide 3 — What Angular Uses for Testing
When you run ng new, Angular sets up a testing stack for you automatically. You don't configure any of this yourself — it's just there.
There are two pieces. Jasmine is the test framework. It gives you the functions you'll write inside: describe to group tests, it to define an individual test, expect to make an assertion, and beforeEach to run setup code before each test. That's basically the whole API surface you'll use day to day.
Karma is the test runner. Its job is to open a real browser, load your spec files, execute them, and report back what passed and what failed. The browser matters — your Angular code runs in a browser environment, and Karma makes sure your tests do too.
The code on screen is the minimum possible Jasmine test. A describe block wrapping an it block with a single expect. This is the skeleton of every test you'll write today, just with real assertions instead of that placeholder.

Slide 4 — Jest as an Alternative
Before we go further — you will hear about Jest. It's a very popular alternative to Jasmine and Karma, especially in the React world, and a lot of Angular teams have adopted it too.
The main selling point is speed. Jest doesn't open a browser — it runs in Node and simulates the DOM with something called jsdom. That makes it faster, especially in large projects.
But here's the thing: this course uses Jasmine and Karma because that's the Angular default. When you join a team and they say "just run the tests", the Angular CLI default is what they're running. And more importantly — the concepts are identical. TestBed, ComponentFixture, detectChanges — all of that works exactly the same in Jest. If your team uses Jest, switching is just a configuration change. Everything you learn today transfers directly.

Slide 5 — Running Tests with ng test
The command is ng test. That's it.
By default, it starts in watch mode — it keeps running and re-runs your tests every time you save a file. That's what you want during development. You make a change, tests run, you see green or red immediately.
For CI pipelines where you just want a single pass and an exit code, you add --watch=false. And if you want to run just one spec file during development, you can pass --include with a glob pattern.
When Karma runs, it opens a browser window. Leave it open. That browser window is doing the actual test execution. The results show up in your terminal. You'll see something like "12 specs, 0 failures" — that's what a passing test run looks like.

Slide 6 — What TestBed Is
Now the core concept: TestBed.
TestBed is a mini Angular runtime that exists only inside your test. Think of it as Angular-lite — just enough infrastructure to mount a component, run change detection, resolve dependencies from DI, and render a template. You don't need a full app running. You just need enough of Angular to exercise the one thing you're testing.
Here's the critical thing I want you to understand right now: TestBed resets completely before every single it() block. It tears itself down, clears all state, and rebuilds from scratch. Every test gets a clean slate. Variables from the previous test don't carry over. Component instances are gone.
This is why your setup goes in beforeEach — because that function runs fresh before each test as part of that reset cycle. If you put setup outside beforeEach, at the top of a describe block, it runs once and then that state persists across tests, which leads to weird failures where tests pass or fail depending on what order they run in.
Fresh per test. That's the rule.

Slide 7 — TestBed.configureTestingModule
This is how you tell TestBed what to spin up for your test.
You call TestBed.configureTestingModule() and pass it a configuration object. For standalone components — which is everything we've written in this course — you put the component in the imports array. That's it. The component declares its own dependencies, so Angular already knows what it needs.
If the component injects a service, you put the mock in providers with useValue. Angular's DI will then hand that mock to the component instead of the real thing. We'll cover that in detail later.
compileComponents() is required when your component uses templateUrl — which all our components do, since we never inline templates. Template compilation is async, so you await the whole call.
Notice the whole beforeEach is async. That's because of the await. This pattern — beforeEach(async () => { await TestBed... }) — is the standard setup you'll write for every component test.

Slide 8 — ComponentFixture
Once TestBed is configured, you create the component with TestBed.createComponent(). What you get back is a ComponentFixture.
The fixture is your handle on everything. It gives you three things you'll use constantly:
fixture.componentInstance is the actual component class — the TypeScript object. You use this to set inputs, call methods, and read property values.
fixture.nativeElement is the raw browser DOM node — the actual HTML element your component rendered into. Use this when you want to querySelector something or read textContent.
fixture.debugElement is Angular's typed wrapper over that same DOM node. It has Angular-aware querying tools. Use it when you need to find elements by directive or component type, not just CSS.
The short version: nativeElement for quick DOM lookups, debugElement when you need Angular's querying tools.

Slide 9 — debugElement — Querying the DOM
Let me show you what debugElement actually looks like in use.
By.css() works like querySelector but returns a DebugElement instead of a raw DOM node. You then call .nativeElement on that DebugElement to get the actual DOM node you can read text from or make assertions against.
queryAll instead of query when you want all matching elements back as an array.
I've also left By.directive() as a comment — you'd use that to find all elements that have a specific Angular directive applied. You don't need it today, but it's worth knowing it exists.
Both approaches work. For most tests I tend to use fixture.nativeElement.querySelector() directly — it's shorter and the result is the same for simple CSS lookups. debugElement earns its keep when you need directive-aware querying.

Slide 10 — detectChanges() — Triggering the Update
This is one of the most important things I'll say all morning: Angular's change detection does not run automatically inside tests.
In a running app, Angular's change detection handles updating the DOM for you. In tests, you're in control. Nothing updates the DOM until you explicitly call fixture.detectChanges().
Look at the example. We set component.title to 'Hello World'. Without detectChanges(), the template still shows whatever it showed before — probably an empty string. After detectChanges(), Angular runs change detection, the template bindings evaluate, and the DOM reflects the new value.
Two more things to know. First, detectChanges() on the very first call also triggers ngOnInit. That's intentional — it's how you initialize the component in a test. Second, because you control when detection runs, your tests are predictable. You set state, you call detectChanges(), you assert. It's always in that order.

Slide 11 — ⚠️ WARNING — Forgetting detectChanges()
I want to spend an extra minute here because this is legitimately the most common mistake I see with Angular testing, and it's insidious because it can make tests appear to pass when they're actually testing nothing useful.
Look at the example. We set component.errorMessage. We then query .querySelector('.error') and assert on its text content. But we never called detectChanges().
What happens? One of two things. Either the element doesn't exist yet and el is null, which causes a different error entirely. Or — and this is the dangerous one — the DOM is stale from a previous test or the initial render, and the assertion accidentally passes against old content.
The rule is simple: after any state change, before any DOM assertion, call detectChanges(). Make it a reflex. Every time you write expect(fixture.nativeElement..., ask yourself — did I call detectChanges() after the last state change?
If you ever have a test that's passing but you're not confident it should be, this is the first place to look.

Slide 12 — Testing Standalone Components — imports Array
Here's something that should feel familiar. Look at the component definition at the top of the slide — standalone: true, its own imports array with what it needs, templateUrl, styleUrl. This is exactly how we've been writing components all week.
Now look at the test setup. The entire configureTestingModule call is just imports: [UserCardComponent]. That's it. No declarations, no BrowserModule, no feature module imports. The component already described everything it needs. We just point TestBed at it.
This is one of the real, practical benefits of standalone components. Testing module-based components used to require replicating the component's entire module dependency chain inside configureTestingModule. We'll see what that looked like in the legacy section. For now, appreciate how clean this is.

Slide 13 — Test Suite Structure
Before we go further, I want to show you how a full test file is organized — because knowing the individual pieces is different from knowing how they fit together.
The outer describe names the thing being tested. Inside it, you declare your variables — fixture, component — at the describe scope so every test inside can access them.
beforeEach runs before every single it() block. Not once. Before every test. You configure TestBed, create the component, set up whatever starting state you need. Each test inherits a clean version of this.
The nested describe blocks are optional but useful. When a component has fifteen tests, grouping them into "inputs", "outputs", "lifecycle" makes the file readable at a glance. You can also add a beforeEach inside a nested describe if a specific group of tests needs additional setup beyond the outer beforeEach.
it() blocks are individual tests. One assertion focus each. The description should read like a statement: "should display the user name", "should emit when clicked", "should clear on destroy".
This structure — describe, beforeEach, nested describe, it — is the same whether you're using Jasmine, Jest, or any other test framework. Learn it once, use it everywhere.

Slide 14 — Creating the Fixture
Let's put it all together in a complete setup.
TestBed.configureTestingModule with our standalone component in imports, compileComponents(), then TestBed.createComponent(). The result is our fixture.
One thing that trips people up: createComponent() does not trigger change detection. The component exists, but ngOnInit hasn't run and the template hasn't rendered yet. You need to call fixture.detectChanges() to kick that off.
The smoke test at the bottom — expect(fixture.componentInstance).toBeTruthy() — is a useful starting point for any new component test. It just verifies the component created successfully. If your setup is broken, this fails and you know immediately that the problem is in configuration, not in your test logic.

Slide 15 — Accessing the Component Instance
fixture.componentInstance is just the component class as a TypeScript object. There's no magic. You can read properties from it, call methods on it, and set property values on it exactly as you would with any TypeScript object.
For @Input() decorated properties — which are plain writable properties — you set them directly: component.userId = 42. Then call detectChanges() to sync the template.
For calling methods directly, same thing: component.resetForm(). This is useful when you want to test that a method does what it should without going through the DOM to trigger it.

Slide 16 — Testing @Input
Here's the complete pattern for testing an @Input() decorated input.
Set the value on componentInstance, call detectChanges(), assert the DOM.
The key point — and I want you to internalize this — is that you're not testing the property, you're testing the binding. Anyone can verify that you set a property to a string. The question is: does that property actually appear in the template? Does the DOM update? That's what this test verifies.
Notice we change the input a second time and assert again. This proves the binding is reactive — it doesn't just render once and stop. If your property binding is broken in a subtle way, like if you accidentally broke the two-way sync, the second assertion catches it even if the first happened to pass.

Slide 17 — Testing @Output — Subscribing to the Emitter
Testing outputs follows a consistent pattern: subscribe before you trigger, capture what was emitted, assert after.
Here we subscribe to component.liked before we click the button. The subscription callback captures the emitted value in a variable. Then we click the button — which calls onLike(), which calls this.liked.emit() — and then we assert that emittedValue is 1.
One thing worth noting: EventEmitters fire synchronously. When emit() is called, every subscriber fires immediately in the same call stack. So you don't need detectChanges() to capture the emission — it already happened. You would call detectChanges() if you then wanted to assert on DOM changes that resulted from the emission, but for just capturing what was emitted, it's not needed.

Slide 18 — Testing @Output — Method Call and Multiple Emissions
Two patterns here I want you to see.
First: you don't always have to click a button to trigger an output. You can call the component method directly. Look at the first test — component.onLike() instead of fixture.nativeElement.querySelector('button').click(). This is cleaner when you're testing emission logic in isolation, and it's the only option when the output isn't wired to any DOM event at all. Some outputs are triggered programmatically, not by user interaction.
Second pattern: collecting multiple emissions. We subscribe and push into an array. Then we trigger three times and assert the array equals [1, 2, 3]. This proves both that the output fires multiple times and that the values increment correctly. Testing a single emission only tells you half the story.

Slide 19 — Testing Signal Inputs — Why You Can't Set Them Directly
Now we shift to signal inputs — input() from Day 2B — and there's an important difference from @Input() decorators.
Signal inputs are readonly from outside the component. You cannot assign to them. You cannot call .set() on them from a test. And you definitely shouldn't cast to any to try to force it — that bypasses Angular's reactive tracking, and the component won't update correctly even if it doesn't throw.
Here's why this exists. On Day 2B, we talked about how a signal input is owned by the parent. The parent passes a value down; the child reads it. The child has no business writing to it. The test environment is in the same position as the child — you're not the parent, so you don't get to write.
Angular thought about this and provided an official API specifically for tests.

Slide 20 — fixture.componentRef.setInput()
The official API is fixture.componentRef.setInput(name, value).
setInput() acts as the parent — it delivers the value through Angular's signal system correctly. The component receives it exactly as it would if a real parent had bound a value to that input in a template. The signal's internal tracking is set up properly, computed values that depend on it will respond, effects will fire.
First argument is the input name as a string. This must exactly match the property name you used in input(). Get it wrong and Angular throws immediately, which is a nice property — it fails loud rather than silently.
Always call detectChanges() after, same as with @Input().

Slide 21 — setInput() Full Example
Here's a complete test for a signal input component.
The beforeEach is standard — configure, create, initial detectChanges(). Then in the test we call setInput() twice, calling detectChanges() after each one, and assert the DOM updated both times.
This is the complete pattern. You'll use it every time you need to drive a component through different signal input values — testing how it responds to changes, not just its initial state.

Slide 22 — Testing computed() Signals
computed() signals are derived from other signals. The test pattern is: change a source signal with .set(), then either read the computed signal directly or assert the DOM.
Look at the component. total is computed from quantity times price. Both are writable signals on the component instance.
In the test, we set both source signals, then we have two ways to assert. Reading the computed signal directly — component.total() — doesn't require detectChanges(). Signals are synchronous; you can read them immediately after setting a dependency.
But if you want to assert what's showing in the DOM — in this case, the <p> tag that renders total() — you do need detectChanges(). Same rule as always: DOM assertion requires detectChanges() first.

Slide 23 — Testing computed() — Verifying Reactivity
This slide is about proving that the entire reactive graph works, not just one path through it.
We set both signals, check the total. Then we change just price and check again. Then we change just quantity and check again. Every dependency gets exercised independently.
This matters because a computed() that's missing a dependency in its expression looks fine at first — it computes correctly on the first read. But it won't update when the missing dependency changes. This test pattern catches that bug. If you see the first assertion pass and a later one fail, one of your signal dependencies isn't being tracked in the computed() expression.

Slide 24 — Unit Testing a Service — jasmine.createSpyObj
When your component depends on a service, you don't test with the real service. You want a fake — something you fully control. That's what jasmine.createSpyObj gives you.
You pass it a name, which is used in error messages, and an array of method names. It creates an object where every listed method is a Jasmine spy — a fake function that records when it was called, what arguments it received, and what it returned.
Then you configure each spy with .and.returnValue(). Here we're returning of(...) — and I want to call that out explicitly. of() is from RxJS, which you covered on Day 3. It wraps a plain value in an Observable. We use it here because the real service returns an Observable, so our fake needs to return one too.
Spies let you assert on behavior: was this method called? How many times? With what arguments? We'll see that in action on the ngOnInit slide.

Slide 25 — Providing the Mock in TestBed
Once you have a mock service, you tell TestBed to use it in the providers array.
{ provide: UserService, useValue: mockUserService } — when Angular's DI sees anything requesting UserService, it hands back mockUserService instead. The component has no idea. It calls inject(UserService), gets back the mock, calls methods on it, and the spies record everything.
This is the fundamental pattern for isolating a component from its dependencies in tests. The component code doesn't change. The test controls what the dependencies do.

Slide 26 — Testing BehaviorSubject State
Services often expose Observable properties alongside their methods — a state stream, an error stream. When you're mocking a service that has those, you need to set them up on the mock too.
The clean way to do this is jasmine.createSpyObj's third argument, which is an object of property values to set directly on the mock. See { state$: stateSubject.asObservable() } — this sets state$ as a real Observable property on the mock without any casting.
Declare your BehaviorSubject at the describe scope so every it() block can call .next() on it. Each test can push different state values and observe how the component responds.
The test itself is simple: push a value, detectChanges(), assert the DOM. Push another, detectChanges(), assert again. You're simulating the sequence of state changes a user would actually trigger.

Slide 27 — Testing the error$ Stream
Same pattern, but with a Subject instead of a BehaviorSubject.
Subject emits values on demand. Unlike BehaviorSubject, it has no initial value — it doesn't emit anything until you call .next(). That makes it the right choice for an error stream, which should start silent and only emit when something actually goes wrong.
Again using the third argument to createSpyObj to set error$ as a property on the mock — keeping everything in one place, no any casts needed.
The test verifies three things: no error on initial render, error appears when the stream emits, and the error clears when we push an empty string. That last assertion is easy to skip but important — you want to prove that the error state is cleanly recoverable, not just that it appears.

Slide 28 — Testing HTTP — provideHttpClientTesting()
When you want to test code that makes HTTP requests, you swap out the real HTTP layer with a fake one.
Two providers work together. provideHttpClient() registers HttpClient in DI — the component can inject and use it normally. provideHttpClientTesting() replaces the underlying transport with a testing controller that intercepts every outgoing request before it hits the network.
Nothing actually leaves the machine. Every HTTP call your component makes gets captured, and you decide what the response is.
Always include both. Without provideHttpClient(), HttpClient isn't in DI. Without provideHttpClientTesting(), real HTTP requests go out.

Slide 29 — HttpTestingController
HttpTestingController is what you use to interact with those intercepted requests.
Get it from DI using TestBed.inject() — just like any service.
The afterEach with httpMock.verify() is critical. verify() checks that every HTTP request your component made was handled by your test. If your component fires three requests and your test only handles two, verify() fails with a clear message telling you there was an unhandched request.
Without verify(), those extra requests just silently disappear. Your test passes, but you never noticed your component was making requests you didn't expect. verify() in afterEach turns that from a silent bug into a loud failure.
Make this a habit: every test file that uses HTTP gets httpMock.verify() in afterEach.

Slide 30 — expectOne() — Assert the Right Request
Here's the full sequence of an HTTP test.
fixture.detectChanges() triggers ngOnInit, which triggers the HTTP call. At this point, the request is pending — intercepted by the testing controller, waiting for a response.
httpMock.expectOne(url) does two things: it asserts that exactly one request was made to that URL, and it returns the pending request object so you can inspect and respond to it. If zero requests match, or more than one, it throws immediately with a descriptive error.
You can then inspect req.request.method to verify it's a GET, POST, whatever you expect.
req.flush() sends the fake response. This is when your component's .subscribe() callback fires, processes the data, and updates state. Then another detectChanges() to sync the template, and you assert on the rendered output.

Slide 31 — flush() — Send a Fake Response
flush() is flexible. You can send an array, a single object, null for an empty response, or even a response with custom headers if your code reads them.
The key mental model: flush() is you playing the role of the server. Whatever you pass in is what the component's HTTP response handler receives. Design your fake response to match what the real API would return for that scenario — the same shape your TypeScript interface describes.

Slide 32 — Simulating HttpErrorResponse
Error paths are the ones that bite you in production. Test them.
The second argument to flush() sets the HTTP status. Pass a 404, a 500, whatever error code your component's catchError handler branches on.
Your component receives an HttpErrorResponse object in the error handler, same as it would from a real API failure. The test verifies that the error branch in your code actually runs and produces the right result in the UI.
If you've written different error messages for 404 vs 500 vs network failure — which is good, you should — you need a separate test for each one. This is the test that proves those branches work.

Slide 33 — Testing a Pipe — Why It's Simple
Pipe tests are a breath of fresh air after all that setup.
A pipe is just a class with a transform() method. It doesn't need Angular's DI. It doesn't need a component. It doesn't need a DOM. You just instantiate it and call transform() with some input, and assert what comes back.
No TestBed. No ComponentFixture. No detectChanges(). Just: create, call, assert.
This is the simplest kind of Angular test to write, which makes it a great starting point when you're new to testing on a project.

Slide 34 — Pipe Test — Full Example
Here's what a thorough pipe test suite looks like.
One describe block, one instance of the pipe at the top of the describe scope — that's fine here because the pipe has no state that changes between tests. Then one it() for each behavior we want to verify.
Notice the coverage: truncation works, no-truncation works, boundary value works, empty input works, zero limit works. We're testing the shape of the behavior, not just the happy path.

Slide 35 — Testing Edge Cases in Pipes
Boundary values catch the bugs you didn't anticipate. "Exactly at the limit" and "one less than the limit" are the two cases where off-by-one errors hide.
I also want to call attention to the Unicode case. JavaScript's .length property counts UTF-16 code units, not visible characters. For most standard text, this doesn't matter — each character is one code unit. But some characters, like certain emoji, count as two code units. So '👋'.length === 2, even though you see one character.
This means if your pipe uses .length to check if truncation is needed and .slice() to do the cutting, Unicode characters can cause it to cut in unexpected places or count lengths that don't match what the user sees. Your pipe might not need to handle that — but you should know whether it does, and a test tells you.

Slide 36 — Testing ngOnInit
ngOnInit runs when detectChanges() is called for the first time. That's how you test it.
Notice the pattern: we configure the mock service's return value before calling detectChanges(). That's intentional — ngOnInit fires during that detectChanges() call, so the spy has to be set up beforehand.
After detectChanges(), we can assert two things: first, that the component's state was updated by what the service returned. Second, we use toHaveBeenCalledTimes(1) on the spy to assert the method was actually called — not just that the state happened to be correct.
Both assertions together are more complete than either alone. The state assertion tells you the output is right. The spy assertion tells you it came from the right place.

Slide 37 — Testing ngOnDestroy
fixture.destroy() calls ngOnDestroy. That's the whole mechanism.
For timer cleanup, we spy on window.clearInterval before destroying and assert it was called. This proves the component isn't leaving timers running after it's been removed from the DOM.
For subscription cleanup, we grab a reference to the subscription, destroy the component, and assert sub.closed is true. A closed subscription won't fire after destroy, which means no memory leaks and no "set state on a destroyed component" errors.
These tests are easy to skip. Don't skip them. Memory leaks and zombie subscriptions are real production bugs that are hard to diagnose. A test here takes two minutes to write and saves hours of debugging later.

Slide 38 — Unit vs Integration — NO_ERRORS_SCHEMA
When your component's template contains child component selectors like <app-header> or <app-sidebar>, Angular's template compiler validates them against its schema — essentially checking "do I know what this element is?" If you haven't imported those child components into TestBed, it throws.
NO_ERRORS_SCHEMA tells the compiler to skip that validation entirely. Any element name, known or unknown, is accepted. Angular just renders it as an empty element and moves on.
What you get: a focused unit test. You're only testing the parent component's logic — its inputs, its outputs, its service interactions, its template bindings. Child components are invisible to the test.
What you give up: if a child component's selector changes, gets deleted, or needs a required input that the parent isn't providing, you won't catch it here. Those are integration-level problems, and you need a different kind of test for them.

Slide 39 — Unit vs Integration — Real Child Imports
The alternative is importing real child components. You put every child the parent template uses into TestBed's imports array, and they render for real.
Now if you break a child component — change its selector, add a required input the parent doesn't provide, break its template — the parent's integration test fails. That's the point.
The cost is setup complexity and speed. You may find yourself chasing transitive dependencies — the child needs something, its child needs something else. And if any child is broken, every parent test that imports it fails, even if the parent itself is fine.

Slide 40 — When to Use Each Approach
The table summarizes the tradeoff.
My practical advice: write most of your tests with NO_ERRORS_SCHEMA. Test the component's logic, its inputs, its outputs, its HTTP calls, its service interactions. These tests are fast, focused, and stable.
Then write a smaller number of integration tests that import real children. These tests exist to catch things like: "the parent passes the wrong prop name to the child" or "the child component we're depending on was refactored and its API changed." You don't need many of these — even one or two per major component boundary is valuable.
Keep them in separate files. That way you can run just the unit tests on every save, and run the integration tests in your CI pipeline.

Slide 41 — Running Both — Separate Spec Files
Here's the file structure. Two spec files per component directory — the unit test and the integration test.
The ng test commands at the bottom show how to target each set independently. This is useful in a CI pipeline where you might run the fast tests on every commit and the slower integration tests only on pull requests or merges.
The naming convention *.integration.spec.ts is just a convention — Angular doesn't treat it differently. It just gives you something to glob on.

Slide 42 — Coming Up: Modern vs Classic Angular
Okay. You now know modern Angular testing end to end.
Before we wrap up the session, we're going to spend a few slides looking at the legacy approach — the patterns from before Angular 17 that you'll encounter in existing codebases, open-source projects, and quite possibly on your first job.
You are not going to write this code. You're going to recognize it when someone else's codebase shows it to you and you're not confused by it.
Each of the next few slides shows modern first — reinforcing what you just learned — then the legacy equivalent and what made it painful.

Slide 43 — Component Test Setup — Modern
This is what you've been writing all session. One line in imports. No module declarations, no feature module imports, no BrowserModule. The component brings everything it needs.
When you look at this and think "that was surprisingly simple" — that's intentional. Standalone components were designed to make exactly this kind of setup trivial. It's one of the concrete developer experience wins of the modern Angular approach.

Slide 44 — Component Test Setup — Legacy
Here's what the same setup looked like before standalone components.
declarations array for the component. Then imports with BrowserModule because you needed that for ngIf and ngFor. Then whatever feature module the component lived in. Then whatever shared modules its template referenced.
The problem was that this had to match the real NgModule configuration of the application. If the app module imported SharedModule, and SharedModule had something the component's template needed, you had to figure that out and add it here. Miss one and you get a cryptic error message that doesn't point to the missing import.
New developers spent real time debugging test setup problems that had nothing to do with their actual test logic. Standalone components eliminated this entire category of problem.

Slide 45 — HTTP Testing — Modern
Modern HTTP testing setup: two function calls in providers. provideHttpClient() and provideHttpClientTesting(). Clean, explicit, you can read exactly what each one does.

Slide 46 — HTTP Testing — Legacy
Legacy: HttpClientTestingModule in the imports array. One import that bundled both the client registration and the mock controller.
It worked. The HttpTestingController API — expectOne, flush, verify — was identical to what we use today. That part didn't change.
What changed was the setup. HttpClientModule was deprecated in favor of provideHttpClient(), and HttpClientTestingModule went with it. When you see it in existing code, you know immediately you're looking at a pre-Angular 15 codebase.

Slide 47 — Signal Input Testing — Modern
Modern: fixture.componentRef.setInput(). The component receives the value through Angular's proper signal system. Types are safe. Reactive tracking is correct.

Slide 48 — Signal Input Testing — Legacy Equivalent
Before signal inputs existed, all inputs were @Input() decorators — plain writable properties. In tests, you just assigned to them directly. component.username = 'Alice'. Simple.
The complexity only exists because signal inputs are readonly by design. Legacy @Input() properties had no such restriction, so tests didn't need a special API. If you're working in a codebase that still uses @Input() decorators and sets them with direct assignment in tests — that's fine. That still works perfectly. You only need setInput() for signal inputs.

Slide 49 — Change Detection — Same in Both
I'll say this clearly so you remember it: detectChanges() did not change.
It works exactly the same in a standalone component test as it did in a module-based component test. If you are ever migrating a test file from legacy to modern, change detection is the one part of the test code you don't need to touch.
The patterns around it — when to call it, why it's required, what it triggers — all the same. The legacy-to-modern migration work is in the configureTestingModule setup. Once the component is mounted, the test itself looks identical.

Slide 50 — Key Takeaways
Let's land this.
TestBed resets before every test. Your setup goes in beforeEach. Each it() block is independent. This is the foundation that makes tests trustworthy.
detectChanges() is not optional. You will write it dozens of times today in the exercise. Every DOM assertion requires it after a state change. When a test passes but shouldn't, this is where you look first.
Use the right API for each input type. @Input() decorators — assign directly on componentInstance. Signal inputs — fixture.componentRef.setInput(). Using the wrong one will either throw immediately or silently not work.
Mock at the TestBed level. jasmine.createSpyObj with methods and Observable properties — no casting to any, no leaking real service behavior into your tests. The component gets exactly what you give it and nothing else.
That's the session. Let's open it up for questions before we move into the exercise.
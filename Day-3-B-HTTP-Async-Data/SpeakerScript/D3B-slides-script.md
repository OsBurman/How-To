Slide 1: Title Slide
Alright, welcome to Day 3 Part B. This morning in Part A you got comfortable with Observables, RxJS operators, and services. You learned how to share state across components using a BehaviorSubject, and you learned how toSignal() bridges the RxJS world into the signals world.
This afternoon we're going to put all of that to work against a real API. By the end of this session you'll be making HTTP calls, typing the responses, handling errors properly, and wiring everything into your templates through signals. This is the session where your Angular app stops being self-contained and starts talking to the outside world.

Slide 2: What You'll Be Able to Do
Here's what you're walking away with today. You're going to configure Angular's HTTP client — that's a one-line setup we'll get to in a second. You'll type every response with a TypeScript interface, which means your IDE will actually help you instead of just letting you write whatever you want. You'll handle the full CRUD cycle — GET, POST, PUT, DELETE. You'll cancel stale requests automatically, which sounds fancy but is one operator. You'll track loading state so your users know something is happening. And you'll write interceptors, which let you attach things like auth tokens to every single request without touching each individual call.
Let's get into it.

Slide 3: Enable HTTP for the Whole App
Before you can make a single HTTP call, Angular needs to know you want to use HttpClient. You do that once, in app.config.ts, and then every component in the entire application can inject it.
Look at this. You import provideHttpClient from @angular/common/http — and that's the package you'll be importing everything HTTP-related from today — and you drop it into the providers array. That's it. One function call and you're done.
Nothing else needs to happen for basic usage. We'll pass options into that function later when we set up interceptors, but for right now, provideHttpClient() with no arguments is all you need.

Slide 4: HTTP Builds on Part A
This is the most important mental model to carry into this session. Everything you learned about Observables this morning applies here. HttpClient doesn't introduce a new paradigm — it just gives you Observables that happen to represent HTTP requests.
Look at the two examples. The pattern is identical. Creating an Observable does nothing. Something has to subscribe to it before any work happens. With a regular Observable that means the stream starts emitting. With an HTTP Observable it means the request fires.
I want to call out the async pipe bullet I've removed from later slides. You'll see async pipe in Part A legacy contrast and in older codebases. For today we're using toSignal() and subscribe() — those are the two mechanisms you'll use in this session.
Everything else — pipe(), operators, catchError, toSignal() — all of it works on HTTP Observables exactly the way it worked on the Observables you built this morning.

Slide 5: Type Every Response
Here's a question. What's wrong with the first example? TypeScript isn't complaining. The code will run. But look — users is typed as any. That means TypeScript is completely blind to what's in there. You could write users.nme instead of users.name and TypeScript would say nothing. Your IDE would give you no autocomplete. You'd only find out something was wrong at runtime, in the browser, after you'd already deployed.
The fix is the second example. You define an interface — just a plain TypeScript interface, nothing Angular-specific about it — and you pass it as a generic to get(). Now TypeScript knows the shape. Autocomplete works. Typos get caught at compile time. That <User[]> is a generic parameter, the same syntax you've seen on Arrays and other TypeScript generics.
One caveat worth knowing: TypeScript cannot validate the response at runtime. If the API sends back data that doesn't match your interface, TypeScript will not throw an error — it already compiled. The interface is a compile-time contract. Make sure it matches what the API actually returns.

Slide 6: Define the User Interface
Here's what a real interface looks like for the JSONPlaceholder users endpoint, which we'll use throughout today's examples.
A few things to notice. First, we're splitting the nested address object into its own separate interface rather than flattening everything into one giant User interface. That's the right pattern — if the API returns nested objects, model them as nested interfaces.
Second, I'm not modeling every field JSONPlaceholder returns. I'm only including the fields this component actually uses. You don't have to map the entire API response. Include what you need.
Third — no I prefix, no Model suffix. Just User. That's standard TypeScript style.

Slide 7: Typing the HTTP Call
Now let's see the generic flow through an actual component. Look at the get<User[]> call. That generic parameter — User[] — is what TypeScript uses for the type of everything downstream. Inside the subscribe callback, users is typed as User[]. Full autocomplete. If you try to access a field that doesn't exist on User, TypeScript tells you immediately.
The thing to reinforce here: this is a hint to TypeScript. It's not a runtime cast. Angular is trusting you when you say the response shape is User[]. So make your interface match what the API actually returns.

Slide 8: GET — Fetching Data
GET is the most common HTTP method. You use it to read data. It takes a URL, optionally some options, and returns an Observable<T> where T is whatever you put in the generic.
Look at the getUser method. Notice the return type — Observable<User>. Not User. The method doesn't return the user, it returns an Observable that will eventually emit a user when someone subscribes. This is the pattern you want to build into your muscle memory: services return Observables, callers subscribe.
GET never sends a body. If you need to filter data, you do it through the URL path or through query parameters — we'll cover those in a few slides.

Slide 9: POST — Creating Data
POST is how you create new resources. You send a body to the server and get back the thing it created.
Look at the method signature. We have a CreateUserDto — DTO stands for Data Transfer Object, it's just a type for the data you're sending. We pass that as the body, which is the second argument to http.post(). Angular automatically serializes it to JSON and sets the Content-Type header to application/json. You don't have to do that yourself.
The generic <User> on http.post is what you expect back from the server — typically the created resource with a server-assigned ID. That's different from the CreateUserDto which is what you're sending. Two different types, two different directions.

Slide 10: PUT and DELETE
Quick tour of the other two methods. PUT replaces a resource entirely — you send the full updated object and the server replaces what it had. If the API only accepts partial updates, that's PATCH, which works the same way but we're not showing it explicitly today.
DELETE removes a resource. Notice the <void> generic — we're not expecting meaningful data back. The server typically responds with a 204 No Content, which is HTTP's way of saying "done, nothing to return." Typing it as void tells TypeScript that clearly.
Same Observable pattern as everything else. Return it from the service, subscribe in the component.

Slide 11: ⚠️ Nothing Happens Until You Subscribe
I'm putting a warning slide here because this mistake will happen to everyone in this room at some point and I want you to be able to diagnose it fast.
Look at the broken example. this.http.get is called. No error. No warning. The code runs. And nothing happens. The request never fires. The component loads blank. And Angular gives you zero feedback.
This trips people up because they're used to functions doing things when you call them. Observables don't work that way. Creating an Observable describes the work. Subscribing triggers it.
The two correct patterns are shown below. Either call .subscribe() directly, or use toSignal() which subscribes automatically. Both work. toSignal() is cleaner for templates because you don't manage the subscription yourself.
If you build a component and the data never appears, come back to this slide. The first question is always: did something subscribe?

Slide 12: Build Query Strings with HttpParams
When your API accepts query parameters — things like pagination, search terms, filters — don't build the URL string manually. Look at that first example. That works in the happy path, but the moment userId contains a special character or space, you've broken the URL. You'd have to manually call encodeURIComponent on everything. It gets messy fast.
HttpParams handles all of that for you. You create a new instance, call .set() for each parameter, chain them together, and pass the whole thing as { params } in the options object. Angular encodes everything correctly and builds the final URL.
The immutability thing is important. params.set() does not modify params. It returns a new HttpParams instance. That's why you chain them — each .set() returns a new object with that value added. If you call .set() and don't capture the return value, you've lost that parameter.

Slide 13: Pass HttpParams to a Request
Here's what a real service method looks like with HttpParams. A few things I want to highlight.
First, the comment at the top. The method returns Observable<Post[]>. It does not subscribe internally. This is the correct pattern for a service — the service defines what to do, the component decides when to do it. If you subscribed inside the service, you'd lose control over when the request fires and you'd have a harder time cancelling it.
Second, the alternate syntax at the bottom — new HttpParams({ fromObject: { userId, page } }). That's a shortcut when you have a bunch of parameters and don't want to chain twenty .set() calls. Both approaches produce the same result.

Slide 14: The Stale Request Problem
Before I show you switchMap in action, I want to make sure the problem is real to you. Look at this diagram.
User types "ang". Request A fires. That request is in-flight. User keeps typing — now it's "angul". Request B fires. Here's the issue: request B might come back before request A, because "angul" is a longer query and the API filtered faster. Request B arrives, you render the results. Then request A arrives with the bigger result set, and it overwrites what's on screen. Now the user typed "angul" and they're seeing results for "ang."
You cannot control the order responses arrive. The only solution is to cancel the old request when a new one starts. That's exactly what switchMap does.

Slide 15: switchMap Cancels Stale Requests
The name "switch" is the mental model. When a new value comes through, switchMap switches its attention to a new inner Observable and abandons the previous one. The cancellation is real — Angular calls the browser's abort() method on the underlying request. The network request is actually cancelled, not just ignored.
Two rules of thumb worth memorizing. Search inputs: use switchMap. Route param changes where you're fetching based on the ID in the URL: use switchMap. Basically any time "the user changed their mind before the previous request finished" is a realistic scenario, switchMap is your tool.

Slide 16: switchMap in Practice
Now let's wire this up properly. I want to draw your attention to something important here. In earlier versions of these slides I used FormControl for the search input. But FormControl is a Day 4 topic — reactive forms — and I don't want to introduce it before you've seen it in context. So we're using a Subject instead, which you covered in Part A.
A Subject is a stream you control manually. When you call .next() on it, you push a value into the stream. That's it. Here we're pushing the input element's value into searchTerm$ on every keystroke.
Then toSignal() wraps the entire pipeline. The pipeline debounces so we're not firing a request on every single keystroke — we wait until the user pauses for 300 milliseconds. Then we filter out terms shorter than two characters. Then switchMap takes each term, fires an HTTP request for it, and cancels the previous one automatically.
The template just wires the input event to searchTerm$.next(). Clean, no manual subscriptions, no cleanup needed.

Slide 17: Handle Errors with catchError
What happens if your HTTP request fails and you don't have catchError? The Observable errors. The stream dies. And here's the subtle part — if you used toSignal(), the signal stops updating. If you're using subscribe(), future calls may not work as expected. Either way, your template is stuck.
catchError intercepts the error before it kills the stream. You get the error as an argument, you decide what to do with it, and you return a new Observable to keep the stream alive. The most common choice is of([]) — emit an empty array and complete. The template gets an empty list instead of crashing.
The alternative at the bottom — return throwError(() => err) — is for cases where you want the caller to handle the error rather than the service. Either approach is valid depending on your architecture.

Slide 18: catchError with a User Message
Here's the practical pattern you'll use most. Inside catchError, set an error signal. Return a safe fallback. In the template, check that signal and display the message.
I want to connect this explicitly to what you did in Part A. In Part A you had a data$ stream and an error$ stream as a BehaviorSubject. You'd push an error message to the error stream when something went wrong. This is the signals equivalent of that same pattern. Same concept, different mechanism. The point is the same: errors and data travel separately, and the template handles both.

Slide 19: Retry Pattern — Re-Calling the Load Function
The exercise for today asks you to add a retry button. I want to address this directly because you might look for a retry() RxJS operator and find references to it. That operator exists and does something more sophisticated — it automatically resubscribes on failure. It's in the Extended Topics section of the syllabus. We're not covering it today.
What we're covering is simpler and honestly covers most real use cases: a button that calls loadUsers() again. Look at the template. When there's an error, we show the message and a Retry button. The button calls loadUsers(). That function clears the error signal, fires a fresh HTTP request, and updates the data signal when it comes back. The whole flow resets cleanly.
You don't need retry() for this. A button that re-calls your load function is completely valid, completely readable, and what most production apps actually do.

Slide 20: ⚠️ HttpErrorResponse — Know Your Error Object
When an HTTP call fails, the error you get in catchError is not a plain JavaScript Error object. It's an HttpErrorResponse. This is Angular's typed wrapper around HTTP failures, and it carries information that a plain error object doesn't.
Three properties you need to know. err.status is the HTTP status code — or zero if the request never reached the server. err.message is a generic human-readable description. err.error is the parsed response body, which often contains more detail from the server — things like validation messages or custom error objects.
Type the parameter explicitly as HttpErrorResponse. Without that type annotation, TypeScript treats it as unknown and you can't access those properties without type assertions.

Slide 21: Branch on HttpErrorResponse Status
Let's talk about status === 0 specifically, because it's the one that surprises people the most.
Zero doesn't mean the server returned an error. Zero means the request never got there. Could be no internet connection. Could be a CORS misconfiguration — the server rejected the preflight request before your actual request even fired. Could be the server is completely down. The user's browser couldn't establish a connection at all.
From a user experience perspective, that needs a different message than a 404 or a 500. "Network error, check your connection" is helpful. "Unexpected error (0)" is not.
This getErrorMessage utility is worth pulling into a shared file. Every service in your app will need exactly this logic.

Slide 22: Run Multiple Requests in Parallel — forkJoin
forkJoin lets you fire multiple HTTP requests simultaneously and wait for all of them to complete before doing anything with the results. Think of loading a dashboard that needs both users and posts — you don't want to wait for users to finish before starting posts. Fire both, wait for both, render once.
But look at the code carefully. Each inner Observable has its own catchError. This is not optional if you care about resilience. Here's why: if you don't have catchError on each one and either request fails, forkJoin errors immediately and you get nothing — not even the data from the request that succeeded. With catchError on each inner Observable, they fail independently. A posts failure gives you an empty posts array but your users still load. That's a much better user experience.

Slide 23: forkJoin Is Promise.all for Observables
If you've used Promise.all, you already understand forkJoin. The mental model is identical. Fire everything in parallel, wait for everything to complete, get all results at once.
The important distinction at the bottom: forkJoin only works correctly with Observables that complete. HTTP calls complete — they emit one value and finish. That makes them a perfect fit for forkJoin.
combineLatest is different — it emits every time any source emits, and it works with Observables that keep going indefinitely, like a BehaviorSubject. You're not using combineLatest today, but I want you to know why you'd reach for it vs. forkJoin when you encounter it in the wild.

Slide 24: Track Loading State with a Signal
Blank screens feel broken. Even if your API responds in 200 milliseconds, there's a flash of empty content. Show a spinner. It's not just polish — it's a signal to users that something is happening and they should wait.
The pattern is straightforward. Three signals: isLoading, users, and error. Before the request fires, set isLoading to true and clear any previous error. In the next callback, set the users. In the error callback, set the error message. In the complete callback, set isLoading to false.
But there's a problem with this approach. See that last comment? complete only runs on success. If the request errors, complete is skipped. That means if your request fails, isLoading stays true forever and your spinner never disappears. That's what the next slide fixes.

Slide 25: finalize() Runs No Matter What
finalize() is the finally block of Observables. You know how in a try/catch/finally, the finally block runs whether the try succeeded or the catch fired? Same idea. finalize() runs whether the Observable completes successfully or errors out.
Put finalize() at the end of your pipe() chain after catchError. That way, no matter what happens, isLoading gets set to false and the spinner disappears.
Now look at the template. This is the complete picture of all three states in one template. The @if / @else if / @else chain covers every case. If we're loading, show the spinner. If there's an error, show the message and the retry button. Otherwise, show the data. Only one of these renders at a time. This is the pattern you'll use in virtually every component that loads data from an API.

Slide 26: What an Interceptor Does
Let's talk about interceptors conceptually before we look at code. An interceptor is middleware. It sits between your component and the server and gets to inspect and modify every request going out and every response coming in.
Look at the diagram. Your component calls http.get(). That request passes through interceptor 1, then interceptor 2, then actually hits the server. The response comes back through interceptor 2, then interceptor 1, then your subscribe callback fires. Each interceptor can do something on the way out, on the way back, or both.
Common real-world uses: attaching an Authorization header to every request so you don't have to do it per-call; logging every request and response for debugging; globally handling 401 Unauthorized responses by redirecting to a login page; adding a correlation ID to every request so you can trace it through server logs.
The key thing: interceptors run for every request automatically. You register them once.

Slide 27: HttpInterceptorFn — A Plain Function
Here's the modern interceptor. It's a function. That's it. HttpInterceptorFn is just the TypeScript type for that function signature. Two parameters: req is the outgoing request, next is the handler that passes it forward.
Two things I want to emphasize with the warning comments in this code.
First: req is immutable. You cannot modify it directly. If you want to add a header, you call req.clone() with the modifications and that gives you a new request object. Never try to mutate req directly.
Second: you must return next(authReq). I've seen people forget this. If you don't return next(), the request just stops. It never goes to the server. Every HTTP call in your app silently does nothing. Angular gives you no error. It just doesn't work. Always return next.

Slide 28: Register Interceptors in provideHttpClient
Once you've written your interceptors, you register them in app.config.ts by passing withInterceptors() as an argument to provideHttpClient().
Look at the array. Auth interceptor is first, logging interceptor is second. That order matters. The auth interceptor runs first and attaches the token. Then the logging interceptor runs and logs the request — at which point the Authorization header is already on the request, so the log captures the full picture.
If you reverse the order, the log runs before the token is attached. The order you list them is the order they execute.

Slide 29: Wire HTTP to a Signal with toSignal()
You used toSignal() in Part A this morning to connect a BehaviorSubject to a template. Same function here, just connecting an HTTP Observable instead. The concept is identical.
What I need you to pay attention to is the comment about where you call it. toSignal() must be called at the class field level — during class initialization. Not inside ngOnInit. Not inside a method. Right here, as a class property declaration.
Why? Because toSignal() needs Angular's injection context to manage its subscription. That context is only active during class construction. The moment you're inside a method, that context is gone, and Angular throws: "toSignal() can only be used within an injection context."
You will hit this error at some point. When you do, the fix is to move the toSignal() call up to the class field level.

Slide 30: toSignal() initialValue Matters
Without initialValue, the signal starts as undefined. Before the HTTP request completes, users() is undefined. If your template tries to iterate over undefined with @for, you get a runtime error.
Two options. One: provide initialValue: [] — the signal starts as an empty array and the template safely renders nothing while waiting. Two: leave out initialValue and guard every usage with @if (users()). Option one is almost always cleaner.
The as User[] type assertion on the empty array is just to satisfy TypeScript. An empty array literal [] is typed as never[] by default, which doesn't match User[]. The assertion tells TypeScript "trust me, this is a User array."

Slide 31: ⚠️ Generate Environment Files First
This is a practical warning that will save you from a confusing error. In Angular 17 and later, environment files are not created automatically when you generate a new project. You have to add them yourself with one command.
bashng generate environments
Run that once per project. It creates environment.ts and environment.development.ts in a new src/environments/ folder. If you skip this step and try to import from the environments path, Angular throws a module-not-found error that has nothing to do with your actual code and can be hard to diagnose if you don't know to look for it.
Do this before you write any service that uses environment variables.

Slide 32: Environment Files for API URLs
Here's what those two files look like once you generate them. They export the same object shape with different values. In development, apiUrl points to your local backend. In production, it points to the real server.
You never manually switch between these files. Angular handles that at build time — ng serve uses the development file, ng build --configuration production uses the production file. Your code always imports from the same place and gets the right value automatically.
You can put anything environment-specific in here — API keys, feature flags, logging levels. The rule is: if the value is different between development and production, it belongs in the environment file, not hard-coded in a service.

Slide 33: Use the Environment in a Service
The import path is always environments/environment — no development, no production suffix. Just environment. Angular resolves that to the right file based on the current build configuration.
Look at the service. One import, one template literal. In development you get http://localhost:3000/users. In production you get https://api.myapp.com/users. Same code, different runtime value.
The comment about the trailing slash is a real gotcha. If apiUrl already ends with a slash and you write ${environment.apiUrl}/users, you get a double slash. Pick one convention — either always include a slash at the end of apiUrl and omit it from paths, or omit it from apiUrl and always include it in paths. Be consistent across the whole app.

Slide 34: How ng build Swaps Environments
The mechanism behind the swap is in angular.json under fileReplacements. When you run a production build, Angular replaces environment.development.ts with environment.ts before compiling. The import path stays the same in your code — Angular just switches which file that path resolves to.
This means in a CI/CD pipeline you always run ng build --configuration production and the correct URLs are built in automatically. No environment variables to manage at runtime, no config files to ship separately. The values are baked into the compiled output.

Slide 35: Coming Up — Modern vs. Classic Angular
Alright, you've learned the modern way. Before we close out, we're going to look at how this same stuff worked before Angular 17.
I want to be direct about why this matters. Modern Angular is what you should write. But your first job — and probably your second and third — will have codebases that predate Angular 17. You will see HttpClientModule. You will see HTTP_INTERCEPTORS. You will be asked to debug and extend code written the classic way. Knowing what you're looking at is a real job skill.
We'll go through each piece — modern first to reinforce what you just learned, then the legacy equivalent and what pain it caused.

Slide 36: HTTP Setup — Legacy
You set up HTTP on Slide 3 with one line in app.config.ts. Here's what the same setup looked like in the NgModule world.
You had to import HttpClientModule — a full Angular module — into the imports array of AppModule. That sounds minor but it caused real problems. Forget it and you get a NullInjectorError at runtime with a message like "No provider for HttpClient" — confusing if you don't immediately know to look in the module imports. And if you were building a feature library that internally needed HttpClient, you'd have to import HttpClientModule in that library's module too. The dependency propagated everywhere.
The modern approach doesn't have this problem. provideHttpClient() in app.config.ts, once, and it's available everywhere.

Slide 37: Interceptors — Modern
Here's the modern interceptor again for reference before we look at the legacy version. A plain function. Import one type. Write the logic. Export it. Done. Easy to test in isolation, easy to add to any project, no ceremony.

Slide 38: Interceptors — Legacy
Now look at the legacy version. Four imports. A class. The @Injectable() decorator. implements HttpInterceptor. A method signature with four type annotations. And next.handle() instead of next().
That last one — next.handle() vs next() — is subtle and catches people switching between modern and legacy. They're not interchangeable. In modern interceptors you call next(req). In legacy interceptors you call next.handle(req). If you call the wrong one, you get a runtime error that doesn't immediately tell you what you did wrong.
The modern version eliminates all of this. Same behavior, a fraction of the boilerplate.

Slide 39: Interceptor Registration — Modern
Modern registration is one line inside provideHttpClient(). The array order is the execution order. Easy to read, easy to change.

Slide 40: Interceptor Registration — Legacy
Legacy registration is one of the most legitimately confusing things in classic Angular. Look at this. You need HTTP_INTERCEPTORS — an injection token, not a class. You use provide: and useClass: and multi: true. And you repeat this entire block for every single interceptor.
The multi: true flag is the trap. It tells Angular "there are multiple providers for this token — collect them all into an array." Without it, each registration overwrites the previous one and only your last interceptor runs. No error is thrown. Your other interceptors just silently stop working.
If you're debugging a legacy app and your interceptors seem to do nothing, check whether multi: true is on every single registration.

Slide 41: Response Typing & Environment Config — Same in Both
Good news to end the legacy section on. Two things didn't change at all between modern and legacy Angular.
http.get<MyType>(url) — identical. The generic syntax for typing HTTP calls is the same in both. If you learned it from a 2019 tutorial, that knowledge is still correct. The only difference is how you inject HttpClient — inject() in modern code, constructor injection in legacy code. The HTTP call itself looks the same.
Environment files — same mechanism. environment.ts file swapping at build time predates standalone components by years. If you read old documentation about environment files, it's still accurate.

Slide 42: Key Takeaways
Let's land the plane. Four things to walk away with.
One: provideHttpClient() once in app.config.ts and you're done for setup. Always type your responses with an interface. And don't forget ng generate environments before you write anything that needs an API URL.
Two: the operator pipeline is your control panel. switchMap for cancelling stale requests. catchError to keep the stream alive on failure. finalize for cleanup that always runs. forkJoin for parallel requests — and put catchError on each inner Observable or one failure kills the whole thing.
Three: interceptors are just functions. Write them, register them once with withInterceptors, always clone() before modifying the request, and always return next().
Four: toSignal() is the bridge, but it has rules. Call it at the class field level, not inside methods. Always provide an initialValue for lists so your template has something to iterate before the request completes.
Good work today. Tomorrow we're building on all of this with routing and forms — the two things that make an app feel like a real product.
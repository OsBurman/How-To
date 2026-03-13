Slide 1 — Title Slide
Good morning everyone. Today is Day 4 Part A, and we're tackling one of the most satisfying topics in the entire course — the Angular Router.
Up until now, everything you've built has been a single-page experience. You might have multiple components on the screen, but there's only one URL. Today that changes. By the end of this session you're going to have a real multi-view application with actual URLs, a working back button, protected routes, and lazy loading. This is the stuff that makes an app feel like a product.
Let's get into it.

Slide 2 — What You'll Be Able to Do
Here's what you're walking away with today.
You'll be able to set up routing from scratch using provideRouter(). You'll navigate between views both in templates with routerLink and from TypeScript with Router.navigate(). You'll read route parameters and query parameters — and more importantly, you'll use withComponentInputBinding() to skip most of that manual wiring entirely.
You'll lazy-load components so your initial page load stays fast. And you'll protect routes with functional guards — both canActivate to block entry and canDeactivate to warn users before they accidentally lose unsaved work.
A lot of ground today, but it all connects. Each piece builds on the last.

Slide 3 — Why Routing Matters
Before we write any code, let's talk about why routing exists.
Imagine you build an app — a recipe browser, say — and when a user clicks on a recipe, the detail view slides in. That looks great. But here's the problem: the URL never changes. It's the same URL the whole time. So if the user tries to bookmark that recipe, or share it with someone, or just hit the back button — none of it works the way they expect. The app feels broken, even if the UI looks fine.
Routing fixes all of that. Each view gets its own URL. The browser history works. Users can deep-link directly to /recipes/42 and land exactly where they should. You can split your code so users only download what they actually navigate to. The app stops feeling like a widget embedded in a webpage and starts feeling like a real application.
One thing worth understanding upfront: Angular routing is entirely client-side. Your server always serves the same index.html file regardless of the URL. Angular intercepts the URL in the browser and decides which component to show. The server doesn't know about your routes — Angular does. That's important to understand when you eventually deploy, which we'll touch on briefly.

Slide 4 — Enable Routing with provideRouter()
Routing in Angular is opt-in. You have to explicitly turn it on, and you do that in app.config.ts.
Look at this code. You import provideRouter from @angular/router, and you pass it your routes array. That's it. One function call in your providers array.
Now, provideRouter replaces something called RouterModule.forRoot() — that's the old way, and we'll see it in the legacy slides later. The modern approach is much simpler. There's no module, no class, no boilerplate. Just a function that takes your routes.
You'll also notice we're importing routes from a separate file called app.routes.ts. That's the Angular convention — keep your route config in its own file, keep app.config.ts clean. We'll look at that routes file on the next slide.
If you need extra features — lazy loading, input binding, hash-based URLs — you add them as additional arguments to provideRouter(). We'll see exactly how that works as we go through today.

Slide 5 — The Route Configuration Array
Here's what app.routes.ts looks like. It's just an array of objects. Each object maps a URL path to a component. That's the core idea.
A few things to notice here.
First, order matters. Angular reads this array top-to-bottom and stops at the first match. This is critical. If you put your wildcard ** route at the top, it would match every URL and your app would show the 404 page for everything. Always put your most specific routes first, and ** last.
Second, look at that first entry — redirectTo. This is how you handle the root URL, the empty path. When a user lands on /, we redirect them to /recipes. The pathMatch: 'full' option is required on empty path routes — it tells Angular to only match when the entire URL is empty, not just when the URL starts with an empty string. Without it, this redirect would fire on every single URL and nothing would work.
Third, see :id in the third route? That colon prefix means that segment is a named parameter. When a user visits /recipes/42, Angular extracts 42 and makes it available to your component as id. We'll dig into that shortly.

Slide 6 — router-outlet
Okay, you have routes configured. But where does Angular actually put the matched component? That's what router-outlet does.
Think of <router-outlet /> as a placeholder in your template. When the URL changes, Angular looks up the matching route and swaps in the corresponding component right where the outlet is.
In your AppComponent, you import RouterOutlet from @angular/router and add it to your imports array. Then in the template you place <router-outlet /> wherever you want routed content to appear.
One quick note: both <router-outlet /> and <router-outlet></router-outlet> are identical. You'll see both in codebases. Neither is more correct than the other.
Your navigation links go above it, your footer below it, and the routed content renders in the middle. Standard shell layout.

Slide 7 — ⚠️ WARNING: Routing Directives Not in Imports
Before we go further — I want to flag the single most common mistake students make on Day 4, and I want you to hear it now so you don't lose 30 minutes debugging it later.
In standalone Angular, if you use something in a template, it must be in your imports array. This applies to routing too. RouterOutlet, RouterLink, and RouterLinkActive are all separate directives and each one has to be explicitly imported.
Here's the painful part: Angular does not throw an error when one of these is missing. It just silently ignores the tag or attribute. So your outlet renders nothing, your links do nothing, and you're staring at a blank page wondering what happened.
The fix is always the same — open your component, find the imports array, and add what's missing.
This trips up experienced developers too. The moment something isn't rendering or a link isn't working, the very first thing you check is the imports array.

Slide 8 — routerLink
Now let's talk about navigating. In templates, you use routerLink instead of href. Why? Because href triggers a full browser navigation — it reloads the entire page, throws away all your app state, re-downloads everything. That defeats the entire purpose of a single-page application.
routerLink tells the Angular router to handle the navigation internally. The URL changes, the component swaps, but the page never reloads. Fast, seamless, correct.
You can use routerLink as a plain string attribute for static links — no brackets, just the path. Or you can use bracket syntax for dynamic links, passing an array of segments that Angular joins together. So [routerLink]="['/recipes', recipe.id]" becomes /recipes/42 at runtime.
For query params, use [queryParams] as a separate binding — pass an object and Angular appends it as a query string.
And as we just covered — remember to add RouterLink to your component's imports array.

Slide 9 — routerLinkActive
routerLinkActive is a directive that adds a CSS class to a link when its route is active — meaning the current URL matches that link's target.
This is how you make navigation highlights work. The active page's link gets a class, you style that class in CSS, done.
Two things to watch out for. First — RouterLink and RouterLinkActive are separate directives. You need to import both. Second — notice the [routerLinkActiveOptions]="{ exact: true }" on the About link. Without that, /about/team would also activate the /about link, because the URL contains /about. With exact: true, Angular only adds the class when the URL is exactly /about. Use exact matching on links that might have children.

Slide 10 — Router.navigate()
routerLink is for templates. When you need to navigate from TypeScript — after a form submission, after an API call completes, after a user clicks a button — you use Router.navigate().
You inject Router using inject(Router) — same pattern you've been using for services since Day 3. Notice it's assigned to a private readonly property. That's intentional — you're not going to replace the router, and nothing outside the class needs access to it.
navigate() takes an array of route segments, just like [routerLink] in templates. The array gets joined into a URL. You can also pass options as a second argument — query params, relative navigation, whether to preserve the current params.
This is the method you'll use constantly. Log in, navigate to the dashboard. Save a form, navigate to the detail page. Delete a record, navigate back to the list.

Slide 11 — navigate() vs navigateByUrl()
There are two navigation methods and they're easy to conflate, so let's be clear about when to use each.
navigate() takes an array of segments and an options object. It's flexible — you can add query params, navigate relative to the current route, and compose the URL from parts you have at runtime.
navigateByUrl() takes a complete URL string. Use it when you already have the full URL and don't need to compose it. It's always absolute — there's no relative navigation option.
Look at the table. For most situations, navigate() is what you want. The one case where navigateByUrl() shines is when you've already got a full URL string and you just want to go there directly.

Slide 12 — Example: Navigate After Row Click
Here's the pattern in practice. A recipe list where clicking a row navigates to the detail page.
The template uses @for to render rows and binds (click) to a handler. The handler calls this.router.navigate() with the recipe's id. That's it.
This is representative of what you'll actually write. A user action triggers a method, the method does some work — maybe calls a service, maybe validates something — and then navigates programmatically. Keep this pattern in mind because you'll use it constantly.

Slide 13 — What Route Parameters Are
Let's talk about route parameters properly before we get to reading them.
A route parameter is a named placeholder in your route path. You define it with a colon prefix — path: 'recipes/:id'. When a URL matches that route, Angular extracts whatever value is in that position and makes it available under the name you gave it.
So /recipes/42 gives you id = '42'. /recipes/chicken-tikka gives you id = 'chicken-tikka'. The value is always a string — even if it looks like a number. If you need a number, parse it explicitly with Number() or parseInt().
You can have multiple parameters in one path. users/:userId/posts/:postId extracts both userId and postId independently.
The important thing to internalize right now: the name after the colon in your route config is the key you use to retrieve the value. That pairing is what makes the system work.

Slide 14 — What Query Parameters Are
Query parameters are different. They're the ?key=value pairs that appear after the main path.
/recipes?category=italian&sort=rating — that URL still matches the path: 'recipes' route. The query string doesn't affect route matching at all. Angular just makes those values available to the component if it wants them.
Use query params for things that modify the view without changing which resource you're looking at: filters, sort order, pagination, search terms. They're optional — the route works fine with or without them.

Slide 15 — Route Params vs Query Params
This is a design decision you'll make on every feature you build, so it's worth having a clear rule in your head.
Route params are for identity — they answer the question "which thing are we looking at?" /recipes/42 — we're looking at recipe 42. That id is required. The URL doesn't make sense without it.
Query params are for modifiers — they answer "how should we display it?" /recipes?sort=rating&page=2 — we're on the recipe list, sorted by rating, on page 2. Those values are optional. The page works without them, just with defaults.
If removing the value would make the URL meaningless, it's a route param. If removing it just changes the view slightly, it's a query param. Keep that distinction in mind and your URL design will be consistent.

Slide 16 — Reading Query Params
When you need to read query params the traditional way — before we get to the slicker approach — you inject ActivatedRoute and read from queryParamMap.
Now, here's something important to understand: queryParamMap is an Observable, not a one-time value. Why? Because Angular can keep the same component alive when only the query string changes. Think about a filter on the recipe list — the user changes the category filter, the URL updates to ?category=desserts, but Angular doesn't destroy and recreate the list component. It stays alive, and queryParamMap emits a new value. That's why it has to be reactive — a one-time read would miss those updates.
We use toSignal() to convert that Observable into a signal — same bridge you learned on Day 3.
One footnote: if you only need a one-time read and you know the component will be freshly created each time, inject(ActivatedRoute).snapshot.queryParamMap.get('category') works fine and is simpler. But for anything that might update in place, use the Observable approach.

Slide 17 — withComponentInputBinding() — What It Does
Now here's the part that eliminates most of that manual work.
withComponentInputBinding() is a feature you enable once, and after that, Angular automatically passes both route parameters and query parameters directly into your component's input() signals.
Think about what that means. Instead of injecting ActivatedRoute, subscribing to an Observable, managing cleanup — you just declare an input with the right name and Angular populates it. The URL is essentially passing data into your component the same way a parent component would.
And it handles both kinds of params. The URL /recipes/42?category=italian — Angular sees the :id route param and the category query param, and if your component has input() signals named id and category, they both get their values automatically.
This is one of those features that seems almost too good to be true when you first see it. Let's look at how to set it up.

Slide 18 — Enable withComponentInputBinding()
Setup is a single line in app.config.ts. You add withComponentInputBinding() as a second argument to provideRouter().
That's the entire configuration. You do this once for your whole app and it activates for every route automatically. There's nothing to add to individual components — just declare the right inputs and Angular does the rest.

Slide 19 — Route Params as Signal Inputs
Here's what the component looks like with this feature enabled.
readonly id = input<string>() — that's it. Angular sees that the component is rendered by the recipes/:id route and that the component has an input() named id. It makes the connection automatically.
Notice the readonly keyword. This is required — and it matters. Signal inputs are owned by Angular and the parent. Your component is a consumer. You read the value by calling id(), but you never call .set() on it. That would make no sense — you don't own the URL. readonly enforces that boundary.
The computed() below is the natural next step — whenever id() changes, the recipe lookup runs again. This is the signal reactivity you learned on Day 2 working exactly as intended.

Slide 20 — Query Params as Signal Inputs
Same idea, applied to query params. Declare an input() whose name matches the query parameter key, and Angular populates it from the URL.
Here, category = input<string>() receives the value from ?category=italian. The computed() derives the filtered list from that value. When the URL changes to ?category=desserts, category() updates, the computed re-runs, the list re-filters. No manual subscription anywhere.
One thing to note: when the query param isn't in the URL at all, the input returns undefined. So if your service or computed needs a default, handle that in the computed logic — this.category() ?? 'all' or similar.

Slide 21 — ⚠️ WARNING: Input Name Must Match Param Name
This is the specific mistake that makes withComponentInputBinding() seem broken when it's actually fine.
The input name must be an exact match for the parameter name. Character for character. If your route has :id, your input must be named id. Not recipeId, not itemId — id.
And withComponentInputBinding() must actually be enabled in app.config.ts. If you forget to add it, inputs will always be undefined and there's no error telling you why.
Both conditions must be true simultaneously. If your inputs are staying undefined, check these two things first.

Slide 22 — Why withComponentInputBinding() Wins
I want to put the two approaches side by side so the difference really lands.
On the left — the legacy approach. You declare a signal to hold the id. You inject ActivatedRoute. You subscribe to paramMap. You use takeUntilDestroyed() for cleanup. You extract the param. That's five moving parts to answer the question "what's the id in the URL?"
On the right — readonly id = input<string>(). One line.
Same result. No subscription, no cleanup, no ActivatedRoute. This isn't just less code — it's less cognitive load. Every piece you remove is one fewer thing to get wrong. This is exactly the kind of improvement withComponentInputBinding() was designed to deliver.

Slide 23 — What Child Routes Are
So far, every route we've seen replaces the entire view when you navigate. But sometimes you want a parent to stay visible while a sub-view changes inside it. That's child routes.
Classic example: you're on a recipe detail page. The recipe header and image are always visible. But at the bottom, you have tabs — Summary, Reviews, Nutrition. Each tab is a different URL and a different component, but the recipe header doesn't disappear when you switch tabs. The header is the parent, the tabs are the children.
Child routes are also what you use for dashboards with sidebars, admin panels with section navigation, or any layout where one persistent frame contains multiple interchangeable content areas.

Slide 24 — Child Routes in app.routes.ts
Here's how child routes look in your config. You add a children array inside a route object. The structure is identical to top-level routes — the same path/component pairs.
The parent component renders whenever any child route matches. The empty path '' renders the default child when no sub-path is given — so /recipes/42 shows the summary, /recipes/42/reviews shows reviews, and so on.
Critical thing to understand: each child component renders into the parent's <router-outlet> — not the top-level one in AppComponent. The app-level outlet handled getting to RecipeDetailComponent. Now there needs to be a second outlet inside RecipeDetailComponent for the children. Let's look at that.

Slide 25 — Nested router-outlet
This is the parent component with child routes wired up. Two things to notice.
First — RouterOutlet is in the imports array. That's the outlet for the children. Second — the template has its own <router-outlet /> where the child components will appear.
The links use relative paths — ['reviews'] without a leading slash. That's intentional. Relative links work from the current route, so ['reviews'] from /recipes/42 becomes /recipes/42/reviews. This is usually what you want for child navigation.

Slide 26 — ⚠️ WARNING: Missing Nested router-outlet
Two separate ways to get the same frustrating result — child routes that silently render nothing.
The first is the obvious one: you set up child routes but forget to put <router-outlet /> in the parent template. The routes are configured, the navigation happens, but there's nowhere to render the child component.
The second is trickier: the <router-outlet /> tag is in the template, but RouterOutlet isn't in the component's imports array. Angular silently ignores the tag — same behavior we saw in the earlier warning slide.
When child routes aren't working, check both. Is the outlet tag in the template? Is RouterOutlet in the imports array? Both have to be true.

Slide 27 — What Lazy Loading Is
Let me explain the problem first. When Angular builds your app for production, by default it puts everything into one JavaScript file. Every component, every service, every pipe — one big bundle. Your user downloads all of it on that first page load, including the admin panel they'll never visit and the settings page they'll open once a year.
Lazy loading changes that. Instead of bundling everything together, Angular splits your app into separate chunks. Each chunk is a piece of your app. The user downloads the initial chunk on first load — just what's needed to render the first view — and then additional chunks are downloaded on demand, only when the user navigates to those routes.
The result is a dramatically faster initial load. On mobile, on slow connections, this difference is the gap between a user who stays and a user who bounces. And the code change to make this happen is genuinely minimal — you'll see it on the next slide.

Slide 28 — loadComponent() — Modern Lazy Loading
Here's all you have to do. Replace component: with loadComponent: and provide an arrow function that dynamically imports the component file.
The RecipeListComponent in the first route is eagerly loaded — it's part of the main bundle. The admin route uses loadComponent — Angular will split that into a separate JavaScript file and only fetch it when a user navigates to /admin.
import() is standard JavaScript syntax — nothing Angular-specific about it. It returns a Promise that resolves to the module. .then(m => m.AdminComponent) extracts the specific exported class from that module.
Everything else about the route — guards, params, child routes — works exactly the same on lazy routes. The only change is how the component is loaded.

Slide 29 — loadComponent() Syntax in Detail
The pattern is always three parts and they always look the same. Arrow function, dynamic import, .then() to extract the class. Get comfortable with that shape — you'll type it a lot.
The child route example shows that lazy loading isn't just for top-level routes. Individual child routes can be lazy-loaded independently. Each loadComponent you add creates another separate chunk in your production build.
Here's how to verify it's working: open your browser's Network tab, navigate to a lazy route for the first time, and watch for a new .js file to appear. That file is your lazy chunk downloading on demand. After the first visit it's cached, so subsequent navigations are instant. The Network tab is your best friend for understanding what's actually happening with lazy loading.

Slide 30 — Why Lazy Loading Matters in Practice
These numbers are illustrative but directionally accurate for a medium-sized Angular app. Cutting the initial bundle from 800KB to 120KB is the difference between a 4-second load and a 1-second load on a mobile connection.
The code change is trivial — one word, component: becomes loadComponent:, plus the import syntax. The payoff in user experience can be enormous.
Rule of thumb: anything that isn't your landing page or app shell should probably be lazy-loaded. Login page, admin section, settings, reports — all good candidates. The cost of setting it up is almost nothing.

Slide 31 — withHashLocation()
This is a brief one you need to know about for when you encounter it in existing projects.
By default, Angular uses clean URLs like /recipes/42. withHashLocation() switches to hash-based URLs like /#/recipes/42.
Why would anyone want that? It solves a server configuration problem. With clean URLs, if a user directly types myapp.com/recipes/42 into their browser, the server receives a request for /recipes/42 and needs to return index.html. That requires server configuration. On platforms like GitHub Pages that don't support that kind of configuration, you'd get a 404.
Hash-based URLs work around this because the browser never sends the hash portion to the server. The server only ever sees myapp.com/ and returns index.html. Angular then reads the hash and handles the routing.
For modern hosting platforms — Netlify, Vercel, Firebase — you configure the server properly and use clean URLs. But if you inherit a project using hash routing, now you know what it is and why it exists.

Slide 32 — withPreloading()
withPreloading() is a nice middle ground between eager loading and lazy loading.
Here's the idea: your app loads fast because the initial bundle is small — lazy routes aren't included. But in the background, after that initial load completes, Angular quietly starts downloading those lazy chunks. By the time the user clicks on a lazy route, the code is probably already there.
PreloadAllModules is the strategy that says "preload everything." You add it as a second option to provideRouter(), right alongside withComponentInputBinding() if you're using both.
For most production apps, this is a sensible default. You get the fast initial load of lazy loading, and the snappy navigation feel of eager loading.

Slide 33 — canActivate — Protecting Routes
Guards are functions that run before Angular renders a route. canActivate is the one you'll use most — it controls whether a user is allowed to enter a route at all.
The function returns one of three things:

true — allow the navigation
false — block it, stay where you are
A UrlTree — redirect the user somewhere else

Notice the two parameters. route gives you the matched route snapshot — the params, the component being activated, any static data you've attached to the route. state gives you the full URL being navigated to. That state.url is useful when you want to redirect to login and then come back — you can pass the original URL as a query param so you can redirect back after login.
inject() works inside guards — you have full access to your services. Inject AuthService to check the login state, inject Router to create the redirect tree.

Slide 34 — Wiring canActivate to a Route
Attaching a guard is just adding a canActivate array to the route object.
Notice the admin route example. It has canActivate on the parent route, and two child routes. You do not need to add canActivate to each child route individually. If the guard blocks access to the parent, Angular never even looks at the children. One guard on the parent protects the entire sub-tree.
canActivate is an array, so you can stack multiple guards. They run in order, and the first one that returns false or a UrlTree stops the chain. You might have authGuard and roleGuard both on the same route — auth first, then role check.

Slide 35 — ⚠️ WARNING: Don't Call navigate() Inside a Guard
This is a mistake almost everyone makes at least once.
When you want to redirect from a guard, the instinct is to call router.navigate() and return false. That feels logical — navigate away, then block the original nav. But what actually happens is you fire a second navigation while the first one is still in progress. Two navigations running concurrently causes a race condition, and depending on the Angular version and what else is happening, you get unpredictable behavior.
The correct pattern is to return a UrlTree created by router.createUrlTree(). This is a declarative instruction to the router: "I want to go here instead." The router handles it cleanly as a single navigation.
Same destination, completely different internal behavior. Always return a UrlTree from guards. Never call navigate() as a side effect.

Slide 36 — canDeactivate — Leaving a Route
canDeactivate runs when the user tries to leave a route. Its purpose is to give you a chance to ask "are you sure?" before Angular navigates away.
The most common use case is unsaved form data. User fills out a long form, accidentally clicks a nav link — canDeactivate catches that and gives them a chance to save or confirm they want to leave.
The guard receives the component instance as its first argument. That's how it knows whether there's unsaved work — it reads a property directly off the component. So the component needs to expose that information. Here, hasUnsavedChanges is a simple boolean on EditRecipeComponent. The guard checks it. True? Ask the user. False? Let them leave.
The CanDeactivateFn<EditRecipeComponent> type annotation is important — that generic type tells TypeScript what shape the component will have, so component.hasUnsavedChanges is type-safe.
For now we're using the browser's built-in confirm() dialog. In a real app you'd replace that with a proper modal, but the guard logic is identical.

Slide 37 — Wiring canDeactivate to a Route
Same pattern as canActivate — add a canDeactivate array to the route object.
canDeactivate fires on any navigation away from the route. Clicking a routerLink, calling router.navigate(), hitting the browser back button — all of them trigger the guard. The user cannot sneak past it.
Quick Day 4B preview before we move on: this afternoon we're doing forms, and you'll build a reactive form with a .dirty property. A form is dirty when it's been modified but not saved. You'll wire hasUnsavedChanges directly to form.dirty. One line. The guard you just wrote will work automatically with the form you build this afternoon.

Slide 38 — AppRoutingModule: Legacy Pattern
Alright, this is the last modern-code slide before we do legacy comparisons. This one is a recognition slide — you're not going to write this, but you absolutely need to be able to read it.
On the job, the majority of Angular projects you'll encounter still use the legacy routing module pattern. It's called AppRoutingModule. It's a class decorated with @NgModule. It imports RouterModule.forRoot(routes) and exports RouterModule so the directives are available throughout the app.
When you see this in a codebase, you'll know what it does. It's the equivalent of provideRouter(routes) — same outcome, more scaffolding. Don't be thrown off by it. The routes array inside is structured identically to what you've been writing today.

Slide 39 — Coming Up: Modern vs Classic Angular
Before we wrap up, we're going to do something we've done at the end of every session — compare what you just learned against the classic Angular patterns you'll encounter in existing codebases.
Every concept you learned today has a legacy equivalent. In most cases, the logic is identical — the difference is boilerplate. Modern Angular removes the ceremony and leaves the substance.
You write modern for everything new. You need to recognize classic for everything you inherit. That's the goal of the next seven slides.

Slide 40 — Legacy: Router Setup
The modern setup is a plain object in app.config.ts. One function. Done.
The classic setup requires two separate files and two separate classes. AppRoutingModule contains the router configuration and exports RouterModule so the directives are available. AppModule imports both BrowserModule and AppRoutingModule — and the order matters. Put them in the wrong order and things break.
When you see RouterModule.forRoot() in a codebase, that's the router setup. When you see RouterModule.forChild() — which we'll see on the next slide — that's the same idea applied to a feature area. These are direct equivalents of provideRouter().

Slide 41 — Legacy: Feature Routes
Modern Angular routes are just data — arrays you import and combine.
In classic Angular, every feature area needed its own routing module. If you had a recipes feature, you had RecipesRoutingModule which called RouterModule.forChild(routes). And you had a RecipesModule that declared all the components and imported the routing module.
forChild() existed because modules couldn't share a single router config. The router needed to know which routes came from the root and which came from feature areas. Modern Angular doesn't have this problem because there are no modules — routes are just arrays you import wherever you need them.
When you see forChild() in a codebase, you're looking at feature module routing. Now you know what it is.

Slide 42 — Legacy: Lazy Loading
This one shows you just how much loadComponent() eliminated.
Classic lazy loading loaded an NgModule, not a component directly. So for every lazy route, you needed a dedicated module file — AdminModule — that declared the components and imported the routing module for that area. Then the lazy route used loadChildren to point to that module.
loadComponent() cuts straight to the component. No module, no declarations, no loadChildren. The same lazy splitting behavior, one line of code.
When you see loadChildren in an existing codebase, you now know what it does. It's loading a feature module lazily. The mechanics are the same as loadComponent — dynamic import, separate chunk — just with more scaffolding in between.

Slide 43 — Legacy: Route Params as Inputs
We already saw the modern version. One line.
The classic approach required four things working together: constructor injection of ActivatedRoute, ngOnInit to subscribe when the component starts, manual extraction of the param value, and ngOnDestroy to clean up the subscription. Forget ngOnDestroy and you have a memory leak.
All of that infrastructure just to answer "what's the id in the URL?" This is a great example of why withComponentInputBinding() was added. The problem wasn't that the old approach was wrong — it worked fine. The problem was that it required too much scaffolding for something so common.

Slide 44 — Legacy: Programmatic Nav & canActivate
We're combining two topics here because they're both about the same underlying shift — inject() vs. constructor injection.
For programmatic navigation, both modern and classic call this.router.navigate(). The only difference is how you get the Router instance. Modern: inject(Router) in the class body. Classic: declare it as a constructor parameter. Functionally identical. inject() is more flexible because it also works in functions that aren't classes — guards, interceptors, factory functions.
For canActivate, the logic is also identical — check the login state, return true or redirect. The modern version is a plain function. The classic version is a class with @Injectable, implements CanActivate, and a constructor. Same outcome, the classic version just has significantly more ceremony around it.

Slide 45 — Legacy: canDeactivate
Last legacy slide.
Again, the guard logic is identical — check hasUnsavedChanges, either confirm or allow. The modern version is a typed function. The classic version is a class implementing CanDeactivate<T>.
CanDeactivate<T> is a typed interface — the generic type T is the component being guarded, same as in the modern CanDeactivateFn<T>. TypeScript ensures type safety in both cases. The only difference is whether that typing lives on a class or on a function.
When you encounter class-based guards in existing codebases, you'll recognize them immediately now. The logic inside is the same logic you just learned to write as a function.

Slide 46 — Key Takeaways
Let's wrap up.
First: provideRouter(routes) in app.config.ts is your entire router setup. Remember that Angular matches routes top-to-bottom — order matters, specific before general, wildcard last.
Second: withComponentInputBinding() is the feature you want to enable on every new project. Both route params and query params bind directly to input() signals. The only rule is the input name must match the param key exactly.
Third: lazy loading with loadComponent() is a one-word change with potentially massive impact on your initial load time. You can verify it's working in the browser's Network tab — look for new .js files downloading when you navigate to lazy routes.
Fourth: guards are plain functions. Return true, false, or a UrlTree — never call navigate() inside a guard. Placing a guard on a parent route protects all its children automatically.
This afternoon we're building on all of this — you'll create a form and wire the canDeactivate guard you learned today to the form's dirty state. See you after lunch.
## Slide 1: Day 4A — Angular Router

**Day 4 · Part A**

### Angular Router

By the end of this session, you'll turn your Angular app into a multi-view experience with real URLs, route parameters, lazy loading, and navigation guards — all wired up the modern Angular way.

---

## Slide 2: What You'll Be Able to Do

- Configure routes and enable routing with `provideRouter()`
- Navigate between views using `routerLink` and `Router.navigate()`
- Read route and query parameters in your components
- Bind route and query params directly to signal `input()` with `withComponentInputBinding()`
- Lazy-load components to keep your initial bundle small
- Protect routes with functional `canActivate` and `canDeactivate` guards

---

## Slide 3: What Is Routing?

Routing is the mechanism that maps URLs to views. When a user navigates to `/recipes`, Angular looks up that path in your route configuration and renders the matching component — without ever reloading the page.

Think of it as a switchboard: a URL comes in, Angular matches it to a rule, and the right component appears. The URL in the browser bar changes, the browser history updates, but the server is never asked for a new page.

There are three pieces to that switchboard:

- **The route config** — a list of URL-to-component mappings you define
- **The router outlet** — a placeholder in your template where the matched component renders
- **Navigation tools** — links and code calls that tell the router to change the active URL

The next several slides cover each piece in detail.

---

## Slide 4: Why Routing Matters

Without routing, your Angular app is a single view — no bookmarkable URLs, no browser back button, no deep links.

Routing gives you:

- **Separate URLs** for each view (`/recipes`, `/recipes/42`, `/login`)
- **Browser history** — back and forward work the way users expect
- **Deep linking** — users can bookmark or share a specific page
- **Code splitting** — only load the code for the route the user is visiting
- A navigation model that feels like a real app, not a widget

> Angular handles routing entirely client-side. The server always serves `index.html`, and Angular takes over from there.

---

## Slide 5: Enable Routing — provideRouter()

Routing is opt-in. You wire it up once in `app.config.ts`.

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // your route config array

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // registers the router with your app
  ],
};
```

- `provideRouter()` replaces the legacy `RouterModule.forRoot()` — more on that later
- Pass it your `routes` array — that's the entire setup
- Extra features (lazy loading, guards, input binding) are added as additional arguments

---

## Slide 6: The Route Configuration Array

Each object in the `routes` array maps a URL path to a component. Angular matches routes **top-to-bottom and stops at the first match** — order matters.

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { RecipeListComponent }   from './recipes/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail.component';
import { NotFoundComponent }     from './not-found.component';

export const routes: Routes = [
  { path: '',            redirectTo: '/recipes', pathMatch: 'full' }, // redirect root → /recipes
  { path: 'recipes',     component: RecipeListComponent },            // /recipes → list
  { path: 'recipes/:id', component: RecipeDetailComponent },          // /recipes/42 → detail
  { path: '**',          component: NotFoundComponent },              // wildcard — always last
];
```

- `redirectTo` sends the user to another route — `pathMatch: 'full'` is required on empty paths so it only matches exactly `/`, not every route
- `path: '**'` is the wildcard catch-all — if it came first, it would match everything and no other route would ever run

---

## Slide 7: router-outlet — Where Views Render

`<router-outlet>` is the placeholder in your template where Angular injects the matched component. The `AppComponent` class itself needs no logic — rendering is handled entirely by the outlet. You just need to import `RouterOutlet` and place the tag in the template.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],            // must import RouterOutlet explicitly
  templateUrl: './app.component.html',
  styleUrl:    './app.component.css',
})
export class AppComponent {} // no logic needed — the outlet handles rendering
```

```html
<!-- app.component.html -->
<nav><!-- navigation links go here --></nav>

<!-- Angular swaps in the matched component here when the route changes -->
<!-- Self-closing and paired tags both work: <router-outlet></router-outlet> is identical -->
<router-outlet />
```

---

## Slide 8: ⚠️ WARNING — Routing Directives Not in Imports

The most common Day 4 mistake. You get a blank page or broken links with no error message.

```typescript
// WRONG — Breaks silently — no error, just missing behavior
@Component({
  standalone: true,
  imports: [],  // all three routing pieces are missing
  template: `
    <router-outlet />           <!-- outlet renders nothing -->
    <a routerLink="/recipes">   <!-- link does nothing -->
  `,
})
export class AppComponent {}
```

```typescript
// CORRECT — Import exactly what you use
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `...`,
})
export class AppComponent {}
```

> The same rule applies to every standalone component — if a template uses a routing directive, that directive must be in the component's `imports` array. Angular doesn't error on unknown elements; it silently ignores them.

---

## Slide 9: routerLink — Navigate in Templates

`routerLink` is an Angular directive that turns any element into a client-side navigation trigger. When a user clicks it, Angular's router updates the URL and swaps in the new component — without asking the server for a new page. This keeps your app state intact and avoids a full page reload.

Use `routerLink` in place of `href` whenever you're navigating within your app. `href` tells the *browser* to fetch a new page. `routerLink` tells *Angular's router* to change the view.

```html
<!-- Static link — plain string, no brackets needed -->
<a routerLink="/recipes">All Recipes</a>

<!-- Dynamic link — array syntax lets you compose segments at runtime -->
<a [routerLink]="['/recipes', recipe.id]">View Recipe</a>

<!-- Adding query params inline -->
<a [routerLink]="['/recipes']"
   [queryParams]="{ category: 'italian' }">
  Italian Recipes
</a>
```

- Bracket syntax `[routerLink]` = dynamic binding expression; no brackets = static string literal
- Array syntax: each element becomes a URL segment — Angular joins them with `/`
- Remember to add `RouterLink` to the component's `imports` array (covered in the ⚠️ on the previous slide)

---

## Slide 10: routerLinkActive — Highlight Active Links

`routerLinkActive` adds a CSS class to a link when its route matches the current URL.

```typescript
// nav.component.ts
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // import both — they're separate directives
  templateUrl: './nav.component.html',
  styleUrl:    './nav.component.css',
})
export class NavComponent {}
```

```html
<!-- nav.component.html -->
<a routerLink="/recipes"
   routerLinkActive="active-link">         <!-- adds 'active-link' CSS class when on /recipes -->
  Recipes
</a>

<a routerLink="/about"
   routerLinkActive="active-link"
   [routerLinkActiveOptions]="{ exact: true }"> <!-- exact: only activate on /about, not /about/team -->
  About
</a>
```

Without `exact: true`, `/about/team` would also activate the `/about` link.

---

## Slide 11: Router.navigate() — Navigate from Code

Use `Router.navigate()` when you need to navigate from TypeScript — after a form submit, button click, or any business logic.

```typescript
// recipe-list.component.ts
import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl:    './recipe-list.component.css',
})
export class RecipeListComponent {
  private readonly router = inject(Router); // inject(), not constructor

  readonly recipes = signal<Recipe[]>([]);

  onRecipeClick(id: number): void {
    this.router.navigate(['/recipes', id]); // segments joined → /recipes/42
  }

  onFilterChange(category: string): void {
    this.router.navigate(['/recipes'], {
      queryParams: { category }, // → /recipes?category=italian
    });
  }
}
```

---

## Slide 12: navigate() vs navigateByUrl()

Angular's `Router` service gives you two methods for navigating programmatically. Both trigger the same routing pipeline — they differ only in how you specify the destination. `navigate()` assembles a URL from an array of segments; `navigateByUrl()` takes a complete URL string. Use whichever matches what you already have.

```typescript
// Both produce the same result:
this.router.navigate(['/recipes', 42]);
this.router.navigateByUrl('/recipes/42');

// Only navigate() supports relative navigation:
this.router.navigate(['../sibling'], { relativeTo: this.route });

// navigateByUrl is handy when you already have a full URL string:
this.router.navigateByUrl(`/search?q=${query}`);
```

| | `navigate()` | `navigateByUrl()` |
|---|---|---|
| Input | Array of segments | Full URL string |
| Query params | `{ queryParams: {...} }` option | Part of the URL string |
| Relative nav | Supports `relativeTo` option | Always absolute |
| Best for | Dynamic routes, post-submit nav | Redirects, absolute jumps |

---

## Slide 13: What Route Parameters Are

Route parameters identify a **specific resource** in your URL. Use them when a value is required to load the right data — a product detail page, a user profile, a specific article. The answer to "which one?" is a route parameter.

They're defined in the route config with a colon prefix and extracted by Angular when the route matches.

```
Route config:  path: 'recipes/:id'
                              ^^^
                              colon prefix = this segment is a named parameter

URL visited:   /recipes/42
Extracted:     id → "42"     (always a string, even if it looks like a number)

URL visited:   /recipes/chicken-tikka
Extracted:     id → "chicken-tikka"
```

```typescript
// Multiple params work the same way:
{ path: 'users/:userId/posts/:postId', component: UserPostComponent }
// /users/5/posts/12  →  userId = "5", postId = "12"
```

- Parameters are **always strings** — parse with `Number()` or `parseInt()` if you need a number
- The param name in the URL (`:id`) must match the name you use to read it

---

## Slide 14: What Query Parameters Are

Query parameters modify *how* a view is displayed. They answer questions like "which page?", "sorted by what?", or "filtered to what category?" Use them for filters, sorting, pagination, and search terms — any value that's optional and doesn't change *which* resource you're looking at.

```
/recipes?category=italian&sort=rating
         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         These are query params — not part of the route path
```

- They don't affect which route is matched
  - `/recipes?category=italian` still matches `path: 'recipes'`
- Can be added or removed without changing the active route

---

## Slide 15: Route Params vs Query Params

This is a design decision you'll make on every project.

| | Route Params | Query Params |
|---|---|---|
| Syntax | `/recipes/:id` | `/recipes?sort=name` |
| Required? | Yes — part of the path | No — optional |
| Purpose | **Identity** — which resource | **Modifier** — how to display it |
| Example | `/recipes/42` | `/recipes?category=italian&page=2` |

**Rule of thumb:**
- *Which recipe?* → route param: `/recipes/42`
- *How to sort the list?* → query param: `/recipes?sort=rating`

---

## Slide 16: Reading Query Params — ActivatedRoute

This is the manual approach to reading query params — using Angular's `ActivatedRoute` service directly. It works, but requires Observable handling. The next few slides introduce a cleaner way; this slide shows what that new approach is replacing.

`ActivatedRoute` exposes query params through `queryParamMap`, which is an **Observable** — not a one-time value. Angular keeps the same component instance alive when only query params change (e.g. the user switches a filter), so `queryParamMap` emits a new value each time the URL changes without destroying the component. That's why it's reactive.

```typescript
// recipe-list.component.ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({ standalone: true, ... })
export class RecipeListComponent {
  private readonly route = inject(ActivatedRoute);

  // toSignal converts the Observable into a readable signal —
  // it re-evaluates whenever the URL's query string changes
  readonly queryParams = toSignal(this.route.queryParamMap);

  get category(): string | null {
    return this.queryParams()?.get('category') ?? null;
    // URL /recipes?category=italian → returns 'italian'
    // URL /recipes                  → returns null
  }
}
```

> If you only need a one-time read, `inject(ActivatedRoute).snapshot.queryParamMap.get('category')` works — but it won't update if params change while the component stays alive.

---

## Slide 17: withComponentInputBinding() — What It Does

`withComponentInputBinding()` is a router feature that automatically wires route parameters and query parameters directly into your component's `input()` signals. Rather than injecting `ActivatedRoute` and manually subscribing to its Observables, you declare an input with a matching name and Angular populates it for you.

With `withComponentInputBinding()` enabled, Angular **automatically passes both route params and query params as signal inputs**.

```
Route config:  /recipes/:id
URL visited:   /recipes/42?category=italian
                        ^^  ^^^^^^^^^^^^^^^
                        Angular sets input() named 'id' to '42'
                        AND input() named 'category' to 'italian'
```

No Observable. No subscription. No `ActivatedRoute`.

Params arrive as signal inputs — the same way a parent component passes a value. You declare the input, Angular populates it.

---

## Slide 18: Enable withComponentInputBinding()

This is a one-time configuration change in `app.config.ts`. You add `withComponentInputBinding()` as a second argument to `provideRouter()`, and it activates the feature for every route in your app.

```typescript
// app.config.ts
import {
  provideRouter,
  withComponentInputBinding,  // import this
} from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(), // enables route/query param → input() binding
    ),
  ],
};
```

Once enabled, it works for every route in your app — no per-component configuration required.

---

## Slide 19: Route Params as Signal Inputs

With `withComponentInputBinding()` enabled, route parameters flow into your component as signal inputs. Signal inputs in this context are `input()` declarations that Angular automatically fills from the current URL. When you navigate to `/recipes/42`, Angular reads the `:id` parameter from the URL and sets the value of `id()` in your component. You declare the input, Angular handles the wiring — no `ActivatedRoute`, no subscription.

For route params, you can use `input.required<string>()` instead of `input<string>()`. A route param is guaranteed to be present when the route matches — `input.required` makes that explicit and removes `undefined` from the type, so you don't need to null-check it downstream.

```typescript
// recipe-detail.component.ts
import { Component, input, computed, inject } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  standalone: true,
  templateUrl: './recipe-detail.component.html',
  styleUrl:    './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  // input.required — the route guarantees :id is always present
  // readonly is required — input() signals are owned by Angular, not the component
  readonly id = input.required<string>(); // name matches :id in the route config

  private readonly recipeService = inject(RecipeService);

  // computed() re-runs automatically whenever id() changes
  readonly recipe = computed(() => this.recipeService.getById(this.id()));
}
```

Route config: `{ path: 'recipes/:id', component: RecipeDetailComponent }`

URL `/recipes/42` → `id()` returns `'42'`

---

## Slide 20: Query Params as Signal Inputs

`withComponentInputBinding()` binds query params to inputs too — not just route params. Query params are optional, so use plain `input<string>()` here — unlike route params, a query param may not be present in the URL, so `undefined` is a valid state.

```typescript
// recipe-list.component.ts
@Component({
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl:    './recipe-list.component.css',
})
export class RecipeListComponent {
  // Optional — query params may or may not be in the URL
  readonly category = input<string>(); // receives ?category=italian

  private readonly recipeService = inject(RecipeService);

  // computed() re-runs when category() changes — filter updates automatically
  readonly filtered = computed(() =>
    this.recipeService.filterBy(this.category())
  );
}
```

Route config: `{ path: 'recipes', component: RecipeListComponent }`

URL `/recipes?category=italian` → `category()` returns `'italian'`
URL `/recipes` → `category()` returns `undefined`

---

## Slide 21: ⚠️ WARNING — Input Name Must Match Param Name

The `input()` property name must exactly match the route parameter or query parameter name.

```typescript
// Route config:
{ path: 'recipes/:id', component: RecipeDetailComponent }
//               ^^^  param is named 'id'

// WRONG — name doesn't match
readonly recipeId = input<string>(); // stays undefined — no error, no binding

// CORRECT — name matches exactly
readonly id = input.required<string>(); // Angular binds /recipes/42 → '42'
```

Two things must both be true for binding to work:
1. The `input()` name matches the param/query key name exactly
2. `withComponentInputBinding()` is enabled in `app.config.ts`

If either is missing, the input stays `undefined` silently.

---

## Slide 22: Why withComponentInputBinding() Wins

The same result, a fraction of the code.

**Without it — manual ActivatedRoute:**
```typescript
readonly id = signal<string>('');

constructor() {
  inject(ActivatedRoute).paramMap.pipe(
    takeUntilDestroyed()  // must manage the subscription lifecycle
  ).subscribe(params => this.id.set(params.get('id') ?? ''));
}
```

**With withComponentInputBinding():**
```typescript
readonly id = input.required<string>(); // Angular handles everything
```

Same result. No subscription. No lifecycle management. No `ActivatedRoute`. This is why the feature exists.

---

## Slide 23: What Child Routes Are

Child routes let you nest views — a parent component stays visible while sub-routes render inside it.

```
/recipes/42             →  RecipeDetailComponent  (parent only)
/recipes/42/reviews     →  RecipeDetailComponent  +  ReviewsComponent   (nested)
/recipes/42/nutrition   →  RecipeDetailComponent  +  NutritionComponent (nested)
```

Use child routes when:
- A parent layout (header, sidebar, tabs) should persist across sub-routes
- You're building a tabbed interface or master-detail panel
- Sub-routes logically belong to a parent resource

---

## Slide 24: Child Routes in app.routes.ts

Here's how that structure translates into the route config. The parent route gets a `children` array — an array of route objects with the same shape as top-level routes, but scoped under the parent's URL. The parent component renders on every URL in the group; the child component renders inside it.

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent,  // parent — always visible on these URLs
    children: [                        // sub-routes rendered inside the parent's outlet
      { path: '',          component: RecipeSummaryComponent },   // /recipes/42
      { path: 'reviews',   component: RecipeReviewsComponent },   // /recipes/42/reviews
      { path: 'nutrition', component: RecipeNutritionComponent }, // /recipes/42/nutrition
    ],
  },
];
```

- `children` is an array — same structure as top-level routes
- Empty path `''` renders the default child when no sub-path is provided
- Each child component replaces what's in the **parent's** `<router-outlet>` — not the app-level one

---

## Slide 25: Nested router-outlet

The parent component needs its own `<router-outlet>` for children to render into. Without it, child routes have nowhere to go. The parent also needs to declare relative links — links without a leading `/` — so they resolve relative to the parent's current URL.

```typescript
// recipe-detail.component.ts
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink], // RouterOutlet required for child rendering
  templateUrl: './recipe-detail.component.html',
  styleUrl:    './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  readonly id = input.required<string>(); // bound from the :id param
}
```

```html
<!-- recipe-detail.component.html -->
<h2>Recipe {{ id() }}</h2>

<nav>
  <a [routerLink]="['reviews']">Reviews</a>     <!-- relative link — no leading slash -->
  <a [routerLink]="['nutrition']">Nutrition</a>
</nav>

<router-outlet />  <!-- child component renders here, inside the parent -->
```

---

## Slide 26: ⚠️ WARNING — Missing Nested router-outlet

Child routes silently render nothing if either of these two things is missing from the parent component.

**Problem 1 — No `<router-outlet>` in the template:**
```html
<!-- WRONG — Parent template has no outlet — children never appear -->
<h2>Recipe Detail</h2>
<p>Some recipe info...</p>
<!-- /recipes/42/reviews navigates here but renders nothing -->
```

**Problem 2 — `RouterOutlet` missing from the `imports` array:**
```typescript
// WRONG — Outlet tag in template is silently ignored
@Component({
  standalone: true,
  imports: [RouterLink], // RouterOutlet is missing — the outlet won't work
  templateUrl: '...',
})
```

```typescript
// CORRECT — Both required
imports: [RouterOutlet, RouterLink]
```

> If child routes aren't showing up, check **both**: the template has `<router-outlet />` and the component imports `RouterOutlet`.

---

## Slide 27: What Lazy Loading Is

By default, Angular bundles all your components into one JavaScript file. For small apps that's fine. For large apps, users download code they may never need.

**Lazy loading** splits your app into chunks — code for a route is only downloaded when the user actually navigates to it.

```
Without lazy loading:
  Initial page load → downloads ALL components (login, dashboard, admin, reports...)

With lazy loading:
  Initial page load → downloads only what's needed for the first view
  User navigates to /admin → admin code downloads now (only if/when needed)
```

Result: faster initial load, especially on mobile and slow connections.

---

## Slide 28: loadComponent() — Modern Lazy Loading

`loadComponent` is a route property that defers loading a component until the user actually navigates to that route. Instead of bundling the component into your main JavaScript file at startup, Angular creates a separate chunk that only downloads on demand. To use it, replace `component:` with `loadComponent:` in your route config.

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeListComponent, // eagerly loaded — bundled at startup
  },
  {
    path: 'admin',
    // loadComponent tells Angular to split this into a separate JS chunk
    loadComponent: () =>
      import('./admin/admin.component')  // dynamic import — standard JS syntax
        .then(m => m.AdminComponent),    // extract the class from the module object
  },
];
```

- `import()` is standard JavaScript dynamic import — not Angular-specific syntax
- Angular splits this into a separate chunk automatically at build time
- Guards, params, and child routes all work exactly the same on lazy routes

---

## Slide 29: loadComponent() Syntax in Detail

The pattern is always the same three parts:

```typescript
loadComponent: () =>           // arrow function — defers the import until navigation
  import('./path/to/file')     // dynamic import — returns a Promise of the module
    .then(m => m.ClassName),   // extract the exported class from the module object
```

```typescript
// Works at any level — child routes can be lazy-loaded too:
{
  path: 'dashboard',
  loadComponent: () =>
    import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  children: [
    {
      path: 'stats',
      loadComponent: () =>
        import('./dashboard/stats/stats.component').then(m => m.StatsComponent),
    },
  ],
},
```

Each `loadComponent` becomes its own `.js` chunk in your production build. You can verify this in the browser's **Network tab** — when you navigate to a lazy route for the first time, you'll see a new JavaScript file download. After that first visit it's cached, so subsequent navigations are instant.

---

## Slide 30: Why Lazy Loading Matters in Practice

A real-world Angular app can have 50+ components. The impact of lazy loading is significant.

| Scenario | Without Lazy Loading | With Lazy Loading |
|---|---|---|
| Initial JS bundle | ~800 KB | ~120 KB |
| Time to interactive (3G) | ~4.2s | ~1.1s |
| Admin code loaded | Always — even for non-admins | Only if user visits /admin |

*(Numbers are illustrative — actual savings depend on your app.)*

**Rule of thumb:** lazy-load any route that isn't your initial landing page or shell. The code change is minimal: swap `component:` for `loadComponent:`.

---

## Slide 31: Additional Router Features

The next two slides cover opt-in features you configure as extra arguments to `provideRouter()`. They're not required to get routing working, but they solve specific real-world problems you'll encounter.

```typescript
provideRouter(
  routes,
  withComponentInputBinding(), // already covered
  withHashLocation(),          // coming up
  withPreloading(PreloadAllModules), // coming up
)
```

Each feature is independent — add only the ones that apply to your deployment and performance needs.

---

## Slide 32: withHashLocation()

By default, Angular uses clean URLs like `/recipes/42`. Some hosting environments can't handle this — if a user refreshes the page or shares a link, the server receives `/recipes/42` as a request and returns a 404 because it has no file at that path. It doesn't know Angular is supposed to handle that URL.

`withHashLocation()` solves this by putting everything after a `#` in the URL. The `#` portion is never sent to the server, so the server always serves `index.html` and Angular takes over from there.

```
Without:  https://myapp.com/recipes/42
With:     https://myapp.com/#/recipes/42
```

```typescript
// app.config.ts
provideRouter(routes, withHashLocation())
```

**When to use it:**
- Deploying to environments that can't do server-side URL rewriting (GitHub Pages, some shared hosting)

**When NOT to use it:**
- Any modern deployment (Netlify, Vercel, Firebase, Nginx with config) — configure the server instead
- Clean URLs are better for SEO and user experience

---

## Slide 33: withPreloading() — Background Preloading

Pure lazy loading means a user waits briefly the first time they visit a route while the chunk downloads. `withPreloading()` eliminates that wait by downloading lazy-loaded chunks in the background **after** the initial page is ready — so the code is likely already cached by the time the user clicks.

It gives you the best of both worlds: a small initial bundle (fast startup) and near-instant navigation (chunks ready in the background).

```typescript
// app.config.ts
import {
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';

provideRouter(
  routes,
  withPreloading(PreloadAllModules), // preload all lazy routes quietly in the background
)
```

- Initial load is still fast — lazy chunks don't block startup
- When the user navigates to a lazy route, the code is likely already downloaded
- `PreloadAllModules` preloads everything — you can write a custom strategy to be selective

Good default for most production apps.

---

## Slide 34: What Are Guards?

Guards are functions that run before Angular completes a navigation. They act as checkpoints in the routing pipeline — a place to ask "should this navigation actually happen?" before any component is loaded or destroyed.

A guard can:
- **Allow** the navigation to proceed — return `true`
- **Block** it entirely — return `false`
- **Redirect** the user to a different route — return a `UrlTree`

Angular supports two main types:

- **`canActivate`** — runs *before* a route loads. Use it to enforce authentication or permissions: is the user logged in? Do they have the right role?
- **`canDeactivate`** — runs *before* a route unloads. Use it to protect unsaved work: warn the user before they navigate away from an unsaved form.

Guards in modern Angular are plain functions — no class, no `@Injectable`. They use `inject()` to access services just like a component would.

---

## Slide 35: canActivate — Protecting Routes

A `canActivate` guard is a **plain function** that runs before Angular renders a route.

- Return `true` → allow navigation
- Return `false` → block navigation
- Return a `UrlTree` → redirect to another route

The function receives two arguments: `route` (the matched route snapshot — gives you access to params, data, and the component being activated) and `state` (the full URL being navigated to, useful for saving where to redirect back after login).

```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;                               // allow navigation
  }

  // Return a UrlTree — DO NOT call router.navigate() here (see warning slide)
  return router.createUrlTree(['/login']);
};
```

---

## Slide 36: Wiring canActivate to a Route

Once your guard function is written, you attach it to a route via the `canActivate` property. The guard runs before the component loads. Placing a guard on a parent route automatically protects all of its children — you don't need to repeat it on each child.

```typescript
// app.routes.ts
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],  // guard runs before DashboardComponent renders
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard],  // guards work with lazy-loaded routes too
    children: [
      // placing the guard on the parent protects ALL children automatically —
      // you don't need to repeat canActivate on each child route
      { path: 'users',    component: AdminUsersComponent },
      { path: 'settings', component: AdminSettingsComponent },
    ],
  },
];
```

- `canActivate` is an array — you can stack multiple guards; they run in order and stop at the first `false`

---

## Slide 37: ⚠️ WARNING — Don't Call navigate() Inside a Guard

A very common mistake: calling `router.navigate()` instead of returning a `UrlTree`.

```typescript
// WRONG — navigate() as a side effect causes a navigation race condition
export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']); // fires a second navigation while the first is still running
    return false;
  }
  return true;
};
```

```typescript
// CORRECT — return a UrlTree and let the router handle the redirect cleanly
export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/login']); // one navigation, no race condition
};
```

---

## Slide 38: canDeactivate — Leaving a Route

`canDeactivate` runs when the user tries to **leave** a route. Use it to prevent accidental data loss.

```typescript
// unsaved-changes.guard.ts
import { CanDeactivateFn } from '@angular/router';
import { EditRecipeComponent } from './edit-recipe.component';

// The generic type parameter is the component being guarded —
// Angular passes the live component instance as the first argument
export const unsavedChangesGuard: CanDeactivateFn<EditRecipeComponent> =
  (component) => {
    if (component.hasUnsavedChanges) {
      // confirm() is fine for development — use a modal dialog in production
      return confirm('You have unsaved changes. Leave anyway?');
    }
    return true; // no unsaved changes — safe to navigate away
  };
```

The guarded component must expose the property the guard reads:

```typescript
export class EditRecipeComponent {
  hasUnsavedChanges = false; // guard checks this before allowing navigation away
}
```

---

## Slide 39: Wiring canDeactivate to a Route

Just like `canActivate`, you attach `canDeactivate` to a route via an array property. Angular calls the guard whenever navigation away from this route is attempted — whether from a link click, a programmatic `navigate()` call, or the browser back button.

```typescript
// app.routes.ts
import { unsavedChangesGuard } from './unsaved-changes.guard';

export const routes: Routes = [
  {
    path: 'recipes/:id/edit',
    component: EditRecipeComponent,
    canDeactivate: [unsavedChangesGuard], // runs when user tries to navigate away
  },
];
```

`canDeactivate` fires when the user:
- Clicks a `routerLink` to another page
- Calls `router.navigate()` programmatically
- Hits the browser back button

> **Day 4B preview:** You'll wire `hasUnsavedChanges` to a reactive form's `.dirty` property. If the form has unsaved changes, the guard prompts the user before they lose their work.

---

## Slide 40: Coming Up — Modern vs Classic Angular

You've just learned routing the modern way.

Before we finish, you'll see how the same concepts looked in **classic (pre-Angular 17) Angular** — the patterns you'll encounter in most existing projects today.

**Modern Angular** is what you write for new projects.
**Classic Angular** is what you'll read and maintain on the job.

Both accomplish the same things — the modern approach is significantly less code.

---

## Slide 41: AppRoutingModule — Legacy Pattern

On the job, you'll encounter projects that use a routing module instead of `provideRouter()`.

```typescript
// app-routing.module.ts  ← legacy pattern you'll see in real codebases
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // configures the router at the root level
  exports: [RouterModule],                 // makes RouterOutlet + RouterLink available app-wide
})
export class AppRoutingModule {}
```

Then `AppRoutingModule` is imported into `AppModule`. You won't write this for new projects — but you need to **recognize it** when you encounter it in an existing codebase.

---

## Slide 42: Legacy — Router Setup

**Modern (what you write):**
```typescript
// app.config.ts — a single object, no class, no module
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

**Classic (what you'll read on the job):**
```typescript
// app-routing.module.ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// app.module.ts
@NgModule({
  imports: [BrowserModule, AppRoutingModule], // import order matters
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Two extra files, two extra classes, rigid import order. `provideRouter()` replaced all of this.

---

## Slide 43: Legacy — Feature Routes

**Modern:**
```typescript
// app.routes.ts — add a children array directly; no extra files
{ path: 'recipes', children: recipeRoutes }
```

**Classic:**
```typescript
// recipes-routing.module.ts — a separate file required per feature area
@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild() for non-root modules
  exports: [RouterModule],
})
export class RecipesRoutingModule {}

// recipes.module.ts — and a separate feature module to go with it
@NgModule({
  imports: [CommonModule, RecipesRoutingModule],
  declarations: [RecipeListComponent, RecipeDetailComponent],
})
export class RecipesModule {}
```

`forChild()` existed because modules couldn't share a single router config. Every feature area needed its own routing module. Modern Angular eliminates all of this — routes are just data.

---

## Slide 44: Legacy — Lazy Loading

**Modern:**
```typescript
{
  path: 'admin',
  loadComponent: () =>
    import('./admin/admin.component').then(m => m.AdminComponent),
}
```

**Classic:**
```typescript
// app-routing.module.ts — loads an NgModule, not a component directly
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.module').then(m => m.AdminModule),
}

// admin/admin.module.ts — required for classic lazy loading to work
@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [AdminComponent],
})
export class AdminModule {}
```

Classic lazy loading required an entire NgModule per lazy route. `loadComponent` replaced a whole file with one line.

---

## Slide 45: Legacy — Route Params as Inputs

**Modern (with withComponentInputBinding):**
```typescript
// One line — Angular handles the wiring
readonly id = input.required<string>();
```

**Classic:**
```typescript
export class RecipeDetailComponent implements OnInit, OnDestroy {
  id: string = '';
  private sub!: Subscription;

  constructor(private route: ActivatedRoute) {} // constructor injection required

  ngOnInit(): void {
    // Manual subscription — you own the lifecycle
    this.sub = this.route.paramMap.subscribe(params => {
      this.id = params.get('id') ?? '';
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe(); // forget this → memory leak
  }
}
```

Classic required constructor injection, `OnInit`, `OnDestroy`, and a manually managed subscription. Modern collapses it to one line.

---

## Slide 46: Legacy — Programmatic Navigation

The functionality of `Router.navigate()` is identical between modern and classic Angular. The only difference is how you get hold of the `Router` instance.

**Modern:**
```typescript
// inject() works anywhere in the class body — no constructor required
private readonly router = inject(Router);
```

**Classic:**
```typescript
// All dependencies declared as constructor parameters
constructor(private router: Router) {}
```

`inject()` is more flexible — it also works in standalone functions and guards outside of classes, which is how modern functional guards are written.

---

## Slide 47: Legacy — canActivate Guard

The logic inside `canActivate` is identical between modern and classic. The difference is entirely in how the guard is declared and registered — a plain function vs. a decorated class.

**Modern (plain function):**
```typescript
export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isLoggedIn()
    ? true
    : inject(Router).createUrlTree(['/login']);
};
```

**Classic (class-based):**
```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    return this.auth.isLoggedIn()
      ? true
      : this.router.createUrlTree(['/login']);
  }
}
```

Same logic. Classic adds `@Injectable`, a class declaration, `implements CanActivate`, and a constructor. Modern is a single function.

---

## Slide 48: Legacy — canDeactivate Guard

**Modern:**
```typescript
export const unsavedChangesGuard: CanDeactivateFn<EditRecipeComponent> =
  (component) => component.hasUnsavedChanges
    ? confirm('Leave without saving?')
    : true;
```

**Classic:**
```typescript
@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<EditRecipeComponent> {

  canDeactivate(component: EditRecipeComponent): boolean {
    return component.hasUnsavedChanges
      ? confirm('Leave without saving?')
      : true;
  }
}
```

Classic `CanDeactivate<T>` is a typed interface you implement on a class. Modern `CanDeactivateFn<T>` applies the same generic type constraint to a function. The difference is boilerplate, not capability.

---

## Slide 49: Key Takeaways

- **`provideRouter(routes)`** wires up routing in `app.config.ts` — one function call, no modules, no extra files; route order matters because Angular matches top-to-bottom and stops at the first match
- **`withComponentInputBinding()`** lets both route params and query params flow directly into `input()` signals — no manual `ActivatedRoute` subscriptions needed; use `input.required<string>()` for route params (always present) and plain `input<string>()` for query params (optional)
- **`loadComponent()`** lazy-loads a standalone component with a dynamic import — one line of code change that can dramatically reduce your initial bundle size, visible as a separate file in the browser's Network tab
- **Functional guards** (`CanActivateFn`, `CanDeactivateFn`) are plain functions — `inject()` your services, return `true`, `false`, or a `UrlTree` to redirect; placing a guard on a parent route protects all its children automatically
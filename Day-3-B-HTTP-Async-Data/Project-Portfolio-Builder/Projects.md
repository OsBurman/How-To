# Day 3 Part B — Project Portfolio Builder

Practice what you learned in Day 3 Part B by building one of these projects from scratch.
Each project uses a real, free, public API — no accounts or API keys required unless noted.

---

## Project 1 — GitHub Profile Explorer ⭐ Beginner

**API:** `https://api.github.com`

Build a search tool that lets users look up any GitHub user by username and see their profile
information and public repositories. Focus on typed HTTP calls, loading states, and error handling
for usernames that don't exist.

### Components to Create
- `AppComponent` — app shell with header
- `UserSearchComponent` — search bar with a button to trigger the request
- `UserProfileComponent` — displays avatar, bio, follower count, and public repo count
- `RepoListComponent` — lists the user's repositories with name, language, and star count

### What You'll Practice
- `http.get<GithubUser>()` with typed response interfaces
- `isLoading` signal with `finalize()` to show/hide a spinner during the request
- `HttpErrorResponse` status branching (404 = user not found, 0 = network error)
- `environment.ts` storing the GitHub API base URL

---

## Project 2 — Country Fact Finder ⭐ Beginner

**API:** `https://restcountries.com/v3.1`

Build an app where users can search for a country by name and view key facts: population, capital,
region, flag, and spoken languages. Add a "Compare Two Countries" feature that fires both requests
in parallel and displays the results side by side.

### Components to Create
- `AppComponent` — app shell
- `CountrySearchComponent` — text input + search button
- `CountryCardComponent` — displays a single country's facts and flag
- `CountryCompareComponent` — two search inputs that load both countries simultaneously

### What You'll Practice
- `HttpParams` to pass the search term as a query string
- `forkJoin` to load two countries in parallel in the compare view
- Response interfaces that model the nested RestCountries API shape
- `catchError` to return a friendly message when a country isn't found

---

## Project 3 — Open Library Book Search ⭐ Beginner

**API:** `https://openlibrary.org`

Build a book search app that queries the Open Library API and displays results with cover images,
author names, and publish year. Let users click a result to load a detail view for that specific
book using a second HTTP request.

### Components to Create
- `AppComponent` — app shell with header
- `BookSearchComponent` — search bar with `debounceTime` + `switchMap` for live search
- `BookListComponent` — grid of book cards with cover image, title, and author
- `BookDetailComponent` — full detail view loaded on click (second GET request)

### What You'll Practice
- Combining Day 3A RxJS operators (`debounceTime`, `switchMap`) with typed `HttpClient`
- Chained HTTP requests — list request first, then a detail request on selection
- `isLoading` signal + `finalize()` for per-request loading indicators
- `HttpErrorResponse` handling when a book ID returns no result

---

## Project 4 — Air Quality Dashboard ⭐⭐ Intermediate

**API:** `https://api.open-meteo.com` (air quality endpoint — no key required)

Build a dashboard that shows current air quality data for multiple cities simultaneously.
Use `forkJoin` to load all cities in one shot, display a colour-coded AQI indicator per city,
and add a logging interceptor that timestamps every outbound request in the console.

### Components to Create
- `AppComponent` — app shell
- `AirQualityDashboardComponent` — orchestrates the parallel requests and displays the grid
- `CityCardComponent` — shows city name, AQI value, and a colour-coded status badge (`Good`, `Moderate`, `Unhealthy`)
- `AirQualityService` — owns `forkJoin`, `isLoading` signal, and `error$` BehaviorSubject

### What You'll Practice
- `forkJoin` loading 4–6 cities in a single subscription
- Functional `HttpInterceptorFn` for request logging with `Date.now()` timestamps
- `provideHttpClient(withInterceptors([...]))` wired in `app.config.ts`
- `BehaviorSubject` for `error$` + `toSignal()` to bridge into the template

---

## Project 5 — Currency Converter ⭐⭐ Intermediate

**API:** `https://open.er-api.com/v6/latest` (free tier, no key required)

Build a currency converter that loads a list of available currencies on startup, lets the user
pick a base currency and a target currency, then calculates the converted amount live as they type.
Store the base URL in `environment.ts` and add an auth interceptor that attaches a fake API key header.

### Components to Create
- `AppComponent` — app shell
- `CurrencyConverterComponent` — two dropdowns (base + target), amount input, calculated result
- `CurrencyService` — fetches rates, exposes them as a signal, handles loading and error states

### What You'll Practice
- `HttpParams` to pass the selected base currency as a query parameter
- `isLoading` signal with `finalize()` during the initial rates fetch
- Functional `HttpInterceptorFn` adding an `X-Api-Key` header from `environment.ts`
- `HttpErrorResponse` branching to distinguish rate-limit errors (429) from network failures

---

## Project 6 — ISS Location Tracker ⭐⭐ Intermediate

**API:** `http://api.open-notify.org` + `https://api.bigdatacloud.net/data/reverse-geocode-client`

Build an app that polls the International Space Station's current coordinates every 10 seconds,
then fires a second request to a reverse-geocoding API to translate those coordinates into a
human-readable location. Display the results on a simple data card with a live-update indicator.

### Components to Create
- `AppComponent` — app shell
- `IssTrackerComponent` — displays current lat/lng, human-readable location, and last-updated timestamp
- `IssService` — polling with `interval()` + `switchMap`, exposes `location` signal, `isLoading` signal, `error$`

### What You'll Practice
- Chaining two HTTP requests: ISS coordinates → reverse geocode
- `switchMap` to cancel the in-flight geocode request if a new poll fires before it completes
- `retry(2)` on the ISS request so transient failures don't kill the tracker
- `takeUntilDestroyed()` with `DestroyRef` to clean up the polling subscription on component destroy

---

## Project 7 — NASA Astronomy Picture of the Day ⭐⭐ Intermediate

**API:** `https://api.nasa.gov/planetary/apod` (free key at api.nasa.gov — or use `DEMO_KEY`)

Build a viewer for NASA's Astronomy Picture of the Day that lets users browse by date and load
a week's worth of images in one batch request. Store the API key in `environment.ts` and attach
it to every request via an interceptor so no component ever touches the key directly.

### Components to Create
- `AppComponent` — app shell with header
- `ApodViewerComponent` — date picker + current image display with title and explanation
- `ApodGalleryComponent` — loads 7 days of images using `forkJoin`, displays as a scrollable grid
- `ApodService` — owns all HTTP calls, `isLoading` signal, `error$` BehaviorSubject
- `NasaInterceptor` — functional interceptor that appends `api_key` to every request's `HttpParams`

### What You'll Practice
- Functional `HttpInterceptorFn` that modifies `HttpParams` (not just headers) on every request
- `forkJoin` over a dynamic array of requests (7 date-specific URLs built in a loop)
- `catchError` returning `EMPTY` so a single failed image doesn't break the whole gallery
- `environment.ts` storing a secret so no component file ever references the key directly

---

## General Tips

**Start with the interface.**
Before you write a single service method, define a TypeScript interface that matches the exact
shape of the API response. Open the API URL in your browser, read the JSON, then model it.
Guessing the shape wastes time — read it first.

**Wire up the loading state early.**
Add `isLoading = signal(false)`, call `isLoading.set(true)` before the request, and add
`finalize(() => isLoading.set(false))` to the pipe before you write any other operators.
Get the spinner working on the first request — it will save you debugging time later.

**Check errors in order of specificity.**
In your `catchError` or `buildErrorMessage` function, always check `err.status === 0` first
(network offline or CORS), then specific codes (404, 429), then the general `>= 500` fallback.
Don't use a single generic "Something went wrong" message — status codes tell you exactly what happened.

**Keep your API base URL in `environment.ts`.**
Even if you only have one environment. It trains the habit, makes the base URL easy to swap,
and prevents magic strings scattered across service files.

**One service per API resource.**
Don't cram all your HTTP calls into one giant service. If you have users and posts, make a
`UserService` and a `PostService`. Each service should own one slice of the API surface.

**Use `toSignal()` to bridge into templates.**
If your service exposes an Observable (like `error$`), call `toSignal(this.service.error$, { initialValue: null })`
in the component. Never subscribe manually in the component class just to feed a template —
that's what `toSignal()` is for.

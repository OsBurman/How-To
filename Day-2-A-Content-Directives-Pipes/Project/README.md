# 🎬 Movie Listing — Day 2 Part A Sample Project

A movie listing app built with Angular, demonstrating every concept covered in Day 2 Part A: Content Projection, Directives & Pipes.

## What This Project Demonstrates

| Concept | Where It's Used |
|---------|----------------|
| **`ng-content` — single-slot** | Not explicitly present — all slots are named |
| **`ng-content` — named slots** | `MovieCardComponent` declares three slots: `[movie-poster]`, `[movie-title]`, `[movie-details]` |
| **`ngAfterContentInit`** | `MovieCardComponent.ngAfterContentInit()` logs `'MovieCard: projected content is ready'` |
| **`ng-container`** | Wraps each `<app-movie-card>` in `@for` without adding a DOM element |
| **`ng-template` + `[ngTemplateOutlet]`** | `#noResults` template renders the empty state via `<ng-container [ngTemplateOutlet]="noResults">` in the `@else` branch |
| **`@let`** | `@let filteredMovies = movies \| filter:selectedGenre` and `@let filteredCount = filteredMovies.length` — defined once, used in header, list, and footer |
| **`@if` / `@else`** | Shows the movie grid when filtered list is non-empty; shows the `#noResults` template otherwise |
| **`@for` with `track`** | `@for (movie of filteredMovies; track movie.id)` — `track` tells Angular which DOM nodes to reuse |
| **`@switch` / `@case`** | Displays star rating label based on `movie.rating` (numeric value 1–5) |
| **`[ngClass]` — string shorthand** | `[ngClass]="getGenreClass(movie.genre)"` applies `genre-action`, `genre-drama`, etc. |
| **`[ngClass]` — object syntax** | `[ngClass]="{ 'active': genre === activeGenre }"` in `GenreFilterComponent` buttons |
| **`[ngStyle]`** | `[ngStyle]="{ 'border-left-color': borderColor }"` in `MovieCardComponent` |
| **`date` pipe** | `{{ movie.releaseDate \| date:'mediumDate' }}` → `'Mar 15, 2024'` |
| **`currency` pipe** | `{{ movie.budget \| currency }}` → `'$180,000,000.00'` |
| **`uppercase` pipe** | `{{ movie.genre \| uppercase }}` → `'SCI-FI'` |
| **`TruncatePipe` (custom pure)** | `{{ movie.description \| truncate:120 }}` — word-boundary truncation |
| **`FilterPipe` (custom pure)** | `movies \| filter:selectedGenre` — used in `@let` to produce the filtered array |
| **Pure pipe gotcha** | Documented in `filter.pipe.ts` comments — mutating an array in place won't re-trigger a pure pipe |
| **`@Input()` / `@Output()`** | `GenreFilterComponent` uses both; `MovieCardComponent` uses `@Input()` |

## File Tree

```
Project/
├── package.json                                  — Angular 19 dependencies
├── angular.json                                  — CLI workspace config
├── tsconfig.json                                 — TypeScript strict mode base config
├── tsconfig.app.json                             — App-specific TypeScript config
├── README.md                                     — This file
├── instructions.md                               — Step-by-step build guide
└── src/
    ├── index.html                                — Single page with <app-root>
    ├── main.ts                                   — bootstrapApplication() entry point
    ├── styles.css                                — Global dark-theme styles
    └── app/
        ├── app.config.ts                         — ApplicationConfig (empty providers)
        ├── app.component.ts                      — Root: holds movies[], selectedGenre, genre logic
        ├── app.component.html                    — @let, @if/@else, @for, @switch, ng-container, ng-template, slots
        ├── app.component.css                     — Grid layout, badge colours, star colours, empty state
        ├── movie-card/
        │   ├── movie-card.component.ts           — @Input borderColor; ngAfterContentInit logs
        │   ├── movie-card.component.html         — Three named ng-content slots; [ngStyle]
        │   └── movie-card.component.css          — Two-column card layout (poster + body)
        ├── genre-filter/
        │   ├── genre-filter.component.ts         — @Input genres[], @Input activeGenre; @Output genreSelected
        │   ├── genre-filter.component.html       — @for genre buttons; [ngClass] object syntax
        │   └── genre-filter.component.css        — Pill-shaped filter buttons; .active highlight
        └── pipes/
            ├── truncate.pipe.ts                  — Custom pure pipe: word-boundary string truncation
            └── filter.pipe.ts                    — Custom pure pipe: filters Movie[] by genre
```

## How to Run

```bash
# 1. Navigate to the project folder
cd Day-2-A-Content-Directives-Pipes/Project

# 2. Install dependencies
npm install

# 3. Start the development server
npx ng serve

# 4. Open in your browser
# Navigate to http://localhost:4200
```

## Component Architecture

```
AppComponent (root)
├── Owns: movies[] (full catalogue), selectedGenre (active filter)
├── Uses: @let filteredMovies, @let filteredCount
│
├── GenreFilterComponent (child — presentational)
│   ├── Receives: [genres], [activeGenre] via @Input()
│   └── Emits: (genreSelected) via @Output() EventEmitter<string>
│
└── MovieCardComponent × N (child — layout shell)
    ├── Receives: [borderColor] via @Input()
    ├── Lifecycle: ngAfterContentInit (logs when content is projected)
    └── Provides: three named ng-content slots
        ├── [movie-poster]   — filled by parent with posterEmoji <div>
        ├── [movie-title]    — filled by parent with title + badge <div>
        └── [movie-details]  — filled by parent with description + meta + rating <div>
```

## Data Flow

1. **Full catalogue lives in `AppComponent`** — `FilterPipe` derives the visible slice
2. **Genre selection (down → up → down):**
   - `AppComponent` passes `[genres]` and `[activeGenre]` **down** to `GenreFilterComponent`
   - User clicks a button → `GenreFilterComponent` emits `(genreSelected)` **up** to `AppComponent`
   - `AppComponent.onGenreSelected()` updates `selectedGenre` → change detection re-evaluates `@let filteredMovies`
3. **Accent colour (down):** `AppComponent` calls `getGenreColor(movie.genre)` and passes the hex colour **down** to `MovieCardComponent` via `[borderColor]` → `MovieCardComponent` applies it with `[ngStyle]`

## Key Learning Points

### `@let` — Define Once, Use Everywhere
```html
@let filteredMovies = movies | filter:selectedGenre;
@let filteredCount  = filteredMovies.length;
```
`filteredCount` is used three times: in the header subtitle, the `@if` condition, and the footer. One declaration, zero repetition.

### Named `ng-content` Slots — Child Owns Layout, Parent Owns Content
```html
<!-- Inside movie-card.component.html -->
<ng-content select="[movie-poster]"></ng-content>
<ng-content select="[movie-title]"></ng-content>
<ng-content select="[movie-details]"></ng-content>
```
```html
<!-- Inside app.component.html (parent) -->
<app-movie-card>
  <div movie-poster>🚀</div>
  <div movie-title><h2>Starfall: Origins</h2></div>
  <div movie-details><p>…description…</p></div>
</app-movie-card>
```

### Pure Pipe Gotcha — Array Mutation Doesn't Trigger Re-evaluation
```typescript
// ❌ Won't update FilterPipe — the array reference hasn't changed
this.movies.push(newMovie);

// ✅ Creates a new reference — FilterPipe re-runs
this.movies = [...this.movies, newMovie];
```

### `ng-container` vs `ng-template`
- **`ng-container`** — renders right away but adds no DOM element; use it to group without clutter
- **`ng-template`** — renders nothing by default; use it to define a reusable block that you stamp out later with `[ngTemplateOutlet]`

## CLI Commands Used to Create This Project

```bash
ng new d2a-movie-listing-project --style=css --ssr=false
cd d2a-movie-listing-project
ng generate component movie-card
ng generate component genre-filter
ng generate pipe pipes/truncate
ng generate pipe pipes/filter
```

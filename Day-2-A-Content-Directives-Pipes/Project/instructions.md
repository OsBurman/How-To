# 🎬 Movie Listing — Build It Yourself

Step-by-step instructions to build the Movie Listing project from scratch using only what you've learned in Day 1 and Day 2 Part A. **Do not look at the sample code** — use these instructions and the Angular docs if you get stuck.

---

## Prerequisites

- Node.js and npm installed (`node -v` and `npm -v` to verify)
- Angular CLI installed: `npm install -g @angular/cli`
- Completed Day 1 Part A, Day 1 Part B, and Day 2 Part A lessons

---

## Step 1: Scaffold the Project

1. Open your terminal and navigate to where you want the project to live.
2. Run:
   ```bash
   ng new movie-listing --style=css --ssr=false
   ```
3. Accept the defaults when prompted.
4. Navigate into the project:
   ```bash
   cd movie-listing
   ```
5. Start the dev server:
   ```bash
   ng serve
   ```
6. Open `http://localhost:4200` — you should see the default Angular welcome page.
7. **Checkpoint:** Browser shows the Angular default page, terminal shows no errors.

---

## Step 2: Clean Up and Set the Global Theme

1. Delete everything in `src/app/app.component.html`. Replace it with:
   ```html
   <div class="app-container">
     <h1>🎬 Movie Listing</h1>
     <p>Coming soon...</p>
   </div>
   ```
2. Open `src/styles.css` and add a dark background and a base font stack for the whole app.
3. **Checkpoint:** Browser shows a dark page with "🎬 Movie Listing".

---

## Step 3: Define the Movie Interface

Before building any components, define the shape of the data.

1. Open `src/app/app.component.ts`.
2. **Above** the `@Component` decorator, export a `Movie` interface:

   | Property | Type | Notes |
   |----------|------|-------|
   | `id` | `number` | Unique identifier — used for `track` in `@for` |
   | `title` | `string` | Movie title |
   | `genre` | union type | `'Action' \| 'Drama' \| 'Comedy' \| 'Sci-Fi' \| 'Thriller'` |
   | `releaseDate` | `string` | ISO 8601 format (`'2024-03-15'`) — the `date` pipe will format it |
   | `rating` | `number` | 1–5 — used in `@switch` to display star labels |
   | `description` | `string` | Long text — `TruncatePipe` will shorten it |
   | `posterEmoji` | `string` | One emoji as a visual stand-in for a poster |
   | `budget` | `number` | In whole dollars — the `currency` pipe will format it |

3. **Checkpoint:** No TypeScript errors.

---

## Step 4: Add Movie Data to AppComponent

1. In `AppComponent`, add a `movies` property typed as `Movie[]`.
2. Populate it with at least 6 movies spanning all 5 genres (so the filter has something to do).
3. Add an `allGenres` property: `string[] = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller']`.
4. Add a `selectedGenre` property: `string = 'All'`.
5. Add a method `onGenreSelected(genre: string): void` that sets `this.selectedGenre = genre`.
6. **Checkpoint:** TypeScript compiles with no errors.

---

## Step 5: Generate the Pipes

Stop the dev server before generating. Run:

```bash
ng generate pipe pipes/truncate
ng generate pipe pipes/filter
```

Restart the dev server: `ng serve`.

Four files are created in `src/app/pipes/`. You will implement both pipes in Step 9.

---

## Step 6: Generate the Components

Stop the dev server. Run:

```bash
ng generate component movie-card
ng generate component genre-filter
```

Restart: `ng serve`. Verify the component folders were created under `src/app/`.

---

## Step 7: Build GenreFilterComponent

This is the row of filter buttons. It receives data from the parent and sends events back up.

### 7a — The class (`genre-filter.component.ts`)

1. Import `Input`, `Output`, `EventEmitter` from `@angular/core`.
2. Import `NgClass` from `@angular/common` and add it to `imports[]`.
3. Declare two `@Input()` properties:
   - `genres: string[] = []` — the list of genre buttons to render
   - `activeGenre: string = 'All'` — the currently highlighted button
4. Declare one `@Output()`:
   - `genreSelected = new EventEmitter<string>()` — emits when a button is clicked
5. Add a method `onSelect(genre: string): void` that calls `this.genreSelected.emit(genre)`.

### 7b — The template (`genre-filter.component.html`)

1. Use `@for (genre of genres; track genre)` to render a `<button>` for each genre.
2. On each button:
   - Bind `(click)="onSelect(genre)"`.
   - Use `[ngClass]` **object syntax** to add an `'active'` class when `genre === activeGenre`.
3. Wrap the buttons in a `<nav>` element.

### 7c — Styles (`genre-filter.component.css`)

Style the buttons as a pill-shaped filter bar. Define an `.active` class that visually highlights the selected button.

**Checkpoint:** The component exists but isn't rendered yet — that's fine for now.

---

## Step 8: Build MovieCardComponent

This component is a **layout shell** — it defines the card structure but relies on the parent for all the actual content via named `ng-content` slots.

### 8a — The class (`movie-card.component.ts`)

1. Import `Input` and `AfterContentInit` from `@angular/core`. Import `NgStyle` from `@angular/common`.
2. Add `NgStyle` to `imports[]`.
3. Make the class `implements AfterContentInit`.
4. Declare one `@Input()`: `borderColor: string = '#2d3561'`.
5. Implement `ngAfterContentInit()`: log `'MovieCard: projected content is ready'` to the console.
   > This hook fires **after** Angular has filled the ng-content slots. Open DevTools and watch the console when the page loads.

### 8b — The template (`movie-card.component.html`)

1. Create an `<article class="movie-card">` that uses `[ngStyle]` to bind `border-left-color` to `borderColor`.
2. Inside the article, create two columns: a poster column and a body column.
3. In the **poster column**, add:
   ```html
   <ng-content select="[movie-poster]"></ng-content>
   ```
4. In the **body column**, add two more named slots:
   ```html
   <ng-content select="[movie-title]"></ng-content>
   <ng-content select="[movie-details]"></ng-content>
   ```

> **How named slots work:** The attribute in `select="[movie-poster]"` is a CSS attribute selector. It matches any child element that has the `movie-poster` attribute. The parent marks its content with that attribute, and Angular projects it into the matching slot.

### 8c — Styles (`movie-card.component.css`)

Style the card as a two-column layout (fixed-width poster, flexible body). Add a `border-left: 4px solid` that will be overridden by `[ngStyle]`.

**Checkpoint:** Component exists, not yet rendered in the app. No TypeScript errors.

---

## Step 9: Implement the Pipes

### 9a — TruncatePipe (`src/app/pipes/truncate.pipe.ts`)

The `@Pipe` decorator and class skeleton already exist from `ng generate`. Implement `transform()`:

1. Accept two parameters: `value: string` and `limit: number = 100`.
2. Return `value` unchanged if it's falsy or already within the limit.
3. Cut the string at `limit` characters.
4. Find the last space before the cut point using `lastIndexOf(' ')` — cut there so you never break a word mid-way.
5. Append `'…'` to the result.

**Checkpoint:** The pipe compiles. You'll verify the output in the template in the next step.

### 9b — FilterPipe (`src/app/pipes/filter.pipe.ts`)

1. Import the `Movie` interface from `'../app.component'`.
2. Accept two parameters: `movies: Movie[]` and `genre: string`.
3. If `genre` is `'All'` or empty, return `movies` unchanged.
4. Otherwise, return `movies.filter(movie => movie.genre === genre)`.

> **Why this is pure:** The pipe only re-runs when the input reference changes. Changing `selectedGenre` is a new string primitive — that counts as a new reference, so the pipe re-runs correctly.

**Checkpoint:** Both pipes compile with no errors.

---

## Step 10: Wire Up AppComponent

Now assemble everything in the root component.

### 10a — Add helpers to the class (`app.component.ts`)

1. Add `getGenreColor(genre: string): string` — returns a hex colour for each genre (for the card's border colour). Use a `Record<string, string>` object. Provide a fallback with `??`.
2. Add `getGenreClass(genre: string): string` — returns a CSS class name like `'genre-action'` or `'genre-scifi'`. Use `.toLowerCase().replace(/[^a-z]/g, '')` to make it CSS-safe.
3. Add all imports to the `imports[]` array:
   `MovieCardComponent`, `GenreFilterComponent`, `TruncatePipe`, `FilterPipe`, `NgClass`, `NgStyle`, `UpperCasePipe`, `DatePipe`, `CurrencyPipe`, `NgTemplateOutlet`.

### 10b — Build the template (`app.component.html`)

Work through these sections in order:

**Section 1 — `@let` declarations (top of the template)**

```html
@let filteredMovies = movies | filter:selectedGenre;
@let filteredCount  = filteredMovies.length;
```

Both variables are now available throughout the entire template.

**Section 2 — Header**

- Display `{{ filteredCount }}` in the subtitle. Use a ternary to say `'movie'` vs `'movies'`.
- Add `<app-genre-filter>` with `[genres]`, `[activeGenre]`, and `(genreSelected)` bound.

**Section 3 — Movie grid with `@if` / `@else`**

```html
@if (filteredMovies.length > 0) {
  <!-- movie list goes here -->
} @else {
  <ng-container [ngTemplateOutlet]="noResults"></ng-container>
}
```

**Section 4 — `@for` inside the `@if` branch**

```html
@for (movie of filteredMovies; track movie.id) {
  <ng-container>
    <app-movie-card [borderColor]="getGenreColor(movie.genre)">
      <!-- fill the three named slots here -->
    </app-movie-card>
  </ng-container>
}
```

**Section 5 — Fill the three named slots**

Inside `<app-movie-card>`, add three elements. The attribute on each must match the slot's `select`:

| Slot | Attribute to use | What to put inside |
|------|-----------------|-------------------|
| `[movie-poster]` | `movie-poster` | `{{ movie.posterEmoji }}` |
| `[movie-title]` | `movie-title` | `<h2>` and a `<span>` with `[ngClass]` for the badge |
| `[movie-details]` | `movie-details` | Description with `\| truncate:120`, meta row, and `@switch` block |

For the genre badge, use `[ngClass]="getGenreClass(movie.genre)"` and `{{ movie.genre | uppercase }}`.

**Section 6 — `@switch` for the star rating**

```html
@switch (movie.rating) {
  @case (5) { <span>★★★★★</span><span>Masterpiece</span> }
  @case (4) { <span>★★★★☆</span><span>Excellent</span>  }
  @case (3) { <span>★★★☆☆</span><span>Good</span>       }
  @case (2) { <span>★★☆☆☆</span><span>Fair</span>       }
  @default  { <span>★☆☆☆☆</span><span>Poor</span>       }
}
```

**Section 7 — Footer**

Use `{{ filteredCount }}` again. This is the third time you've used the same `@let` variable without re-running `FilterPipe`.

**Section 8 — `ng-template` for the empty state**

After the closing `</div>`, define the empty state template:

```html
<ng-template #noResults>
  <div class="empty-state">
    <p>No movies found for "{{ selectedGenre }}"</p>
    <button (click)="onGenreSelected('All')">Show All Movies</button>
  </div>
</ng-template>
```

> `ng-template` renders nothing by default. It only appears when `[ngTemplateOutlet]="noResults"` references it — which happens in the `@else` branch above.

**Checkpoint:** Click each genre filter button. The movie list updates. Click a genre with no movies — the empty state appears. The footer count stays in sync with the header.

---

## Step 11: Style Everything

Add styles for:

1. **`app.component.css`** — dark grid layout; genre badge colours (`.genre-action`, `.genre-drama`, `.genre-comedy`, `.genre-scifi`, `.genre-thriller`); star colour classes; empty state layout.
2. **`movie-card.component.css`** — two-column grid card (`grid-template-columns: 90px 1fr`); hover lift effect.
3. **`genre-filter.component.css`** — pill-shaped buttons; `.active` state.
4. **`src/styles.css`** — `box-sizing: border-box` reset; dark body background; base font.

**Checkpoint:** The app looks polished. Hover over cards — they lift slightly.

---

## Step 12: Final Checks

Open the browser DevTools console and verify:

- [ ] `MovieCard: projected content is ready` appears once per visible card — that's `ngAfterContentInit` firing
- [ ] Switching genres updates the card count in both the header and the footer
- [ ] A genre with no movies shows the empty state, and clicking "Show All Movies" returns to the full list
- [ ] Movie descriptions are truncated at a word boundary with `…`
- [ ] Dates display as `Mar 15, 2024` (not raw ISO strings)
- [ ] Budgets display as formatted currency (e.g. `$180,000,000.00`)
- [ ] Genre badges display in uppercase (e.g. `SCI-FI`)
- [ ] Star ratings display with the correct label (Masterpiece / Excellent / Good / Fair / Poor)

---

## Extension Challenges

These are optional — try them once the main project is working:

1. **Add a search box** — use a text input with two-way binding (`[(ngModel)]`) to filter by title as well as genre. You'll need `FormsModule` in `imports[]`.
2. **Add a sort toggle** — add a button that sorts `filteredMovies` by rating (highest first) or by release date (newest first). Hint: you can't mutate the pipe's output; sort in the component before binding.
3. **Show a "New" badge** — use `@if` to display a "NEW" badge on movies released in 2024 or later. Use the `date` pipe to extract the year.
4. **Impure filter experiment** — change `FilterPipe` to `pure: false`. Add a button that does `this.movies.push(newMovie)` (direct mutation). Does the pipe now update? Switch back to `pure: true` and use the spread fix instead.

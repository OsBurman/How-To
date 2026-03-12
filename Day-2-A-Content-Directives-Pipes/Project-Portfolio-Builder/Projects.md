# 🎨 Project Portfolio Builder — Day 2 Part A

Build one (or more) of these projects to reinforce what you learned in Day 2 Part A: Content Projection, Directives & Pipes. Each project is designed to be completed in 1–3 hours using only the concepts covered in Day 1 and Day 2 Part A.

---

## Project 1: Recipe Card Collection

**Difficulty:** ⭐ Beginner

Build a recipe browsing app where each recipe is displayed inside a reusable `RecipeCardComponent`. The card uses named `ng-content` slots so the parent can pass in the recipe image/emoji, the title block, and the ingredients list independently. A filter bar lets users show recipes by meal type (Breakfast, Lunch, Dinner, Dessert), and a difficulty badge changes colour based on the recipe's difficulty level.

### Components to create
- `AppComponent` — holds the recipe array and selected meal type filter
- `RecipeCardComponent` — named `ng-content` slots: `[recipe-image]`, `[recipe-title]`, `[recipe-body]`
- `MealFilterComponent` — filter buttons; uses `@Input()` for active filter and `@Output()` to emit selection

### What you'll practice
- Named `ng-content` slots with `select` + `ngAfterContentInit` (log when content is projected)
- `@let filteredRecipes = recipes | filter:mealType` — filtered count used in both header and footer
- `[ngClass]` string shorthand for difficulty badge colours (`badge-easy`, `badge-medium`, `badge-hard`)
- `@switch` on `recipe.difficulty` to render a descriptive label alongside the badge

---

## Project 2: Employee Directory

**Difficulty:** ⭐ Beginner

Build a searchable employee directory that lists staff cards filtered by department. Each card shows the employee's name (formatted with `titlecase`), their start date (formatted with `date:'longDate'`), and their department displayed in `uppercase`. An `@if`/`@else` block shows a "no results" message when the current filter returns an empty list, rendered via an `ng-template` so the empty state markup stays separate from the main list.

### Components to create
- `AppComponent` — holds the employee array and selected department
- `EmployeeCardComponent` — single-slot `ng-content` (the whole card body is projected in)
- `DepartmentFilterComponent` — filter tabs; `@Input()` for genres, `@Output()` for selection

### What you'll practice
- Single-slot `ng-content` projection — the child wraps; the parent fills
- `ng-template #noResults` with `[ngTemplateOutlet]` in the `@else` branch
- Built-in pipes chained: `{{ employee.name | titlecase }}`, `{{ employee.department | uppercase }}`, `{{ employee.startDate | date:'longDate' }}`
- `@let filteredCount = employees | filter:department` — used in the results subtitle and footer

---

## Project 3: Job Board

**Difficulty:** ⭐⭐ Intermediate

Build a job listings board with a reusable `JobCardComponent` that uses three named `ng-content` slots: company logo/emoji, job title block, and job details. Use a custom `TruncatePipe` to keep descriptions under 150 characters. A `@switch` block renders a coloured employment-type badge (`FULL-TIME`, `PART-TIME`, `CONTRACT`). Featured jobs are highlighted with a `[ngStyle]` accent border. Use `@let` to track the count of open vs. closed positions and display it in the header.

### Components to create
- `AppComponent` — holds the jobs array, selected status filter, and `getTypeColor()` helper
- `JobCardComponent` — named `ng-content` slots: `[job-logo]`, `[job-header]`, `[job-details]`; `@Input() accentColor`; `ngAfterContentInit` logs
- `StatusFilterComponent` — filter bar for Open / Closed / All
- `TruncatePipe` — custom pure pipe, word-boundary truncation

### What you'll practice
- Three named `ng-content` slots + `ngAfterContentInit`
- `[ngStyle]` driven by an `@Input()` for per-card accent colour
- `@switch` on `job.type` for badge labels + `[ngClass]` for badge colours
- Custom `TruncatePipe` with parameterised limit: `{{ job.description | truncate:150 }}`

---

## Project 4: Book Shelf

**Difficulty:** ⭐⭐ Intermediate

Build a personal reading list app that lets users track books by status: Want to Read, Reading, and Finished. Use `@switch` on the status to render a different icon and label for each state. Build a custom `WordCountPipe` that counts the approximate words in a book's description and displays it as `"~320 words"`. A genre filter bar (Fiction, Non-Fiction, Biography, etc.) uses a `FilterPipe` to derive the visible list. Use `@let` to define the filtered count once and show it in both the section heading and the footer summary.

### Components to create
- `AppComponent` — holds `books[]`, `selectedGenre`, and `selectedStatus`
- `BookCardComponent` — named `ng-content` slots: `[book-cover]`, `[book-info]`, `[book-actions]`
- `GenreFilterComponent` — pill buttons with `[ngClass]` active state
- `WordCountPipe` — custom pure pipe; splits on whitespace, returns `"~N words"`
- `FilterPipe` — filters by a given property and value

### What you'll practice
- Named `ng-content` slots for a flexible card layout
- `@switch` on `book.status` for icons + labels
- Custom `WordCountPipe` — implement `transform()` with `.split(/\s+/).length`
- Pipe chaining: `{{ book.genre | titlecase }}` and `{{ book.description | wordCount }}`

---

## Project 5: Expense Tracker

**Difficulty:** ⭐⭐ Intermediate

Build a personal expense tracker that displays a list of transactions grouped by category. Use the `currency` pipe on every amount and the `date` pipe on every transaction date. A `@let` block at the top of the template derives the total spent and the number of transactions — both values appear in the header summary and the footer. Use `[ngClass]` object syntax on each row to highlight expenses over a threshold. An `@if`/`@else` block shows a friendly empty state (via `ng-template`) when no transactions exist.

### Components to create
- `AppComponent` — holds `transactions[]` and threshold value
- `TransactionRowComponent` — single-slot `ng-content` for the row content; `@Input() isOver: boolean`
- `SummaryCardComponent` — named `ng-content` slots: `[summary-label]`, `[summary-value]`
- `FilterPipe` — filters transactions by category

### What you'll practice
- `@let totalSpent = transactions | filter:category` — derived value used in 3 places
- `[ngClass]` object syntax: `{ 'over-budget': transaction.amount > threshold }`
- Built-in pipes: `{{ transaction.amount | currency:'GBP' }}`, `{{ transaction.date | date:'dd MMM yyyy' }}`
- `ng-template #emptyState` with `[ngTemplateOutlet]` for the empty list state

---

## Project 6: Sports League Table

**Difficulty:** ⭐ Beginner

Build a football (or any sport) league standings table. Each row shows a team's name (in `titlecase`), points, wins, losses, and draws. Use `@for` with `track team.id` to render the rows and `@switch` on the team's form indicator (`'W'`, `'D'`, `'L'`) to show a coloured form badge. Use `[ngClass]` to highlight the top 4 teams (promotion zone) and the bottom 3 (relegation zone) in different colours. A custom `OrdinalPipe` formats the position number as `"1st"`, `"2nd"`, `"3rd"`, etc.

### Components to create
- `AppComponent` — holds the `teams[]` array sorted by points
- `TeamRowComponent` — single-slot `ng-content`; `@Input() position: number`; `@Input() zone: 'promotion' | 'relegation' | 'mid'`
- `OrdinalPipe` — custom pure pipe; transforms `1` → `'1st'`, `2` → `'2nd'`, etc.

### What you'll practice
- `@for (team of teams; track team.id)` with positional data
- `@switch` on form character (`'W'` / `'D'` / `'L'`) for badge colour + label
- `[ngClass]` string shorthand for zone highlighting (`zone-promotion`, `zone-relegation`, `zone-mid`)
- Custom `OrdinalPipe` — implement the `1st`/`2nd`/`3rd`/`Nth` logic in `transform()`

---

## Project 7: News Feed

**Difficulty:** ⭐⭐ Intermediate

Build a news article feed with a reusable `ArticleCardComponent` that uses named `ng-content` slots for the article image, headline, and body section. Use a custom `TruncatePipe` to limit article summaries to 120 characters. Category filter buttons (Technology, Sport, Politics, Science) drive a `FilterPipe` applied via `@let`. The `date` pipe formats publish dates as `'MMM d, y'`. Use `ng-container` to wrap each card in `@for` without adding extra DOM nodes. Implement `ngAfterContentInit` in `ArticleCardComponent` to log a message — open DevTools and watch how many times it fires as you switch filters.

### Components to create
- `AppComponent` — holds `articles[]`, `selectedCategory`, and `getUrgencyColor()` helper
- `ArticleCardComponent` — named `ng-content` slots: `[article-image]`, `[article-headline]`, `[article-body]`; `@Input() urgencyColor`; `ngAfterContentInit` logs
- `CategoryFilterComponent` — `@Input() categories`, `@Output() categorySelected`
- `TruncatePipe` — custom pure pipe with configurable limit
- `FilterPipe` — filters articles by category

### What you'll practice
- `@let filteredArticles = articles | filter:selectedCategory` with `@let filteredCount = filteredArticles.length`
- Named `ng-content` slots + `ngAfterContentInit` (observe it fires once per projected card)
- `[ngStyle]` on `ArticleCardComponent` for the urgency accent border
- Pipe chaining: `{{ article.category | uppercase }}` and `{{ article.publishedAt | date:'MMM d, y' }}`

---

## General Tips

**Start with the data shape.** Before writing any component, define your TypeScript interface above `AppComponent`. A well-typed interface catches mistakes early and makes the template binding easier to write.

**Use `@let` before the first use.** Declare `@let filteredItems = items | filter:selectedValue` at the very top of the template — before your header — so the variable is in scope everywhere below it.

**Test `ng-content` slots with bright colours first.** When building a new component with named slots, temporarily give each slot a different background colour so you can instantly see whether your content is landing in the right place.

**Pure pipe gotcha — always create a new array reference.** If you add an item to a filtered list by calling `.push()`, nothing updates because the array reference hasn't changed. Use `this.items = [...this.items, newItem]` instead.

**Add `ngAfterContentInit` to every content-projecting component.** Open DevTools and watch the console — seeing the hook fire once per card helps build the mental model of how Angular's lifecycle maps to what's happening in the DOM.

**Build one concept at a time.** Get `@for` working with raw data first. Then add the pipe. Then add `@if`/`@else`. Don't try to wire up all the features simultaneously — incremental checkpoints make debugging much faster.

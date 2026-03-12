# Exercise 9: ⚠️ LEGACY — Convert a Legacy Listing App

**Difficulty:** INTERMEDIATE  
**Concepts practiced:** Recognising `*ngIf`, `*ngFor` with `trackBy`, `[ngSwitch]` / `*ngSwitchCase`, NgModule pipe declarations — converting all to modern Angular 17+ patterns

> **What this exercise is for:** You will be handed a fully working Angular app built with
> the legacy patterns used before Angular 17. Your job is not to master the legacy syntax —
> it is to **recognise** it, understand what it does, and convert it to the modern patterns
> you learned today. After this exercise, you will be able to read legacy codebases and know
> exactly what needs to change.

---

## What You're Building

You are converting a **Book Listing** app from legacy NgModule + structural directives to
modern standalone components with `@if`, `@for`, `@switch`, and standalone pipes.

The legacy app is fully functional — run it first, understand what it does, then convert it.

---

## Legacy → Modern Conversion Map

| Legacy pattern | Modern equivalent |
|---|---|
| `*ngIf="expr"` | `@if (expr) { ... }` |
| `*ngIf="expr; else #ref"` | `@if (expr) { ... } @else { ... }` |
| `*ngFor="let x of list; trackBy: fn"` | `@for (x of list; track x.id) { ... }` |
| `[ngSwitch]="val"` + `*ngSwitchCase` | `@switch (val) { @case ('a') { ... } @default { ... } }` |
| Declared in `AppModule.declarations[]` | `standalone: true` + `imports[]` per component |
| `bootstrapModule(AppModule)` | `bootstrapApplication(AppComponent, appConfig)` |
| `NgModule` with `imports: [BrowserModule]` | `app.config.ts` with `provideRouter()`, `provideHttpClient()` |

---

## Instructions

### Step 1 — Run and study the legacy app

1. Open `Exercise-9-Legacy-NgModule/` in your terminal and run:
   ```
   npm install
   npx ng serve
   ```
2. Explore the running app: it lists books with title, author, genre badge, status badge, formatted price, and a truncated description.
3. Open `src/app/app.module.ts`. Read every line — identify the `declarations`, `imports`, and `bootstrap` arrays. Notice `TruncatePipe` and every component is declared here.
4. Open `src/app/book-list/book-list.component.html`. Find and label each structural directive: `*ngIf`, `*ngFor`, `[ngSwitch]`, `*ngSwitchCase`, `*ngSwitchDefault`.
5. Open `src/app/pipes/truncate.pipe.ts`. Notice it has **no** `standalone: true` — it relies on being declared in `AppModule`.

### Step 2 — Fill in the modern skeleton

Skeleton modern files are already in `src/app/modern/` with TODO comments. Work through them:

**Step 3 — `app.config.ts`**  
Open `src/app/modern/app.config.ts` and uncomment the `appConfig` export.

**Step 4 — Convert `BookListComponent`** (`src/app/modern/book-list/`)
- Open `book-list.component.ts`:
  - Uncomment `standalone: true` in the decorator
  - Add all required imports to the `imports[]` array: `NgClass`, `DatePipe`, `CurrencyPipe`, `UpperCasePipe`, `TruncatePipe`, `StatusBadgeComponent`
- Open `book-list.component.html` and convert the template:
  - Replace `*ngIf="books.length > 0; else emptyState"` with `@if (books.length > 0) { ... } @else { ... }`
  - Replace `*ngFor="let book of books; trackBy: trackById"` with `@for (book of books; track book.id)`
  - The `<ng-template #emptyState>` block becomes the `@else { }` body

**Step 5 — Convert `StatusBadgeComponent`** (`src/app/modern/status-badge/`)
- Open `status-badge.component.ts`:
  - Uncomment `standalone: true`
  - Add `NgClass` to the `imports[]` array
- Open `status-badge.component.html`:
  - Replace the placeholder `<span>{{ status }}</span>` with a proper `@switch` block (see the reference comment in the file)

**Step 6 — Update `main.ts`**  
Open `src/main.ts` and follow the Step 6 instructions in the comment block:
- Replace `platformBrowserDynamic().bootstrapModule(AppModule)` with `bootstrapApplication(AppComponent, appConfig)`
- Import `AppComponent` from `./app/modern/app.component`
- Import `appConfig` from `./app/modern/app.config`

**Step 7 — Verify**  
Restart `npx ng serve` and confirm the converted app looks and behaves exactly like the legacy version.

---

## Acceptance Criteria

- [ ] `AppModule` is no longer used; `bootstrapApplication` is used in `main.ts`
- [ ] All modern components have `standalone: true` and their own `imports` arrays
- [ ] `*ngIf` is replaced with `@if` / `@else`
- [ ] `*ngFor` with `trackBy` is replaced with `@for` using `track book.id`
- [ ] `[ngSwitch]` / `*ngSwitchCase` is replaced with `@switch` / `@case` / `@default`
- [ ] `TruncatePipe` has `standalone: true` and is imported directly into `BookListComponent`
- [ ] The converted app produces the same visual output as the legacy version
- [ ] No console errors

---

## Hints

**Hint 1 — Do not delete legacy files until you're done:** Keep the legacy files alongside
the modern ones while you work. Use the legacy version as a reference for what the output
should look like.

**Hint 2 — Structural directive → block syntax mapping:**
```
*ngIf="expr"               →  @if (expr) { ... }
*ngIf="expr; else #tmpl"   →  @if (expr) { ... } @else { ... }
*ngFor="let x of list;     →  @for (x of list; track x.id) { ... }
  trackBy: fn"
[ngSwitch]="val" +          →  @switch (val) {
  *ngSwitchCase="'a'"            @case ('a') { ... }
                                 @default { ... }
                             }
```

**Hint 3 — Pipe declarations vs imports:** In NgModule, pipes are declared in `declarations`
and shared with all components in the module. In standalone, each component imports the pipes
it uses directly in its own `imports` array.

**Hint 4 — `bootstrapApplication` signature:**
```ts
bootstrapApplication(AppComponent, appConfig)
```
where `appConfig` is exported from `app.config.ts` and contains a `providers` array.

---

## Project Structure

```
Exercise-9-Legacy-NgModule/
├── src/
│   ├── app/
│   │   ├── app.module.ts              ← LEGACY — study this first
│   │   ├── app.component.ts/.html/.css
│   │   ├── book-list/                 ← LEGACY — uses *ngIf, *ngFor
│   │   ├── book-card/                 ← LEGACY — simple display component
│   │   ├── status-badge/              ← LEGACY — uses [ngSwitch]
│   │   ├── pipes/
│   │   │   └── truncate.pipe.ts       ← LEGACY — no standalone: true
│   │   └── modern/                    ← MODERN SKELETON — fill these in
│   │       ├── app.config.ts
│   │       ├── app.component.ts/.html/.css
│   │       ├── book-list/
│   │       ├── status-badge/
│   │       └── pipes/
│   │           └── truncate.pipe.ts   ← MODERN — standalone: true provided
│   ├── index.html
│   ├── main.ts                        ← Update in Step 6
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

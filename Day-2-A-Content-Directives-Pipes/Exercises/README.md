# Day 2 Part A — Exercises

## One-Time Setup

Open a terminal and run the following commands **once** before starting any exercise:

```bash
cd Day-2-A-Content-Directives-Pipes/Exercises
npm install
```

This installs all Angular dependencies into a shared `node_modules/` at this root folder.
Every exercise subfolder uses the same packages — you never need to run `npm install`
inside an individual exercise folder.

## Serving an Exercise

To work on a specific exercise, `cd` into its folder and start the dev server:

```bash
cd Exercise-1-Alert-Box
npx ng serve
```

Then open your browser to `http://localhost:4200`.

## Switching Between Exercises

**Important:** Stop the running dev server (`Ctrl+C`) before switching to a different exercise.
Two `ng serve` processes cannot share port 4200.

## Exercise List

| # | Title | Difficulty | Key Concepts |
|---|-------|------------|--------------|
| 1 | Alert Box | BEGINNER | `ng-content` single slot |
| 2 | Profile Card with Named Slots | BEGINNER | Named `ng-content` slots, `ngAfterContentInit` |
| 3 | Task List with Control Flow | BEGINNER | `@if`/`@else`, `@for`, `ng-template`, `ng-container`, `@let` |
| 4 | Order Status Badge | BEGINNER | `@switch`/`@case`, `[ngClass]` |
| 5 | Style Playground | BEGINNER | `[ngStyle]`, `[ngClass]` |
| 6 | Product Catalogue | BEGINNER | `date`, `currency`, `uppercase` pipes |
| 7 | Build a WordCount Pipe | INTERMEDIATE | Custom pure pipe, pure vs impure behaviour |
| 8 | Event Dashboard | CHALLENGE | Everything combined |
| 9 | ⚠️ LEGACY — Convert a Legacy Listing App | INTERMEDIATE | Legacy → modern conversion |

## Notes

- Exercises build on each other — complete them in order for the best experience.
- Exercise 8 reuses the `ExcerptPipe` from Exercise 7. The starter code includes it, but
  building it yourself first makes Exercise 8 much easier.
- Exercise 9 is a legacy recognition exercise, not a mastery exercise. Attempt it after
  completing Exercises 1–8.

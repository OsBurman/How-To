# Day 1 Part B — Exercises

## One-Time Setup

Open a terminal and run the following commands **once** before starting any exercise:

```bash
cd Day-1-B-Templates-and-Communication/Exercises
npm install
```

This installs all Angular dependencies into a shared `node_modules/` at this root folder.
Every exercise subfolder uses the same packages — you never need to run `npm install`
inside an individual exercise folder.

## Serving an Exercise

To work on a specific exercise, `cd` into its folder and start the dev server:

```bash
cd Exercise-1-Display-and-Bind
npx ng serve
```

Then open your browser to `http://localhost:4200`.

## Switching Between Exercises

**Important:** Stop the running dev server before switching to a different exercise.

1. Press `Ctrl+C` in the terminal to stop the current server.
2. `cd` into the next exercise folder:
   ```bash
   cd ../Exercise-2-Two-Way-Binding
   npx ng serve
   ```

Only one exercise can run on port 4200 at a time. If you forget to stop the server,
the next `npx ng serve` will fail with a "port already in use" error.

## Exercise List

| # | Folder | Difficulty | Concepts |
|---|--------|------------|----------|
| 1 | Exercise-1-Display-and-Bind | Beginner | Interpolation, property binding, event binding |
| 2 | Exercise-2-Two-Way-Binding | Beginner | Two-way binding, FormsModule, interpolation |
| 3 | Exercise-3-Template-Refs | Beginner | Template reference variables, event binding |
| 4 | Exercise-4-Safe-Navigation | Beginner | Safe navigation `?.`, nullish coalescing `??` |
| 5 | Exercise-5-Parent-Child | Intermediate | @Input(), @Output(), EventEmitter |
| 6 | Exercise-6-Lifecycle-Hooks | Intermediate | ngOnInit, ngOnDestroy, @Input(), interval cleanup |
| 7 | Exercise-7-Signals-Preview | Beginner | signal(), computed(), .set(), .update() |
| 8 | Exercise-8-Feedback-Form | Challenge | All binding types, @Input/@Output, ngOnInit, refs, ?. ?? |
| 9 | Exercise-9-Notification-Center | Challenge | All binding types, @Input/@Output, ngOnInit/ngOnDestroy, ?. ?? |
| 10 | Exercise-10-Legacy-NgModule | Intermediate | ⚠️ LEGACY — NgModule, declarations, bootstrapModule |

## Solutions

After completing an exercise, compare your work with the solution files in
`Day-1-B-Templates-and-Communication/Exercises-Solutions/`. Each solution folder
contains only the files you needed to create or modify.

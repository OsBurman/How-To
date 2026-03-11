# Day 1 Part A — Exercises

## One-Time Setup

Open a terminal and run the following commands **once** before starting any exercise:

```bash
cd D1A/Exercises
npm install
```

This installs all Angular dependencies into a shared `node_modules/` at this root folder.
Every exercise subfolder uses the same packages — you never need to run `npm install`
inside an individual exercise folder.

## Serving an Exercise

To work on a specific exercise, `cd` into its folder and start the dev server:

```bash
cd Exercise-1-Scaffold-and-Explore
npx ng serve
```

Then open your browser to `http://localhost:4200`.

## Switching Between Exercises

**Important:** Stop the running dev server before switching to a different exercise.

1. Press `Ctrl+C` in the terminal to stop the current server.
2. `cd` into the next exercise folder:
   ```bash
   cd ../Exercise-2-Your-First-Component
   npx ng serve
   ```

Only one exercise can run on port 4200 at a time. If you forget to stop the server,
the next `ng serve` will fail with a "port already in use" error.

## Exercise List

| # | Folder | Difficulty |
|---|--------|------------|
| 1 | Exercise-1-Scaffold-and-Explore | Beginner |
| 2 | Exercise-2-Your-First-Component | Beginner |
| 3 | Exercise-3-Fix-the-Error | Beginner |
| 4 | Exercise-4-Passing-Data-with-Input | Intermediate |
| 5 | Exercise-5-Multiple-Components | Intermediate |
| 6 | Exercise-6-Scoped-Styles | Intermediate |
| 7 | Exercise-7-ViewEncapsulation | Intermediate |
| 8 | Exercise-8-Team-Roster | Challenge |
| 9 | Exercise-9-Legacy-NgModule | Intermediate (Legacy) |

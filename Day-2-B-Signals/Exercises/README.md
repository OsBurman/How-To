# Day 2 Part B — Exercises

## One-Time Setup

Open a terminal and run the following commands **once** before starting any exercise:

```bash
cd Day-2-B-Signals/Exercises
npm install
```

This installs all Angular dependencies into a shared `node_modules/` at this root folder.
Every exercise subfolder uses the same packages — you never need to run `npm install`
inside an individual exercise folder.

## Serving an Exercise

To work on a specific exercise, `cd` into its folder and start the dev server:

```bash
cd Exercise-1-Counter
npx ng serve
```

Then open your browser to `http://localhost:4200`.

## Switching Between Exercises

**Important:** Stop the running dev server before switching to a different exercise.

1. Press `Ctrl+C` in the terminal to stop the current server.
2. `cd` into the next exercise folder:
   ```bash
   cd ../Exercise-2-Cart-Total
   npx ng serve
   ```

Only one exercise can run on port 4200 at a time. If you forget to stop the server,
the next `npx ng serve` will fail with a "port already in use" error.

## Exercise List

| # | Folder | Difficulty | Key Concepts |
|---|--------|------------|--------------|
| 1 | `Exercise-1-Counter` | BEGINNER | `signal()`, `.set()`, `.update()`, `computed()` |
| 2 | `Exercise-2-Cart-Total` | BEGINNER | `computed()` — multiple derived signals |
| 3 | `Exercise-3-Temperature` | BEGINNER | `computed()` — multiple derived values from one source |
| 4 | `Exercise-4-Search-Effect` | INTERMEDIATE | `signal()`, `computed()`, `effect()` with cleanup |
| 5 | `Exercise-5-Rating-Input` | INTERMEDIATE | Signal-based `input()`, readonly constraint, `input.required()` |
| 6 | `Exercise-6-Tag-Selector` | INTERMEDIATE | Signal-based `output()`, `.emit()`, immutable array updates |
| 7 | `Exercise-7-Volume-Slider` | INTERMEDIATE | `model()`, two-way `[()]` binding |
| 8 | `Exercise-8-Change-Detection-Lab` | INTERMEDIATE | Fine-grained change detection observation |
| 9 | `Exercise-9-Convert-NgOnChanges` | INTERMEDIATE | Converting `ngOnChanges` + `@Input()` to signals |
| 10 | `Exercise-10-Legacy-NgModule` ⚠️ LEGACY | INTERMEDIATE | Full NgModule → standalone + signals conversion |

## Tips

- Read the `README.md` inside each exercise folder for full instructions, acceptance criteria, and hints.
- Don't look at the solutions until you've made a genuine attempt — the struggle is where the learning happens.
- Exercises 1–3 are independent drills. Exercises 4–9 build on each other conceptually — do them in order.
- Exercise 10 is a legacy conversion. Run the legacy app first so you know what you're converting to.

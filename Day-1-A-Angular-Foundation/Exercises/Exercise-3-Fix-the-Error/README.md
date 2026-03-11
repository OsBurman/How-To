# Exercise 3: Trigger the Error, Fix the Error

**Difficulty:** BEGINNER
**Concepts practiced:** Triggering and fixing the "not a known element" error, The imports array — adding and removing dependencies

## What You're Building

You'll deliberately break an app to see the exact "not a known element" error in the browser console, then fix it. This trains you to recognize and resolve the #1 beginner mistake in Angular.

## Starter Code

This project already has a `BannerComponent` pre-built in `src/app/banner/` — but it is **deliberately not imported** into `AppComponent`. The template already references `<app-banner>`, so the app will throw an error when you serve it.

## Instructions

1. Open `src/app/app.component.html`. You'll see `<app-banner></app-banner>` is already in the template.
2. Open `src/app/app.component.ts`. Notice that `BannerComponent` is **not** in the `imports` array — it's deliberately missing.
3. Serve the app: `npx ng serve`.
4. Open the browser and check the **browser console** (F12 → Console tab). You should see the error:
   `NG8001: 'app-banner' is not a known element`.
5. Read the error message carefully. Note what it says about `@Component.imports`.
6. Now fix it: add the `import` statement at the top of `app.component.ts` and add `BannerComponent` to the `imports` array.
7. Save. The browser auto-reloads. The error is gone and the banner appears.
8. **Bonus break:** Now open the `imports` array again and remove `BannerComponent` (but leave the `import` statement at the top). Save. Does the error return? (Yes — the `imports` array is what matters.)

## Acceptance Criteria

- [ ] You saw the `NG8001: 'app-banner' is not a known element` error in the console
- [ ] After your fix, the banner renders with no console errors
- [ ] You understand that the `imports` array (not just the `import` statement) is required

## Hints

**Hint 1 — Where to look for the error:** Open Chrome DevTools with F12 and click the Console tab. Angular errors show up there, not in the terminal where `ng serve` runs.

**Hint 2 — The import path:** The banner component is at `./banner/banner.component`, so the import statement is: `import { BannerComponent } from './banner/banner.component';`

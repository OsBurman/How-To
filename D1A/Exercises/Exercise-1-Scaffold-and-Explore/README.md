# Exercise 1: Scaffold and Explore

**Difficulty:** BEGINNER
**Concepts practiced:** Generating a project with the CLI, Navigating the file structure, bootstrapApplication and app.config.ts

## What You're Building

Nothing visual yet — this exercise is about understanding the file structure of an Angular project. You'll open an existing scaffolded project, identify each file's purpose, and add comments proving you found the right things.

## Instructions

1. Open this folder in your editor. This is a pre-scaffolded Angular project — the same structure `ng new` generates.
2. Open `src/main.ts`. Find the `bootstrapApplication()` call. Add a comment above it: `// This is the entry point — it starts the app with AppComponent`.
3. Open `src/app/app.config.ts`. Find the `providers` array. Add a comment inside it: `// Empty for now — providers go here on Days 3–4`.
4. Open `src/app/app.component.ts`. Find the `selector` property. Add a comment next to it: `// This matches <app-root> in index.html`.
5. Open `src/index.html`. Find the `<app-root>` tag. Add a comment above it: `<!-- Angular renders AppComponent here -->`.
6. Serve the app: `npx ng serve`. Open `http://localhost:4200` and confirm you see the default page.

## Acceptance Criteria

- [ ] `src/main.ts` has your comment above `bootstrapApplication()`
- [ ] `src/app/app.config.ts` has your comment inside the `providers` array
- [ ] `src/app/app.component.ts` has your comment next to the `selector`
- [ ] `src/index.html` has your comment above `<app-root>`
- [ ] The app loads at `http://localhost:4200` with no console errors

## Hints

**Hint 1 — Where is main.ts?:** Look in `src/main.ts`, not `src/app/main.ts`. It sits at the `src/` root, one level above the `app/` folder.

**Hint 2 — bootstrapApplication arguments:** The function takes two arguments — the root component class and the config object. Both are imported at the top of the file.

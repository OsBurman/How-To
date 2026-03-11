# Exercise 2: Your First Component

**Difficulty:** BEGINNER
**Concepts practiced:** Creating standalone components with ng generate, Rendering multiple components in AppComponent, The imports array

## What You're Building

A `GreetingComponent` that displays a welcome message. You'll generate the component with the CLI, write a simple template, and render it inside `AppComponent`.

## Instructions

1. Open a terminal in this folder.
2. Generate a new component: `npx ng generate component greeting` (shorthand: `npx ng g c greeting`).
3. Open `src/app/greeting/greeting.component.html`. Replace the generated content with:
   ```html
   <section class="greeting-box">
     <h2>Welcome to Angular!</h2>
     <p>This is my very first component.</p>
   </section>
   ```
4. Open `src/app/greeting/greeting.component.css`. Add a style to make it visible:
   ```css
   .greeting-box {
     padding: 1.5rem;
     background-color: #e8f5e9;
     border-radius: 8px;
     margin: 1rem;
   }
   ```
5. Open `src/app/app.component.ts`. Import `GreetingComponent` at the top and add it to the `imports` array.
6. Open `src/app/app.component.html`. Add `<app-greeting></app-greeting>` inside the template.
7. Serve the app (`npx ng serve`) and confirm you see the green greeting box on the page.

## Acceptance Criteria

- [ ] The `src/app/greeting/` folder exists with `.ts`, `.html`, `.css`, and `.spec.ts` files
- [ ] `GreetingComponent` has `standalone: true` in its decorator
- [ ] `AppComponent`'s `imports` array includes `GreetingComponent`
- [ ] The browser shows the green box with "Welcome to Angular!" text

## Hints

**Hint 1 — Selector name:** `ng generate component greeting` creates a component with selector `app-greeting`. Use `<app-greeting></app-greeting>` in the parent template.

**Hint 2 — Two-step import:** You need both the `import { GreetingComponent } from './greeting/greeting.component';` statement at the top AND `GreetingComponent` in the `imports: [...]` array. Missing either one causes an error.

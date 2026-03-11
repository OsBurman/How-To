# Exercise 4: Passing Data with @Input()

**Difficulty:** INTERMEDIATE
**Concepts practiced:** @Input() for passing data into a component, Rendering multiple components in AppComponent, The imports array

## What You're Building

An `InfoCardComponent` that accepts a `heading` and a `body` via `@Input()`. You'll render three cards in `AppComponent`, each with different content — proving the same component can display different data depending on what the parent passes in.

## Instructions

1. A starter `AppComponent` is provided — review its current files.
2. Generate a new component: `npx ng generate component info-card`.
3. Open `src/app/info-card/info-card.component.ts`. Add two `@Input()` properties:
   ```typescript
   @Input() heading: string = '';
   @Input() body: string = '';
   ```
   You'll need to import `Input` from `@angular/core`.
4. Open `src/app/info-card/info-card.component.html`. Display both inputs:
   ```html
   <div class="card">
     <h3>{{ heading }}</h3>
     <p>{{ body }}</p>
   </div>
   ```
5. Open `src/app/info-card/info-card.component.css`. Style the card:
   ```css
   .card {
     padding: 1rem;
     margin: 0.5rem;
     border: 1px solid #ccc;
     border-radius: 8px;
     background-color: #fff;
   }
   .card h3 { color: #1a1a2e; margin: 0 0 0.5rem; }
   .card p { color: #555; margin: 0; }
   ```
6. Open `src/app/app.component.ts`. Import `InfoCardComponent` and add it to `imports`.
7. Open `src/app/app.component.html`. Render three cards with different data:
   ```html
   <h1>My Dashboard</h1>
   <app-info-card heading="Angular" body="A component-based framework by Google."></app-info-card>
   <app-info-card heading="TypeScript" body="A typed superset of JavaScript."></app-info-card>
   <app-info-card heading="Node.js" body="A JavaScript runtime for servers."></app-info-card>
   ```
8. Serve (`npx ng serve`) and confirm you see three distinct cards with different content.

## Acceptance Criteria

- [ ] `InfoCardComponent` has `@Input() heading` and `@Input() body` properties
- [ ] `AppComponent` renders three `<app-info-card>` elements with different text
- [ ] All three cards appear in the browser with correct headings and body text
- [ ] No console errors

## Hints

**Hint 1 — Importing Input:** You need `import { Component, Input } from '@angular/core';` — add `Input` to the existing import.

**Hint 2 — Static vs dynamic binding:** When passing a plain string (not a component property), you can use `heading="Angular"` without square brackets. Square brackets like `[heading]="someVariable"` evaluate an expression from the component class.

# Exercise 7: ViewEncapsulation — None vs Emulated

**Difficulty:** INTERMEDIATE
**Concepts practiced:** ViewEncapsulation and scoped styles, The imports array, Creating standalone components with ng generate

## What You're Building

You'll observe what happens when a component uses `ViewEncapsulation.None` — its styles leak globally and affect other components. Then you'll switch it back to Emulated and see the leak disappear.

## Starter Code

This project already has two components wired up:
- **StyledBoxComponent** — has `ViewEncapsulation.None` and CSS that makes `h3` orange and italic
- **UnstyledBoxComponent** — uses default encapsulation and has no `h3` styles

Both are already imported and rendered in `AppComponent`. You don't need to generate anything.

## Instructions

1. Open `src/app/styled-box/styled-box.component.ts`. Notice it has `encapsulation: ViewEncapsulation.None`.
2. Open `src/app/styled-box/styled-box.component.css`. It sets `h3 { color: #ff6f00; font-style: italic; }`.
3. Open `src/app/unstyled-box/unstyled-box.component.ts`. It has **no** `encapsulation` property (uses the default Emulated).
4. Open `src/app/unstyled-box/unstyled-box.component.html`. It also has an `<h3>` tag.
5. Serve the app: `npx ng serve`.
6. **Observe:** The `<h3>` in `UnstyledBoxComponent` is also orange and italic — even though `UnstyledBoxComponent` has no CSS targeting `h3`. The styles leaked from `StyledBoxComponent` because `ViewEncapsulation.None` makes styles global.
7. Now fix it: open `styled-box.component.ts` and change `encapsulation: ViewEncapsulation.None` to `encapsulation: ViewEncapsulation.Emulated` (or simply remove the `encapsulation` line entirely).
8. Save. The `UnstyledBoxComponent`'s `<h3>` returns to its default browser styling.

## Acceptance Criteria

- [ ] With `ViewEncapsulation.None`, both `<h3>` elements are orange and italic
- [ ] After changing to `ViewEncapsulation.Emulated`, only `StyledBoxComponent`'s `<h3>` is styled
- [ ] `UnstyledBoxComponent`'s `<h3>` returns to its default appearance
- [ ] You can explain why `None` caused the style leak

## Hints

**Hint 1 — Importing ViewEncapsulation:** Make sure you have `import { Component, ViewEncapsulation } from '@angular/core';` at the top of the file.

**Hint 2 — Removing the property:** You can either change `ViewEncapsulation.None` to `ViewEncapsulation.Emulated`, or remove the `encapsulation` line entirely — `Emulated` is the default.

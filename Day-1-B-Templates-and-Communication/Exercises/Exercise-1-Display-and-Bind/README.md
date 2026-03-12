# Exercise 1: Display and Bind

**Difficulty:** BEGINNER
**Concepts practiced:** Interpolation `{{ }}`, property binding `[]`, event binding `()`

## What You're Building

A greeting card component that displays a user's name via interpolation, disables a button
via property binding when the name is empty, and responds to a button click via event binding.
This exercise practices three of the four binding types individually before combining them.

## Instructions

1. Open `Exercise-1-Display-and-Bind/` and explore the starter code. The `AppComponent` has
   a `userName` property set to `'Angela'` and a `clickCount` property set to `0`.
2. Open `app.component.html`. Find the `<h1>` element and use **interpolation** to display:
   `Hello, {{ userName }}!`
3. Below the heading, find the `<p>` element. Use interpolation to display:
   `You have clicked {{ clickCount }} times.`
4. Find the `<button>` element. Add **property binding** to set its `disabled` property:
   `[disabled]="userName.length === 0"`. This disables the button when the name is empty.
5. On the same button, add **event binding**: `(click)="onGreet()"`. Open `app.component.ts`
   and implement the `onGreet()` method so that it increments `clickCount` by 1.
6. Below the button, find the second `<p>` tag. Use **interpolation** with an expression:
   `{{ clickCount > 0 ? 'Thanks for clicking!' : 'Go ahead, click the button.' }}`
7. Save all files and run `npx ng serve`. Verify the greeting shows "Hello, Angela!", the
   button is enabled, and clicking it updates the count.
8. Test the property binding: in `app.component.ts`, temporarily change `userName` to `''`.
   Save and verify the button becomes disabled.

## Acceptance Criteria

- [ ] The heading displays the user's name via interpolation
- [ ] The click count updates on every button click
- [ ] The button is disabled when `userName` is an empty string
- [ ] The conditional message changes after the first click
- [ ] No TypeScript errors in the console

## Hints

**Hint 1 — Interpolation:** `{{ }}` evaluates any TypeScript expression — properties, math,
ternaries, and method calls all work.

**Hint 2 — Property binding:** `[disabled]="expression"` sets the DOM `disabled` property to
the boolean result of the expression. No quotes around `true`/`false` — Angular evaluates
the expression.

**Hint 3 — Event binding:** `(click)="onGreet()"` calls the `onGreet` method on the component
class. Make sure the method exists and is `public` (the default).

# Exercise 2: Profile Card with Named Slots

**Difficulty:** BEGINNER
**Concepts practiced:** Named `ng-content` slots with `select`, `ngAfterContentInit`

## What You're Building

A `ProfileCardComponent` with three named content slots: a header (avatar and name), a body
(bio text), and a footer (action buttons). The parent fills each slot independently.
`ngAfterContentInit` logs a message to the console when projection is complete.

## Setup

```bash
cd Day-2-A-Content-Directives-Pipes/Exercises
npm install        # only needed once for the whole workspace

cd Exercise-2-Profile-Card
npx ng serve
```

Open `http://localhost:4200`. You will see a profile card shell with no content in any
of the three regions — the slots are not wired up yet.

## Instructions

1. Open `src/app/profile-card/profile-card.component.html`. Find the three `<!-- TODO -->` comments.
   - Replace the first with: `<ng-content select="[card-header]"></ng-content>`
   - Replace the second with: `<ng-content select="[card-body]"></ng-content>`
   - Replace the third with: `<ng-content select="[card-footer]"></ng-content>`

2. Save and verify: Priya's avatar, name, bio, and buttons should now appear in the correct regions.

3. Open `src/app/profile-card/profile-card.component.ts`:
   - Add `AfterContentInit` to the import from `'@angular/core'`
   - Add `implements AfterContentInit` to the class declaration
   - Implement `ngAfterContentInit(): void` and call `console.log('Profile card content projected!')`

4. Open browser DevTools (F12). Reload the page. Confirm the log message appears.

5. Go back to `src/app/app.component.html`. Uncomment the second `<app-profile-card>` block.
   Save and verify the log fires **twice** — once per card instance.

6. Experiment: try removing the `card-body` attribute from Priya's bio `<div>`. Save and confirm
   the body region goes blank — Angular ignores content that doesn't match a slot selector.

## Acceptance Criteria

- [ ] Three named `<ng-content select="...">` slots appear in `profile-card.component.html`
- [ ] The parent uses matching attribute selectors to place content in the correct slots
- [ ] `ngAfterContentInit` is implemented and logs a message to the console
- [ ] The log appears once per component instance (twice when two cards are rendered)
- [ ] Content without a matching slot attribute does not appear
- [ ] No console errors

## Hints

**Hint 1 — select syntax:** `select="[card-header]"` is a CSS attribute selector. It matches
any element with the attribute `card-header` — regardless of the element's tag name.

**Hint 2 — Implement the interface:** Import `AfterContentInit` from `@angular/core`, add
`implements AfterContentInit` to the class, then add the `ngAfterContentInit()` method.

**Hint 3 — ngAfterContentInit vs ngOnInit:** `ngOnInit` fires *before* content is projected.
`ngAfterContentInit` fires *after* — that is the hook that guarantees the slots are filled.

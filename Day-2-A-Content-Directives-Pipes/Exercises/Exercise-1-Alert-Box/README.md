# Exercise 1: Wrap It Up

**Difficulty:** BEGINNER
**Concepts practiced:** `ng-content` single-slot projection

## What You're Building

An `AlertBoxComponent` that wraps any projected content in a styled alert card. The parent
decides what message goes inside — the component just provides the border, icon, and padding.
This exercise builds the muscle memory for `ng-content` before named slots are introduced.

## Setup

```bash
cd Day-2-A-Content-Directives-Pipes/Exercises
npm install        # only needed once for the whole workspace

cd Exercise-1-Alert-Box
npx ng serve
```

Open `http://localhost:4200`. You will see a bare page with three `<app-alert-box>` elements
rendered but **no content inside them**. The content is there — it's just being silently
discarded because the component has no `<ng-content>` placeholder yet.

## Instructions

1. Open `src/app/alert-box/alert-box.component.html`. Find the `<!-- TODO -->` comment inside the `.alert-box` div.
2. Replace the comment with a single `<ng-content></ng-content>` element.
3. Save the file. The browser should hot-reload. All three alert boxes should now show their projected content.
4. Verify: the first shows a heading and paragraph, the second shows a plain text message, the third shows a list.
5. Open `src/app/alert-box/alert-box.component.css`. Uncomment the `border-left` and `background` properties (or write your own styles) to give the wrapper a visible appearance.
6. Confirm that the wrapper's styles apply to all three boxes, but the projected content itself is unstyled by the wrapper.

## Acceptance Criteria

- [ ] `<ng-content>` appears exactly once in `alert-box.component.html`
- [ ] All three alert boxes in `app.component.html` display their projected content
- [ ] The alert box wrapper applies its own styles (border, padding, background)
- [ ] The projected content inherits no unwanted styles from the wrapper
- [ ] No console errors

## Hints

**Hint 1 — What ng-content does:** `<ng-content>` is a placeholder. Angular replaces it with
whatever HTML the parent put between the component's opening and closing tags.

**Hint 2 — No imports needed:** `ng-content` is a built-in Angular instruction, not a
directive. You do not import anything to use it.

**Hint 3 — Nothing to see without it:** If you remove `<ng-content>`, the projected HTML is
silently discarded. No error, just silence. This is Angular's default behaviour.

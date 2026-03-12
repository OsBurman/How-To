# Exercise 2: Two-Way Binding with ngModel

**Difficulty:** BEGINNER
**Concepts practiced:** Two-way binding `[(ngModel)]`, `FormsModule` import, interpolation

## What You're Building

A live message preview component. A `<textarea>` is bound to a `message` property via
two-way binding. As the user types, a preview paragraph updates in real time, and a
character count displays below it.

## Instructions

1. Open `Exercise-2-Two-Way-Binding/`. The starter code has an `AppComponent` with a
   `message: string = ''` property and a `maxLength: number = 100` property.
2. Open `app.component.ts`. Notice the `imports` array in the `@Component` decorator —
   it's empty. You need to add `FormsModule` here so `[(ngModel)]` works.
3. At the top of the file, add: `import { FormsModule } from '@angular/forms';`
4. Add `FormsModule` to the `imports` array: `imports: [FormsModule]`.
5. Open `app.component.html`. Find the `<textarea>` element. Add two-way binding:
   `[(ngModel)]="message"`.
6. Below the textarea, find the preview `<p>` element. Use interpolation to display:
   `Preview: {{ message }}`
7. Below that, update the character count `<p>`:
   `{{ message.length }} / {{ maxLength }} characters`
8. Add class binding on the textarea: `[class.over-limit]="message.length > maxLength"`.
9. Save and run `npx ng serve`. Type in the textarea — the preview and count should update
   with every keystroke.
10. Test two-way binding: the preview is empty when the page loads (because `message` is
    `''`), and typing immediately shows text in both places.

## Acceptance Criteria

- [ ] `FormsModule` is imported in the component's `imports` array
- [ ] The textarea is bound with `[(ngModel)]="message"`
- [ ] The preview paragraph updates on every keystroke
- [ ] The character count displays current length and max
- [ ] The `over-limit` CSS class appears when the message exceeds `maxLength`
- [ ] No console errors

## Hints

**Hint 1 — FormsModule:** Without `FormsModule` in the component's `imports` array,
`[(ngModel)]` silently does nothing. No error, just no binding. This is the #1 beginner trap.

**Hint 2 — Two-way syntax:** The "banana in a box" is `[()]` — square brackets outside,
parentheses inside. `[(ngModel)]="message"` means Angular reads AND writes `message`.

**Hint 3 — Class binding:** `[class.over-limit]="expression"` adds the CSS class `over-limit`
when the expression is `true`, and removes it when `false`.

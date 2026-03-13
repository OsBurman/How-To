# Exercise 6 — Tag Selector

**Difficulty:** Intermediate | **Type:** Generate

## Goal

Build a `TagListComponent` that emits selected tags via `output()`, and wire it to a parent `AppComponent` that stores the selection in a `signal<string[]>([])` using the immutable spread pattern.

## What You'll Practice

- Declaring `output<T>()` and calling `.emit()`
- Passing a signal input with `input<T[]>([])`
- Storing an array in a `signal()` and updating it immutably with `.update(arr => [...arr, item])`
- Removing items immutably with `.update(arr => arr.filter(...))`
- Parent-to-child `[input]` binding and child-to-parent `(output)` binding

## Your Tasks

### In `tag-list/tag-list.component.ts`

1. Add `input` and `output` are already imported — declare them as class properties:
   - `readonly availableTags = input<string[]>([])`
   - `readonly tagSelected = output<string>()`
2. Implement `onTagClick(tag: string): void` — call `this.tagSelected.emit(tag)`

### In `tag-list/tag-list.component.html`

3. Replace the placeholder with an `@for` loop over `availableTags()`. Each `<button>` calls `onTagClick(tag)` on click.

### In `app.component.ts`

4. Declare `readonly selectedTags = signal<string[]>([])`
5. Implement `onTagSelected(tag: string): void` — use `.update(tags => [...tags, tag])`. Guard against duplicates with `if (!this.selectedTags().includes(tag))`.
6. Implement `removeTag(tag: string): void` — use `.update(tags => tags.filter(t => t !== tag))`

### In `app.component.html`

7. Replace the placeholder `<p>` with `<app-tag-list [availableTags]="availableTags" (tagSelected)="onTagSelected($event)" />`
8. Replace the selected tags placeholder with an `@for` loop over `selectedTags()`. Include a Remove `<button>` calling `removeTag(tag)`.

## Expected Result

- Clicking a tag adds it to the selected list (once only — no duplicates)
- Clicking × removes the tag
- The `TagListComponent` never directly modifies the selected list — it only emits an event

## ⚠️ Key Rule

Never call `.push()` on a signal's array. Angular cannot detect mutation. Always use `.update(arr => [...arr, newItem])` to produce a new array reference.

## Run It

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

# Exercise 5: Parent-Child Communication

**Difficulty:** INTERMEDIATE
**Concepts practiced:** `@Input()`, `@Output()`, `EventEmitter`, property binding `[]`, event binding `()`

## What You're Building

A color picker app with an `AppComponent` (parent) and a `ColorSwatchComponent` (child).
The parent passes a color name and hex code to each swatch via `@Input()`. When the user
clicks a swatch, the child emits the selected color to the parent via `@Output()`, and the
parent displays which color was selected.

## Instructions

1. Open `Exercise-5-Parent-Child/`. The starter code has `AppComponent` with a `colors` array
   of objects: `{ name: string; hex: string }[]` and a `selectedColor: string = ''` property.
   A `ColorSwatchComponent` exists in `src/app/color-swatch/` with TODO comments.
2. Open `color-swatch.component.ts`. Add two `@Input()` properties:
   - `colorName: string = ''`
   - `hexCode: string = '#000000'`
3. Add an `@Output()` property: `colorSelected = new EventEmitter<string>()`.
4. Add an `onSelect()` method that calls `this.colorSelected.emit(this.colorName)`.
5. Open `color-swatch.component.html`. Update the `<div>` with:
   - Property binding: `[style.background-color]="hexCode"` to set the background
   - Event binding: `(click)="onSelect()"` to emit on click
   - Interpolation: `{{ colorName }}` to display the color name
6. Open `app.component.html`. The starter has TODO comments showing where to render the
   swatches. For each color, add an `<app-color-swatch>` element with:
   - `[colorName]="'Crimson'"` (repeat for each color with correct values)
   - `[hexCode]="'#DC143C'"` (repeat with correct hex codes)
   - `(colorSelected)="onColorSelected($event)"`
7. Open `app.component.ts`. Implement `onColorSelected(color: string)` to set
   `this.selectedColor = color`.
8. In `app.component.html`, display:
   `Selected: {{ selectedColor || 'Click a swatch to choose' }}`
9. Don't forget to add `ColorSwatchComponent` to `AppComponent`'s `imports` array.
10. Save and run. Click any swatch — the selected color name should appear in the parent.

## Acceptance Criteria

- [ ] `ColorSwatchComponent` has `@Input() colorName` and `@Input() hexCode`
- [ ] `ColorSwatchComponent` has `@Output() colorSelected` with `EventEmitter<string>`
- [ ] Each swatch displays its color name and has the correct background color
- [ ] Clicking a swatch emits the color name to the parent
- [ ] The parent displays the selected color name
- [ ] `ColorSwatchComponent` is in `AppComponent`'s `imports` array
- [ ] No "not a known element" errors

## Hints

**Hint 1 — @Input():** `@Input() colorName: string = ''` marks the property as receivable.
The parent sets it with `[colorName]="'Crimson'"`.

**Hint 2 — @Output():** `@Output() colorSelected = new EventEmitter<string>()` creates the
event channel. Call `this.colorSelected.emit(value)` to fire it. The parent catches it with
`(colorSelected)="handler($event)"`.

**Hint 3 — imports array:** If you see "app-color-swatch is not a known element," add
`ColorSwatchComponent` to the `imports` array in `app.component.ts`.

**Hint 4 — Style binding:** `[style.background-color]="hexCode"` is property binding
targeting an inline style. Angular sets the element's `background-color` CSS property to
the value of `hexCode`.

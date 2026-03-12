# Exercise 5 — Style Playground

**Concepts practiced:** `[ngStyle]`, `[ngClass]`

## Setup

```bash
# From the Exercises/ workspace root
npm install
npx nx serve exercise-5-style-playground
# or
cd Exercise-5-Style-Playground && npx ng serve
```

Open your browser at **http://localhost:4200**

## What you'll build

A live text-preview panel controlled by sliders, colour pickers, and checkboxes. Changes to the controls update the preview box's appearance in real time using `[ngStyle]` and `[ngClass]`.

## Your Tasks

All your work is in `src/app/app.component.html` and `src/app/app.component.css`.
The component class (`app.component.ts`) and all controls are already complete — do not change them.

---

### Step 1 — Add `[ngStyle]` to the preview box

Find the `<!-- TODO Step 1 -->` comment on the `.preview-box` div.

Add `[ngStyle]` to bind the component's `fontSize`, `textColor`, and `bgColor` properties as inline styles:

```html
[ngStyle]="{ 'font-size.px': fontSize, 'color': textColor, 'background-color': bgColor }"
```

> **Note:** `'font-size.px'` is Angular's unit-suffix syntax — it automatically appends `px` to the value.

After this step, moving the slider and changing the colour pickers should update the preview text.

---

### Step 2 — Add `[ngClass]` to the preview box

On the same `.preview-box` div, add `[ngClass]` to conditionally apply CSS classes:

```html
[ngClass]="{ 'text-bold': isBold, 'high-contrast': highContrast }"
```

The object syntax maps class names to boolean expressions. When `isBold` is `true`, the `text-bold` class is added; when `false`, it is removed.

---

### Step 3 — Define the CSS classes

Open `app.component.css`. You'll find two stub classes at the bottom:

- `.text-bold` — already has `font-weight: bold`; customise further if you like
- `.high-contrast` — replace the `outline` stub with your own high-contrast design

Ideas for `.high-contrast`:
```css
.high-contrast {
  background-color: #000 !important;
  color: #fff !important;
  letter-spacing: 0.05em;
}
```

---

## Acceptance Criteria

- [ ] Moving the font-size slider changes the text size in the preview
- [ ] Changing the colour pickers updates text and background colour
- [ ] Checking "Bold text" applies `.text-bold` via `[ngClass]`
- [ ] Checking "High contrast mode" applies `.high-contrast` via `[ngClass]`
- [ ] No TypeScript errors

## Key Difference: `[ngStyle]` vs `[ngClass]`

| | `[ngStyle]` | `[ngClass]` |
|---|---|---|
| Sets | Inline CSS properties | CSS class names |
| Best for | Dynamic values (numbers, runtime colours) | Feature flags, state toggles |
| Overrides | Higher specificity than classes | Lower specificity than inline |

Use `[ngClass]` whenever the logic can be expressed as CSS classes. Reach for `[ngStyle]` only when the value is dynamic (e.g., a number from user input).

## Bonus

- Add a `fontFamily` property and a `<select>` to choose between `sans-serif`, `serif`, and `monospace`
- Add a fourth class toggle (e.g., `isItalic`) with its own checkbox

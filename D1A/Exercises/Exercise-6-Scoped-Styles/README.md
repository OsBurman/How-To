# Exercise 6: Scoped Styles in Action

**Difficulty:** INTERMEDIATE
**Concepts practiced:** ViewEncapsulation and scoped styles, Creating standalone components with ng generate, The imports array

## What You're Building

Two sibling components — `AlertBoxComponent` and `InfoBoxComponent` — that both style an `<h3>` element with completely different colors. You'll prove that styles in one component do not leak into the other thanks to Angular's ViewEncapsulation.

## Instructions

1. Generate two components:
   ```
   npx ng g c alert-box
   npx ng g c info-box
   ```
2. **AlertBoxComponent:**
   - `alert-box.component.html`:
     ```html
     <div class="box">
       <h3>Alert!</h3>
       <p>Something important happened.</p>
     </div>
     ```
   - `alert-box.component.css`:
     ```css
     .box { padding: 1rem; margin: 1rem; border: 2px solid #d32f2f; border-radius: 8px; background-color: #ffebee; }
     h3 { color: #d32f2f; margin: 0 0 0.5rem; }
     p { color: #b71c1c; margin: 0; }
     ```

3. **InfoBoxComponent:**
   - `info-box.component.html`:
     ```html
     <div class="box">
       <h3>Info</h3>
       <p>Here is some helpful information.</p>
     </div>
     ```
   - `info-box.component.css`:
     ```css
     .box { padding: 1rem; margin: 1rem; border: 2px solid #1565c0; border-radius: 8px; background-color: #e3f2fd; }
     h3 { color: #1565c0; margin: 0 0 0.5rem; }
     p { color: #0d47a1; margin: 0; }
     ```

4. Import both into `AppComponent`'s `imports` array.
5. In `app.component.html`, render them:
   ```html
   <h1>Style Encapsulation Demo</h1>
   <app-alert-box></app-alert-box>
   <app-info-box></app-info-box>
   ```
6. Serve (`npx ng serve`). Confirm the alert box is red and the info box is blue — even though both target `h3` and `.box`.
7. **Investigate:** Open Chrome DevTools (F12), click on the `<h3>` inside `AlertBoxComponent`, and look at the element attributes. You should see something like `_ngcontent-abc-123` — that's Angular's scoping attribute.

## Acceptance Criteria

- [ ] `AlertBoxComponent`'s `<h3>` is red (#d32f2f)
- [ ] `InfoBoxComponent`'s `<h3>` is blue (#1565c0)
- [ ] Both components use the same class name `.box` and element selector `h3` without conflict
- [ ] You can see Angular's `_ngcontent-*` attribute in the DevTools Elements panel

## Hints

**Hint 1 — Why no conflict?:** Both components style `h3 { color: ... }`, but Angular rewrites this to `h3[_ngcontent-xyz] { color: ... }` — each component gets its own unique attribute. The styles simply cannot match elements in other components.

**Hint 2 — ViewEncapsulation.Emulated is the default:** You don't need to set `encapsulation` explicitly. Angular uses Emulated mode automatically. The scoping "just works."

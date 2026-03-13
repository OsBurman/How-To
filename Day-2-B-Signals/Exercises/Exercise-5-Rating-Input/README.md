# Exercise 5 — Configurable Rating Display

**Difficulty:** Intermediate | **Type:** Generate

## Goal

Build a `RatingDisplayComponent` that accepts signal inputs for `rating`, `maxStars`, and a required `label`, then uses `computed()` to derive the star array. The parent `AppComponent` uses a slider to drive the rating live.

## What You'll Practice

- Declaring `input<T>(defaultValue)` for optional signal inputs
- Declaring `input.required<T>()` for required signal inputs
- Using `computed()` to derive display data from inputs
- Understanding that required inputs are enforced at compile time

## Your Tasks

### In `rating-display/rating-display.component.ts`

1. Add `input` and `computed` to the `@angular/core` import
2. Declare `readonly rating = input<number>(0)`
3. Declare `readonly maxStars = input<number>(5)`
4. Declare `readonly label = input.required<string>()` *(no default — parent must provide it)*
5. Declare `readonly stars = computed(...)`:
   ```typescript
   readonly stars = computed(() =>
     Array.from({ length: this.maxStars() }, (_, i) => ({
       filled: i < this.rating()
     }))
   );
   ```

### In `rating-display/rating-display.component.html`

6. Replace the placeholder with:
   ```html
   <div class="rating-wrapper">
     <p class="rating-label">{{ label() }}</p>
     <div class="stars">
       @for (star of stars(); track $index) {
         <span [class.star-filled]="star.filled"
               [class.star-empty]="!star.filled">
           {{ star.filled ? '★' : '☆' }}
         </span>
       }
     </div>
   </div>
   ```

### In `app.component.html`

7. Remove the plain `<app-rating-display />` and add two instances with bindings:
   ```html
   <app-rating-display [rating]="score()" [maxStars]="5"  label="Your Score"  />
   <app-rating-display [rating]="score()" [maxStars]="10" label="Out of 10"   />
   ```

> ⚠️ **Notice:** After step 4, `label` is a required input. Angular's template compiler will show an error on `<app-rating-display />` until you provide the binding in step 7. This is the type system working correctly.

## Expected Result

- Moving the slider fills the correct number of stars in both instances
- The `Out of 10` instance shows 10 stars with the same filled count
- Omitting the `label` binding is a **compile-time error**

## Run It

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

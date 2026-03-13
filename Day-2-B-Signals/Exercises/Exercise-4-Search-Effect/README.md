# Exercise 4 — Search Box with Effect

**Difficulty:** Intermediate | **Type:** Generate

## Goal

Wire a search input to a `signal()`, derive filtered results with `computed()`, and use `effect()` with a debounced `setTimeout` to log searches to the console with automatic cleanup.

## What You'll Practice

- Wiring a text input to a signal
- Filtering an array inside `computed()`
- Registering a reactive side effect with `effect()`
- Debouncing with `setTimeout` inside an effect
- Returning a cleanup function from an effect to cancel pending timers

## Your Tasks

### In `app.component.ts`

1. Add `computed` and `effect` to the `@angular/core` import
2. Declare `readonly results = computed(...)` — filter `countries` by `query()` (case-insensitive), return full list when query is empty
3. Declare `readonly resultCount = computed(...)` — return `results().length`
4. Add an `effect()` in the constructor that debounces a `console.log` of the query and count by 300 ms, and returns `clearTimeout` as cleanup

### In `app.component.html`

5. Wire the text input:
   ```html
   [value]="query()"
   (input)="query.set($any($event.target).value)"
   ```
6. Replace the placeholder section with the real result list:
   ```html
   <p class="result-count">{{ resultCount() }} result(s)</p>
   <ul>
     @for (country of results(); track country) {
       <li>{{ country }}</li>
     }
   </ul>
   ```

## Expected Result

- Typing in the box filters the list in real time
- Result count updates on every keystroke
- The browser console logs the query + count after a 300 ms pause (no duplicate logs for fast typing)

## Run It

```bash
npm install
npm start
```

Then open `http://localhost:4200` and the browser DevTools console.

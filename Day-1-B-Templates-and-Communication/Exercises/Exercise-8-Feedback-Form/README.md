# Exercise 8: Feedback Form Challenge

**Difficulty:** CHALLENGE
**Concepts practiced:** All four binding types, template reference variables, `@Input()`, `@Output()`, `EventEmitter`, `ngOnInit`, safe navigation `?.`, nullish coalescing `??`

## What You're Building

A feedback form app with two components. A `FeedbackFormComponent` (child) accepts a `productName` via `@Input()`, uses two-way binding for a rating textarea, a template ref for a reviewer name input, and emits the completed feedback to `AppComponent` (parent) via `@Output()`. The parent displays submitted feedback using safe navigation and nullish coalescing for graceful handling.

## Instructions

1. Open `feedback-form.component.ts`:
   - Add `@Input() productName: string = ''`
   - Add a `displayTitle: string = ''` property
   - Add `@Output() feedbackSubmitted = new EventEmitter<{ reviewer: string; product: string; comment: string; rating: number }>()`
   - In `ngOnInit()`, build: `this.displayTitle = 'Review: ' + this.productName`
   - Add a `comment: string = ''` property for two-way binding
   - Import `FormsModule` in the component's `imports` array

2. Open `feedback-form.component.html`:
   - Display `{{ displayTitle }}` as the heading
   - Add `[(ngModel)]="comment"` on the textarea
   - Add `#reviewerInput` on the name input and `#ratingSelect` on the select
   - Add `(click)="onSubmit(reviewerInput.value, ratingSelect.value)"` on the submit button
   - Add `[disabled]="comment.length === 0"` on the submit button
   - Show live character count: `{{ comment.length }}`

3. Implement `onSubmit(reviewer: string, ratingStr: string)` in the component class:
   ```typescript
   this.feedbackSubmitted.emit({
     reviewer: reviewer || 'Anonymous',
     product: this.productName,
     comment: this.comment,
     rating: parseInt(ratingStr, 10)
   });
   ```

4. Open `app.component.html`:
   - Render `<app-feedback-form [productName]="'Angular Course'" (feedbackSubmitted)="onFeedback($event)">`
   - Display last feedback with safe navigation:
     - `{{ lastFeedback?.reviewer ?? 'No feedback yet' }}`
     - `{{ lastFeedback?.comment ?? '' }}`
     - `{{ lastFeedback?.rating ?? 'N/A' }}`

5. Open `app.component.ts`:
   - Add `lastFeedback: { reviewer: string; product: string; comment: string; rating: number } | null = null`
   - Implement `onFeedback(fb: ...)` to set `this.lastFeedback = fb`
   - Add `FeedbackFormComponent` to `AppComponent`'s `imports` array

6. Save and run. Fill out the form and submit — feedback appears in the parent.

## Acceptance Criteria

- [ ] `FeedbackFormComponent` receives `productName` via `@Input()`
- [ ] `displayTitle` is built in `ngOnInit` (not the constructor)
- [ ] Two-way binding keeps the textarea and `comment` in sync
- [ ] Template refs `#reviewerInput` and `#ratingSelect` are used on form inputs
- [ ] Submit button is disabled when comment is empty (property binding)
- [ ] Clicking submit emits a feedback object via `@Output()`
- [ ] Parent displays feedback using `?.` and `??` — no crashes before first submission
- [ ] `FormsModule` is in `FeedbackFormComponent`'s imports
- [ ] `FeedbackFormComponent` is in `AppComponent`'s imports

## Hints

**Hint 1 — All four binding types:** This exercise uses interpolation (`{{ displayTitle }}`), property binding (`[disabled]`), event binding (`(click)`), and two-way binding (`[(ngModel)]`). All in one component.

**Hint 2 — Mixed approach:** The textarea uses two-way binding (constant sync for preview). The reviewer input uses a template ref (read only at submit time). Both approaches are valid — use the one that fits.

**Hint 3 — ngOnInit:** Build `displayTitle` in `ngOnInit`, not the constructor. If you do it in the constructor, `productName` will still be `''` and your title will be wrong.

**Hint 4 — Safe navigation in parent:** `lastFeedback` starts as `null`. Without `?.`, accessing `lastFeedback.reviewer` crashes. With `?.` and `??`, you get "No feedback yet" instead.

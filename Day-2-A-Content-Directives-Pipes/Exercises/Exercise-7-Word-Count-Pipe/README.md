# Exercise 7 — Build a Word Count Pipe

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Custom pure pipe with `transform()`, `@Pipe` decorator, `PipeTransform`, pure vs impure pipe behaviour

## Setup

```bash
# From the Exercises/ workspace root
npm install
cd Exercise-7-Word-Count-Pipe && npx ng serve
```

Open your browser at **http://localhost:4200**

## What you'll build

Two custom pipes and a demonstration of pure pipe behaviour with array mutation.

---

## Part A — WordCountPipe

### Goal
Build a pipe that counts words in a string and returns `"N words"`.

### Steps

1. Open `src/app/pipes/word-count.pipe.ts`. The `@Pipe` decorator and stub are in place.
2. Implement `transform(value: string): string`:
   - Trim the string: `value.trim()`
   - Split on whitespace: `.split(/\s+/)`
   - Filter out empty strings (handles edge cases with extra spaces)
   - Return `"N words"` — e.g., `"12 words"`
3. Save and type in the textarea. The stat bar should update live.

---

## Part B — ExcerptPipe

### Goal
Build a pipe that truncates a string at the nearest word boundary before a configurable character limit, appending `"…"` if truncated.

### Steps

4. Open `src/app/pipes/excerpt.pipe.ts`. Implement `transform(value: string, limit: number = 80): string`:
   - If `value.length <= limit`, return `value` unchanged
   - Find the last space at or before `limit`:
     ```typescript
     const cutIndex = value.lastIndexOf(' ', limit);
     ```
   - Slice to `cutIndex` (or to `limit` if no space found) and append `'…'`
5. Save. The article excerpt in the browser should be truncated at a word boundary, not mid-word.
6. Try different limits in the template: `excerpt:50`, `excerpt:200`.

---

## Part C — Pure Pipe Mutation Observation

### Goal
Observe that a pure pipe does NOT re-run when you mutate its input array in place — then fix it.

### Steps

7. Click **Add Note** a few times. Notice the new notes do NOT appear in the list, even though they are added to the array.
8. Open `src/app/app.component.ts`. Find `addNote()`. Replace the `this.notes.push(...)` line with:
   ```typescript
   this.notes = [...this.notes, this.newNote];
   // New reference required — pure pipe only re-runs when input reference changes
   ```
9. Save and click **Add Note** again. Notes now appear immediately.

### Why it happens

A pure pipe only re-runs when the **reference** of its input changes. `Array.push()` mutates the existing array — the reference stays the same. Angular's change detection sees no reference change, so the pipe is not re-run. Spreading into a new array (`[...arr, item]`) creates a new reference, which triggers the pipe.

---

## Acceptance Criteria

- [ ] `WordCountPipe` counts words correctly, including strings with multiple consecutive spaces
- [ ] `WordCountPipe` returns `"N words"` format (e.g., `"12 words"`)
- [ ] `ExcerptPipe` truncates at a word boundary — never mid-word
- [ ] `ExcerptPipe` accepts an optional `limit` argument (default `80`)
- [ ] `ExcerptPipe` appends `'…'` when truncation occurs; returns value unchanged when within limit
- [ ] Both pipes have `@Pipe({ standalone: true, pure: true })`
- [ ] The mutation fix is in place and commented
- [ ] No console errors

## Bonus

- Add a character count alongside the word count in the stat bar
- Add a sentence count (split on `.`, `!`, `?` and filter empty segments)
- Make `ExcerptPipe` accept a custom ellipsis string as a third argument

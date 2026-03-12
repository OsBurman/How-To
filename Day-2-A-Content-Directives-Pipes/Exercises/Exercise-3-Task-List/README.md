# Exercise 3: Task List with Control Flow

**Difficulty:** BEGINNER
**Concepts practiced:** `@if` / `@else`, `ng-template`, `@for` with `track`, `ng-container`, `@let`

## What You're Building

A task list that renders each task with `@for`, shows an empty-state message via `@else` when
the list is empty, and uses `@let` to compute a count of incomplete tasks displayed in both
the header and a summary line — without computing it twice.

## Setup

```bash
cd Day-2-A-Content-Directives-Pipes/Exercises
npm install        # only needed once for the whole workspace

cd Exercise-3-Task-List
npx ng serve
```

Open `http://localhost:4200`. You will see a placeholder task list item. Your job is to
replace it with real control flow.

## Instructions

All your work is in `src/app/task-list/task-list.component.html`. Follow the numbered TODO
steps in that file in order:

**Step 1 — @let:** Uncomment and complete the `@let` line at the top of the template to
define `incompleteTasks` using the `FilterPipe`.

**Step 2 — Use `incompleteTasks.length` in the header** badge instead of the hardcoded `0`.

**Step 3 — @if / @else:** Wrap the `<ul>` in an `@if (tasks.length > 0)` block with an
`@else` that renders the `#emptyState` ng-template.

**Step 4 — ng-template:** Below the `<ul>`, add `<ng-template #emptyState>` with a paragraph
saying "No tasks yet. Add one above." Give the paragraph the `class="empty-state"`.

**Step 5 — @for:** Replace the placeholder `<li>` with `@for (task of tasks; track task.id)`.

**Step 6 — ng-container:** Inside each loop `<li>`, use `<ng-container>` to group the
`.task-title` and `.task-due` spans without adding a wrapper element.

**Step 7 — @let a second time:** Replace the hardcoded `0` in the summary paragraph with
`{{ incompleteTasks.length }}` to demonstrate `@let` is available throughout the template.

**Step 8 — Test the empty state:** Temporarily change `tasks` to `[]` in the component.
Verify the empty state renders. Restore the array.

## Acceptance Criteria

- [ ] `@let` defines `incompleteTasks` and is used in at least two places
- [ ] `@if` / `@else` with an `ng-template` handles the empty state
- [ ] `@for` iterates over tasks using `track task.id`
- [ ] `ng-container` is used inside the loop
- [ ] Setting `tasks = []` shows the ng-template fallback
- [ ] No console errors

## Hints

**Hint 1 — @let scope:** `@let` is scoped to the template block where it is defined. Defined
at the root level, it is available everywhere in the template.

**Hint 2 — ng-template for @else:** Write `<ng-template #emptyState>...</ng-template>` then
reference it: `@if (tasks.length > 0) { ... } @else { <ng-template [ngTemplateOutlet]="emptyState"></ng-template> }`.

**Hint 3 — ng-container:** `<ng-container>` is completely invisible in the rendered DOM. Use
it when you need to group siblings without adding a wrapper element.

**Hint 4 — track is required:** `@for` will not compile without a `track` expression. Use
`track task.id` — `id` is a stable, unique identifier.

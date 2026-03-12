# Exercise 3: Template Reference Variables

**Difficulty:** BEGINNER
**Concepts practiced:** Template reference variables `#ref`, event binding `()`, passing ref values to handlers

## What You're Building

A quick-add form with two inputs — a task name and a priority selector — and an "Add"
button. Instead of two-way binding, you'll use template reference variables to read the
input values only when the button is clicked.

## Instructions

1. Open `Exercise-3-Template-Refs/`. The `AppComponent` has a `tasks` array (type
   `{ name: string; priority: string }[]`) initialized to `[]` and a
   `lastAdded: string = ''` property.
2. Open `app.component.html`. Find the text input for the task name. Add a template
   reference variable: `#taskInput`.
3. Find the `<select>` element for priority. Add a template reference variable:
   `#prioritySelect`.
4. Find the "Add Task" button. Add event binding:
   `(click)="onAddTask(taskInput.value, prioritySelect.value)"`.
5. Open `app.component.ts`. Implement the `onAddTask(name: string, priority: string)` method:
   - Push `{ name, priority }` into `this.tasks`
   - Set `this.lastAdded` to the task name
6. Back in the template, find the "Last added" paragraph. Use interpolation to show:
   `Last added: {{ lastAdded }}`
7. Find the task count paragraph. Display: `Total tasks: {{ tasks.length }}`
8. Save and run. Type a task name, select a priority, click "Add Task." The count should
   increase and the last added name should display.

## Acceptance Criteria

- [ ] `#taskInput` is on the text input element
- [ ] `#prioritySelect` is on the select element
- [ ] Clicking "Add Task" reads both values and adds to the array
- [ ] The "Last added" text updates after each click
- [ ] The task count reflects the total items in the array
- [ ] No `FormsModule` import needed — this exercise uses refs, not ngModel

## Hints

**Hint 1 — Template refs:** `#taskInput` gives you a reference to the DOM element. Access
its value with `taskInput.value` anywhere in the template.

**Hint 2 — Passing to handlers:** `(click)="onAddTask(taskInput.value, prioritySelect.value)"`
reads the values at click time and passes them as arguments. The handler receives plain strings.

**Hint 3 — Refs vs ngModel:** Template refs read values on demand (when an event fires).
Two-way binding syncs constantly on every keystroke. Use refs when you only need the value
at a specific moment — like form submission.

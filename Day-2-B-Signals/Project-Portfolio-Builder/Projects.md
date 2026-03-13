# Day 2 Part B — Project Portfolio Builder

Practice projects to reinforce the signal patterns you learned today.
Each project is designed to be completable in 1–3 hours and produces something
you can show as a portfolio piece.

---

## Project 1: Habit Tracker

**Difficulty:** ⭐ Beginner

Build a daily habit tracker where users add habits, mark them complete, and see a
live completion percentage for the day. Each habit has a name and a completed flag.
The percentage and count of remaining habits are computed signals derived from the habit list.

### Components to create
- `AppComponent` — owns the habits signal and renders the tracker
- `HabitRowComponent` — displays a single habit; uses `model()` for the completed toggle
- `HabitFormComponent` — text input + submit button; `output()` emits a new habit name

### What you'll practice
- `signal<Habit[]>([])` with immutable `.update()` (spread to add, filter to remove)
- `computed()` for total count, completed count, and percentage
- `model<boolean>()` in `HabitRowComponent` so toggling a habit writes back to the parent's array
- `effect()` with cleanup to persist habits to `localStorage` with a debounce

---

## Project 2: Countdown Timer

**Difficulty:** ⭐ Beginner

Build a configurable countdown timer. The user enters a duration in seconds, starts
and stops the timer, and watches the remaining time count down in real time. When the
timer reaches zero, a "Time's up!" message appears.

### Components to create
- `AppComponent` — owns `remainingSeconds = signal<number>(0)` and the running state
- `TimerDisplayComponent` — receives remaining seconds via `input()`; shows MM:SS formatted time
- `TimerControlsComponent` — start/pause/reset buttons; `output()` events for each action

### What you'll practice
- `signal()` with `.set()` and `.update()` for the countdown state
- `computed()` for the formatted MM:SS display string and the `isFinished` flag
- `effect()` with `setInterval` and a mandatory `clearInterval` cleanup return
- `input()` in `TimerDisplayComponent` for one-way data flow from parent

---

## Project 3: Shopping List with Categories

**Difficulty:** ⭐ Beginner

Build a grocery shopping list where items have a name, category (produce, dairy, pantry),
and a checked-off state. A category filter lets users view all items or one category at a
time. The filtered list and counts are computed signals.

### Components to create
- `AppComponent` — owns `items = signal<Item[]>([])` and `activeCategory = signal<string>('all')`
- `ItemListComponent` — `@for` over the computed filtered list; `output()` for toggle and remove
- `AddItemFormComponent` — description + category select + submit; `output()` emits the new item
- `CategoryFilterComponent` — renders category buttons; `model<string>()` for active category

### What you'll practice
- `computed()` with filter logic reading two signals (items + activeCategory)
- `computed()` for per-category counts shown in each filter button label
- `model<string>()` in `CategoryFilterComponent` for the selected category
- Immutable `.update()` pattern for toggling checked state without mutating in place

---

## Project 4: Tip Calculator with Split

**Difficulty:** ⭐ Beginner

Build a tip calculator that computes subtotal, tip amount, total, and per-person amount
as the user adjusts the bill amount, tip percentage, and number of people. Every output
value is a `computed()` signal — no manual recalculation needed.

### Components to create
- `AppComponent` — owns `billAmount`, `tipPercent`, and `splitCount` signals
- `NumberInputComponent` — reusable labeled number input using `model<number>()` for two-way binding
- `ResultsCardComponent` — receives computed values via `input()`; displays formatted currency amounts

### What you'll practice
- `model<number>()` in `NumberInputComponent` so it can be reused for all three inputs
- `computed()` chain: `tipAmount → total → perPerson`, each reading prior computed signals
- `input()` in `ResultsCardComponent` for displaying derived values passed from the parent
- Built-in `currency` pipe combined with signal-driven values in the template

---

## Project 5: Color Mixer

**Difficulty:** ⭐⭐ Intermediate

Build an RGB color mixer with three range sliders (red, green, blue). A preview box
displays the mixed color in real time. The hex code and a human-readable label
(e.g., "warm red", "cool blue") are derived from the three channel signals.

### Components to create
- `AppComponent` — owns `red`, `green`, and `blue` signals (0–255 each)
- `ChannelSliderComponent` — range input + label + current value; `model<number>()` for the channel value
- `ColorPreviewComponent` — receives hex string via `input()`; renders the preview box and hex label

### What you'll practice
- `model<number>()` in `ChannelSliderComponent` — reuse the same component three times
- `computed()` for the hex string (`#RRGGBB`) derived from all three channel signals
- `computed()` for the `[ngStyle]` object `{ 'background-color': hexColor() }` on the preview
- `effect()` to log each color change to the console with a cleanup that clears a debounce timer

---

## Project 6: Kanban Board (Lite)

**Difficulty:** ⭐⭐ Intermediate

Build a three-column Kanban board with To Do, In Progress, and Done columns. Users add
tasks, drag them between columns by clicking arrow buttons, and see per-column counts in
each column header. All board state lives in a single `tasks` signal.

### Components to create
- `AppComponent` — owns `tasks = signal<Task[]>([])` and passes computed column arrays down
- `KanbanColumnComponent` — `input()` for column title and task list; `output()` events for move-forward, move-back, and remove
- `TaskCardComponent` — displays a single task; `output()` for action buttons
- `AddTaskFormComponent` — text input + submit; `output()` emits a new task title

### What you'll practice
- `computed()` for each column's filtered task array and count — three separate computed signals
- `signal.update()` with immutable spread to change a task's status without mutating in place
- `output()` events bubbling from `TaskCardComponent` → `KanbanColumnComponent` → `AppComponent`
- `effect()` with `localStorage` persistence and clearTimeout cleanup

---

## Project 7: Quiz App

**Difficulty:** ⭐⭐ Intermediate

Build a multi-question quiz with a question counter, per-question answer selection, a score
tracker, and a results screen at the end. The current question, selected answer, score, and
progress percentage are all signals or computed signals — the template never calls methods
to get values.

### Components to create
- `AppComponent` — owns `currentIndex = signal<number>(0)`, `answers = signal<(string | null)[]>([])`, and the questions array
- `QuestionCardComponent` — `input()` for the question object; `model<string | null>()` for the selected answer
- `ProgressBarComponent` — `input()` for percentage; renders the filled bar with `[style.width.%]`
- `ResultsScreenComponent` — `input()` for score and total; shows final score and a restart `output()`

### What you'll practice
- `computed()` for score (count correct answers), progress percentage, and `isFinished` flag
- `model<string | null>()` in `QuestionCardComponent` so selecting an answer writes back to the parent's answers array
- `input()` throughout — data flows down; events flow up
- `effect()` to auto-advance to the results screen when `isFinished()` becomes true

---

## General Tips

**Start with the signal architecture, not the UI.**
Before writing any template, sketch which component owns each signal and which signals are computed. Once ownership is clear, wiring the components together is straightforward.

**Computed signals replace methods.**
If you find yourself writing a method that returns a value (like `getTotal()` or `getFilteredItems()`), ask whether it should be a `computed()` signal instead. If the template calls it, it should almost certainly be a `computed()`.

**One source of truth.**
Pick one place to store each piece of state. Avoid copying signal values into other signals — derive them with `computed()` instead.

**`model()` is for reusable inputs.**
If you have a component that wraps a single `<input>` or `<select>` element and you want to use it in multiple places, `model()` is the right tool. It lets the parent own the value while the child provides the UI.

**`effect()` always needs cleanup if you use timers or intervals.**
The pattern is always:
```typescript
effect(() => {
  const timer = setTimeout(() => { /* side effect */ }, delay);
  return () => clearTimeout(timer); // this runs before the next execution
});
```
Forgetting the cleanup is the most common bug with `effect()`.

**Keep components small.**
If a component's template is getting long or its class has more than 3–4 signals, split it. Smaller components are easier to reason about and make the signal flow more obvious.

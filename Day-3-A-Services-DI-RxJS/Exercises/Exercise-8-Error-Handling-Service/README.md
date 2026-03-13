# Exercise 8 – Error-Handling Service

## Goal

Build a `TaskService` whose methods use `try/catch` to catch errors and push them into an `error$` BehaviorSubject. Wire that error stream into the component using `toSignal` so the template can display an error banner reactively.

## What's Already Set Up

- `Task` interface: `{ id, title, completed }`
- `TaskService` with `tasks$` and `error$` as `BehaviorSubject` fields
- Method stubs: `addTask`, `completeTask`, `deleteTask`, with detailed TODO comments
- `triggerCorruptTask()` is **fully implemented** — it deliberately throws so you can see the error flow without implementing anything
- The template is **fully built** — error banner, task list, add form, trigger button

## Your Tasks

### Task 1 — Implement `addTask(title)` in TaskService

```typescript
addTask(title: string): void {
  this.errorBs$.next(null);
  try {
    const current = this.tasksBs$.getValue();
    const newTask: Task = { id: Date.now(), title, completed: false };
    this.tasksBs$.next([...current, newTask]);
  } catch (err) {
    this.errorBs$.next(err instanceof Error ? err.message : 'Failed to add task');
  }
}
```

### Task 2 — Implement `completeTask(id)` and `deleteTask(id)`

Same pattern — clear the error, wrap in try/catch, use immutable array operations:

- `completeTask`: `tasks.map(t => t.id === id ? { ...t, completed: true } : t)`
- `deleteTask`: `tasks.filter(t => t.id !== id)`

### Task 3 — Wire signals in AppComponent

Replace the stub signals with real `toSignal()` conversions:

```typescript
readonly tasks = toSignal(this.taskService.tasks$, { initialValue: [] as Task[] });
readonly error = toSignal(this.taskService.error$, { initialValue: null });
```

Add `toSignal` to your import from `'@angular/core/rxjs-interop'`.

### Task 4 — Implement the three handler methods

Each handler calls the matching service method. `addTask` should also clear `newTaskTitle` after calling the service.

## Expected Behaviour

1. Page loads with 2 starter tasks
2. Add a task → appears in the list
3. Click ✓ → task fades and shows strikethrough
4. Click ✕ → task is removed
5. Click "Trigger Corrupt Task" → red error banner appears with the error message

## Key Patterns

| Pattern | Why |
|---------|-----|
| `try/catch` in service | Errors are contained in the service, not leaked to the component |
| `error$` BehaviorSubject | Errors are just another piece of reactive state |
| `toSignal(error$, { initialValue: null })` | Component reads errors declaratively — no subscribe needed |
| Immutable updates (`[...arr, item]`, `.map()`, `.filter()`) | Never mutate the array inside BehaviorSubject |

## Getting Started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

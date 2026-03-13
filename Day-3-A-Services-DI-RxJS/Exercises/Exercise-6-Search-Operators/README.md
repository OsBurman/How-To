# Exercise 6 – Search with debounceTime + switchMap

## Goal

Build a live search filter using three RxJS operators: `debounceTime`, `switchMap`, and `tap` — wired together with `takeUntilDestroyed`.

## What's Already Set Up

- A `Subject<string>` field (`search$`) that receives every keystroke from the input
- Two signals: `results` (displayed matches) and `log` (pipeline event log)
- A `filterLanguages()` method stub that returns an empty array
- A private `addLog()` helper you can call inside `tap` operators
- The template is **fully built** — you only need to implement the TypeScript

## Your Tasks

### Task 1 — Build the pipeline in the constructor

In the `constructor()`, connect `search$` to a pipeline:

```
this.search$.pipe(
  tap(term => this.addLog(`Keystroke: "${term}"`)),
  debounceTime(400),
  tap(term => this.addLog(`Searching for: "${term}"`)),
  switchMap(term => this.filterLanguages(term)),
  takeUntilDestroyed(this.destroyRef)
).subscribe(matches => this.results.set(matches));
```

### Task 2 — Add missing imports

Add `debounceTime`, `switchMap`, and `tap` to your RxJS imports at the top of the file.

### Task 3 — Implement `filterLanguages`

Replace the stub with a real filter:

```typescript
private filterLanguages(term: string): Observable<string[]> {
  return of(
    LANGUAGES.filter(lang => lang.toLowerCase().includes(term.toLowerCase()))
  );
}
```

## Expected Behaviour

1. Type in the search box — the Pipeline Log shows a **Keystroke** line immediately
2. Pause typing for 400ms — a **Searching for** line appears and results update
3. If you type quickly, only the *last* term after the pause triggers a search

## Key Concepts

| Operator | What it does |
|----------|-------------|
| `tap` | Side effects (logging) without changing the stream value |
| `debounceTime(400)` | Waits 400ms of silence before letting the value through |
| `switchMap` | Maps each value to an inner Observable; cancels any previous inner Observable |
| `takeUntilDestroyed` | Automatically unsubscribes when the component is destroyed |

## Getting Started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

# Exercise 1: Your First Service

**Difficulty:** BEGINNER
**Concepts practiced:** `@Injectable({ providedIn: 'root' })`, `inject()` in a component, basic `BehaviorSubject`, `toSignal()`

## What You're Building

A color palette app. A `PaletteService` holds a list of color names in a `BehaviorSubject`. The `AppComponent` injects the service using `inject()`, reads the list with `toSignal()`, and renders each color as a swatch.

The starter gives you an `AppComponent` with TODO comments and an empty `PaletteService` stub. You implement the service and wire up the component.

## Instructions

1. Open `src/app/services/palette.service.ts`. It contains a stub class with a `@Injectable` decorator but no implementation.
2. Add a `BehaviorSubject<string[]>` initialized with the colors: `['Crimson', 'Teal', 'Gold', 'Slate', 'Coral']`.
3. Expose it as a read-only Observable named `colors$`.
4. Open `src/app/app.component.ts`. Inject `PaletteService` using `inject()` — no constructor.
5. Use `toSignal(this.paletteService.colors$, { initialValue: [] })` to create a `colors` signal.
6. In `app.component.html`, use `@for (color of colors(); track color)` to render each color name in a `<li>`.
7. In `app.component.css`, add a `.swatch` class (a TODO comment is already there to guide you).

## Acceptance Criteria

- [ ] `PaletteService` has `@Injectable({ providedIn: 'root' })`
- [ ] `AppComponent` uses `inject()` — no constructor
- [ ] The color list renders in the template
- [ ] The template uses `@for` with `track`
- [ ] `toSignal()` includes `initialValue: []`

## Hints

- `inject()` goes at the class body level, not inside a method: `private readonly paletteService = inject(PaletteService);`
- `BehaviorSubject` lives in `rxjs`: `import { BehaviorSubject } from 'rxjs';`
- Expose the Observable with `.asObservable()` so components can't push values directly

## Setup

```bash
npm install
npm start
```

## Solution

Compare your work with `Day-3-A-Services-DI-RxJS/Exercises-Solutions/Exercise-1-Solution/`.

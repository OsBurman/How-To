# Day 3 Part A — Services, DI & RxJS — Exercises

10 exercises covering `@Injectable`, `inject()`, `BehaviorSubject`, RxJS operators, `takeUntilDestroyed()`, `toSignal()`, and the async pipe null gotcha.

## Exercises

| # | Title | Difficulty |
|---|-------|------------|
| 1 | Your First Service | BEGINNER |
| 2 | Shared Counter State | BEGINNER |
| 3 | Observable Playground | BEGINNER |
| 4 | Notification Service with Auto-Dismiss | INTERMEDIATE |
| 5 | The async Pipe Gotcha → Fix with toSignal() | INTERMEDIATE |
| 6 | Search with debounceTime + switchMap | INTERMEDIATE |
| 7 | combineLatest — Live Price Calculator | INTERMEDIATE |
| 8 | Error-Handling Service | INTERMEDIATE |
| 9 | inject() in a Functional Guard | CHALLENGE |
| 10 | ⚠️ LEGACY — Convert NgModule App to Modern Standalone | INTERMEDIATE |

Read the full exercise instructions in [D3A-exercises.md](./D3A-exercises.md).

## Setup

### Install all exercise dependencies at once

```bash
npm install
```

This uses npm workspaces to install dependencies for all 10 exercise projects in a single pass.

### Run a specific exercise

```bash
# Using the workspace scripts:
npm run start:1    # Exercise 1
npm run start:2    # Exercise 2
# ...and so on

# Or directly from the exercise folder:
cd Exercise-1-Your-First-Service
npm start
```

## Folder Structure

```
Day-3-A-Services-DI-RxJS/Exercises/
├── D3A-exercises.md                      ← Full instructions for all exercises
├── package.json                          ← Workspace root
├── README.md                             ← This file
├── Exercise-1-Your-First-Service/
├── Exercise-2-Shared-Counter/
├── Exercise-3-Observable-Playground/
├── Exercise-4-Notification-Service/
├── Exercise-5-Async-Pipe-Gotcha/
├── Exercise-6-Search-Operators/
├── Exercise-7-CombineLatest-Calculator/
├── Exercise-8-Error-Handling-Service/
├── Exercise-9-Functional-Guard/
└── Exercise-10-Legacy-Convert/
```

## Solutions

Completed reference solutions are in:

```
Day-3-A-Services-DI-RxJS/Exercises-Solutions/
```

Try each exercise yourself first — even a partial attempt teaches more than reading the solution directly.

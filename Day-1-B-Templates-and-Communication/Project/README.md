# 💰 Tip Calculator — Day 1 Part B Sample Project

A fully functional tip calculator built with Angular, demonstrating all the concepts covered in Day 1 Part B: Templates, Data Binding & Component Communication.

## What This Project Demonstrates

| Concept | Where It's Used |
|---------|----------------|
| **Interpolation `{{ }}`** | Bill amount, tip percentage, history count, timer display throughout all components |
| **Property binding `[prop]`** | `[billAmount]`, `[tipPercentage]` on TipInputComponent; `[history]` on HistoryPanelComponent; `[disabled]` and `[hidden]` on buttons and sections |
| **Event binding `(event)`** | `(calculate)` on TipInputComponent; `(click)` on Calculate, Quick Tip, and Clear History buttons |
| **Two-way binding `[(ngModel)]`** | Bill amount and tip percentage inputs in TipInputComponent |
| **Template reference variables** | `#billInput` on the bill input — passed to `onQuickTip()` to read the current value |
| **Safe navigation `?.`** | `lastResult?.billAmount`, `history[0]?.calculatedAt`, `history[0]?.tipAmount` — prevents crashes when data is null/undefined |
| **Nullish coalescing `??`** | `lastResult?.tipAmount ?? '—'`, `history[0]?.calculatedAt ?? 'N/A'` — provides fallback display values |
| **`@Input()`** | `billAmount` and `tipPercentage` on TipInputComponent; `history` on HistoryPanelComponent |
| **`@Output()` + EventEmitter** | `calculate` event on TipInputComponent — emits the TipResult to the parent |
| **`ngOnInit`** | TipInputComponent uses it to initialize working values from `@Input()` data; HistoryPanelComponent starts the seconds timer |
| **`ngOnDestroy`** | HistoryPanelComponent clears the interval timer — prevents memory leaks |

## File Tree

```
Project/
├── package.json                          — Angular dependencies and scripts
├── angular.json                          — CLI workspace configuration
├── tsconfig.json                         — Base TypeScript config (strict mode)
├── tsconfig.app.json                     — App-specific TypeScript config
├── README.md                             — This file
├── instructions.md                       — Step-by-step build guide
└── src/
    ├── index.html                        — Single page with <app-root>
    ├── main.ts                           — bootstrapApplication() entry point
    ├── styles.css                        — Global styles
    └── app/
        ├── app.config.ts                 — ApplicationConfig (empty providers)
        ├── app.component.ts              — Parent: orchestrates children, holds state
        ├── app.component.html            — Result display with ?. and ??
        ├── app.component.css             — Parent layout styles
        ├── tip-input/
        │   ├── tip-input.component.ts    — @Input, @Output, ngOnInit, FormsModule
        │   ├── tip-input.component.html  — Two-way binding, template refs, event binding
        │   └── tip-input.component.css   — Input card styles
        └── history-panel/
            ├── history-panel.component.ts    — @Input, ngOnInit (timer), ngOnDestroy (cleanup)
            ├── history-panel.component.html  — Safe navigation on array entries
            └── history-panel.component.css   — History card styles
```

## How to Run

```bash
# 1. Navigate to the project folder
cd Day-1-B-Templates-and-Communication/Project

# 2. Install dependencies
npm install

# 3. Start the development server
npx ng serve

# 4. Open in your browser
# Navigate to http://localhost:4200
```

## Component Architecture

```
AppComponent (parent)
├── TipInputComponent (child)
│   ├── Receives: [billAmount], [tipPercentage] via @Input()
│   ├── Emits: (calculate) via @Output() EventEmitter
│   ├── Uses: [(ngModel)] two-way binding, #billInput template ref
│   └── Lifecycle: ngOnInit sets defaults from @Input() values
│
└── HistoryPanelComponent (child)
    ├── Receives: [history] array via @Input()
    ├── Uses: ?. safe navigation, ?? nullish coalescing on entries
    └── Lifecycle: ngOnInit starts timer, ngOnDestroy clears it
```

## Data Flow

1. **Parent → Child (down):** AppComponent passes `defaultBillAmount` and `defaultTipPercentage` to TipInputComponent via `@Input()` property binding
2. **Child → Parent (up):** TipInputComponent emits a `TipResult` object via `@Output()` when the user clicks Calculate
3. **Parent → Child (down):** AppComponent passes the `calculationHistory` array to HistoryPanelComponent via `@Input()`

## Key Learning Points

- **`@Input()` values aren't available in the constructor** — that's why TipInputComponent uses `ngOnInit` to read them
- **Always clear timers in `ngOnDestroy`** — HistoryPanelComponent demonstrates this with its seconds counter
- **Safe navigation `?.` is essential** when data might be null — `lastResult` starts as null before any calculation
- **Template reference variables** give you direct access to DOM elements without two-way binding — useful for "read once" scenarios like the Quick Tip buttons
- **`FormsModule` must be in the `imports` array** of any standalone component that uses `[(ngModel)]`

## CLI Commands Used to Create This Project

```bash
ng new tip-calculator --style=css --ssr=false
cd tip-calculator
ng generate component tip-input
ng generate component history-panel
```

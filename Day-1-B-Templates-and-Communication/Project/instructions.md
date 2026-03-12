# 💰 Tip Calculator — Build It Yourself

Step-by-step instructions to build the Tip Calculator project from scratch using only what you've learned in Day 1 Part B. **Do not look at the sample code** — use these instructions and the Angular docs if you get stuck.

---

## Prerequisites

- Node.js and npm installed (`node -v` and `npm -v` to verify)
- Angular CLI installed (`npm install -g @angular/cli`)
- Completed Day 1 Part A and Day 1 Part B lessons

---

## Step 1: Create the Project

1. Open your terminal and navigate to where you want to project to live.
2. Run `ng new tip-calculator --style=css --ssr=false` and accept the defaults.
3. Navigate into the project: `cd tip-calculator`
4. Start the dev server: `ng serve`
5. Open `http://localhost:4200` in your browser — you should see the default Angular welcome page.
6. **Checkpoint:** The app loads without errors in the browser and terminal.

---

## Step 2: Clean Up AppComponent

1. Open `src/app/app.component.html` and delete everything inside it.
2. Replace it with a simple container:
   ```html
   <div class="app-container">
     <h1>💰 Tip Calculator</h1>
     <p>Coming soon...</p>
   </div>
   ```
3. Open `src/app/app.component.ts` and remove any unused imports.
4. **Checkpoint:** The browser shows "💰 Tip Calculator" with "Coming soon..."

---

## Step 3: Define the Interfaces

Before building components, define the data shapes you'll need.

1. In `src/app/app.component.ts`, above the `@Component` decorator, add two interfaces:

   **TipResult** — the shape of a calculation result:
   - `billAmount: number`
   - `tipPercentage: number`
   - `tipAmount: number`
   - `totalAmount: number`
   - `calculatedAt: string` (formatted time string)

   **HistoryEntry** — extends the result with an `id: number` field.

2. Export both interfaces so child components can import them.
3. **Checkpoint:** No TypeScript errors in the terminal.

---

## Step 4: Generate TipInputComponent

1. Stop the dev server (`Ctrl+C`).
2. Run: `ng generate component tip-input`
3. Restart the dev server: `ng serve`
4. Verify four files were created in `src/app/tip-input/`.
5. **Checkpoint:** The component files exist — `.ts`, `.html`, `.css`, and optionally `.spec.ts`.

---

## Step 5: Build TipInputComponent — The Class

Open `src/app/tip-input/tip-input.component.ts` and:

1. **Import** `Input`, `Output`, `EventEmitter`, and `OnInit` from `@angular/core`.
2. **Import** `FormsModule` from `@angular/forms` and add it to the component's `imports` array. You need this for `[(ngModel)]`.
3. **Import** the `TipResult` interface from `'../app.component'`.
4. Make the class `implements OnInit`.
5. **Add two `@Input()` properties:**
   - `billAmount: number = 0` — receives the default bill from the parent
   - `tipPercentage: number = 15` — receives the default tip percentage from the parent
6. **Add one `@Output()`:**
   - `calculate = new EventEmitter<TipResult>()` — sends the result up to the parent
7. **Add component properties:**
   - `currentBill: number = 0` — will be two-way bound to the bill input
   - `currentTipPercentage: number = 15` — will be two-way bound to the tip input
   - `lastCalculationTime: string = ''` — tracks when the last calculation happened
8. **Implement `ngOnInit()`:**
   - Set `this.currentBill = this.billAmount`
   - Set `this.currentTipPercentage = this.tipPercentage`
   - Why here and not the constructor? Because `@Input()` values aren't set until after construction.
9. **Add `onCalculateTip()` method:**
   - Calculate `tipAmount` = `currentBill * (currentTipPercentage / 100)`, rounded to 2 decimals
   - Calculate `totalAmount` = `currentBill + tipAmount`, rounded to 2 decimals
   - Build a `TipResult` object with all the values plus `calculatedAt: new Date().toLocaleTimeString()`
   - Call `this.calculate.emit(result)` to send it to the parent
   - Set `this.lastCalculationTime` to the calculated time
10. **Add `onQuickTip(billRef: HTMLInputElement, percentage: number)` method:**
    - Read `this.currentBill` from `parseFloat(billRef.value) || 0`
    - Set `this.currentTipPercentage` to the passed percentage
    - Call `this.onCalculateTip()` to immediately calculate
11. **Add a private `roundToTwo(value: number): number` helper** that returns `Math.round(value * 100) / 100`.
12. **Checkpoint:** No TypeScript errors in the terminal.

---

## Step 6: Build TipInputComponent — The Template

Open `src/app/tip-input/tip-input.component.html` and build the form:

1. **Bill amount input:**
   - Add an `<input>` with `type="number"`, `min="0"`, `step="0.01"`
   - Add the template reference variable `#billInput` to this input
   - Add two-way binding: `[(ngModel)]="currentBill"`
2. **Tip percentage input:**
   - Add an `<input>` with `type="number"`, `min="0"`, `max="100"`
   - Add two-way binding: `[(ngModel)]="currentTipPercentage"`
3. **Live preview area:**
   - Use interpolation to show: `Bill: ${{ currentBill }}` and `Tip: {{ currentTipPercentage }}%`
4. **Calculate button:**
   - Add event binding: `(click)="onCalculateTip()"`
   - Add property binding: `[disabled]="currentBill <= 0"`
5. **Quick tip buttons (10%, 15%, 18%, 20%, 25%):**
   - Each button uses event binding: `(click)="onQuickTip(billInput, 10)"` (etc.)
   - Notice how `billInput` refers to the template reference variable from step 1
6. **Success message:**
   - Use `[hidden]="lastCalculationTime.length === 0"` to hide when no calculation exists
   - Show: `✅ Last calculated at {{ lastCalculationTime }}`
7. **Checkpoint:** The input form renders. Typing in the bill field updates the live preview immediately (two-way binding working).

---

## Step 7: Generate HistoryPanelComponent

1. Run: `ng generate component history-panel`
2. Verify the files were created in `src/app/history-panel/`.

---

## Step 8: Build HistoryPanelComponent — The Class

Open `src/app/history-panel/history-panel.component.ts` and:

1. **Import** `Input`, `OnInit`, and `OnDestroy` from `@angular/core`.
2. **Import** the `HistoryEntry` interface from `'../app.component'`.
3. Make the class `implements OnInit, OnDestroy`.
4. **Add one `@Input()`:**
   - `history: HistoryEntry[] = []` — receives the history array from the parent
5. **Add component properties:**
   - `secondsOpen: number = 0` — counts seconds since the panel loaded
   - `private timerId: number | null = null` — stores the interval ID for cleanup
6. **Implement `ngOnInit()`:**
   - Set `secondsOpen = 0`
   - Start an interval: `this.timerId = window.setInterval(() => { this.secondsOpen++; }, 1000)`
7. **Implement `ngOnDestroy()`:**
   - Check if `timerId` is not null
   - Call `clearInterval(this.timerId)` to stop the timer
   - This is critical — without it, the timer keeps running after the component is removed
8. **Add `formatCurrency(value: number | undefined): string` method:**
   - Return `'$—'` if value is undefined/null
   - Return `'$' + value.toFixed(2)` otherwise
9. **Checkpoint:** No TypeScript errors.

---

## Step 9: Build HistoryPanelComponent — The Template

Open `src/app/history-panel/history-panel.component.html` and:

1. **Timer display:**
   - Show: `⏱️ Panel open for {{ secondsOpen }} second(s)`
2. **Empty state:**
   - Use `[hidden]="history.length > 0"` to show only when empty
   - Display a friendly message like "No calculations yet."
3. **History entries (render 5 manually — we don't have @for yet):**
   - For each entry (0 through 4):
     - Use `[hidden]="history.length < N"` to hide entries that don't exist
     - Use safe navigation everywhere: `history[0]?.calculatedAt`, `history[0]?.billAmount`
     - Use nullish coalescing for fallbacks: `history[0]?.calculatedAt ?? 'N/A'`
     - Call `formatCurrency()` for money values
4. **Overflow notice:**
   - If `history.length > 5`, show how many more entries exist
5. **Checkpoint:** The panel shows the timer counting up. The empty state message displays when there's no history.

---

## Step 10: Wire Up AppComponent

Now connect everything in the parent:

1. Open `src/app/app.component.ts`:
   - Import `TipInputComponent` and `HistoryPanelComponent`
   - Add both to the `imports` array in the `@Component` decorator
   - Add properties:
     - `lastResult: TipResult | null = null` — starts null (no calculation yet)
     - `calculationHistory: HistoryEntry[] = []` — all past calculations
     - `defaultBillAmount: number = 50.00`
     - `defaultTipPercentage: number = 18`
     - `private nextId: number = 1`
   - Add `onCalculate(result: TipResult)` method that stores the result and adds it to history
   - Add `onClearHistory()` method that resets everything

2. Open `src/app/app.component.html` and build the layout:
   - **TipInputComponent:**
     ```
     <app-tip-input [billAmount]="defaultBillAmount" [tipPercentage]="defaultTipPercentage"
       (calculate)="onCalculate($event)"></app-tip-input>
     ```
   - **Result display section:**
     - Use `lastResult?.billAmount ?? '—'` for each field
     - Use `lastResult?.calculatedAt ?? 'No calculation yet'` for the timestamp
   - **Clear History button:**
     - `(click)="onClearHistory()"` and `[disabled]="calculationHistory.length === 0"`
   - **HistoryPanelComponent:**
     ```
     <app-history-panel [history]="calculationHistory"></app-history-panel>
     ```
   - **History count:** `{{ calculationHistory.length }} calculation(s) saved`

3. **Checkpoint:** Everything is wired up. Test the full flow:
   - Enter a bill amount → click Calculate → result appears
   - Click Quick Tip buttons → calculation happens immediately
   - History panel shows past calculations
   - Timer counts up in the history panel
   - Clear History resets everything

---

## Step 11: Add Styles

Style each component to make it look polished:

1. **Global styles** (`src/styles.css`): Reset margins/padding, set a background color, pick a font.
2. **AppComponent** (`app.component.css`): Center the layout, style the result card with rows for each value, style the Clear History button.
3. **TipInputComponent** (`tip-input.component.css`): Style the input card, form fields, Calculate button (with disabled state), Quick Tip pill buttons, and the success message.
4. **HistoryPanelComponent** (`history-panel.component.css`): Style the timer bar, empty state, history entry cards with header/body layout, and the overflow notice.

Remember: component styles are **scoped** via ViewEncapsulation — styles in one component won't leak into others.

---

## Step 12: Test Everything

Run through this checklist:

- [ ] App loads without console errors
- [ ] Default bill ($50) and tip (18%) are pre-filled in the inputs
- [ ] Typing in the bill field updates the live preview immediately (two-way binding)
- [ ] Clicking "Calculate Tip" shows the result in the result card
- [ ] The result card shows safe fallback values ("—", "No calculation yet") before any calculation
- [ ] Quick Tip buttons (10%, 15%, 18%, 20%, 25%) calculate immediately
- [ ] Each calculation appears in the history panel
- [ ] History panel timer counts seconds since the panel loaded
- [ ] "Clear History" resets the result display and empties the history
- [ ] The Calculate button is disabled when the bill amount is $0 or less
- [ ] Clear History button is disabled when there's no history
- [ ] No TypeScript errors in the terminal
- [ ] Styles are scoped — each component's styles don't affect others

---

## Concepts Checklist

When you're done, verify you've used each of these at least once:

| Concept | ✅ Used? |
|---------|---------|
| Interpolation `{{ }}` | |
| Property binding `[prop]` | |
| Event binding `(event)` | |
| Two-way binding `[(ngModel)]` | |
| Template reference variable `#ref` | |
| Safe navigation `?.` | |
| Nullish coalescing `??` | |
| `@Input()` | |
| `@Output()` + EventEmitter | |
| `ngOnInit` | |
| `ngOnDestroy` | |
| `FormsModule` in imports | |

If you can check every box, you've successfully built a project that covers all of Day 1 Part B! 🎉

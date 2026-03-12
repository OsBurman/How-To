# 🛠️ Project Portfolio Builder — Day 1 Part B

Practice projects to reinforce **Templates, Data Binding & Component Communication**.
Each project uses only concepts from Day 1 Part A and Day 1 Part B — no signals, no services, no routing, no pipes, no control flow blocks.

---

## Project 1: Emoji Mood Tracker

**Difficulty:** ⭐ Beginner

Build a mood-logging app where the user selects an emoji representing their current mood and types a short note. A MoodEntryComponent accepts the selected emoji and note via `@Input()` and displays them as a styled card. The parent keeps a running count of how many moods have been logged, displayed with interpolation.

### Components to Create
- **AppComponent** — holds the mood selection buttons, the note input, and renders up to 5 MoodEntryComponents manually
- **MoodEntryComponent** — receives `emoji` and `note` via `@Input()`, displays them in a card layout

### What You'll Practice
- Event binding `(click)` on emoji buttons to select a mood
- Two-way binding `[(ngModel)]` on the note textarea
- `@Input()` passing the emoji and note down to the child
- Interpolation `{{ }}` for the mood count and card content

---

## Project 2: Unit Converter

**Difficulty:** ⭐ Beginner

Create a unit converter that lets users type a value in one unit and instantly see the converted result. A ConversionDisplayComponent receives the input value, source unit, and target unit via `@Input()` and shows the calculated result. Use `ngOnInit` to set a sensible default conversion (e.g., miles to kilometers).

### Components to Create
- **AppComponent** — contains the input field, unit selector buttons, and renders ConversionDisplayComponent
- **ConversionDisplayComponent** — receives `inputValue`, `fromUnit`, and `toUnit` via `@Input()`, calculates and displays the result using interpolation

### What You'll Practice
- Two-way binding `[(ngModel)]` on the value input
- `@Input()` for parent-to-child data flow (value, units)
- `ngOnInit` to set default values from `@Input()` data
- Property binding `[disabled]` on the convert button when the input is empty

---

## Project 3: Flash Card Quiz

**Difficulty:** ⭐⭐ Intermediate

Build a flash card study app. A FlashCardComponent receives a question and answer via `@Input()` and uses a "Reveal" button to toggle the answer visibility. When the user marks a card as "Got it," the child emits an event via `@Output()` so the parent can track the score. The parent displays the current score with safe navigation in case no cards have been answered yet.

### Components to Create
- **AppComponent** — holds the deck of questions, renders up to 5 FlashCardComponents manually, tracks and displays the score
- **FlashCardComponent** — receives `question` and `answer` via `@Input()`, emits `answered` via `@Output()` when the user clicks "Got it"

### What You'll Practice
- `@Input()` for question/answer data and `@Output()` + EventEmitter for the "Got it" event
- Event binding `(click)` to reveal the answer and to mark it correct
- Safe navigation `?.` and nullish coalescing `??` on the score display (e.g., `lastAnswered?.question ?? 'No answers yet'`)
- Property binding `[hidden]` to toggle answer visibility

---

## Project 4: Countdown Event Planner

**Difficulty:** ⭐⭐ Intermediate

Build an event planner where the user enters an event name and a target number of seconds. A CountdownCardComponent receives the event name and duration via `@Input()`, starts a countdown timer in `ngOnInit`, clears it in `ngOnDestroy`, and emits a "time's up" event via `@Output()` when the countdown reaches zero. The parent displays completed events with safe navigation for graceful null handling.

### Components to Create
- **AppComponent** — contains the event name input and duration input (using template reference variables), a "Start" button, renders CountdownCardComponents, and displays a list of completed event names
- **CountdownCardComponent** — receives `eventName` and `durationSeconds` via `@Input()`, runs a `setInterval` countdown in `ngOnInit`, clears it in `ngOnDestroy`, emits `timesUp` via `@Output()`

### What You'll Practice
- Template reference variables `#eventInput` and `#durationInput` to read values on button click
- `ngOnInit` to start the interval timer and `ngOnDestroy` to clear it
- `@Input()` for event data down and `@Output()` + EventEmitter for the completion event up
- Safe navigation `?.` on the "last completed event" display

---

## Project 5: Contact Card Editor

**Difficulty:** ⭐⭐ Intermediate

Create a contact card editor where users fill in a form and see a live-updating preview card. An EditFormComponent uses two-way binding for name, email, and phone fields. A ContactCardComponent receives the contact data via `@Input()` and displays it with safe navigation (since fields start empty). The form emits a "save" event via `@Output()` that the parent uses to store the last saved contact.

### Components to Create
- **AppComponent** — renders EditFormComponent and ContactCardComponent side by side, stores the last saved contact
- **EditFormComponent** — uses `[(ngModel)]` on three fields, emits `save` via `@Output()` with the contact object
- **ContactCardComponent** — receives a `contact` object via `@Input()`, displays each field using `?.` and `??` for fallbacks (e.g., `contact?.email ?? 'No email provided'`)

### What You'll Practice
- Two-way binding `[(ngModel)]` on multiple form fields (requires FormsModule in imports)
- `@Input()` and `@Output()` working together across two sibling-like children
- Safe navigation `?.` and nullish coalescing `??` on the card display
- `ngOnInit` in ContactCardComponent to format the display name from `@Input()` data

---

## Project 6: Reaction Speed Game

**Difficulty:** ⭐⭐ Intermediate

Build a reaction speed game. The parent starts a random timer, and when a "Click NOW!" signal appears, the user clicks a button as fast as possible. A ReactionResultComponent receives the reaction time via `@Input()` and displays it. A ScoreboardComponent receives an array of past times via `@Input()` and displays the best and worst scores using safe navigation. The game timer is set up in `ngOnInit` and cleaned up in `ngOnDestroy`.

### Components to Create
- **AppComponent** — manages the game state (waiting, ready, clicked), starts/stops the random delay timer, stores past reaction times, renders both children
- **ReactionResultComponent** — receives `reactionTimeMs` via `@Input()`, displays the result with interpolation and a style based on speed (property binding on a CSS class)
- **ScoreboardComponent** — receives `times` array via `@Input()`, displays best/worst/average with `?.` and `??` fallbacks for empty state

### What You'll Practice
- `ngOnInit` to start the random delay timer and `ngOnDestroy` to clear it if the component is removed
- Event binding `(click)` for the reaction button with precise timing logic
- `@Input()` on two child components receiving different data shapes
- Safe navigation `?.` and nullish coalescing `??` on the scoreboard (e.g., `times[0]?.toFixed(0) ?? '—'`)

---

## Project 7: Recipe Ingredient Scaler

**Difficulty:** ⭐⭐ Intermediate

Build a recipe scaler where users adjust the number of servings and see all ingredient quantities update live. An IngredientRowComponent accepts the base quantity, unit, and name via `@Input()` plus a scaling factor, and displays the scaled amount. The user types a custom serving count using two-way binding, or clicks preset buttons (×1, ×2, ×3) using template reference variables. A NutritionSummaryComponent receives the current scale factor via `@Input()` and emits a "reset" event via `@Output()` to return to the default.

### Components to Create
- **AppComponent** — holds the recipe data, the serving input with `[(ngModel)]`, preset scale buttons, renders IngredientRowComponents manually (up to 6), and renders NutritionSummaryComponent
- **IngredientRowComponent** — receives `baseName`, `baseQuantity`, `unit`, and `scaleFactor` via `@Input()`, calculates and displays the scaled quantity using `ngOnInit`
- **NutritionSummaryComponent** — receives `scaleFactor` via `@Input()`, displays estimated calories with interpolation, emits `reset` via `@Output()`

### What You'll Practice
- Two-way binding `[(ngModel)]` for the custom serving count
- Template reference variables on preset buttons to read the current input value
- `@Input()` on multiple child components and `@Output()` for the reset event
- `ngOnInit` to calculate the initial scaled values from `@Input()` data

---

## General Tips for All Projects

1. **Start with `ng new`** — create a fresh project for each idea. Don't reuse the exercise or sample code projects.

2. **Generate components with the CLI** — run `ng generate component component-name` so Angular creates the `.ts`, `.html`, and `.css` files with the correct boilerplate.

3. **Add FormsModule first** — if your project uses `[(ngModel)]`, import `FormsModule` from `@angular/forms` and add it to the component's `imports` array before writing any template code. Forgetting this is the #1 cause of "Can't bind to 'ngModel'" errors.

4. **Keep components focused** — each component should do one thing well. If a component is handling both data entry and display, split it into two components connected by `@Input()` and `@Output()`.

5. **Use `ngOnInit` for anything that depends on `@Input()`** — if your component needs to calculate something from its inputs, do it in `ngOnInit`, not the constructor. The constructor runs before Angular sets the input values.

6. **Always clean up in `ngOnDestroy`** — if you start a `setInterval` or `setTimeout` in `ngOnInit`, store the timer ID and clear it in `ngOnDestroy`. This prevents memory leaks and ghost timers.

7. **Test safe navigation early** — intentionally set a property to `null` and verify your `?.` and `??` operators display graceful fallbacks instead of crashing.

8. **Don't use concepts from future days** — these projects should only use what you've learned in Day 1. No `@if`, `@for`, services, routing, signals, or pipes. If you find yourself wanting those tools, that's a great sign — you'll learn them starting tomorrow!

9. **Style with ViewEncapsulation in mind** — remember that component styles are scoped by default. If you want a style to apply globally, put it in `src/styles.css`. Component-specific styles go in the component's `.css` file.

10. **Commit often** — after each component works, make a git commit. This gives you a safe point to return to if something breaks later.

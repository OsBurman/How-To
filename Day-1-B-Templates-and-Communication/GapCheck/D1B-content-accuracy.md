# D1B Content Accuracy & Scope Review — Day 1 Part B: Templates, Data Binding & Component Communication

**Review Date:** March 11, 2026
**Reviewer:** Automated Gap Check
**Scope:** All deliverables in `Day-1-B-Templates-and-Communication/`

---

## SECTION 1 — CURRICULUM COVERAGE

| Requirement | Status | Slides | SampleCode | Exercises | Project |
|-------------|--------|--------|-----------|-----------|---------|
| Interpolation `{{ }}` | **FULLY COVERED** | Slides 3–4 | All 4 component templates | Ex 1–10 (all) | All 3 templates |
| Property binding `[prop]` | **FULLY COVERED** | Slides 5–7 | `[disabled]`, `[src]`, `[hidden]`, `[class.over-limit]` in app + character-counter templates | Ex 1, 2, 5, 6, 8, 9, 10 | `[billAmount]`, `[tipPercentage]`, `[history]`, `[disabled]`, `[hidden]` |
| Event binding `(event)` | **FULLY COVERED** | Slides 8–9 | `(click)`, `(input)` in product-card + character-counter templates | Ex 1, 3, 5, 6, 7, 8, 9, 10 | `(calculate)`, `(click)` |
| Two-way binding `[(ngModel)]` | **FULLY COVERED** | Slides 10–12 (includes FormsModule requirement) | character-counter uses `[(ngModel)]` with FormsModule | Ex 2, 8, 10 | tip-input uses `[(ngModel)]` with FormsModule |
| Template reference variables `#ref` | **FULLY COVERED** | Slides 13–15 (includes refs vs two-way comparison) | `#searchInput` in app, `#quantityInput` in product-card | Ex 3, 8 | `#billInput` in tip-input |
| Safe navigation `?.` | **FULLY COVERED** | Slides 16–18 | app.component.html (6+ usages across currentUser/guestUser) | Ex 4, 8, 9, 10 | app.component.html + history-panel.component.html |
| Nullish coalescing `??` | **FULLY COVERED** | Slides 19–20 (includes combining with `?.`) | app.component.html (4 fallback patterns) | Ex 4, 8, 9, 10 | app.component.html + history-panel.component.html |
| @Input() and @Output() + EventEmitter | **FULLY COVERED** | Slides 21–26 (complete parent-child pattern) | product-card: @Input(name, price) + @Output(addToCart) | Ex 5, 6, 8, 9, 10 | tip-input: @Input(billAmount, tipPercentage) + @Output(calculate); history-panel: @Input(history) |
| ngOnInit — why not constructor | **FULLY COVERED** | Slides 27–30 (includes ⚠️ WARNING slide 29) | product-card: builds displayLabel in ngOnInit; character-counter: starts interval | Ex 6, 8, 9, 10 | tip-input: init from @Input; history-panel: start timer |
| ngOnDestroy — cleanup | **FULLY COVERED** | Slides 31–33 (memory leak explanation + clearInterval pattern) | character-counter: clears interval in ngOnDestroy | Ex 6, 9 | history-panel: clears interval timer |
| Signals first look — signal(), computed() | **FULLY COVERED** | Slides 34–36 (all labeled 🟠 Day 2 Preview, all state "exercises do not require signals yet") | signal-counter: signal() + computed() with "🔮 DAY 2 PREVIEW" label | Ex 7 | Not in project (correct — signals are preview only) |

### Summary: **ALL 8 CURRICULUM REQUIREMENTS ARE FULLY COVERED**

Every concept is explained in slides, demonstrated in sample code, practiced in at least one exercise, and (where appropriate) used in the project.

---

## SECTION 2 — EXERCISE ALIGNMENT

### Alignment Matrix

| Concept (from Slides) | Practiced In | Status |
|----------------------|-------------|--------|
| Interpolation `{{ }}` | Ex 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 | ✅ Practiced — 10 exercises |
| Property binding `[prop]` | Ex 1, 2, 5, 6, 8, 9, 10 | ✅ Practiced — 7 exercises |
| Event binding `(event)` | Ex 1, 3, 5, 6, 7, 8, 9, 10 | ✅ Practiced — 8 exercises |
| Two-way binding `[(ngModel)]` + FormsModule | Ex 2, 8, 10 | ✅ Practiced — 3 exercises |
| Template reference variables `#ref` | Ex 3, 8 | ✅ Practiced — 2 exercises |
| Safe navigation `?.` | Ex 4, 8, 9, 10 | ✅ Practiced — 4 exercises |
| Nullish coalescing `??` | Ex 4, 8, 9, 10 | ✅ Practiced — 4 exercises |
| @Input() | Ex 5, 6, 8, 9, 10 | ✅ Practiced — 5 exercises |
| @Output() + EventEmitter | Ex 5, 8, 9, 10 | ✅ Practiced — 4 exercises |
| ngOnInit (why not constructor) | Ex 6, 8, 9, 10 | ✅ Practiced — 4 exercises |
| ngOnDestroy (cleanup) | Ex 6, 9 | ✅ Practiced — 2 exercises |
| signal() | Ex 7 | ✅ Practiced — 1 exercise (preview) |
| computed() | Ex 7 | ✅ Practiced — 1 exercise (preview) |

### Summary: **ALL CONCEPTS TAUGHT IN SLIDES ARE PRACTICED IN AT LEAST ONE EXERCISE** ✅

No concept is taught but left unpracticed. The challenge exercises (8, 9) effectively integrate nearly all concepts in a single exercise, providing excellent reinforcement.

---

## SECTION 3 — SCOPE CREEP (FUTURE TOPICS)

### SampleCode/ (20 files)

| Forbidden Concept | Found? | Classification |
|-------------------|--------|---------------|
| `@if`, `@for`, `@switch` | Comment only in app.component.html: "We'll learn @for to loop through cartItems on Day 2 Part A" | ✅ ACCEPTABLE — forward reference |
| `ng-content`, `ng-container`, `ng-template` | Not found | ✅ Clean |
| Pipes (`\| date`, `\| currency`, `\| uppercase`, `\| async`) | Not found | ✅ Clean |
| `[ngClass]`, `[ngStyle]` | Not found | ✅ Clean |
| Signal-based `input()`, `output()`, `model()` | Not found | ✅ Clean |
| `effect()` | Not found | ✅ Clean |
| Services, `@Injectable`, `inject()` | Not found | ✅ Clean |
| RxJS (`Observable`, `BehaviorSubject`, `toSignal()`) | Not found | ✅ Clean |
| `HttpClient`, `provideHttpClient()` | Comment only in app.config.ts | ✅ ACCEPTABLE — "on Day 3 you'll add provideHttpClient()" |
| `provideRouter()`, `routerLink`, `router-outlet` | Comment only in app.config.ts | ✅ ACCEPTABLE — "on Day 4 you'll add provideRouter(routes)" |
| `FormGroup`, `FormControl`, `ReactiveFormsModule` | Not found | ✅ Clean |

**SampleCode Verdict: ✅ CLEAN — Zero scope creep. All future references are comments only.**

---

### SampleLegacyCode/ (17 files)

| Forbidden Concept | Found? | Classification |
|-------------------|--------|---------------|
| All forbidden concepts | Not found in code | ✅ Clean |
| `signal()`, `computed()` | Comment only: "no equivalent to signal() and computed()" | ✅ ACCEPTABLE — explanatory |
| Signal-based `input()`, `output()` | Comment only: "signal-based input() and output()" | ✅ ACCEPTABLE — explanatory |

**SampleLegacyCode Verdict: ✅ CLEAN — Zero scope creep. No modern patterns leaked into legacy code.**

---

### Slides/ (D1B-slides.md — 46 slides)

| Forbidden Concept | Found? | Classification |
|-------------------|--------|---------------|
| `@if` in Slide 31 | "When a conditional removes it from the template (e.g., `@if` evaluates to false)" | ✅ ACCEPTABLE — brief mention explaining when ngOnDestroy fires; does not teach @if syntax |
| All other forbidden concepts | Not found | ✅ Clean |
| `signal()`, `computed()` in Slides 34–36 | Intentional Day 2 preview, clearly labeled 🟠 with "exercises do not require signals yet" | ✅ ACCEPTABLE — required by master context |

**Slides Verdict: ✅ CLEAN — Zero scope creep.**

---

### SpeakerScript/ (2 files)

| Forbidden Concept | Found? | Classification |
|-------------------|--------|---------------|
| API data / async (D1B-slides-script.md) | "you'll do on Day 3" | ✅ ACCEPTABLE — forward reference motivating `?.` |
| Dependency injection (D1B-slides-script.md) | "dependency injection setup, which we'll cover on Day 3" | ✅ ACCEPTABLE — brief forward reference |
| Routing (D1B-slides-script.md) | "that's routing, coming on Day 4" | ✅ ACCEPTABLE — brief forward reference |
| RxJS subscriptions (D1B-slides-script.md) | "You'll use this same pattern for RxJS subscriptions on Day 3" | ✅ ACCEPTABLE — brief forward reference |
| `provideHttpClient()`, `provideRouter()` (D1B-code-walkthrough-script.md) | "On Day 3, you'll add provideHttpClient()... On Day 4, you'll add provideRouter(routes)" | ✅ ACCEPTABLE — forward reference describing empty providers |
| Signal-based `input()`, `output()` (D1B-code-walkthrough-script.md) | "On Day 2, you'll learn the signal-based alternatives" | ✅ ACCEPTABLE — brief forward reference, does not teach or demonstrate |

**SpeakerScript Verdict: ✅ CLEAN — All future-day mentions are brief, properly-labeled forward references.**

---

### Exercises/ (10 exercise projects)

| Exercise | Forbidden Concept Found? | Classification |
|----------|-------------------------|---------------|
| Exercise 1 | None | ✅ Clean |
| Exercise 2 | None | ✅ Clean |
| Exercise 3 | 🚫 **HTML comment references `@for`**: "Bonus: if you know @for from Day 1A, use it to loop through tasks" | 🚫 **SCOPE CREEP** — see Issue #1 below |
| Exercise 4 | None | ✅ Clean |
| Exercise 5 | None | ✅ Clean |
| Exercise 6 | 🚫 **Solution uses `@if`** to conditionally render CountdownComponent | 🚫 **SCOPE CREEP** — see Issue #2 below |
| Exercise 7 | None (`effect()` explicitly excluded in acceptance criteria) | ✅ Clean |
| Exercise 8 | None | ✅ Clean |
| Exercise 9 | None | ✅ Clean |
| Exercise 10 | None (legacy patterns are expected per course rules) | ✅ Clean |

---

### Project/ (Tip Calculator — 19 files)

| Forbidden Concept | Found? | Classification |
|-------------------|--------|---------------|
| `@if`, `@for`, `@switch` | Not found — uses `[hidden]` for conditional display | ✅ Clean |
| Pipes | Not found — uses `formatCurrency()` helper and `toFixed()` | ✅ Clean |
| All other forbidden concepts | Not found | ✅ Clean |

**Project Verdict: ✅ CLEAN — Appropriate workarounds used (manual rendering, `[hidden]`, helper methods).**

---

### Project-Portfolio-Builder/ (Projects.md — 7 project ideas)

| Forbidden Concept | Found? | Classification |
|-------------------|--------|---------------|
| All forbidden concepts | Not found | ✅ Clean |
| Tip #8 explicitly states | "Don't use concepts from future days — No @if, @for, services, routing, signals, or pipes." | ✅ Good guardrail |

**Portfolio Builder Verdict: ✅ CLEAN.**

---

### Scope Creep Issues Requiring Resolution

#### 🚫 Issue #1: Exercise 3 — Incorrect `@for` Reference (MINOR)

**Location:** [Exercise-3-Template-Refs/src/app/app.component.html](Day-1-B-Templates-and-Communication/Exercises/Exercise-3-Template-Refs/src/app/app.component.html#L35)

**Problem:** HTML comment says: `<!-- Bonus: if you know @for from Day 1A, use it to loop through tasks -->`

**Why it's wrong:**
- `@for` is a **Day 2 Part A** concept — it has NOT been taught yet
- The comment incorrectly claims it was covered in Day 1A (it was not)
- Students cannot complete this "bonus" with Day 1 knowledge

**Fix:** Remove the comment entirely, or replace with: `<!-- Tasks will appear here — on Day 2 you'll learn @for to loop through arrays -->`

---

#### 🚫 Issue #2: Exercise 6 — Solution Uses `@if` (MODERATE)

**Location:** [Exercise-6-Solution/src/app/app.component.html](Day-1-B-Templates-and-Communication/Exercises-Solutions/Exercise-6-Solution/src/app/app.component.html#L22)

**Problem:** The Exercise 6 solution uses `@if (showTimer)` to conditionally render the CountdownComponent. `@if` is a **Day 2 Part A** concept.

**Why it exists:** The exercise is designed to demonstrate `ngOnDestroy` cleanup by toggling a component on/off. This fundamentally requires conditional rendering — the component must be added to and removed from the DOM. Without `@if` (or legacy `*ngIf`), the component cannot be destroyed and recreated.

**The starter code HTML acknowledges this gap:**
- Comments say "Conditional rendering: when showTimer is false, Angular removes the component"
- But the actual `<div>` has no conditional mechanism — `showTimer` toggles but nothing responds to it

**Impact:** Students cannot complete this exercise without using `@if`, which hasn't been taught yet.

**Recommended fix options:**
1. **Add a micro-preview of `@if`** in the exercise README as a "here's the one line you need" hint, with a note: "We'll cover `@if` fully on Day 2 — for now, just use this exact syntax." This parallels how Exercise 7 previews signals.
2. **Use `[hidden]`** instead — `<app-countdown [hidden]="!showTimer" [startValue]="15"></app-countdown>`. However, `[hidden]` does NOT destroy/recreate the component, so `ngOnDestroy` would NOT fire. This defeats the exercise's purpose.
3. **Restructure the exercise** to demonstrate `ngOnDestroy` via page unload or a different trigger that doesn't require conditional rendering. This would be a significant rewrite.

**Recommendation:** Option 1 is the best balance — introduce `@if` as a single-use preview (like signals in Exercise 7), clearly labeled as "covered fully on Day 2."

---

## SECTION 4 — CROSS-DELIVERABLE CONSISTENCY

### Pattern Consistency

| Check | Result |
|-------|--------|
| Slides and SampleCode teach the same patterns | ✅ Consistent — both use `standalone: true`, `templateUrl`/`styleUrl`, `@Input()`/`@Output()`, FormsModule in component imports |
| Slides and Exercises teach the same patterns | ✅ Consistent — all exercises use standalone components with templateUrl/styleUrl |
| SampleCode and SampleLegacyCode demonstrate the same concepts (minus signals) | ✅ Consistent — same binding types, same template refs, same lifecycle hooks |
| Slides and SpeakerScript align | ✅ Consistent — script covers all 46 slides in order, Key Takeaways match |
| Code walkthrough script and SampleCode align | ✅ Consistent — script accurately describes all files (see minor note below) |
| Project demonstrates the same patterns as slides/exercises | ✅ Consistent — all four binding types, @Input/@Output, lifecycle hooks, safe navigation, FormsModule |

### Minor Consistency Notes (non-blocking)

| Note | Severity | Details |
|------|----------|---------|
| Code walkthrough omits 3rd product card | ⚠️ Minor | SampleCode app.component.html has 3 product cards (Angular in Action, TypeScript Handbook, RxJS Patterns). The code walkthrough script only discusses the first two. Not a contradiction — just incomplete coverage. |
| Legacy vs modern product card count | ⚠️ Minor | Modern SampleCode has 3 product cards; Legacy SampleLegacyCode has 2 (no "RxJS Patterns"). The walkthrough doesn't mention this structural difference. |
| Two portfolio projects lack "manually" note | ⚠️ Minor | Projects 4 (Countdown Event Planner) and 6 (Reaction Speed Game) don't explicitly say "render up to N manually" for list displays, unlike Projects 1, 3, and 7 which do. Could confuse students about how to render lists without `@for`. |

### Contradictions Found

| Issue | Severity | Details |
|-------|----------|---------|
| Exercise 6 claims conditional rendering is "already wired" | 🟡 Moderate | Exercise 6 README step 7 states the template "conditionally shows the countdown (this is already wired)" — but the starter HTML has no conditional mechanism. The solution introduces `@if` which isn't in the starter code. |
| Exercise 3 references `@for` from "Day 1A" | 🟡 Minor | `@for` was NOT taught in Day 1A. The comment incorrectly attributes it to a previous lesson. |

---

## SUMMARY

### Overall Content Accuracy Verdict

| Section | Result |
|---------|--------|
| Curriculum Coverage | ✅ **ALL 8 REQUIREMENTS FULLY COVERED** |
| Exercise Alignment | ✅ **ALL 13 CONCEPTS PRACTICED** in at least one exercise |
| Scope Creep | 🟡 **2 ISSUES FOUND** — both in Exercises (see below) |
| Cross-Deliverable Consistency | ✅ **CONSISTENT** — 3 minor notes, 2 contradiction flags |

### Issues Requiring Action

| Priority | Issue | Location | Fix |
|----------|-------|----------|-----|
| 🟡 MODERATE | Exercise 6 solution uses `@if` (Day 2 concept) | Exercise-6-Solution + Exercise-6 starter | Add `@if` micro-preview in Exercise 6 README (paralleling signal preview in Ex 7), or restructure exercise |
| 🟡 MINOR | Exercise 3 HTML comment incorrectly references `@for` from "Day 1A" | Exercise-3-Template-Refs/src/app/app.component.html line 35 | Remove comment or replace with forward reference to Day 2 |

### What's Working Well

- **Zero scope creep in SampleCode, SampleLegacyCode, Slides, SpeakerScript, Project, or Portfolio Builder** — all future-day references are brief, properly labeled forward references
- **Excellent curriculum coverage** — every concept appears in slides, code, exercises, AND project
- **Strong exercise progression** — Beginner (1–4, 7) → Intermediate (5, 6, 10) → Challenge (8, 9)
- **Challenge exercises (8, 9) effectively integrate nearly all concepts** in a single exercise
- **Appropriate workarounds** throughout — manual rendering instead of `@for`, `[hidden]` instead of `@if`, helper methods instead of pipes
- **Legacy separation is clean** — no modern patterns in legacy code, no legacy patterns in modern code
- **Signal preview is properly scoped** — Exercise 7 covers only `signal()` and `computed()`, explicitly excludes `effect()`, clearly labeled as preview

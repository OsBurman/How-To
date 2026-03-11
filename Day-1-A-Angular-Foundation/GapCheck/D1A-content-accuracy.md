# D1A — GAP CHECK 2: CONTENT ACCURACY & SCOPE

**Date:** 2026-03-11
**Scope:** Day-1-A-Angular-Foundation/ — all deliverables

---

## SECTION 1 — CURRICULUM COVERAGE

For each curriculum requirement, this section checks whether it is explained in slides, demonstrated in sample code, and practiced in at least one exercise.

### 1. What Angular is, why it exists, how it compares to vanilla JS

**FULLY COVERED**

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 3 (What Is Angular?), Slide 4 (Why Angular Exists — 4 vanilla JS pain points), Slide 5 (Framework vs Library) |
| Sample Code | `app.component.html` has inline comment: "In vanilla JavaScript, you would manually create DOM elements…" |
| Speaker Script | Dedicated sections in D1A-slides-script.md covering all three slides with real-world explanations |
| Exercises | Exercise 1 (Scaffold and Explore) — students explore the project structure and see how Angular replaces manual DOM work |

---

### 2. Installing the CLI, generating a project, understanding the file structure

**FULLY COVERED**

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 6 (Prerequisites — Node.js and npm), Slide 7 (Installing the Angular CLI), Slide 8 (Creating a New Project with ng new), Slide 9 (What ng new Generates), Slide 10 (Root Config Files), Slide 11 (The src/ Folder), Slide 12 (The src/app/ Folder) — 7 dedicated slides |
| Sample Code | Every file has a comment noting which CLI command generated it (`ng new`, `ng g c header`) |
| Speaker Script | Detailed walkthrough of prerequisites, `npm install -g @angular/cli`, `ng new`, prompts, and generated structure |
| Exercises | Exercise 1 (Scaffold and Explore) — navigate the scaffolded project and annotate each file's purpose; Exercise 2 (Your First Component) — use `ng generate component` |

---

### 3. bootstrapApplication() and app.config.ts

**FULLY COVERED**

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 13 (What main.ts Does), Slide 14 (bootstrapApplication — The Two Arguments), Slide 15 (app.config.ts — The Providers Array), Slide 16 (How Angular Starts Up — The Full Picture) — 4 dedicated slides |
| Sample Code | `SampleCode/src/main.ts` — calls `bootstrapApplication()` with inline comments; `SampleCode/src/app/app.config.ts` — exports `ApplicationConfig` with empty providers |
| Speaker Script | Detailed explanation of both arguments, the startup sequence, and why providers are empty on Day 1 |
| Exercises | Exercise 1 — students annotate `bootstrapApplication()` in main.ts and the providers array in app.config.ts |

---

### 4. Standalone component — decorators, metadata, selector, template, styles

**FULLY COVERED**

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 17 (The @Component Decorator), Slide 18 (Component Metadata — selector), Slide 19 (Component Metadata — standalone, imports, templateUrl, styleUrl), Slide 20 (What standalone: true Means), Slide 21 (The Component Class) — 5 dedicated slides |
| Sample Code | All 3 components (App, Header, Footer) use `standalone: true`, `templateUrl`, `styleUrl`, and have detailed inline comments on each metadata property |
| Speaker Script | Line-by-line walkthrough of every decorator property in the code walkthrough script |
| Exercises | Exercise 2 (Your First Component) — generate and write a standalone component; Exercise 4 (Passing Data with @Input) — create another standalone component; Exercise 5 (Multiple Components) — create 3 standalone components; Exercise 8 (Team Roster) — create 3 more |

---

### 5. The imports array on a standalone component

**FULLY COVERED**

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 22 (What the imports Array Does), Slide 23 (Adding and Removing from imports) — 2 dedicated slides |
| Sample Code | `app.component.ts` — imports array lists `HeaderComponent` and `FooterComponent` with inline comments explaining the whitelist concept |
| Speaker Script | Explains the imports array as a "whitelist" and walks through the two-step import process |
| Exercises | Exercise 2 — add a component to AppComponent's imports; Exercise 3 — deliberate break by removing from imports; Exercise 5 — import 3 components; Exercise 8 — import 3 components and deliberately break one |

---

### 6. "not a known element" error — cause and fix

**FULLY COVERED**

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 24 (⚠️ The "Not a Known Element" Error), Slide 25 (⚠️ Fixing the "Not a Known Element" Error) — 2 dedicated ⚠️ WARNING slides |
| Sample Code | `app.component.ts` has a 15-line comment block reproducing the exact error message, explaining the cause, and showing the fix |
| Speaker Script | Extended coverage as "the #1 beginner mistake" with extra time allocated |
| Exercises | Exercise 3 (Trigger the Error, Fix the Error) — entire exercise dedicated to breaking the app, reading the error, and fixing it; Exercise 8 (Team Roster) — step 9 deliberately triggers the same error |

---

### 7. Angular CLI commands: ng serve, ng generate, ng build, ng test

**FULLY COVERED**

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 26 (ng serve — Starting the Dev Server), Slide 27 (ng generate component — Creating Components), Slide 28 (ng build and ng test) — 3 dedicated slides |
| Sample Code | Every component file has a comment noting `ng generate component <name>` |
| Speaker Script | Covers all four commands with exact syntax, flags (`--port`), and shorthand (`ng g c`) |
| Exercises | Exercise 1 — `ng serve`; Exercise 2 — `ng generate component`; Every remaining exercise — `npx ng serve` to test results |

---

### 8. Angular DevTools

**PARTIALLY COVERED** — explained in slides but not directly practiced in any exercise

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 29 (What Angular DevTools Is), Slide 30 (Installing Angular DevTools) — 2 dedicated slides covering installation and Components/Profiler tabs |
| Sample Code | Not applicable — DevTools is a browser extension, not a code concept |
| Speaker Script | Covered in D1A-slides-script.md: "I'd recommend installing it during the break" |
| Exercises | ❌ No exercise requires installing or using Angular DevTools |

**What's missing:** No exercise step asks students to install Angular DevTools or use the Components tab to inspect a component. The slides say "you don't need Angular DevTools for the exercises" but the curriculum requirement says it should be covered. Exercise 6 (Scoped Styles) does ask students to use Chrome DevTools (F12 → Elements panel) to inspect `_ngcontent-*` attributes, which is close but not the same as using the Angular DevTools extension.

**Recommendation:** This is acceptable as-is. Angular DevTools is a "know it exists and install it" concept rather than a hands-on coding skill. The slides adequately cover it with installation steps. Adding a mandatory exercise for it would be disproportionate for Day 1. However, consider adding a **bonus step** to Exercise 6 or Exercise 8: "Bonus: If you installed Angular DevTools, open the Angular tab in DevTools and click on your component to see its @Input() values."

---

### 9. ViewEncapsulation basics

**FULLY COVERED**

| Deliverable | Evidence |
|-------------|----------|
| Slides | Slide 31 (ViewEncapsulation — How Component Styles Are Scoped) — covers Emulated, None, and ShadowDom with code example |
| Sample Code | `header.component.ts` explicitly sets `ViewEncapsulation.Emulated` with detailed comments explaining all three modes |
| Speaker Script | Explains scoping mechanism, `_ngcontent-*` attributes, and when to use each mode |
| Exercises | Exercise 6 (Scoped Styles in Action) — two sibling components with same CSS class names but different colors, students prove styles don't leak; Exercise 7 (ViewEncapsulation — None vs Emulated) — students toggle between `None` and `Emulated` and observe the difference |

---

## CURRICULUM COVERAGE SUMMARY

| Requirement | Status |
|-------------|--------|
| What Angular is, why it exists, vanilla JS comparison | ✅ FULLY COVERED |
| Installing CLI, generating project, file structure | ✅ FULLY COVERED |
| bootstrapApplication() and app.config.ts | ✅ FULLY COVERED |
| Standalone component — decorators, metadata, selector, template, styles | ✅ FULLY COVERED |
| The imports array on a standalone component | ✅ FULLY COVERED |
| "not a known element" error — cause and fix | ✅ FULLY COVERED |
| Angular CLI commands: ng serve, ng generate, ng build, ng test | ✅ FULLY COVERED |
| Angular DevTools | ⚠️ PARTIALLY COVERED — slides yes, exercise no |
| ViewEncapsulation basics | ✅ FULLY COVERED |

**Result:** 8 of 9 requirements fully covered. 1 partially covered (Angular DevTools — slides cover it but no exercise practices it).

---

## SECTION 2 — EXERCISE ALIGNMENT

For each concept taught in the slides, verify at least one exercise practices it.

| Concept | Status | Exercise(s) |
|---------|--------|-------------|
| What Angular is / why it exists / vanilla JS comparison | ✅ Practiced | Exercise 1: Scaffold and Explore — students explore the full project and see the structured approach vs vanilla JS |
| Installing the CLI | ✅ Practiced | Exercise 1: Scaffold and Explore — students use the pre-scaffolded project (CLI already ran `ng new`); Exercise 2: use `ng generate` |
| Generating a project with ng new | ✅ Practiced | Exercise 1: Scaffold and Explore — provided as a pre-scaffolded project so students can explore the output |
| Navigating the file structure | ✅ Practiced | Exercise 1: Scaffold and Explore — students annotate main.ts, app.config.ts, app.component.ts, index.html |
| bootstrapApplication() and app.config.ts | ✅ Practiced | Exercise 1: Scaffold and Explore — students annotate both files with comments |
| Standalone component decorator and metadata | ✅ Practiced | Exercise 2: Your First Component, Exercise 4: Passing Data with @Input, Exercise 5: Multiple Components, Exercise 8: Team Roster |
| The imports array on a standalone component | ✅ Practiced | Exercise 2, Exercise 3, Exercise 4, Exercise 5, Exercise 6, Exercise 8 — nearly every exercise requires modifying the imports array |
| "not a known element" error — cause and fix | ✅ Practiced | Exercise 3: Trigger the Error, Fix the Error — entire exercise dedicated to this; Exercise 8 step 9 — deliberate break |
| ng serve | ✅ Practiced | Exercise 1 and every subsequent exercise — students serve the app to verify results |
| ng generate component | ✅ Practiced | Exercise 2 (`ng g c greeting`), Exercise 5 (3 components), Exercise 6 (2 components), Exercise 8 (3 components) |
| ng build / ng test | ❌ Taught But Not Practiced | No exercise asks students to run `ng build` or `ng test` |
| Angular DevTools — installation and usage | ❌ Taught But Not Practiced | No exercise asks students to install or use Angular DevTools |
| ViewEncapsulation — Emulated (default scoping) | ✅ Practiced | Exercise 6: Scoped Styles in Action — prove styles don't leak between sibling components |
| ViewEncapsulation — None vs Emulated | ✅ Practiced | Exercise 7: ViewEncapsulation — None vs Emulated — toggle encapsulation mode and observe the difference |
| @Input() for parent-to-child data | ✅ Practiced | Exercise 4: Passing Data with @Input, Exercise 5: Multiple Components, Exercise 8: Team Roster |
| Multiple components in AppComponent | ✅ Practiced | Exercise 5: Multiple Components, Exercise 8: Team Roster |
| Legacy NgModule pattern (recognition) | ✅ Practiced | Exercise 9: Legacy NgModule Conversion — convert modern app to NgModule pattern |

### Unpracticed Concepts

1. **`ng build` / `ng test`** — Slide 28 covers both commands. No exercise requires running them.
   - **Recommendation:** Add a bonus step to Exercise 1: "Run `npx ng build` and check the `dist/` folder. What files were created?" This is low-effort and teaches the build output. `ng test` is appropriately deferred to Day 5 (Testing day).

2. **Angular DevTools** — Slides 29–30 cover installation and usage. No exercise requires it.
   - **Recommendation:** Add a bonus step to Exercise 6 or 8 (see Section 1 recommendation above).

---

## SECTION 3 — SCOPE CREEP (FUTURE TOPICS)

Comprehensive scan of all files in Day-1-A-Angular-Foundation/ for concepts from future days.

### 🚫 SCOPE CREEP ISSUES (2 found)

#### Issue 1: `SomePipe` in slides code example

- **Location:** [D1A-slides.md](Day-1-A-Angular-Foundation/Slides/D1A-slides.md#L367) — Slide 19
- **Current code:**
  ```typescript
  imports: [ChildComponent, SomePipe],
  ```
- **Problem:** Pipes are a Day 2 Part A concept. Showing a pipe in the `imports` array — even with a hypothetical name — demonstrates pipe usage before students know what pipes are. Students may ask "What is SomePipe?" and the slides provide no answer.
- **Classification:** 🚫 SCOPE CREEP — Pipes (Day 2 Part A)
- **Fix:** Change to `imports: [ChildComponent, AnotherComponent]` or simply `imports: [ChildComponent]`. The accompanying slide text ("Lists every component, directive, and pipe this template uses") already explains that pipes *can* go here — the code example doesn't need to demonstrate it.

#### Issue 2: `'RxJS'` as a skill badge label in Project

- **Location:** [app.component.ts](Day-1-A-Angular-Foundation/Project/src/app/app.component.ts#L60) — Project/
- **Current code:**
  ```typescript
  skills: string[] = ['Angular', 'TypeScript', 'HTML & CSS', 'RxJS', 'Node.js'];
  ```
- **Problem:** RxJS is a Day 3 Part A concept. While this is purely a string value (not code usage), students seeing "RxJS" as a skill badge may ask "What is RxJS?" on Day 1, creating an unplanned tangent.
- **Classification:** 🚫 SCOPE CREEP (minor) — RxJS (Day 3 Part A)
- **Fix:** Replace `'RxJS'` with `'CSS'` or `'Git'` — technologies students already know.

### ✅ ACCEPTABLE FORWARD REFERENCES (all properly attributed)

| Concept | Location | Context | Verdict |
|---------|----------|---------|---------|
| @Output() | SampleCode/header.component.ts | "For that, you'd use @Output() which we cover in Day 1 Part B" | ✅ ACCEPTABLE |
| @Output() | SampleCode/footer.component.ts | "Not every component needs @Input() or @Output()" | ✅ ACCEPTABLE |
| @Output() | Project/bio-card.component.ts | "for that you'd use @Output() (Day 1 Part B)" | ✅ ACCEPTABLE |
| @for | Project/app.component.html | "on Day 2 you'll learn @for to do this more elegantly" | ✅ ACCEPTABLE |
| provideHttpClient() | Slides Slide 15 | "Day 3: provideHttpClient()" | ✅ ACCEPTABLE |
| provideRouter() | Slides Slide 15 | "Day 4: provideRouter(routes)" | ✅ ACCEPTABLE |
| provideHttpClient() | SampleCode/app.config.ts | "you'll add provideHttpClient() here" | ✅ ACCEPTABLE |
| provideRouter() | SampleCode/app.config.ts | "you'll add provideRouter(routes) here" | ✅ ACCEPTABLE |
| provideHttpClient / provideRouter | Slides Slide 38 (legacy contrast) | Preview showing modern config vs legacy AppModule | ✅ ACCEPTABLE |
| HttpClientModule / RouterModule | Slides Slide 39 (legacy contrast) | Legacy example showing what modern replaced | ✅ ACCEPTABLE |
| FormsModule | Slides Slide 37 (legacy contrast) | Inside legacy NgModule declarations example | ✅ ACCEPTABLE |
| ProductFilterPipe | Slides Slide 41 (legacy contrast) | Inside legacy NgModule declarations — illustrates the boilerplate | ✅ ACCEPTABLE |
| Pipes (generic) | Various slides/scripts | "Lists every component, directive, and pipe" — generic description of what imports array supports | ✅ ACCEPTABLE |

### Items NOT Found (Confirmed Clean)

- ❌ No `ngOnInit`, `ngOnDestroy`, `OnInit`, `OnDestroy` in any authored file
- ❌ No `signal()`, `computed()`, `effect()` in any authored file
- ❌ No `@if`, `@for`, `@switch` in any authored code (only as a forward reference comment in Project/)
- ❌ No `ng-content`, `ng-container`, `ng-template` in any file
- ❌ No `[ngClass]`, `[ngStyle]` in any file
- ❌ No `@Injectable`, `inject()` in any authored file
- ❌ No `Observable`, `BehaviorSubject`, `Subject`, `toSignal()` in any authored file
- ❌ No `HttpClient`, `provideHttpClient()` used in code (only forward references)
- ❌ No `provideRouter()`, `RouterModule`, `routerLink`, `RouterOutlet` used in code
- ❌ No `FormGroup`, `FormControl`, `FormBuilder`, `ReactiveFormsModule` in any file
- ❌ No `FormsModule` used in modern code (only in legacy contrast)

### Exercises & Solutions — CLEAN

All 9 exercise folders and all 9 solution folders scanned: **zero scope creep**. No future-day concepts appear in any exercise starter code or solution code.

### Project-Portfolio-Builder — CLEAN

All 7 project ideas use only Day 1 Part A concepts: standalone components, `@Input()`, property binding, interpolation, ViewEncapsulation. No future-day concepts suggested.

---

## SECTION 4 — CROSS-DELIVERABLE CONSISTENCY

### Do slides, sample code, exercises, and project teach the same patterns?

**✅ YES — All deliverables are consistent.**

| Pattern | Slides | SampleCode | Exercises | Project |
|---------|--------|------------|-----------|---------|
| `standalone: true` on all components | ✅ Slide 19–20 | ✅ All 3 components | ✅ All 8 modern exercises | ✅ All 5 components |
| `templateUrl` (never inline template) | ✅ Slide 19 | ✅ All 3 components | ✅ All exercises | ✅ All 5 components |
| `styleUrl` (never inline styles) | ✅ Slide 19 | ✅ All 3 components | ✅ All exercises | ✅ All 5 components |
| imports array for child components | ✅ Slides 22–23 | ✅ AppComponent imports Header + Footer | ✅ Multiple exercises | ✅ AppComponent imports 4 children |
| `@Input()` for parent→child data | ✅ Slide 19 (mentions) | ✅ HeaderComponent `@Input() title` | ✅ Ex 4, 5, 8 | ✅ BioCard (4 inputs), SkillBadge (1 input) |
| `ViewEncapsulation.Emulated` | ✅ Slide 31 | ✅ HeaderComponent sets explicitly | ✅ Ex 6, 7 | ✅ Default (not explicit) |
| bootstrapApplication() | ✅ Slides 13–16 | ✅ main.ts | ✅ All exercises | ✅ main.ts |
| app.config.ts providers | ✅ Slide 15 | ✅ app.config.ts | ✅ All exercises | ✅ app.config.ts |
| Legacy NgModule pattern | ✅ Slides 32–41 | ✅ SampleLegacyCode/ | ✅ Exercise 9 | N/A |

### Any contradictions between deliverables?

**✅ NO CONTRADICTIONS FOUND.**

All deliverables use identical patterns:
- Component decorators are identical across SampleCode, Exercises, and Project
- The `@Input()` decorator pattern matches between slides code examples, sample code, and exercises
- Legacy code uses consistent NgModule patterns in both SampleLegacyCode/ and Exercise 9
- File naming follows kebab-case everywhere
- Selectors use `app-` prefix everywhere

### Does the speaker script accurately describe what's in the slides and sample code?

**✅ YES — Both speaker scripts are accurate.**

**D1A-slides-script.md:**
- Covers all 42 slides in order with matching section headers
- Correctly describes every code example shown in the slides
- Accurately explains the "not a known element" error, ViewEncapsulation, and the startup sequence
- Legacy contrast sections correctly describe the pain points of NgModule

**D1A-code-walkthrough-script.md:**
- Walks through every file in SampleCode/ in the correct order
- Accurately describes the `@Input()` on HeaderComponent, the `readonly currentYear` on FooterComponent
- Correctly explains the imports array, standalone: true, and templateUrl/styleUrl
- Legacy walkthrough accurately describes the module files, declarations/imports/exports dance, and the added indirection

**One minor inconsistency noted (also flagged in Gap Check 1):**
- The code walkthrough script's Part 2 section header says "LegacySampleCode/" but the actual folder is named `SampleLegacyCode/`. This is a cosmetic label mismatch that doesn't affect content accuracy but should be corrected.

---

## OVERALL ASSESSMENT

| Category | Result |
|----------|--------|
| Curriculum Coverage | **8/9 FULLY COVERED**, 1 PARTIALLY COVERED (Angular DevTools — no exercise) |
| Exercise Alignment | **15/17 concepts practiced**, 2 not practiced (`ng build`/`ng test`, Angular DevTools) |
| Scope Creep | **2 minor issues** (`SomePipe` in slides, `'RxJS'` in Project data) |
| Cross-Deliverable Consistency | **FULLY CONSISTENT** — no contradictions |
| Speaker Script Accuracy | **ACCURATE** — 1 minor folder name typo |

### Summary of Issues to Fix

| Priority | Issue | Fix |
|----------|-------|-----|
| 🟡 Minor | `SomePipe` in Slide 19 code example (scope creep) | Change to `AnotherComponent` or remove |
| 🟡 Minor | `'RxJS'` in Project skills array (scope creep) | Replace with `'CSS'` or `'Git'` |
| 🟡 Minor | `ng build`/`ng test` taught but not practiced | Add bonus step to Exercise 1 |
| 🔵 Low | Angular DevTools taught but not practiced | Add optional bonus step to Exercise 6 or 8 |
| 🔵 Low | "LegacySampleCode/" label in code walkthrough script | Correct to "SampleLegacyCode/" |

**Overall Verdict: Day 1 Part A content is well-aligned with the curriculum, exercises thoroughly practice the taught concepts, scope creep is minimal (2 minor issues), and all deliverables are internally consistent. No critical issues.**

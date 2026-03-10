# Complete Filled Copilot Prompt Library
## All Days & Parts — Ready to Paste

---

## HOW TO USE

**Master Context is auto-loaded.** The file `.github/copilot-instructions.md` is automatically included in every Copilot chat session. You do NOT need to paste it manually.

**To run a prompt:** Copy the specific day/part prompt from this file and paste it directly into Copilot chat. That's it.

**File references marked `CONTEXT FILES:`** tell Copilot which previously generated files to read for context. Each reference points to a folder in the workspace (e.g., `D1A/`). When you paste a prompt into Copilot chat, attach the referenced files using `#file:D1A/filename.md` syntax, or simply open the files as editor tabs so Copilot can see them. You do NOT need to paste file contents inline — Copilot reads the files directly.

**Folder organization:** All generated output for a day/part goes in a folder named for that section: `D1A/`, `D1B/`, `D2A/`, `D2B/`, `D3A/`, `D3B/`, `D4A/`, `D4B/`, `D5A/`, `D5B/`. Within each day/part folder, sample code goes in a `SampleCode/` subfolder and legacy sample code goes in a `LegacySampleCode/` subfolder. Cross-Day Continuity Checks go in a folder named `Cross-Day-Checks/`. The Final Gap Check goes in `Final-Review/`. Each prompt includes an OUTPUT FOLDER line — Copilot must create that folder if it doesn't exist and save all generated files there.

**Session order for every Part:**
1. Sample Code → 2. Slides → 3. Speaker Script → 4. Exercises → 5. Sample Project → 6. Gap Check

**Every prompt ends with a NOW WRITE / NOW GENERATE command in bold.** This is what tells Copilot to produce output rather than describe what it would do. Do not remove it.

---

---

> **Note:** Master Context lives in `.github/copilot-instructions.md` and is auto-loaded by Copilot.
> You do not need to copy or paste it. Just paste the day-specific prompt below.

---

---

# DAY 1 PART A — What is Angular & Getting Started

---

## D1A — SAMPLE CODE

```

You are generating sample code for Day 1 Part A of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D1A/SampleCode/`. Save legacy sample code files in `D1A/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure with each component in its own subfolder.

LESSON CONCEPTS TO DEMONSTRATE:
- What Angular is and how it differs from vanilla JS (shown through project structure and comments)
- bootstrapApplication() in main.ts and app.config.ts structure
- A standalone AppComponent with imports array
- A HeaderComponent with a title @Input() and selector app-header
- A FooterComponent with a currentYear property and selector app-footer
- AppComponent rendering both HeaderComponent and FooterComponent
- ViewEncapsulation.Emulated — scoped styles on HeaderComponent that do not leak
- The "not a known element" error — a comment block showing what it looks like and what causes it
- Angular CLI — comments showing which CLI command generated each file

DELIVERABLES (modern — `SampleCode/`):
1. package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css
3. src/main.ts
4. src/app/app.config.ts
5. src/app/app.component.ts / .html / .css
6. src/app/header/header.component.ts / .html / .css
7. src/app/footer/footer.component.ts / .html / .css

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based Angular app demonstrating the same concepts but built
entirely with legacy patterns: bootstrapModule(AppModule), AppModule with declarations and
imports arrays, NgModule-based component registration, constructor injection.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, src/app/app.component.ts/.html/.css,
src/app/header/header.component.ts/.html/.css, src/app/footer/footer.component.ts/.html/.css.
Every file has comments explaining what standalone components replaced.

Each file must have a comment block at the top explaining its role. Every significant line
must have an inline comment explaining what it demonstrates. No NgModule in modern files.

**NOW WRITE ALL OF THE FILES LISTED ABOVE. Output each file as a separate labeled code
block. Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/header/header.component.ts or
### LegacySampleCode/src/app/app.module.ts).**
```

---

## D1A — SLIDES

```

You are generating slides for Day 1 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1A/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- What Angular is, why it exists, how it compares to vanilla JS
- Installing the CLI and generating a project
- Understanding the generated file structure
- What main.ts does — bootstrapApplication() and app.config.ts
- Your first standalone component — decorators, metadata, selector, template, styles
- The imports array on a standalone component
- ⚠️ WARNING: The "not a known element" error — what it looks like, why it happens, two-second fix
- Angular CLI commands — ng serve, ng generate, ng build, ng test
- Angular DevTools — install on Day 1
- ViewEncapsulation — why styles are scoped by default
LEGACY CONTRAST SLIDES (after all modern concept slides):
- App entry point — show bootstrapModule(AppModule) code; contrast with modern bootstrapApplication()
- Component registration — show declarations: [] in NgModule; contrast with modern imports: [] on component
- App config — show AppModule providers array; contrast with modern app.config.ts providers
- Feature grouping — show NgModule per feature pattern; contrast with modern standalone components by folder
Each legacy slide shows actual legacy code, explains what pain it caused, and shows the modern equivalent side by side.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 1 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept
listed. After all modern slides, include the legacy contrast slides showing actual legacy code examples.**
```

---

## D1A — SPEAKER SCRIPT

```

You are writing the speaker script for Day 1 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1A/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D1A/` folder in the workspace — the slides and sample code files are already generated there.

SCRIPT RULES:
- Write exactly what the instructor says out loud — full sentences, not bullets
- For CONCEPT slides: plain English first, then why it matters, then connect to vanilla JS
- For CODE slides: walk through line by line; explain what AND why
- For the ⚠️ WARNING slide: explain what the error message looks like, why beginners
  hit it, and the exact fix
- For the legacy contrast slides: walk through each legacy code example,
  explain what pain it caused, and show why the modern approach is better
- Transitions are natural spoken sentences — never "next slide please"
- This is the very first session — assume zero Angular knowledge

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 1 Part A. Write a script
section for every slide. Format as: ## [Slide Title] followed by the full spoken text.**
```

---

## D1A — EXERCISES

```

You are writing student exercises for Day 1 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1A/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- Generating a project with the CLI
- Navigating the file structure
- Creating standalone components with ng generate
- The imports array — adding and removing dependencies
- @Input() for passing data into a component
- ViewEncapsulation and scoped styles
- bootstrapApplication and app.config.ts
- Rendering multiple components in AppComponent
- Triggering and fixing the "not a known element" error

CONTEXT FILES: Read all files from the `D1A/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises progressing from BEGINNER drills to CHALLENGE combinations
- Every concept above must appear in at least one exercise
- Each exercise builds something new — students never copy the sample code
- Each step produces something visible so students know they're on track
- Follow all multi-file component rules from the Master Context

FORMAT FOR EACH EXERCISE:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building
[2–3 sentences]
### Instructions
[numbered steps]
### Acceptance Criteria
- [ ] item
### Hints
**Hint 1 — [Topic]:** ...

Collect all solutions at the end under # SOLUTIONS, each solution file as its own
labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 1 Part A.**
```

---

## D1A — SAMPLE PROJECT

```

You are generating the Day 1 Part A sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1A/` in the workspace. Save all generated files there.

PROJECT: Personal Bio Card
A static personal bio card app. Contains a HeaderComponent, a BioCardComponent that
accepts name, role, bio, and avatarUrl via @Input(), a list of SkillBadgeComponents,
and a FooterComponent. No data fetching, no routing — purely component structure.

CONCEPTS TO DEMONSTRATE:
- bootstrapApplication() and app.config.ts
- Standalone components with imports array
- Multiple components in AppComponent
- @Input() on BioCardComponent and SkillBadgeComponent
- ViewEncapsulation scoped styles — card styles do not affect the header
- Clean, readable file structure a beginner can understand at a glance

This project represents ONLY what students know after Day 1 Part A. No signals,
no services, no routing.

**NOW WRITE THE COMPLETE PROJECT. Provide:**
1. A full file tree listing every file
2. Every .ts, .html, and .css file as a separate labeled code block
3. A README.md listing what each file demonstrates and which CLI command created it
```

---

## D1A — GAP CHECK

```

You are reviewing the generated materials for Day 1 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1A/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- What Angular is, why it exists, how it compares to vanilla JS
- Installing the CLI, generating a project, understanding the file structure
- bootstrapApplication() and app.config.ts
- Standalone component — decorators, metadata, selector, template, styles
- The imports array on a standalone component
- "not a known element" error — cause and fix
- Angular CLI commands: ng serve, ng generate, ng build, ng test
- Angular DevTools
- ViewEncapsulation basics

CONTEXT FILES: Read all files from the `D1A/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

For each curriculum requirement above, mark:
- FULLY COVERED — explained in slides, shown in code, practiced in exercise
- PARTIALLY COVERED — present but too shallow for a beginner (explain what's missing)
- MISSING — not present at all (state which material it should appear in)

EXERCISE ALIGNMENT CHECK:
For each concept in the slides, confirm it appears in at least one exercise.
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise it should be added to]

SCOPE CREEP CHECK:
List any concept appearing in the materials that is NOT in the curriculum requirements.
```

---
---

# DAY 1 PART B — Templates, Data Binding & Component Communication

---

## D1B — SAMPLE CODE

```

You are generating sample code for Day 1 Part B of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D1B/SampleCode/`. Save legacy sample code files in `D1B/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure with each component in its own subfolder.

LESSON CONCEPTS TO DEMONSTRATE:
- Interpolation {{ }}
- Property binding [property]
- Event binding (event)
- Two-way binding [(ngModel)] — FormsModule in component imports array
- Template reference variables — #myRef reading input value, passing to handler, wiring siblings
- Safe navigation ?. — user?.address?.city pattern
- Nullish coalescing ?? — user?.name ?? 'Guest' fallback
- @Input() passing data from parent to child
- @Output() and EventEmitter passing events from child to parent
- ngOnInit — processing @Input() data; comment explaining why not constructor
- ngOnDestroy — cancelling a timer; building the cleanup habit
- Signals first look — signal() and computed() in a simple counter;
  clearly commented: "Day 2 preview — not required for today's exercise"

DELIVERABLES (modern — `SampleCode/`):
1. Project config: package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css, src/main.ts, src/app/app.config.ts
3. src/app/app.component.ts / .html / .css — parent using all three; safe navigation + nullish coalescing
4. src/app/product-card/product-card.component.ts / .html / .css — @Input() name+price; @Output() addToCart;
   ngOnInit builds display label; template ref on quantity input
5. src/app/character-counter/character-counter.component.ts / .html / .css — all four binding types; ngOnDestroy cancels interval
6. src/app/signal-counter/signal-counter.component.ts / .html / .css — signal() and computed() preview; labeled as preview

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based Angular app demonstrating the same concepts but built
entirely with legacy patterns: NgModule with FormsModule in imports, components registered
in declarations array, constructor injection pattern.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, src/app/app.component.ts/.html/.css,
src/app/product-card/product-card.component.ts/.html/.css,
src/app/character-counter/character-counter.component.ts/.html/.css.
Every file has comments explaining what the modern standalone approach replaced.

**NOW WRITE ALL OF THE FILES. Output each as a separate labeled code block.
Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/product-card/product-card.component.ts or
### LegacySampleCode/src/app/app.module.ts).**
```

---

## D1B — SLIDES

```

You are generating slides for Day 1 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1B/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- Interpolation {{ }}
- Property binding [property]
- Event binding (event)
- Two-way binding [(ngModel)] and why FormsModule is needed
- Template reference variables — #myRef
- Safe navigation ?. and nullish coalescing ??
- @Input() — data flows down
- @Output() and EventEmitter — events flow up
- ngOnInit — right place for initialization; why not the constructor
- ngOnDestroy — cleanup from day one
- Signals first look — signal(), computed(); labeled as Day 2 preview
LEGACY CONTRAST SLIDES (after all modern concept slides):
- ngModel setup — show FormsModule in NgModule; contrast with modern FormsModule in component imports
- Passing data down — @Input() is the same in both; show the NgModule context around it
- Passing events up — @Output() + EventEmitter is the same; show the NgModule context around it
- Lifecycle hooks — OnInit/OnDestroy are the same; show a full NgModule-based component for comparison
Each legacy slide shows actual legacy code, explains the NgModule-based setup, and highlights the difference in how modules are organized.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 1 Part B. Generate your own focused code
examples for each code slide — do not reference external files. After all modern
slides, include the legacy contrast slides showing actual legacy code examples. The
signals preview slide must clearly state exercises do not require signals yet.**
```

---

## D1B — SPEAKER SCRIPT

```

You are writing the speaker script for Day 1 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1B/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D1B/` folder in the workspace — the slides and sample code files are already generated there.

SPECIFIC GUIDANCE:
- Four binding types: explain the direction of data flow for each one
- Template refs: contrast with two-way binding — "with a ref you read the value
  only when you need it, instead of keeping it in sync constantly"
- Safe navigation: connect to Day 3 — "you'll need this the moment you load data from an API"
- ngOnInit vs constructor: this is a common mistake — spend extra time;
  explain DI timing in plain English
- Signals preview: keep it brief; explicitly tell students "don't worry about
  fully understanding this yet — we go deep tomorrow"

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 1 Part B.**
```

---

## D1B — EXERCISES

```

You are writing student exercises for Day 1 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1B/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- Interpolation
- Property binding
- Event binding
- Two-way binding with ngModel
- Template reference variables
- Safe navigation ?.
- Nullish coalescing ??
- @Input()
- @Output() and EventEmitter
- ngOnInit
- ngOnDestroy
- Signals first look — signal() and computed() only; no effect() yet

CONTEXT FILES: Read all files from the `D1B/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises from BEGINNER drills to CHALLENGE combinations
- Every concept above in at least one exercise
- Signals exercises are BEGINNER only — signal() and computed() only
- Follow all multi-file component rules from the Master Context

FORMAT:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building / ### Instructions / ### Acceptance Criteria / ### Hints

All solutions under # SOLUTIONS, each file as its own labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 1 Part B.**
```

---

## D1B — SAMPLE PROJECT

```

You are generating the Day 1 Part B sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1B/` in the workspace. Save all generated files there.

PROJECT: Tip Calculator
A reusable TipInputComponent accepts bill amount and tip percentage via @Input() and
emits a calculated result to the parent AppComponent via @Output(). AppComponent displays
the tip amount and total. Demonstrates all four binding types, template reference
variables, ngOnInit, and ngOnDestroy.

CONCEPTS TO DEMONSTRATE:
- All four binding types in real use
- Template reference variables
- Safe navigation and nullish coalescing on the result display
- @Input() and @Output() between parent and child
- ngOnInit to set a default tip percentage
- ngOnDestroy to clear a calculation history interval timer

Represents only Day 1 Part B knowledge. No signals required — may show signal counter
as a clearly labeled optional bonus section.

**NOW WRITE THE COMPLETE PROJECT:**
1. Full file tree
2. Every .ts, .html, .css file as a separate labeled code block
3. README.md
```

---

## D1B — GAP CHECK

```

You are reviewing the generated materials for Day 1 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D1B/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- Interpolation {{ }}
- Property binding, event binding, two-way binding [(ngModel)]
- Template reference variables
- Safe navigation ?. and nullish coalescing ??
- @Input() and @Output() + EventEmitter
- ngOnInit — why not constructor
- ngOnDestroy — cleanup
- Signals first look — signal(), computed()

CONTEXT FILES: Read all files from the `D1B/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

COVERAGE: Mark each requirement FULLY COVERED / PARTIALLY COVERED / MISSING.

EXERCISE ALIGNMENT CHECK:
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise to add it to]

SCOPE CREEP: List anything in the materials not in the requirements.
```

---
---

# DAY 1 — CROSS-DAY CONTINUITY CHECK (Day 1 → Day 2)

```

You are checking whether Day 1 materials adequately prepare students for Day 2.

OUTPUT FOLDER: Create or use the folder `Cross-Day-Checks/` in the workspace. Save output as `Day1-to-Day2-continuity.md`.

DAY 1 TAUGHT:
Part A: CLI, project structure, bootstrapApplication, standalone components, imports
array, "not a known element" error, CLI commands, DevTools, ViewEncapsulation
Part B: interpolation, property/event/two-way binding, template refs, safe
navigation/nullish coalescing, @Input/@Output, ngOnInit, ngOnDestroy,
signals first look (signal(), computed())

DAY 2 WILL TEACH:
Part A: ng-content, named slots, ngAfterContentInit, ng-container, ng-template,
@if/@else/@for/@switch, @let, [ngClass]/[ngStyle], built-in pipes, pure/impure pipes, custom pipe
Part B: signal(), computed(), effect() with cleanup, input() readonly, output(),
model(), fine-grained change detection, ngOnChanges as legacy contrast

CONTEXT FILES: Read all files from the `D1A/` and `D1B/` folders in the workspace — all Day 1 generated materials are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

1. List every Day 2 concept that builds directly on something from Day 1
2. For each, confirm whether Day 1 materials explain the prerequisite deeply enough
3. Flag any Day 2 concept whose Day 1 prerequisite is missing or shallow
4. Special focus: Day 2 Part B teaches signals in full — confirm students have felt
   the manual @Input/@Output pain after Day 1 so signals land as a real solution,
   not an abstract feature
5. List where Day 2 materials should call back to Day 1 examples
```

---
---

# DAY 2 PART A — Content Projection, Directives & Pipes

---

## D2A — SAMPLE CODE

```

You are generating sample code for Day 2 Part A of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D2A/SampleCode/`. Save legacy sample code files in `D2A/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure with each component in its own subfolder.

LESSON CONCEPTS TO DEMONSTRATE:
- ng-content single-slot projection — CardComponent wrapping projected content
- Named ng-content slots with select — LayoutCardComponent with header/body/footer slots
- ngAfterContentInit — logs a message when projected content is ready;
  DO NOT use @ContentChild here — it is in Extended Topics and has not been taught;
  the sole purpose is to show when the hook fires
- ng-container — apply @if without adding a real DOM element
- ng-template — used as @else block and as a reusable snippet
- @let local variable — define a filtered count once, use in both @if and interpolation;
  comment: "@let is NOT a signal — it re-evaluates on change detection, not reactively"
- @if / @else using ng-template for the else block
- @for with required track — track item.id
- @switch / @case
- [ngClass] for conditional classes
- [ngStyle] for inline style binding
- Built-in pipes: date, currency, uppercase, async
- Pure pipe behavior — FilterPipe that won't update on array mutation; comment explains why
- Custom pure pipe: TruncatePipe — truncates string to configurable character limit

DELIVERABLES (modern — `SampleCode/`):
1. Project config: package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css, src/main.ts, src/app/app.config.ts
3. src/app/app.component.ts / .html / .css
4. src/app/card/card.component.ts / .html / .css — single-slot ng-content
5. src/app/layout-card/layout-card.component.ts / .html / .css — named slots; ngAfterContentInit logs message only
6. src/app/task-list/task-list.component.ts / .html / .css — @for, @if/@else, ng-template, ng-container, @let, [ngClass]
7. src/app/movie-list/movie-list.component.ts / .html / .css — @switch, [ngStyle], built-in pipes, FilterPipe
8. src/app/pipes/truncate.pipe.ts — custom pure pipe with configurable limit
9. src/app/pipes/filter.pipe.ts — pure pipe; comments explaining pure re-evaluation behavior

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based Angular app demonstrating the same concepts but built
entirely with legacy patterns: *ngIf, *ngFor with trackBy, *ngSwitch, *ngIf="expr as name",
NgModule with declarations and imports.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, src/app/app.component.ts/.html/.css,
src/app/task-list/task-list.component.ts/.html/.css, src/app/movie-list/movie-list.component.ts/.html/.css,
src/app/pipes/truncate.pipe.ts, src/app/pipes/filter.pipe.ts.
Every file has comments explaining what @if/@for/@switch replaced.

**NOW WRITE ALL OF THE FILES. Output each as a separate labeled code block.
Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/card/card.component.ts or
### LegacySampleCode/src/app/app.module.ts).**
```

---

## D2A — SLIDES

```

You are generating slides for Day 2 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2A/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- ng-content — single-slot projection
- Named ng-content slots with select
- ngAfterContentInit — fires when projected content is ready
- Note on @ViewChild — exists for accessing child DOM/components; covered in Extended Topics
- ng-container — no real DOM node
- ng-template — renders nothing; used for @else and reusable snippets
- @if / @else blocks
- @for with required track — what track does for DOM reconciliation
- @switch / @case
- @let local variable — re-evaluates on change detection, NOT a signal
- ⚠️ WARNING: @let vs computed() — students confuse these; @let is not reactive
- [ngClass] and [ngStyle]
- Built-in pipes: date, currency, uppercase, lowercase, json, async
- Pure vs impure pipes
- ⚠️ WARNING: pure pipe mutation gotcha — pipe won't update if array is mutated in place
- Custom pure pipe with @Pipe and transform()
LEGACY CONTRAST SLIDES (after all modern concept slides):
- Conditional rendering — show *ngIf + <ng-template #else> code; contrast with modern @if / @else
- List rendering — show *ngFor with trackBy method; contrast with modern @for (track item.id)
- Switch rendering — show [ngSwitch] / *ngSwitchCase; contrast with modern @switch / @case
- Track — show optional trackBy in *ngFor; contrast with required track in @for
- Template local variable — show *ngIf="expr as name" pattern; contrast with modern @let name = expr
Each legacy slide shows actual legacy code, explains the structural directive syntax, and shows the cleaner modern equivalent side by side.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 2 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept
listed. After all modern slides, include the legacy contrast slides showing actual legacy code examples.**
```

---

## D2A — SPEAKER SCRIPT

```

You are writing the speaker script for Day 2 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2A/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D2A/` folder in the workspace — the slides and sample code files are already generated there.

SPECIFIC GUIDANCE:
- ng-content: use the picture frame analogy — "the frame is the component;
  the picture is whatever the parent puts in"
- ngAfterContentInit: tie directly to ng-content — "this hook only matters because
  of what you just learned about projection"
- @let: be explicit about the gotcha — "students who just learned computed() will
  try to use @let thinking it's reactive — it is not"
- Pure pipe mutation: show the exact scenario — "you filter an array, push a new
  item directly into it, and nothing updates"
- Reference Day 1: "You already saw @if in the signals preview yesterday — now
  you're seeing the full @if/@else/ng-template pattern"

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 2 Part A.**
```

---

## D2A — EXERCISES

```

You are writing student exercises for Day 2 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2A/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- ng-content single-slot projection
- Named ng-content slots with select
- ngAfterContentInit
- ng-container
- ng-template for @else blocks
- @let local variable
- @if / @else
- @for with track
- @switch / @case
- [ngClass]
- [ngStyle]
- Built-in pipes: date, currency, uppercase
- Pure vs impure pipe behavior
- Custom pure pipe with transform()

CONTEXT FILES: Read all files from the `D2A/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises from BEGINNER drills to CHALLENGE combinations
- Every concept above in at least one exercise
- Final 1–2 exercises combine ng-content + control flow + pipes
- Follow all multi-file component rules from the Master Context

FORMAT:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building / ### Instructions / ### Acceptance Criteria / ### Hints

All solutions under # SOLUTIONS, each file as its own labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 2 Part A.**
```

---

## D2A — SAMPLE PROJECT

```

You are generating the Day 2 Part A sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2A/` in the workspace. Save all generated files there.

PROJECT: Movie Listing
A movie listing app with genre filters, formatted dates and ratings, and a reusable
MovieCardComponent built with named ng-content slots (poster, title, details).
Uses @for with track, @if/@else for empty state, @let for filtered count shown in
both the header and list, [ngClass] for genre badge colors, TruncatePipe for long
descriptions, and FilterPipe for genre filtering.

CONCEPTS TO DEMONSTRATE:
- ng-content single-slot and named slots
- ngAfterContentInit (log only — no @ContentChild)
- ng-container and ng-template
- @for with track, @if/@else, @switch, @let
- [ngClass] and [ngStyle]
- Built-in pipes: date, currency, uppercase
- Pure pipe and custom pure pipe (TruncatePipe, FilterPipe)

Represents Day 1 and Day 2 Part A knowledge only.

**NOW WRITE THE COMPLETE PROJECT:**
1. Full file tree
2. Every .ts, .html, .css file as a separate labeled code block
3. README.md
```

---

## D2A — GAP CHECK

```

You are reviewing the generated materials for Day 2 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2A/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- ng-content single-slot and named slots
- ngAfterContentInit (no @ContentChild — not taught yet)
- @ViewChild note pointing to Extended Topics
- ng-container and ng-template
- @if/@else, @for with track, @switch/@case
- @let — not reactive, re-evaluates on change detection
- [ngClass] and [ngStyle]
- Built-in pipes: date, currency, uppercase, lowercase, json, async
- Pure vs impure pipes
- Custom pure pipe

CONTEXT FILES: Read all files from the `D2A/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

COVERAGE: Mark each requirement FULLY COVERED / PARTIALLY COVERED / MISSING.

EXERCISE ALIGNMENT CHECK:
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise to add it to]

SCOPE CREEP: List anything in materials not in requirements.
```

---
---

# DAY 2 PART B — Signals

---

## D2B — SAMPLE CODE

```

You are generating sample code for Day 2 Part B of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D2B/SampleCode/`. Save legacy sample code files in `D2B/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure with each component in its own subfolder.

LESSON CONCEPTS TO DEMONSTRATE:
- signal() — .set() and .update()
- computed() — read-only; recalculates only when dependency changes
- effect() — side effect when signal changes; cleanup function returned from effect()
- Signal-based input() — readonly; comment warning: cannot call .set() from inside component
- Signal-based output() — .emit()
- model() — two-way signal binding between parent and child
- Fine-grained change detection — comment explaining only affected DOM nodes re-render
- ngOnChanges as legacy contrast — demonstrated in the `LegacySampleCode/` subfolder; SimpleChanges;
  students can run the legacy app to compare the experience
- Angular direction callout — after signals are fully shown, a comment block:
  "Zoneless (stable in v21+) is the payoff — signals tell Angular exactly what changed,
  so zone.js is no longer needed"

DELIVERABLES (modern — `SampleCode/`):
1. Project config: package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css, src/main.ts, src/app/app.config.ts
3. src/app/app.component.ts / .html / .css
4. src/app/shopping-cart/shopping-cart.component.ts / .html / .css — plain property version with problem comments
5. src/app/shopping-cart-signals/shopping-cart-signals.component.ts / .html / .css — signal version; comments on what changed
6. src/app/search-box/search-box.component.ts / .html / .css — signal() input, computed() results, effect() with cleanup
7. src/app/budget-tracker/budget-tracker.component.ts / .html / .css — computed() total/spent/remaining from signal list
8. src/app/rating-input/rating-input.component.ts / .html / .css — model() two-way; input() for config; output() for event

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based Angular app demonstrating the same concepts but built
entirely with legacy patterns: @Input() mutable properties, ngOnChanges with SimpleChanges,
constructor injection, NgModule with declarations.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, src/app/app.component.ts/.html/.css,
src/app/shopping-cart/shopping-cart.component.ts/.html/.css,
src/app/on-changes-demo/on-changes-demo.component.ts/.html/.css.
Every file has comments explaining what computed() and effect() replaced.

**NOW WRITE ALL OF THE FILES. Output each as a separate labeled code block.
Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/shopping-cart/shopping-cart.component.ts or
### LegacySampleCode/src/app/app.module.ts).**
```

---

## D2B — SLIDES

```

You are generating slides for Day 2 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2B/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- The problem with zone.js — checks entire component tree on every event
- signal() — .set(), .update()
- computed() — read-only; recalculates only when dependency changes
- effect() — side effects; cleanup function
- Signal-based input() — modern @Input() replacement
- ⚠️ WARNING: input() is always readonly — cannot call .set() from inside the component
- Signal-based output() — modern @Output() replacement
- model() — two-way signal binding; replaces @Input()/@Output() pair
- Fine-grained change detection — only affected DOM nodes update
- ngOnChanges — legacy contrast: how input changes were handled before signals
- Angular direction callout slide — zoneless stable in v21+; signals are the reason
LEGACY CONTRAST SLIDES (after all modern concept slides):
- Component input — show @Input() mutable property; contrast with modern input<T>() readonly Signal
- Component output — show @Output() + EventEmitter; contrast with modern output<T>()
- Two-way binding — show @Input() + @Output() pair pattern; contrast with modern model<T>()
- Reacting to input changes — show ngOnChanges(SimpleChanges); contrast with modern computed() or effect()
- Derived state — show getter or ChangeDetectorRef approach; contrast with modern computed(() => ...)
- Side effects — show ngOnChanges/ngDoCheck/ngOnDestroy; contrast with modern effect() with cleanup
- Change detection — show Zone.js full tree check; contrast with modern fine-grained signals
- Manual optimization — show OnPush + markForCheck(); contrast with modern signals (not needed)
Each legacy slide shows actual legacy code, explains the boilerplate overhead, and shows the modern equivalent side by side.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 2 Part B. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept
listed. After all modern slides, include the legacy contrast slides showing actual legacy code examples.**
```

---

## D2B — SPEAKER SCRIPT

```

You are writing the speaker script for Day 2 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2B/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D2B/` folder in the workspace — the slides and sample code files are already generated there.

SPECIFIC GUIDANCE:
- Open calling back to Day 1 preview: "Yesterday you saw signal() and computed() for
  two minutes. Today we go all the way in."
- zone.js problem: use a plain English analogy before code — "imagine checking every
  room in a building every time someone knocks on the front door"
- computed(): contrast explicitly with legacy getter — "in older Angular you'd write
  a getter and Angular had no idea when to recalculate it"
- effect() cleanup: make it memorable — "if you don't return a cleanup function when
  you set up a timer or subscription, you have a memory leak. Every time."
- input() readonly: "the parent owns the input. You cannot change something your
  parent gave you."
- Angular direction callout: make it feel like a payoff — "everything you just
  learned is exactly what makes Angular's future possible"

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 2 Part B.**
```

---

## D2B — EXERCISES

```

You are writing student exercises for Day 2 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2B/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- signal() with .set() and .update()
- computed() for derived read-only values
- effect() with cleanup function
- Signal-based input() — readonly constraint
- Signal-based output() with .emit()
- model() for two-way binding
- Fine-grained change detection understanding
- ngOnChanges with SimpleChanges (one exercise: read and convert legacy code to signals)

CONTEXT FILES: Read all files from the `D2B/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises from BEGINNER drills to CHALLENGE combinations
- Every concept above in at least one exercise
- Include one exercise where students convert legacy ngOnChanges code to signals
- Follow all multi-file component rules from the Master Context

FORMAT:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building / ### Instructions / ### Acceptance Criteria / ### Hints

All solutions under # SOLUTIONS, each file as its own labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 2 Part B.**
```

---

## D2B — SAMPLE PROJECT

```

You are generating the Day 2 Part B sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2B/` in the workspace. Save all generated files there.

PROJECT: Budget Tracker
Total, spent, and remaining balance are all computed() signals derived from a writable
expense list signal. Users add and remove expenses. An effect() with cleanup logs each
change. A child ExpenseInputComponent uses model() for the amount field and output() to
emit a submitted expense. A parent BudgetDashboardComponent uses input() for an optional
budget cap and displays warnings via computed() when spending exceeds thresholds.

CONCEPTS TO DEMONSTRATE:
- signal() with .set() and .update() (immutable array update pattern)
- computed() for total, spent, remaining, warning threshold
- effect() with cleanup function
- Signal-based input() — readonly
- Signal-based output()
- model() for two-way field binding

**NOW WRITE THE COMPLETE PROJECT:**
1. Full file tree
2. Every .ts, .html, .css file as a separate labeled code block
3. README.md
```

---

## D2B — GAP CHECK

```

You are reviewing the generated materials for Day 2 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D2B/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- signal() — .set(), .update()
- computed() — read-only derived value
- effect() — side effects with cleanup return
- Signal-based input() — readonly
- Signal-based output()
- model() — two-way signal binding
- Fine-grained change detection
- ngOnChanges as legacy contrast (SimpleChanges)
- Angular direction — zoneless stable in v21+

CONTEXT FILES: Read all files from the `D2B/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

COVERAGE: Mark each requirement FULLY COVERED / PARTIALLY COVERED / MISSING.

EXERCISE ALIGNMENT CHECK:
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise to add it to]

SCOPE CREEP: List anything in materials not in requirements.
```

---
---

# DAY 2 — CROSS-DAY CONTINUITY CHECK (Day 2 → Day 3)

```

You are checking whether Day 2 materials adequately prepare students for Day 3.

OUTPUT FOLDER: Create or use the folder `Cross-Day-Checks/` in the workspace. Save output as `Day2-to-Day3-continuity.md`.

DAY 2 TAUGHT:
Part A: ng-content, ngAfterContentInit, ng-container, ng-template, @if/@for/@switch/@let,
[ngClass]/[ngStyle], built-in pipes, pure/impure pipes, custom pipe
Part B: signal(), computed(), effect() with cleanup, input(), output(), model(),
fine-grained change detection, ngOnChanges as legacy contrast

DAY 3 WILL TEACH:
Part A: Services, @Injectable, inject(), inject() in guards, error handling in services,
RxJS (Observable, of/from/timer/Subject/BehaviorSubject, operators, hot/cold),
takeUntilDestroyed(), toSignal(), async pipe vs toSignal()
Part B: provideHttpClient(), typed interfaces, GET/POST/PUT/DELETE, HttpParams,
switchMap/catchError/forkJoin, HttpErrorResponse, loading states, HttpInterceptorFn, environment files

CONTEXT FILES: Read all files from the `D2A/` and `D2B/` folders in the workspace — all Day 2 generated materials are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**
1. List every Day 3 concept that builds on something from Day 2
2. Confirm Day 2 materials explain each prerequisite deeply enough
3. Flag any Day 3 prerequisite that is missing or shallow in Day 2
4. Identify where Day 3 materials should call back to Day 2 examples
```

---
---

# DAY 3 PART A — Services, Dependency Injection & RxJS

---

## D3A — SAMPLE CODE

```

You are generating sample code for Day 3 Part A of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D3A/SampleCode/`. Save legacy sample code files in `D3A/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure with each component in its own subfolder.

LESSON CONCEPTS TO DEMONSTRATE:
- @Injectable({ providedIn: 'root' }) — singleton, tree-shakable
- inject() in a component class body
- inject() in a functional guard — shows inject() works outside components
- BehaviorSubject for shared state in a service
- Error handling in a service — paired error$ BehaviorSubject<string | null>;
  wrapping updates in try/catch; surfacing errors to components
- Creating Observables: of(), from(), timer()
- Subject vs BehaviorSubject — comments: BehaviorSubject has a current value; Subject does not
- RxJS operators with comments: map, filter, tap, switchMap, combineLatest, debounceTime
- Hot vs cold Observables — dedicated comment block; BehaviorSubject = hot example;
  of() = cold example
- takeUntilDestroyed() with DestroyRef
- toSignal() — convert BehaviorSubject to signal; include initialValue
- async pipe vs toSignal() guidance — comment: "use toSignal() in new code;
  async pipe demonstrated in the legacy app"

DELIVERABLES (modern — `SampleCode/`):
1. Project config: package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css, src/main.ts, src/app/app.config.ts
3. src/app/app.component.ts / .html / .css
4. src/app/services/cart.service.ts — BehaviorSubject state, mapped total, error$ stream, safe update methods
5. src/app/cart-header/cart-header.component.ts / .html / .css — inject(), toSignal() for cart count
6. src/app/cart-page/cart-page.component.ts / .html / .css — inject(), toSignal() for item list and error
7. src/app/services/notification.service.ts — Subject; push(); auto-dismiss via timer(); takeUntilDestroyed()
8. src/app/rxjs-operators/rxjs-operators.component.ts / .html / .css — all operators with comments; hot/cold comment block

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based Angular app demonstrating the same concepts but built
entirely with legacy patterns: constructor injection, async pipe with @if null guard,
NgModule with declarations, takeUntil + ngOnDestroy Subject pattern.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, src/app/app.component.ts/.html/.css,
src/app/services/cart.service.ts, src/app/cart-header/cart-header.component.ts/.html/.css,
src/app/cart-page/cart-page.component.ts/.html/.css.
Every file has comments explaining what inject() and toSignal() replaced.

**NOW WRITE ALL OF THE FILES. Output each as a separate labeled code block.
Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/services/cart.service.ts or
### LegacySampleCode/src/app/app.module.ts).**
```

---

## D3A — SLIDES

```

You are generating slides for Day 3 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3A/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- What a service is — separating logic and shared state from components
- @Injectable({ providedIn: 'root' }) — singleton, tree-shakable
- inject() in component class bodies
- inject() beyond components — works in guards, interceptors, factories
- Error handling in services — data$/error$ pattern; wrapping updates safely
- What an Observable is — stream vs one-time Promise; push vs pull
- Creating Observables: of(), from(), timer(), Subject, BehaviorSubject
- Subject vs BehaviorSubject
- Hot vs cold Observables
- Core operators: map, filter, tap, switchMap, combineLatest, debounceTime
- takeUntilDestroyed() with DestroyRef
- toSignal() — the RxJS-to-signals bridge
- ⚠️ WARNING: async pipe emits null before first value; toSignal() takes initialValue instead
LEGACY CONTRAST SLIDES (after all modern concept slides):
- Service injection — show constructor(private svc: MyService) code; contrast with modern inject(MyService)
- Service scope — show NgModule.providers registration; contrast with modern providedIn: 'root'
- RxJS cleanup — show takeUntil(destroy$) + ngOnDestroy Subject pattern; contrast with modern takeUntilDestroyed()
- Observable in template — show async pipe + @if null guard; contrast with modern toSignal(obs$, {initialValue})
Each legacy slide shows actual legacy code, explains the boilerplate involved, and shows the modern equivalent side by side.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 3 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept
listed. After all modern slides, include the legacy contrast slides showing actual legacy code examples.**
```

---

## D3A — SPEAKER SCRIPT

```

You are writing the speaker script for Day 3 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3A/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D3A/` folder in the workspace — the slides and sample code files are already generated there.

SPECIFIC GUIDANCE:
- Open with the prop drilling problem: "Right now if two components need the same
  data, you'd pass it up through @Output() and back down through @Input() through
  every component in between. Services exist to solve this."
- Observable vs Promise: "A Promise is like ordering a pizza — one response.
  An Observable is like a news subscription — it keeps sending you updates."
- switchMap: spend extra time — "every keystroke sends a request, switchMap cancels
  the previous one. Without it you'd show stale results."
- toSignal() vs async pipe: "prefer toSignal() in all new code. Async pipe has a
  quirk: it emits null before data arrives, which breaks your template."

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 3 Part A.**
```

---

## D3A — EXERCISES

```

You are writing student exercises for Day 3 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3A/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- @Injectable providedIn root
- inject() in a component
- inject() in a functional guard
- BehaviorSubject for shared state
- Error handling with paired error$ stream
- Creating Observables: of(), from(), timer()
- Subject vs BehaviorSubject
- RxJS operators: map, filter, tap, switchMap, combineLatest, debounceTime
- takeUntilDestroyed()
- toSignal() with initialValue
- async pipe null behavior — one exercise demonstrates the gotcha, then fixes with toSignal()

CONTEXT FILES: Read all files from the `D3A/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises from BEGINNER drills to CHALLENGE combinations
- Every concept above in at least one exercise
- Include one exercise showing async pipe null gotcha then converting to toSignal()
- Follow all multi-file component rules from the Master Context

FORMAT:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building / ### Instructions / ### Acceptance Criteria / ### Hints

All solutions under # SOLUTIONS, each file as its own labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 3 Part A.**
```

---

## D3A — SAMPLE PROJECT

```

You are generating the Day 3 Part A sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3A/` in the workspace. Save all generated files there.

PROJECT: Shopping Cart
A shopping cart app where the header displays cart count and the cart page shows the
full list — both synced through CartService using BehaviorSubject. CartService has
a paired error$ stream. Components use inject() and toSignal(). A NotificationService
uses Subject + timer() with takeUntilDestroyed() for auto-dismissing messages.

CONCEPTS TO DEMONSTRATE:
- @Injectable providedIn root; inject() in components
- BehaviorSubject + error$ pattern
- map, tap, takeUntilDestroyed()
- toSignal() with initialValue
- Subject with timer() and takeUntilDestroyed()

**NOW WRITE THE COMPLETE PROJECT:**
1. Full file tree
2. Every .ts, .html, .css file as a separate labeled code block
3. README.md
```

---

## D3A — GAP CHECK

```

You are reviewing the generated materials for Day 3 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3A/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- @Injectable providedIn root
- inject() in components and in functional guards
- Error handling in services — data$/error$ pattern
- Observable vs Promise; push vs pull
- of(), from(), timer(), Subject, BehaviorSubject
- Subject vs BehaviorSubject
- map, filter, tap, switchMap, combineLatest, debounceTime
- Hot vs cold Observables
- takeUntilDestroyed() with DestroyRef
- toSignal() — primary RxJS-to-signals bridge
- async pipe vs toSignal() — null gotcha and initialValue solution

CONTEXT FILES: Read all files from the `D3A/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

COVERAGE: Mark each requirement FULLY COVERED / PARTIALLY COVERED / MISSING.

EXERCISE ALIGNMENT CHECK:
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise to add it to]

SCOPE CREEP: List anything in materials not in requirements.
```

---
---

# DAY 3 PART B — HTTP & Async Data

---

## D3B — SAMPLE CODE

```

You are generating sample code for Day 3 Part B of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D3B/SampleCode/`. Save legacy sample code files in `D3B/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure with each component in its own subfolder.

LESSON CONCEPTS TO DEMONSTRATE:
- provideHttpClient() in app.config.ts
- TypeScript interface for HTTP response — User interface for JSONPlaceholder /users
- HttpClient.get<User[]>() typed GET; also POST, PUT, DELETE
- HttpParams — new HttpParams().set('userId', 1).set('page', 2)
- switchMap to cancel stale in-flight requests on search
- catchError — catching HTTP errors
- HttpErrorResponse — branch on .status: 0 (network), 404, 500
- forkJoin — two parallel GETs; both complete before rendering
- Loading state — isLoading signal; set true before request, false in finalize()
- Functional HttpInterceptorFn — adds Authorization header and logs request
- environment.ts and environment.development.ts — apiUrl; both interceptor and service read from it
- toSignal() connecting HTTP Observable to template

DELIVERABLES (modern — `SampleCode/`):
1. Project config: package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css, src/main.ts
3. src/environments/environment.ts and src/environments/environment.development.ts
4. src/app/app.config.ts — provideHttpClient() with withInterceptors()
5. src/app/app.component.ts / .html / .css
6. src/app/models/user.model.ts — User interface
7. src/app/services/user.service.ts — get/post/delete; HttpParams; error$ stream; environment URL
8. src/app/services/auth.service.ts — stub with getToken() method
9. src/app/user-list/user-list.component.ts / .html / .css — toSignal(); isLoading; status-aware error display
10. src/app/parallel-data/parallel-data.component.ts / .html / .css — forkJoin loading users and posts simultaneously
11. src/app/interceptors/auth.interceptor.ts — HttpInterceptorFn; adds Authorization header; logs URL+method

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based Angular app demonstrating the same concepts but built
entirely with legacy patterns: HttpClientModule in AppModule, class-based HttpInterceptor,
HTTP_INTERCEPTORS multi-token provider, constructor injection.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, src/app/app.component.ts/.html/.css,
src/app/models/user.model.ts, src/app/services/user.service.ts, src/app/services/auth.service.ts,
src/app/user-list/user-list.component.ts/.html/.css,
src/app/interceptors/auth.interceptor.ts (class-based).
Every file has comments explaining what provideHttpClient() and HttpInterceptorFn replaced.

**NOW WRITE ALL OF THE FILES. Output each as a separate labeled code block.
Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/services/user.service.ts or
### LegacySampleCode/src/app/app.module.ts).**
```

---

## D3B — SLIDES

```

You are generating slides for Day 3 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3B/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- provideHttpClient() in app.config.ts
- TypeScript interfaces for HTTP responses — why typing matters
- GET, POST, PUT, DELETE — every call returns an Observable
- HttpParams — building query strings programmatically
- switchMap — cancels stale in-flight requests
- catchError — handling HTTP errors
- ⚠️ WARNING: HttpErrorResponse — .status branches (0 vs 404 vs 500 need different messages)
- forkJoin — parallel requests; both must complete; RxJS equivalent of Promise.all
- Loading state — isLoading signal + finalize()
- Functional HttpInterceptorFn — auth headers and logging
- toSignal() — connecting HTTP Observable to template via signals
- environment.ts — API base URL; ng build swaps at build time
LEGACY CONTRAST SLIDES (after all modern concept slides):
- HTTP setup — show HttpClientModule in AppModule; contrast with modern provideHttpClient() in app.config.ts
- Interceptors — show class implementing HttpInterceptor; contrast with modern HttpInterceptorFn plain function
- Registration — show HTTP_INTERCEPTORS multi-token provider; contrast with modern withInterceptors([fn])
- Response typing — http.get<MyType>(url) is the same in both; note this did not change
- Environment config — environment.ts swap is the same in both; note this did not change
Each legacy slide shows actual legacy code, explains the class-based and module-based patterns, and shows the modern equivalent side by side.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 3 Part B. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept
listed. After all modern slides, include the legacy contrast slides showing actual legacy code examples.**
```

---

## D3B — SPEAKER SCRIPT

```

You are writing the speaker script for Day 3 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3B/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D3B/` folder in the workspace — the slides and sample code files are already generated there.

SPECIFIC GUIDANCE:
- Open connecting to Part A: "HTTP is just an Observable that fetches data.
  Everything you learned about Observables this morning applies directly."
- Typed interfaces: "in plain JS you'd get back any and have no idea what properties
  exist. With an interface, TypeScript knows everything."
- HttpErrorResponse branches: make them concrete — "status 0 means you couldn't
  reach the server. 404 means the item doesn't exist. 500 means the server crashed.
  Each needs a different message."
- forkJoin: contrast with sequential calls — "without forkJoin you'd wait for the
  first request before starting the second. With forkJoin they run simultaneously."

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 3 Part B.**
```

---

## D3B — EXERCISES

```

You are writing student exercises for Day 3 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3B/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- provideHttpClient() setup
- Defining a TypeScript interface for an HTTP response
- Typed GET request
- POST and DELETE requests
- HttpParams for query strings
- switchMap to cancel stale requests
- catchError
- HttpErrorResponse status branching
- forkJoin for parallel requests
- Loading state with isLoading signal and finalize()
- Functional HttpInterceptorFn
- environment.ts for API configuration

CONTEXT FILES: Read all files from the `D3B/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises from BEGINNER drills to CHALLENGE combinations
- Every concept above in at least one exercise
- Include one exercise that deliberately omits switchMap causing stale results,
  then adds it to fix the problem
- Follow all multi-file component rules from the Master Context

FORMAT:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building / ### Instructions / ### Acceptance Criteria / ### Hints

All solutions under # SOLUTIONS, each file as its own labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 3 Part B.**
```

---

## D3B — SAMPLE PROJECT

```

You are generating the Day 3 Part B sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3B/` in the workspace. Save all generated files there.

PROJECT: Weather Dashboard
Fetches current weather and 5-day forecast from Open-Meteo (no API key required).
API base URL in environment.ts. Uses forkJoin to load both in parallel. Shows isLoading
spinner, status-aware HttpErrorResponse error messages, and HttpParams for lat/lng query.
A functional interceptor logs all outgoing requests.

CONCEPTS TO DEMONSTRATE:
- provideHttpClient() with withInterceptors()
- Typed response interfaces
- HttpParams query string
- forkJoin parallel loading
- isLoading signal with finalize()
- HttpErrorResponse with status branching
- Functional HttpInterceptorFn (auth header + logging)
- environment.ts API base URL

**NOW WRITE THE COMPLETE PROJECT:**
1. Full file tree
2. Every .ts, .html, .css file as a separate labeled code block
3. README.md
```

---

## D3B — GAP CHECK

```

You are reviewing the generated materials for Day 3 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D3B/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- provideHttpClient() in app.config.ts
- TypeScript interfaces for HTTP responses
- Typed GET, POST, PUT, DELETE
- HttpParams
- switchMap for stale request cancellation
- catchError
- HttpErrorResponse — status branching (0, 404, 500)
- forkJoin
- Loading state — isLoading + finalize()
- Functional HttpInterceptorFn
- environment.ts / environment.development.ts

CONTEXT FILES: Read all files from the `D3B/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

COVERAGE: Mark each requirement FULLY COVERED / PARTIALLY COVERED / MISSING.

EXERCISE ALIGNMENT CHECK:
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise to add it to]

SCOPE CREEP: List anything in materials not in requirements.
```

---
---

# DAY 3 — CROSS-DAY CONTINUITY CHECK (Day 3 → Day 4)

```

You are checking whether Day 3 materials adequately prepare students for Day 4.

OUTPUT FOLDER: Create or use the folder `Cross-Day-Checks/` in the workspace. Save output as `Day3-to-Day4-continuity.md`.

DAY 3 TAUGHT:
Part A: Services, @Injectable, inject(), error handling patterns, RxJS fundamentals,
operators, hot/cold, takeUntilDestroyed(), toSignal()
Part B: HTTP, typed interfaces, HttpParams, switchMap/catchError/forkJoin,
HttpErrorResponse, loading states, interceptors, environment files

DAY 4 WILL TEACH:
Part A: provideRouter(), router-outlet/routerLink/routerLinkActive, programmatic
navigation, route vs query params, withComponentInputBinding(), child routes,
loadComponent(), withHashLocation/withPreloading, canActivate, canDeactivate
Part B: Template-driven forms, reactive forms, FormArray, custom validators,
ngSubmit handler with navigate+reset, toSignal(form.valueChanges),
ngModel + reactive form mistake warning

CONTEXT FILES: Read all files from the `D3A/` and `D3B/` folders in the workspace — all Day 3 generated materials are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**
1. List every Day 4 concept that builds on something from Day 3
2. Confirm Day 3 materials prepare students adequately for each
3. Flag missing or shallow prerequisites
4. Identify where Day 4 materials should call back to Day 3 examples
```

---
---

# DAY 4 PART A — Angular Router

---

## D4A — SAMPLE CODE

```

You are generating sample code for Day 4 Part A of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D4A/SampleCode/`. Save legacy sample code files in `D4A/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure with each component in its own subfolder.

LESSON CONCEPTS TO DEMONSTRATE:
- provideRouter(routes) in app.config.ts with withComponentInputBinding()
- router-outlet, routerLink, routerLinkActive with active class
- Router.navigate() and Router.navigateByUrl() via inject(Router);
  comment explaining the difference between the two methods
- Route parameters (/recipe/42) — read via input() signal via withComponentInputBinding()
- Query parameters (/recipes?category=italian) — read via inject(ActivatedRoute).queryParamMap
- Child routes with nested router-outlet
- loadComponent() lazy loading
- withHashLocation() and withPreloading() — commented out in config with explanation
- canActivate functional guard — checks isLoggedIn signal; redirects via UrlTree
- canDeactivate functional guard — checks generic hasUnsavedChanges: boolean property;
  comment: "In Day 4 Part B you will wire this to your reactive form's .dirty property"

DELIVERABLES (modern — `SampleCode/`):
1. Project config: package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css, src/main.ts
3. src/app/app.config.ts — provideRouter with options
4. src/app/app.routes.ts — full route config
5. src/app/app.component.ts / .html / .css
6. src/app/services/auth.service.ts — isLoggedIn signal, login(), logout()
7. src/app/guards/auth.guard.ts — functional canActivate with UrlTree redirect
8. src/app/guards/unsaved-changes.guard.ts — functional canDeactivate; generic hasUnsavedChanges property
9. src/app/nav/nav.component.ts / .html / .css — routerLink, routerLinkActive
10. src/app/recipe-list/recipe-list.component.ts / .html / .css — query params; Router.navigate() on row click
11. src/app/recipe-detail/recipe-detail.component.ts / .html / .css — route param as input() signal

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based Angular app demonstrating the same concepts but built
entirely with legacy patterns: RouterModule.forRoot(), AppRoutingModule, class-based CanActivate
guard, constructor-injected ActivatedRoute with manual param subscription, loadChildren with
module loading.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, src/app/app-routing.module.ts,
src/app/app.component.ts/.html/.css, src/app/services/auth.service.ts,
src/app/guards/auth.guard.ts (class-based), src/app/nav/nav.component.ts/.html/.css,
src/app/recipe-list/recipe-list.component.ts/.html/.css,
src/app/recipe-detail/recipe-detail.component.ts/.html/.css.
Every file has comments explaining what provideRouter() and functional guards replaced.

**NOW WRITE ALL OF THE FILES. Output each as a separate labeled code block.
Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/guards/auth.guard.ts or
### LegacySampleCode/src/app/app-routing.module.ts).**
```

---

## D4A — SLIDES

```

You are generating slides for Day 4 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4A/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- provideRouter(routes) in app.config.ts
- router-outlet, routerLink, routerLinkActive
- Programmatic navigation — Router.navigate() vs Router.navigateByUrl()
- Route parameters vs query parameters — with real URL examples side by side
- withComponentInputBinding() — bind route params directly to input() signals
- Child routes and nested router-outlet
- loadComponent() lazy loading
- withHashLocation() and withPreloading() — what they do
- canActivate functional guard — boolean | UrlTree
- canDeactivate functional guard — dirty check pattern
- AppRoutingModule callout slide — "this is what you'll see in most existing codebases"
LEGACY CONTRAST SLIDES (after all modern concept slides):
- Router setup — show RouterModule.forRoot(routes) in AppModule; contrast with modern provideRouter(routes)
- Feature routes — show RouterModule.forChild() pattern; contrast with modern child route arrays
- Lazy loading — show loadChildren: () => import().then() module loading; contrast with modern loadComponent: () => import()
- Route params as inputs — show manual ActivatedRoute injection and subscription; contrast with modern withComponentInputBinding()
- Programmatic nav — show constructor-injected Router; contrast with modern inject(Router).navigate()
- canActivate — show class implementing CanActivate; contrast with modern plain function guard
- canDeactivate — show class implementing CanDeactivate<T>; contrast with modern plain function guard
Each legacy slide shows actual legacy code, explains the class-based and module-based router patterns, and shows the modern equivalent side by side.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 4 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept
listed. After all modern slides, include the legacy contrast slides showing actual legacy code examples.**
```

---

## D4A — SPEAKER SCRIPT

```

You are writing the speaker script for Day 4 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4A/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D4A/` folder in the workspace — the slides and sample code files are already generated there.

SPECIFIC GUIDANCE:
- Open with why routing matters: "everything we've built so far is a single page.
  Routing turns a website into an application — it gives every view its own URL."
- Route vs query params: "the product ID goes in the path because it identifies the
  thing. The sort order goes in the query string because it's optional."
- withComponentInputBinding(): "in older Angular you'd inject ActivatedRoute and
  subscribe to its params Observable. Now you declare an input() with the same
  name as the route param and Angular wires it automatically."
- canDeactivate: "this guard matters most in about 45 minutes when we build forms.
  You never want a user to accidentally navigate away and lose what they typed."
- AppRoutingModule: "I'm showing you this because it is in every Angular project
  you will encounter on a job. You need to read it even if you won't write it."

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 4 Part A.**
```

---

## D4A — EXERCISES

```

You are writing student exercises for Day 4 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4A/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- provideRouter() setup
- router-outlet, routerLink, routerLinkActive
- Router.navigate() and Router.navigateByUrl()
- Route parameters via withComponentInputBinding()
- Query parameters via ActivatedRoute.queryParamMap
- Child routes
- loadComponent() lazy loading
- canActivate functional guard with UrlTree redirect
- canDeactivate functional guard with hasUnsavedChanges check
- withHashLocation() — configure and observe the URL change
- Converting legacy AppRoutingModule to modern provideRouter()

CONTEXT FILES: Read all files from the `D4A/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises from BEGINNER drills to CHALLENGE combinations
- Every concept above in at least one exercise
- Include one exercise where students convert an AppRoutingModule to modern syntax
- Follow all multi-file component rules from the Master Context

FORMAT:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building / ### Instructions / ### Acceptance Criteria / ### Hints

All solutions under # SOLUTIONS, each file as its own labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 4 Part A.**
```

---

## D4A — SAMPLE PROJECT

```

You are generating the Day 4 Part A sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4A/` in the workspace. Save all generated files there.

PROJECT: Recipe Browser
A recipe browser with a home page, a recipe list page (filterable by category via
query params), a recipe detail page (route param as input() signal via
withComponentInputBinding()), and a create-recipe route protected by canActivate.
canDeactivate warns before leaving an in-progress form. Programmatic navigation goes
to the list after a recipe is saved. Detail route is lazy-loaded with loadComponent().

CONCEPTS TO DEMONSTRATE:
- provideRouter() with withComponentInputBinding()
- router-outlet, routerLink, routerLinkActive
- Route params via input() signal
- Query params via ActivatedRoute.queryParamMap
- loadComponent() lazy loading
- canActivate with UrlTree
- canDeactivate with hasUnsavedChanges flag
- Router.navigate() programmatic navigation

**NOW WRITE THE COMPLETE PROJECT:**
1. Full file tree
2. Every .ts, .html, .css file as a separate labeled code block
3. README.md
```

---

## D4A — GAP CHECK

```

You are reviewing the generated materials for Day 4 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4A/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- provideRouter() in app.config.ts
- router-outlet, routerLink, routerLinkActive
- Programmatic navigation — navigate() vs navigateByUrl()
- Route params vs query params
- withComponentInputBinding()
- Child routes + nested router-outlet
- loadComponent() lazy loading
- withHashLocation() and withPreloading()
- canActivate functional guard with UrlTree
- canDeactivate functional guard with generic hasUnsavedChanges property

CONTEXT FILES: Read all files from the `D4A/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

COVERAGE: Mark each requirement FULLY COVERED / PARTIALLY COVERED / MISSING.

EXERCISE ALIGNMENT CHECK:
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise to add it to]

SCOPE CREEP: List anything in materials not in requirements.
```

---
---

# DAY 4 PART B — Forms

---

## D4B — SAMPLE CODE

```

You are generating sample code for Day 4 Part B of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D4B/SampleCode/`. Save legacy sample code files in `D4B/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure with each component in its own subfolder.

LESSON CONCEPTS TO DEMONSTRATE:
- Template-driven form — ngModel, #field template ref, ngForm, HTML5 validators,
  error display with #field.invalid && #field.touched
- Reactive form — FormGroup, FormControl, FormBuilder, Validators, valueChanges
- FormArray — dynamic add/remove; FormArray.push(), .removeAt(); @for over controls
- Custom synchronous validator — password match ValidatorFn;
  comment: "return null = valid, return object = invalid"
- Custom async validator — username taken; AsyncValidatorFn; mock HTTP delay
- Disabling submit until form.valid
- (ngSubmit) handler — reads form.value, calls service, Router.navigate() on success,
  form.reset() on failure
- toSignal(form.valueChanges) — live form values as signal;
  computed() strength indicator derived from password field
- ⚠️ WARNING: ngModel inside reactive FormGroup causes runtime error — do not mix systems

DELIVERABLES (modern — `SampleCode/`):
1. Project config: package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css, src/main.ts, src/app/app.config.ts
3. src/app/app.component.ts / .html / .css
4. src/app/registration-form/registration-form.component.ts / .html / .css — full reactive form; all validators;
   FormArray phones; strength computed() signal; full submit handler
5. src/app/validators/password-match.validator.ts — custom ValidatorFn with comment on return contract
6. src/app/validators/username-taken.validator.ts — AsyncValidatorFn with mock delay
7. src/app/contact-form/contact-form.component.ts / .html / .css — template-driven; character count signal; FormArray tags
8. src/app/checkout-form/checkout-form.component.ts / .html / .css — multi-step; computed() completion %;
   FormArray line items; navigate to /confirmation

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based Angular app demonstrating the same concepts but built
entirely with legacy patterns: FormsModule and ReactiveFormsModule imported in NgModule,
manual valueChanges subscription in ngOnInit/ngOnDestroy, constructor injection.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, src/app/app.component.ts/.html/.css,
src/app/registration-form/registration-form.component.ts/.html/.css,
src/app/contact-form/contact-form.component.ts/.html/.css,
src/app/validators/password-match.validator.ts, src/app/validators/username-taken.validator.ts.
Every file has comments explaining what toSignal(form.valueChanges) and modern patterns replaced.

**NOW WRITE ALL OF THE FILES. Output each as a separate labeled code block.
Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/registration-form/registration-form.component.ts or
### LegacySampleCode/src/app/app.module.ts).**
```

---

## D4B — SLIDES

```

You are generating slides for Day 4 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4B/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- Template-driven forms — ngModel, #field, ngForm, validators, error display
- Reactive forms — FormGroup, FormControl, FormBuilder, Validators, valueChanges
- FormArray — dynamic fields; push(), removeAt(); @for over controls
- Custom synchronous validators — ValidatorFn; null = valid, object = invalid
- Custom async validators — AsyncValidatorFn; mock delay
- Disabling submit until form.valid
- Form submission — (ngSubmit); read .value; call service; navigate; reset()
- toSignal(form.valueChanges) — live reactive form state as a signal
- computed() derived from form signals — e.g. password strength indicator, completion percentage
- ⚠️ WARNING: ngModel inside reactive form causes runtime error — exact error message shown
LEGACY CONTRAST SLIDES (after all modern concept slides):
- FormsModule — show FormsModule imported in NgModule; contrast with modern import in standalone component
- ReactiveFormsModule — show ReactiveFormsModule imported in NgModule; contrast with modern import in standalone component
- Form value as signal — show manual ngOnInit subscription + ngOnDestroy cleanup; contrast with modern toSignal(form.valueChanges)
- FormArray — identical API in both; note this did not change
Each legacy slide shows actual legacy code, explains the NgModule-based form setup, and shows the modern equivalent side by side.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 4 Part B. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept
listed. After all modern slides, include the legacy contrast slides showing actual legacy code examples.**
```

---

## D4B — SPEAKER SCRIPT

```

You are writing the speaker script for Day 4 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4B/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D4B/` folder in the workspace — the slides and sample code files are already generated there.

SPECIFIC GUIDANCE:
- Open contrasting the two systems: "Angular gives you two completely different ways
  to build forms. Template-driven is fast for simple forms. Reactive is better for
  complex and dynamic forms. You need to know both."
- FormArray: "A regular FormGroup has a fixed set of fields. FormArray lets you add
  and remove fields at runtime — think 'add another phone number'."
- Custom validators: "the contract is simple — return null if valid, return an
  object if not. That object becomes the error key you check in the template."
- Submit handler: walk through every step in sequence
- ngModel mixing warning: "the error is not immediately obvious — it complains about
  ngModel not being part of the form control. Now you know why."
- toSignal(form.valueChanges): "you already used toSignal() on HTTP Observables —
  form.valueChanges is just another Observable. Same bridge, same pattern."

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 4 Part B.**
```

---

## D4B — EXERCISES

```

You are writing student exercises for Day 4 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4B/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- Template-driven form with ngModel, ngForm, HTML5 validators
- Error display with template refs
- Reactive form with FormGroup, FormControl, FormBuilder
- Built-in and custom synchronous validators
- Async validators
- FormArray — dynamic add/remove
- Disabling submit
- (ngSubmit) handler with navigate and reset
- toSignal(form.valueChanges)
- ngModel inside reactive form mistake — one exercise deliberately triggers
  the error so students learn to recognize and fix it

CONTEXT FILES: Read all files from the `D4B/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises from BEGINNER drills to CHALLENGE combinations
- Every concept above in at least one exercise
- Include one exercise that deliberately mixes ngModel and reactive form,
  shows the error, then fixes it
- Follow all multi-file component rules from the Master Context

FORMAT:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building / ### Instructions / ### Acceptance Criteria / ### Hints

All solutions under # SOLUTIONS, each file as its own labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 4 Part B.**
```

---

## D4B — SAMPLE PROJECT

```

You are generating the Day 4 Part B sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4B/` in the workspace. Save all generated files there.

PROJECT: Multi-Step Checkout Form
Three steps (shipping, payment, review). Each step is a separate FormGroup.
computed() tracks overall completion percentage. Step 2 has a FormArray for promo codes.
Step 3 is review-only. Submission navigates to /confirmation. canDeactivate warns mid-checkout.

CONCEPTS TO DEMONSTRATE:
- FormGroup per step
- FormArray for promo codes
- Custom validator on payment step
- Disabling Next until current step is valid
- (ngSubmit) with navigate() on success, reset() on failure
- toSignal(form.valueChanges) for address field character counter
- computed() completion percentage signal

**NOW WRITE THE COMPLETE PROJECT:**
1. Full file tree
2. Every .ts, .html, .css file as a separate labeled code block
3. README.md
```

---

## D4B — GAP CHECK

```

You are reviewing the generated materials for Day 4 Part B of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D4B/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- Template-driven forms — ngModel, ngForm, HTML5 validators, error display
- Reactive forms — FormGroup, FormControl, FormBuilder, Validators
- FormArray — dynamic add/remove
- Custom synchronous validator — ValidatorFn
- Custom async validator — AsyncValidatorFn
- Disabling submit until valid
- (ngSubmit) handler — read value, call service, navigate, reset
- toSignal(form.valueChanges)
- ngModel inside reactive form — runtime error warning

CONTEXT FILES: Read all files from the `D4B/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

COVERAGE: Mark each requirement FULLY COVERED / PARTIALLY COVERED / MISSING.

EXERCISE ALIGNMENT CHECK:
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise to add it to]

SCOPE CREEP: List anything in materials not in requirements.
```

---
---

# DAY 4 — CROSS-DAY CONTINUITY CHECK (Day 4 → Day 5)

```

You are checking whether Day 4 materials adequately prepare students for Day 5.

OUTPUT FOLDER: Create or use the folder `Cross-Day-Checks/` in the workspace. Save output as `Day4-to-Day5-continuity.md`.

DAY 4 TAUGHT:
Part A: provideRouter, routing fundamentals, programmatic navigation, route/query params,
withComponentInputBinding, lazy loading, canActivate/canDeactivate guards
Part B: Template-driven forms, reactive forms, FormArray, custom validators,
submit handler, toSignal(form.valueChanges)

DAY 5 WILL TEACH:
Part A: TestBed, ComponentFixture, standalone component testing, signal input testing,
computed() testing, service testing, HttpTestingController, pipe testing,
lifecycle testing, NO_ERRORS_SCHEMA vs integration
Part B: Capstone — Task Management App

CONTEXT FILES: Read all files from the `D4A/` and `D4B/` folders in the workspace — all Day 4 generated materials are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**
1. List every Day 5 testing concept that requires understanding something from Days 1–4
2. Confirm students are prepared for each testing scenario based on Days 1–4 materials
3. Flag any gap that would leave a student unable to write a specific test
4. Confirm every capstone requirement has a clear root in a specific lesson from Days 1–4
```

---
---

# DAY 5 PART A — Angular Testing

---

## D5A — SAMPLE CODE

```

You are generating sample code for Day 5 Part A of a 5-day Angular course.

OUTPUT FOLDER: Save modern sample code files in `D5A/SampleCode/`. Save legacy sample code files in `D5A/LegacySampleCode/`.

Both `SampleCode/` and `LegacySampleCode/` must be complete, runnable Angular CLI projects
following the SAMPLE CODE PROJECT STRUCTURE RULES in the Master Context. Include package.json,
tsconfig.json, tsconfig.app.json, angular.json, src/index.html, src/styles.css, and the full
src/app/ folder structure. Since these are test files, also include the source component/service/pipe
files they test (from the Day 4 Part A Recipe Browser) so each project is self-contained.

LESSON CONCEPTS TO DEMONSTRATE:
- TestBed.configureTestingModule with imports: [StandaloneComponent] — modern test setup
- ComponentFixture, debugElement, detectChanges()
- Testing @Input — set property, detectChanges, assert template
- Testing @Output — subscribe to output, trigger event, assert emission
- Testing signal inputs — fixture.componentRef.setInput('inputName', value)
- Testing computed() signals — change source signal, assert derived value updates
- Mocking a service with jasmine.createSpyObj
- Testing BehaviorSubject-based service — state changes and error$ stream
- provideHttpClientTesting() and HttpTestingController — flush, assert URL/method
- Simulating HttpErrorResponse
- Testing a pure pipe — instantiate, transform(), assert return value
- Testing ngOnInit via detectChanges()
- Testing ngOnDestroy cleanup — confirm timer cancelled
- NO_ERRORS_SCHEMA for unit isolation — one test file
- Real child imports for integration — separate test file; comment on tradeoff
- Legacy contrast — declarations array and HttpClientTestingModule

All spec files test the Recipe Browser from the Day 4 Part A sample project.
Do not invent new Task-themed components — use what students just built.

DELIVERABLES (modern — `SampleCode/`):
1. Project config: package.json, tsconfig.json, tsconfig.app.json, angular.json
2. src/index.html, src/styles.css, src/main.ts, src/app/app.config.ts
3. Source files under test (from D4A Recipe Browser — include in src/app/ with proper subfolders)
4. src/app/services/recipe.service.spec.ts — BehaviorSubject state, error$, HTTP, HttpErrorResponse
5. src/app/recipe-list/recipe-list.component.spec.ts — signal input, computed, @Output, NO_ERRORS_SCHEMA
6. src/app/recipe-list/recipe-list-integration.spec.ts — real child imports; comment on unit vs integration tradeoff
7. src/app/pipes/truncate.pipe.spec.ts — multiple transform() assertions; edge cases; configurable limit

DELIVERABLES (legacy — `LegacySampleCode/`):
A complete, runnable NgModule-based test setup demonstrating the same test scenarios but built
entirely with legacy patterns: declarations array in TestBed, HttpClientTestingModule import,
constructor injection in tests.
Includes: package.json, tsconfig.json, tsconfig.app.json, angular.json, src/index.html,
src/styles.css, src/main.ts, src/app/app.module.ts, source files under test (with proper subfolders),
src/app/services/recipe.service.spec.ts, src/app/recipe-list/recipe-list.component.spec.ts,
src/app/pipes/truncate.pipe.spec.ts.
Every file has comments explaining what standalone test setup and provideHttpClientTesting() replaced.

**NOW WRITE ALL OF THE FILES. Output each as a separate labeled code block.
Use the full path from the project root as the label
(e.g., ### SampleCode/src/app/services/recipe.service.spec.ts or
### LegacySampleCode/src/app/services/recipe.service.spec.ts).**
```

---

## D5A — SLIDES

```

You are generating slides for Day 5 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D5A/` in the workspace. Save all generated files there.

CONCEPTS TO COVER (one slide per concept):
- Angular testing setup — Jasmine + Karma; Jest alternative
- TestBed — Angular test environment; ComponentFixture, debugElement, detectChanges()
- ⚠️ WARNING: forgetting detectChanges() — most common cause of tests that always pass
- Testing standalone components — imports: [MyComponent]
- Testing @Input and @Output
- Testing signal inputs — fixture.componentRef.setInput()
- Testing computed() signals
- Unit testing a service — createSpyObj; BehaviorSubject; error$ stream
- Testing HTTP — provideHttpClientTesting(); HttpTestingController; flush; HttpErrorResponse
- Testing a pipe — simplest test; transform(); assert
- Testing lifecycle — ngOnInit via detectChanges(); ngOnDestroy cleanup
- Unit vs integration tradeoffs — NO_ERRORS_SCHEMA vs real child imports (pros/cons)
LEGACY CONTRAST SLIDES (after all modern concept slides):
- Component test setup — show declarations + module deps in TestBed; contrast with modern imports: [StandaloneComponent]
- HTTP testing — show HttpClientTestingModule in imports; contrast with modern provideHttpClientTesting()
- Signal input testing — show component.prop = value approach; contrast with modern fixture.componentRef.setInput()
- Change detection — detectChanges() is the same in both; note this did not change
Each legacy slide shows actual legacy test code, explains the module-based test setup, and shows the modern equivalent side by side.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 5 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept
listed. After all modern slides, include the legacy contrast slides showing actual legacy code examples.**
```

---

## D5A — SPEAKER SCRIPT

```

You are writing the speaker script for Day 5 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D5A/` in the workspace. Save all generated files there.
Target duration: 45–60 minutes including code walkthrough and Q&A.

CONTEXT FILES: Read all files from the `D5A/` folder in the workspace — the slides and sample code files are already generated there.

SPECIFIC GUIDANCE:
- Open with the right mindset: "Testing is not about proving your code works.
  It's about making it safe to change."
- TestBed: "think of it as a mini Angular application that exists only inside
  your test — configured with just the things your component needs."
- detectChanges() warning: "forgetting this is the number one cause of tests
  that always pass even when they shouldn't."
- Signal inputs: "you can't set an input() signal directly from outside —
  that's the readonly constraint from Day 2. setInput() is the official way."
- NO_ERRORS_SCHEMA: "this ignores elements Angular doesn't recognize. It makes
  unit tests simpler but means you can't catch errors in child component usage."
- Connect to capstone: "in 45 minutes you'll write tests for the app you're
  about to build. Everything here applies directly."

**NOW WRITE THE COMPLETE WORD-FOR-WORD SPEAKER SCRIPT for Day 5 Part A.**
```

---

## D5A — EXERCISES

```

You are writing student exercises for Day 5 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D5A/` in the workspace. Save all generated files there.

CONCEPTS THAT MUST BE PRACTICED:
- TestBed.configureTestingModule with imports: [StandaloneComponent]
- ComponentFixture, debugElement, detectChanges()
- Testing @Input
- Testing @Output
- Testing signal inputs with setInput()
- Testing computed() signals
- Mocking a service with createSpyObj
- Testing BehaviorSubject state in a service
- Testing error$ stream in a service
- provideHttpClientTesting() and HttpTestingController
- Simulating HttpErrorResponse
- Testing a pure pipe with transform()
- Testing ngOnInit
- Testing ngOnDestroy cleanup
- NO_ERRORS_SCHEMA vs real child imports

CONTEXT FILES: Read all files from the `D5A/` folder in the workspace — the sample code and slides are already generated there.

EXERCISE RULES:
- Generate 6–10 exercises from BEGINNER drills to CHALLENGE combinations
- Every concept above in at least one exercise
- Include one exercise that starts with a broken test that always passes
  (missing detectChanges) and asks students to find and fix it
- Follow all multi-file component rules from the Master Context

FORMAT:
## Exercise [N]: [Title]
**Difficulty:** BEGINNER / INTERMEDIATE / CHALLENGE
**Concepts practiced:** [list]
### What You're Building / ### Instructions / ### Acceptance Criteria / ### Hints

All solutions under # SOLUTIONS, each file as its own labeled code block.

**NOW WRITE ALL EXERCISES AND ALL SOLUTIONS for Day 5 Part A.**
```

---

## D5A — SAMPLE PROJECT

```

You are generating the Day 5 Part A sample project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D5A/` in the workspace. Save all generated files there.

PROJECT: Recipe Browser Test Suite
A complete test suite for the Day 4 Part A Recipe Browser app.

CONTEXT FILES: Read the sample project files from the `D4A/` folder in the workspace — the Recipe Browser app code is already generated there.

TESTS TO WRITE:
- RecipeService — BehaviorSubject state, error$ stream, HTTP calls, HttpErrorResponse
- RecipeListComponent — signal inputs via setInput(), computed filter, @Output selection
- RecipeListComponent integration test — real RecipeCardComponent child
- TruncatePipe — transform() assertions including edge cases

CONCEPTS TO DEMONSTRATE:
- Standalone component test setup
- setInput() for signal inputs
- computed() assertion
- BehaviorSubject and error$ testing
- HttpTestingController with flush and HttpErrorResponse
- Pure pipe transform() assertion
- NO_ERRORS_SCHEMA unit test vs real child integration test

**NOW WRITE THE COMPLETE TEST SUITE:**
1. Full test file tree
2. Every .spec.ts file as a separate labeled code block
3. README.md explaining what each test file covers and why
```

---

## D5A — GAP CHECK

```

You are reviewing the generated materials for Day 5 Part A of a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D5A/` in the workspace. Save all generated files there.

CURRICULUM REQUIREMENTS FOR THIS PART:
- Jasmine + Karma setup; Jest alternative
- TestBed, ComponentFixture, debugElement, detectChanges()
- Standalone component test setup — imports: [MyComponent]
- Testing @Input and @Output
- Signal inputs — setInput()
- Testing computed() signals
- Service testing — createSpyObj, BehaviorSubject, error$ stream
- HTTP testing — provideHttpClientTesting(), HttpTestingController, HttpErrorResponse
- Pipe testing — transform() assertion
- Lifecycle testing — ngOnInit, ngOnDestroy cleanup
- NO_ERRORS_SCHEMA vs real child imports tradeoff

CONTEXT FILES: Read all files from the `D5A/` folder in the workspace — all generated materials (sample code, slides, speaker script, exercises, sample project) are there.

**NOW PRODUCE THE FOLLOWING REVIEW:**

COVERAGE: Mark each requirement FULLY COVERED / PARTIALLY COVERED / MISSING.

EXERCISE ALIGNMENT CHECK:
## Practiced in Exercise — [concept] ✓ — Exercise [N]
## Taught But Not Practiced — [concept] — [which exercise to add it to]

SCOPE CREEP: List anything in materials not in requirements.
```

---
---

# DAY 5 PART B — Capstone Project

---

## CAPSTONE — GENERATION

```

You are generating the complete capstone project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D5B/` in the workspace. Save all generated files there.

PROJECT: Task Management App

TASK INTERFACE — use exactly this shape:
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  subtasks: { id: number; title: string; completed: boolean }[];
}

API: json-server. db.json must have 5 realistic tasks, each with 2–3 subtasks.
API base URL: environment.ts as apiUrl: 'http://localhost:3000'

ROUTES:
/ — DashboardComponent (computed() status counts)
/tasks — TaskListComponent (query param ?status= for filtering)
/tasks/:id — TaskDetailComponent (route param as input() signal)
/tasks/new — TaskFormComponent (create mode)
/tasks/:id/edit — TaskFormComponent (edit mode)
** — NotFoundComponent

REQUIRED FEATURES BY DAY:

Day 1: AppComponent, HeaderComponent, FooterComponent as standalone; @Input/@Output on
TaskCardComponent; ngOnInit loads data; ngOnDestroy cancels refresh interval

Day 2: @for track task.id; @if/@else empty state; @let for filtered count used in
header badge and list simultaneously (comment: @let is NOT a signal); StatusLabelPipe;
TaskCardComponent uses ng-content for body slot; computed() for filtered list and counts

Day 3: TaskService with BehaviorSubject<Task[]> + paired error$ stream; all HTTP methods
typed with Task; toSignal() in all components; environment.ts API URL;
auth.interceptor.ts — adds Authorization header AND logs every request URL+method

Day 4: All routes above; withComponentInputBinding() for task detail; queryParamMap for
?status= filter; canDeactivate on /tasks/new and /tasks/:id/edit; Router.navigate() to
/tasks after save/delete; reactive form with FormArray for subtasks; toSignal(form.valueChanges)
character counter; computed() subtask completion percentage

Day 5: task.service.spec.ts (min 5 tests); task-list.component.spec.ts (min 3 tests);
status-label.pipe.spec.ts (min 4 assertions)

DELIVERABLES — every file as a separate labeled code block:
1. db.json
2. environment.ts and environment.development.ts
3. app.config.ts
4. app.routes.ts
5. app.component.ts/.html/.css
6. header.component.ts/.html/.css
7. footer.component.ts/.html/.css
8. dashboard.component.ts/.html/.css
9. task-list.component.ts/.html/.css
10. task-card.component.ts/.html/.css
11. task-detail.component.ts/.html/.css
12. task-form.component.ts/.html/.css
13. not-found.component.ts/.html/.css
14. task.service.ts
15. task.model.ts
16. status-label.pipe.ts
17. unsaved-changes.guard.ts
18. auth.interceptor.ts (Authorization header + request logging)
19. task.service.spec.ts
20. task-list.component.spec.ts
21. status-label.pipe.spec.ts
22. README.md — organized by course day and Part; maps every concept to the file that demonstrates it

Every file must have a comment block at the top: which day, which Part, which concepts.

**NOW WRITE THE COMPLETE CAPSTONE PROJECT. Output every file as a separate labeled code block.**
```

---

## CAPSTONE — GAP CHECK

```

You are reviewing the generated capstone project for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `D5B/` in the workspace. Save output there.

CAPSTONE REQUIREMENTS BY DAY:
Day 1: standalone components, @Input/@Output on TaskCardComponent, ngOnInit, ngOnDestroy
Day 2: @for/track, @if/@else, @let, StatusLabelPipe, ng-content, computed() signals
Day 3: TaskService BehaviorSubject + error$, typed HTTP, toSignal(), environment.ts,
       HttpInterceptorFn (auth header + logging)
Day 4: all 6 routes, withComponentInputBinding, queryParamMap, canDeactivate,
       Router.navigate(), reactive form + FormArray, toSignal(form.valueChanges),
       computed() subtask completion
Day 5: task.service.spec.ts, task-list.component.spec.ts, status-label.pipe.spec.ts

CONTEXT FILES: Read all files from the `D5B/` folder in the workspace — the generated capstone code is there.

**NOW PRODUCE THE FOLLOWING REVIEW:**
1. For each requirement, confirm it is present in the generated code
2. List any requirement that is missing or incomplete
3. Confirm every file has a comment block identifying day, part, and concepts
4. Confirm the README is organized by course day and Part
5. List any Extended Topics concepts that appeared in required files (scope creep)
6. List any component using inline template or styles (multi-file rule violation)
7. List any constructor injection, NgModule, or *ngIf/*ngFor in modern files
```

---
---

# FINAL FULL-CURRICULUM GAP CHECK

```

You are performing the final curriculum audit for a 5-day Angular course.

OUTPUT FOLDER: Create or use the folder `Final-Review/` in the workspace. Save output there.

COMPLETE CURRICULUM:
Day 1A: CLI, project structure, bootstrapApplication, standalone components, imports array,
"not a known element" error, CLI commands, DevTools, ViewEncapsulation
Day 1B: interpolation, property/event/two-way binding, template refs, safe navigation/
nullish coalescing, @Input/@Output, ngOnInit, ngOnDestroy, signals first look

Day 2A: ng-content, named slots, ngAfterContentInit, ng-container, ng-template,
@if/@else/@for/@switch, @let, [ngClass]/[ngStyle], built-in pipes, pure/impure pipes, custom pipe
Day 2B: signal(), computed(), effect() with cleanup, input() readonly, output(), model(),
fine-grained change detection, ngOnChanges legacy contrast, Angular direction note

Day 3A: @Injectable, inject(), inject() in guards, error handling (data$/error$ pattern),
Observable, of/from/timer/Subject/BehaviorSubject, hot/cold, operators, takeUntilDestroyed(),
toSignal(), async pipe vs toSignal()
Day 3B: provideHttpClient(), typed interfaces, GET/POST/PUT/DELETE, HttpParams,
switchMap/catchError/forkJoin, HttpErrorResponse, loading state, HttpInterceptorFn, environment files

Day 4A: provideRouter(), router-outlet/routerLink/routerLinkActive, programmatic navigation,
route/query params, withComponentInputBinding(), child routes, loadComponent(),
withHashLocation/withPreloading, canActivate, canDeactivate
Day 4B: template-driven forms, reactive forms, FormArray, custom sync/async validators,
disable submit, ngSubmit with navigate+reset, toSignal(form.valueChanges), ngModel+reactive warning

Day 5A: TestBed, ComponentFixture, standalone test setup, @Input/@Output testing, setInput(),
computed testing, service testing, HTTP testing, pipe testing, lifecycle testing, NO_ERRORS_SCHEMA

CONTEXT FILES: Read all files from every output folder in the workspace — `D1A/`, `D1B/`, `D2A/`, `D2B/`, `D3A/`, `D3B/`, `D4A/`, `D4B/`, `D5A/`, `D5B/`. All generated materials across all days are there.

**NOW PRODUCE THE FINAL AUDIT across all eight sections:**

1. COVERAGE: Any curriculum concept missing from all generated materials?
2. CONSISTENCY: Any concept taught one way early and conflicting way later?
3. PREREQUISITES: Any Day 3–5 concept assuming knowledge not taught in Days 1–2?
4. CAPSTONE ALIGNMENT: Every capstone feature traceable to a specific lesson?
5. LEGACY CONTRAST: Every section has legacy contrast slides with actual legacy code?
6. MULTI-FILE RULE: Any component using inline template or styles?
7. MODERN RULES: Any constructor injection, NgModule, or *ngIf/*ngFor in modern files?
8. EXERCISE ALIGNMENT: Any concept taught but not practiced in any exercise?
9. ANGULAR VERSION: Any API not compatible with Angular 17–21?
10. INVENTED APIS: Any method, option, or property that does not exist in Angular docs?

Output each section separately. Be exhaustive.
```

---
---

# CODE REVIEW PROMPTS

---

## Modern Angular Compliance Check

```

CONTEXT FILES: Attach or open the code file(s) you want to review. Use #file references to specify which files Copilot should check.

You are reviewing Angular code for rule violations.

**NOW CHECK FOR EVERY VIOLATION OF THESE RULES AND REPORT EACH ONE:**
1. Constructor injection — must always be inject()
2. NgModule, declarations array, or bootstrapModule in a modern file
3. *ngIf, *ngFor, *ngSwitch — must be @if, @for, @switch
4. HttpClientModule — must be provideHttpClient()
5. RouterModule.forRoot() or forChild() — must be provideRouter()
6. Class-based CanActivate or CanDeactivate — must be functional guards
7. takeUntil + ngOnDestroy Subject pattern — must be takeUntilDestroyed()
8. async pipe in a modern component — flag for intentionality review
9. @Input() decorator where input() signal should be used (flag after Day 2)
10. Implicit any or missing return type on service methods
11. Component missing standalone: true
12. Array mutated in place in a signal context — must use .update() with new reference
13. effect() without cleanup return when creating a timer or subscription
14. Inline template: `` or styles: [] in @Component — must use templateUrl and styleUrl
15. Any API not documented in Angular 17–21 — flag as possible hallucination
16. Logic unrelated to the lesson concept — flag as noise to remove

Output format:
## Violations Found
[filename] — Line [N]: [rule violated] — [what to change]
## Clean
[filename] — no violations
```

---

## Beginner Clarity Check

```

CONTEXT FILES: Attach or open the code file(s) you want to review. Use #file references to specify which files Copilot should check.

You are reviewing Angular code from the perspective of a beginner.

**NOW CHECK FOR EACH OF THE FOLLOWING AND REPORT EVERY INSTANCE:**
1. Any line doing something non-obvious with no comment explaining it
2. Any concept in the code not in the curriculum for this lesson (scope creep)
3. Any pattern similar to something just learned but working differently —
   these need explicit warning comments
4. Any common error a beginner would hit with this code —
   add a comment with the cause and fix
5. Any place the code could be simplified without sacrificing accuracy

Output format:
## Needs a Comment — Line [N]: [what the comment should explain]
## Scope Creep — Line [N]: [concept not yet taught — remove or move to Extended Topics]
## Potential Confusion — Line [N]: [why confusing; what comment or change would help]
## Suggested Simplifications — Line [N]: [what to simplify and why]
```

---
---

# QUICK REFERENCE — SESSION ORDER

```
HOW A SESSION WORKS:
Master Context is auto-loaded from .github/copilot-instructions.md.
Just paste the specific prompt into Copilot chat — no need to paste Master Context.
All output goes in day-specific folders: D1A/, D1B/, D2A/, D2B/, D3A/, D3B/, D4A/, D4B/, D5A/, D5B/.
Cross-Day Checks go in Cross-Day-Checks/. Final review goes in Final-Review/.

FOR EACH PART (in this order):
1. Sample Code → run both code review prompts → fix violations
2. Slides (self-contained — just paste the slides prompt)
3. Speaker Script (paste: specific prompt + slides)
4. Exercises (paste: specific prompt + slides)
5. Sample Project (paste: specific prompt)
6. Gap Check (paste: specific prompt + all materials)

AFTER EACH FULL DAY:
Run the Cross-Day Continuity Check

PARTS IN ORDER:
D1A → D1B → [Day 1→2 continuity]
D2A → D2B → [Day 2→3 continuity]
D3A → D3B → [Day 3→4 continuity]
D4A → D4B → [Day 4→5 continuity]
D5A → Capstone → Final gap check
```
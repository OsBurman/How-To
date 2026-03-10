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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Procedural steps (CLI commands, setup, configuration)
show exact commands and walk through each step across multiple slides. Code examples
appear on their own slides, separate from explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

What Angular is:
- What Angular is — a component-based framework for building web applications
- Why Angular exists — the problems it solves compared to vanilla JS DOM manipulation
- Framework vs library — what Angular provides out of the box (routing, forms, HTTP, DI, testing)

Installing the CLI and generating a project:
- Prerequisites — Node.js and npm; verifying installation with node -v and npm -v
- Installing the Angular CLI — npm install -g @angular/cli; verifying with ng version
- Creating a new project with ng new — the command, the prompts it asks, what each option means
- What ng new generates — high-level overview of the folders and files created

Understanding the generated file structure:
- Root config files — package.json, tsconfig.json, angular.json and what each controls
- The src/ folder — index.html (the single page), main.ts (the entry point), styles.css (global styles)
- The src/app/ folder — app.component.ts, app.config.ts, and component organization

What main.ts does:
- bootstrapApplication() — what it does, its two arguments (root component and config), when it runs
- app.config.ts — the providers array; empty now, filled later with router and HTTP on Days 3–4

Your first standalone component:
- The @Component decorator — what it is and why every component needs one
- Component metadata — selector, standalone, imports, templateUrl, styleUrl; each property explained
- What standalone: true means — the component manages its own dependencies without NgModule
- The component class — properties, methods, and how they connect to the template via data binding

The imports array on a standalone component:
- What the imports array does — registers every component, directive, and pipe this template uses
- Adding and removing items — what happens when you add a child component vs forget one

⚠️ WARNING: The "not a known element" error:
- What the error looks like — the exact console message Angular shows
- Why it happens — the component is missing from the imports array
- The two-second fix — import the class at the top, add it to imports

Angular CLI commands:
- ng serve — starting the dev server; live reload; the default localhost URL
- ng generate component — creating a component; the files it creates; shorthand ng g c
- ng build and ng test — what each command does and when you use them

Angular DevTools:
- What Angular DevTools is — a Chrome extension for inspecting components and change detection
- How to install it — Chrome Web Store; what the Components and Profiler tabs show you

ViewEncapsulation:
- Why component styles are scoped by default — Emulated encapsulation explained
- How Angular achieves scoping — unique attributes added to component HTML elements
- Emulated vs None vs ShadowDom — what each option does and when you might change it

LEGACY CONTRAST SLIDES (after all modern concept slides):
- App entry point — first explain bootstrapModule(AppModule) legacy code and the boilerplate it required; then show the modern bootstrapApplication() equivalent
- Component registration — first explain declarations: [] in NgModule and the pain of managing it; then show the modern imports: [] directly on the component
- App config — first explain the AppModule providers array pattern; then show the modern app.config.ts providers approach
- Feature grouping — first explain NgModule-per-feature pattern and the boilerplate overhead; then show how modern standalone components organize by folder instead
Each legacy topic: first explain the legacy code and what pain it caused, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 1 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples.**
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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Code examples appear on their own slides, separate from
explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

Interpolation:
- What interpolation {{ }} is — displaying component data in the template
- Interpolation examples — strings, numbers, expressions, method calls inside {{ }}

Property binding:
- Property binding [property] — binding a component value to an element property
- Property binding vs string interpolation — when to use [src]="imageUrl" vs src="{{imageUrl}}"
- Property binding examples — [disabled], [src], [hidden], [class]

Event binding:
- Event binding (event) — responding to user actions in the template
- Event binding examples — (click), (input), (keyup); accessing the $event object

Two-way binding:
- Two-way binding [(ngModel)] — keeping a component property and an input field in sync
- Why FormsModule is needed — importing it in the standalone component's imports array
- Two-way binding in action — a live text input bound to a property; typing updates both

Template reference variables:
- What template reference variables #myRef are — direct access to a DOM element or component
- Using a ref to read input values — passing #myRef.value to an event handler
- Refs vs two-way binding — when to use each approach

Safe navigation:
- Safe navigation ?. — accessing nested properties that might be null or undefined
- Why it matters — data from APIs often arrives as null before loading completes
- Example: user?.address?.city vs the crash without ?.

Nullish coalescing:
- Nullish coalescing ?? — providing fallback values when data is null or undefined
- Combining ?. and ?? — user?.name ?? 'Guest' as a complete pattern

@Input():
- What @Input() does — marks a property as receivable from a parent component
- How property binding drives @Input — parent uses [title]="value" in its template
- Data flows one direction only — parent → child; the child cannot send data back through @Input

@Output() and EventEmitter:
- What @Output() does — sends events from child to parent
- EventEmitter — creating one, calling .emit(), and what the parent receives
- The complete parent-child pattern — @Input for data down, @Output for events up

ngOnInit:
- What ngOnInit is — the lifecycle hook for initialization logic
- Why not the constructor — constructor runs before inputs are set; ngOnInit runs after
- ⚠️ WARNING: Using the constructor for initialization — the most common beginner mistake
- ngOnInit example — processing @Input data to build a display label

ngOnDestroy:
- What ngOnDestroy is — cleanup when Angular removes a component from the DOM
- Why cleanup matters — preventing memory leaks from timers, intervals, and subscriptions
- ngOnDestroy example — clearing an interval timer set up in ngOnInit

Signals first look (Day 2 preview):
- signal() — creating a piece of reactive state; reading with signal(); updating with .set() and .update()
- computed() — creating a derived value that recalculates automatically when its source changes
- This is a preview only — exercises do not require signals yet; full coverage on Day 2

LEGACY CONTRAST SLIDES (after all modern concept slides):
- ngModel setup — first explain FormsModule imported in NgModule and the indirection involved; then show the modern FormsModule in the standalone component's imports array
- Passing data down — @Input() works the same in both; first show the NgModule declarations context around it, then show the modern standalone approach
- Passing events up — @Output() + EventEmitter works the same; first show the NgModule context, then show the standalone version
- Lifecycle hooks — ngOnInit/ngOnDestroy work the same in both; first show a full NgModule-based component, then contrast with the standalone version
Each legacy topic: first explain the legacy code and what overhead it involved, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 1 Part B. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples. The signals preview slides
must clearly state exercises do not require signals yet.**
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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Code examples appear on their own slides, separate from
explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

Content projection with ng-content:
- What content projection is — a parent passes HTML into a child component's template
- ng-content single-slot — the child places <ng-content> where projected content should appear
- Named ng-content slots with select — header, body, footer slots; select="[slot-name]" syntax
- Example: building a reusable card component with named slots

ngAfterContentInit:
- What ngAfterContentInit is — fires once after Angular projects content into the component
- When it fires vs ngOnInit — ngOnInit fires first, ngAfterContentInit fires after content projection
- Note: @ContentChild exists but is not covered here — it's in Extended Topics

ng-container and ng-template:
- ng-container — a grouping element that adds no real DOM node; use it to apply @if without extra markup
- ng-template — defines a template block that renders nothing by default; used as @else blocks and reusable snippets
- When to use each — ng-container for invisible grouping, ng-template for deferred rendering

@ViewChild note:
- @ViewChild exists for accessing child DOM elements and components from the class — covered in Extended Topics; mentioned so students know the name

Built-in control flow:
- @if / @else — conditional rendering with the new block syntax; ng-template for the else block
- @if example — showing and hiding content based on a boolean condition
- @for with required track — rendering a list; what track does for DOM reconciliation and performance
- @for example — iterating over an array with track item.id
- @switch / @case — rendering one of several templates based on a value
- @switch example — displaying different badges based on a status string

@let local variable:
- What @let does — defines a local variable in the template that re-evaluates on change detection
- @let example — define a filtered count once and use it in both @if and interpolation
- ⚠️ WARNING: @let vs computed() — students confuse these; @let is NOT a signal and is NOT reactive

[ngClass] and [ngStyle]:
- [ngClass] — adding or removing CSS classes conditionally based on component data
- [ngClass] examples — string, array, and object syntax
- [ngStyle] — setting inline styles dynamically based on component data

Built-in pipes:
- What pipes are — transform displayed values in the template without changing the source data
- Built-in pipes: date — formatting dates with format strings
- Built-in pipes: currency, uppercase, lowercase — common transformations
- Built-in pipes: json and async — debugging and Observable subscription

Pure vs impure pipes:
- What a pure pipe is — only re-evaluates when its input reference changes
- ⚠️ WARNING: pure pipe mutation gotcha — mutating an array in place does NOT trigger the pipe; must create a new array reference
- What an impure pipe is — re-evaluates on every change detection cycle; performance cost

Custom pure pipe:
- Creating a custom pipe — @Pipe decorator and transform() method
- Custom pipe example — TruncatePipe that truncates a string to a configurable character limit
- Using a custom pipe in a template — {{ text | truncate:100 }}

LEGACY CONTRAST SLIDES (after all modern concept slides):
- Conditional rendering — first explain *ngIf + <ng-template #else> syntax and its indirection; then show the modern @if / @else block syntax
- List rendering — first explain *ngFor with trackBy method and why trackBy was optional; then show modern @for with required track
- Switch rendering — first explain [ngSwitch] / *ngSwitchCase / *ngSwitchDefault syntax; then show the modern @switch / @case syntax
- Track — first explain how optional trackBy in *ngFor led to performance bugs when forgotten; then show required track in @for
- Template local variable — first explain *ngIf="expr as name" pattern and its limitations; then show the modern @let name = expr syntax
Each legacy topic: first explain the legacy code and what pain or confusion it caused, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 2 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples.**
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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Code examples appear on their own slides, separate from
explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

The problem signals solve:
- How zone.js works — patches browser events and checks the entire component tree on every click, keystroke, or timer
- Why this is a problem — unnecessary re-renders; performance degrades as the app grows
- What signals change — they tell Angular exactly what changed, so only affected DOM nodes update

signal():
- What a signal is — a reactive container for a value that notifies Angular when it changes
- Creating a signal — signal(initialValue); reading it by calling the signal as a function: count()
- Updating with .set() — replacing the value entirely; count.set(5)
- Updating with .update() — deriving from the current value; count.update(c => c + 1)

computed():
- What computed() does — creates a read-only signal derived from other signals
- How it works — recalculates only when its dependency signals change; cached otherwise
- computed() example — total signal derived from price and quantity signals
- ⚠️ WARNING: computed() is read-only — you cannot call .set() or .update() on a computed signal

effect():
- What effect() does — runs a side effect whenever its dependency signals change
- When to use it — logging, local storage, DOM updates outside Angular
- The cleanup function — returning a function from effect() that runs before the next execution
- ⚠️ WARNING: forgetting cleanup — if you set up a timer or subscription inside effect(), you must return a cleanup function to avoid memory leaks

Signal-based input():
- What input() does — replaces @Input() with a signal-based readonly input
- Declaring an input — readonly name = input<string>(); reading it: this.name()
- ⚠️ WARNING: input() is always readonly — cannot call .set() from inside the component; the parent owns the value
- Required vs optional inputs — input.required<string>() vs input<string>()

Signal-based output():
- What output() does — replaces @Output() + EventEmitter with a cleaner API
- Declaring an output — readonly selected = output<string>(); emitting: this.selected.emit(value)
- output() example — child emits an event, parent handles it with (selected)="onSelect($event)"

model():
- What model() does — two-way signal binding between parent and child
- model() replaces the @Input()/@Output() pair pattern for two-way data flow
- model() example — a rating input component where parent and child share the same value
- How to use model() in a template — [(rating)]="myRating" banana-in-a-box syntax

Fine-grained change detection:
- How signals enable fine-grained updates — Angular tracks which DOM nodes depend on which signals
- Only affected nodes re-render — contrast with zone.js checking the entire tree
- What this means in practice — faster apps with less effort

Angular direction callout:
- Zoneless Angular — stable in v21+; signals are what made this possible
- What this means for students — everything you just learned is the foundation of Angular's future

LEGACY CONTRAST SLIDES (after all modern concept slides):
- Component input — first explain @Input() mutable property and how changes were untracked; then show modern input<T>() readonly signal
- Component output — first explain @Output() + EventEmitter pattern; then show modern output<T>()
- Two-way binding — first explain the @Input() + @Output() pair pattern and the boilerplate; then show modern model<T>() one-liner
- Reacting to input changes — first explain ngOnChanges(SimpleChanges) and the complexity of the SimpleChanges object; then show modern computed() or effect()
- Derived state — first explain getter or ChangeDetectorRef approaches and their limitations; then show modern computed(() => ...)
- Side effects — first explain ngOnChanges/ngDoCheck/ngOnDestroy and the scattered cleanup; then show modern effect() with cleanup in one place
- Change detection — first explain Zone.js full tree check and what it costs; then show modern fine-grained signal-based updates
- Manual optimization — first explain OnPush + markForCheck() and why it was fragile; then show modern signals where manual optimization is unnecessary
Each legacy topic: first explain the legacy code and what pain or overhead it caused, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 2 Part B. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples.**
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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Code examples appear on their own slides, separate from
explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

What a service is:
- Why services exist — separating shared logic and state from components; the prop-drilling problem
- What a service looks like — a plain TypeScript class with the @Injectable decorator

@Injectable and providedIn:
- @Injectable({ providedIn: 'root' }) — what it means; singleton; tree-shakable
- How Angular's DI system works at a high level — one instance shared across the entire app

inject():
- inject() in a component class body — replacing constructor injection with a function call
- inject() syntax — const service = inject(ServiceName); where it goes in the class
- inject() beyond components — works in guards, interceptors, pipes, and factory functions
- inject() example in a functional guard — shows that inject() is not limited to components

Error handling in services:
- The data$/error$ pattern — a BehaviorSubject for data and a paired BehaviorSubject<string | null> for errors
- Wrapping updates in try/catch — surfacing errors to components without crashing
- Displaying errors in a component — reading the error$ stream and showing user-friendly messages

What an Observable is:
- Observable concept — a stream of values over time; push-based; can emit zero, one, or many values
- Observable vs Promise — Promise delivers one value; Observable delivers a stream; Observable is lazy
- The subscribe() method — how you start receiving values from an Observable

Creating Observables:
- of() — creates an Observable from static values; emits and completes immediately
- from() — converts an array or Promise into an Observable
- timer() — emits after a delay or on an interval
- Subject — a multicast Observable you can push values into; no initial value
- BehaviorSubject — like Subject but always has a current value; new subscribers get the latest immediately

Subject vs BehaviorSubject:
- The key difference — BehaviorSubject has a current value; Subject does not
- When to use each — BehaviorSubject for state management; Subject for event streams

Hot vs cold Observables:
- Cold Observable — created fresh for each subscriber; of() and from() are cold
- Hot Observable — shared among all subscribers; BehaviorSubject and Subject are hot
- Why it matters — understanding when data is shared vs duplicated

Core RxJS operators:
- map — transform each emitted value
- filter — only pass values that meet a condition
- tap — perform side effects without changing the stream (logging, debugging)
- switchMap — when a new value arrives, cancel the previous inner Observable and switch to a new one
- combineLatest — combine the latest values from multiple Observables into one
- debounceTime — wait for a pause in emissions before passing the value through (search input)

takeUntilDestroyed():
- What takeUntilDestroyed() does — automatically unsubscribes when the component is destroyed
- How to use it — pipe(takeUntilDestroyed()) with DestroyRef injected
- Why it matters — prevents memory leaks without manual ngOnDestroy cleanup

toSignal():
- What toSignal() does — converts an Observable into a signal for use in templates
- toSignal() with initialValue — providing a default value so the signal is never undefined
- When to use toSignal() — any time you need an Observable value in a template

⚠️ WARNING: async pipe vs toSignal():
- The async pipe null problem — async pipe emits null before the first value arrives, breaking templates
- toSignal() solves this — the initialValue option provides an immediate non-null value
- Guidance: prefer toSignal() in all new code

LEGACY CONTRAST SLIDES (after all modern concept slides):
- Service injection — first explain constructor(private svc: MyService) syntax and the constructor parameter bloat; then show modern inject(MyService)
- Service scope — first explain NgModule.providers registration and why it was error-prone; then show modern providedIn: 'root'
- RxJS cleanup — first explain takeUntil(destroy$) + ngOnDestroy Subject pattern and the manual boilerplate; then show modern takeUntilDestroyed() one-liner
- Observable in template — first explain async pipe + *ngIf null guard and the null timing issue; then show modern toSignal(obs$, {initialValue})
Each legacy topic: first explain the legacy code and what pain or overhead it caused, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 3 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples.**
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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Code examples appear on their own slides, separate from
explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

Setting up HTTP in Angular:
- provideHttpClient() in app.config.ts — enabling the HTTP client for the entire app
- How this connects to Part A — HTTP calls return Observables; everything from Part A applies

TypeScript interfaces for HTTP responses:
- Why typing matters — without an interface you get any and have no IDE help or type safety
- Defining an interface — the User interface for JSONPlaceholder /users data
- Typing the HTTP call — http.get<User[]>(url) tells TypeScript the exact shape of the response

HTTP methods:
- GET — fetching data; returns Observable<T>; example: http.get<User[]>(url)
- POST — creating data; sends a body; returns Observable<T>
- PUT and DELETE — updating and removing data; same Observable pattern
- Every HTTP call returns an Observable — you must subscribe or use toSignal() to trigger it

HttpParams:
- What HttpParams is — building query strings programmatically instead of string concatenation
- HttpParams syntax — new HttpParams().set('userId', 1).set('page', 2)
- Passing params to a request — http.get(url, { params })

switchMap for HTTP:
- The stale request problem — typing fast sends multiple requests; old responses arrive after new ones
- How switchMap solves it — cancels the previous in-flight request when a new one starts
- switchMap example — search input piped through debounceTime then switchMap to HTTP call

catchError:
- What catchError does — intercepts errors in the Observable pipeline and handles them gracefully
- catchError example — returning a fallback value or rethrowing with a user-friendly message

⚠️ WARNING: HttpErrorResponse:
- What HttpErrorResponse is — the error object Angular returns on HTTP failure
- Status branching — .status 0 means network error, 404 means not found, 500 means server error
- Why each needs a different message — users need specific, helpful feedback
- HttpErrorResponse example — a switch on .status returning appropriate messages

forkJoin:
- What forkJoin does — runs multiple Observables in parallel; waits for all to complete
- forkJoin as Promise.all equivalent — both must succeed before results are available
- forkJoin example — loading users and posts simultaneously

Loading state:
- The isLoading pattern — an isLoading signal set to true before a request, false after
- finalize() operator — runs cleanup logic whether the Observable succeeds or errors
- Loading state example — showing a spinner while data loads, hiding it when done

Functional HttpInterceptorFn:
- What an interceptor is — middleware that runs on every HTTP request and/or response
- HttpInterceptorFn — a plain function that receives the request and a next handler
- Interceptor example — adding an Authorization header and logging the request URL and method
- Registering interceptors — withInterceptors([authInterceptor]) in provideHttpClient()

toSignal() with HTTP:
- Connecting HTTP Observable to template — toSignal() converts the HTTP response into a signal
- toSignal() with initialValue — providing a default so the template has data immediately

environment.ts:
- What environment files are — src/environments/environment.ts and environment.development.ts
- Storing the API base URL — apiUrl: 'http://localhost:3000'
- How ng build swaps environments — production vs development configuration at build time

LEGACY CONTRAST SLIDES (after all modern concept slides):
- HTTP setup — first explain HttpClientModule imported in AppModule and the module overhead; then show modern provideHttpClient() in app.config.ts
- Interceptors — first explain a class implementing HttpInterceptor with its intercept() method; then show modern HttpInterceptorFn as a plain function
- Registration — first explain HTTP_INTERCEPTORS multi-token provider array pattern; then show modern withInterceptors([fn]) one-liner
- Response typing — http.get<MyType>(url) is the same in both; note this did not change
- Environment config — environment.ts swap is the same in both; note this did not change
Each legacy topic: first explain the legacy code and what pain or overhead it caused, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 3 Part B. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples.**
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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Code examples appear on their own slides, separate from
explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

Setting up routing:
- Why routing matters — turns a single-page app into a multi-view application with URLs
- provideRouter(routes) in app.config.ts — enabling routing for the app
- The route configuration array — path, component, and how routes map URLs to components

Core routing directives:
- router-outlet — the placeholder where Angular renders the matched component
- routerLink — navigating between routes in templates; [routerLink]="['/recipes']"
- routerLinkActive — adding an active CSS class to the current route's link

Programmatic navigation:
- Router.navigate() — navigating from TypeScript code; passing route segments as an array
- Router.navigateByUrl() — navigating with a full URL string
- When to use each — navigate() for relative paths and query params; navigateByUrl() for absolute URLs
- Example: navigating to a detail page after clicking a row

Route parameters:
- What route parameters are — /recipe/:id in the route config; identifies a specific resource
- Route param example — /recipe/42 where 42 is the recipe ID

Query parameters:
- What query parameters are — /recipes?category=italian; optional filter/sort values
- Route params vs query params — params identify the thing; query params modify the view
- Reading query params — inject(ActivatedRoute).queryParamMap

withComponentInputBinding():
- What it does — binds route parameters directly to input() signals on the component
- How to enable it — withComponentInputBinding() option in provideRouter()
- Example: readonly id = input<string>() automatically receives the :id route param
- Why this is better — no manual ActivatedRoute subscription needed

Child routes:
- What child routes are — nested routes rendered inside a parent component's router-outlet
- Nested router-outlet — a second <router-outlet> inside a parent component
- Child route example — /recipes/:id/reviews as a child of /recipes/:id

Lazy loading:
- What lazy loading is — loading a component's code only when the user navigates to that route
- loadComponent() — the modern way to lazy load a standalone component
- loadComponent() syntax — loadComponent: () => import('./path').then(m => m.Component)
- Why lazy loading matters — faster initial page load for large apps

Router configuration options:
- withHashLocation() — uses # in URLs for environments without server-side URL rewriting
- withPreloading() — preloads lazy-loaded routes in the background after initial load

Functional guards:
- canActivate guard — a function that returns boolean or UrlTree; runs before entering a route
- canActivate example — checking an isLoggedIn signal; redirecting to /login via UrlTree
- canDeactivate guard — a function that checks whether it's safe to leave the current route
- canDeactivate example — checking a hasUnsavedChanges property; showing a confirmation prompt
- How guards connect to Day 4 Part B — "you will wire canDeactivate to your reactive form's .dirty property"

AppRoutingModule callout:
- What AppRoutingModule is — the legacy pattern you will encounter in existing codebases
- Why students need to recognize it — most Angular projects on the job still use this pattern

LEGACY CONTRAST SLIDES (after all modern concept slides):
- Router setup — first explain RouterModule.forRoot(routes) in AppModule and the import overhead; then show modern provideRouter(routes)
- Feature routes — first explain RouterModule.forChild() pattern and separate routing modules; then show modern child route arrays
- Lazy loading — first explain loadChildren: () => import().then() module-based loading; then show modern loadComponent: () => import()
- Route params as inputs — first explain manual ActivatedRoute injection and param subscription; then show modern withComponentInputBinding()
- Programmatic nav — first explain constructor-injected Router pattern; then show modern inject(Router).navigate()
- canActivate — first explain class implementing CanActivate interface; then show modern plain function guard
- canDeactivate — first explain class implementing CanDeactivate<T> interface; then show modern plain function guard
Each legacy topic: first explain the legacy code and what pain or overhead it caused, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 4 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples.**
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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Code examples appear on their own slides, separate from
explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

Two form systems in Angular:
- Angular has two separate form systems — template-driven and reactive
- When to use each — template-driven for simple forms; reactive for complex, dynamic forms

Template-driven forms:
- What template-driven forms are — form logic lives mostly in the template
- ngModel — binding an input to a component property; requires FormsModule
- ngForm — the form directive that tracks overall form validity
- #field template references — #email="ngModel" gives access to field state
- HTML5 validators — required, minlength, maxlength, pattern, email
- Error display — showing messages with #field.invalid && #field.touched
- Template-driven form example — a complete contact form with validation and error messages

Reactive forms:
- What reactive forms are — form logic lives in the TypeScript class
- FormGroup — a group of form controls treated as a single unit
- FormControl — an individual form field with its value, validators, and state
- FormBuilder — a shorthand for creating FormGroups and FormControls
- Validators — Validators.required, Validators.minLength(), Validators.email
- valueChanges — an Observable that emits whenever any form value changes
- Reactive form example — a complete registration form built with FormBuilder

FormArray:
- What FormArray is — a dynamic list of form controls that can grow or shrink at runtime
- FormArray.push() — adding a new control dynamically
- FormArray.removeAt() — removing a control by index
- Iterating over FormArray — using @for to render each control
- FormArray example — "add another phone number" or "add another promo code"

Custom synchronous validators:
- What a ValidatorFn is — a function that returns null (valid) or an error object (invalid)
- The validator contract — return null = valid, return { errorKey: true } = invalid
- Custom validator example — password match validator comparing two fields
- Using a custom validator — attaching it to a FormGroup or FormControl

Custom async validators:
- What an AsyncValidatorFn is — a validator that returns a Promise or Observable
- When to use async validators — checking if a username is taken, validating against an API
- Async validator example — username availability check with a mock HTTP delay
- Pending state — how to show a loading indicator while the async validator runs

Disabling submit:
- Disabling the submit button until form.valid — [disabled]="!form.valid"
- Why this matters — prevents invalid form submissions

Form submission:
- (ngSubmit) handler — the event that fires when the form is submitted
- Reading form values — form.value gives you the complete form data as an object
- The submission flow — read .value → call service → Router.navigate() on success → form.reset() on failure
- Form submission example — complete submit handler with error handling

toSignal(form.valueChanges):
- What this does — converts the form's live valueChanges Observable into a signal
- Why it's useful — you already used toSignal() with HTTP; form.valueChanges is just another Observable
- toSignal() with form example — a live preview of form data as the user types

computed() derived from form signals:
- Deriving state from form values — computed() that reacts to toSignal(form.valueChanges)
- Password strength indicator — a computed signal that calculates strength from the password field
- Completion percentage — a computed signal showing how much of a multi-step form is filled out

⚠️ WARNING: ngModel inside reactive form:
- The exact error — ngModel cannot be used inside a reactive FormGroup
- Why it happens — mixing template-driven and reactive systems in the same form
- The fix — use formControlName instead of ngModel inside reactive forms
- Show the exact error message so students recognize it immediately

LEGACY CONTRAST SLIDES (after all modern concept slides):
- FormsModule — first explain FormsModule imported in NgModule and the global registration; then show the modern import in a standalone component's imports array
- ReactiveFormsModule — first explain ReactiveFormsModule imported in NgModule; then show the modern import in a standalone component
- Form value as signal — first explain manual valueChanges subscription in ngOnInit + cleanup in ngOnDestroy; then show modern toSignal(form.valueChanges) one-liner
- FormArray — identical API in both legacy and modern; note this did not change
Each legacy topic: first explain the legacy code and what pain or overhead it caused, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 4 Part B. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples.**
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

SLIDE DEPTH RULES:
These slides are detailed descriptions fed into a visual slide generator. Each slide
must stand on its own with clear, complete content. Every concept uses as many slides
as needed for full comprehension — never cram multiple ideas onto one slide. Sub-concepts
get their own dedicated slides. Code examples appear on their own slides, separate from
explanation slides.

CONCEPTS TO COVER (use as many slides as needed per concept and sub-concept):

Angular testing setup:
- What Angular uses for testing — Jasmine (test framework) + Karma (test runner)
- Jest as an alternative — mention it exists; this course uses Jasmine/Karma
- Running tests — ng test command; what the output looks like

TestBed:
- What TestBed is — a mini Angular environment that exists only inside your test
- TestBed.configureTestingModule — setting up the test module with imports, providers
- ComponentFixture — the wrapper that gives you access to the component instance and its DOM
- debugElement — accessing the component's rendered DOM for assertions
- detectChanges() — triggering change detection manually in tests
- ⚠️ WARNING: forgetting detectChanges() — the #1 cause of tests that always pass even when they shouldn't

Testing standalone components:
- imports: [MyComponent] — how standalone components simplify test setup
- Creating the fixture — TestBed.createComponent(MyComponent)
- Accessing the component instance — fixture.componentInstance

Testing @Input:
- Setting an @Input value — component.title = 'Test'; fixture.detectChanges()
- Asserting the template updated — checking the rendered DOM for the expected text

Testing @Output:
- Subscribing to the EventEmitter — component.myOutput.subscribe(val => ...)
- Triggering the event — clicking a button or calling a method
- Asserting the emitted value

Testing signal inputs:
- Why you can't set input() directly — it's readonly from outside the component
- fixture.componentRef.setInput() — the official way to set signal inputs in tests
- setInput() example — fixture.componentRef.setInput('name', 'Test'); fixture.detectChanges()

Testing computed() signals:
- Changing the source signal — using .set() or setInput() to update the dependency
- Asserting the computed value — reading the computed signal and checking its value
- Verifying reactivity — changing the source and confirming the derived value updates

Unit testing a service:
- jasmine.createSpyObj — creating a mock service with fake methods
- Providing the mock — TestBed.configureTestingModule({ providers: [{ provide: RealService, useValue: mockService }] })
- Testing BehaviorSubject state — changing state, subscribing, asserting values
- Testing the error$ stream — triggering an error condition, asserting the error message

Testing HTTP:
- provideHttpClientTesting() — replacing real HTTP with a testing controller
- HttpTestingController — intercepting outgoing requests and providing fake responses
- expectOne() — asserting that a specific URL was called with the right method
- flush() — sending a fake response to the pending request
- Simulating HttpErrorResponse — testing error handling with flush({ ... }, { status: 404 })

Testing a pipe:
- Why pipe tests are the simplest — instantiate, call transform(), assert the return value
- Pipe test example — new TruncatePipe().transform('long text', 5) should return 'long ...'
- Testing edge cases — empty strings, strings shorter than the limit, boundary values

Testing lifecycle:
- Testing ngOnInit — detectChanges() triggers ngOnInit; assert initialization happened
- Testing ngOnDestroy — call fixture.destroy(); assert timers cleared or subscriptions cancelled

Unit vs integration test tradeoffs:
- NO_ERRORS_SCHEMA — tells Angular to ignore unknown elements; simplifies unit tests but hides errors
- Real child imports — importing actual child components catches integration issues but adds complexity
- When to use each — NO_ERRORS_SCHEMA for focused unit tests; real imports for integration tests
- Running both — keeping separate .spec.ts and .integration.spec.ts files

LEGACY CONTRAST SLIDES (after all modern concept slides):
- Component test setup — first explain declarations array + module deps in TestBed.configureTestingModule; then show modern imports: [StandaloneComponent]
- HTTP testing — first explain HttpClientTestingModule import in the test module; then show modern provideHttpClientTesting()
- Signal input testing — first explain component.prop = value direct assignment approach; then show modern fixture.componentRef.setInput()
- Change detection — detectChanges() works the same in both; note this did not change
Each legacy topic: first explain the legacy test code and what overhead it involved, then show the modern equivalent — use a separate slide for the modern comparison unless it fits on the same slide without overcrowding.

**NOW WRITE THE COMPLETE SLIDE DECK for Day 5 Part A. Generate your own focused code
examples for each code slide — do not reference external files. Format each slide as:
## [Slide Title] followed by its content, separated by ---. Include every concept and
sub-concept listed — each gets its own slide(s). After all modern slides, include the
legacy contrast slides showing actual legacy code examples.**
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
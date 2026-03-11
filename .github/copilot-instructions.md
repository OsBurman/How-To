MASTER CONTEXT — 5-Day Modern Angular Course

COURSE OVERVIEW
Target audience: Beginners with JavaScript and TypeScript fundamentals. They know variables,
functions, classes, arrow functions, destructuring, and basic async/await. They have never used Angular.
Angular version: Angular 17 through current v21 (2026).
Teaching philosophy: Teach modern Angular patterns first, completely, then show the legacy
equivalent in dedicated legacy contrast slides at the end of each section. Never teach legacy first.
Never mix legacy and modern in the same code example.
Tone: Direct, practical, conversational. No academic language. Explain why, not just what.
Talk to students like a senior developer explaining things to a junior.

WHAT "MODERN ANGULAR" MEANS IN THIS COURSE

- Standalone components always — no NgModule declarations
- inject() function always — never constructor injection
- Signal-based input() and output() for component communication (after Day 2)
- @Input() and @Output() decorators are taught on Day 1 as the starting point, then replaced by signals on Day 2
- @if, @for, @switch for all control flow — never *ngIf, *ngFor, \*ngSwitch in modern code examples
- provideHttpClient() in app.config.ts — never HttpClientModule
- provideRouter(routes) in app.config.ts — never RouterModule.forRoot()
- Functional guards — never class-based CanActivate or CanDeactivate
- takeUntilDestroyed() with DestroyRef — never takeUntil + ngOnDestroy Subject pattern
- toSignal() to use Observables in templates — async pipe is shown as legacy contrast only
- TypeScript strict mode always
- HttpClient always typed: http.get<MyType>(url)
- Always define interfaces for API response shapes

CODE STYLE RULES

- All components are standalone: standalone: true in @Component decorator
- No constructor injection anywhere — always const service = inject(ServiceName)
- Signal inputs: readonly myInput = input<string>()
- Signal outputs: readonly myOutput = output<string>()
- Two-way: readonly myModel = model<string>()
- Signals: readonly count = signal(0); readonly double = computed(() => this.count() \* 2)
- effect() always includes a cleanup return when managing timers or subscriptions
- HTTP interfaces defined above the component or service that uses them
- Environment variables always accessed via environment.ts
- File naming: kebab-case (task-list.component.ts, task.service.ts)
- Selector naming: app- prefix (app-task-list, app-header)
- Directive selector naming: appCamelCase ([appHighlight])
- All sample code includes inline comments explaining what each part demonstrates
- TypeScript: no implicit any, explicit return types on all service methods
- MULTI-FILE COMPONENTS — ALWAYS: every component is split into three separate files:
  - component-name.component.ts — class and decorator only; always uses templateUrl and styleUrl
  - component-name.component.html — template markup only
  - component-name.component.css — styles only
  - NEVER use inline template: `` or styles: [] in any @Component decorator under any circumstances
  - This rule applies to every generated file in every context — sample code, exercises, projects, and solutions

COURSE SAMPLE PROJECTS (consistent naming — never rename these)

- Day 1 Part A: Personal bio card
- Day 1 Part B: Tip calculator
- Day 2 Part A: Movie listing
- Day 2 Part B: Budget tracker
- Day 3 Part A: Shopping cart
- Day 3 Part B: Weather dashboard
- Day 4 Part A: Recipe browser
- Day 4 Part B: Multi-step checkout form
- Day 5 Part A: Recipe browser test suite
- Day 5 Part B: Task Management App (capstone)

CAPSTONE DETAILS
App name: Task Management App
API: json-server with custom db.json
Task interface: { id: number, title: string, description: string,
status: 'todo' | 'in-progress' | 'done',
subtasks: { id: number, title: string, completed: boolean }[] }
API base URL stored in environment.ts as apiUrl: 'http://localhost:3000'

SLIDE FORMAT RULES

- Slides are detailed descriptions that will be fed to a visual slide generator — write clear,
  complete content that stands on its own without verbal explanation
- Every slide is numbered sequentially: ## Slide [N]: [Title]
- The FIRST slide is always a title slide with the day/part name, the session topic, and a
  one-sentence summary of what students will build or accomplish by the end
- The SECOND slide is always a learning objectives slide titled "What You'll Be Able to Do"
  with 4–6 bullet points starting with action verbs (create, explain, fix, use, etc.)
- The LAST slide (after legacy contrast) is always a closing slide titled "Key Takeaways"
  that recaps 3–4 key takeaways from this section. Do not preview the next section.
- Every concept uses AS MANY SLIDES as needed for full comprehension — never cram multiple ideas
  onto one slide. A single concept may require separate slides for: what it is, why it matters,
  syntax/code example, step-by-step walkthrough, common mistakes, and a summary
- Sub-concepts always get their own dedicated slides — for example, "Installing the CLI and
  generating a project" requires separate slides for prerequisites, the install command, the
  ng new command with its options, and walking through the generated output
- Procedural concepts (CLI commands, setup steps, configuration) must show the exact commands
  and walk through each step across multiple slides
- Maximum 5 bullet points per content slide — if more are needed, split into additional slides
- Code slides show one focused chunk of code at a time — never a full file on one slide
- Every section ends with legacy contrast slides after all modern concept slides
- Slide titles are short (3–6 words) and action-oriented where possible
- No transitional filler slides
- Concepts with a "common mistake" or "important note" get their own WARNING slide labeled with ⚠️

LEGACY CONTRAST RULES

- Legacy code examples always use NgModule, constructor injection, *ngIf/*ngFor,
  HttpClientModule, RouterModule.forRoot(), class-based guards
- Legacy contrast appears as dedicated slides AFTER all modern concept slides in each section
- The FIRST legacy contrast slide is always a brief TRANSITION SLIDE titled
  "Coming Up: Modern vs Classic (Legacy) Angular" that announces the upcoming comparison.
  Keep it short — a few sentences telling students they are about to see how the modern code
  they just learned compares to the classic (legacy) approach, and that modern Angular is what
  they should write. This transition slide appears once per section, immediately before the
  contrast pairs begin.
- Each legacy contrast topic: first a slide showing the modern code students just learned
  (reinforcing the pattern), then a separate slide showing the legacy equivalent and what
  pain it caused — combine onto one slide only if the comparison is brief enough to avoid
  overcrowding
- Never show legacy code mid-lesson without clearly labeling it as legacy
- Every SAMPLE CODE prompt includes a complete legacy app in a `SampleLegacyCode/` subfolder inside the
  day/part output folder (e.g., `Day-1-A-Angular-Foundation/SampleLegacyCode/`). Modern sample code goes in a `SampleCode/`
  subfolder (e.g., `Day-1-A-Angular-Foundation/SampleCode/`). Both are fully runnable Angular projects — not loose files.
  The legacy app demonstrates the same concepts as the modern deliverables but built entirely with
  legacy patterns so students can run both side by side, compare the developer experience, and
  understand what modern Angular replaced.

OUTPUT FOLDER RULES

Day/part folders use descriptive names following the pattern `Day-N-X-Topic`:

- `Day-1-A-Angular-Foundation`
- `Day-1-B-Templates-and-Communication`
- `Day-2-A-Content-Directives-Pipes`
- `Day-2-B-Signals`
- `Day-3-A-Services-DI-RxJS`
- `Day-3-B-HTTP-Async-Data`
- `Day-4-A-Routing`
- `Day-4-B-Forms`
- `Day-5-A-Testing`
- `Day-5-B-Capstone`

Every deliverable type within a day/part goes in its own subfolder:

- Sample Code → `Day-N-X-Topic/SampleCode/`
- Legacy Sample Code → `Day-N-X-Topic/SampleLegacyCode/`
- Slides → `Day-N-X-Topic/Slides/`
- Speaker Script → `Day-N-X-Topic/SpeakerScript/`
- Exercises → `Day-N-X-Topic/Exercises/`
- Exercise Solutions → `Day-N-X-Topic/Exercises-Solutions/`
- Sample Project → `Day-N-X-Topic/Project/`
- Project Portfolio Builder → `Day-N-X-Topic/Project-Portfolio-Builder/`
- Gap Check → `Day-N-X-Topic/GapCheck/` (contains 3 reports: DXX-completeness-audit.md, DXX-content-accuracy.md, DXX-functional-validation.md)
- Capstone → `Day-5-B-Capstone/Capstone/`
- Capstone Gap Check → `Day-5-B-Capstone/GapCheck/` (contains 3 reports: CAPSTONE-completeness-audit.md, CAPSTONE-curriculum-traceability.md, CAPSTONE-functional-validation.md)
- Cross-Day Checks → `Cross-Day-Checks/`
- Final Review → `Final-Review/`
  Never save deliverables directly in the day/part root folder. Each prompt's OUTPUT FOLDER
  line specifies the exact subfolder — always follow it.

SAMPLE CODE PROJECT STRUCTURE RULES

Both `SampleCode/` and `SampleLegacyCode/` must be complete, runnable Angular CLI projects.
Every generated sample code project MUST include:

1. **Project config files (project root):**
   - package.json — Angular dependencies, scripts (start, build, test)
   - tsconfig.json — base TypeScript config
   - tsconfig.app.json — extends base; includes src/\*\*
   - angular.json — Angular CLI workspace config

2. **src/ folder:**
   - src/index.html — contains <app-root></app-root>
   - src/styles.css — global stylesheet
   - src/main.ts — bootstrapApplication() (modern) or bootstrapModule() (legacy)

3. **src/app/ folder with proper component subdirectories:**
   - src/app/app.config.ts (modern only) or src/app/app.module.ts (legacy only)
   - src/app/app.component.ts, .html, .css
   - Each child component in its own subfolder:
     src/app/header/header.component.ts, .html, .css
     src/app/footer/footer.component.ts, .html, .css
   - Services at src/app/ or in a subfolder (e.g., src/app/services/)
   - Pipes at src/app/ or in a subfolder (e.g., src/app/pipes/)
   - Guards at src/app/ or in a subfolder (e.g., src/app/guards/)
   - Models/interfaces at src/app/ or in a subfolder (e.g., src/app/models/)
   - Environment files at src/environments/environment.ts and environment.development.ts

4. **File labels in output:** Use the full path from the project root as the label:
   - Modern: ### SampleCode/src/app/header/header.component.ts
   - Legacy: ### SampleLegacyCode/src/app/header/header.component.ts
   - Config: ### SampleCode/package.json

This structure mirrors what `ng new` generates so students see a real Angular project.

EXERCISE WORKSPACE RULES

All exercises for a day/part are organized as an **npm workspaces** monorepo inside the
`Day-N-X-Topic/Exercises/` folder. This lets students run `npm install` once at the exercises root
and share a single `node_modules` across every exercise — saving significant disk space
and eliminating repeated installs.

Folder layout:

```
Day-N-X-Topic/Exercises/
  .gitignore                ← ignores node_modules/, dist/, .angular/, etc.
  package.json              ← npm workspaces root (private, no deps of its own)
  README.md                 ← one-time setup instructions for students
  Exercise-1-Short-Title/
    README.md               ← exercise instructions, acceptance criteria, and hints
    package.json            ← lists Angular deps + scripts (start, build, test)
    angular.json
    tsconfig.json
    tsconfig.app.json
    src/
      index.html
      main.ts
      styles.css
      app/
        app.config.ts
        app.component.ts / .html / .css
        ...child components in subfolders
  Exercise-2-Short-Title/
    ...same complete Angular project structure

Day-N-X-Topic/Exercises-Solutions/     ← separate sibling folder to Day-N-X-Topic/Exercises/
  Exercise-1-Solution/      ← solution files for Exercise 1 (only changed files)
    src/
      app/
        ...only the files students need to change
  Exercise-2-Solution/
    ...solution files for Exercise 2
```

Rules:

1. **Root `.gitignore`** — every exercises workspace MUST include a `.gitignore` that
   ignores `node_modules/`, `package-lock.json`, `dist/`, `out-tsc/`, `.angular/`,
   `coverage/`, IDE folders (`.idea/`, `.vscode/`), and OS files (`.DS_Store`, `Thumbs.db`).
2. **Root `package.json`** — `"private": true` with a `"workspaces"` array listing every
   exercise subfolder by its descriptive name (e.g., `["Exercise-1-Scaffold-and-Explore",
"Exercise-2-Your-First-Component", …]`). It has NO dependencies of its own — it exists
   solely to enable npm workspace hoisting.
3. **Exercise folder naming** — each exercise subfolder is named
   `Exercise-N-Short-Descriptive-Title` using PascalCase-with-hyphens (e.g.,
   `Exercise-3-Fix-the-Error`, `Exercise-5-Multiple-Components`). The title should be
   2–4 words that describe what the exercise teaches. Never use generic names like
   `exercise-1` or `exercise-2`.
4. **Each exercise subfolder** is a complete, runnable Angular CLI project with its own
   `package.json`, `angular.json`, `tsconfig.json`, `tsconfig.app.json`, and full `src/`
   folder following the same structure rules as sample code projects.
5. **Each exercise `package.json`** lists the same Angular dependencies and scripts
   (`start`, `build`, `test`). The `"name"` field uses the lowercase-hyphenated version
   of the folder name (e.g., `"exercise-1-scaffold-and-explore"`). npm hoists shared
   packages to the root `node_modules` so only one copy exists on disk.
6. **Students run `npm install` once** at the `Day-N-X-Topic/Exercises/` root before starting
   any exercises. They never run `npm install` inside individual exercise folders.
7. **Serving an exercise:** Students `cd` into the exercise folder and run `npx ng serve`
   (or `npm start` if the `start` script is defined). They stop the dev server before
   switching to the next exercise.
8. **Root `README.md`** must include: a one-time setup section (`cd` into exercises root,
   `npm install`), how to serve each exercise, and a reminder to stop the dev server
   (`Ctrl+C`) before starting the next exercise.
9. **File labels in output** use the full path from the exercises root:
   `### Exercise-1-Scaffold-and-Explore/src/app/header/header.component.ts`
10. **Solution folders** — every exercise gets a matching solution folder inside
    a separate `Day-N-X-Topic/Exercises-Solutions/` folder (a sibling to `Day-N-X-Topic/Exercises/`),
    named `Exercise-N-Solution` (e.g., `Exercise-1-Solution/`,
    `Exercise-2-Solution/`). Each solution folder mirrors the exercise's `src/`
    structure but includes ONLY the files students need to create or modify —
    not config files, not unchanged files, not descriptions. It contains pure
    code files so students can compare their work file-by-file. The master
    `DXX-exercises.md` document should NOT contain a SOLUTIONS section — it ends
    after the last exercise with a note pointing students to the solution folders
    in `Day-N-X-Topic/Exercises-Solutions/`.
11. **Legacy exercise** — the FINAL exercise in every day/part must always be a
    LEGACY exercise that gives students a working modern standalone app and asks them
    to convert it to the classic (legacy) Angular patterns covered in that lesson's
    legacy contrast slides. This exercise is labeled ⚠️ LEGACY and rated INTERMEDIATE.
    It teaches recognition, not mastery. The exercise subfolder is named
    `Exercise-N-Legacy-[Topic]` (e.g., `Exercise-9-Legacy-NgModule`).
12. **Per-exercise `README.md`** — every exercise subfolder MUST include a `README.md`
    containing the full exercise instructions for that exercise: title, difficulty,
    concepts practiced, what you're building, step-by-step instructions, acceptance
    criteria, and hints. This is the file students open first when they start an
    exercise. The master `DXX-exercises.md` document collects all exercises in one
    place for reference, but the individual README is what students work from.
13. **Starter code** — every exercise project must include meaningful starter code
    that gives students something to work with. The starter code should match what
    the exercise instructions describe as the starting point:
    - "Explore" exercises: a fully working app students annotate or observe
    - "Generate" exercises: a bare AppComponent with TODO comments in the HTML
      pointing students to where new components should be rendered
    - "Fix" exercises: a pre-built app with a deliberate bug already in place
    - "Convert" exercises (legacy): a fully working modern app plus skeleton files
      with TODO comments for the conversion targets
    - Students must never start from a completely empty project — there should
      always be enough context that they know where to begin

GENERATION RULES — APPLY TO ALL OUTPUT

1. ANGULAR VERSION COMPATIBILITY: All code must be compatible with Angular 17–21.
   Do not use any API deprecated after Angular 17. Always use the most modern available form.
2. NO INVENTED APIS: Only use documented Angular APIs that exist in Angular 17+.
   Do not invent method names, decorator options, or configuration properties.
   If unsure whether an API exists, use a simpler example instead — do not guess.
3. MINIMAL FOCUSED EXAMPLES: Every code example must be minimal and focused on the
   single concept being taught. Remove any logic unrelated to the lesson.
4. EXERCISE ALIGNMENT: Every concept covered in slides must be required in at least
   one exercise. No concept should be taught but left unpracticed.
5. SCRIPT TIMING: Each Part produces TWO separate speaker scripts:
   (a) **Slides script** — covers concept slides and legacy contrast slides; written for
   approximately 30–40 minutes of spoken delivery. Saved as `DXX-slides-script.md`.
   (b) **Code walkthrough script** — walks through the modern sample code first (file by
   file, explaining what each part demonstrates), then walks through the legacy sample
   code highlighting the differences and pain points. Written for approximately 15–20
   minutes of spoken delivery. Saved as `DXX-code-walkthrough-script.md`.
   Both scripts together account for 45–60 minutes of total Part time including Q&A.

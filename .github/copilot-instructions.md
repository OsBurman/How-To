MASTER CONTEXT — 5-Day Modern Angular Course

COURSE OVERVIEW
Target audience: Beginners with JavaScript and TypeScript fundamentals. They know variables,
functions, classes, arrow functions, destructuring, and basic async/await. They have never used Angular.
Angular version: Angular 17 through current v21 (2026).
Teaching philosophy: Teach modern Angular patterns first, completely, then show the legacy
equivalent at the end of each section in a comparison table. Never teach legacy first.
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

- One concept per slide
- Maximum 5 bullet points per content slide
- Code slides show one focused chunk of code at a time — never a full file on one slide
- Every section ends with a Legacy vs. Modern comparison table slide
- Slide titles are short (3–6 words) and action-oriented where possible
- No transitional filler slides
- Concepts with a "common mistake" or "important note" get their own WARNING slide labeled with ⚠️

LEGACY CONTRAST RULES

- Legacy code examples always use NgModule, constructor injection, *ngIf/*ngFor,
  HttpClientModule, RouterModule.forRoot(), class-based guards
- Legacy contrast appears ONLY at the end of each section, in a comparison table
- Never show legacy code mid-lesson without clearly labeling it as legacy
- Comparison table always has three columns: Concept | Modern | Legacy

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
5. SCRIPT TIMING: Speaker scripts must be written for approximately 45–60 minutes of
   total Part time, accounting for speaking, code walkthroughs, and Q&A. First half
   covers new concepts; second half covers worked examples and legacy contrast.

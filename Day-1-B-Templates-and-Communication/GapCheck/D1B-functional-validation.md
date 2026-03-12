# D1B — Gap Check 3: Functional Validation

**Date:** 2026-03-11
**Scope:** Day 1 Part B — Templates, Data Binding & Component Communication
**Auditor:** Automated functional build validation

---

## SECTION 1 — BUILD VALIDATION (SampleCode/)

### Config & Bootstrap

| File | Status | Notes |
|------|--------|-------|
| package.json | ✅ VALID | Angular ^19.0.0, `@angular/forms` present, start/build/test scripts |
| angular.json | ✅ VALID | Project name `d1b-templates-and-communication`, sourceRoot `src`, `application` builder, polyfills include zone.js |
| tsconfig.json | ✅ VALID | `strict: true`, `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers` |
| tsconfig.app.json | ✅ VALID | Extends base, includes src/**/*.d.ts |
| src/main.ts | ✅ VALID | `bootstrapApplication(AppComponent, appConfig)` — correct imports |
| src/app/app.config.ts | ✅ VALID | Exports `ApplicationConfig` with empty providers array |
| src/index.html | ✅ VALID | Contains `<app-root></app-root>` |
| src/styles.css | ✅ VALID | Global reset and body styles |

### Component Validation

**AppComponent** (src/app/app.component.ts / .html / .css)
- ✅ `standalone: true`, `templateUrl`, `styleUrl`
- ✅ imports array: `[ProductCardComponent, CharacterCounterComponent, SignalCounterComponent]` — all three child components listed
- ✅ Template bindings verified:
  - Interpolation: `{{ cartTotal }}`, `{{ searchTerm }}`, `{{ user?.name ?? 'Guest' }}` — all resolve to class members
  - Safe navigation: `user?.address?.city`, `user?.address?.zip`, `user?.phone?.mobile` — all correctly guard nullable paths
  - Nullish coalescing: `user?.name ?? 'Guest'`, `user?.phone?.mobile ?? 'No mobile'` — correct fallbacks
  - Template ref: `#searchInput` on `<input>`, passed as `searchInput.value` to `onSearch()` — method exists
  - Child component bindings: `[name]`, `[price]`, `(addToCart)` — all match child @Input()/@Output()
- 🟡 WARNING — product-card.component.html: `id="qty-{{ name }}"` generates invalid HTML when product names contain spaces (e.g., `id="qty-Angular in Action"`). Not a build error — cosmetic HTML validity issue at runtime.

**ProductCardComponent** (src/app/product-card/)
- ✅ `standalone: true`, `templateUrl`, `styleUrl`
- ✅ `@Input() name: string`, `@Input() price: number` — match parent's `[name]` and `[price]` bindings
- ✅ `@Output() addToCart = new EventEmitter<CartItem>()` — matches parent's `(addToCart)` binding
- ✅ Implements `OnInit`; `ngOnInit()` builds display label from inputs
- ✅ Template ref `#quantityInput` on quantity input, passed to `onAddToCart(quantityInput.value)` — method accepts string

**CharacterCounterComponent** (src/app/character-counter/)
- ✅ `standalone: true`, `templateUrl`, `styleUrl`
- ✅ imports array: `[FormsModule]` — required for `[(ngModel)]`
- ✅ `[(ngModel)]="message"` → `message` property exists
- ✅ `(input)="onInput($event)"` → method exists, accepts `Event`
- ✅ `(click)="onSubmit()"` → method exists
- ✅ `[disabled]="isOverLimit || message.length === 0"` → getter `isOverLimit` exists
- ✅ Implements `OnInit`, `OnDestroy`; `ngOnDestroy()` clears interval timer

**SignalCounterComponent** (src/app/signal-counter/)
- ✅ `standalone: true`, `templateUrl`, `styleUrl`
- ✅ Imports `signal`, `computed` from `@angular/core`
- ✅ `count = signal(0)`, `double = computed(() => this.count() * 2)`, `triple = computed(() => this.count() * 3)`
- ✅ Template reads use `()` syntax: `{{ count() }}`, `{{ double() }}`, `{{ triple() }}`
- ✅ `(click)="increment()"`, `(click)="decrement()"`, `(click)="reset()"` — all methods exist

### Section 1 Result: ✅ VALID (1 cosmetic warning)

---

## SECTION 2 — BUILD VALIDATION (SampleLegacyCode/)

### Config & Bootstrap

| File | Status | Notes |
|------|--------|-------|
| package.json | ✅ VALID | Angular ^19.0.0, `@angular/platform-browser-dynamic` present |
| angular.json | ✅ VALID | Uses `browser` builder (legacy), main entry set to src/main.ts |
| tsconfig.json | ✅ VALID | `strict: true` with strict Angular compiler options |
| tsconfig.app.json | ✅ VALID | Extends base |
| src/main.ts | ✅ VALID | `platformBrowserDynamic().bootstrapModule(AppModule)` — NO `bootstrapApplication()` |
| src/index.html | ✅ VALID | Contains `<app-root></app-root>` |

### NgModule Validation

| Check | Status |
|-------|--------|
| @NgModule decorator present | ✅ |
| declarations: [AppComponent, ProductCardComponent, CharacterCounterComponent] | ✅ All 3 components listed |
| imports: [BrowserModule, FormsModule] | ✅ Both required modules present |
| bootstrap: [AppComponent] | ✅ |

### Modern Pattern Leak Check

| Pattern | Found? |
|---------|--------|
| `standalone: true` | ✅ NOT found — clean |
| `inject()` function | ✅ NOT found — clean |
| `signal()` / `computed()` / `effect()` | ✅ NOT found — clean |
| `@if` / `@for` / `@switch` | ✅ NOT found — clean |
| Component `imports` arrays | ✅ NOT found — clean |
| `app.config.ts` | ✅ NOT found — clean |
| `bootstrapApplication()` | ✅ NOT found — clean |

### Component Validation

- ✅ All 3 components: NO `standalone: true`, NO `imports` array, use `templateUrl`/`styleUrls` (plural — correct legacy form)
- ✅ All template bindings verified against class declarations
- ✅ FormsModule provided at module level for `[(ngModel)]` in CharacterCounterComponent
- ✅ Constructor injection pattern used where applicable
- ✅ Inline comments explain what modern Angular replaced

### Section 2 Result: ✅ VALID (0 issues)

---

## SECTION 3 — BUILD VALIDATION (Each Exercise)

### Workspace Root

| File | Status |
|------|--------|
| Exercises/package.json | ✅ `"private": true`, `"workspaces"` lists all 10 exercise folders |
| Exercises/.gitignore | ✅ Covers node_modules/, dist/, .angular/, IDE folders, OS files |
| Exercises/README.md | ✅ One-time setup, serving, switching instructions, exercise table |

### Exercise-by-Exercise Results

#### Exercise 1 — Display and Bind
| Check | Result |
|-------|--------|
| Config files (package.json, angular.json, tsconfig) | ✅ VALID |
| Bootstrap (main.ts, app.config.ts) | ✅ VALID |
| Components: standalone, templateUrl, styleUrl | ✅ VALID |
| Starter compiles as-is | ✅ VALID — no bindings to nonexistent members |
| TODO comments present | ✅ Steps 2–6 marked |
| README matches starter | ✅ |
| **Solution builds when applied** | ✅ VALID |

#### Exercise 2 — Two-Way Binding
| Check | Result |
|-------|--------|
| Config files | ✅ VALID — `@angular/forms` in dependencies |
| Bootstrap | ✅ VALID |
| Components | ✅ VALID |
| Starter compiles as-is | ✅ VALID — no active bindings in starter |
| TODO comments present | ✅ Steps 3–8 marked |
| README matches starter | ✅ |
| FormsModule | ✅ In package.json deps; students add to imports array per TODO |
| **Solution builds when applied** | ✅ VALID — FormsModule imported, `[(ngModel)]` wired |

#### Exercise 3 — Template Refs
| Check | Result |
|-------|--------|
| Config files | ✅ VALID |
| Bootstrap | ✅ VALID |
| Components | ✅ VALID |
| Starter compiles as-is | ✅ VALID |
| TODO comments present | ✅ Steps 2–7 marked |
| README matches starter | ✅ |
| **Solution builds when applied** | ✅ VALID |

#### Exercise 4 — Safe Navigation
| Check | Result |
|-------|--------|
| Config files | ✅ VALID |
| Bootstrap | ✅ VALID |
| Components | ✅ VALID |
| Starter compiles as-is | ✅ VALID — pre-filled bindings use existing properties; placeholder text is static |
| TODO comments present | ✅ Steps 3–5 marked |
| README matches starter | ✅ — three user scenarios (full, partial, null) |
| **Solution builds when applied** | ✅ VALID — only HTML changes needed |

#### Exercise 5 — Parent-Child
| Check | Result |
|-------|--------|
| Config files | ✅ VALID |
| Bootstrap | ✅ VALID |
| Components | ✅ VALID — AppComponent + ColorSwatchComponent subfolder |
| Starter compiles as-is | ✅ VALID — empty child class, static template |
| TODO comments present | ✅ Steps 2–9 marked across both components |
| README matches starter | ✅ |
| **Solution builds when applied** | ✅ VALID — @Input/@Output wired, parent imports child |

#### Exercise 6 — Lifecycle Hooks
| Check | Result |
|-------|--------|
| Config files | ✅ VALID (after fix — `skipLibCheck` and `src/**/*.ts` added for consistency) |
| Bootstrap | ✅ VALID |
| Components | ✅ VALID — AppComponent + CountdownComponent subfolder |
| `@if` micro-preview | ✅ VALID — pre-wired `@if (showTimer)` block in starter HTML |
| Starter compiles as-is | ✅ VALID — empty countdown class, no bindings to missing members |
| TODO comments present | ✅ Step 7 in `@if` block, steps in countdown .ts/.html |
| README matches starter | ✅ — step 7 correctly says `@if` is already provided |
| **Solution builds when applied** | ✅ VALID — countdown component with interval + cleanup |

#### Exercise 7 — Signals Preview
| Check | Result |
|-------|--------|
| Config files | ✅ VALID (after fix — `polyfills: ["zone.js"]` added) |
| Bootstrap | ✅ VALID |
| Components | ✅ VALID |
| Starter compiles as-is | ✅ VALID — placeholder text, no active bindings |
| TODO comments present | ✅ With commented-out code samples |
| README matches starter | ✅ |
| **Solution builds when applied** | ✅ VALID — signal/computed with template reads |

#### Exercise 8 — Feedback Form
| Check | Result |
|-------|--------|
| Config files | ✅ VALID (after fix — `polyfills: ["zone.js"]` added) |
| Bootstrap | ✅ VALID |
| Components | ✅ VALID — AppComponent + FeedbackFormComponent subfolder |
| Starter compiles as-is | ✅ VALID — child tag HTML-commented out, no bindings to missing members |
| TODO comments present | ✅ Comprehensive across both components |
| README matches starter | ✅ |
| FormsModule | ✅ Listed as TODO in feedback-form imports |
| **Solution builds when applied** | ✅ VALID — all four binding types, @Input/@Output, safe navigation |

#### Exercise 9 — Notification Center
| Check | Result |
|-------|--------|
| Config files | ✅ VALID (after fix — `polyfills: ["zone.js"]` added) |
| Bootstrap | ✅ VALID |
| Components | ✅ VALID — AppComponent + NotificationCardComponent subfolder |
| Starter compiles as-is | ✅ VALID — child tags HTML-commented out, hardcoded placeholders |
| TODO comments present | ✅ Across both components |
| README matches starter | ✅ |
| **Solution builds when applied** | ✅ VALID — lifecycle hooks, nested safe navigation, @Input/@Output |

#### Exercise 10 — ⚠️ LEGACY NgModule
| Check | Result |
|-------|--------|
| Config files | ✅ VALID (after fix — `polyfills: ["zone.js"]` added) |
| Bootstrap | ✅ VALID — modern `bootstrapApplication()` in starter (students convert) |
| Modern app works as-is | ✅ VALID — complete working app with FormsModule, @Input/@Output |
| `@angular/platform-browser-dynamic` in deps | ✅ Present (needed for legacy conversion) |
| README matches starter | ✅ — Step 0 says "verify modern app works first" |
| **Solution builds when applied** | ✅ VALID — AppModule with declarations, bootstrapModule, removed standalone |

### Issues Found and Fixed During Validation

| Issue | Severity | Files | Fix Applied |
|-------|----------|-------|-------------|
| Missing `"polyfills": ["zone.js"]` in angular.json | 🔴 BUILD ERROR | Exercises 7, 8, 9, 10 | ✅ FIXED — added `"polyfills": ["zone.js"]` to all 4 files |
| Missing `skipLibCheck: true` in tsconfig.json | 🟡 WARNING | Exercise 6 | ✅ FIXED — added for consistency with exercises 7–10 |
| Missing `"src/**/*.ts"` in tsconfig.app.json include | 🟡 WARNING | Exercise 6 | ✅ FIXED — added for consistency |

### Section 3 Result: ✅ VALID after fixes (4 🔴 fixed, 2 🟡 fixed)

---

## SECTION 4 — BUILD VALIDATION (Project/)

### Config & Bootstrap

| File | Status | Notes |
|------|--------|-------|
| package.json | ✅ VALID | Angular ^19.0.0, `@angular/forms` present, `private: true`, scripts |
| angular.json | ✅ VALID | Project name `tip-calculator`, sourceRoot `src`, `application` builder |
| tsconfig.json | ✅ VALID | `strict: true` with all strict Angular options |
| tsconfig.app.json | ✅ VALID | Extends base, includes `src/**/*.ts` |
| src/main.ts | ✅ VALID | `bootstrapApplication(AppComponent, appConfig)` |
| src/app/app.config.ts | ✅ VALID | Valid `ApplicationConfig` with empty providers |
| src/index.html | ✅ VALID | Contains `<app-root></app-root>` |

### Component Validation

**AppComponent:**
- ✅ `standalone: true`, `templateUrl`, `styleUrl`
- ✅ imports: `[TipInputComponent, HistoryPanelComponent]`
- ✅ All template bindings verified:
  - `<app-tip-input [billAmount]="..." (calculate)="...">` → @Input/@Output match
  - `<app-history-panel [history]="...">` → @Input matches
  - `{{ result?.tipAmount }}`, `{{ result?.total }}` → safe navigation on nullable type
  - `[disabled]="calculationHistory.length === 0"` → property exists
  - `(click)="clearHistory()"` → method exists

**TipInputComponent:**
- ✅ `standalone: true`, imports `[FormsModule]`
- ✅ `@Input() billAmount`, `@Input() tipPercentage` — match parent bindings
- ✅ `@Output() calculate = new EventEmitter<CalculationResult>()` — matches parent event
- ✅ Implements `OnInit` (sets default tip), `OnDestroy` (clears interval)
- ✅ `[(ngModel)]="currentBill"` → FormsModule imported, property exists
- ✅ Template ref `#billInput` passed to `onQuickTip(billInput, 10)` → method exists

**HistoryPanelComponent:**
- ✅ `standalone: true`, no additional imports needed
- ✅ `@Input() history: CalculationResult[]` → matches parent binding
- ✅ Safe navigation on array access: `history[0]?.timestamp` etc.
- ✅ `(click)="formatEntry(entry)"` → method exists

### Documentation

- ✅ README.md: Project description, concept matrix, file tree, run instructions
- ✅ instructions.md: 12-step build guide with checkpoints

### Section 4 Result: ✅ VALID (0 issues)

---

## SECTION 5 — ANGULAR BEST PRACTICES

### No `any` Type
✅ **PASS** — Zero instances of `: any` found across ALL `.ts` files in SampleCode/, SampleLegacyCode/, Exercises/, Exercises-Solutions/, and Project/. Every variable, parameter, and return type is explicitly typed.

### Explicit Return Types on Service Methods
✅ **N/A** — No services exist in Day 1 Part B (appropriate for this lesson stage).

### File Naming (kebab-case)
✅ **PASS** — Every file uses kebab-case: `product-card.component.ts`, `character-counter.component.ts`, `signal-counter.component.ts`, `tip-input.component.ts`, `history-panel.component.ts`, `color-swatch.component.ts`, `countdown.component.ts`, `feedback-form.component.ts`, `notification-card.component.ts`, `message-card.component.ts`.

### Component Selectors (`app-` prefix)
✅ **PASS** — Every component selector uses the `app-` prefix: `app-root`, `app-product-card`, `app-character-counter`, `app-signal-counter`, `app-tip-input`, `app-history-panel`, `app-color-swatch`, `app-countdown`, `app-feedback-form`, `app-notification-card`, `app-message-card`.

### Lifecycle Interface Implementation
✅ **PASS** — Every component using a lifecycle hook correctly implements the corresponding interface:

| Component | Hook(s) | `implements` |
|-----------|---------|-------------|
| SampleCode/ProductCardComponent | ngOnInit | OnInit ✅ |
| SampleCode/CharacterCounterComponent | ngOnInit, ngOnDestroy | OnInit, OnDestroy ✅ |
| SampleLegacyCode/ProductCardComponent | ngOnInit | OnInit ✅ |
| SampleLegacyCode/CharacterCounterComponent | ngOnInit, ngOnDestroy | OnInit, OnDestroy ✅ |
| Project/TipInputComponent | ngOnInit, ngOnDestroy | OnInit, OnDestroy ✅ |
| All exercise solutions with hooks | — | ✅ verified |

### @Input() / @Output() Typing
✅ **PASS** — Every `@Input()` has an explicit type. Every `@Output()` uses a typed `EventEmitter<T>` (e.g., `EventEmitter<CartItem>`, `EventEmitter<CalculationResult>`, `EventEmitter<string>`, `EventEmitter<number>`). No bare untyped declarations found.

### No Deprecated APIs
✅ **PASS** — No deprecated Angular APIs found in modern code. Legacy code correctly uses legacy patterns (intentional for contrast). All modern components use `styleUrl` (singular). All legacy components use `styleUrls` (plural array — correct legacy form).

### Section 5 Result: ✅ VALID (0 issues)

---

## OVERALL SUMMARY

| Section | Result | Issues Found | Issues Fixed |
|---------|--------|-------------|-------------|
| 1 — SampleCode/ | ✅ VALID | 1 🟡 cosmetic (HTML id with spaces) | — |
| 2 — SampleLegacyCode/ | ✅ VALID | 0 | — |
| 3 — Exercises (all 10) | ✅ VALID after fixes | 4 🔴 + 2 🟡 | 6/6 fixed |
| 4 — Project/ | ✅ VALID | 0 | — |
| 5 — Best Practices | ✅ VALID | 0 | — |

### Fixes Applied During This Validation

1. **🔴 → ✅** Exercise 7 angular.json: Added `"polyfills": ["zone.js"]`
2. **🔴 → ✅** Exercise 8 angular.json: Added `"polyfills": ["zone.js"]`
3. **🔴 → ✅** Exercise 9 angular.json: Added `"polyfills": ["zone.js"]`
4. **🔴 → ✅** Exercise 10 angular.json: Added `"polyfills": ["zone.js"]`
5. **🟡 → ✅** Exercise 6 tsconfig.json: Added `skipLibCheck: true`
6. **🟡 → ✅** Exercise 6 tsconfig.app.json: Added `"src/**/*.ts"` to include array

### Remaining Advisory (Non-Blocking)

🟡 **SampleCode/product-card.component.html** — The `id="qty-{{ name }}"` and `for="qty-{{ name }}"` attributes generate invalid HTML id values when product names contain spaces. This does not affect Angular compilation or functionality — it's a cosmetic HTML validity nit. Consider using a slug helper or hyphenated names in a future polish pass.

### Verdict: ✅ ALL CODE PASSES FUNCTIONAL VALIDATION

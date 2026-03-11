# Personal Bio Card — Day 1 Part A Sample Project

A static personal bio card application built with Angular. This project demonstrates the core concepts taught in Day 1 Part A: standalone components, the `@Input()` decorator, `ViewEncapsulation`, and multi-component composition.

**No signals. No services. No routing.** This project uses ONLY what students know after Day 1 Part A.

---

## File Tree

```
Day-1-A-Angular-Foundation/Project/
├── README.md                                         ← This file
├── package.json                                      ← Angular dependencies and scripts
├── tsconfig.json                                     ← Base TypeScript configuration
├── tsconfig.app.json                                 ← App-specific TypeScript config
├── angular.json                                      ← Angular CLI workspace configuration
└── src/
    ├── index.html                                    ← Single HTML page with <app-root>
    ├── styles.css                                    ← Global styles (resets, fonts, layout)
    ├── main.ts                                       ← Entry point: bootstrapApplication()
    └── app/
        ├── app.config.ts                             ← App-level config (providers array)
        ├── app.component.ts                          ← Root component class
        ├── app.component.html                        ← Root template — renders all children
        ├── app.component.css                         ← Root layout styles
        ├── header/
        │   ├── header.component.ts                   ← @Input() title; scoped blue banner styles
        │   ├── header.component.html                 ← Displays title via interpolation
        │   └── header.component.css                  ← Scoped styles — blue gradient banner
        ├── bio-card/
        │   ├── bio-card.component.ts                 ← Four @Input() properties
        │   ├── bio-card.component.html               ← Interpolation + property binding
        │   └── bio-card.component.css                ← Scoped card styles (shadow, radius)
        ├── skill-badge/
        │   ├── skill-badge.component.ts              ← @Input() skillName; minimal reusable component
        │   ├── skill-badge.component.html            ← Single interpolation
        │   └── skill-badge.component.css             ← Scoped pill badge styles
        └── footer/
            ├── footer.component.ts                   ← No inputs; self-contained year display
            ├── footer.component.html                 ← Interpolation for currentYear
            └── footer.component.css                  ← Scoped footer styles
```

---

## What Each File Demonstrates

| File | Concept | CLI Command |
|------|---------|-------------|
| `package.json` | Angular project dependencies and npm scripts | `ng new personal-bio-card` |
| `tsconfig.json` | TypeScript strict mode configuration | `ng new personal-bio-card` |
| `tsconfig.app.json` | App build includes (extends base tsconfig) | `ng new personal-bio-card` |
| `angular.json` | Angular CLI workspace and build configuration | `ng new personal-bio-card` |
| `src/index.html` | Single-page HTML shell with `<app-root>` | `ng new personal-bio-card` |
| `src/styles.css` | Global styles (not scoped to any component) | `ng new personal-bio-card` |
| `src/main.ts` | `bootstrapApplication()` — modern app entry point | `ng new personal-bio-card` |
| `src/app/app.config.ts` | `ApplicationConfig` with empty providers array | `ng new personal-bio-card` |
| `src/app/app.component.ts` | Root component with `imports` array listing all children | `ng new personal-bio-card` |
| `src/app/app.component.html` | Renders 4 child components; property binding with `[input]="value"` | `ng new personal-bio-card` |
| `src/app/app.component.css` | Layout styles scoped to root component | `ng new personal-bio-card` |
| `src/app/header/header.component.ts` | `@Input() title`; `standalone: true`; `ViewEncapsulation.Emulated` | `ng g c header` |
| `src/app/header/header.component.html` | Interpolation `{{ title }}` | `ng g c header` |
| `src/app/header/header.component.css` | Scoped blue banner — does NOT leak to bio card | `ng g c header` |
| `src/app/bio-card/bio-card.component.ts` | Four `@Input()` properties: name, role, bio, avatarUrl | `ng g c bio-card` |
| `src/app/bio-card/bio-card.component.html` | Interpolation + `[src]` property binding | `ng g c bio-card` |
| `src/app/bio-card/bio-card.component.css` | Scoped card styles — does NOT leak to header | `ng g c bio-card` |
| `src/app/skill-badge/skill-badge.component.ts` | Single `@Input() skillName`; minimal reusable component | `ng g c skill-badge` |
| `src/app/skill-badge/skill-badge.component.html` | Single interpolation `{{ skillName }}` | `ng g c skill-badge` |
| `src/app/skill-badge/skill-badge.component.css` | Scoped pill badge styles with hover effect | `ng g c skill-badge` |
| `src/app/footer/footer.component.ts` | No inputs; self-contained component generating its own data | `ng g c footer` |
| `src/app/footer/footer.component.html` | Interpolation `{{ currentYear }}` | `ng g c footer` |
| `src/app/footer/footer.component.css` | Scoped footer border and text styles | `ng g c footer` |

---

## Key Concepts Demonstrated

### 1. `bootstrapApplication()` and `app.config.ts`
The app starts in `main.ts` with `bootstrapApplication(AppComponent, appConfig)`. The config's `providers` array is empty here — it gets filled with `provideRouter()` on Day 3 and `provideHttpClient()` on Day 4.

### 2. Standalone Components with `imports` Array
Every component uses `standalone: true`. AppComponent's `imports` array lists all four child components. Remove one and Angular throws **"'app-xyz' is not a known element"**.

### 3. Multiple Components in AppComponent
The root template renders `<app-header>`, `<app-bio-card>`, five `<app-skill-badge>` instances, and `<app-footer>` — showing how components compose together.

### 4. `@Input()` for Parent-to-Child Data Flow
- **HeaderComponent**: 1 input (`title`)
- **BioCardComponent**: 4 inputs (`name`, `role`, `bio`, `avatarUrl`)
- **SkillBadgeComponent**: 1 input (`skillName`)
- **FooterComponent**: 0 inputs (self-contained)

Data flows one direction: parent → child via property binding `[inputName]="value"`.

### 5. ViewEncapsulation (Scoped Styles)
HeaderComponent has a blue gradient banner with `border-radius: 12px`. BioCardComponent has a white card with `border-radius: 16px`. Both use `border-radius` but with different values — and they never conflict because Angular's `ViewEncapsulation.Emulated` scopes each component's CSS to its own template.

**Try this:** Open Chrome DevTools, inspect the `<header>` element and the `<article>` element. Each has a different `_ngcontent-xxx` attribute — that's Angular's scoping mechanism in action.

---

## How to Run

```bash
cd Day-1-A-Angular-Foundation/Project
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

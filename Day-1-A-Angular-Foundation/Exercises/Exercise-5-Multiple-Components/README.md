# Exercise 5: Multiple Components Working Together

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Creating standalone components with ng generate, Rendering multiple components in AppComponent, The imports array, @Input() for passing data into a component, bootstrapApplication and app.config.ts

## What You're Building

A page with a `NavBarComponent` (displays a site name via @Input), a `HeroSectionComponent` (displays a title and subtitle via @Input), and a `FeatureListComponent` (static list of features). All three render inside `AppComponent`, demonstrating a multi-component layout.

## Instructions

1. A bare `AppComponent` is provided — you'll generate all child components from scratch.
2. Generate three components:
   ```
   npx ng g c nav-bar
   npx ng g c hero-section
   npx ng g c feature-list
   ```
3. **NavBarComponent:**
   - In `nav-bar.component.ts`: add `@Input() siteName: string = 'My Site';`
   - In `nav-bar.component.html`:
     ```html
     <nav class="navbar">
       <span class="site-name">{{ siteName }}</span>
       <span class="nav-links">Home | Features | Contact</span>
     </nav>
     ```
   - In `nav-bar.component.css`: Style it as a dark bar with white text (flexbox, `justify-content: space-between`, dark background, padding `1rem 2rem`).

4. **HeroSectionComponent:**
   - In `hero-section.component.ts`: add `@Input() title: string = '';` and `@Input() subtitle: string = '';`
   - In `hero-section.component.html`:
     ```html
     <section class="hero">
       <h1>{{ title }}</h1>
       <p>{{ subtitle }}</p>
     </section>
     ```
   - In `hero-section.component.css`: Center the text, large padding (`4rem 2rem`), light gray background.

5. **FeatureListComponent:**
   - No `@Input()` needed — this component has its own static data.
   - In `feature-list.component.ts`: add a property `features: string[] = ['Components', 'Data Binding', 'CLI Tools', 'TypeScript'];`
   - In `feature-list.component.html`:
     ```html
     <section class="features">
       <h2>Key Features</h2>
       <ul>
         <li>Components</li>
         <li>Data Binding</li>
         <li>CLI Tools</li>
         <li>TypeScript</li>
       </ul>
     </section>
     ```
   - In `feature-list.component.css`: Style the list with `list-style: none`, padding, spacing.

6. Open `src/app/app.component.ts`. Import all three components and add them to the `imports` array.
7. Open `src/app/app.component.html`:
   ```html
   <app-nav-bar siteName="Angular Academy"></app-nav-bar>
   <app-hero-section title="Learn Angular" subtitle="Build modern web apps with confidence."></app-hero-section>
   <app-feature-list></app-feature-list>
   ```
8. Serve (`npx ng serve`) and confirm all three sections appear: navbar at top, hero in the middle, feature list below.

## Acceptance Criteria

- [ ] Three separate component folders exist under `src/app/`
- [ ] `NavBarComponent` receives its site name via `@Input()`
- [ ] `HeroSectionComponent` receives title and subtitle via `@Input()`
- [ ] `FeatureListComponent` displays a list without any `@Input()`
- [ ] `AppComponent` imports all three and renders them in one page
- [ ] The page displays a navbar, hero, and feature list with no console errors

## Hints

**Hint 1 — Import order:** For each component you generate, you need to do three things: (1) write the component code, (2) add the `import` statement at the top of `app.component.ts`, and (3) add the class name to `AppComponent`'s `imports` array.

**Hint 2 — Selectors:** `ng g c nav-bar` creates selector `app-nav-bar`. `ng g c hero-section` creates `app-hero-section`. Angular uses kebab-case for selectors and adds the `app-` prefix automatically.

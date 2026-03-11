# Day 1 Part A — Exercises

## Workspace Setup

All exercises in this folder share a single npm workspace. Before starting any exercise:

```
cd D1A/Exercises
npm install
```

This installs all Angular dependencies **once** into a shared `node_modules` at the root. You never need to run `npm install` inside individual exercise folders.

To serve an exercise:

```
cd Exercise-1-Scaffold-and-Explore
npx ng serve
```

Stop the dev server with `Ctrl+C` before switching to the next exercise.

---

## Exercise 1: Scaffold and Explore

**Difficulty:** BEGINNER
**Concepts practiced:** Generating a project with the CLI, Navigating the file structure, bootstrapApplication and app.config.ts

### What You're Building

Nothing visual yet — this exercise is about understanding the file structure of an Angular project. You'll open an existing scaffolded project (provided in the `Exercise-1-Scaffold-and-Explore/` folder), identify each file's purpose, and add comments proving you found the right things.

### Instructions

1. Open the `Exercise-1-Scaffold-and-Explore/` folder in your editor. This is a pre-scaffolded Angular project — the same structure `ng new` generates.
2. Open `src/main.ts`. Find the `bootstrapApplication()` call. Add a comment above it: `// This is the entry point — it starts the app with AppComponent`.
3. Open `src/app/app.config.ts`. Find the `providers` array. Add a comment inside it: `// Empty for now — providers go here on Days 3–4`.
4. Open `src/app/app.component.ts`. Find the `selector` property. Add a comment next to it: `// This matches <app-root> in index.html`.
5. Open `src/index.html`. Find the `<app-root>` tag. Add a comment above it: `<!-- Angular renders AppComponent here -->`.
6. Serve the app: `cd Exercise-1-Scaffold-and-Explore && npx ng serve`. Open `http://localhost:4200` and confirm you see the default page.

### Acceptance Criteria

- [ ] `src/main.ts` has your comment above `bootstrapApplication()`
- [ ] `src/app/app.config.ts` has your comment inside the `providers` array
- [ ] `src/app/app.component.ts` has your comment next to the `selector`
- [ ] `src/index.html` has your comment above `<app-root>`
- [ ] The app loads at `http://localhost:4200` with no console errors

### Hints

**Hint 1 — Where is main.ts?:** Look in `src/main.ts`, not `src/app/main.ts`. It sits at the `src/` root, one level above the `app/` folder.

**Hint 2 — bootstrapApplication arguments:** The function takes two arguments — the root component class and the config object. Both are imported at the top of the file.

---

## Exercise 2: Your First Component

**Difficulty:** BEGINNER
**Concepts practiced:** Creating standalone components with ng generate, Rendering multiple components in AppComponent, The imports array

### What You're Building

A `GreetingComponent` that displays a welcome message. You'll generate the component with the CLI, write a simple template, and render it inside `AppComponent`.

### Instructions

1. Open a terminal in the `Exercise-2-Your-First-Component/` folder.
2. Generate a new component: `npx ng generate component greeting` (shorthand: `npx ng g c greeting`).
3. Open `src/app/greeting/greeting.component.html`. Replace the generated content with:
   ```html
   <section class="greeting-box">
     <h2>Welcome to Angular!</h2>
     <p>This is my very first component.</p>
   </section>
   ```
4. Open `src/app/greeting/greeting.component.css`. Add a style to make it visible:
   ```css
   .greeting-box {
     padding: 1.5rem;
     background-color: #e8f5e9;
     border-radius: 8px;
     margin: 1rem;
   }
   ```
5. Open `src/app/app.component.ts`. Import `GreetingComponent` at the top and add it to the `imports` array.
6. Open `src/app/app.component.html`. Add `<app-greeting></app-greeting>` inside the template.
7. Serve the app and confirm you see the green greeting box on the page.

### Acceptance Criteria

- [ ] The `src/app/greeting/` folder exists with `.ts`, `.html`, `.css`, and `.spec.ts` files
- [ ] `GreetingComponent` has `standalone: true` in its decorator
- [ ] `AppComponent`'s `imports` array includes `GreetingComponent`
- [ ] The browser shows the green box with "Welcome to Angular!" text

### Hints

**Hint 1 — Selector name:** `ng generate component greeting` creates a component with selector `app-greeting`. Use `<app-greeting></app-greeting>` in the parent template.

**Hint 2 — Two-step import:** You need both the `import { GreetingComponent } from './greeting/greeting.component';` statement at the top AND `GreetingComponent` in the `imports: [...]` array. Missing either one causes an error.

---

## Exercise 3: Trigger the Error, Fix the Error

**Difficulty:** BEGINNER
**Concepts practiced:** Triggering and fixing the "not a known element" error, The imports array — adding and removing dependencies

### What You're Building

You'll deliberately break an app to see the exact "not a known element" error in the browser console, then fix it. This trains you to recognize and resolve the #1 beginner mistake in Angular.

### Instructions

1. Open the `Exercise-3-Fix-the-Error/` folder. This project already has a `BannerComponent` pre-built in `src/app/banner/`.
2. Open `src/app/app.component.html`. You'll see `<app-banner></app-banner>` is already in the template.
3. Open `src/app/app.component.ts`. Notice that `BannerComponent` is **not** in the `imports` array — it's deliberately missing.
4. Serve the app: `cd Exercise-3-Fix-the-Error && npx ng serve`.
5. Open the browser and check the **browser console** (F12 → Console tab). You should see the error:
   `NG8001: 'app-banner' is not a known element`.
6. Read the error message carefully. Note what it says about `@Component.imports`.
7. Now fix it: add the `import` statement at the top of `app.component.ts` and add `BannerComponent` to the `imports` array.
8. Save. The browser auto-reloads. The error is gone and the banner appears.
9. **Bonus break:** Now open the `imports` array again and remove `BannerComponent` (but leave the `import` statement at the top). Save. Does the error return? (Yes — the `imports` array is what matters.)

### Acceptance Criteria

- [ ] You saw the `NG8001: 'app-banner' is not a known element` error in the console
- [ ] After your fix, the banner renders with no console errors
- [ ] You understand that the `imports` array (not just the `import` statement) is required

### Hints

**Hint 1 — Where to look for the error:** Open Chrome DevTools with F12 and click the Console tab. Angular errors show up there, not in the terminal where `ng serve` runs.

**Hint 2 — The import path:** The banner component is at `./banner/banner.component`, so the import statement is: `import { BannerComponent } from './banner/banner.component';`

---

## Exercise 4: Passing Data with @Input()

**Difficulty:** INTERMEDIATE
**Concepts practiced:** @Input() for passing data into a component, Rendering multiple components in AppComponent, The imports array

### What You're Building

An `InfoCardComponent` that accepts a `heading` and a `body` via `@Input()`. You'll render three cards in `AppComponent`, each with different content — proving the same component can display different data depending on what the parent passes in.

### Instructions

1. Open the `Exercise-4-Passing-Data-with-Input/` folder. A starter `AppComponent` is provided.
2. Generate a new component: `npx ng generate component info-card`.
3. Open `src/app/info-card/info-card.component.ts`. Add two `@Input()` properties:
   ```typescript
   @Input() heading: string = '';
   @Input() body: string = '';
   ```
   You'll need to import `Input` from `@angular/core`.
4. Open `src/app/info-card/info-card.component.html`. Display both inputs:
   ```html
   <div class="card">
     <h3>{{ heading }}</h3>
     <p>{{ body }}</p>
   </div>
   ```
5. Open `src/app/info-card/info-card.component.css`. Style the card:
   ```css
   .card {
     padding: 1rem;
     margin: 0.5rem;
     border: 1px solid #ccc;
     border-radius: 8px;
     background-color: #fff;
   }
   .card h3 { color: #1a1a2e; margin: 0 0 0.5rem; }
   .card p { color: #555; margin: 0; }
   ```
6. Open `src/app/app.component.ts`. Import `InfoCardComponent` and add it to `imports`.
7. Open `src/app/app.component.html`. Render three cards with different data:
   ```html
   <h1>My Dashboard</h1>
   <app-info-card heading="Angular" body="A component-based framework by Google."></app-info-card>
   <app-info-card heading="TypeScript" body="A typed superset of JavaScript."></app-info-card>
   <app-info-card heading="Node.js" body="A JavaScript runtime for servers."></app-info-card>
   ```
8. Serve and confirm you see three distinct cards with different content.

### Acceptance Criteria

- [ ] `InfoCardComponent` has `@Input() heading` and `@Input() body` properties
- [ ] `AppComponent` renders three `<app-info-card>` elements with different text
- [ ] All three cards appear in the browser with correct headings and body text
- [ ] No console errors

### Hints

**Hint 1 — Importing Input:** You need `import { Component, Input } from '@angular/core';` — add `Input` to the existing import.

**Hint 2 — Static vs dynamic binding:** When passing a plain string (not a component property), you can use `heading="Angular"` without square brackets. Square brackets like `[heading]="someVariable"` evaluate an expression from the component class.

---

## Exercise 5: Multiple Components Working Together

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Creating standalone components with ng generate, Rendering multiple components in AppComponent, The imports array, @Input() for passing data into a component, bootstrapApplication and app.config.ts

### What You're Building

A page with a `NavBarComponent` (displays a site name via @Input), a `HeroSectionComponent` (displays a title and subtitle via @Input), and a `FeatureListComponent` (static list of features). All three render inside `AppComponent`, demonstrating a multi-component layout.

### Instructions

1. Open the `Exercise-5-Multiple-Components/` folder.
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
8. Serve and confirm all three sections appear: navbar at top, hero in the middle, feature list below.

### Acceptance Criteria

- [ ] Three separate component folders exist under `src/app/`
- [ ] `NavBarComponent` receives its site name via `@Input()`
- [ ] `HeroSectionComponent` receives title and subtitle via `@Input()`
- [ ] `FeatureListComponent` displays a list without any `@Input()`
- [ ] `AppComponent` imports all three and renders them in one page
- [ ] The page displays a navbar, hero, and feature list with no console errors

### Hints

**Hint 1 — Import order:** For each component you generate, you need to do three things: (1) write the component code, (2) add the `import` statement at the top of `app.component.ts`, and (3) add the class name to `AppComponent`'s `imports` array.

**Hint 2 — Selectors:** `ng g c nav-bar` creates selector `app-nav-bar`. `ng g c hero-section` creates `app-hero-section`. Angular uses kebab-case for selectors and adds the `app-` prefix automatically.

---

## Exercise 6: Scoped Styles in Action

**Difficulty:** INTERMEDIATE
**Concepts practiced:** ViewEncapsulation and scoped styles, Creating standalone components with ng generate, The imports array

### What You're Building

Two sibling components — `AlertBoxComponent` and `InfoBoxComponent` — that both style an `<h3>` element with completely different colors. You'll prove that styles in one component do not leak into the other thanks to Angular's ViewEncapsulation.

### Instructions

1. Open the `Exercise-6-Scoped-Styles/` folder.
2. Generate two components:
   ```
   npx ng g c alert-box
   npx ng g c info-box
   ```
3. **AlertBoxComponent:**
   - `alert-box.component.html`:
     ```html
     <div class="box">
       <h3>Alert!</h3>
       <p>Something important happened.</p>
     </div>
     ```
   - `alert-box.component.css`:
     ```css
     .box { padding: 1rem; margin: 1rem; border: 2px solid #d32f2f; border-radius: 8px; background-color: #ffebee; }
     h3 { color: #d32f2f; margin: 0 0 0.5rem; }
     p { color: #b71c1c; margin: 0; }
     ```

4. **InfoBoxComponent:**
   - `info-box.component.html`:
     ```html
     <div class="box">
       <h3>Info</h3>
       <p>Here is some helpful information.</p>
     </div>
     ```
   - `info-box.component.css`:
     ```css
     .box { padding: 1rem; margin: 1rem; border: 2px solid #1565c0; border-radius: 8px; background-color: #e3f2fd; }
     h3 { color: #1565c0; margin: 0 0 0.5rem; }
     p { color: #0d47a1; margin: 0; }
     ```

5. Import both into `AppComponent`'s `imports` array.
6. In `app.component.html`, render them side by side:
   ```html
   <h1>Style Encapsulation Demo</h1>
   <app-alert-box></app-alert-box>
   <app-info-box></app-info-box>
   ```
7. Serve the app. Confirm the alert box is red and the info box is blue — even though both target `h3` and `.box`.
8. **Investigate:** Open Chrome DevTools (F12), click on the `<h3>` inside `AlertBoxComponent`, and look at the element attributes. You should see something like `_ngcontent-abc-123` — that's Angular's scoping attribute.

### Acceptance Criteria

- [ ] `AlertBoxComponent`'s `<h3>` is red (#d32f2f)
- [ ] `InfoBoxComponent`'s `<h3>` is blue (#1565c0)
- [ ] Both components use the same class name `.box` and element selector `h3` without conflict
- [ ] You can see Angular's `_ngcontent-*` attribute in the DevTools Elements panel

### Hints

**Hint 1 — Why no conflict?:** Both components style `h3 { color: ... }`, but Angular rewrites this to `h3[_ngcontent-xyz] { color: ... }` — each component gets its own unique attribute. The styles simply cannot match elements in other components.

**Hint 2 — ViewEncapsulation.Emulated is the default:** You don't need to set `encapsulation` explicitly. Angular uses Emulated mode automatically. The scoping "just works."

---

## Exercise 7: ViewEncapsulation — None vs Emulated

**Difficulty:** INTERMEDIATE
**Concepts practiced:** ViewEncapsulation and scoped styles, The imports array, Creating standalone components with ng generate

### What You're Building

You'll take the `AlertBoxComponent` from Exercise 6's pattern and create a version with `ViewEncapsulation.None` to see what happens when styles leak globally. Then you'll switch it back to Emulated and observe the difference.

### Instructions

1. Open the `Exercise-7-ViewEncapsulation/` folder. It already has a `StyledBoxComponent` and an `UnstyledBoxComponent`.
2. Open `src/app/styled-box/styled-box.component.ts`. Notice it has `encapsulation: ViewEncapsulation.None`.
3. Open `src/app/styled-box/styled-box.component.css`. It sets `h3 { color: #ff6f00; font-style: italic; }`.
4. Open `src/app/unstyled-box/unstyled-box.component.ts`. It has **no** `encapsulation` property (uses the default Emulated).
5. Open `src/app/unstyled-box/unstyled-box.component.html`. It also has an `<h3>` tag.
6. Both are already imported and rendered in `AppComponent`. Serve the app.
7. **Observe:** The `<h3>` in `UnstyledBoxComponent` is also orange and italic — even though `UnstyledBoxComponent` has no CSS targeting `h3`. The styles leaked from `StyledBoxComponent` because `ViewEncapsulation.None` makes styles global.
8. Now fix it: open `styled-box.component.ts` and change `encapsulation: ViewEncapsulation.None` to `encapsulation: ViewEncapsulation.Emulated` (or simply remove the `encapsulation` line entirely).
9. Save. The `UnstyledBoxComponent`'s `<h3>` returns to its default browser styling. The orange italic is now scoped to `StyledBoxComponent` only.

### Acceptance Criteria

- [ ] With `ViewEncapsulation.None`, both `<h3>` elements are orange and italic
- [ ] After changing to `ViewEncapsulation.Emulated`, only `StyledBoxComponent`'s `<h3>` is styled
- [ ] `UnstyledBoxComponent`'s `<h3>` returns to its default appearance
- [ ] You can explain why `None` caused the style leak

### Hints

**Hint 1 — Importing ViewEncapsulation:** Make sure you have `import { Component, ViewEncapsulation } from '@angular/core';` at the top of the file.

**Hint 2 — Removing the property:** You can either change `ViewEncapsulation.None` to `ViewEncapsulation.Emulated`, or remove the `encapsulation` line entirely — `Emulated` is the default.

---

## Exercise 8: Build a Team Roster

**Difficulty:** CHALLENGE
**Concepts practiced:** Creating standalone components with ng generate, @Input() for passing data into a component, ViewEncapsulation and scoped styles, The imports array, Rendering multiple components in AppComponent, Triggering and fixing the "not a known element" error

### What You're Building

A team roster page with a `RosterHeaderComponent` (accepts team name via @Input), multiple `MemberCardComponents` (each accepts name, role, and department via @Input), and a `RosterFooterComponent` (displays total member count via @Input). Each component has distinct styles that do not interfere with each other.

### Instructions

1. Open the `Exercise-8-Team-Roster/` folder.
2. Generate three components:
   ```
   npx ng g c roster-header
   npx ng g c member-card
   npx ng g c roster-footer
   ```
3. **RosterHeaderComponent:**
   - Add `@Input() teamName: string = 'Our Team';`
   - Template: display the team name in an `<h1>` inside a styled header bar
   - CSS: dark background (`#263238`), white text, centered, `padding: 1.5rem`

4. **MemberCardComponent:**
   - Add three inputs: `@Input() name: string = '';`, `@Input() role: string = '';`, `@Input() department: string = '';`
   - Template:
     ```html
     <div class="member-card">
       <h3 class="member-name">{{ name }}</h3>
       <p class="member-role">{{ role }}</p>
       <span class="member-dept">{{ department }}</span>
     </div>
     ```
   - CSS: white card with shadow (`box-shadow: 0 2px 4px rgba(0,0,0,0.1)`), padding, rounded corners. `.member-name` in dark teal (`#00695c`), `.member-role` in gray, `.member-dept` as a small badge with a colored background.

5. **RosterFooterComponent:**
   - Add `@Input() totalMembers: number = 0;`
   - Template: `<footer class="roster-footer"><p>Total team members: {{ totalMembers }}</p></footer>`
   - CSS: light gray background, centered text, small font.

6. Import all three components into `AppComponent` and add to the `imports` array.
7. In `app.component.html`, compose the page:
   ```html
   <app-roster-header teamName="Engineering Team"></app-roster-header>
   <main class="roster-grid">
     <app-member-card name="Alice Chen" role="Lead Developer" department="Frontend"></app-member-card>
     <app-member-card name="Bob Martinez" role="Senior Engineer" department="Backend"></app-member-card>
     <app-member-card name="Carol Kim" role="UX Designer" department="Design"></app-member-card>
     <app-member-card name="David Okafor" role="DevOps Engineer" department="Infrastructure"></app-member-card>
   </main>
   <app-roster-footer [totalMembers]="4"></app-roster-footer>
   ```
8. In `app.component.css`, style `.roster-grid` with flexbox or CSS grid to arrange cards in a row.
9. **Deliberate break:** Before serving, comment out `MemberCardComponent` from the `imports` array. Serve the app and observe the "not a known element" error for `<app-member-card>`. Then uncomment it to fix.
10. Serve the final version and confirm everything renders correctly.

### Acceptance Criteria

- [ ] `RosterHeaderComponent` displays the team name received via `@Input()`
- [ ] Four `MemberCardComponent` instances display different names, roles, and departments
- [ ] `RosterFooterComponent` displays the total count using `@Input()` with property binding (`[totalMembers]="4"`)
- [ ] Header styles (white text on dark) do not affect card text — style encapsulation works
- [ ] Card styles do not affect footer text — each component is visually independent
- [ ] You triggered and fixed the "not a known element" error at least once

### Hints

**Hint 1 — Property binding for numbers:** Use `[totalMembers]="4"` (with square brackets) to pass the number 4. Without brackets, `totalMembers="4"` passes the string "4" instead.

**Hint 2 — Grid layout:** For the roster grid, try `display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem;` in `app.component.css`.

**Hint 3 — Checking encapsulation:** Both the header and member card use `<h3>` or heading tags with different colors. If encapsulation is working, they will each have their own colors. If you see them blending, check that neither component has `ViewEncapsulation.None`.

---

## Exercise 9: Legacy NgModule Conversion

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Legacy NgModule pattern, bootstrapModule vs bootstrapApplication, declarations array, feature modules with exports, legacy component registration

### What You're Building

You start with a working modern standalone Angular app (a banner and three info cards). Your job is to convert it to the legacy NgModule pattern: replace `bootstrapApplication()` with `bootstrapModule()`, create an `AppModule`, remove `standalone: true` from all components, and wrap `BannerComponent` and `InfoCardComponent` in their own feature modules. The app should look and work exactly the same — only the wiring changes.

**⚠️ This exercise teaches the LEGACY pattern for recognition only. You should always write modern standalone code in real projects.**

### Instructions

1. Open the `Exercise-9-Legacy-NgModule/` folder. Serve it first (`npx ng serve`) and confirm the app works — you should see a dark blue banner and three white info cards. Stop the server.

2. **Convert `main.ts` to the legacy bootstrap:**
   - Replace the entire contents of `src/main.ts` with:
     ```typescript
     import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
     import { AppModule } from './app/app.module';

     platformBrowserDynamic()
       .bootstrapModule(AppModule)
       .catch((err) => console.error(err));
     ```
   - Delete `src/app/app.config.ts` — it is no longer needed.

3. **Convert `BannerComponent` to a legacy component:**
   - Open `src/app/banner/banner.component.ts`
   - Remove `standalone: true` and `imports: []` from the `@Component` decorator
   - Change `styleUrl` to `styleUrls` (plural) and wrap the value in an array: `styleUrls: ['./banner.component.css']`
   - The rest of the component stays the same

4. **Complete `BannerModule` — a feature module for the banner:**
   - Open the provided skeleton file `src/app/banner/banner.module.ts`
   - Add the missing imports at the top: `NgModule` from `@angular/core`, `CommonModule` from `@angular/common`, and `BannerComponent` from `./banner.component`
   - Fill in the `@NgModule` decorator's TODO sections:
     - `declarations: [BannerComponent]` — registers the component in this module
     - `imports: [CommonModule]` — provides standard Angular directives
     - `exports: [BannerComponent]` — makes `<app-banner>` available to modules that import `BannerModule`

5. **Convert `InfoCardComponent` to a legacy component:**
   - Open `src/app/info-card/info-card.component.ts`
   - Remove `standalone: true` and `imports: []`
   - Change `styleUrl` to `styleUrls: ['./info-card.component.css']`

6. **Complete `InfoCardModule` — a feature module for the info card:**
   - Open the provided skeleton file `src/app/info-card/info-card.module.ts`
   - Same pattern as `BannerModule`: add the imports at the top, then fill in the TODO sections to declare `InfoCardComponent`, import `CommonModule`, and export `InfoCardComponent`

7. **Convert `AppComponent` to a legacy component:**
   - Open `src/app/app.component.ts`
   - Remove `standalone: true` and `imports: [BannerComponent, InfoCardComponent]`
   - Remove the import statements for `BannerComponent` and `InfoCardComponent` at the top of the file
   - Change `styleUrl` to `styleUrls: ['./app.component.css']`

8. **Complete `AppModule` — the root NgModule:**
   - Open the provided skeleton file `src/app/app.module.ts`
   - Add the missing imports at the top: `NgModule` from `@angular/core`, `BrowserModule` from `@angular/platform-browser`, `AppComponent` from `./app.component`, `BannerModule` from `./banner/banner.module`, and `InfoCardModule` from `./info-card/info-card.module`
   - Fill in the `@NgModule` decorator's TODO sections:
     - `declarations: [AppComponent]` — the root component belongs to the root module
     - `imports: [BrowserModule, BannerModule, InfoCardModule]` — brings in browser support and both feature modules
     - `bootstrap: [AppComponent]` — tells Angular which component to render first

9. Serve the app: `npx ng serve`. Confirm it looks exactly the same as before — dark blue banner, three info cards.

10. **Deliberate break (optional):** Remove `BannerModule` from AppModule's `imports` array. The app will show the "not a known element" error for `<app-banner>`. Add it back to fix. Notice how this error is harder to debug in the legacy pattern — you have to trace module imports instead of just checking the component's own imports array.

### Acceptance Criteria

- [ ] `main.ts` uses `platformBrowserDynamic().bootstrapModule(AppModule)` instead of `bootstrapApplication()`
- [ ] `app.config.ts` is deleted
- [ ] `AppModule` exists with `declarations: [AppComponent]`, `imports: [BrowserModule, BannerModule, InfoCardModule]`, and `bootstrap: [AppComponent]`
- [ ] `BannerModule` exists with `declarations: [BannerComponent]` and `exports: [BannerComponent]`
- [ ] `InfoCardModule` exists with `declarations: [InfoCardComponent]` and `exports: [InfoCardComponent]`
- [ ] No component has `standalone: true` — all use the legacy pattern
- [ ] All components use `styleUrls` (plural array) instead of `styleUrl` (singular)
- [ ] The app looks and works exactly the same as the modern version
- [ ] You can explain why the legacy pattern requires more files and more wiring

### Hints

**Hint 1 — platformBrowserDynamic:** Make sure you import from `'@angular/platform-browser-dynamic'` (note the `-dynamic` suffix). This is different from the modern `'@angular/platform-browser'`.

**Hint 2 — exports array:** If you declare a component in a feature module but forget to add it to the `exports` array, other modules that import your feature module still won't be able to use that component. The `exports` array is what makes components publicly available.

**Hint 3 — styleUrls vs styleUrl:** Legacy Angular used `styleUrls: ['./file.css']` (an array of strings). Modern Angular uses `styleUrl: './file.css'` (a single string). Both work in Angular 17+, but the legacy pattern always used the plural form.

**Hint 4 — Only one declarations home:** A component can only be declared in ONE module. If you accidentally declare `BannerComponent` in both `BannerModule` and `AppModule`, you'll get a "declared in 2 modules" error. Declare it in `BannerModule` and import the module into `AppModule`.

---

> **Solutions:** Each exercise has a matching solution folder in `D1A/Exercise-Solutions/`. For example, Exercise 1's solution is in `Exercise-Solutions/Exercise-1-Solution/`. Open the files inside `Exercise-N-Solution/src/` to compare with your work.

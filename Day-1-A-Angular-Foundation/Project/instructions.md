# Build It Yourself: Personal Bio Card

**Day 1 Part A — Angular Foundation**

This document gives you step-by-step instructions to build the Personal Bio Card project from scratch. Try building it without looking at the sample code first — then compare your version to see how yours stacks up.

---

## What You're Building

A static personal bio card application with four components:
- A **header banner** displaying the page title
- A **bio card** showing an avatar, name, role, and short bio
- A set of **skill badges** rendered as styled pills
- A **footer** with the current year

No routing. No services. No HTTP. No signals. Just standalone components, `@Input()`, and scoped styles.

---

## Prerequisites

Before you start, make sure you have:
- Node.js (v18 or later) installed
- Angular CLI installed globally: `npm install -g @angular/cli`

---

## Step 1: Generate a New Angular Project

```bash
ng new personal-bio-card
```

When prompted:
- **Stylesheet format:** CSS
- **SSR (Server-Side Rendering):** No

Once complete:
```bash
cd personal-bio-card
ng serve
```

Open [http://localhost:4200](http://localhost:4200) — you should see the default Angular welcome page.

---

## Step 2: Clean Up the Default Template

Open `src/app/app.component.html` and **delete everything** inside it. Replace it with a single container `<div>`:

```html
<div class="app-container">
  <!-- Your components will go here -->
</div>
```

Also open `src/app/app.component.css` and add a centered layout:

```css
.app-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
```

---

## Step 3: Generate the Header Component

```bash
ng generate component header
```

This creates four files inside `src/app/header/`. Open each one:

### header.component.ts
- Add an `@Input()` property called `title` with a default value of `'My App'`
- Make sure the component has `standalone: true`

### header.component.html
- Create a `<header>` element with a class like `header-banner`
- Use interpolation `{{ title }}` to display the input value inside an `<h1>`

### header.component.css
- Style the banner with a blue gradient background (`linear-gradient(135deg, #1a73e8, #0d47a1)`)
- White text, centered, with `border-radius: 12px` and padding

---

## Step 4: Generate the Bio Card Component

```bash
ng generate component bio-card
```

### bio-card.component.ts
- Add four `@Input()` properties: `name`, `role`, `bio`, and `avatarUrl` — all strings with empty defaults

### bio-card.component.html
- Create an `<article>` with a card class
- Add an `<img>` tag using **property binding** for the source: `[src]="avatarUrl"` and `[alt]="name + ' avatar'"`
- Display `name`, `role`, and `bio` using interpolation `{{ }}`

### bio-card.component.css
- Style the card with a white background, rounded corners (`border-radius: 16px`), and a subtle box shadow
- Make the avatar circular: `border-radius: 50%`, fixed width/height, `object-fit: cover`

---

## Step 5: Generate the Skill Badge Component

```bash
ng generate component skill-badge
```

### skill-badge.component.ts
- Add one `@Input()` property: `skillName` (string, empty default)

### skill-badge.component.html
- Create a single `<span>` with a badge class
- Display `{{ skillName }}` inside it

### skill-badge.component.css
- Style as a pill badge: `border-radius: 20px`, light blue background (`#e8f0fe`), blue text (`#1a73e8`)
- Add a hover effect that slightly darkens the background and shifts the badge up (`translateY(-1px)`)

---

## Step 6: Generate the Footer Component

```bash
ng generate component footer
```

### footer.component.ts
- Create a property `currentYear` set to `new Date().getFullYear()` — no `@Input()` needed

### footer.component.html
- Display a `<footer>` with the text `© {{ currentYear }} Personal Bio Card — Built with Angular`

### footer.component.css
- Center the text, add a top border (`1px solid #e0e0e0`), and use a smaller, muted font color

---

## Step 7: Wire Everything Together in AppComponent

### app.component.ts
1. **Import** all four child components at the top of the file
2. **Add them to the `imports` array** in the `@Component` decorator
3. Create properties for the data you want to display:
   - `pageTitle` — a string for the header
   - `userName`, `userRole`, `userBio`, `userAvatarUrl` — strings for the bio card
   - `skills` — an array of strings like `['Angular', 'TypeScript', 'HTML & CSS', 'RxJS', 'Node.js']`

### app.component.html
Render the components inside your container using **property binding**:

```html
<app-header [title]="pageTitle"></app-header>

<app-bio-card
  [name]="userName"
  [role]="userRole"
  [bio]="userBio"
  [avatarUrl]="userAvatarUrl">
</app-bio-card>

<section class="skills-section">
  <h2>Skills</h2>
  <div class="skills-grid">
    <app-skill-badge [skillName]="skills[0]"></app-skill-badge>
    <app-skill-badge [skillName]="skills[1]"></app-skill-badge>
    <app-skill-badge [skillName]="skills[2]"></app-skill-badge>
    <app-skill-badge [skillName]="skills[3]"></app-skill-badge>
    <app-skill-badge [skillName]="skills[4]"></app-skill-badge>
  </div>
</section>

<app-footer></app-footer>
```

> ⚠️ **Common Error:** If you forget to add a component to the `imports` array, Angular will throw:
> `'app-header' is not a known element`. The fix is always the same — add the component to `imports`.

---

## Step 8: Add Global Styles

Open `src/styles.css` and add a basic reset and body styling:

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  color: #333;
  line-height: 1.6;
  min-height: 100vh;
}
```

---

## Step 9: Verify and Explore

1. Run `ng serve` and open [http://localhost:4200](http://localhost:4200)
2. You should see: a blue header banner, a bio card with avatar and text, five skill badges, and a footer
3. **Test ViewEncapsulation:** Open Chrome DevTools, inspect the `<header>` element and the `<article>` element — each has a different `_ngcontent-xxx` attribute. That's Angular scoping styles per component.
4. **Test the "not a known element" error:** Temporarily remove `HeaderComponent` from the `imports` array in `app.component.ts`, save, and watch the error appear. Then add it back.

---

## Acceptance Criteria

✅ The app renders four distinct components: header, bio card, skill badges, footer
✅ Data flows from AppComponent to children via `@Input()` and property binding `[inputName]="value"`
✅ Styles are scoped — header's blue gradient does NOT affect the bio card, and vice versa
✅ All components use `standalone: true` — no NgModule anywhere
✅ Removing a component from `imports` produces the "not a known element" error (and adding it back fixes it)

---

## Stretch Goals (Optional)

- Add a sixth skill badge with your own skill
- Create a `SocialLinksComponent` with an `@Input()` that accepts an array of `{ platform: string, url: string }` objects and renders clickable links
- Experiment with `ViewEncapsulation.None` on one component and see how its styles leak globally
- Try giving HeaderComponent and BioCardComponent the same CSS class name with different styles — confirm they don't clash

---

## When You're Done

Compare your solution to the sample code in this folder. Key things to check:
- Did you remember `standalone: true` on every component?
- Did you list every child component in the parent's `imports` array?
- Are your templates using `templateUrl` (not inline `template`)?
- Is your data flowing parent → child via `@Input()` and property binding?

You built a complete multi-component Angular app from scratch. That's the foundation everything else builds on. 🎉

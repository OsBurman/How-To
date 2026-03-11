# Exercise 8: Build a Team Roster

**Difficulty:** CHALLENGE
**Concepts practiced:** Creating standalone components with ng generate, @Input() for passing data into a component, ViewEncapsulation and scoped styles, The imports array, Rendering multiple components in AppComponent, Triggering and fixing the "not a known element" error

## What You're Building

A team roster page with a `RosterHeaderComponent` (accepts team name via @Input), multiple `MemberCardComponents` (each accepts name, role, and department via @Input), and a `RosterFooterComponent` (displays total member count via @Input). Each component has distinct styles that do not interfere with each other.

## Instructions

1. A bare `AppComponent` is provided — you'll generate all child components from scratch.
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

## Acceptance Criteria

- [ ] `RosterHeaderComponent` displays the team name received via `@Input()`
- [ ] Four `MemberCardComponent` instances display different names, roles, and departments
- [ ] `RosterFooterComponent` displays the total count using `@Input()` with property binding (`[totalMembers]="4"`)
- [ ] Header styles (white text on dark) do not affect card text — style encapsulation works
- [ ] Card styles do not affect footer text — each component is visually independent
- [ ] You triggered and fixed the "not a known element" error at least once

## Hints

**Hint 1 — Property binding for numbers:** Use `[totalMembers]="4"` (with square brackets) to pass the number 4. Without brackets, `totalMembers="4"` passes the string "4" instead.

**Hint 2 — Grid layout:** For the roster grid, try `display: flex; flex-wrap: wrap; gap: 1rem; padding: 1rem;` in `app.component.css`.

**Hint 3 — Checking encapsulation:** Both the header and member card use `<h3>` or heading tags with different colors. If encapsulation is working, they will each have their own colors. If you see them blending, check that neither component has `ViewEncapsulation.None`.

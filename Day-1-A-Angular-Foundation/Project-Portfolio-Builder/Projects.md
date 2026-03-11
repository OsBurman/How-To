# Project Portfolio Builder — Day 1 Part A

**Angular Foundation: Standalone Components, @Input(), and Scoped Styles**

These project ideas use ONLY what you learned in Day 1 Part A. No routing, no services, no HTTP, no signals — just standalone components, `@Input()` for parent-to-child data, property binding, interpolation, and `ViewEncapsulation` scoped styles.

Pick one (or more!) and build it from scratch to reinforce what you've learned.

---

## 1. Team Roster Card

**Difficulty:** ⭐ Beginner

Build a team roster page that displays a card for each team member.

**Components to create:**
- `PageHeaderComponent` — accepts a `[title]` input for the page heading
- `TeamMemberCardComponent` — accepts `[name]`, `[role]`, `[email]`, and `[photoUrl]` via `@Input()`
- `PageFooterComponent` — self-contained, displays company name and year

**What you'll practice:**
- Multiple `@Input()` properties on one component
- Rendering the same component multiple times with different data
- Scoped styles so each card looks consistent without style conflicts

---

## 2. Product Showcase

**Difficulty:** ⭐ Beginner

Create a simple product showcase page for a store or portfolio.

**Components to create:**
- `BannerComponent` — accepts `[heading]` and `[subtitle]` inputs
- `ProductCardComponent` — accepts `[productName]`, `[price]`, `[imageUrl]`, and `[description]` via `@Input()`
- `PriceBadgeComponent` — accepts `[amount]` and displays it as a styled price tag

**What you'll practice:**
- Nested component composition (ProductCard renders PriceBadge inside it)
- Property binding for images: `[src]="imageUrl"`
- ViewEncapsulation — banner styles don't leak into product cards

---

## 3. Recipe Display Page

**Difficulty:** ⭐ Beginner

Display a single recipe with its ingredients and instructions.

**Components to create:**
- `RecipeHeaderComponent` — accepts `[recipeName]` and `[cookTime]`
- `IngredientListComponent` — accepts an `[ingredients]` array of strings and renders each one
- `StepCardComponent` — accepts `[stepNumber]` and `[instruction]` via `@Input()`
- `FooterComponent` — self-contained

**What you'll practice:**
- Passing arrays via `@Input()` (the ingredients list)
- Rendering a component multiple times by index (like the skill badges)
- Clean component separation — each component has one job

---

## 4. Weather Info Card

**Difficulty:** ⭐ Beginner

Build a static weather display card (hard-coded data, no API).

**Components to create:**
- `CityHeaderComponent` — accepts `[cityName]` and `[country]`
- `TemperatureDisplayComponent` — accepts `[degrees]` and `[unit]` (e.g., "°C" or "°F")
- `ConditionBadgeComponent` — accepts `[condition]` (e.g., "Sunny", "Cloudy", "Rainy") and styles itself based on the value
- `ForecastDayComponent` — accepts `[dayName]`, `[high]`, and `[low]`

**What you'll practice:**
- Multiple small, focused components composed together
- Using `@Input()` to drive visual styling (different badge color per condition)
- Building a component that's rendered 5+ times with different data

---

## 5. Student Report Card

**Difficulty:** ⭐⭐ Intermediate

Create a student report card with grades for multiple subjects.

**Components to create:**
- `StudentInfoComponent` — accepts `[studentName]`, `[grade]`, `[schoolName]`, and `[photoUrl]`
- `SubjectRowComponent` — accepts `[subjectName]` and `[score]`; uses scoped styles to color the score green (≥ 70), yellow (50–69), or red (< 50)
- `GpaBadgeComponent` — accepts `[gpa]` and renders it as a styled circular badge
- `ReportFooterComponent` — accepts `[teacherName]` and `[date]`

**What you'll practice:**
- Conditional styling within scoped CSS (different colors based on input values)
- Composing many `SubjectRowComponent` instances in the parent
- Passing multiple data types via `@Input()` (strings, numbers)

---

## 6. Event Invitation Page

**Difficulty:** ⭐⭐ Intermediate

Build a styled event invitation page.

**Components to create:**
- `EventBannerComponent` — accepts `[eventName]`, `[date]`, and `[bannerImageUrl]`
- `EventDetailsComponent` — accepts `[location]`, `[time]`, `[description]`
- `SpeakerCardComponent` — accepts `[speakerName]`, `[topic]`, and `[photoUrl]`
- `RsvpBadgeComponent` — accepts `[status]` ("attending", "maybe", "declined") and renders a color-coded badge

**What you'll practice:**
- Multi-component page layout with distinct visual sections
- Property binding for background images and dynamic alt text
- Using the same component pattern (SpeakerCard) for a list of speakers

---

## 7. Portfolio Landing Page

**Difficulty:** ⭐⭐ Intermediate

Create your own developer portfolio page using Angular components.

**Components to create:**
- `HeroComponent` — accepts `[name]`, `[tagline]`, and `[avatarUrl]`
- `ProjectCardComponent` — accepts `[projectName]`, `[description]`, `[techStack]` (array of strings), and `[screenshotUrl]`
- `TechBadgeComponent` — accepts `[techName]` and renders as a styled pill (like SkillBadge)
- `ContactFooterComponent` — accepts `[email]` and `[githubUrl]`

**What you'll practice:**
- Nested composition: ProjectCard renders multiple TechBadge components inside it
- Passing arrays and iterating by index
- Building something you can actually use (your own portfolio!)

---

## Tips for All Projects

1. **Generate every component with the CLI:** `ng generate component component-name`
2. **Always add child components to the parent's `imports` array** — or you'll get the "not a known element" error
3. **Keep components small and focused** — each component should do one thing
4. **Use `templateUrl` and `styleUrl`** — never inline templates or styles
5. **Test ViewEncapsulation:** Give two different components the same CSS class name with different styles and confirm they don't conflict
6. **All data flows one way:** Parent → child via `@Input()` and `[property]="value"` binding

---

## When You're Done

Compare your project structure to the sample project in the `Project/` folder. Ask yourself:
- Does every component have `standalone: true`?
- Is every child component listed in the parent's `imports` array?
- Are styles scoped to each component (no style leaking)?
- Is data flowing from parent to child via `@Input()`?

Add your finished project to your portfolio — you built it with Angular! 🚀

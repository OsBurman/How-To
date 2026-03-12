# Exercise 8 — Event Dashboard

**Difficulty:** CHALLENGE
**Concepts practiced:** Named `ng-content` slots, `ngAfterContentInit`, `@let`, `@if`/`@else`, `ng-template`, `@for` with `track`, `ng-container`, `[ngClass]`, `[ngStyle]`, `date` pipe, `currency` pipe, `uppercase` pipe, `ExcerptPipe` (custom pure pipe)

## Setup

```bash
# From the Exercises/ workspace root
npm install
cd Exercise-8-Event-Dashboard && npx ng serve
```

Open your browser at **http://localhost:4200**

## What you'll build

A fully-featured event dashboard combining every concept from Day 2 Part A. The app lists upcoming and past events with category badges, formatted dates and prices, truncated descriptions, and a dynamic accent border per card.

## Provided for you

- `Event` interface and sample `events` array in `app.component.ts`
- `getCategoryLabel(category)` method in `AppComponent`
- `EventCardComponent` shell (needs named slots — your job)
- `FilterPipe` and `ExcerptPipe` (complete — do not modify)
- All imports already in `AppComponent.imports[]`

---

## Your Tasks

Work through these steps in order.

### Step 1 — `@let` for upcoming count

At the top of `app.component.html`, add:

```html
@let upcomingCount = events | filter:'isPast':false;
```

This counts upcoming events once and makes `upcomingCount` available everywhere in the template.

### Step 2 — Header with live count

Replace the static `<h1>` with:

```html
<h1>Events Dashboard <span>({{ upcomingCount.length }} upcoming)</span></h1>
```

### Step 3 — Build `EventCardComponent` named slots

In `event-card.component.ts`:
- Add `@Input() borderColor: string = '#cbd5e1';`
- Implement `ngAfterContentInit()` to log `'EventCard content projected!'`

In `event-card.component.html`:
- Replace the three `<!-- TODO -->` comments with named `<ng-content>` slots:
  - `<ng-content select="[event-image]"></ng-content>`
  - `<ng-content select="[event-meta]"></ng-content>`
  - `<ng-content select="[event-actions]"></ng-content>`
- Uncomment the `[ngStyle]` binding on `.card-wrapper`

### Step 4 — `@if` / `@else` with `ng-template`

Wrap the event list in a conditional block. Define the empty state as an `ng-template`:

```html
@if (events.length > 0) {
  <!-- list goes here -->
} @else {
  <ng-template [ngTemplateOutlet]="noEvents"></ng-template>
}

<ng-template #noEvents>
  <p class="empty-state">No events scheduled. Check back soon!</p>
</ng-template>
```

### Step 5 — `@for` with `track`

Inside the `@if` block, replace the raw list with:

```html
@for (event of events; track event.id) {
  <!-- ng-container + app-event-card go here -->
}
```

### Step 6 — `ng-container` grouping

Inside the `@for` loop, wrap the card in `<ng-container>` to group it without adding a DOM node:

```html
<ng-container>
  <app-event-card [borderColor]="event.accentColor">
    <div event-image>🎫</div>
    <div event-meta>
      <strong>{{ event.title }}</strong>
      <span>{{ event.date | date:'fullDate' }}</span>
      <span>{{ event.price | currency }}</span>
      <span [ngClass]="'badge-' + event.category">{{ getCategoryLabel(event.category) }}</span>
      <p>{{ event.description | excerpt:100 }}</p>
    </div>
    <div event-actions>
      <button>Book Now</button>
    </div>
  </app-event-card>
</ng-container>
```

### Step 7 — Badge CSS classes

In `app.component.css`, fill in colours for `.badge-music`, `.badge-sport`, `.badge-tech`, `.badge-food`. Stubs with placeholder colours are already there.

### Step 8 — Summary footer

After the `@if` block, add:

```html
<p class="summary">{{ upcomingCount.length }} upcoming events</p>
```

This proves `@let` is available throughout the entire template, not just where it was defined.

### Step 9 — Empty state test

Temporarily set `events: Event[] = []` in the class. Confirm the `ng-template` fallback renders. Restore the original array.

---

## Acceptance Criteria

- [ ] `EventCardComponent` has three named `ng-content` slots
- [ ] `ngAfterContentInit` logs in `EventCardComponent`
- [ ] `@let` computes `upcomingCount` and appears in at least two template locations
- [ ] `@if` / `@else` with `ng-template` handles the empty state
- [ ] `@for` iterates with `track event.id`
- [ ] `ng-container` is used inside the loop
- [ ] `[ngClass]` applies category badge colours via `'badge-' + event.category`
- [ ] `[ngStyle]` applies `borderColor` to the card wrapper
- [ ] `date:'fullDate'`, `currency`, and `excerpt:100` are all applied in the template
- [ ] Temporarily emptying `events` shows the empty-state template
- [ ] No console errors

## Bonus

- Add an `@if (event.isPast)` inside the card to show a "Past Event" ribbon
- Add a category filter control that updates `events` to a filtered subset
- Add `| uppercase` to the category name inside the badge

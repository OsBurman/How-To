# Exercise 10 ⚠️ – Convert NgModule App to Modern Standalone

## Goal

You have a **fully working** legacy Angular app that uses `NgModule`, constructor injection, `*ngIf`/`*ngFor`, the `async` pipe, and the `takeUntil` + `ngOnDestroy` pattern.

Your job is to convert it — piece by piece — to modern standalone Angular.

## Step 1 — Run the legacy app first

```bash
npm install
npm start
```

Open `http://localhost:4200`. Post a few messages, confirm everything works. **Then** start converting.

## Conversion Steps

Work through these in order. After each step, `npm start` should still compile and the app should still run.

### Step 1 — Add `standalone: true` to all three components

In `app.component.ts`, `feed-list.component.ts`, and `feed-form.component.ts`:

```typescript
@Component({
  selector: '...',
  standalone: true,   // ← add this
  templateUrl: '...',
  styleUrl: '...'
})
```

At this point the app will break because the components still need their dependencies declared.

### Step 2 — Convert `main.ts`

Replace the NgModule bootstrap with `bootstrapApplication`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
```

Then delete `app.module.ts`.

### Step 3 — Add imports to each standalone component

Each standalone component must import the Angular features it uses directly.

**FeedListComponent** — needs `NgIf`, `NgFor`, `AsyncPipe` (or just `CommonModule`):
```typescript
imports: [CommonModule]
```

**FeedFormComponent** — needs `FormsModule` for `[(ngModel)]`:
```typescript
imports: [FormsModule]
```

**AppComponent** — needs the two child components:
```typescript
imports: [FeedListComponent, FeedFormComponent]
```

### Step 4 — Replace constructor injection with `inject()`

In `FeedListComponent` and `FeedFormComponent`, remove the constructor and add a field:

```typescript
private readonly feedService = inject(FeedService);
```

Import `inject` from `'@angular/core'`.

### Step 5 — Replace the async pipe with `toSignal()`

In `FeedListComponent`:

```typescript
readonly messages = toSignal(this.feedService.messages, { initialValue: [] as string[] });
```

Then delete `messages$` and the `destroy$` Subject.

### Step 6 — Replace `*ngIf` + `*ngFor` with `@if` + `@for`

In `feed-list.component.html`, replace the legacy directives:

```html
@if (messages().length > 0) {
  <ul class="feed-list">
    @for (message of messages(); track $index) {
      <li class="feed-item">{{ message }}</li>
    }
  </ul>
  <p class="count">{{ messages().length }} message(s)</p>
}
```

Remove `imports: [CommonModule]` from `FeedListComponent` — it's no longer needed.

### Step 7 — Delete `ngOnDestroy` and the `destroy$` Subject

Now that `toSignal()` manages the subscription, there's nothing to clean up manually.

## Legacy Patterns You'll Remove

| Legacy | Modern Replacement |
|--------|-------------------|
| `NgModule` + `declarations` | `standalone: true` + `imports: []` |
| `platformBrowserDynamic().bootstrapModule()` | `bootstrapApplication()` |
| `constructor(private s: Service)` | `private s = inject(Service)` |
| `async` pipe + `*ngIf` null guard | `toSignal()` |
| `takeUntil(destroy$)` + `ngOnDestroy` | `takeUntilDestroyed()` (or `toSignal()`) |
| `*ngIf` / `*ngFor` | `@if` / `@for` |

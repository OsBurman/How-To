# Exercise 10: ⚠️ LEGACY — Convert to Modern Standalone

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Modern standalone components, `standalone: true`, `imports` array, `bootstrapApplication`, removing NgModule, `styleUrl` singular

## What You're Building

You're given a fully working **legacy** Angular app — a simple message board with a `MessageCardComponent` that uses `@Input()`, `@Output()`, two-way binding, and lifecycle hooks. Everything is wired through an `AppModule` with `declarations`, `FormsModule`, and `bootstrapModule()`. Your job is to convert it to the **modern standalone pattern**: add `standalone: true` to all components, move `FormsModule` into the component that needs it, replace `bootstrapModule()` with `bootstrapApplication()`, and delete the NgModule.

## Step 0 — Verify the Legacy App Works

Run `npx ng serve` to verify the legacy app works — it's a message board with cards that display author, message, and a "like" button. Try posting a new message and clicking like. Everything should work.

## Instructions

1. **Convert `MessageCardComponent` to a modern standalone component:**
   - Open `src/app/message-card/message-card.component.ts`
   - Add `standalone: true` to the `@Component` decorator
   - Add `imports: []` to the `@Component` decorator (this component has no template dependencies)
   - Change `styleUrls: ['./message-card.component.css']` to `styleUrl: './message-card.component.css'`

2. **Convert `AppComponent` to a modern standalone component:**
   - Open `src/app/app.component.ts`
   - Add `standalone: true` to the `@Component` decorator
   - Add `imports: [FormsModule, MessageCardComponent]` to the `@Component` decorator
   - Add import statements at the top:
     ```typescript
     import { FormsModule } from '@angular/forms';
     import { MessageCardComponent } from './message-card/message-card.component';
     ```
   - Change `styleUrls: ['./app.component.css']` to `styleUrl: './app.component.css'`

3. **Convert `main.ts` to modern bootstrap:**
   - Replace the entire contents of `src/main.ts` with:
     ```typescript
     import { bootstrapApplication } from '@angular/platform-browser';
     import { appConfig } from './app/app.config';
     import { AppComponent } from './app/app.component';

     bootstrapApplication(AppComponent, appConfig)
       .catch((err) => console.error(err));
     ```

4. **Create `src/app/app.config.ts`:**
   ```typescript
   import { ApplicationConfig } from '@angular/core';

   export const appConfig: ApplicationConfig = {
     providers: []
   };
   ```

5. **Delete `src/app/app.module.ts`** — the standalone components replace it.

6. Save all files and run `npx ng serve`. The app should work exactly the same as before.

7. **Reflect:** In the modern version, open `app.component.ts`. Can you see exactly what this component depends on? (Yes — `FormsModule` and `MessageCardComponent` are right there in the `imports` array.) In the legacy version, these dependencies were hidden in `app.module.ts`. That's the clarity that standalone components provide.

## Acceptance Criteria

- [ ] `app.module.ts` is deleted
- [ ] `app.config.ts` exists with `ApplicationConfig` and `providers: []`
- [ ] `main.ts` uses `bootstrapApplication(AppComponent, appConfig)`
- [ ] Both components have `standalone: true`
- [ ] `AppComponent` imports `[FormsModule, MessageCardComponent]` in its `@Component` decorator
- [ ] `MessageCardComponent` has `imports: []` in its `@Component` decorator
- [ ] Both components use `styleUrl` (singular string) instead of `styleUrls` (plural array)
- [ ] The app builds and runs without errors

## Hints

**Hint 1 — FormsModule placement:** In the legacy version, `FormsModule` is imported in `AppModule` and available to ALL components. In modern standalone, `FormsModule` goes in the `imports` array of the specific component that uses `[(ngModel)]` — which is `AppComponent`.

**Hint 2 — Modern bootstrap:**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

**Hint 3 — styleUrl vs styleUrls:** Modern uses `styleUrl: './file.css'` (string). Legacy used `styleUrls: ['./file.css']` (array). Both work in Angular 17+.

**Hint 4 — Reflection:** After converting, notice that `app.component.ts` now clearly shows it depends on `FormsModule` and `MessageCardComponent`. The dependency is visible and local. This is the core improvement that standalone components bring — no more hidden coupling through modules.

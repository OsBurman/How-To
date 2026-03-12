# Exercise 9: Legacy NgModule Conversion ⚠️

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Modern standalone components, bootstrapApplication vs bootstrapModule, imports array, removing NgModule boilerplate, standalone: true

> **⚠️ This exercise teaches the LEGACY pattern for recognition only. You should always write modern standalone code in real projects.**

## What You're Building

You start with a working **legacy** Angular app (a banner and three info cards) that uses NgModules, feature modules, declarations arrays, and `bootstrapModule()`. Your job is to convert it to the **modern standalone pattern**: add `standalone: true` to all components, give each component its own `imports` array, replace `bootstrapModule()` with `bootstrapApplication()`, and delete all the module files. The app should look and work exactly the same — only the wiring changes.

## Starter Code

This project includes:
- A **fully working legacy NgModule app** — serve it first to see the banner and info cards
- `src/app/app.module.ts` — the root NgModule with declarations, imports, and bootstrap arrays
- `src/app/banner/banner.module.ts` — a feature module that declares and exports BannerComponent
- `src/app/info-card/info-card.module.ts` — a feature module that declares and exports InfoCardComponent
- None of the components have `standalone: true` — they all depend on their modules

## Instructions

1. Serve the app first (`npx ng serve`) and confirm it works — you should see a dark blue banner and three white info cards. Stop the server.

2. **Convert `BannerComponent` to a modern standalone component:**
   - Open `src/app/banner/banner.component.ts`
   - Add `standalone: true` to the `@Component` decorator
   - Add `imports: []` to the `@Component` decorator (this component has no dependencies)
   - Change `styleUrls` (plural array) to `styleUrl` (singular string): `styleUrl: './banner.component.css'`

3. **Convert `InfoCardComponent` to a modern standalone component:**
   - Open `src/app/info-card/info-card.component.ts`
   - Add `standalone: true` to the `@Component` decorator
   - Add `imports: []` to the `@Component` decorator
   - Change `styleUrls` to `styleUrl: './info-card.component.css'`

4. **Convert `AppComponent` to a modern standalone component:**
   - Open `src/app/app.component.ts`
   - Add `standalone: true` to the `@Component` decorator
   - Add `imports: [BannerComponent, InfoCardComponent]` to the `@Component` decorator
   - Add import statements at the top: `import { BannerComponent } from './banner/banner.component';` and `import { InfoCardComponent } from './info-card/info-card.component';`
   - Change `styleUrls` to `styleUrl: './app.component.css'`

5. **Convert `main.ts` to the modern bootstrap:**
   - Replace the entire contents of `src/main.ts` with:
     ```typescript
     import { bootstrapApplication } from '@angular/platform-browser';
     import { AppComponent } from './app/app.component';
     import { appConfig } from './app/app.config';

     bootstrapApplication(AppComponent, appConfig)
       .catch((err) => console.error(err));
     ```

6. **Create `src/app/app.config.ts`:**
   ```typescript
   import { ApplicationConfig } from '@angular/core';

   export const appConfig: ApplicationConfig = {
     providers: []
   };
   ```

7. **Delete the module files** — they are no longer needed:
   - Delete `src/app/app.module.ts`
   - Delete `src/app/banner/banner.module.ts`
   - Delete `src/app/info-card/info-card.module.ts`

8. Serve the app: `npx ng serve`. Confirm it looks exactly the same — dark blue banner, three info cards.

9. **Deliberate break (optional):** Remove `InfoCardComponent` from AppComponent's `imports` array. Notice the error is clear and local — you can see exactly which component is missing directly in the file that uses it. Compare that to the legacy approach where you'd have to trace through module imports. Add it back to fix.

## Acceptance Criteria

- [ ] `main.ts` uses `bootstrapApplication(AppComponent, appConfig)` instead of `platformBrowserDynamic().bootstrapModule()`
- [ ] `app.config.ts` exists with `ApplicationConfig` and `providers: []`
- [ ] `app.module.ts` is deleted
- [ ] `banner.module.ts` is deleted
- [ ] `info-card.module.ts` is deleted
- [ ] All three components have `standalone: true`
- [ ] `AppComponent` imports `[BannerComponent, InfoCardComponent]` in its `@Component` decorator
- [ ] All components use `styleUrl` (singular string) instead of `styleUrls` (plural array)
- [ ] The app looks and works exactly the same as the legacy version

## Hints

**Hint 1 — bootstrapApplication:** Import from `'@angular/platform-browser'` (no `-dynamic` suffix). This is different from the legacy `'@angular/platform-browser-dynamic'`.

**Hint 2 — imports array:** In modern Angular, each standalone component lists its own dependencies in its `imports` array. AppComponent needs to import the child components it uses in its template. Child components with no dependencies use `imports: []`.

**Hint 3 — styleUrl vs styleUrls:** Modern uses `styleUrl: './file.css'` (string). Legacy used `styleUrls: ['./file.css']` (array). Both work in Angular 17+, but modern convention is the singular form.

**Hint 4 — standalone: true:** This single flag is what makes a component self-contained. Without it, the component must be declared in a module. With it, the component manages its own dependencies.

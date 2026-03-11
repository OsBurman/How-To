# Exercise 9: Legacy NgModule Conversion ⚠️

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Legacy NgModule pattern, bootstrapModule vs bootstrapApplication, declarations array, feature modules with exports, legacy component registration

> **⚠️ This exercise teaches the LEGACY pattern for recognition only. You should always write modern standalone code in real projects.**

## What You're Building

You start with a working modern standalone Angular app (a banner and three info cards). Your job is to convert it to the legacy NgModule pattern: replace `bootstrapApplication()` with `bootstrapModule()`, remove `standalone: true` from all components, and complete the provided module skeleton files. The app should look and work exactly the same — only the wiring changes.

## Starter Code

This project includes:
- A **fully working modern standalone app** — serve it first to see the banner and info cards
- **Three skeleton module files** with TODO comments: `app.module.ts`, `banner/banner.module.ts`, `info-card/info-card.module.ts`
- The skeleton files have the `@NgModule` decorator structure already in place — you fill in the import statements and the arrays

## Instructions

1. Serve the app first (`npx ng serve`) and confirm it works — you should see a dark blue banner and three white info cards. Stop the server.

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

4. **Complete `BannerModule`:**
   - Open `src/app/banner/banner.module.ts` (skeleton provided)
   - Add the missing imports at the top: `NgModule` from `@angular/core`, `CommonModule` from `@angular/common`, and `BannerComponent` from `./banner.component`
   - Fill in the TODO sections: `declarations: [BannerComponent]`, `imports: [CommonModule]`, `exports: [BannerComponent]`

5. **Convert `InfoCardComponent` to a legacy component:**
   - Open `src/app/info-card/info-card.component.ts`
   - Remove `standalone: true` and `imports: []`
   - Change `styleUrl` to `styleUrls: ['./info-card.component.css']`

6. **Complete `InfoCardModule`:**
   - Open `src/app/info-card/info-card.module.ts` (skeleton provided)
   - Same pattern as BannerModule: add imports, fill in declarations/imports/exports

7. **Convert `AppComponent` to a legacy component:**
   - Open `src/app/app.component.ts`
   - Remove `standalone: true` and `imports: [BannerComponent, InfoCardComponent]`
   - Remove the import statements for `BannerComponent` and `InfoCardComponent` at the top
   - Change `styleUrl` to `styleUrls: ['./app.component.css']`

8. **Complete `AppModule`:**
   - Open `src/app/app.module.ts` (skeleton provided)
   - Add imports: `NgModule`, `BrowserModule`, `AppComponent`, `BannerModule`, `InfoCardModule`
   - Fill in: `declarations: [AppComponent]`, `imports: [BrowserModule, BannerModule, InfoCardModule]`, `bootstrap: [AppComponent]`

9. Serve the app: `npx ng serve`. Confirm it looks exactly the same — dark blue banner, three info cards.

10. **Deliberate break (optional):** Remove `BannerModule` from AppModule's `imports` array. The error is harder to debug in the legacy pattern — you have to trace module imports instead of checking the component's own imports array. Add it back to fix.

## Acceptance Criteria

- [ ] `main.ts` uses `platformBrowserDynamic().bootstrapModule(AppModule)` instead of `bootstrapApplication()`
- [ ] `app.config.ts` is deleted
- [ ] `AppModule` exists with `declarations: [AppComponent]`, `imports: [BrowserModule, BannerModule, InfoCardModule]`, and `bootstrap: [AppComponent]`
- [ ] `BannerModule` exists with `declarations: [BannerComponent]` and `exports: [BannerComponent]`
- [ ] `InfoCardModule` exists with `declarations: [InfoCardComponent]` and `exports: [InfoCardComponent]`
- [ ] No component has `standalone: true` — all use the legacy pattern
- [ ] All components use `styleUrls` (plural array) instead of `styleUrl` (singular)
- [ ] The app looks and works exactly the same as the modern version

## Hints

**Hint 1 — platformBrowserDynamic:** Import from `'@angular/platform-browser-dynamic'` (note the `-dynamic` suffix). Different from the modern `'@angular/platform-browser'`.

**Hint 2 — exports array:** If you declare a component in a feature module but forget `exports`, other modules can't use it. The `exports` array makes components publicly available.

**Hint 3 — styleUrls vs styleUrl:** Legacy used `styleUrls: ['./file.css']` (array). Modern uses `styleUrl: './file.css'` (string). Both work in Angular 17+.

**Hint 4 — Only one declarations home:** A component can only be declared in ONE module. Declaring `BannerComponent` in both `BannerModule` and `AppModule` causes a "declared in 2 modules" error.

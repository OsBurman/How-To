# Exercise 10: ⚠️ LEGACY — Convert to NgModule

**Difficulty:** INTERMEDIATE
**Concepts practiced:** Legacy NgModule pattern, `declarations` array, `FormsModule` in NgModule, `styleUrls` plural, `bootstrapModule`

## What You're Building

You're given a fully working modern standalone app — a simple message board with a `MessageCardComponent` that uses `@Input()`, `@Output()`, two-way binding, and lifecycle hooks. Your job is to convert it to the legacy NgModule pattern: create an `AppModule`, move FormsModule to the module, remove standalone from components, and switch the bootstrap.

## Step 0 — Verify the Modern App Works

Run `npx ng serve` to verify the modern app works — it's a message board with cards that display author, message, and a "like" button. Try posting a new message and clicking like. Everything should work.

## Instructions

1. **Create `src/app/app.module.ts`:**
   ```typescript
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { FormsModule } from '@angular/forms';
   import { AppComponent } from './app.component';
   import { MessageCardComponent } from './message-card/message-card.component';

   @NgModule({
     declarations: [AppComponent, MessageCardComponent],
     imports: [BrowserModule, FormsModule],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```

2. **Modify `src/main.ts`:**
   - Replace `bootstrapApplication` with `platformBrowserDynamic().bootstrapModule(AppModule)`
   - Update imports accordingly:
   ```typescript
   import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
   import { AppModule } from './app/app.module';

   platformBrowserDynamic().bootstrapModule(AppModule)
     .catch(err => console.error(err));
   ```

3. **Modify `src/app/app.component.ts`:**
   - Remove `standalone: true`
   - Remove the `imports: [FormsModule, MessageCardComponent]` array entirely
   - Change `styleUrl` (singular) to `styleUrls` (plural array): `styleUrls: ['./app.component.css']`

4. **Modify `src/app/message-card/message-card.component.ts`:**
   - Remove `standalone: true`
   - Remove the `imports: []` array
   - Change `styleUrl` to `styleUrls` (plural array): `styleUrls: ['./message-card.component.css']`

5. **Delete `src/app/app.config.ts`** — the NgModule replaces it.

6. Save all files and run `npx ng serve`. The app should work exactly the same as before.

7. **Reflect:** How many files did you have to edit? Can you tell from `message-card.component.ts` that it depends on FormsModule? (No — that's the hidden coupling problem that standalone components solved.)

## Acceptance Criteria

- [ ] `app.module.ts` exists with `@NgModule` decorator
- [ ] `declarations` array lists both `AppComponent` and `MessageCardComponent`
- [ ] `imports` array includes `BrowserModule` and `FormsModule`
- [ ] `bootstrap` array includes `AppComponent`
- [ ] `main.ts` uses `platformBrowserDynamic().bootstrapModule(AppModule)`
- [ ] Neither component has `standalone: true`
- [ ] Neither component has its own `imports` array
- [ ] Both components use `styleUrls` (plural array) instead of `styleUrl`
- [ ] `app.config.ts` is deleted
- [ ] The app builds and runs without errors

## Hints

**Hint 1 — NgModule structure:**
```typescript
@NgModule({
  declarations: [AppComponent, MessageCardComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Hint 2 — Legacy bootstrap:**
```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

**Hint 3 — styleUrls:** Legacy uses `styleUrls: ['./file.css']` (array). Modern uses `styleUrl: './file.css'` (string). This is a small but breaking difference.

**Hint 4 — Reflection:** After converting, notice that `message-card.component.ts` has no indication it needs `FormsModule`. The dependency is invisible — hidden in `app.module.ts`. This is the core pain point that standalone components fixed.

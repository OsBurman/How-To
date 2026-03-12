// main.ts — Exercise 9: LEGACY bootstrap
// This is the LEGACY way to start an Angular app: bootstrapModule(AppModule).
// In Step 6 of the exercise, you will replace this with bootstrapApplication().

// Legacy: platformBrowserDynamic + NgModule
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// ─────────────────────────────────────────────────────────────────────────────
// STEP 6 INSTRUCTIONS (do this last):
// Once your modern components are ready in src/app/modern/, replace
// the two lines above with the modern bootstrapping pattern:
//
//   import { bootstrapApplication } from '@angular/platform-browser';
//   import { appConfig } from './app/modern/app.config';
//   import { AppComponent } from './app/modern/app.component';
//
//   bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
// ─────────────────────────────────────────────────────────────────────────────

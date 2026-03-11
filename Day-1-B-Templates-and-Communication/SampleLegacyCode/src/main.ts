/**
 * legacy/main.ts — Legacy Application Entry Point
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * In the legacy approach, main.ts calls platformBrowserDynamic().bootstrapModule()
 * to launch an NgModule (AppModule) instead of a standalone component.
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - bootstrapModule(AppModule) → bootstrapApplication(AppComponent, appConfig)
 * - The entire NgModule system was the only way to organize an Angular app.
 *   Every component had to be "declared" in a module before it could be used.
 *   Standalone components removed this requirement entirely.
 */

// Legacy import: platformBrowserDynamic is the legacy bootstrap mechanism
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Legacy import: AppModule is the root NgModule — the central registry for the app
import { AppModule } from './app/app.module';

// Legacy bootstrap: launches the entire app through a module, not a component.
// Modern equivalent: bootstrapApplication(AppComponent, appConfig)
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

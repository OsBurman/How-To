/**
 * main.ts — Angular Application Entry Point
 *
 * This is the first file Angular executes when the app starts.
 * It calls bootstrapApplication() to launch the root component
 * with the configuration defined in app.config.ts.
 *
 * In vanilla JS, you'd manually call document.getElementById()
 * and start attaching event listeners. Angular replaces all of
 * that with a single bootstrap call that wires up the entire
 * component tree, change detection, and dependency injection.
 *
 * CLI command that generated this file:
 *   ng new my-app --standalone
 *   (main.ts is created automatically in every new Angular project)
 */

import { bootstrapApplication } from '@angular/platform-browser'; // Angular's standalone bootstrap function
import { AppComponent } from './app/app.component'; // The root component — everything starts here
import { appConfig } from './app/app.config'; // Application-wide configuration (providers, etc.)

// bootstrapApplication() replaces the legacy bootstrapModule(AppModule) pattern.
// It takes two arguments:
//   1. The root component class (AppComponent)
//   2. An optional config object with providers, imported from app.config.ts
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Catch and log any startup errors

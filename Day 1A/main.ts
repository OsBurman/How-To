/**
 * main.ts — Application Entry Point
 *
 * This is the first file Angular executes when the app starts.
 * It calls bootstrapApplication() to launch the root component
 * with the configuration defined in app.config.ts.
 *
 * CLI command that generated this project:
 *   ng new my-app --standalone
 *
 * In legacy Angular, this file called bootstrapModule(AppModule) instead.
 * Modern Angular uses bootstrapApplication() — no NgModule needed.
 */

import { bootstrapApplication } from '@angular/platform-browser'; // Import the standalone bootstrap function
import { AppComponent } from './app/app.component';               // Import the root component
import { appConfig } from './app/app.config';                     // Import the app-wide configuration

// bootstrapApplication() takes the root component and an optional config object.
// This replaces the legacy bootstrapModule(AppModule) pattern entirely.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Log any startup errors to the console

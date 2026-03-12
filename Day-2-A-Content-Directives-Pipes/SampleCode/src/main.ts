/**
 * main.ts — Application Entry Point
 *
 * bootstrapApplication() launches the standalone root component.
 * This is the MODERN replacement for bootstrapModule(AppModule).
 *
 * The second argument (appConfig) provides application-wide configuration:
 * providers, router setup, HTTP client, etc. All of that lives in app.config.ts
 * — not inside an NgModule.
 *
 * CLI command that generated this file:
 *   ng new d2a-movie-listing (main.ts is created automatically)
 */

import { bootstrapApplication } from '@angular/platform-browser'; // standalone bootstrap
import { AppComponent } from './app/app.component';               // root component
import { appConfig } from './app/app.config';                     // application providers

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

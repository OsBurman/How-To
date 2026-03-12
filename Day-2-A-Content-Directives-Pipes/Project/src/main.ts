/**
 * main.ts — Application Entry Point
 *
 * bootstrapApplication() launches the standalone root component.
 * This is the MODERN replacement for platformBrowserDynamic().bootstrapModule(AppModule).
 *
 * The second argument (appConfig) holds application-wide providers —
 * routing, HTTP client, etc. For this project it's empty (no router or HTTP needed).
 *
 * CLI command that generated this file:
 *   ng new d2a-movie-listing-project (main.ts is created automatically)
 */

import { bootstrapApplication } from '@angular/platform-browser'; // standalone bootstrap
import { AppComponent } from './app/app.component';               // root component
import { appConfig } from './app/app.config';                     // application providers

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

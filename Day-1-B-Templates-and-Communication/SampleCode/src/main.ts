/**
 * main.ts — Application Entry Point (Modern Pattern)
 *
 * bootstrapApplication() launches the app using a standalone component as the root.
 * This is the modern Angular 17+ approach — no NgModule needed.
 *
 * Two arguments:
 *   1. AppComponent — the root component rendered into <app-root>
 *   2. appConfig — application-wide providers (empty for Day 1; filled on Days 3–4)
 */

import { bootstrapApplication } from '@angular/platform-browser'; // Modern bootstrap function
import { AppComponent } from './app/app.component'; // Root component
import { appConfig } from './app/app.config'; // Application configuration

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

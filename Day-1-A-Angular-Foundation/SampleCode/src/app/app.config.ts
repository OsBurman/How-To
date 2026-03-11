/**
 * app.config.ts — Application Configuration
 *
 * This file defines application-wide providers and configuration.
 * In modern Angular, this replaces the providers array that used
 * to live inside AppModule.
 *
 * Right now it's mostly empty because Day 1 doesn't use services
 * or routing yet. On Day 3 you'll add provideHttpClient() here,
 * and on Day 4 you'll add provideRouter(routes).
 *
 * CLI command that generated this file:
 *   ng new my-app --standalone
 *   (app.config.ts is created automatically alongside main.ts)
 */

import { ApplicationConfig } from '@angular/core'; // Type for the config object

// ApplicationConfig is a simple object with a providers array.
// providers: [] is where you register application-wide services,
// HTTP clients, routers, and interceptors.
export const appConfig: ApplicationConfig = {
  providers: [
    // No providers needed yet — Day 1 focuses on components only.
    // Future additions:
    //   provideRouter(routes)        — Day 4
    //   provideHttpClient()          — Day 3
    //   provideZoneChangeDetection() — default; Angular handles this
  ]
};

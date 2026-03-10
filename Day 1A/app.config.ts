/**
 * app.config.ts — Application Configuration
 *
 * This file defines the providers and configuration for the entire application.
 * It replaces the legacy AppModule's providers array.
 * bootstrapApplication() in main.ts receives this config object.
 *
 * Right now it's mostly empty — as we add routing, HTTP, and other features
 * on later days, their providers will go here.
 */

import { ApplicationConfig } from '@angular/core'; // Import the config type

// ApplicationConfig defines the shape of the configuration object.
// The providers array is where you register app-wide services and features.
export const appConfig: ApplicationConfig = {
  providers: [
    // Day 3 will add provideHttpClient() here
    // Day 4 will add provideRouter(routes) here
  ]
};

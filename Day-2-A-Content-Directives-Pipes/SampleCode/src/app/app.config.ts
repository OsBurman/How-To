/**
 * app.config.ts — Application Configuration
 *
 * This is where application-wide providers live.
 * Day 2 doesn't need routing or HTTP — those arrive on Day 3 and Day 4.
 *
 * Future additions:
 *   Day 3 Part B: provideHttpClient()
 *   Day 4 Part A: provideRouter(routes)
 *
 * CLI command that generated this file:
 *   ng new d2a-movie-listing (app.config.ts is created automatically)
 */

import { ApplicationConfig } from '@angular/core';

// ApplicationConfig is a simple typed object: { providers: Provider[] }
export const appConfig: ApplicationConfig = {
  providers: []
  // provideHttpClient() goes here on Day 3
  // provideRouter(routes)  goes here on Day 4
};

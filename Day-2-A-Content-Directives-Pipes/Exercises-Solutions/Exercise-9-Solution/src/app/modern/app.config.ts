// modern/app.config.ts — Exercise 9 SOLUTION
// CONCEPT: bootstrapApplication config — replaces AppModule as the app-level provider

import { ApplicationConfig } from '@angular/core';

// SOLUTION: Export appConfig with an empty providers array.
// For this exercise the app uses no router or HttpClient, so providers stays [].
// In a real app you would add: provideRouter(routes), provideHttpClient(), etc.
export const appConfig: ApplicationConfig = {
  providers: []
};

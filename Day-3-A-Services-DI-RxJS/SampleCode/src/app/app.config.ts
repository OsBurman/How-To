// app.config.ts — application-level providers.
//
// provideHttpClient() is NOT here yet — that belongs to Day 3 Part B.
// Services decorated with @Injectable({ providedIn: 'root' }) are
// automatically available everywhere without listing them here.
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    // No routes needed for this sample — empty array satisfies provideRouter()
    provideRouter([])
  ]
};

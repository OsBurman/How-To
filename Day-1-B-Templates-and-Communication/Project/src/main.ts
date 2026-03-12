// main.ts — Application entry point
// bootstrapApplication() launches the app with the root component and optional config.
// This is the modern Angular pattern — no NgModule needed.
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

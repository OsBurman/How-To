/**
 * main.ts — Application Entry Point (Modern Pattern)
 *
 * bootstrapApplication() launches the app with a standalone root component.
 * No NgModule required — this is the modern Angular 17+ approach.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

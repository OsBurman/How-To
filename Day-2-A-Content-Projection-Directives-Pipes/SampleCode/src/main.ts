/**
 * main.ts — Day 2 Part A: Application Entry Point
 *
 * Bootstraps the Angular application using the modern bootstrapApplication()
 * function with the standalone AppComponent and application config.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// bootstrapApplication() — modern entry point (Angular 17+)
// No NgModule needed — AppComponent is standalone
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

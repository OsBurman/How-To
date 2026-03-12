/**
 * main.ts — Legacy Application Entry Point
 *
 * LEGACY PATTERN: bootstrapModule(AppModule)
 * Angular loads the entire NgModule graph before rendering anything.
 * Every component, pipe, and directive must be declared in a module.
 *
 * MODERN REPLACEMENT:
 *   bootstrapApplication(AppComponent, appConfig)
 *   No NgModule needed — the component tree is the application.
 */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // the root NgModule — no equivalent in modern Angular

// bootstrapModule loads AppModule and renders the component listed in bootstrap: []
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

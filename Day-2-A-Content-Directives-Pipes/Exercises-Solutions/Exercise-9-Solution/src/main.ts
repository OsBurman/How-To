// main.ts — Exercise 9 SOLUTION
// CONCEPT: bootstrapApplication replaces platformBrowserDynamic().bootstrapModule(AppModule)

// SOLUTION: Import the modern root component and config — not AppModule
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/modern/app.component';
import { appConfig } from './app/modern/app.config';

// bootstrapApplication(RootComponent, config) is the modern entry point.
// It replaces:
//   platformBrowserDynamic().bootstrapModule(AppModule)
// No AppModule, no NgModule, no platformBrowserDynamic needed.
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

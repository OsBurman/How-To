// SOLUTION: Modern bootstrap — replaces the legacy platformBrowserDynamic().bootstrapModule() call.
// Instead of bootstrapping an entire NgModule, modern Angular bootstraps a single
// standalone component with a config object.
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Modern standalone bootstrap — replaces platformBrowserDynamic().bootstrapModule(AppModule).
// bootstrapApplication() takes the root component and an ApplicationConfig object.
// No NgModule is needed.
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));

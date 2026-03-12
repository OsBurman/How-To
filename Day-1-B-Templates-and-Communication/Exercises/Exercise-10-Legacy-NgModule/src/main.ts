// MODERN BOOTSTRAP — this is the starting point.
// After converting to legacy NgModule, you'll replace this with platformBrowserDynamic().bootstrapModule(AppModule)
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

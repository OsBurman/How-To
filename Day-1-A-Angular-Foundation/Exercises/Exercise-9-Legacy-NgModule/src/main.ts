// MODERN entry point — this is what students will REPLACE with the legacy pattern.
// Currently uses bootstrapApplication() to launch a standalone component.
// Students will convert this to platformBrowserDynamic().bootstrapModule(AppModule).
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

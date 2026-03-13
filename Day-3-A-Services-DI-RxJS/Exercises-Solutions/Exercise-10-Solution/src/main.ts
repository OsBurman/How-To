// MODERN BOOTSTRAP — replaces platformBrowserDynamic().bootstrapModule(AppModule).
// bootstrapApplication() is the standalone equivalent.
// app.module.ts is no longer needed and can be deleted.
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

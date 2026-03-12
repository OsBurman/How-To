// LEGACY entry point — uses platformBrowserDynamic().bootstrapModule() to launch the root NgModule.
// Students will REPLACE this with the modern bootstrapApplication() pattern.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));

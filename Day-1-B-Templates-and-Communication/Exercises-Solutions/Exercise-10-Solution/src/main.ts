// SOLUTION: Legacy bootstrap — replaces the modern bootstrapApplication() call.
// Instead of bootstrapping a single standalone component with a config object,
// legacy Angular bootstraps an entire NgModule that contains the root component.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));

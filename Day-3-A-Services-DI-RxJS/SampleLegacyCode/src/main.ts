// LEGACY main.ts — bootstraps via NgModule, not bootstrapApplication().
// Modern pattern uses: bootstrapApplication(AppComponent, appConfig)
// Legacy pattern uses: platformBrowserDynamic().bootstrapModule(AppModule)
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

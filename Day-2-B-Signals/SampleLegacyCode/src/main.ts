// Legacy main.ts — NgModule bootstrap
// MODERN: bootstrapApplication(AppComponent, appConfig)
// LEGACY: bootstrapModule() requires a root NgModule class
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

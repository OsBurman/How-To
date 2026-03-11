import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// This is the entry point — it starts the app with AppComponent
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

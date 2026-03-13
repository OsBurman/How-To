import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedFormComponent } from './feed-form/feed-form.component';

// LEGACY: NgModule is the old way to group and configure Angular components.
//
// In the NgModule pattern:
//   - Every component must be listed in `declarations` — Angular won't recognise
//     a component selector unless the module knows about it.
//   - Shared Angular features (*ngIf, *ngFor, async pipe) come from CommonModule.
//   - Two-way binding with [(ngModel)] comes from FormsModule.
//   - BrowserModule replaces CommonModule for the ROOT module only.
//
// TODO Step 2: Once all three components have standalone: true, delete this entire file.
//             Update main.ts to use bootstrapApplication(AppComponent, appConfig).
@NgModule({
  declarations: [
    AppComponent,
    FeedListComponent,
    FeedFormComponent
  ],
  imports: [
    BrowserModule,  // Provides platform services + everything in CommonModule (root module only)
    CommonModule,   // Provides *ngIf, *ngFor, async pipe (for non-root modules — listed here for clarity)
    FormsModule     // Provides [(ngModel)]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

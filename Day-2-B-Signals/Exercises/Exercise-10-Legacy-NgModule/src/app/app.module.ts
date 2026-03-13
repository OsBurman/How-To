// LEGACY: NgModule — the central registry for all components in the old Angular model.
// Every component must be declared in a NgModule's `declarations` array before it can be used.
// TODO (step 7): Delete this file entirely once you've converted both components to standalone: true.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

@NgModule({
  declarations: [
    AppComponent,           // registered here — not standalone
    NotificationListComponent  // registered here — not standalone
  ],
  imports: [
    BrowserModule           // provides common directives like *ngFor, *ngIf
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

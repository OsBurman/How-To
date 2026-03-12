// app.module.ts — Exercise 9: LEGACY NgModule
// This is the root NgModule. Every component and pipe used in this app
// must be DECLARED here. This is what made Angular apps so coupled before v17.
//
// Notice:
// - All four components AND the TruncatePipe are in declarations[]
// - BrowserModule (which re-exports CommonModule) gives all components
//   access to *ngIf, *ngFor, [ngSwitch], DatePipe, CurrencyPipe, etc.
// - No component can import its own dependencies — everything flows through here.
//
// The modern equivalent: standalone components each declare their own imports[].

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookCardComponent } from './book-card/book-card.component';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,    // declared here — not standalone
    BookCardComponent,    // declared here — not standalone
    StatusBadgeComponent, // declared here — not standalone
    TruncatePipe          // declared here — available to ALL components in this module
  ],
  imports: [
    BrowserModule  // re-exports CommonModule: *ngIf, *ngFor, [ngSwitch], built-in pipes
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

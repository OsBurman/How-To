// SOLUTION: This file is NEW — it does not exist in the modern starter app.
// NgModule is the legacy way Angular organized components into groups.
// Every component had to be "declared" in exactly one module.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessageCardComponent } from './message-card/message-card.component';

@NgModule({
  // declarations: Every component, directive, and pipe that belongs to this module.
  // In legacy Angular, if you forgot to add a component here, it simply wouldn't work
  // — and the error message was often confusing.
  declarations: [
    AppComponent,
    MessageCardComponent
  ],
  // imports: Other modules whose exported directives/pipes this module needs.
  // BrowserModule provides core directives like NgIf, NgFor (legacy versions).
  // FormsModule provides [(ngModel)] support.
  imports: [
    BrowserModule,
    FormsModule
  ],
  // providers: Services available to all components in this module.
  // (None needed for this exercise.)
  providers: [],
  // bootstrap: The root component Angular creates and inserts into index.html.
  // Only the root module uses this property.
  bootstrap: [AppComponent]
})
export class AppModule { }

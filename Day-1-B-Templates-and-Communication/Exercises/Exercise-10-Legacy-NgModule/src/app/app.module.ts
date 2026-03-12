// LEGACY root NgModule — registers all components and imports FormsModule for [(ngModel)].
// In modern Angular, this entire file is replaced by standalone components + app.config.ts.
// Students will DELETE this file after converting to the modern pattern.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MessageCardComponent } from './message-card/message-card.component';

@NgModule({
  // declarations — both components are registered here; neither is standalone
  declarations: [AppComponent, MessageCardComponent],
  // imports — BrowserModule required in root; FormsModule enables [(ngModel)] for ALL declared components
  imports: [BrowserModule, FormsModule],
  providers: [],
  // bootstrap — tells Angular which component to render first
  bootstrap: [AppComponent]
})
export class AppModule { }

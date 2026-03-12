// LEGACY root NgModule — the central organizing mechanism that registers all components.
// In modern Angular, this entire file is replaced by standalone components + app.config.ts.
// Students will DELETE this file after converting to the modern pattern.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BannerModule } from './banner/banner.module';
import { InfoCardModule } from './info-card/info-card.module';

@NgModule({
  // declarations — every component must be listed in exactly one module's declarations array
  declarations: [AppComponent],
  // imports — BrowserModule is required in the root module; feature modules make their components available
  imports: [BrowserModule, BannerModule, InfoCardModule],
  providers: [],
  // bootstrap — tells Angular which component to render first
  bootstrap: [AppComponent]
})
export class AppModule { }

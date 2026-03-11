import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BannerModule } from './banner/banner.module';
import { InfoCardModule } from './info-card/info-card.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BannerModule,
    InfoCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

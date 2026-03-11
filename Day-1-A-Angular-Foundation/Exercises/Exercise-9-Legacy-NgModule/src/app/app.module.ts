// TODO: This is the ROOT NgModule — the legacy equivalent of app.config.ts + bootstrapApplication().
//
// In legacy Angular, every app needed a root module decorated with @NgModule.
// This module:
//   1. Declares the root component (AppComponent)
//   2. Imports BrowserModule (required in every root module) and feature modules
//   3. Lists providers (empty for now — same as the providers array in app.config.ts)
//   4. Specifies the bootstrap component (the first component Angular renders)
//
// INSTRUCTIONS:
// 1. Import NgModule from '@angular/core'
// 2. Import BrowserModule from '@angular/platform-browser'
// 3. Import AppComponent from './app.component'
// 4. Import BannerModule from './banner/banner.module'
// 5. Import InfoCardModule from './info-card/info-card.module'
// 6. Fill in the @NgModule decorator below
// 7. Export the AppModule class

// TODO: Add your imports here

@NgModule({
  declarations: [
    // TODO: Add AppComponent here — this is the only component declared directly in the root module
  ],
  imports: [
    // TODO: Add BrowserModule, BannerModule, and InfoCardModule here
    // BrowserModule is required in the root module for browser apps
    // BannerModule makes <app-banner> available in AppComponent's template
    // InfoCardModule makes <app-info-card> available in AppComponent's template
  ],
  providers: [],
  bootstrap: [
    // TODO: Add AppComponent here — tells Angular which component to render first
  ]
})
export class AppModule { }

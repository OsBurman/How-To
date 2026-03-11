// TODO: This is a FEATURE MODULE — the legacy way to make a component available to other parts of the app.
//
// In legacy Angular, you couldn't just import a component directly.
// You had to:
//   1. Declare the component in a module's declarations array
//   2. Import CommonModule (provides *ngIf, *ngFor, pipes, etc.)
//   3. Export the component so other modules can use its selector (<app-banner>)
//
// This entire file is unnecessary in modern Angular — standalone: true on the
// component itself replaces all of this boilerplate.
//
// INSTRUCTIONS:
// 1. Import NgModule from '@angular/core'
// 2. Import CommonModule from '@angular/common'
// 3. Import BannerComponent from './banner.component'
// 4. Fill in the @NgModule decorator below
// 5. Export the BannerModule class

// TODO: Add your imports here

@NgModule({
  declarations: [
    // TODO: Add BannerComponent here — registers it in this module
    // A component can only be declared in ONE module
  ],
  imports: [
    // TODO: Add CommonModule here — required in feature modules for standard Angular directives
  ],
  exports: [
    // TODO: Add BannerComponent here — makes <app-banner> usable by any module that imports BannerModule
    // Without this, BannerComponent stays private to this module
  ]
})
export class BannerModule { }

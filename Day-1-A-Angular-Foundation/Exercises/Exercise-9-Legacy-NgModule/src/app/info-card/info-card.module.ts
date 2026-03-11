// TODO: This is a FEATURE MODULE — same pattern as BannerModule.
//
// Every component that needs to be used outside its own module must be:
//   1. Declared in this module's declarations array
//   2. Exported in this module's exports array
//
// Modules that want to use <app-info-card> in their templates must
// import InfoCardModule in their own imports array.
//
// INSTRUCTIONS:
// 1. Import NgModule from '@angular/core'
// 2. Import CommonModule from '@angular/common'
// 3. Import InfoCardComponent from './info-card.component'
// 4. Fill in the @NgModule decorator below
// 5. Export the InfoCardModule class

// TODO: Add your imports here

@NgModule({
  declarations: [
    // TODO: Add InfoCardComponent here
  ],
  imports: [
    // TODO: Add CommonModule here
  ],
  exports: [
    // TODO: Add InfoCardComponent here
  ]
})
export class InfoCardModule { }

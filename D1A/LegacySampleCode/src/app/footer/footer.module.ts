/**
 * legacy/footer.module.ts — Feature Module for FooterComponent (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * Same pattern as HeaderModule — a dedicated NgModule that declares, imports,
 * and exports a single component. In a real legacy app, you would have dozens
 * of these module files, one per feature area.
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - This entire file is unnecessary in modern Angular.
 * - FooterComponent with standalone: true manages its own dependencies
 *   and can be imported directly by any other component.
 *
 * PAIN POINTS THIS CAUSED:
 * 1. Creating a new component meant editing (or creating) a module file every time.
 * 2. Deleting a component meant cleaning up the module's declarations and exports too.
 * 3. The module indirection made it hard to trace which components were available where —
 *    you had to follow the chain: component → module → parent module imports.
 *
 * CLI command (legacy): ng generate module footer
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required in every feature module

import { FooterComponent } from './footer.component';

@NgModule({
  // declarations: FooterComponent belongs to this module.
  // Modern equivalent: standalone: true on FooterComponent.
  declarations: [
    FooterComponent
  ],

  // imports: CommonModule for standard Angular directives and pipes.
  // Modern equivalent: Import only what the component template actually uses.
  imports: [
    CommonModule
  ],

  // exports: Makes FooterComponent available to any module that imports FooterModule.
  // Without this line, importing FooterModule would be useless — <app-footer> still wouldn't work.
  // Modern equivalent: Not needed — standalone components are self-contained.
  exports: [
    FooterComponent
  ]
})
export class FooterModule {
  // Empty class body — pure boilerplate.
}

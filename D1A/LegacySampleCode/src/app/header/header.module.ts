/**
 * legacy/header.module.ts — Feature Module for HeaderComponent (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * In legacy Angular, every feature area had its own NgModule. Even a single
 * component like HeaderComponent needed a dedicated module file to:
 *   1. Declare the component (declarations array)
 *   2. Export it so other modules can use <app-header> (exports array)
 *   3. Import any Angular modules the component's template needs (imports array)
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - This entire file is unnecessary in modern Angular.
 * - With standalone: true, HeaderComponent declares its own dependencies
 *   in its own imports array — no wrapper module needed.
 * - Any other component can use <app-header> by adding HeaderComponent
 *   to its own imports array — no exports/imports module dance.
 *
 * PAIN POINTS THIS CAUSED:
 * 1. Every new component required creating (or editing) a module file — extra boilerplate.
 * 2. If you forgot to add the component to exports, other modules couldn't use it,
 *    and the error message ("not a known element") didn't tell you the fix was in exports.
 * 3. CommonModule had to be imported in every feature module that used *ngIf or *ngFor —
 *    forget it and those directives silently stop working.
 * 4. Circular imports between modules were common and painful to debug.
 *
 * CLI command (legacy): ng generate module header
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required in feature modules for *ngIf, *ngFor, pipes, etc.

import { HeaderComponent } from './header.component';

@NgModule({
  // declarations: Components that belong to THIS module.
  // HeaderComponent can only be declared in ONE module — if another module
  // also tries to declare it, Angular throws a "declared in 2 modules" error.
  // Modern equivalent: standalone: true on the component itself — no module needed.
  declarations: [
    HeaderComponent
  ],

  // imports: Other modules whose directives/pipes this module's components need.
  // CommonModule provides *ngIf, *ngFor, pipes like | uppercase, | date, etc.
  // Every feature module needs CommonModule (only the ROOT module uses BrowserModule).
  // Modern equivalent: Each component imports only what it needs in its own imports array.
  imports: [
    CommonModule
  ],

  // exports: Components this module makes available to other modules that import HeaderModule.
  // If you forget this line, AppModule can import HeaderModule but still can't use <app-header>.
  // Modern equivalent: Not needed — standalone components are always available to anyone who imports them.
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
  // Empty class body — all configuration is in the @NgModule decorator.
  // This entire file is boilerplate that standalone components eliminated.
}

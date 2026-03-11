/**
 * legacy/app.component.ts — Root Component (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * In legacy Angular, components do NOT have standalone: true and do NOT
 * have their own imports array. Instead, they rely on the NgModule they
 * belong to for dependency resolution.
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - No standalone: true → The component must be listed in a module's declarations.
 * - No imports: [] → The component cannot declare its own dependencies. If it
 *   needs <app-header>, AppModule must import HeaderModule (which declares and
 *   exports HeaderComponent). You can't tell from THIS file what dependencies
 *   are available — you have to check AppModule's imports array.
 * - This made it impossible to look at a component file and know what
 *   dependencies it uses — you had to find its module to see the full picture.
 *
 * CLI command: ng generate component app (in a legacy project without --standalone)
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Same selector as modern version
  // NO standalone: true — this component MUST be registered in AppModule.declarations
  // NO imports: [] — dependencies come from the NgModule, not from this component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Note: legacy used styleUrls (plural array); modern uses styleUrl (singular)
})
export class AppComponent {
  // Same property as the modern version — the component class code is identical.
  // The difference is entirely in how the component is registered and how its
  // dependencies (HeaderComponent, FooterComponent) are resolved.
  readonly appTitle: string = 'My Angular App (Legacy)';
}

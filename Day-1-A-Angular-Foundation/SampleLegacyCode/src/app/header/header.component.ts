/**
 * legacy/header.component.ts — Header Component (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - No standalone: true → This component must be declared in HeaderModule's
 *   declarations array, and HeaderModule must export it so other modules can use it.
 * - No imports: [] → If this component needed to use another component or directive
 *   in its template, that dependency's module would need to be imported into
 *   HeaderModule's imports array.
 * - @Input() decorator works exactly the same in both legacy and modern.
 *   (Signal-based input() is the modern replacement, taught on Day 2.)
 *
 * CLI command: ng generate component header (in a legacy project)
 */

import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header', // Same selector in both legacy and modern
  // NO standalone: true — must be declared in HeaderModule (its feature module)
  // NO imports: [] — dependencies come from the module
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Legacy uses styleUrls (plural array)
  encapsulation: ViewEncapsulation.Emulated // Same default in both legacy and modern
})
export class HeaderComponent {
  // @Input() works identically in legacy and modern Angular.
  // The difference is not in how data flows into the component,
  // but in how the component is REGISTERED with the framework.
  @Input() title: string = 'Default Title';
}

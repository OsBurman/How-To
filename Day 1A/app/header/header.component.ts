/**
 * header.component.ts — Header Component
 *
 * Demonstrates:
 * - A standalone child component with its own selector
 * - @Input() decorator — receives data from the parent component
 * - ViewEncapsulation.Emulated — styles in this component are scoped and do NOT leak
 *   to sibling or parent components. Angular achieves this by adding unique attributes
 *   to the component's DOM elements at runtime.
 *
 * CLI command that generated this component:
 *   ng generate component header --standalone
 */

import { Component, Input, ViewEncapsulation } from '@angular/core'; // Import decorator and encapsulation enum

@Component({
  selector: 'app-header',               // This component renders wherever <app-header> appears
  standalone: true,                      // No NgModule required
  imports: [],                           // No child components needed in the header
  templateUrl: './header.component.html',// Separate template file
  styleUrl: './header.component.css',    // Separate styles file
  encapsulation: ViewEncapsulation.Emulated // DEFAULT — styles are scoped to this component only
  // Emulated is actually the default, so you don't need to write this line.
  // We include it here explicitly so you can see what Angular does behind the scenes.
})
export class HeaderComponent {
  // @Input() tells Angular this property receives its value from a parent component.
  // In the parent template: <app-header [title]="appTitle"></app-header>
  // The parent's appTitle value flows DOWN into this title property.
  @Input() title: string = 'Default Title'; // Fallback value if parent doesn't provide one
}

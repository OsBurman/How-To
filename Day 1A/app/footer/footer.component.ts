/**
 * footer.component.ts — Footer Component
 *
 * Demonstrates:
 * - A standalone child component that manages its own data (no @Input needed)
 * - Using a class property (currentYear) computed at instantiation time
 * - How standalone components are self-contained units
 *
 * CLI command that generated this component:
 *   ng generate component footer --standalone
 */

import { Component } from '@angular/core'; // Import the Component decorator

@Component({
  selector: 'app-footer',                // Renders wherever <app-footer> appears
  standalone: true,                       // No NgModule required
  imports: [],                            // No child components needed in the footer
  templateUrl: './footer.component.html', // Separate template file
  styleUrl: './footer.component.css'      // Separate styles file
  // ViewEncapsulation.Emulated is the default — no need to specify it explicitly
})
export class FooterComponent {
  // This property is computed once when the component is created.
  // It uses standard JavaScript — new Date().getFullYear() returns the current year.
  currentYear: number = new Date().getFullYear(); // Displays the current year in the footer
}

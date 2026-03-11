/**
 * footer.component.ts — Displays a simple footer with the current year.
 *
 * WHAT THIS FILE DEMONSTRATES:
 * - A standalone component with NO @Input() — not every component needs inputs
 * - A component property (currentYear) computed in the class and displayed in the template
 * - This is the simplest possible component: no inputs, no outputs, no lifecycle hooks
 * - standalone: true — no NgModule needed
 *
 * CLI equivalent: `ng generate component footer` (shorthand: `ng g c footer`)
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  /**
   * currentYear — computed once when the component is created.
   * No @Input() needed — this value is generated internally.
   * The template displays it via interpolation: {{ currentYear }}
   */
  currentYear: number = new Date().getFullYear();
}

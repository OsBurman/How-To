/**
 * footer.component.ts — Footer Component
 *
 * A standalone component that renders the page footer.
 * Demonstrates a component that manages its own data internally
 * (currentYear) rather than receiving it from a parent via @Input().
 *
 * KEY CONCEPT: Component with internal state only
 * Not every component needs @Input() or @Output(). FooterComponent
 * manages its own currentYear property and doesn't communicate
 * with the parent at all. This is perfectly fine for static or
 * self-contained UI sections.
 *
 * CLI command that generated this file:
 *   ng generate component footer --standalone
 *   (shorthand: ng g c footer --standalone)
 */

import { Component } from '@angular/core'; // Component decorator

@Component({
  selector: 'app-footer', // Use this component as <app-footer> in templates
  standalone: true, // Self-contained — no NgModule needed
  imports: [], // No child components or directives needed
  templateUrl: './footer.component.html', // External template — always multi-file
  styleUrl: './footer.component.css' // External styles — always multi-file
})
export class FooterComponent {
  /**
   * currentYear — calculated once when the component is created.
   *
   * In vanilla JS, you'd put new Date().getFullYear() directly in the HTML
   * or use document.getElementById to set it. In Angular, you define it as
   * a class property and use interpolation {{ currentYear }} in the template.
   *
   * readonly means this value cannot be changed after it's set.
   * This is a TypeScript best practice for values that shouldn't mutate.
   */
  readonly currentYear: number = new Date().getFullYear(); // Gets the current year (e.g., 2026)
}

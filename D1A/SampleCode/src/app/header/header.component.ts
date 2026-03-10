/**
 * header.component.ts — Header Component
 *
 * A standalone component that renders the page header.
 * Accepts a title from its parent via @Input().
 *
 * KEY CONCEPT: @Input() decorator
 * @Input() marks a property as receivable from a parent component.
 * The parent binds a value using [title]="someValue" in its template.
 * Data flows ONE direction: parent → child. The child cannot send
 * data back through an @Input(). (For that, you'd use @Output()
 * which we cover in Day 1 Part B.)
 *
 * KEY CONCEPT: ViewEncapsulation.Emulated
 * By default, Angular uses Emulated encapsulation — styles defined
 * in this component's CSS file are scoped to this component only.
 * They will NOT leak into sibling or parent components.
 * We set it explicitly here so you can see it in the code.
 * You could also set ViewEncapsulation.None to make styles global,
 * or ViewEncapsulation.ShadowDom for true Shadow DOM isolation.
 *
 * CLI command that generated this file:
 *   ng generate component header --standalone
 *   (shorthand: ng g c header --standalone)
 */

import { Component, Input, ViewEncapsulation } from '@angular/core'; // Import decorators and encapsulation enum

@Component({
  selector: 'app-header', // Use this component as <app-header> in templates
  standalone: true, // No NgModule needed — this component is self-contained
  imports: [], // No child components or directives used in this template
  templateUrl: './header.component.html', // External template — always multi-file
  styleUrl: './header.component.css', // External styles — always multi-file
  encapsulation: ViewEncapsulation.Emulated // Explicitly set — this is the default
  // Emulated means Angular adds unique attributes (like _ngcontent-abc-123) to
  // this component's HTML and rewrites the CSS selectors to include those attributes.
  // Result: styles in header.component.css ONLY apply to HeaderComponent's template.
  // The .header-title styles below will NOT affect any <h1> in AppComponent or FooterComponent.
})
export class HeaderComponent {
  /**
   * @Input() title — receives the page title from the parent component.
   *
   * Usage in parent template:
   *   <app-header [title]="appTitle"></app-header>
   *
   * The ! (definite assignment assertion) tells TypeScript this property
   * will be set by the parent before use. Alternatively you can provide
   * a default value: title: string = 'Default Title';
   */
  @Input() title: string = 'Default Title'; // Receives value from parent via property binding
}

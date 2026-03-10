/**
 * app.component.ts — Root Component
 *
 * AppComponent is the root of the entire application. Every other component
 * renders inside this one. It demonstrates:
 * - The @Component decorator with standalone: true
 * - The imports array — how standalone components register their dependencies
 * - Using child components (HeaderComponent and FooterComponent) in the template
 *
 * CLI command that generated this component:
 *   ng generate component app --standalone (auto-generated with the project)
 */

import { Component } from '@angular/core';                          // Core decorator
import { HeaderComponent } from './header/header.component';        // Import child component
import { FooterComponent } from './footer/footer.component';        // Import child component

@Component({
  selector: 'app-root',               // The HTML tag used to render this component: <app-root>
  standalone: true,                    // This component does not belong to any NgModule
  imports: [HeaderComponent, FooterComponent], // Register child components — without this, Angular cannot find them
  templateUrl: './app.component.html', // Points to the separate HTML template file
  styleUrl: './app.component.css'      // Points to the separate CSS file
})
export class AppComponent {
  // The title property is passed to HeaderComponent via @Input()
  appTitle: string = 'My Angular App'; // Simple string property used in the template

  /**
   * ⚠️ "NOT A KNOWN ELEMENT" ERROR
   *
   * If you forget to add HeaderComponent to the imports array above,
   * Angular will throw this error:
   *
   *   'app-header' is not a known element:
   *   1. If 'app-header' is an Angular component, verify it is included in the
   *      '@Component.imports' of this component.
   *   2. If 'app-header' is a Web Component, add 'CUSTOM_ELEMENTS_SCHEMA' to
   *      '@Component.schemas' of this component.
   *
   * THE FIX: Add the missing component to the imports array.
   * This is the #1 beginner mistake in standalone Angular.
   */
}

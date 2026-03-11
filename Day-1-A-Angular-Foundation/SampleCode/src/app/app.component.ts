/**
 * app.component.ts — Root Application Component
 *
 * This is the root component that Angular renders first.
 * It imports and renders HeaderComponent and FooterComponent.
 *
 * KEY CONCEPT: standalone: true
 * Standalone components declare their own dependencies in the
 * imports array — no NgModule needed. This is the modern Angular
 * pattern (Angular 17+). Every component in this project is standalone.
 *
 * KEY CONCEPT: The imports array
 * In standalone components, the imports array lists every component,
 * directive, and pipe that THIS component's template uses. If you
 * forget to add a component here, you'll get the dreaded
 * "not a known element" error.
 *
 * CLI command that generated this file:
 *   ng new my-app --standalone
 *   (AppComponent is created automatically as the root component)
 */

import { Component } from '@angular/core'; // Component decorator — required for every component
import { HeaderComponent } from './header/header.component'; // Child component — renders the page header
import { FooterComponent } from './footer/footer.component'; // Child component — renders the page footer

@Component({
  selector: 'app-root', // The HTML tag Angular uses to render this component: <app-root></app-root>
  standalone: true, // This component manages its own dependencies — no NgModule required
  imports: [
    HeaderComponent, // Register HeaderComponent so the template can use <app-header>
    FooterComponent  // Register FooterComponent so the template can use <app-footer>
  ],
  templateUrl: './app.component.html', // External template file — always use templateUrl, never inline
  styleUrl: './app.component.css' // External styles file — always use styleUrl, never inline
})
export class AppComponent {
  /**
   * The app title, passed down to HeaderComponent via @Input().
   * This demonstrates parent-to-child data flow:
   *   AppComponent (parent) → HeaderComponent (child)
   */
  readonly appTitle: string = 'My Angular App'; // Property that will be bound to HeaderComponent's title input

  /*
   * ──────────────────────────────────────────────────────
   * ⚠️ THE "NOT A KNOWN ELEMENT" ERROR
   * ──────────────────────────────────────────────────────
   *
   * If you forget to add HeaderComponent to the imports array above,
   * Angular will throw this error in the browser console:
   *
   *   ERROR NG8001: 'app-header' is not a known element:
   *   1. If 'app-header' is an Angular component, then verify that
   *      it is included in the '@Component.imports' of this component.
   *   2. If 'app-header' is a Web Component, add 'CUSTOM_ELEMENTS_SCHEMA'
   *      to the '@Component.schemas' of this component.
   *
   * THE FIX (two seconds):
   *   1. Import the component class at the top of this file
   *   2. Add it to the imports array in the @Component decorator
   *
   * This is the #1 beginner mistake in Angular. If you see this error,
   * check your imports array first — 99% of the time that's the fix.
   * ──────────────────────────────────────────────────────
   */
}

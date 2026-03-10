/**
 * legacy/app.module.ts — Root NgModule (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * NgModule was the central organizing mechanism in legacy Angular.
 * Every component, directive, and pipe had to be listed in a module's
 * declarations array before it could be used anywhere.
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - The entire @NgModule decorator is unnecessary in modern Angular.
 * - declarations: [] → Each component is standalone: true and imports its own deps.
 * - imports: [BrowserModule] → bootstrapApplication() handles this automatically.
 * - bootstrap: [AppComponent] → bootstrapApplication(AppComponent) handles this.
 * - providers: [] → Moved to app.config.ts as a simple object.
 *
 * PAIN POINTS THIS CAUSED:
 * 1. Forgetting to add a component to declarations caused cryptic errors.
 * 2. A component could only belong to ONE module — shared components required
 *    creating a SharedModule and importing it everywhere.
 * 3. Large apps ended up with dozens of feature modules, each with its own
 *    declarations, imports, and exports arrays — lots of boilerplate.
 * 4. Circular dependency issues between modules were common and hard to debug.
 */

import { NgModule } from '@angular/core'; // The NgModule decorator — the heart of legacy Angular
import { BrowserModule } from '@angular/platform-browser'; // Required in the root module for browser apps

// Every component must be imported and registered in declarations
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  // declarations: Every component, directive, and pipe that belongs to this module.
  // If you forget to list a component here, you get:
  //   "app-header is not a known element"
  // Modern equivalent: Each component declares standalone: true and lists its own imports.
  declarations: [
    AppComponent,    // Root component
    HeaderComponent, // Must be declared here so AppComponent's template can use <app-header>
    FooterComponent  // Must be declared here so AppComponent's template can use <app-footer>
  ],

  // imports: Other modules whose exported components/directives/pipes this module needs.
  // BrowserModule provides essential directives like *ngIf and *ngFor and sets up the browser platform.
  // Modern equivalent: bootstrapApplication() handles browser setup; directives are imported per-component.
  imports: [
    BrowserModule // Required in root module — provides browser-specific services
  ],

  // providers: Services available app-wide. Empty here because Day 1 has no services.
  // Modern equivalent: providers array in app.config.ts
  providers: [],

  // bootstrap: The component Angular renders first when the module loads.
  // Modern equivalent: First argument to bootstrapApplication(AppComponent)
  bootstrap: [
    AppComponent // Angular renders this component into the <app-root> element in index.html
  ]
})
export class AppModule {
  // The class body is empty — all configuration lives in the @NgModule decorator.
  // This empty class was required boilerplate in every legacy Angular app.
}

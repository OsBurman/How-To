/**
 * legacy/app.module.ts — Root NgModule (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * NgModule was the central organizing mechanism in legacy Angular.
 * Every component, directive, and pipe had to be listed in a module's
 * declarations array before it could be used anywhere. In larger apps,
 * components were grouped into FEATURE MODULES — each feature had its
 * own NgModule that declared and exported its components.
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - The entire @NgModule decorator is unnecessary in modern Angular.
 * - declarations: [] → Each component is standalone: true and imports its own deps.
 * - imports: [BrowserModule, HeaderModule, FooterModule] → No module imports needed;
 *   components import other components directly.
 * - bootstrap: [AppComponent] → bootstrapApplication(AppComponent) handles this.
 * - providers: [] → Moved to app.config.ts as a simple object.
 *
 * PAIN POINTS THIS CAUSED:
 * 1. Every component needed a module — either its own feature module or to be added
 *    to an existing module's declarations array.
 * 2. If a component wasn't exported from its module, other modules couldn't use it,
 *    and the error message didn't tell you the fix was in the exports array.
 * 3. A component could only belong to ONE module — sharing required creating
 *    SharedModules and importing them everywhere.
 * 4. The root module grew into a massive list of imported feature modules.
 * 5. Circular dependency issues between modules were common and hard to debug.
 */

import { NgModule } from '@angular/core'; // The NgModule decorator — the heart of legacy Angular
import { BrowserModule } from '@angular/platform-browser'; // Required in the root module for browser apps

// Root component — the only component declared directly in AppModule
import { AppComponent } from './app.component';

// Feature modules — each wraps a component in its own NgModule.
// In legacy Angular, you couldn't just import a component directly.
// You had to import the MODULE that declared and exported it.
// Modern equivalent: import { HeaderComponent } from './header/header.component'
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  // declarations: Only components that belong DIRECTLY to this module.
  // HeaderComponent and FooterComponent are NOT declared here — they are
  // declared in their own feature modules (HeaderModule, FooterModule).
  // Declaring them here AND in a feature module would cause:
  //   "HeaderComponent is declared in 2 modules" error
  // Modern equivalent: Each component declares standalone: true and lists its own imports.
  declarations: [
    AppComponent // Only the root component is declared here
  ],

  // imports: Feature modules and Angular platform modules this module depends on.
  // HeaderModule makes <app-header> available in AppComponent's template.
  // FooterModule makes <app-footer> available in AppComponent's template.
  // If you forget to import a feature module, its components are invisible to this module.
  // Modern equivalent: bootstrapApplication() handles browser setup;
  //   components import other components directly in their own imports array.
  imports: [
    BrowserModule,  // Required in root module — provides browser-specific services
    HeaderModule,   // Makes <app-header> available — because HeaderModule exports HeaderComponent
    FooterModule    // Makes <app-footer> available — because FooterModule exports FooterComponent
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

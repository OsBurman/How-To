/**
 * legacy/app.module.ts — Root NgModule (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * In legacy Angular, NgModule was the central organizing mechanism.
 * Every component had to be listed in a module's declarations array.
 * FormsModule had to be imported here (not in the component) for
 * [(ngModel)] to work ANYWHERE in the app.
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - declarations: [] → Each component is standalone: true and imports its own deps.
 * - FormsModule imported once in the root module vs. imported directly in each component
 *   that needs it. The modern approach is more explicit — you see exactly which
 *   components use forms features.
 * - imports: [BrowserModule, FormsModule] → No module imports needed; components
 *   import only what they use.
 * - bootstrap: [AppComponent] → bootstrapApplication(AppComponent) handles this.
 *
 * PAIN POINTS THIS CAUSED:
 * 1. Forgetting FormsModule in imports silently breaks [(ngModel)] — no error, just nothing happens.
 * 2. All components share the same module dependencies — you can't tell from a component
 *    file which directives it actually uses.
 * 3. Adding a new component required editing this file every time.
 * 4. In large apps, this declarations array grew to dozens of components.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)] across ALL components

import { AppComponent } from './app.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CharacterCounterComponent } from './character-counter/character-counter.component';

@NgModule({
  // declarations: Every component that belongs to this module.
  // In legacy Angular, a component MUST be declared in exactly ONE module.
  // If you forget to list it here, you get "is not a known element" errors.
  // Modern equivalent: Each component has standalone: true — no declarations needed.
  declarations: [
    AppComponent,
    ProductCardComponent,
    CharacterCounterComponent
    // No SignalCounterComponent — signals are a modern-only feature.
    // In legacy Angular, there was no equivalent to signal() and computed().
  ],

  // imports: Angular modules and feature modules.
  // FormsModule is imported HERE, not in the components — this is a key difference.
  // In modern Angular, CharacterCounterComponent imports FormsModule directly in its
  // own imports array, making the dependency explicit and localized.
  // Modern equivalent: Each component lists its dependencies in its own imports array.
  imports: [
    BrowserModule, // Required in root module — provides browser-specific services
    FormsModule    // Required for [(ngModel)] — imported once, available to ALL components
  ],

  // providers: Empty for Day 1. Services would be registered here.
  // Modern equivalent: providers array in app.config.ts
  providers: [],

  // bootstrap: The component Angular renders first.
  // Modern equivalent: First argument to bootstrapApplication(AppComponent)
  bootstrap: [AppComponent]
})
export class AppModule {
  // Empty class body — all configuration lives in the @NgModule decorator.
  // This boilerplate class was required in every legacy Angular app.
}

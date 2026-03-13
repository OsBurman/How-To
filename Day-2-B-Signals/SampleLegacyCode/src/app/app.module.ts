// app.module.ts — Root NgModule
//
// LEGACY PAIN: Every component must be declared here.
// Forgetting a declaration causes a "not a known element" template error.
// Adding a new component means touching two files: the component AND this module.
//
// MODERN EQUIVALENT: Standalone components with imports: [] on each component.
// No central registry. Each component declares its own dependencies.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OnChangesDemoComponent } from './on-changes-demo/on-changes-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    OnChangesDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

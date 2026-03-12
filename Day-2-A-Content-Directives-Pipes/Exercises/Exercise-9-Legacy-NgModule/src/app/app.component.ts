// app.component.ts — Exercise 9: LEGACY root component
// In NgModule apps, AppComponent is declared in AppModule.declarations[].
// It has no standalone: true and no imports[] of its own.

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // No standalone: true — this component belongs to AppModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

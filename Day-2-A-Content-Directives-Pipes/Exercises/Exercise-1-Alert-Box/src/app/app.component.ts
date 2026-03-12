/**
 * app.component.ts
 *
 * Root component for Exercise 1 — Alert Box.
 * This file is complete — no changes needed here.
 *
 * AppComponent imports AlertBoxComponent and renders three of them
 * in the template, each with different projected content.
 * Your work is in alert-box.component.html and alert-box.component.css.
 */

import { Component } from '@angular/core';
import { AlertBoxComponent } from './alert-box/alert-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlertBoxComponent],  // AlertBoxComponent is registered here so we can use <app-alert-box>
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

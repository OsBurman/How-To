/**
 * alert-box.component.ts
 *
 * CONCEPT: ng-content single-slot projection
 *
 * AlertBoxComponent wraps projected content in a styled card.
 * The parent decides what HTML goes inside — the component just provides
 * the visual frame (border, background, padding).
 *
 * This file is complete. Your work is in alert-box.component.html.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  standalone: true,
  imports: [],  // ng-content requires no imports — it is a built-in Angular placeholder
  templateUrl: './alert-box.component.html',
  styleUrl: './alert-box.component.css'
})
export class AlertBoxComponent {}

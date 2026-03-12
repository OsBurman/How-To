// app.component.ts — Exercise 5: Style Playground
// Demonstrates: [ngStyle] and [ngClass] on a live preview element

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // FormsModule is needed for [(ngModel)] on the control inputs
  // NgClass and NgStyle are the directives you'll apply in the template
  imports: [FormsModule, NgClass, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // --- Properties bound to the controls ---
  // These are all pre-wired — you do NOT need to change this file.

  // Font size in pixels (controlled by a range slider)
  fontSize: number = 16;

  // Text and background colours (controlled by colour pickers)
  textColor: string = '#222222';
  bgColor: string = '#ffffff';

  // Boolean flags (controlled by checkboxes)
  // These map to CSS classes defined in app.component.css
  isBold: boolean = false;
  highContrast: boolean = false;
}

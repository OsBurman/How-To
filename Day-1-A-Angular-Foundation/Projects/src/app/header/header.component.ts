/**
 * header.component.ts — Displays the app title in a styled banner.
 *
 * WHAT THIS FILE DEMONSTRATES:
 * - standalone: true — this component is self-contained, no NgModule needed
 * - @Input() title — the parent passes the page title via property binding
 * - ViewEncapsulation.Emulated (the default) — the blue background and white
 *   text styles defined in header.component.css are SCOPED to this component.
 *   They will NOT leak into BioCardComponent or any other component.
 * - templateUrl and styleUrl — always separate files
 *
 * CLI equivalent: `ng generate component header` (shorthand: `ng g c header`)
 */

import { Component, Input } from '@angular/core';

@Component({
  // selector — use this tag in a parent template: <app-header>
  selector: 'app-header',

  // standalone: true — manages its own dependencies
  standalone: true,

  // imports — empty because this template uses no other components or directives
  imports: [],

  // Separate template and style files — never inline
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  /**
   * @Input() marks this property as receivable from a parent component.
   * The parent binds to it with: <app-header [title]="pageTitle">
   * Data flows one direction only: parent → child.
   */
  @Input() title = 'My App';
}

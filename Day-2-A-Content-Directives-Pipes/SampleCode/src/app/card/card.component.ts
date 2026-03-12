/**
 * card.component.ts — Single-Slot Content Projection
 *
 * CONCEPT: ng-content (single slot)
 *
 * CardComponent wraps any projected content in a styled card frame.
 * The parent decides what HTML goes inside — the card just provides structure.
 *
 * Key idea: ng-content is like a picture frame.
 *   - The frame (CardComponent) is always the same.
 *   - The picture (projected content from the parent) changes each time.
 *
 * Without ng-content: anything placed inside <app-card>...</app-card>
 * tags in the parent template would be SILENTLY IGNORED.
 *
 * With ng-content: that HTML renders exactly where <ng-content> is placed.
 *
 * CLI command: ng generate component card
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],             // no child components needed — ng-content requires no imports
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  // No class logic needed — the parent is responsible for all content.
  // The component's only job is to provide the styled wrapper in its template.
}

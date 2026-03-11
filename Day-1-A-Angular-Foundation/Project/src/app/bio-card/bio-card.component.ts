/**
 * bio-card.component.ts — Displays a personal bio card with avatar, name, role, and bio.
 *
 * WHAT THIS FILE DEMONSTRATES:
 * - Multiple @Input() properties — this component receives FOUR inputs from its parent
 * - Each @Input() is a separate piece of data the parent controls
 * - ViewEncapsulation.Emulated — the card's shadow, border-radius, and layout styles
 *   are scoped to THIS component. They will NOT affect the HeaderComponent's styles,
 *   even though both components use border-radius and padding.
 * - standalone: true — no NgModule needed
 *
 * CLI equivalent: `ng generate component bio-card` (shorthand: `ng g c bio-card`)
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bio-card',
  standalone: true,

  // No child components used in this template, so imports is empty
  imports: [],

  templateUrl: './bio-card.component.html',
  styleUrl: './bio-card.component.css'
})
export class BioCardComponent {
  /**
   * Four @Input() properties — the parent sets each one via property binding:
   *   <app-bio-card [name]="userName" [role]="userRole" [bio]="userBio" [avatarUrl]="userAvatarUrl">
   *
   * Each @Input() creates a one-way data flow: parent → child.
   * The child cannot send data back through @Input() — for that you'd use @Output() (Day 1 Part B).
   */

  // The person's display name
  @Input() name = '';

  // Their job title or role
  @Input() role = '';

  // A short biography paragraph
  @Input() bio = '';

  // URL for the avatar image
  @Input() avatarUrl = '';
}

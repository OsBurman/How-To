/**
 * skill-badge.component.ts — Displays a single skill as a styled badge.
 *
 * WHAT THIS FILE DEMONSTRATES:
 * - @Input() on a small, reusable component — one input, one job
 * - This component is rendered multiple times by the parent, each time
 *   with a different [skillName] value. This is the core pattern for
 *   rendering lists of data with components.
 * - standalone: true — no NgModule needed
 *
 * CLI equivalent: `ng generate component skill-badge` (shorthand: `ng g c skill-badge`)
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-badge',
  standalone: true,
  imports: [],
  templateUrl: './skill-badge.component.html',
  styleUrl: './skill-badge.component.css'
})
export class SkillBadgeComponent {
  /**
   * @Input() skillName — the text displayed inside the badge.
   * The parent passes it via: <app-skill-badge [skillName]="skills[0]">
   *
   * This component is intentionally simple — it receives one piece of data
   * and displays it. Reusable components are often this small.
   */
  @Input() skillName = '';
}

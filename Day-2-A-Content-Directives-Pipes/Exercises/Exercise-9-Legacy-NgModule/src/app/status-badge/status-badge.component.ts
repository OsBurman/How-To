// status-badge.component.ts — Exercise 9: LEGACY
// Displays a coloured status badge using [ngSwitch] / *ngSwitchCase.
// Declared in AppModule — no standalone: true.

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  // LEGACY: no standalone: true
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.css']
})
export class StatusBadgeComponent {
  @Input() status: 'available' | 'checked-out' | 'reserved' = 'available';
}

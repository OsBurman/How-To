// modern/status-badge/status-badge.component.ts — Exercise 9: MODERN SKELETON
// Same @Input as the legacy version — the key differences are:
//   1. standalone: true  (instead of declared in AppModule)
//   2. imports: [NgClass]  (direct import — no shared module)
//   3. Template uses @switch  (instead of [ngSwitch] + *ngSwitchCase)

// TODO Step 4a — Add standalone: true to the @Component decorator
// TODO Step 4b — Add NgClass to the imports array (import { NgClass } from '@angular/common')

import { Component, Input } from '@angular/core';
// TODO: import NgClass from @angular/common

@Component({
  selector: 'app-status-badge',
  // TODO: standalone: true,
  // TODO: imports: [NgClass],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  // Same input as the legacy version — no change needed here
  @Input() status: 'available' | 'checked-out' | 'reserved' = 'available';
}

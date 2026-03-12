// modern/status-badge/status-badge.component.ts — Exercise 9 SOLUTION
// CONCEPT: standalone: true on a component that was previously NgModule-declared

import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,      // SOLUTION: no NgModule declaration needed
  imports: [NgClass],    // SOLUTION: NgClass imported directly — no BrowserModule
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  // @Input() unchanged — same in both legacy and modern versions
  @Input() status: 'available' | 'checked-out' | 'reserved' = 'available';
}

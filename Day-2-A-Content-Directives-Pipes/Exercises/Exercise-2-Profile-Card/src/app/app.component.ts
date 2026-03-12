/**
 * app.component.ts
 *
 * Root component for Exercise 2 — Profile Card with Named Slots.
 * This file is complete — no changes needed here.
 *
 * It imports ProfileCardComponent and renders two instances in the template,
 * each with content targeted at the three named slots.
 */

import { Component } from '@angular/core';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCardComponent],  // needed so <app-profile-card> is recognised in the template
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

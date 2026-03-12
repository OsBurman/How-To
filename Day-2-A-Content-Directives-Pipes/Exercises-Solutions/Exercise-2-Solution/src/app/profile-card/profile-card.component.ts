/**
 * profile-card.component.ts — Exercise 2 SOLUTION
 * CONCEPTS: Named ng-content slots with select, ngAfterContentInit
 *
 * SOLUTION:
 * 1. AfterContentInit imported alongside Component
 * 2. 'implements AfterContentInit' added to the class
 * 3. ngAfterContentInit() calls console.log() — fires once per instance
 *    AFTER Angular projects the named slot content into the component.
 *    If you log in ngOnInit() instead, the slots are not yet filled.
 */

import { Component, AfterContentInit } from '@angular/core';
// AfterContentInit is the interface that requires ngAfterContentInit()

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],  // ng-content slots need no imports — they are built-in
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements AfterContentInit {

  // Angular calls this once, after content projection is complete.
  // ngOnInit fires BEFORE projection — this is the correct hook for
  // reacting to projected content.
  ngAfterContentInit(): void {
    console.log('Profile card content projected!');
  }
}

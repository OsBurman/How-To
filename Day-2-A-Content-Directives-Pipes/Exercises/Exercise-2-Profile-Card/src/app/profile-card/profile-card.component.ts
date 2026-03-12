/**
 * profile-card.component.ts
 *
 * CONCEPTS: Named ng-content slots with select, ngAfterContentInit
 *
 * ProfileCardComponent is a reusable card with three distinct regions:
 *   - header (avatar + name)
 *   - body (bio text)
 *   - footer (action buttons)
 *
 * TASKS:
 * 1. Add the three named <ng-content> slots in profile-card.component.html.
 * 2. Implement AfterContentInit here:
 *    a. Import AfterContentInit from '@angular/core'
 *    b. Add 'implements AfterContentInit' to the class declaration
 *    c. Add ngAfterContentInit() and call console.log('Profile card content projected!')
 */

import { Component } from '@angular/core';
// TODO: also import AfterContentInit from '@angular/core'

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
// TODO: add 'implements AfterContentInit' after AppComponent
export class ProfileCardComponent {

  // TODO: implement ngAfterContentInit()
  // ngAfterContentInit(): void {
  //   console.log('Profile card content projected!');
  // }

}

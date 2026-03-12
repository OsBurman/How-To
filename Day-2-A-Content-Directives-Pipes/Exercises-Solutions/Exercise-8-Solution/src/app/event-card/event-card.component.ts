// event-card.component.ts — Exercise 8 SOLUTION
// CONCEPTS: Named ng-content slots, ngAfterContentInit, @Input(), [ngStyle]

import { Component, Input, AfterContentInit } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [NgStyle],  // NgStyle required for [ngStyle] on the card wrapper
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements AfterContentInit {

  // STEP 2a SOLUTION: @Input() borderColor receives a hex colour from the parent.
  // The parent passes it as [borderColor]="event.accentColor".
  // It is applied in the template via [ngStyle] on the card wrapper.
  @Input() borderColor: string = '#cbd5e1';

  // STEP 2b SOLUTION: ngAfterContentInit fires once, after Angular projects
  // all named slot content into this component.
  // ngOnInit fires BEFORE projection — this hook is the correct one
  // when you need to react after the slots are filled.
  ngAfterContentInit(): void {
    console.log('EventCard content projected!');
  }
}

// event-card.component.ts — Exercise 8: Event Dashboard
//
// TASKS IN THIS FILE:
//   Step 2a — Add a @Input() borderColor property (type string, default '#cbd5e1')
//             so the parent can pass a dynamic accent colour per card.
//   Step 2b — Implement ngAfterContentInit: log 'EventCard content projected!' to console.
//
// TASKS IN event-card.component.html:
//   Step 2c — Replace the three <!-- TODO --> comments with named <ng-content> slots.

import { Component, Input, AfterContentInit } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  // NgStyle is imported for the [ngStyle] binding on the card wrapper in the template
  imports: [NgStyle],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements AfterContentInit {
  // TODO Step 2a: add @Input() borderColor: string = '#cbd5e1';
  // This will be used in the template as [ngStyle]="{ 'border-left-color': borderColor }"

  ngAfterContentInit(): void {
    // TODO Step 2b: log 'EventCard content projected!' to the console
  }
}

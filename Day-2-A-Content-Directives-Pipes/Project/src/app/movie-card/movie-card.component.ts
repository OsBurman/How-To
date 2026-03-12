/**
 * movie-card.component.ts — Reusable Movie Card (named ng-content slots)
 *
 * This component wraps projected content inside a styled card shell.
 * It does NOT know what's inside it — the parent decides what HTML fills each slot.
 * That's the entire point of content projection: the parent controls the content,
 * the child controls the layout and styling around it.
 *
 * Concepts demonstrated:
 *   - Named ng-content slots (three slots: poster, title, details)
 *   - ngAfterContentInit — logs when projected content is ready
 *   - @Input() for the accent colour
 *   - [ngStyle] applied in the template driven by @Input()
 */

import { Component, Input, AfterContentInit } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,      // no NgModule required
  imports: [NgStyle],    // [ngStyle] is used in the template for the left-border colour
  templateUrl: './movie-card.component.html',
  styleUrl:    './movie-card.component.css'
})
export class MovieCardComponent implements AfterContentInit {

  // The parent passes the genre accent colour to drive the left border via [ngStyle]
  @Input() borderColor: string = '#2d3561';  // default: muted blue-grey

  // ngAfterContentInit fires AFTER Angular has projected content into all ng-content slots.
  // This is LATER than ngOnInit (which fires before projection).
  // Use this hook when you need to know that projected content is available.
  // Note: @ContentChild is not used here — that's an Extended Topics concept.
  ngAfterContentInit(): void {
    console.log('MovieCard: projected content is ready — ngAfterContentInit fired');
  }
}

/**
 * layout-card.component.ts — Named ng-content Slots + ngAfterContentInit
 *
 * CONCEPTS:
 *
 * 1. Named ng-content slots
 *    The template uses select="[slot=header]" (a CSS attribute selector) to
 *    route projected content into the correct named region. The parent marks
 *    its content with slot="header", slot="body", or slot="footer".
 *
 * 2. ngAfterContentInit lifecycle hook
 *    Fires ONCE, after Angular has finished projecting content into this
 *    component. Fires AFTER ngOnInit.
 *    Purpose here: observe when the hook fires in the browser console.
 *
 *    NOTE: @ContentChild is NOT demonstrated here — it is an Extended Topic.
 *    The sole purpose of ngAfterContentInit in this example is to show
 *    WHEN the hook fires, nothing more.
 *
 * CLI command: ng generate component layout-card
 */

import { Component, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-layout-card',
  standalone: true,
  imports: [],
  templateUrl: './layout-card.component.html',
  styleUrl: './layout-card.component.css'
})
export class LayoutCardComponent implements AfterContentInit {

  ngAfterContentInit(): void {
    // This hook fires AFTER Angular completes content projection into this component.
    // It fires AFTER ngOnInit — so at this point all projected slots are populated.
    // Open the browser console to observe this message when the page loads.
    console.log('[LayoutCardComponent] ngAfterContentInit — projected content is now ready');
  }

}

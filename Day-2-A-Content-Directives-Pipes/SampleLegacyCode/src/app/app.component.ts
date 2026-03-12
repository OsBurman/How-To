/**
 * app.component.ts — Root Component (Legacy)
 *
 * LEGACY PATTERN: Component declared in AppModule (not standalone).
 * Notice: no 'standalone' property, no 'imports' array.
 * This component is usable only because AppModule declares it.
 *
 * MODERN REPLACEMENT:
 *   standalone: true
 *   imports: [TaskListComponent, MovieListComponent]
 *   (no NgModule involved)
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // LEGACY: NO standalone: true — this component is owned by AppModule
  // LEGACY: NO imports array — child components are wired through AppModule.declarations
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // Note: legacy uses styleUrls (array), modern uses styleUrl (single string)
})
export class AppComponent {
  readonly title = 'D2A Legacy — Content Projection, Directives & Pipes';
}

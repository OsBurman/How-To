/**
 * legacy/footer.component.ts — Footer Component (Legacy Pattern)
 *
 * THIS IS THE LEGACY PATTERN — shown for comparison only.
 *
 * WHAT STANDALONE COMPONENTS REPLACED:
 * - No standalone: true → This component is registered in AppModule.declarations.
 * - No imports: [] → Module handles all dependency resolution.
 * - The component class itself is identical to the modern version.
 *   The only difference is in the @Component metadata (no standalone, styleUrls vs styleUrl).
 *
 * CLI command: ng generate component footer (in a legacy project)
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer', // Same selector in both legacy and modern
  // NO standalone: true — registered in AppModule.declarations instead
  // NO imports: [] — module resolves dependencies
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // Legacy uses styleUrls (plural array)
})
export class FooterComponent {
  // Component class is identical to modern version.
  // The class code doesn't change — only the registration mechanism changes.
  readonly currentYear: number = new Date().getFullYear();
}

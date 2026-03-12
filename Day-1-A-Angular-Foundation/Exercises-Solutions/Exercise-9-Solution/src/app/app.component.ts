// SOLUTION: Converted from legacy NgModule-declared to modern standalone component.
// Changes made:
//   1. Added standalone: true — this component manages its own dependencies
//   2. Added imports: [BannerComponent, InfoCardComponent] — declares what this component uses
//   3. Added TypeScript imports for BannerComponent and InfoCardComponent at the top
//   4. Changed styleUrls (plural array) to styleUrl (singular string) — modern syntax
import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { InfoCardComponent } from './info-card/info-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BannerComponent, InfoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }

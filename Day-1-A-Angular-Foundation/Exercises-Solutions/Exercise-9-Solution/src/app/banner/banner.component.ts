// SOLUTION: Converted from legacy NgModule-declared to modern standalone component.
// Changes made:
//   1. Added standalone: true
//   2. Added imports: [] (no dependencies)
//   3. Changed styleUrls (plural array) to styleUrl (singular string)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input() title: string = 'Welcome';
}

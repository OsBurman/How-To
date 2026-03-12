// SOLUTION: Converted from legacy NgModule-declared to modern standalone component.
// Changes made:
//   1. Added standalone: true
//   2. Added imports: [] (no dependencies)
//   3. Changed styleUrls (plural array) to styleUrl (singular string)
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() heading: string = '';
  @Input() description: string = '';
}

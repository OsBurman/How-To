// MODERN standalone InfoCardComponent — students will convert this to a legacy component
// wrapped in an InfoCardModule feature module.
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

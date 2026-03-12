// LEGACY InfoCardComponent — declared in InfoCardModule, not standalone.
// Students will convert this to a modern standalone component.
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent {
  @Input() heading: string = '';
  @Input() description: string = '';
}

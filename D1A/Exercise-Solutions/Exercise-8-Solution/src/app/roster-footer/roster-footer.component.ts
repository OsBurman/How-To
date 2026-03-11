import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-roster-footer',
  standalone: true,
  imports: [],
  templateUrl: './roster-footer.component.html',
  styleUrl: './roster-footer.component.css'
})
export class RosterFooterComponent {
  @Input() totalMembers: number = 0;
}

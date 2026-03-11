import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-roster-header',
  standalone: true,
  imports: [],
  templateUrl: './roster-header.component.html',
  styleUrl: './roster-header.component.css'
})
export class RosterHeaderComponent {
  @Input() teamName: string = 'Our Team';
}

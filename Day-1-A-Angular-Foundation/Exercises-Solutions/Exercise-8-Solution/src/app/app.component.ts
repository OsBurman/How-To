import { Component } from '@angular/core';
import { RosterHeaderComponent } from './roster-header/roster-header.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { RosterFooterComponent } from './roster-footer/roster-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RosterHeaderComponent, MemberCardComponent, RosterFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }

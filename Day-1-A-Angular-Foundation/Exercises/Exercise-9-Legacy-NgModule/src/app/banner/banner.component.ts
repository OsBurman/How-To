// MODERN standalone BannerComponent — students will convert this to a legacy component
// wrapped in a BannerModule feature module.
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

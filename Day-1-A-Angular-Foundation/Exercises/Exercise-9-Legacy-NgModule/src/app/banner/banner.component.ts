// LEGACY BannerComponent — declared in BannerModule, not standalone.
// Students will convert this to a modern standalone component.
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  @Input() title: string = 'Welcome';
}

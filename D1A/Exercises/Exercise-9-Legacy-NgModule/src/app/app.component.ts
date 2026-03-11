// MODERN standalone AppComponent — students will convert this to a legacy non-standalone component.
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

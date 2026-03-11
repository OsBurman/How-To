import { Component } from '@angular/core';
import { InfoCardComponent } from './info-card/info-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InfoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }

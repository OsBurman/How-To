import { Component } from '@angular/core';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { InfoBoxComponent } from './info-box/info-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlertBoxComponent, InfoBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }

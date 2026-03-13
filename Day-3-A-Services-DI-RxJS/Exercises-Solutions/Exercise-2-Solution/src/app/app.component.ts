import { Component } from '@angular/core';
import { CounterDisplayComponent } from './counter-display/counter-display.component';
import { CounterControlsComponent } from './counter-controls/counter-controls.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Both child components must be listed here so Angular recognises their selectors.
    CounterDisplayComponent,
    CounterControlsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

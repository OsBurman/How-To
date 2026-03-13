import { Component } from '@angular/core';
// TODO 4: Import CounterDisplayComponent and CounterControlsComponent.
//   import { CounterDisplayComponent } from './counter-display/counter-display.component';
//   import { CounterControlsComponent } from './counter-controls/counter-controls.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // TODO 4: Add CounterDisplayComponent and CounterControlsComponent here.
    // Once added, Angular will recognize <app-counter-display> and <app-counter-controls>
    // in the template below.
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

import { Component } from '@angular/core';
// TODO (Step 7): Import CountdownComponent and add it to the imports array

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // TODO: Add CountdownComponent here once you've built it
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Controls whether the countdown component is shown
  showTimer: boolean = true;

  // Toggles the timer on/off — when toggled off, Angular destroys the component
  toggleTimer(): void {
    this.showTimer = !this.showTimer;
  }
}

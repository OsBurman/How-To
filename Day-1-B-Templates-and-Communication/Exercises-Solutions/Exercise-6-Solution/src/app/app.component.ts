import { Component } from '@angular/core';
import { CountdownComponent } from './countdown/countdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CountdownComponent // Register child so <app-countdown> works in template
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

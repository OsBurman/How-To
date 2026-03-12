import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // The user's name — displayed via interpolation
  userName: string = 'Angela';

  // Tracks how many times the button has been clicked
  clickCount: number = 0;

  // Increments the click count each time the Greet button is clicked
  onGreet(): void {
    this.clickCount++;
  }
}

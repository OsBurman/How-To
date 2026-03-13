import { Component, signal } from '@angular/core';
import { RatingDisplayComponent } from './rating-display/rating-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RatingDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Current rating score — controlled by the slider in the template
  readonly score = signal(3);

  // Pre-wired to the slider — no changes needed here
  onScoreChange(event: Event): void {
    this.score.set(+(event.target as HTMLInputElement).value);
  }
}

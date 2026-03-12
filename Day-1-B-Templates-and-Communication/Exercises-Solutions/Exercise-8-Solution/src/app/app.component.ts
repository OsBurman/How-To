import { Component } from '@angular/core';
// SOLUTION: Import FeedbackFormComponent so we can render it in the template
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

// Interface for the feedback data received from the child component
interface Feedback {
  reviewer: string;
  product: string;
  comment: string;
  rating: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // SOLUTION: Add FeedbackFormComponent here so you can use <app-feedback-form> in the template
    FeedbackFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // SOLUTION: Stores the last feedback received — starts as null (no feedback yet)
  lastFeedback: Feedback | null = null;

  // SOLUTION: Receives the feedback object from the child and stores it in lastFeedback
  onFeedback(fb: Feedback): void {
    this.lastFeedback = fb;
  }
}

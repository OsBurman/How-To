import { Component } from '@angular/core';
// TODO: Import FeedbackFormComponent and add it to the imports array below

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
    // TODO: Add FeedbackFormComponent here so you can use <app-feedback-form> in the template
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Stores the last feedback received — starts as null (no feedback yet)
  // TODO: Add the lastFeedback property
  // lastFeedback: Feedback | null = null;

  // TODO: Implement onFeedback() — receives the feedback object from the child
  // and stores it in lastFeedback
  // onFeedback(fb: Feedback): void {
  //   this.lastFeedback = fb;
  // }
}

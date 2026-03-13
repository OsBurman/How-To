import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedService } from '../services/feed.service';

// MODERN: standalone: true + inject() + imports: [FormsModule]
//
// What changed:
//   - standalone: false → standalone: true
//   - constructor(private feedService: FeedService) → inject()
//   - FormsModule was provided by AppModule; now each standalone component
//     imports its own dependencies directly — no shared module to inherit from.
//   - ngOnDestroy() removed — there was nothing to unsubscribe from.
//     (The original legacy version had ngOnDestroy as scaffolding — in this exercise
//     there are no subscriptions in FeedFormComponent to clean up.)
@Component({
  selector: 'app-feed-form',
  standalone: true,
  imports: [FormsModule],  // [(ngModel)] requires FormsModule — imported here, not from AppModule
  templateUrl: './feed-form.component.html',
  styleUrl: './feed-form.component.css'
})
export class FeedFormComponent {

  private readonly feedService = inject(FeedService);

  newMessage = '';

  addMessage(): void {
    const trimmed = this.newMessage.trim();
    if (trimmed) {
      this.feedService.addMessage(trimmed);
      this.newMessage = '';
    }
  }
}

import { Component } from '@angular/core';
import { FeedService } from '../services/feed.service';

// LEGACY COMPONENT — uses constructor injection and relies on FormsModule
// being imported in AppModule to enable [(ngModel)].
//
// Conversion checklist for this file:
//   TODO Step 1 : Add  standalone: true  to the @Component decorator
//   TODO Step 3 : Add  imports: [FormsModule]  to the decorator
//                 (standalone components must import their own dependencies)
//   TODO Step 5 : Replace  constructor(private readonly feedService: FeedService) {}
//                 with     private readonly feedService = inject(FeedService);
//                 Then remove the constructor.
@Component({
  selector: 'app-feed-form',
  templateUrl: './feed-form.component.html',
  styleUrl: './feed-form.component.css'
  // No standalone: true — this component is declared in AppModule.
})
export class FeedFormComponent {
  // LEGACY: Constructor injection.
  // TODO Step 5: Replace with inject().
  constructor(private readonly feedService: FeedService) {}

  // Holds the current value of the message input.
  newMessage = '';

  addMessage(): void {
    const trimmed = this.newMessage.trim();
    if (trimmed) {
      this.feedService.addMessage(trimmed);
      this.newMessage = '';
    }
  }
}

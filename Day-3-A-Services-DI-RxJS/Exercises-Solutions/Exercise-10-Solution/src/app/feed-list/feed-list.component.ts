import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeedService } from '../services/feed.service';

// MODERN: standalone: true + inject() + toSignal()
//
// What was removed:
//   - standalone: false → standalone: true
//   - constructor(private feedService: FeedService) → inject()
//   - messages$ Observable + async pipe → toSignal()
//   - implements OnDestroy, destroy$ Subject, takeUntil(), ngOnDestroy() → ALL DELETED
//   - trackByIndex() → no longer needed; @for uses track natively
//
// What replaced it:
//   - inject() gives us the service without a constructor
//   - toSignal() subscribes and manages unsubscription automatically
//   - @if/@for replace *ngIf/*ngFor in the template
@Component({
  selector: 'app-feed-list',
  standalone: true,
  imports: [],  // No CommonModule needed — @if/@for are built into Angular's template engine
  templateUrl: './feed-list.component.html',
  styleUrl: './feed-list.component.css'
})
export class FeedListComponent {

  private readonly feedService = inject(FeedService);

  // toSignal() with initialValue: [] ensures the signal is always string[],
  // never undefined — no null guard needed in the template.
  readonly messages = toSignal(this.feedService.messages, { initialValue: [] as string[] });
}

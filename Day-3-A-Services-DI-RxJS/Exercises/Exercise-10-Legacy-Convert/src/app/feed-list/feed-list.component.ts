import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FeedService } from '../services/feed.service';

// LEGACY COMPONENT — deliberately uses the old patterns.
// Run the app first to see it working, then convert it step by step.
//
// Conversion checklist for this file:
//   TODO Step 1 : Add  standalone: true  to the @Component decorator
//   TODO Step 3 : Add  imports: [NgIf, NgFor, AsyncPipe]  OR  imports: [CommonModule]  to the decorator
//   TODO Step 5 : Replace constructor injection with  private readonly feedService = inject(FeedService)
//                 Then remove the constructor entirely.
//   TODO Step 6 : Replace  messages$ = this.feedService.messages  with
//                   readonly messages = toSignal(this.feedService.messages, { initialValue: [] as string[] })
//   TODO Step 7 : Delete the destroy$ Subject, takeUntil pipe, and the entire ngOnDestroy method.
//                 The subscription below exists only to demonstrate the legacy cleanup pattern —
//                 once you switch to toSignal(), there is no manual subscription to clean up.
//   TODO Step 8 : Update the template (see feed-list.component.html).
@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrl: './feed-list.component.css'
  // No standalone: true — this component is declared in AppModule.
})
export class FeedListComponent implements OnDestroy {
  // LEGACY: Constructor injection.
  // Angular resolves FeedService from the module injector and passes it here.
  constructor(private readonly feedService: FeedService) {
    // LEGACY: takeUntil pattern — subscribe here and unsubscribe in ngOnDestroy.
    // This subscription just logs to show the stream is active.
    // In the modern version, toSignal() handles the subscription automatically.
    this.feedService.messages
      .pipe(takeUntil(this.destroy$))
      .subscribe(msgs => console.log(`[FeedList] message count: ${msgs.length}`));
  }

  // LEGACY: Expose the Observable directly for the async pipe in the template.
  // TODO Step 6: Replace with toSignal().
  readonly messages$ = this.feedService.messages;

  // LEGACY: takeUntil pattern requires a Subject to trigger unsubscription.
  // TODO Step 7: Delete this field once you remove all manual subscriptions.
  private readonly destroy$ = new Subject<void>();

  // LEGACY: ngOnDestroy is required when you have manual subscriptions.
  // TODO Step 7: Delete this method once all subscriptions are managed by Angular.
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // LEGACY: trackBy function used by *ngFor to identify items by index.
  // In modern @for, you write:  @for (msg of messages(); track $index)
  // TODO Step 8b: Delete this method when you switch to @for.
  trackByIndex(index: number): number {
    return index;
  }
}

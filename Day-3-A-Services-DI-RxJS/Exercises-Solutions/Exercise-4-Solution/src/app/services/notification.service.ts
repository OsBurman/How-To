import { Injectable, DestroyRef, inject } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  // DestroyRef tells Angular when this service is being destroyed.
  // We pass it to takeUntilDestroyed() so the timer subscription auto-cancels
  // if the service is ever torn down (rare for root services, but correct practice).
  private readonly destroyRef = inject(DestroyRef);

  // Subject<string[]> — NOT BehaviorSubject.
  // Notifications are an event stream. New subscribers should NOT receive old messages.
  // BehaviorSubject always replays its current value — Subject does not.
  private readonly notifications$ = new Subject<string[]>();

  // Internal array tracks the active notification list.
  // Subject emits snapshots; it doesn't store the array.
  private current: string[] = [];

  // Expose as read-only Observable so components can subscribe but can't push.
  readonly notifications = this.notifications$.asObservable();

  push(message: string): void {
    // Capture the index before pushing so the auto-dismiss timer references the right slot.
    const index = this.current.length;
    this.current.push(message);

    // Emit a snapshot of the full current array — immutable spread means subscribers
    // can't mutate our internal array.
    this.notifications$.next([...this.current]);

    // Auto-dismiss: after 3 seconds, remove this notification.
    // takeUntilDestroyed() cancels the timer if the service is destroyed, preventing leaks.
    timer(3000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.dismiss(index));
  }

  dismiss(index: number): void {
    // Remove the notification at the given index and re-emit the updated list.
    this.current.splice(index, 1);
    this.notifications$.next([...this.current]);
  }
}

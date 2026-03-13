import { Injectable, DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// ─── Notification interface ──────────────────────────────────────────────────
// A single toast notification with an id for stable @for tracking.

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

// ─── NotificationService ────────────────────────────────────────────────────
// Demonstrates:
//   • Subject (not BehaviorSubject) — notifications are events, not persistent
//     state. New subscribers don't need to see old toasts.
//   • timer() — emits once after a delay, used for auto-dismiss
//   • takeUntilDestroyed(destroyRef) — cancels the timer subscription when
//     the service is destroyed, preventing memory leaks
// ────────────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class NotificationService {

  // DestroyRef lets us hook into Angular's destroy lifecycle from a service,
  // so takeUntilDestroyed() can cancel live timers on app teardown.
  private readonly destroyRef = inject(DestroyRef);

  // Subject — event stream, not state. No initial value, no replay.
  private readonly notificationsSub$ = new Subject<Notification[]>();

  // Internal array tracks current toasts — the Subject emits snapshots of it.
  private current: Notification[] = [];
  private nextId = 1;

  // Public Observable — components subscribe to get live toast updates
  readonly notifications = this.notificationsSub$.asObservable();

  // ── push ───────────────────────────────────────────────────────────────────
  // Add a toast and schedule its auto-removal after 3 seconds.
  push(message: string, type: Notification['type'] = 'info'): void {
    const notification: Notification = { id: this.nextId++, message, type };

    this.current = [...this.current, notification];
    this.notificationsSub$.next([...this.current]); // emit snapshot

    // timer(3000) emits one value after 3 seconds then completes.
    // takeUntilDestroyed() cancels this subscription if Angular destroys
    // the service before the 3 seconds elapse — no dangling subscriptions.
    timer(3000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.dismiss(notification.id));
  }

  // ── dismiss ────────────────────────────────────────────────────────────────
  // Remove a toast by id (called by auto-timer or manual close button).
  dismiss(id: number): void {
    this.current = this.current.filter(n => n.id !== id);
    this.notificationsSub$.next([...this.current]);
  }
}

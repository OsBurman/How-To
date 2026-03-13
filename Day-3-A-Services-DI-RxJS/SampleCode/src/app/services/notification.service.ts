// NotificationService — demonstrates:
//   Subject (not BehaviorSubject) — no initial value; only future emissions matter
//   timer()               — creates an Observable that emits once after a delay
//   takeUntilDestroyed()  — auto-unsubscribes when the injected context is destroyed
//
// Design note:
//   Notifications are an EVENT stream, not STATE. We don't need new subscribers to
//   get "missed" notifications. That's why Subject is correct here, not BehaviorSubject.
import { Injectable, DestroyRef, inject } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

  // Subject vs BehaviorSubject:
  //   BehaviorSubject — has a current value; new subscribers get the latest immediately.
  //   Subject         — NO initial value; subscribers only receive FUTURE emissions.
  //   Notifications don't need to replay to late subscribers → Subject is correct here.
  private readonly notifications$ = new Subject<Notification[]>();

  // Internal state — not exposed directly so consumers can't push values in
  private current: Notification[] = [];

  // DestroyRef — injected so takeUntilDestroyed() can clean up timer subscriptions
  // when this service instance is destroyed (unlikely for root scope, but best practice)
  private readonly destroyRef = inject(DestroyRef);

  // Exposed as a read-only Observable
  readonly notifications: Observable<Notification[]> = this.notifications$.asObservable();

  push(message: string, type: Notification['type'] = 'info'): void {
    const notification: Notification = { id: Date.now(), message, type };

    // Immutable update — create a new array instead of mutating this.current
    this.current = [...this.current, notification];
    this.notifications$.next([...this.current]);

    // timer() — emits a single value after 4000ms, then completes.
    // Used here to auto-dismiss the notification.
    //
    // takeUntilDestroyed(this.destroyRef) — automatically unsubscribes when
    // the DestroyRef is triggered. Without this, if a service were destroyed
    // while a timer was running, the timer callback would still execute
    // and attempt to push to a dead Subject — a memory leak.
    timer(4000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.dismiss(notification.id));
  }

  dismiss(id: number): void {
    this.current = this.current.filter(n => n.id !== id);
    this.notifications$.next([...this.current]);
  }
}

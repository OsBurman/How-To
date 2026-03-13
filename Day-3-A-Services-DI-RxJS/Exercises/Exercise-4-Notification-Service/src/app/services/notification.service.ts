import { Injectable, DestroyRef, inject } from '@angular/core';
// TODO 1: Import Subject and timer from 'rxjs'
// TODO 1: Import takeUntilDestroyed from '@angular/core/rxjs-interop'
//
// import { Subject, timer } from 'rxjs';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// A notification service that lets any component push messages.
// Each message auto-dismisses after 3 seconds using timer() + takeUntilDestroyed().
@Injectable({ providedIn: 'root' })
export class NotificationService {

  // TODO 1a: Inject DestroyRef so we can pass it to takeUntilDestroyed().
  //          inject() works here because this code runs inside Angular's injection context.
  //
  //   private readonly destroyRef = inject(DestroyRef);

  // TODO 1b: Use Subject<string[]> — NOT BehaviorSubject.
  //
  //          WHY Subject, not BehaviorSubject?
  //          Notifications are an event stream. When a new subscriber joins,
  //          it should NOT receive old notifications that have already appeared.
  //          BehaviorSubject always replays the current value to new subscribers.
  //          Subject only emits to subscribers who are listening RIGHT NOW.
  //
  //   private readonly notifications$ = new Subject<string[]>();

  // TODO 1b: Keep an internal array to track the current notification list.
  //          The Subject emits snapshots of this array — it doesn't store it.
  //
  //   private current: string[] = [];

  // TODO 1b: Expose the Subject as a read-only Observable.
  //
  //   readonly notifications = this.notifications$.asObservable();

  push(message: string): void {
    // TODO 1c:
    //   1. Push message onto this.current
    //   2. Emit the new snapshot: this.notifications$.next([...this.current])
    //   3. Set up a timer(3000) to auto-dismiss this message after 3 seconds:
    //      - Inside the timer callback, call this.dismiss() with the index of this message
    //      - Pipe the timer through takeUntilDestroyed(this.destroyRef) to prevent leaks
    //
    //   const index = this.current.length; // capture index before pushing
    //   this.current.push(message);
    //   this.notifications$.next([...this.current]);
    //   timer(3000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
    //     this.dismiss(index);
    //   });
  }

  dismiss(index: number): void {
    // TODO 1d: Remove the notification at the given index from this.current, then re-emit.
    //          Use splice or filter — either works.
    //
    //   this.current.splice(index, 1);
    //   this.notifications$.next([...this.current]);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// This service uses providedIn: 'root' — it works in BOTH NgModule-based and
// standalone Angular apps without any changes. You do NOT need to modify this file.
@Injectable({ providedIn: 'root' })
export class FeedService {
  private readonly messagesBs$ = new BehaviorSubject<string[]>([
    'Welcome to the Team Feed!',
    'Angular makes services easy.',
    'Convert this app to modern standalone!'
  ]);

  // Expose a read-only Observable. Components subscribe to this, not to messagesBs$ directly.
  readonly messages = this.messagesBs$.asObservable();

  addMessage(text: string): void {
    const current = this.messagesBs$.getValue();
    this.messagesBs$.next([...current, text]);
  }
}

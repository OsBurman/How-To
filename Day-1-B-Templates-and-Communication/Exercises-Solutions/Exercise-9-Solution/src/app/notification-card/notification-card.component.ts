import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Notification } from '../notification.model';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.css'
})
export class NotificationCardComponent implements OnInit, OnDestroy {
  // ===== @Input — receives a notification from the parent =====

  // SOLUTION: @Input() receives the notification object via [notification]="..."
  // It can be null/undefined if the array index is out of bounds after dismissals
  @Input() notification: Notification | null = null;

  // ===== @Output — emits the notification ID when dismissed =====

  // SOLUTION: @Output() sends the notification ID back to the parent
  @Output() dismiss = new EventEmitter<number>();

  // ===== Component Properties =====

  // SOLUTION: Formatted timestamp — set once in ngOnInit
  formattedTime: string = '';

  // SOLUTION: Seconds counter — incremented every second by the interval
  secondsAgo: number = 0;

  // SOLUTION: Stores the interval ID for cleanup in ngOnDestroy
  private timerId: number | null = null;

  // ===== Lifecycle Hooks =====

  // SOLUTION: ngOnInit runs once after Angular sets the @Input() values
  // 1. Capture the current time as a formatted string
  // 2. Start an interval that counts seconds since creation
  ngOnInit(): void {
    this.formattedTime = new Date().toLocaleTimeString();
    this.secondsAgo = 0;
    this.timerId = window.setInterval(() => {
      this.secondsAgo++;
    }, 1000);
  }

  // SOLUTION: ngOnDestroy runs when Angular removes this component from the DOM
  // Clear the interval to prevent "ghost timers" that keep running after removal
  ngOnDestroy(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
  }

  // ===== Methods =====

  // SOLUTION: Emit the notification's ID so the parent can remove it from the array
  // Uses safe navigation (?.) in case notification is null, with ?? -1 as a fallback
  onDismiss(): void {
    this.dismiss.emit(this.notification?.id ?? -1);
  }
}

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

  // TODO: Add @Input() for the notification data
  // The notification can be null (if the array index is out of bounds after dismissals)
  // @Input() notification: Notification | null = null;

  // ===== @Output — emits the notification ID when dismissed =====

  // TODO: Add @Output() dismiss with EventEmitter<number>
  // @Output() dismiss = new EventEmitter<number>();

  // ===== Component Properties =====

  // TODO: Add formattedTime property — set in ngOnInit to the current time string
  // formattedTime: string = '';

  // TODO: Add secondsAgo property — incremented every second by the interval
  // secondsAgo: number = 0;

  // TODO: Add private timerId to store the interval reference for cleanup
  // private timerId: number | null = null;

  // ===== Lifecycle Hooks =====

  // TODO: Implement ngOnInit()
  // 1. Set formattedTime to new Date().toLocaleTimeString()
  // 2. Set secondsAgo to 0
  // 3. Start a setInterval that increments secondsAgo every 1000ms
  //    Store the interval ID in timerId
  ngOnInit(): void {
    // this.formattedTime = new Date().toLocaleTimeString();
    // this.secondsAgo = 0;
    // this.timerId = window.setInterval(() => {
    //   this.secondsAgo++;
    // }, 1000);
  }

  // TODO: Implement ngOnDestroy()
  // Clear the interval using the stored timerId
  // This prevents "ghost timers" that keep running after the component is removed
  ngOnDestroy(): void {
    // if (this.timerId !== null) {
    //   clearInterval(this.timerId);
    // }
  }

  // ===== Methods =====

  // TODO: Implement onDismiss()
  // Emit the notification's id via the dismiss output
  // Use safe navigation: this.notification?.id ?? -1
  // onDismiss(): void {
  //   this.dismiss.emit(this.notification?.id ?? -1);
  // }
}

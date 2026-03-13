// LEGACY: NotificationListComponent — uses @Input(), @Output() EventEmitter, and ngOnChanges.
//
// TODO (step 3): Convert this component to modern patterns:
//   1. Add standalone: true to @Component
//   2. Add imports: [] to @Component (NgFor is built-in, no extra import needed)
//   3. Replace @Input() with: readonly notifications = input<Notification[]>([])
//   4. Replace @Output() + EventEmitter with: readonly dismissed = output<number>()
//   5. Replace unreadCount class property + ngOnChanges with:
//      readonly unreadCount = computed(() =>
//        this.notifications().filter(n => !n.read).length
//      );
//   6. Delete ngOnChanges and remove the SimpleChanges import
//   7. Delete the OnChanges interface from the class declaration
//   8. Add a comment explaining: "What replaced ngOnChanges, and why is it better?"

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
// NgFor and NgIf come from BrowserModule via AppModule — no import needed here in the legacy model

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

@Component({
  selector: 'app-notification-list',
  // LEGACY: no standalone: true — declared in AppModule
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnChanges {

  // LEGACY: mutable @Input() — Angular doesn't track when this changes reactively
  @Input() notifications: Notification[] = [];

  // LEGACY: @Output() + EventEmitter — the standard pre-signals event pattern
  @Output() dismissed = new EventEmitter<number>();

  // LEGACY: plain class property — recalculated manually in ngOnChanges
  unreadCount: number = 0;

  // LEGACY: ngOnChanges fires whenever a bound @Input() value reference changes.
  // It receives a SimpleChanges map: each key is an input name, each value has
  // previousValue, currentValue, and firstChange properties.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notifications']) {
      // Recalculate unreadCount every time the notifications array changes
      this.unreadCount = this.notifications.filter(n => !n.read).length;
    }
  }

  onDismiss(id: number): void {
    // LEGACY: emits the id via EventEmitter
    this.dismissed.emit(id);
  }
}

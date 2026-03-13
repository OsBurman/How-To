// computed() replaced ngOnChanges — this is the central insight of this exercise.
//
// Legacy ngOnChanges required manual tracking: check changes['notifications'],
// then manually recalculate unreadCount inside the method body.
// If you forgot to check the right key, or forgot to call the method, nothing updated.
//
// With computed(), Angular tracks the dependency on notifications() automatically.
// When the parent updates the signal, computed() re-evaluates — no manual check needed,
// no lifecycle hook needed, no risk of forgetting to recalculate.

import { Component, input, output, computed } from '@angular/core';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

@Component({
  selector: 'app-notification-list',
  standalone: true,
  // No NgFor or NgIf needed — @for and @if are built into modern Angular templates
  imports: [],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {

  // input() replaces @Input() — read-only; the parent writes this value
  readonly notifications = input<Notification[]>([]);

  // output() replaces @Output() + EventEmitter — same .emit() API, cleaner declaration
  readonly dismissed = output<number>();

  // computed() replaces the manual unreadCount recalculation in ngOnChanges.
  // Automatically re-evaluates whenever notifications() changes.
  readonly unreadCount = computed(() =>
    this.notifications().filter(n => !n.read).length
  );

  onDismiss(id: number): void {
    this.dismissed.emit(id);
  }
}

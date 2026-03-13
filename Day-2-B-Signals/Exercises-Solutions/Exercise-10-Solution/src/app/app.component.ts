import { Component, signal } from '@angular/core';
import { NotificationListComponent } from './notification-list/notification-list.component';

// AppComponent is now standalone — no NgModule needed.
// It imports NotificationListComponent directly in its @Component decorator.

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotificationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // signal<Notification[]> replaces the plain class property.
  // Angular now tracks reads of this signal and only updates affected DOM.
  readonly notifications = signal<Notification[]>([
    { id: 1, message: 'Your order has shipped.', read: false },
    { id: 2, message: 'New comment on your post.', read: false },
    { id: 3, message: 'Password changed successfully.', read: true },
  ]);

  onDismissed(id: number): void {
    // .update() creates a new array reference — signals need a new reference to detect change.
    // Never mutate the array in place (e.g., splice) — that won't trigger signal detection.
    this.notifications.update(list => list.filter(n => n.id !== id));
  }
}

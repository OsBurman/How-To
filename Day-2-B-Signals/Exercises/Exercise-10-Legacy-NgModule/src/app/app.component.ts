// LEGACY: AppComponent — not standalone; registered in AppModule.
// Holds the notification list as a plain class property (not a signal).
//
// TODO (step 4): Convert this component:
//   1. Add standalone: true to @Component
//   2. Add imports: [NotificationListComponent] to @Component
//   3. Replace the plain notifications array with signal<Notification[]>([...])
//   4. Update onDismissed() to use .update(list => list.filter(...))
//   5. Remove this component from AppModule declarations (or delete AppModule entirely)

import { Component } from '@angular/core';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

@Component({
  selector: 'app-root',
  // LEGACY: no standalone: true — this component is declared in AppModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // LEGACY: plain array property — not reactive; Angular checks this on every change detection cycle
  notifications: Notification[] = [
    { id: 1, message: 'Your order has shipped.', read: false },
    { id: 2, message: 'New comment on your post.', read: false },
    { id: 3, message: 'Password changed successfully.', read: true },
  ];

  // LEGACY: directly mutates the array using .filter()
  // After conversion, use this.notifications.update(list => list.filter(...))
  onDismissed(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}

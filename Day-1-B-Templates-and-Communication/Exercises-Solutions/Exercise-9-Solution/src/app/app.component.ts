import { Component } from '@angular/core';
import { Notification } from './notification.model';
// SOLUTION: Import NotificationCardComponent so we can render it in the template
import { NotificationCardComponent } from './notification-card/notification-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // SOLUTION: Add NotificationCardComponent so <app-notification-card> works in the template
    NotificationCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Starter data — some notifications have ALL fields,
  // while others are missing message, sender, or avatar.
  notifications: Notification[] = [
    {
      id: 1,
      title: 'Welcome to Angular!',
      message: 'Your development environment is ready.',
      sender: { name: 'Angular Team', avatar: '🅰️' }
    },
    {
      id: 2,
      title: 'Build Succeeded',
      sender: { name: 'CI Pipeline' }
    },
    {
      id: 3,
      title: 'Security Alert'
    },
    {
      id: 4,
      title: 'New Comment on PR #42',
      message: 'Looks good! Ship it.',
      sender: { name: 'Code Reviewer', avatar: '👩‍💻' }
    }
  ];

  // SOLUTION: Removes the notification with the given id from the array
  // Uses filter to create a new array without the dismissed notification
  onDismiss(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }
}

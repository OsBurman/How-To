import { Component } from '@angular/core';
import { Notification } from './notification.model';
// TODO: Import NotificationCardComponent and add it to the imports array below

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // TODO: Add NotificationCardComponent here so you can use <app-notification-card> in the template
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Starter data — notice that some notifications have ALL fields,
  // while others are missing message, sender, or avatar.
  // This is intentional — your template must handle every case gracefully.
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
      // No message — this field is undefined
      sender: { name: 'CI Pipeline' }
      // sender.avatar is also missing
    },
    {
      id: 3,
      title: 'Security Alert'
      // No message AND no sender — both undefined
    },
    {
      id: 4,
      title: 'New Comment on PR #42',
      message: 'Looks good! Ship it.',
      sender: { name: 'Code Reviewer', avatar: '👩‍💻' }
    }
  ];

  // TODO: Implement onDismiss(id: number) — removes the notification with that id
  // from the notifications array
  // onDismiss(id: number): void {
  //   this.notifications = this.notifications.filter(n => n.id !== id);
  // }
}

import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly notificationService = inject(NotificationService);

  // toSignal() converts the Subject-based Observable to a signal.
  // initialValue: [] is required here because Subject has NO current value —
  // without initialValue, the signal would start as undefined.
  readonly notifications = toSignal(
    this.notificationService.notifications,
    { initialValue: [] as string[] }
  );

  showInfo(): void {
    this.notificationService.push('ℹ️ This is an info message');
  }

  showSuccess(): void {
    this.notificationService.push('✅ Operation completed successfully');
  }

  showWarning(): void {
    this.notificationService.push('⚠️ Something needs your attention');
  }

  dismiss(index: number): void {
    this.notificationService.dismiss(index);
  }
}

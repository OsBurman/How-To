import { Component } from '@angular/core';
// TODO 2: Add inject to the import above, and add the toSignal import below.
//   import { Component, inject } from '@angular/core';
//   import { toSignal } from '@angular/core/rxjs-interop';

// TODO 2: Import NotificationService.
//   import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // TODO 2: Inject NotificationService.
  //   private readonly notificationService = inject(NotificationService);

  // TODO 2: Convert the notifications Observable to a signal.
  //         initialValue: [] is required because Subject has no initial value.
  //         Without it, the signal would start as undefined.
  //
  //   readonly notifications = toSignal(
  //     this.notificationService.notifications,
  //     { initialValue: [] as string[] }
  //   );

  showInfo(): void {
    // TODO 2: this.notificationService.push('ℹ️ This is an info message');
  }

  showSuccess(): void {
    // TODO 2: this.notificationService.push('✅ Operation completed successfully');
  }

  showWarning(): void {
    // TODO 2: this.notificationService.push('⚠️ Something needs your attention');
  }

  dismiss(index: number): void {
    // TODO 2: this.notificationService.dismiss(index);
  }
}

// AppComponent — shell of the application.
//
// Demonstrates:
//   inject()        — used here to pull in NotificationService without a constructor
//   toSignal()      — converts the notifications Observable to a signal for use in the template
//   signal()        — activeTab controls which main panel is visible
//
// The app has two tabs:
//   "Cart"       — CartHeaderComponent + CartPageComponent (the main service demo)
//   "RxJS Demo"  — RxJSOperatorsComponent (interactive operator playground)
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartHeaderComponent } from './cart-header/cart-header.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RxJSOperatorsComponent } from './rxjs-operators/rxjs-operators.component';
import { NotificationService, Notification } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CartHeaderComponent, CartPageComponent, RxJSOperatorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // inject() — no constructor needed; inject() works at the class body level
  private readonly notificationService = inject(NotificationService);

  // toSignal() converts the notifications$ Observable into a signal.
  // initialValue ensures the signal starts as [] (never undefined) before
  // the first Observable emission arrives.
  readonly notifications = toSignal(
    this.notificationService.notifications,
    { initialValue: [] as Notification[] }
  );

  // signal() — local UI state for the active tab
  readonly activeTab = signal<'cart' | 'rxjs-demo'>('cart');

  setTab(tab: 'cart' | 'rxjs-demo'): void {
    this.activeTab.set(tab);
  }

  dismiss(id: number): void {
    this.notificationService.dismiss(id);
  }
}

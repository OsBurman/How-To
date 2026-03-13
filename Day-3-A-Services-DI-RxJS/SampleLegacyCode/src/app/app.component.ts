// LEGACY AppComponent — demonstrates constructor injection.
//
// MODERN equivalent:
//   private readonly notificationService = inject(NotificationService);
//
// LEGACY pattern:
//   constructor(private notificationService: NotificationService) {}
//
// Constructor injection was the ONLY way to inject services before inject() was introduced.
// It works, but has several drawbacks:
//   1. Every dependency adds a constructor parameter — constructors become long.
//   2. You cannot inject conditionally or outside a class.
//   3. Inheritance becomes fragile — super() must receive every parent's dependencies.
//
// Also demonstrated here: the async pipe with *ngIf null guard.
//   MODERN:  notifications = toSignal(notifications$, { initialValue: [] })
//   LEGACY:  *ngIf="notifications$ | async as notifications"
//   Problem: async pipe emits null BEFORE the first Observable value arrives.
//            Without *ngIf, the template crashes when trying to @for over null.
import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from './services/cart.service';

// LEGACY: no standalone: true — components must be declared in AppModule
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // No standalone: true — this component is registered in AppModule.declarations[]
})
export class AppComponent implements OnDestroy {

  // LEGACY: constructor injection — the only way to inject services before inject()
  // Compare to modern: private readonly cartService = inject(CartService)
  // As apps grow, this list gets very long.
  constructor(private readonly cartService: CartService) {}

  // LEGACY: expose the Observable directly for use with the async pipe in the template.
  // MODERN: toSignal(this.cartService.count$, { initialValue: 0 })
  readonly cartCount$: Observable<number> = this.cartService.count$;

  // LEGACY takeUntil pattern — a Subject used as a completion signal.
  // In ngOnDestroy(), we call destroy$.next() and destroy$.complete()
  // which triggers takeUntil() to automatically unsubscribe all piped Observables.
  //
  // MODERN equivalent: takeUntilDestroyed() — does this automatically, no Subject needed.
  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    // LEGACY cleanup: manually complete the destroy$ Subject to trigger unsubscription.
    // Modern: takeUntilDestroyed(this.destroyRef) handles this with zero boilerplate.
    this.destroy$.next();
    this.destroy$.complete();
  }

  addSample(): void {
    this.cartService.addItem('Sample Item', 12.99);
  }
}

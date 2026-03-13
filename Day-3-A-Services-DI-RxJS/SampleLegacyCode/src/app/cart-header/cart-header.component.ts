// LEGACY CartHeaderComponent — demonstrates constructor injection.
//
// MODERN equivalent in SampleCode/src/app/cart-header/cart-header.component.ts:
//   private readonly cartService = inject(CartService);
//   readonly cartCount = toSignal(this.cartService.count$, { initialValue: 0 });
//
// LEGACY pattern:
//   constructor(private cartService: CartService) {}
//   cartCount$: Observable<number> = this.cartService.count$;
//   Template uses: {{ cartCount$ | async }}  with *ngIf null guard
//
// Pain points of the legacy pattern:
//   1. Constructor grows with every injected service.
//   2. async pipe emits null before the first value — requires *ngIf guard.
//   3. No automatic unsubscription — must implement OnDestroy for long subscriptions.
import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

// LEGACY: no standalone: true — declared in AppModule
@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css']
})
export class CartHeaderComponent implements OnDestroy {

  // LEGACY constructor injection
  // Modern: private readonly cartService = inject(CartService)
  constructor(private readonly cartService: CartService) {}

  // LEGACY: expose the raw Observable; the async pipe subscribes in the template.
  // Modern: toSignal(this.cartService.count$, { initialValue: 0 })
  //         → readonly cartCount = toSignal(...)
  readonly cartCount$: Observable<number> = this.cartService.count$;
  readonly cartTotal$: Observable<number> = this.cartService.total$;

  // LEGACY takeUntil pattern for cleanup
  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

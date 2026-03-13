// CartHeaderComponent — demonstrates:
//   inject()    — pulls in CartService with no constructor
//   toSignal()  — converts count$ and total$ Observables to signals for template use
//
// Why toSignal() instead of the async pipe?
//   1. No null timing issue — initialValue provides an immediate value before the first emission.
//   2. No pipe syntax in the template — just call cartCount() like any signal.
//   3. Use toSignal() in all new code; async pipe is shown in the legacy sample.
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-header',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.css'
})
export class CartHeaderComponent {

  // inject() in the class body — no constructor() needed.
  // Angular resolves the dependency from the root injector because
  // CartService is @Injectable({ providedIn: 'root' }).
  private readonly cartService = inject(CartService);

  // toSignal() converts an Observable to a signal.
  //   initialValue: 0 — the signal starts with 0 immediately, before any Observable emission.
  //   Without initialValue, the signal would be of type number | undefined until the
  //   BehaviorSubject emits — which would require null checks in the template.
  readonly cartCount = toSignal(this.cartService.count$, { initialValue: 0 });
  readonly cartTotal = toSignal(this.cartService.total$, { initialValue: 0 });
}

// LEGACY CartPageComponent — demonstrates:
//   Constructor injection       — vs modern inject()
//   async pipe with *ngIf guard — vs modern toSignal()
//   OnDestroy + takeUntil       — vs modern takeUntilDestroyed()
//
// MODERN equivalent in SampleCode/src/app/cart-page/cart-page.component.ts:
//   private readonly cartService = inject(CartService)
//   readonly items  = toSignal(this.cartService.items,  { initialValue: [] })
//   readonly error  = toSignal(this.cartService.error,  { initialValue: null })
//   readonly total  = toSignal(this.cartService.total$, { initialValue: 0 })
//   No constructor. No OnDestroy. No destroy$ Subject.
import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService, CartItem } from '../services/cart.service';

interface CatalogItem { name: string; price: number; }

const CATALOG: CatalogItem[] = [
  { name: 'RxJS in Action (Book)',  price: 39.99 },
  { name: 'Angular T-Shirt',        price: 24.99 },
  { name: 'TypeScript Hoodie',      price: 49.99 },
  { name: 'VS Code Mug',            price: 14.99 },
  { name: 'NgRx Sticker Sheet',     price: 6.99  },
];

// LEGACY: no standalone: true — declared in AppModule
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnDestroy {

  // LEGACY: constructor injection
  // Grows with every service — two services here means two constructor parameters.
  constructor(private readonly cartService: CartService) {}

  // LEGACY: expose raw Observables for the async pipe in the template.
  // The template must handle null with *ngIf or ?? before each use.
  // Modern: toSignal() with initialValue handles all of this automatically.
  readonly items$: Observable<CartItem[]>    = this.cartService.items;
  readonly error$: Observable<string | null> = this.cartService.error;
  readonly total$: Observable<number>        = this.cartService.total$;

  readonly catalog = CATALOG;

  // LEGACY takeUntil + Subject pattern — manual subscription cleanup.
  // This destroy$ Subject is used to emit a completion signal in ngOnDestroy().
  // Any Observable piped with takeUntil(this.destroy$) will auto-unsubscribe.
  //
  // MODERN: takeUntilDestroyed(this.destroyRef) — no Subject, no ngOnDestroy needed.
  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    // LEGACY: must manually trigger cleanup every time.
    // Forgetting this is one of the most common memory leak sources in legacy Angular.
    this.destroy$.next();
    this.destroy$.complete();
  }

  addItem(item: CatalogItem): void {
    this.cartService.addItem(item.name, item.price);
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  // LEGACY trackBy function — passed to *ngFor as trackBy: trackById.
  // This is what modern @for replaced with the required `track` expression.
  // In legacy code, trackBy was optional and often forgotten, causing
  // unnecessary DOM re-renders on every list update.
  trackById(_index: number, item: CartItem): number {
    return item.id;
  }
}

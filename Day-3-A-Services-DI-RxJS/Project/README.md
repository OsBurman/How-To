# D3A Shopping Cart — Sample Project

Angular 19 · Standalone Components · RxJS ~7.8

---

## What This Project Demonstrates

| Concept | Where to look |
|---------|--------------|
| `@Injectable({ providedIn: 'root' })` | `cart.service.ts`, `notification.service.ts` |
| `inject()` in components | `cart-header.component.ts`, `cart-page.component.ts` |
| `BehaviorSubject` for state | `cart.service.ts` — `itemsBs$`, `errorBs$` |
| Paired `error$` stream | `cart.service.ts` — each method resets `errorBs$` before mutating |
| `map` to derive Observables | `cart.service.ts` — `count$` and `total$` |
| `Subject` for events (not state) | `notification.service.ts` — `notificationsSub$` |
| `timer()` for auto-dismiss | `notification.service.ts` — `push()` |
| `takeUntilDestroyed()` | `notification.service.ts` — cancels timer subscriptions on destroy |
| `toSignal()` with `initialValue` | `cart-header.component.ts`, `cart-page.component.ts` |
| `@if` / `@for` control flow | `cart-header.component.html`, `cart-page.component.html` |

---

## Project Structure

```
src/app/
├── app.config.ts
├── app.component.ts / .html / .css      ← shell — composes header + page
├── models/
│   └── cart-item.model.ts               ← CartItem interface
├── services/
│   ├── cart.service.ts                  ← BehaviorSubject, map, error$
│   └── notification.service.ts          ← Subject, timer(), takeUntilDestroyed()
├── cart-header/
│   └── cart-header.component.*          ← count badge via toSignal()
└── cart-page/
    └── cart-page.component.*            ← catalog + cart + toasts
```

---

## Getting Started

```bash
npm install
npm start
```

Open `http://localhost:4200` in your browser.

---

## Key Design Decisions

**Why `BehaviorSubject` for items?**
New subscribers (e.g., a newly rendered component) immediately get the current cart
state without waiting for the next user action. Subject would give them nothing.

**Why `Subject` for notifications?**
Toasts are events — they shouldn't replay when a new subscriber joins.
A Subject only forwards future emissions, which is the right behaviour here.

**Why `takeUntilDestroyed()` in NotificationService?**
Each `push()` call creates a `timer(3000)` subscription. Without cleanup, those
subscriptions would leak if Angular destroys the service before the 3 seconds elapse.
`takeUntilDestroyed(destroyRef)` hooks into Angular's lifecycle to cancel them.

**Why `toSignal()` instead of the async pipe?**
`toSignal()` integrates with Angular's Signal graph, enabling fine-grained reactivity.
It also removes the `| async` boilerplate from every binding in the template.

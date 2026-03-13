# D3A Shopping Cart — Instructor Instructions

## Purpose

This project is the **Day 3 Part A sample project**. Walk through it live during
the second half of the session to consolidate the morning's concepts into a
working, end-to-end application.

---

## Setup

```bash
cd Day-3-A-Services-DI-RxJS/Project
npm install
npm start
```

Open `http://localhost:4200`.

---

## Walkthrough Order

Work through the files in this order so each new concept builds on the last:

### 1 — Model (`src/app/models/cart-item.model.ts`)
- Show the `CartItem` interface
- Point out: interfaces are defined close to the service that owns the data

### 2 — CartService (`src/app/services/cart.service.ts`)
- Read the file top to bottom with the class
- Highlight `@Injectable({ providedIn: 'root' })` — one instance, shared everywhere
- Explain `BehaviorSubject` vs `Subject` — BehaviorSubject replays last value
- Show `asObservable()` — why we expose read-only views to consumers
- Walk through `count$` and `total$` — derived via `map`, no extra state needed
- Demonstrate the `error$` pattern: reset first, then mutate inside try/catch

### 3 — NotificationService (`src/app/services/notification.service.ts`)
- Show `inject(DestroyRef)` inside a service — not just for components
- Contrast `Subject` with `BehaviorSubject` — ask the class which one fits here
- Walk through `push()` — `timer(3000)` + `takeUntilDestroyed()`
- Ask: what happens without `takeUntilDestroyed()`?

### 4 — CartHeaderComponent (`src/app/cart-header/`)
- Show the minimal component: just `inject()` + `toSignal()`
- Run the app — add items and watch the badge update live
- Point out: no async pipe, no subscription management

### 5 — CartPageComponent (`src/app/cart-page/`)
- Walk through all four `toSignal()` calls — items, total, error, notifications
- Show `addToCart()` — cart mutation then notification push
- Show `removeItem()` — reading `this.items()` synchronously before the delete
- Demo the error banner: it only appears when `error()` is non-null
- Demo the toast auto-dismiss — add an item, wait 3 seconds

---

## Live Demo Checkpoints

After each service file, pause and ask:
- _"Which subject type belongs here and why?"_
- _"Who else in the app can call `.next()` on this subject?"_

After the component files, ask:
- _"What would the template look like if we used the async pipe instead?"_

---

## Common Questions

**Q: Why is `count$` defined as `Observable<number>` with an explicit type?**
A: TypeScript strict mode infers the type, but the explicit annotation makes the
intent clear to anyone reading the service — good habit for shared code.

**Q: Can we use `takeUntilDestroyed()` without passing `destroyRef`?**
A: Yes — if called inside an injection context (constructor or field initializer),
Angular infers `DestroyRef` automatically. In `push()` we're outside that context,
so we pass it explicitly.

**Q: Why does `removeItem()` read `this.items()` before calling the service?**
A: Once `cartService.removeItem(id)` runs, the item is gone from the Signal.
We capture the name first so the toast shows the correct message.

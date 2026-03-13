# Exercise 9 – inject() in a Functional Guard

## Goal

Implement a functional route guard using `CanActivateFn` and `inject()`. The guard checks `AuthService` synchronously and either allows navigation or redirects to `/login`.

## What's Already Set Up

- Routing scaffold: `app.routes.ts` with `/login` and `/dashboard` routes
- `LoginComponent` and `DashboardComponent` stubs with `login()` / `logout()` method stubs
- `AuthService` stub with `loggedIn$` BehaviorSubject and method stubs
- `auth.guard.ts` stub showing the `inject()` pattern in comments with numbered TODOs
- The guard is **not yet wired** to the dashboard route — that's your Step 3

## Your Tasks

### Task 1 — Implement AuthService

Fill in the three methods:

```typescript
login(): void  { this.loggedIn$.next(true); }
logout(): void { this.loggedIn$.next(false); }
isLoggedIn(): boolean { return this.loggedIn$.getValue(); }
```

### Task 2 — Implement the guard in auth.guard.ts

```typescript
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};
```

Key point: `inject()` works here because Angular calls guard functions inside an **injection context** — even though there's no constructor.

### Task 3 — Wire the guard to the route

In `app.routes.ts`, uncomment the `authGuard` import and add `canActivate`:

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

Also uncomment the import at the top of the file.

### Task 4 — Implement Login and Dashboard handlers

**LoginComponent:**
```typescript
login(): void {
  this.authService.login();
  this.router.navigate(['/dashboard']);
}
```

**DashboardComponent:**
```typescript
logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
```

## Expected Behaviour

1. App starts at `/` → redirected to `/login`
2. Click "Log In" → navigated to `/dashboard`
3. Click "Log Out" → navigated back to `/login`
4. While logged out, navigate to `/dashboard` in the URL bar → guard catches it and redirects to `/login`

## Key Concept — Why a function, not a class?

Legacy Angular used class-based guards with `implements CanActivate`. That required:
- A class
- A constructor for injection
- Adding the class to `providers`

The functional guard is just a plain function. Angular calls it in an injection context, so `inject()` works inside it. The result is less boilerplate and more composable guards.

## Getting Started

```bash
npm install
npm start
```

Open `http://localhost:4200`.

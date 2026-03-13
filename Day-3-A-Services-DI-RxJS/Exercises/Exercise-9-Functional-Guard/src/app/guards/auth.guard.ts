import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// A functional guard is just a function — no class, no constructor, no implements.
// Angular calls this function before activating the route.
// If it returns true, navigation continues. If false (or a UrlTree), navigation is blocked.

export const authGuard: CanActivateFn = () => {
  // TODO 1: Use inject() to get the AuthService and Router.
  //
  //   const authService = inject(AuthService);
  //   const router = inject(Router);
  //
  // inject() works inside a guard function because Angular calls this function
  // within an injection context. You don't need a constructor here.

  // TODO 2: Check whether the user is logged in.
  //
  //   if (authService.isLoggedIn()) {
  //     return true; // Allow navigation to the protected route
  //   }

  // TODO 3: Redirect to /login if the user is not logged in.
  //
  //   return router.createUrlTree(['/login']);
  //
  // Returning a UrlTree is better than calling router.navigate() and returning false —
  // it lets Angular handle the redirect as part of the navigation pipeline.

  return false; // Placeholder — replace this once you implement the steps above.
};

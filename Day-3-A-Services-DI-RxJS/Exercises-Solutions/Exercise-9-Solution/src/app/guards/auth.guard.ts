import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// A functional guard is just a plain function — no class, no constructor, no implements.
// Angular calls it inside an injection context, so inject() works here just like in a component.
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Allow navigation to the protected route.
  }

  // Returning a UrlTree redirects the user as part of Angular's navigation pipeline.
  // This is better than calling router.navigate() and returning false —
  // it lets Angular track the redirect correctly and avoids a double-navigation.
  return router.createUrlTree(['/login']);
};

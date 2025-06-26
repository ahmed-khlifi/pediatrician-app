import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();

  if (authService.isAuthenticated() && user) {
    return true;
  }

  // Redirect to login if not authenticated
  return router.createUrlTree(['/login']);
};

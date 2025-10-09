import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.retrieveAccessToken();

  if (token) return true;

  authService.logout();
  router.navigate(['/login']);
  return false;
};

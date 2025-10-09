import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const token = authService.retrieveAccessToken();

  if (token) return true;

  authService.logout();
  return false;
};

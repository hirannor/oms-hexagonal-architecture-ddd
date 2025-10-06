import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthApi } from '@oms-frontend/api/auth-data-access';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable({providedIn: 'root'})
export class AuthService {
  private router = inject(Router);
  private authApi = inject(AuthApi);

  saveTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  clearTokens(): void {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  logout(): void {
    this.clearTokens();
    this.router.navigate(['/login']);
  }

  extractCustomerId(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['customerId'] || null;
    } catch {
      return null;
    }
  }

  extractEmailAddress(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['sub'] || null;
    } catch {
      return null;
    }
  }

  refreshTokens(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    return this.authApi.refreshToken({refreshToken}).pipe(
      tap((res) => {
        this.saveTokens(res.accessToken!, res.refreshToken!);
      }),
      map((res) => ({
        accessToken: res.accessToken!,
        refreshToken: res.refreshToken!,
      }))
    );
  }

  navigateToOrders(): void {
    this.router.navigate(['/']);
  }
}

import { inject, Injectable } from '@angular/core';
import { AuthApi } from '@oms-frontend/api/auth-data-access';
import { map, Observable, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApi);
  private readonly tokenStorage = inject(TokenStorageService);
  private readonly router = inject(Router);

  saveTokens(accessToken: string, refreshToken: string): void {
    this.tokenStorage.saveTokens(accessToken, refreshToken);
  }

  retrieveAccessToken(): string | null {
    return this.tokenStorage.retrieveAccessToken();
  }

  retrieveRefreshToken(): string | null {
    return this.tokenStorage.retrieveRefreshToken();
  }

  extractEmailAddress(): string | null {
    const token = this.retrieveAccessToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['sub'] || null;
    } catch {
      return null;
    }
  }

  extractCustomerId(): string | null {
    const token = this.retrieveAccessToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload['customerId'] || null;
    } catch {
      return null;
    }
  }

  refreshTokens(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = this.tokenStorage.retrieveRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    return this.api.refreshToken({ refreshToken }).pipe(
      tap((res) => {
        if (res.accessToken && res.refreshToken) {
          this.tokenStorage.saveTokens(res.accessToken, res.refreshToken);
        }
      }),
      map((res) => ({
        accessToken: res.accessToken ?? '',
        refreshToken: res.refreshToken ?? '',
      }))
    );
  }

  logout(): void {
    this.tokenStorage.clearTokens();
    this.router.navigate(['/login']);
  }
}

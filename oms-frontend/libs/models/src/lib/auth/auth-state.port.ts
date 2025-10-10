import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterPayload } from './register-payload';
import { LoginPayload } from './login-payload';

export interface AuthState {
  readonly loading$: Observable<boolean>;
  readonly error$: Observable<string | null>;
  readonly success$: Observable<boolean>;

  register(payload: RegisterPayload): void;

  login(payload: LoginPayload): void;

  logout(): void;

  clearMessages(): void;
}

export const AUTH_STATE = new InjectionToken<AuthState>('AUTH_STATE');

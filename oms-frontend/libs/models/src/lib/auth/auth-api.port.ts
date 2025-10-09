import { InjectionToken } from '@angular/core';
import { AuthResult } from './auth-result';
import { RegisterPayload } from './register-payload';
import { LoginPayload } from './login-payload';
import { Observable } from 'rxjs';

export interface AuthApi {
  authenticate(payload: LoginPayload): Observable<AuthResult>;
  register(payload: RegisterPayload): Observable<void>;
}

export const AUTH_API = new InjectionToken<AuthApi>('AUTH_API_PORT');

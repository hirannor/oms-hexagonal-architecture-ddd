import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IAuthPort {
  readonly loading$: Observable<boolean>;
  readonly error$: Observable<string | null>;
  readonly success$: Observable<boolean>;

  register(email: string, password: string): void;

  login(email: string, password: string): void;

  logout(): void;
}

export const AUTH_PORT = new InjectionToken<IAuthPort>('AUTH_PORT');

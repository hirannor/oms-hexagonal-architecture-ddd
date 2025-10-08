import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface IAuthPort {
  readonly loading$: Observable<boolean>;

  register(email: string, password: string): void;

  login(email: string, password: string): void;

  logout(): void;
}

export const AUTH_PORT = new InjectionToken<IAuthPort>('AUTH_PORT');

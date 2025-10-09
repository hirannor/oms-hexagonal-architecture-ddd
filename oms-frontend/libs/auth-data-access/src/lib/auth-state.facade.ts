import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '@oms-frontend/shared';
import { Observable } from 'rxjs';
import { AuthState } from '@oms-frontend/models';
import { AuthActions } from './auth.actions';
import {
  selectAuthError,
  selectAuthLoading,
  selectAuthSuccess,
} from './auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthStateFacade implements AuthState {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  readonly error$: Observable<string | null> =
    this.store.select(selectAuthError);
  readonly success$: Observable<boolean> = this.store.select(selectAuthSuccess);

  register(email: string, password: string): void {
    this.store.dispatch(AuthActions.register({ email, password }));
  }

  login(email: string, password: string): void {
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  clearMessages(): void {
    this.store.dispatch(AuthActions.clearMessages());
  }
}

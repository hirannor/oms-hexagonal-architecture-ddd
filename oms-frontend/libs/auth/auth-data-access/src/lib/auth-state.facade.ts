import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '@oms-frontend/shared';
import { Observable } from 'rxjs';
import { AuthState, LoginPayload, RegisterPayload } from '@oms-frontend/models';
import {
  AuthLoginActions,
  AuthMiscActions,
  AuthRefreshActions,
  AuthRegisterActions,
} from './auth.actions';
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

  register(payload: RegisterPayload): void {
    this.store.dispatch(AuthRegisterActions.request({ payload }));
  }

  login(payload: LoginPayload): void {
    this.store.dispatch(AuthLoginActions.request({ payload }));
  }

  logout(): void {
    this.store.dispatch(AuthMiscActions.logout());
  }

  clearMessages(): void {
    this.store.dispatch(AuthMiscActions.clearMessages());
  }

  refreshTokens(): void {
    this.store.dispatch(AuthRefreshActions.request());
  }
}

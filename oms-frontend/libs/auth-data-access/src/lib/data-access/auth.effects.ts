import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AuthMapper,
  LoginPayload,
  RegisterPayload,
} from '@oms-frontend/models';
import {
  AuthService,
  NotificationService,
  ProblemDetailsMapper,
} from '@oms-frontend/shared';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthApi } from '@oms-frontend/api/auth-data-access';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(AuthApi);
  private auth = inject(AuthService);
  private notifications = inject(NotificationService);

  navigateAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.auth.navigateToOrders())
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) => {
        const payload: LoginPayload = { email, password };

        return this.api
          .authenticate(AuthMapper.mapToAuthenticateModel(payload))
          .pipe(
            map((res) => {
              this.auth.saveTokens(
                res.accessToken ?? '',
                res.refreshToken ?? ''
              );

              this.notifications.success('Authentication success');
              return AuthActions.loginSuccess({
                email: res.emailAddress ?? '',
                accessToken: res.accessToken ?? '',
                refreshToken: res.refreshToken ?? '',
              });
            }),
            catchError((err) => {
              if (err.error) {
                const problem = ProblemDetailsMapper.fromApi(err.error);
                this.notifications.fromProblem(problem);
              } else {
                this.notifications.error(
                  'Login Failed',
                  err.message ?? 'Unknown error'
                );
              }
              return of(
                AuthActions.loginFailure({
                  error: err?.message ?? 'Login failed',
                })
              );
            })
          );
      })
    )
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ email, password }) => {
        const payload: RegisterPayload = { email, password };

        return this.api.register(AuthMapper.mapToRegisterModel(payload)).pipe(
          map(() => AuthActions.registerSuccess({ email })),
          catchError((err) => {
            if (err.error) {
              const problem = ProblemDetailsMapper.fromApi(err.error);
              this.notifications.fromProblem(problem);
            } else {
              this.notifications.error(
                'Login Failed',
                err.message ?? 'Unknown error'
              );
            }
            return of(
              AuthActions.registerFailure({
                error: err?.message ?? 'Registration failed',
              })
            );
          })
        );
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.auth.refreshTokens().pipe(
          map(({ accessToken, refreshToken }) =>
            AuthActions.refreshTokenSuccess({ accessToken, refreshToken })
          ),
          catchError((err) => {
            this.auth.logout();
            this.notifications.error('Session expired', 'Please log in again.');
            return of(
              AuthActions.refreshTokenFailure({
                error: err.message ?? 'Refresh failed',
              })
            );
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(({ email }) => {
          this.notifications.success(
            'Registration successful',
            `Account created for ${email}. Please log in.`
          );
        })
      ),
    { dispatch: false }
  );
}

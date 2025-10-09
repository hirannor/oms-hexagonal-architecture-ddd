import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  AUTH_API,
  AUTH_STATE,
  LoginPayload,
  RegisterPayload,
} from '@oms-frontend/models';
import { AuthService, ProblemDetailsMapper } from '@oms-frontend/shared';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly authApi = inject(AUTH_API);
  private readonly authState = inject(AUTH_STATE);
  private readonly authService = inject(AuthService);

  navigateAfterLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) => {
        const payload: LoginPayload = { email, password };
        return this.authApi.authenticate(payload).pipe(
          map((res) => {
            this.authService.saveTokens(res.accessToken, res.refreshToken);
            return AuthActions.loginSuccess({
              email: res.email,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            });
          }),
          catchError((err) => {
            const message = this.resolveErrorMessage(err, 'Login failed');
            return of(AuthActions.loginFailure({ error: message }));
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
        return this.authApi.register(payload).pipe(
          map(() => AuthActions.registerSuccess({ email })),
          catchError((err) => {
            const message = this.resolveErrorMessage(
              err,
              'Registration failed'
            );
            return of(AuthActions.registerFailure({ error: message }));
          })
        );
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.authService.refreshTokens().pipe(
          map(({ accessToken, refreshToken }) =>
            AuthActions.refreshTokenSuccess({ accessToken, refreshToken })
          ),
          catchError((err) => {
            this.authState.logout();
            const message = this.resolveErrorMessage(err, 'Session expired');
            return of(AuthActions.refreshTokenFailure({ error: message }));
          })
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearTokens();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  private resolveErrorMessage(err: unknown, fallback: string): string {
    if (!err) return fallback;

    try {
      const problemDetails = err as { error?: unknown; message?: string };
      const problem = ProblemDetailsMapper.fromApi(problemDetails.error);

      if (problem?.detail) return problem.detail;
      if (problem?.title) return problem.title;
      if (problemDetails.message) return problemDetails.message;
    } catch (e) {
      console.error('Error while mapping problem details:', e);
    }

    return fallback;
  }
}

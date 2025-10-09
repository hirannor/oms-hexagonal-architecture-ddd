import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AUTH_API, LoginPayload, RegisterPayload } from '@oms-frontend/models';
import { AuthService, ProblemDetailsMapper } from '@oms-frontend/shared';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(AUTH_API);
  private readonly auth = inject(AuthService);

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
        return this.api.authenticate(payload).pipe(
          map((res) => {
            this.auth.saveTokens(res.accessToken, res.refreshToken);
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
        return this.api.register(payload).pipe(
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
        this.auth.refreshTokens().pipe(
          map(({ accessToken, refreshToken }) =>
            AuthActions.refreshTokenSuccess({ accessToken, refreshToken })
          ),
          catchError((err) => {
            this.auth.logout();
            const message = this.resolveErrorMessage(err, 'Session expired');
            return of(AuthActions.refreshTokenFailure({ error: message }));
          })
        )
      )
    )
  );

  private resolveErrorMessage(err: unknown, fallback: string): string {
    if (!err) return fallback;
    try {
      const problem = ProblemDetailsMapper.fromApi((err as any).error);
      if (problem?.detail) return problem.detail;
      if (problem?.title) return problem.title;
      if ((err as any).message) return (err as any).message;
    } catch {}
    return fallback;
  }
}

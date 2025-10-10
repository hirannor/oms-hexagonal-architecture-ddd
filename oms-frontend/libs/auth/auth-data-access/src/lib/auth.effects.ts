import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  AUTH_API,
  AUTH_STATE,
  AuthResult,
  LoginPayload,
} from '@oms-frontend/models';
import { AuthService, ProblemDetailsMapper } from '@oms-frontend/shared';
import {
  AuthLoginActions,
  AuthMiscActions,
  AuthRefreshActions,
  AuthRegisterActions,
} from './auth.actions';

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
        ofType(AuthLoginActions.success),
        tap(() => this.router.navigate(['/products']))
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthLoginActions.request),
      mergeMap(({ payload }) =>
        this.authApi.authenticate(payload).pipe(
          map((res: AuthResult) => {
            this.authService.saveTokens(res.accessToken, res.refreshToken);
            return AuthLoginActions.success({ result: res });
          }),
          catchError((err) => {
            const message = this.resolveErrorMessage(err, 'Login failed');
            return of(AuthLoginActions.failure({ error: message }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthRegisterActions.request),
      mergeMap(({ payload }) =>
        this.authApi.register(payload).pipe(
          map(() => {
            const result: AuthResult = {
              email: payload.email,
              accessToken: '',
              refreshToken: '',
            };
            return AuthRegisterActions.success({
              result,
              password: payload.password,
            });
          }),
          catchError((err) => {
            const message = this.resolveErrorMessage(
              err,
              'Registration failed'
            );
            return of(AuthRegisterActions.failure({ error: message }));
          })
        )
      )
    )
  );

  autoLoginAfterRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthRegisterActions.success),
      mergeMap(({ result, password }) => {
        const payload: LoginPayload = { email: result.email, password };
        return this.authApi.authenticate(payload).pipe(
          map((res: AuthResult) => {
            this.authService.saveTokens(res.accessToken, res.refreshToken);
            return AuthLoginActions.success({ result: res });
          }),
          catchError((err) => {
            const message = this.resolveErrorMessage(err, 'Auto login failed');
            return of(AuthLoginActions.failure({ error: message }));
          })
        );
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthRefreshActions.request),
      mergeMap(() =>
        this.authService.refreshTokens().pipe(
          map(({ accessToken, refreshToken }) =>
            AuthRefreshActions.success({ accessToken, refreshToken })
          ),
          catchError((err) => {
            this.authState.logout();
            const message = this.resolveErrorMessage(err, 'Session expired');
            return of(AuthRefreshActions.failure({ error: message }));
          })
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthMiscActions.logout),
        tap(() => this.authService.logout())
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

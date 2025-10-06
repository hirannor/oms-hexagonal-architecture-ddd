import { inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const auth = inject(AuthService);
  const accessToken = auth.getAccessToken();

  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const cloned = accessToken
    ? req.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}})
    : req;

  return next(cloned).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        const refreshToken = auth.getRefreshToken();
        if (!refreshToken) {
          auth.logout();
          return throwError(() => err);
        }

        return auth.refreshTokens().pipe(
          switchMap(({accessToken}) => {
            const retried = req.clone({
              setHeaders: {Authorization: `Bearer ${accessToken}`},
            });
            return next(retried);
          }),
          catchError(() => {
            auth.logout();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => err);
    })
  );
};

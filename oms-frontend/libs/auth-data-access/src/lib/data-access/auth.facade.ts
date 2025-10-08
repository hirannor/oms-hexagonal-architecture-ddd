import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthPort } from '@oms-frontend/models';
import { AuthActions } from './auth.actions';
import { selectAuthLoading } from './auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthFacade implements IAuthPort {
  private readonly store = inject(Store);

  readonly loading$: Observable<boolean> = this.store.select(selectAuthLoading);

  register(email: string, password: string): void {
    this.store.dispatch(AuthActions.register({ email, password }));
  }

  login(email: string, password: string): void {
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

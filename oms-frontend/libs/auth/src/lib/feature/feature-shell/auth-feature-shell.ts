import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AuthFeatureRegister } from '../feature-register/auth-feature-register';
import { AuthFeatureLogin } from '../feature-login/auth-feature-login';
import {
  selectAuthError,
  selectAuthSuccess,
} from '@oms-frontend/auth-data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-auth-shell',
  standalone: true,
  imports: [CommonModule, CardModule, AuthFeatureRegister, AuthFeatureLogin],
  templateUrl: './auth-feature-shell.html',
  styleUrls: ['./auth-feature-shell.scss'],
})
export class AuthFeatureShell {
  private store = inject(Store);

  readonly error$ = this.store.select(selectAuthError);
  readonly registerSuccess$ = this.store.select(selectAuthSuccess);
}

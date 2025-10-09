import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AuthFeatureLogin } from '../feature-login/auth-feature-login';
import { AuthFeatureRegister } from '../feature-register/auth-feature-register';
import { AUTH_STATE } from '@oms-frontend/models';

@Component({
  selector: 'lib-auth-feature-shell',
  standalone: true,
  imports: [CommonModule, CardModule, AuthFeatureLogin, AuthFeatureRegister],
  templateUrl: './auth-feature-shell.html',
  styleUrls: ['./auth-feature-shell.scss'],
})
export class AuthFeatureShell {
  private readonly auth = inject(AUTH_STATE);

  mode: 'login' | 'register' = 'login';

  toggleMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.auth.clearMessages();
  }
}

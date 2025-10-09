import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AUTH_STATE } from '@oms-frontend/models';

@Component({
  selector: 'lib-auth-feature-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './auth-feature-login.html',
  styleUrls: ['./auth-feature-login.scss'],
})
export class AuthFeatureLogin {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AUTH_STATE);

  @Output() switchToRegister = new EventEmitter<void>();

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  readonly loading$ = this.auth.loading$;
  readonly error$ = this.auth.error$;

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.auth.login(email, password);
    }
  }
}

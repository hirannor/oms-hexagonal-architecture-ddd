import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AUTH_STATE } from '@oms-frontend/models';

@Component({
  selector: 'lib-auth-feature-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
  ],
  templateUrl: './auth-feature-register.html',
  styleUrls: ['./auth-feature-register.scss'],
})
export class AuthFeatureRegister {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AUTH_STATE);

  @Output() switchToLogin = new EventEmitter<void>();

  readonly registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });

  readonly loading$ = this.auth.loading$;
  readonly error$ = this.auth.error$;

  onRegister(): void {
    if (this.registerForm.invalid) return;

    const { email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) return;

    this.auth.register(email!, password!);
  }
}

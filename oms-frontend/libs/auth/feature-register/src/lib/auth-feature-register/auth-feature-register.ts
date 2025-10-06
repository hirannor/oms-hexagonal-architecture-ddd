import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '@oms-frontend/auth/data-access';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'lib-auth-feature-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './auth-feature-register.html',
  styleUrl: './auth-feature-register.scss',
})
export class AuthFeatureRegister {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  });
  private store = inject(Store);

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password, confirmPassword } = this.form.value;

      if (password !== confirmPassword) {
        return;
      }

      this.store.dispatch(
        AuthActions.register({ email: email!, password: password! })
      );
    }
  }
}

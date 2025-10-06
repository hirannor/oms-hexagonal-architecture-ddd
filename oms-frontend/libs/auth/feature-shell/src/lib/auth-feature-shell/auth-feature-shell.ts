import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AuthFeatureRegister } from '@oms-frontend/auth/feature-register';
import { AuthFeatureLogin } from '@oms-frontend/auth/feature-login';

@Component({
  selector: 'lib-auth-shell',
  standalone: true,
  imports: [CommonModule, CardModule, AuthFeatureRegister, AuthFeatureLogin],
  templateUrl: './auth-feature-shell.html',
  styleUrls: ['./auth-feature-shell.scss'],
})
export class AuthFeatureShell {
}

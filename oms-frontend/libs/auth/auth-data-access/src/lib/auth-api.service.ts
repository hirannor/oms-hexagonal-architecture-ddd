import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthApi as GeneratedAuthApi } from '@oms-frontend/api/auth-data-access';
import {
  LoginPayload,
  RegisterPayload,
  AuthResult,
  AuthApi,
} from '@oms-frontend/models';
import { AuthMapper } from './auth.mapper';

@Injectable({ providedIn: 'root' })
export class AuthApiService implements AuthApi {
  private readonly api = inject(GeneratedAuthApi);

  authenticate(payload: LoginPayload) {
    return this.api
      .authenticate(AuthMapper.mapToAuthenticateModel(payload))
      .pipe(map((res): AuthResult => AuthMapper.fromAuthResult(res)));
  }

  register(payload: RegisterPayload) {
    return this.api
      .register(AuthMapper.mapToRegisterModel(payload))
      .pipe(map(() => void 0));
  }
}

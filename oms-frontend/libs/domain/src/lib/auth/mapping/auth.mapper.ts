import { AuthenticateModel, AuthenticationResultModel, RegisterModel } from '@oms-frontend/api/auth-data-access';
import { LoginPayload } from '../login-payload';
import { RegisterPayload } from '../register-payload';
import { AuthResult } from '../auth-result';

export class AuthMapper {
  static mapToAuthenticateModel(payload: LoginPayload): AuthenticateModel {
    return {
      emailAddress: payload.email,
      password: payload.password,
    };
  }

  static mapToRegisterModel(payload: RegisterPayload): RegisterModel {
    return {
      emailAddress: payload.email,
      password: payload.password,
    };
  }

  static fromAuthResult(model: AuthenticationResultModel): AuthResult {
    return {
      email: model.emailAddress ?? '',
      accessToken: model.accessToken ?? '',
      refreshToken: model.refreshToken ?? '',
    };
  }
}

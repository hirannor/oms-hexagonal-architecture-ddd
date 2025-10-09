import {
  AuthenticateModel,
  AuthenticationResultModel,
  RegisterModel,
} from '@oms-frontend/api/auth-data-access';
import {
  AuthResult,
  LoginPayload,
  RegisterPayload,
} from '@oms-frontend/models';

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

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  LoginPayload,
  RegisterPayload,
  AuthResult,
} from '@oms-frontend/models';

export const AuthLoginActions = createActionGroup({
  source: 'Auth/Login',
  events: {
    Request: props<{ payload: LoginPayload }>(),
    Success: props<{ result: AuthResult }>(),
    Failure: props<{ error: string }>(),
  },
});

export const AuthRegisterActions = createActionGroup({
  source: 'Auth/Register',
  events: {
    Request: props<{ payload: RegisterPayload }>(),
    Success: props<{ result: AuthResult; password: string }>(),
    Failure: props<{ error: string }>(),
  },
});

export const AuthRefreshActions = createActionGroup({
  source: 'Auth/Refresh',
  events: {
    Request: emptyProps(),
    Success: props<{ accessToken: string; refreshToken: string }>(),
    Failure: props<{ error: string }>(),
  },
});

export const AuthMiscActions = createActionGroup({
  source: 'Auth/Misc',
  events: {
    'Clear Messages': emptyProps(),
    Logout: emptyProps(),
  },
});

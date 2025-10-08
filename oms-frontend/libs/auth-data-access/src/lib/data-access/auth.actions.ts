import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{
      email: string;
      accessToken: string;
      refreshToken: string;
    }>(),
    'Login Failure': props<{ error: string }>(),

    Register: props<{ email: string; password: string }>(),
    'Register Success': props<{ email: string }>(),
    'Register Failure': props<{ error: string }>(),

    'Refresh Token': emptyProps(),
    'Refresh Token Success': props<{
      accessToken: string;
      refreshToken: string;
    }>(),
    'Refresh Token Failure': props<{ error: string }>(),

    Logout: emptyProps(),
  },
});

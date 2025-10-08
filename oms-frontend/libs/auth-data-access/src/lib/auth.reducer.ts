import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.models';
import { AuthActions } from './auth.actions';

export const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(
    AuthActions.loginSuccess,
    (state, { email, accessToken, refreshToken }) => ({
      ...state,
      user: { email },
      accessToken,
      refreshToken,
      loading: false,
    })
  ),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state, { email }) => ({
    ...state,
    user: { email },
    loading: false,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, () => initialState)
);

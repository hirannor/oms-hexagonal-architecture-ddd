import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.models';
import { AuthActions } from './auth.actions';

export const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  success: false,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
  })),

  on(
    AuthActions.loginSuccess,
    (state, { email, accessToken, refreshToken }) => ({
      ...state,
      user: { email },
      accessToken,
      refreshToken,
      loading: false,
      error: null,
      success: true,
    })
  ),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
  })),

  on(AuthActions.registerSuccess, (state, { email }) => ({
    ...state,
    user: { email },
    loading: false,
    error: null,
    success: true,
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  })),

  on(AuthActions.refreshToken, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    AuthActions.refreshTokenSuccess,
    (state, { accessToken, refreshToken }) => ({
      ...state,
      accessToken,
      refreshToken,
      loading: false,
      error: null,
    })
  ),

  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, () => initialState)
);

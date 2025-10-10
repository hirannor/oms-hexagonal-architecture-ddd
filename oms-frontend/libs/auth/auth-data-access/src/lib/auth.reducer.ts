import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.models';
import {
  AuthLoginActions,
  AuthRegisterActions,
  AuthRefreshActions,
  AuthMiscActions,
} from './auth.actions';

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

  on(AuthLoginActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
  })),

  on(AuthLoginActions.success, (state, { result }) => ({
    ...state,
    user: { email: result.email },
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    loading: false,
    error: null,
    success: true,
  })),

  on(AuthLoginActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  })),

  on(AuthRegisterActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    success: false,
  })),

  on(AuthRegisterActions.success, (state, { result }) => ({
    ...state,
    user: { email: result.email },
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    loading: false,
    error: null,
    success: true,
  })),

  on(AuthRegisterActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    success: false,
  })),

  on(AuthRefreshActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthRefreshActions.success, (state, { accessToken, refreshToken }) => ({
    ...state,
    accessToken,
    refreshToken,
    loading: false,
    error: null,
  })),

  on(AuthRefreshActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthMiscActions.clearMessages, (state) => ({
    ...state,
    error: null,
    success: false,
  })),

  on(AuthMiscActions.logout, () => initialState)
);

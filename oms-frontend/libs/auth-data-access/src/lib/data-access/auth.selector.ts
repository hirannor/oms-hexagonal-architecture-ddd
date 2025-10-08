import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (s) => s.user);
export const selectAccessToken = createSelector(
  selectAuthState,
  (s) => s.accessToken
);
export const selectAuthLoading = createSelector(
  selectAuthState,
  (s) => s.loading
);
export const selectAuthError = createSelector(selectAuthState, (s) => s.error);
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (s) => !!s.accessToken
);

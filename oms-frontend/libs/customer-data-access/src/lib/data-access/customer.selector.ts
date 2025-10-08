import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

export const selectCustomerState =
  createFeatureSelector<CustomerState>('customer');

export const selectCustomer = createSelector(
  selectCustomerState,
  (state) => state.customer
);

export const selectCustomerLoading = createSelector(
  selectCustomerState,
  (state) => state.loading
);

export const selectCustomerUpdating = createSelector(
  selectCustomerState,
  (state) => state.updating
);

export const selectCustomerError = createSelector(
  selectCustomerState,
  (state) => state.error
);

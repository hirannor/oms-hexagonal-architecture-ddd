import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { Customer } from '@oms-frontend/shared/data-access';

export interface CustomerState {
  customer: Customer | null;
  loading: boolean;
  updating: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customer: null,
  loading: false,
  updating: false,
  error: null,
};

export const customerReducer = createReducer(
  initialState,

  on(CustomerActions.loadCustomerProfile, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CustomerActions.loadCustomerProfileSuccess, (state, {customer}) => ({
    ...state,
    customer,
    loading: false,
  })),
  on(CustomerActions.loadCustomerProfileFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false,
  })),

  on(CustomerActions.updateCustomerProfile, (state) => ({
    ...state,
    updating: true,
    error: null,
  })),
  on(CustomerActions.updateCustomerProfileSuccess, (state, {customer}) => ({
    ...state,
    customer,
    updating: false,
  })),
  on(CustomerActions.updateCustomerProfileFailure, (state, {error}) => ({
    ...state,
    error,
    updating: false,
  }))
);

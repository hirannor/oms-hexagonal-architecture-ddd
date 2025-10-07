import { createReducer, on } from '@ngrx/store';
import { Customer } from '@oms-frontend/models';
import {
  CustomerProfileLoadActions,
  CustomerProfileUpdateActions,
} from './customer.actions';

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

  on(CustomerProfileLoadActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CustomerProfileLoadActions.success, (state, { customer }) => ({
    ...state,
    customer,
    loading: false,
  })),
  on(CustomerProfileLoadActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CustomerProfileUpdateActions.request, (state) => ({
    ...state,
    updating: true,
    error: null,
  })),
  on(CustomerProfileUpdateActions.success, (state, { customer }) => ({
    ...state,
    customer,
    updating: false,
  })),
  on(CustomerProfileUpdateActions.failure, (state, { error }) => ({
    ...state,
    updating: false,
    error,
  }))
);


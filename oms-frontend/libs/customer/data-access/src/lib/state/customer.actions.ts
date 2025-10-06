import { createAction, props } from '@ngrx/store';
import { Customer } from '@oms-frontend/shared/data-access';

export const loadCustomerProfile = createAction('[Customer] Load Profile');

export const loadCustomerProfileSuccess = createAction(
  '[Customer] Load Profile Success',
  props<{ customer: Customer }>()
);

export const loadCustomerProfileFailure = createAction(
  '[Customer] Load Profile Failure',
  props<{ error: string }>()
);

export const updateCustomerProfile = createAction(
  '[Customer] Update Profile',
  props<{ customer: Customer }>()
);

export const updateCustomerProfileSuccess = createAction(
  '[Customer] Update Profile Success',
  props<{ customer: Customer }>()
);

export const updateCustomerProfileFailure = createAction(
  '[Customer] Update Profile Failure',
  props<{ error: string }>()
);

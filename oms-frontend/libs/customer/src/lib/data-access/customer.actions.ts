import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from '@oms-frontend/shared';

export const CustomerProfileLoadActions = createActionGroup({
  source: 'Customer/Profile Load',
  events: {
    Request: emptyProps(),
    Success: props<{ customer: Customer }>(),
    Failure: props<{ error: string }>(),
  },
});

export const CustomerProfileUpdateActions = createActionGroup({
  source: 'Customer/Profile Update',
  events: {
    Request: props<{ customer: Customer }>(),
    Success: props<{ customer: Customer }>(),
    Failure: props<{ error: string }>(),
  },
});

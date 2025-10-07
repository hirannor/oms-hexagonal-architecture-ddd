import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order, OrderItem } from '@oms-frontend/shared';

export const OrderLoadActions = createActionGroup({
  source: 'Order/Load All',
  events: {
    Request: emptyProps(),
    Success: props<{ orders: Order[] }>(),
    Failure: props<{ error: string }>(),
  },
});

export const OrderDetailsActions = createActionGroup({
  source: 'Order/Load By Id',
  events: {
    Request: props<{ orderId: string }>(),
    Success: props<{ order: Order }>(),
    Failure: props<{ error: string }>(),
  },
});

export const OrderCreateActions = createActionGroup({
  source: 'Order/Create',
  events: {
    Request: props<{ customerId: string; products: OrderItem[] }>(),
    Success: props<{ order: Order }>(),
    Failure: props<{ error: string }>(),
  },
});

export const OrderPaymentActions = createActionGroup({
  source: 'Order/Payment',
  events: {
    Request: props<{ orderId: string }>(),
    Success: props<{ paymentUrl: string }>(),
    Failure: props<{ error: string }>(),
  },
});

export const OrderCancelActions = createActionGroup({
  source: 'Order/Cancel',
  events: {
    Request: props<{ orderId: string }>(),
    Success: props<{ orderId: string }>(),
    Failure: props<{ error: string }>(),
  },
});

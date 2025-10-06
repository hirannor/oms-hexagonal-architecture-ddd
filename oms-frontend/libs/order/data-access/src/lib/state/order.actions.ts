import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order, OrderItem } from '@oms-frontend/shared/data-access';

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'Load Orders': emptyProps(),
    'Load Orders Success': props<{ orders: Order[] }>(),
    'Load Orders Failure': props<{ error: string }>(),

    'Load Order By Id': props<{ orderId: string }>(),
    'Load Order By Id Success': props<{ order: Order }>(),
    'Load Order By Id Failure': props<{ error: string }>(),

    'Create Order': props<{ customerId: string; products: OrderItem[] }>(),
    'Create Order Success': props<{ order: Order }>(),
    'Create Order Failure': props<{ error: string }>(),

    'Pay Order': props<{ orderId: string }>(),
    'Pay Order Success': props<{ paymentUrl: string }>(),
    'Pay Order Failure': props<{ error: string }>(),

    'Cancel Order': props<{ orderId: string }>(),
    'Cancel Order Success': props<{ orderId: string }>(),
    'Cancel Order Failure': props<{ error: string }>(),
  },
});

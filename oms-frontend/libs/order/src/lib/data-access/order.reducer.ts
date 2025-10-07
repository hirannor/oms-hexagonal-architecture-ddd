import { createReducer, on } from '@ngrx/store';
import { Order } from '@oms-frontend/shared/data-access';
import {
  OrderCancelActions,
  OrderCreateActions,
  OrderDetailsActions,
  OrderLoadActions,
  OrderPaymentActions,
} from './order.actions';

export interface OrderState {
  orders: Order[];
  selectedOrder?: Order;
  loading: boolean;
  error?: string;
}

export const initialState: OrderState = {
  orders: [],
  loading: false,
};

export const orderReducer = createReducer(
  initialState,

  on(OrderLoadActions.request, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(OrderLoadActions.success, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(OrderLoadActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderDetailsActions.request, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(OrderDetailsActions.success, (state, { order }) => ({
    ...state,
    loading: false,
    selectedOrder: order,
  })),
  on(OrderDetailsActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderCreateActions.request, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(OrderCreateActions.success, (state, { order }) => ({
    ...state,
    loading: false,
    orders: [...state.orders, order],
    selectedOrder: order,
  })),
  on(OrderCreateActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderPaymentActions.request, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(OrderPaymentActions.success, (state) => ({
    ...state,
    loading: false,
  })),
  on(OrderPaymentActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderCancelActions.request, (state) => ({
    ...state,
    loading: true,
    error: undefined,
  })),
  on(OrderCancelActions.success, (state, { orderId }) => ({
    ...state,
    loading: false,
    orders: state.orders.filter((o) => o.id !== orderId),
    selectedOrder:
      state.selectedOrder?.id === orderId ? undefined : state.selectedOrder,
  })),
  on(OrderCancelActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

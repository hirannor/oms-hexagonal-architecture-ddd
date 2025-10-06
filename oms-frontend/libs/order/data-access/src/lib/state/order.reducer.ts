import { createReducer, on } from '@ngrx/store';
import { Order } from '@oms-frontend/shared/data-access';
import { OrderActions } from './order.actions';

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

  on(OrderActions.loadOrders, (state) => ({ ...state, loading: true })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderActions.loadOrderById, (state) => ({ ...state, loading: true })),
  on(OrderActions.loadOrderByIdSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    selectedOrder: order,
  })),
  on(OrderActions.loadOrderByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderActions.createOrder, (state) => ({ ...state, loading: true })),
  on(OrderActions.createOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    orders: [...state.orders, order],
    selectedOrder: order,
  })),
  on(OrderActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrderActions.payOrder, (state) => ({ ...state, loading: true })),
  on(OrderActions.payOrderSuccess, (state) => ({ ...state, loading: false })),
  on(OrderActions.payOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

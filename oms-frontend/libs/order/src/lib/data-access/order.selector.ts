import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from '@oms-frontend/models';
import { OrderState } from './order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('orders');

export const selectAllOrders = createSelector(
  selectOrderState,
  (state): Order[] => state?.orders ?? []
);

export const selectSelectedOrder = createSelector(
  selectOrderState,
  (state) => state.selectedOrder
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state) => state.loading
);


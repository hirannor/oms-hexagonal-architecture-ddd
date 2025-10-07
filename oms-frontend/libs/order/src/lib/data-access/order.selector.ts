import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';
import { Order } from '@oms-frontend/shared/data-access';

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

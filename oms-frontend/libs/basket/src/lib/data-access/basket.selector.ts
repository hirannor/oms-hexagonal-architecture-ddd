import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BasketState } from './basket.reducer';

export const selectBasketState = createFeatureSelector<BasketState>('basket');

export const selectBasket = createSelector(
  selectBasketState,
  (state) => state.basket
);

export const selectBasketItems = createSelector(
  selectBasket,
  (basket) => basket?.items ?? []
);

export const selectBasketLoading = createSelector(
  selectBasketState,
  (state) => state.loading
);

export const selectBasketError = createSelector(
  selectBasketState,
  (state) => state.error
);

export const selectBasketTotalPrice = createSelector(
  selectBasket,
  (basket) => basket?.totalPrice
);

export const selectIsBasketEmpty = createSelector(
  selectBasketState,
  (state) => !state.basket || state.basket.items.length === 0
);

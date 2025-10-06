import { createReducer, on } from '@ngrx/store';
import { BasketActions } from './basket.actions';
import { Basket } from '@oms-frontend/shared/data-access';

export interface BasketState {
  basket: Basket | null;
  loading: boolean;
  error: string | null;
}

export const initialState: BasketState = {
  basket: null,
  loading: false,
  error: null,
};

export const basketReducer = createReducer(
  initialState,

  on(
    BasketActions.createBasket,
    BasketActions.loadBasket,
    BasketActions.addItem,
    BasketActions.removeItem,
    BasketActions.checkoutBasket,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  on(
    BasketActions.createBasketSuccess,
    BasketActions.loadBasketSuccess,
    BasketActions.addItemSuccess,
    BasketActions.removeItemSuccess,
    BasketActions.checkoutBasketSuccess,
    (state, { basket }) => ({
      ...state,
      basket,
      loading: false,
    })
  ),

  on(
    BasketActions.createBasketFailure,
    BasketActions.loadBasketFailure,
    BasketActions.addItemFailure,
    BasketActions.removeItemFailure,
    BasketActions.checkoutBasketFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);

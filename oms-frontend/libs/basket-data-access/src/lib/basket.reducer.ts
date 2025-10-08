import { createReducer, on } from '@ngrx/store';
import { Basket } from '@oms-frontend/models';
import {
  BasketAddItemActions,
  BasketCheckoutActions,
  BasketClearActions,
  BasketCreationActions,
  BasketLoadActions,
  BasketRemoveItemActions,
} from './basket.actions';

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

  on(BasketCreationActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BasketCreationActions.success, (state, { basket }) => ({
    ...state,
    basket,
    loading: false,
  })),
  on(BasketCreationActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(BasketLoadActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BasketLoadActions.success, (state, { basket }) => ({
    ...state,
    basket,
    loading: false,
  })),
  on(BasketLoadActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(BasketAddItemActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BasketAddItemActions.success, (state, { basket }) => ({
    ...state,
    basket,
    loading: false,
  })),
  on(BasketAddItemActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(BasketRemoveItemActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BasketRemoveItemActions.success, (state, { basket }) => ({
    ...state,
    basket,
    loading: false,
  })),
  on(BasketRemoveItemActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(BasketCheckoutActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BasketCheckoutActions.success, (state, { basket }) => ({
    ...state,
    basket,
    loading: false,
  })),
  on(BasketCheckoutActions.failure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BasketClearActions.request, (state) => ({
    ...state,
    basket: null,
    loading: false,
    error: null,
  }))
);

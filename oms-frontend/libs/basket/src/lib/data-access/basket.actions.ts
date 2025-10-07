import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Basket, BasketItem } from '@oms-frontend/shared';

export const BasketCreationActions = createActionGroup({
  source: 'Basket/Create',
  events: {
    Request: props<{ customerId: string }>(),
    Success: props<{ basket: Basket }>(),
    Failure: props<{ error: string }>(),
  },
});

export const BasketLoadActions = createActionGroup({
  source: 'Basket/Load',
  events: {
    Request: props<{ customerId: string }>(),
    Success: props<{ basket: Basket }>(),
    Failure: props<{ error: string }>(),
  },
});

export const BasketAddItemActions = createActionGroup({
  source: 'Basket/Add Item',
  events: {
    Request: props<{ customerId: string; item: BasketItem }>(),
    Success: props<{ basket: Basket }>(),
    Failure: props<{ error: string }>(),
  },
});

export const BasketRemoveItemActions = createActionGroup({
  source: 'Basket/Remove Item',
  events: {
    Request: props<{ customerId: string; item: BasketItem }>(),
    Success: props<{ basket: Basket }>(),
    Failure: props<{ error: string }>(),
  },
});

export const BasketCheckoutActions = createActionGroup({
  source: 'Basket/Checkout',
  events: {
    Request: props<{ customerId: string }>(),
    Success: props<{ basket: Basket }>(),
    Failure: props<{ error: string }>(),
  },
});

export const BasketClearActions = createActionGroup({
  source: 'Basket/Clear',
  events: {
    request: emptyProps(),
  },
});

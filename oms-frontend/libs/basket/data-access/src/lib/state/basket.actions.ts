import { createActionGroup, props } from '@ngrx/store';
import { Basket, BasketItem } from '@oms-frontend/shared/data-access';

export const BasketActions = createActionGroup({
  source: 'Basket',
  events: {
    'Create Basket': props<{ customerId: string }>(),
    'Create Basket Success': props<{ basket: Basket }>(),
    'Create Basket Failure': props<{ error: string }>(),

    'Load Basket': props<{ customerId: string }>(),
    'Load Basket Success': props<{ basket: Basket }>(),
    'Load Basket Failure': props<{ error: string }>(),

    'Add Item': props<{ customerId: string; item: BasketItem }>(),
    'Add Item Success': props<{ basket: Basket }>(),
    'Add Item Failure': props<{ error: string }>(),

    'Remove Item': props<{ customerId: string; item: BasketItem }>(),
    'Remove Item Success': props<{ basket: Basket }>(),
    'Remove Item Failure': props<{ error: string }>(),

    'Checkout Basket': props<{ customerId: string }>(),
    'Checkout Basket Success': props<{ basket: Basket }>(),
    'Checkout Basket Failure': props<{ error: string }>(),
  },
});

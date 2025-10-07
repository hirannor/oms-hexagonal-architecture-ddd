import { createActionGroup, props } from '@ngrx/store';
import { Product } from '@oms-frontend/shared/data-access';

export const ProductLoadActions = createActionGroup({
  source: 'Product/Load All',
  events: {
    request: props<{ category?: string; search?: string }>(),
    success: props<{ products: Product[] }>(),
    failure: props<{ error: string }>(),
  },
});

export const ProductDetailsActions = createActionGroup({
  source: 'Product/Load By Id',
  events: {
    request: props<{ id: string }>(),
    success: props<{ product: Product }>(),
    failure: props<{ error: string }>(),
  },
});

export const ProductCreateActions = createActionGroup({
  source: 'Product/Create',
  events: {
    request: props<{ product: Product }>(),
    success: props<{ product: Product }>(),
    failure: props<{ error: string }>(),
  },
});

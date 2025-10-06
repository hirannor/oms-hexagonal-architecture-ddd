import { createAction, props } from '@ngrx/store';
import { Product } from '@oms-frontend/shared/data-access';

export const loadProducts = createAction(
    '[Product] Load All',
    props<{ category?: string; search?: string }>()
);
export const loadProductsSuccess = createAction(
  '[Product] Load All Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load All Failure',
  props<{ error: string }>()
);

export const loadProductById = createAction(
  '[Product] Load By ID',
  props<{ id: string }>()
);

export const loadProductByIdSuccess = createAction(
  '[Product] Load By ID Success',
  props<{ product: Product }>()
);

export const loadProductByIdFailure = createAction(
  '[Product] Load By ID Failure',
  props<{ error: string }>()
);

export const createProduct = createAction(
  '[Product] Create',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product] Create Success',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product] Create Failure',
  props<{ error: string }>()
);

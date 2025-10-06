import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '@oms-frontend/shared/data-access';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.loadProductsSuccess, (state, {products}) => ({
    ...state,
    products,
    loading: false,
  })),
  on(ProductActions.loadProductsFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ProductActions.loadProductById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.loadProductByIdSuccess, (state, {product}) => ({
    ...state,
    selectedProduct: product,
    loading: false,
  })),
  on(ProductActions.loadProductByIdFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ProductActions.createProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductActions.createProductSuccess, (state, {product}) => ({
    ...state,
    products: [...state.products, product],
    loading: false,
  })),
  on(ProductActions.createProductFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false,
  }))
);

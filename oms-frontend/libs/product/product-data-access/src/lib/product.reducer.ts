import { createReducer, on } from '@ngrx/store';
import { Product } from '@oms-frontend/models';
import {
  ProductCreateActions,
  ProductDetailsActions,
  ProductLoadActions,
} from './product.actions';

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

  on(ProductLoadActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductLoadActions.success, (state, { products }) => ({
    ...state,
    products,
    loading: false,
  })),
  on(ProductLoadActions.failure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ProductDetailsActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductDetailsActions.success, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false,
  })),
  on(ProductDetailsActions.failure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(ProductCreateActions.request, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProductCreateActions.success, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
    loading: false,
  })),
  on(ProductCreateActions.failure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

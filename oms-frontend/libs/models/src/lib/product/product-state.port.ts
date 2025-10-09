import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

export interface ProductState {
  readonly products$: Observable<Product[]>;

  readonly loading$: Observable<boolean>;

  loadProducts(category?: string): void;
}

export const PRODUCT_STATE = new InjectionToken<ProductState>('PRODUCT_STATE');

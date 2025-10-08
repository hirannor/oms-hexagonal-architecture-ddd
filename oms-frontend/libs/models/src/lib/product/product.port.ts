import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

export interface IProductPort {
  readonly products$: Observable<Product[]>;

  readonly loading$: Observable<boolean>;

  loadProducts(category?: string): void;
}

export const PRODUCT_PORT = new InjectionToken<IProductPort>('PRODUCT_PORT');

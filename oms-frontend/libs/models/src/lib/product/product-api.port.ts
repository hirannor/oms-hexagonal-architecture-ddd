import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

export interface ProductApi {
  displayBy(id: string): Observable<Product>;

  displayAll(category?: string, search?: string): Observable<Product[]>;
}

export const PRODUCT_API = new InjectionToken<ProductApi>('PRODUCT_API');

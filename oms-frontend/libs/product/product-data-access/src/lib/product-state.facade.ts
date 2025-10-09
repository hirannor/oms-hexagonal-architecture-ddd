import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product, ProductState } from '@oms-frontend/models';
import { ProductLoadActions } from './product.actions';
import { selectAllProducts, selectProductLoading } from './product.selector';

@Injectable({ providedIn: 'root' })
export class ProductStateFacade implements ProductState {
  private readonly store = inject(Store);

  readonly products$: Observable<Product[]> =
    this.store.select(selectAllProducts);
  readonly loading$: Observable<boolean> =
    this.store.select(selectProductLoading);

  loadProducts(category?: string): void {
    this.store.dispatch(ProductLoadActions.request({ category }));
  }
}

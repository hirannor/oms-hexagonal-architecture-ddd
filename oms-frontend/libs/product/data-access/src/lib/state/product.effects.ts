import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductApi } from '@oms-frontend/api/product-data-access';
import { NotificationService } from '@oms-frontend/services';
import { ProductMapper } from '@oms-frontend/shared/data-access';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private api = inject(ProductApi);
  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductById),
      mergeMap(({id}) =>
        this.api.displayBy(id).pipe(
          map((res) =>
            ProductActions.loadProductByIdSuccess({
              product: ProductMapper.mapToProduct(res),
            })
          ),
          catchError((err) =>
            of(
              ProductActions.loadProductByIdFailure({
                error: err?.message ?? 'Failed to load product',
              })
            )
          )
        )
      )
    )
  );
  private notifications = inject(NotificationService);
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(({category, search}) =>
        this.api.displayAll().pipe(
          map((res) =>
            ProductActions.loadProductsSuccess({
              products: res.map(ProductMapper.mapToProduct),
            })
          ),
          catchError((err) => {
            console.log(err);
            this.notifications.error('Failed to load products');
            return of(
              ProductActions.loadProductsFailure({
                error: err?.message ?? 'Failed to load products',
              })
            );
          })
        )
      )
    )
  );
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({product}) =>
        this.api.create(ProductMapper.mapToProductModel(product)).pipe(
          map((res) =>
            ProductActions.createProductSuccess({
              product: ProductMapper.mapToProduct(res),
            })
          ),
          catchError((err) => {
            this.notifications.error('Failed to create product');
            return of(
              ProductActions.createProductFailure({
                error: err?.message ?? 'Failed to create product',
              })
            );
          })
        )
      )
    )
  );
}

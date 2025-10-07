import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductMapper } from '@oms-frontend/domain';
import { NotificationService } from '@oms-frontend/shared';
import {
  ProductCreateActions,
  ProductDetailsActions,
  ProductLoadActions,
} from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductApi } from '@oms-frontend/api/product-data-access';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private api = inject(ProductApi);
  private notifications = inject(NotificationService);

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductDetailsActions.request),
      mergeMap(({ id }) =>
        this.api.displayBy(id).pipe(
          map((res) =>
            ProductDetailsActions.success({
              product: ProductMapper.mapToProduct(res),
            })
          ),
          catchError((err) =>
            of(
              ProductDetailsActions.failure({
                error: err?.message ?? 'failed to load product',
              })
            )
          )
        )
      )
    )
  );

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductLoadActions.request),
      mergeMap(({ category, search }) =>
        this.api.displayAll().pipe(
          map((res) =>
            ProductLoadActions.success({
              products: res.map(ProductMapper.mapToProduct),
            })
          ),
          catchError((err) => {
            this.notifications.error('failed to load products');
            return of(
              ProductLoadActions.failure({
                error: err?.message ?? 'failed to load products',
              })
            );
          })
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCreateActions.request),
      mergeMap(({ product }) =>
        this.api.create(ProductMapper.mapToProductModel(product)).pipe(
          map((res) =>
            ProductCreateActions.success({
              product: ProductMapper.mapToProduct(res),
            })
          ),
          catchError((err) => {
            this.notifications.error('failed to create product');
            return of(
              ProductCreateActions.failure({
                error: err?.message ?? 'failed to create product',
              })
            );
          })
        )
      )
    )
  );
}

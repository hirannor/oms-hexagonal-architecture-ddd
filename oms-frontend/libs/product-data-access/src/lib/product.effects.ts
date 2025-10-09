import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '@oms-frontend/shared';
import { ProductDetailsActions, ProductLoadActions } from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { PRODUCT_API } from '@oms-frontend/models';

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(PRODUCT_API);
  private readonly notifications = inject(NotificationService);

  loadById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductDetailsActions.request),
      mergeMap(({ id }) =>
        this.api.displayBy(id).pipe(
          map((product) => ProductDetailsActions.success({ product })),
          catchError((err) =>
            of(
              ProductDetailsActions.failure({
                error: err?.message ?? 'Failed to load product',
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
        this.api.displayAll(category, search).pipe(
          map((products) => ProductLoadActions.success({ products })),
          catchError((err) => {
            this.notifications.error('Failed to load products');
            return of(
              ProductLoadActions.failure({
                error: err?.message ?? 'Failed to load products',
              })
            );
          })
        )
      )
    )
  );
}

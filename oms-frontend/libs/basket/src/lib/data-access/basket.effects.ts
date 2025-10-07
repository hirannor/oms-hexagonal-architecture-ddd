import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BasketMapper, NotificationService } from '@oms-frontend/shared';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { BasketApi } from '@oms-frontend/api/basket-data-access';
import { selectBasket } from './basket.selector';
import {
  BasketAddItemActions,
  BasketCheckoutActions,
  BasketCreationActions,
  BasketLoadActions,
  BasketRemoveItemActions,
} from './basket.actions';

@Injectable()
export class BasketEffects {
  private readonly actions$ = inject(Actions);
  private readonly basketApi = inject(BasketApi);
  private readonly store = inject(Store);
  private readonly notifications = inject(NotificationService);

  loadBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketLoadActions.request),
      mergeMap(({ customerId }) =>
        this.basketApi.displayBy(customerId).pipe(
          map((apiBasket) =>
            BasketLoadActions.success({
              basket: this.normalize(BasketMapper.mapToBasket(apiBasket)),
            })
          ),
          catchError((error) => {
            const message =
              error.status === 404
                ? 'empty'
                : error.message ?? 'Failed to load basket';
            return of(BasketLoadActions.failure({ error: message }));
          })
        )
      )
    )
  );

  createBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketCreationActions.request),
      mergeMap(({ customerId }) =>
        this.basketApi.createBasket({ customerId }).pipe(
          map((apiBasket) => {
            this.notifications.success('Basket created successfully');
            return BasketCreationActions.success({
              basket: this.normalize(BasketMapper.mapToBasket(apiBasket)),
            });
          }),
          catchError((error) => {
            this.notifications.error(
              'Failed to create basket',
              error?.message ?? 'Unknown error'
            );
            return of(
              BasketCreationActions.failure({
                error: error.message ?? 'Failed to create basket',
              })
            );
          })
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketAddItemActions.request),
      withLatestFrom(this.store.select(selectBasket)),
      concatMap(([{ customerId, item }, basket]) => {
        const basketId = basket?.id;

        const addItemToBasket = (id: string) =>
          this.basketApi
            .addItem(id, BasketMapper.mapToBasketItemModel(item))
            .pipe(
              switchMap(() =>
                this.basketApi.displayBy(customerId).pipe(
                  map((apiBasket) => {
                    const updated = this.normalize(
                      BasketMapper.mapToBasket(apiBasket)
                    );
                    this.notifications.success(`${item.name} added to basket`);
                    return BasketAddItemActions.success({ basket: updated });
                  })
                )
              ),
              catchError((error) => {
                this.notifications.error(
                  'Failed to add item',
                  error?.message ?? 'Unknown error'
                );
                return of(
                  BasketAddItemActions.failure({
                    error: error.message ?? 'Failed to add item',
                  })
                );
              })
            );

        if (!basketId) {
          return this.basketApi.createBasket({ customerId }).pipe(
            switchMap((apiBasket) =>
              addItemToBasket(BasketMapper.mapToBasket(apiBasket).id)
            ),
            catchError((error) =>
              of(
                BasketCreationActions.failure({
                  error:
                    error.message ?? 'Failed to create basket before adding',
                })
              )
            )
          );
        }

        return addItemToBasket(basketId);
      })
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketRemoveItemActions.request),
      withLatestFrom(this.store.select(selectBasket)),
      concatMap(([{ customerId, item }, basket]) => {
        if (!basket?.id) {
          this.notifications.error('Cannot remove item — basket not found');
          return of(
            BasketRemoveItemActions.failure({ error: 'Basket not found' })
          );
        }

        return this.basketApi
          .removeItem(basket.id, BasketMapper.mapToBasketItemModel(item))
          .pipe(
            switchMap(() =>
              this.basketApi.displayBy(customerId).pipe(
                map((apiBasket) => {
                  const updated = this.normalize(
                    BasketMapper.mapToBasket(apiBasket)
                  );

                  const stillInBasket = updated.items.some(
                    (i) => i.productId === item.productId
                  );

                  if (stillInBasket) {
                    this.notifications.info(
                      `Reduced quantity for ${item.name}`
                    );
                  } else {
                    this.notifications.info(`${item.name} removed`);
                  }

                  return BasketRemoveItemActions.success({
                    basket: updated,
                  });
                })
              )
            ),
            catchError((error) => {
              this.notifications.error(
                'Failed to remove item',
                error?.message ?? 'Unknown error'
              );
              return of(
                BasketRemoveItemActions.failure({
                  error: error.message ?? 'Failed to remove item',
                })
              );
            })
          );
      })
    )
  );

  checkoutBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketCheckoutActions.request),
      switchMap(({ customerId }) =>
        this.basketApi.checkout(customerId).pipe(
          map((apiBasket) => {
            const basket = this.normalize(BasketMapper.mapToBasket(apiBasket));
            return BasketCheckoutActions.success({ basket });
          }),
          catchError((error) => {
            this.notifications.error(
              'Checkout failed',
              error?.message ?? 'Unknown error'
            );
            return of(
              BasketCheckoutActions.failure({
                error: error.message ?? 'Checkout failed',
              })
            );
          })
        )
      )
    )
  );

  checkoutNavigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BasketCheckoutActions.success),
        tap(() => {
          this.notifications.info('Your basket has been checked out.');
        })
      ),
    { dispatch: false }
  );

  private normalize(basket: ReturnType<typeof BasketMapper.mapToBasket>) {
    basket.items = [...basket.items].sort((a, b) =>
      a.productId.localeCompare(b.productId)
    );
    return basket;
  }
}

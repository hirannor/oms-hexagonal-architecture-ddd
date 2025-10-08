import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BasketMapper } from '@oms-frontend/models';
import { NotificationService } from '@oms-frontend/shared';
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
  BasketClearActions,
  BasketCreationActions,
  BasketLoadActions,
  BasketRemoveItemActions,
} from './basket.actions';
import { OrderCreateActions } from '@oms-frontend/order-data-access';

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
        const existingBasketId = basket?.id;

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

                    const prevItem = basket?.items.find(
                      (i) => i.productId === item.productId
                    );
                    const newItem = updated.items.find(
                      (i) => i.productId === item.productId
                    );

                    if (!prevItem && newItem) {
                      this.notifications.success(
                        `${item.name} added to basket`
                      );
                    } else if (
                      prevItem &&
                      newItem &&
                      newItem.quantity > prevItem.quantity
                    ) {
                      this.notifications.info(
                        `${item.name} quantity increased`
                      );
                    } else if (
                      prevItem &&
                      newItem &&
                      newItem.quantity === prevItem.quantity
                    ) {
                      this.notifications.info(`${item.name} already in basket`);
                    }

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

        if (!existingBasketId) {
          return this.basketApi.displayBy(customerId).pipe(
            switchMap((existing) => {
              if (existing?.id) return addItemToBasket(existing.id);
              return this.basketApi
                .createBasket({ customerId })
                .pipe(
                  switchMap((created) =>
                    addItemToBasket(BasketMapper.mapToBasket(created).id)
                  )
                );
            }),
            catchError((error) => {
              if (error.status === 404) {
                return this.basketApi
                  .createBasket({ customerId })
                  .pipe(
                    switchMap((created) =>
                      addItemToBasket(BasketMapper.mapToBasket(created).id)
                    )
                  );
              }
              this.notifications.error(
                'Failed to add item',
                error.message ?? 'Unknown error'
              );
              return of(
                BasketAddItemActions.failure({
                  error: error.message ?? 'Failed to add item',
                })
              );
            })
          );
        }

        return addItemToBasket(existingBasketId);
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

        const prevItem = basket.items.find(
          (i) => i.productId === item.productId
        );

        return this.basketApi
          .removeItem(basket.id, BasketMapper.mapToBasketItemModel(item))
          .pipe(
            switchMap(() =>
              this.basketApi.displayBy(customerId).pipe(
                map((apiBasket) => {
                  const updated = this.normalize(
                    BasketMapper.mapToBasket(apiBasket)
                  );

                  const newItem = updated.items.find(
                    (i) => i.productId === item.productId
                  );

                  if (!newItem && prevItem) {
                    this.notifications.info(`${item.name} removed from basket`);
                  } else if (
                    newItem &&
                    prevItem &&
                    newItem.quantity < prevItem.quantity
                  ) {
                    this.notifications.info(
                      `Reduced quantity for ${item.name}`
                    );
                  }

                  return BasketRemoveItemActions.success({ basket: updated });
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

  clearBasketAfterOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderCreateActions.success),
      map(() => BasketClearActions.request())
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

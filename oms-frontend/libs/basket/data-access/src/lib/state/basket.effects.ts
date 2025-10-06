import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BasketApi } from '@oms-frontend/api/basket-data-access';
import { BasketMapper } from '@oms-frontend/shared/data-access';
import { Store } from '@ngrx/store';
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
import { NotificationService } from '@oms-frontend/services';
import { BasketActions } from './basket.actions';
import { selectBasket } from './basket.selector';
import { Router } from '@angular/router';

@Injectable()
export class BasketEffects {
  private readonly actions$ = inject(Actions);
  private readonly basketApi = inject(BasketApi);
  loadBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketActions.loadBasket),
      mergeMap(({ customerId }) =>
        this.basketApi.displayBy(customerId).pipe(
          map((apiBasket) =>
            BasketActions.loadBasketSuccess({
              basket: this.normalize(BasketMapper.mapToBasket(apiBasket)),
            })
          ),
          catchError((error) => {
            if (error.status === 404) {
              return of(BasketActions.loadBasketFailure({ error: 'empty' }));
            }
            return of(
              BasketActions.loadBasketFailure({
                error: error.message ?? 'Failed to load basket',
              })
            );
          })
        )
      )
    )
  );
  private readonly store = inject(Store);
  private readonly notifications = inject(NotificationService);
  createBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketActions.createBasket),
      mergeMap(({ customerId }) =>
        this.basketApi.createBasket({ customerId }).pipe(
          map((apiBasket) => {
            this.notifications.success('Basket created successfully');
            return BasketActions.createBasketSuccess({
              basket: this.normalize(BasketMapper.mapToBasket(apiBasket)),
            });
          }),
          catchError((error) => {
            this.notifications.error(
              'Failed to create basket',
              error?.message ?? 'Unknown error'
            );
            return of(
              BasketActions.createBasketFailure({
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
      ofType(BasketActions.addItem),
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
                    return BasketActions.addItemSuccess({ basket: updated });
                  })
                )
              ),
              catchError((error) => {
                this.notifications.error(
                  'Failed to add item',
                  error?.message ?? 'Unknown error'
                );
                return of(
                  BasketActions.addItemFailure({
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
                BasketActions.createBasketFailure({
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
      ofType(BasketActions.removeItem),
      withLatestFrom(this.store.select(selectBasket)),
      concatMap(([{ customerId, item }, basket]) => {
        if (!basket?.id) {
          this.notifications.error('Cannot remove item — basket not found');
          return of(
            BasketActions.removeItemFailure({ error: 'Basket not found' })
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

                  return BasketActions.removeItemSuccess({
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
                BasketActions.removeItemFailure({
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
      ofType(BasketActions.checkoutBasket),
      switchMap(({ customerId }) =>
        this.basketApi.checkout(customerId).pipe(
          map((apiBasket) => {
            const basket = this.normalize(BasketMapper.mapToBasket(apiBasket));
            return BasketActions.checkoutBasketSuccess({ basket });
          }),
          catchError((error) => {
            this.notifications.error(
              'Checkout failed',
              error?.message ?? 'Unknown error'
            );
            return of(
              BasketActions.checkoutBasketFailure({
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
        ofType(BasketActions.checkoutBasketSuccess),
        tap(() => {
          this.notifications.info('Your basket has been checked out.');
        })
      ),
    { dispatch: false }
  );
  private readonly router = inject(Router);

  private normalize(basket: ReturnType<typeof BasketMapper.mapToBasket>) {
    basket.items = [...basket.items].sort((a, b) =>
      a.productId.localeCompare(b.productId)
    );
    return basket;
  }
}

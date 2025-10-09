import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Basket, BASKET_API } from '@oms-frontend/models';
import { NotificationService } from '@oms-frontend/shared';
import {
  catchError,
  concatMap,
  map,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  BasketAddItemActions,
  BasketCheckoutActions,
  BasketClearActions,
  BasketCreationActions,
  BasketLoadActions,
  BasketRemoveItemActions,
} from './basket.actions';
import { OrderCreateActions } from '@oms-frontend/order-data-access';
import { selectBasket } from './basket.selector';

@Injectable()
export class BasketEffects {
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly basketApi = inject(BASKET_API);
  private readonly store = inject(Store);
  private readonly notifications = inject(NotificationService);

  loadBasket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketLoadActions.request),
      switchMap(({ customerId }) =>
        this.basketApi.displayBy(customerId).pipe(
          map((basket) =>
            BasketLoadActions.success({ basket: this.normalize(basket) })
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
      switchMap(({ customerId }) =>
        this.basketApi.createBasket(customerId).pipe(
          map((basket) => {
            this.notifications.success('Basket created successfully');
            return BasketCreationActions.success({
              basket: this.normalize(basket),
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

        const handleAdd = (basketId: string) =>
          this.basketApi.addItem(basketId, customerId, item).pipe(
            map((updated) => {
              const prevItem = basket?.items.find(
                (i) => i.productId === item.productId
              );
              const newItem = updated.items.find(
                (i) => i.productId === item.productId
              );

              if (!prevItem && newItem) {
                this.notifications.success(`${item.name} added to basket`);
              } else if (
                prevItem &&
                newItem &&
                newItem.quantity > prevItem.quantity
              ) {
                this.notifications.info(`${item.name} quantity increased`);
              } else if (
                prevItem &&
                newItem &&
                newItem.quantity === prevItem.quantity
              ) {
                this.notifications.info(`${item.name} already in basket`);
              }

              return BasketAddItemActions.success({
                basket: this.normalize(updated),
              });
            }),
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
              if (existing?.id) return handleAdd(existing.id);
              return this.basketApi
                .createBasket(customerId)
                .pipe(switchMap((created) => handleAdd(created.id)));
            }),
            catchError((error) => {
              if (error.status === 404) {
                return this.basketApi
                  .createBasket(customerId)
                  .pipe(switchMap((created) => handleAdd(created.id)));
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

        return handleAdd(existingBasketId);
      })
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketRemoveItemActions.request),
      withLatestFrom(this.store.select(selectBasket)),
      concatMap(([{ item }, basket]) => {
        if (!basket?.id || !basket.customerId) {
          this.notifications.error('Cannot remove item — basket not found');
          return of(
            BasketRemoveItemActions.failure({ error: 'Basket not found' })
          );
        }

        const prevItem = basket.items.find(
          (i) => i.productId === item.productId
        );

        return this.basketApi
          .removeItem(basket.id, basket.customerId, item)
          .pipe(
            map((updated) => {
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
                this.notifications.info(`Reduced quantity for ${item.name}`);
              }

              return BasketRemoveItemActions.success({
                basket: this.normalize(updated),
              });
            }),
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
          map((basket) =>
            BasketCheckoutActions.success({ basket: this.normalize(basket) })
          ),
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

  addItemNavigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BasketAddItemActions.success),
        tap(() => {
          this.notifications.info('Redirecting to your basket...');
          this.router.navigate(['/basket']);
        })
      ),
    { dispatch: false }
  );

  reloadBasketAfterCheckout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BasketCheckoutActions.success),
      switchMap(({ basket }) => {
        if (!basket.customerId)
          return of(BasketLoadActions.failure({ error: 'No customerId' }));
        return of(BasketLoadActions.request({ customerId: basket.customerId }));
      })
    )
  );

  private normalize(basket: Basket): Basket {
    basket.items = [...basket.items].sort((a, b) =>
      a.productId.localeCompare(b.productId)
    );
    return basket;
  }
}

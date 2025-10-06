import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { OrderApi } from '@oms-frontend/api/order-data-access';
import { OrderActions } from './order.actions';
import { NotificationService } from '@oms-frontend/services';
import { OrderMapper } from '@oms-frontend/shared/data-access';
import { ProblemDetailsMapper } from '@oms-frontend/models';

@Injectable()
export class OrderEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(OrderApi);
  private readonly notifications = inject(NotificationService);
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      mergeMap(() =>
        this.api.displayMine().pipe(
          map((apiOrders) =>
            OrderActions.loadOrdersSuccess({
              orders: apiOrders.map(OrderMapper.mapToOrder),
            })
          ),
          catchError((err) => {
            if (err.error) {
              const problem = ProblemDetailsMapper.fromApi(err.error);
              this.notifications.fromProblem(problem);
            } else {
              this.notifications.error(
                'Failed to load orders',
                err.message ?? 'Unknown error'
              );
            }
            return of(
              OrderActions.loadOrdersFailure({
                error: err?.message ?? 'Load orders failed',
              })
            );
          })
        )
      )
    )
  );
  payOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.payOrder),
      mergeMap(({orderId}) =>
        this.api.pay(orderId).pipe(
          map((response) => {
            const {paymentUrl} = response;
            window.open(paymentUrl, '_blank');
            this.notifications.success('Redirecting to payment...');
            return OrderActions.payOrderSuccess({paymentUrl});
          }),
          catchError((err) => {
            if (err.error) {
              const problem = ProblemDetailsMapper.fromApi(err.error);
              this.notifications.fromProblem(problem);
            } else {
              this.notifications.error(
                'Payment failed',
                err.message ?? 'Unknown error'
              );
            }
            return of(
              OrderActions.payOrderFailure({
                error: err?.message ?? 'Payment failed',
              })
            );
          })
        )
      )
    )
  );
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      mergeMap(({customerId, products}) => {
        const createOrder = OrderMapper.mapToCreateOrderModel({
          customerId,
          products,
        });

        return this.api.createOrder(createOrder).pipe(
          map((apiOrder) => {
            const order = OrderMapper.mapToOrder(apiOrder);
            this.notifications.success('Order created successfully');
            return OrderActions.createOrderSuccess({order});
          }),
          catchError((err) => {
            if (err.error) {
              const problem = ProblemDetailsMapper.fromApi(err.error);
              this.notifications.fromProblem(problem);
            } else {
              this.notifications.error(
                'Order creation failed',
                err.message ?? 'Unknown error'
              );
            }
            return of(
              OrderActions.createOrderFailure({
                error: err?.message ?? 'Order creation failed',
              })
            );
          })
        );
      })
    )
  );
  loadOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrderById),
      mergeMap(({orderId}) =>
        this.api.displayBy(orderId).pipe(
          map((apiOrder) =>
            OrderActions.loadOrderByIdSuccess({
              order: OrderMapper.mapToOrder(apiOrder),
            })
          ),
          catchError((err) => {
            if (err.error) {
              const problem = ProblemDetailsMapper.fromApi(err.error);
              this.notifications.fromProblem(problem);
            } else {
              this.notifications.error(
                'Failed to load order',
                err.message ?? 'Unknown error'
              );
            }
            return of(
              OrderActions.loadOrderByIdFailure({
                error: err?.message ?? 'Load order failed',
              })
            );
          })
        )
      )
    )
  );
  private readonly router = inject(Router);
  navigateAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.createOrderSuccess),
        tap(({order}) => {
          this.router.navigate([`/orders/${order.id}`]);
        })
      ),
    {dispatch: false}
  );
}

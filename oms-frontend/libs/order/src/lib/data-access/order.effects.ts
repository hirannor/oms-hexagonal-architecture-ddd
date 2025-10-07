import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import {
  OrderCreateActions,
  OrderDetailsActions,
  OrderLoadActions,
  OrderPaymentActions,
} from './order.actions';
import { OrderApi } from '@oms-frontend/api/order-data-access';
import { NotificationService } from '@oms-frontend/services';
import { OrderMapper } from '@oms-frontend/shared/data-access';
import { ProblemDetailsMapper } from '@oms-frontend/models';

@Injectable()
export class OrderEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(OrderApi);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderLoadActions.request),
      mergeMap(() =>
        this.api.displayMine().pipe(
          map((apiOrders) =>
            OrderLoadActions.success({
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
              OrderLoadActions.failure({
                error: err?.message ?? 'Load orders failed',
              })
            );
          })
        )
      )
    )
  );

  /** 💳 Pay for an order */
  payOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderPaymentActions.request),
      mergeMap(({ orderId }) =>
        this.api.pay(orderId).pipe(
          map((response) => {
            const { paymentUrl } = response;
            window.open(paymentUrl, '_blank');
            this.notifications.success('Redirecting to payment...');
            return OrderPaymentActions.success({ paymentUrl });
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
              OrderPaymentActions.failure({
                error: err?.message ?? 'Payment failed',
              })
            );
          })
        )
      )
    )
  );

  /** 🛒 Create new order */
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderCreateActions.request),
      mergeMap(({ customerId, products }) => {
        const createOrder = OrderMapper.mapToCreateOrderModel({
          customerId,
          products,
        });

        return this.api.createOrder(createOrder).pipe(
          map((apiOrder) => {
            const order = OrderMapper.mapToOrder(apiOrder);
            this.notifications.success('Order created successfully');
            return OrderCreateActions.success({ order });
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
              OrderCreateActions.failure({
                error: err?.message ?? 'Order creation failed',
              })
            );
          })
        );
      })
    )
  );

  /** 🔍 Load single order by ID */
  loadOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.request),
      mergeMap(({ orderId }) =>
        this.api.displayBy(orderId).pipe(
          map((apiOrder) =>
            OrderDetailsActions.success({
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
              OrderDetailsActions.failure({
                error: err?.message ?? 'Load order failed',
              })
            );
          })
        )
      )
    )
  );

  navigateAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderCreateActions.success),
        tap(({ order }) => {
          this.router.navigate([`/orders/${order.id}`]);
        })
      ),
    { dispatch: false }
  );
}

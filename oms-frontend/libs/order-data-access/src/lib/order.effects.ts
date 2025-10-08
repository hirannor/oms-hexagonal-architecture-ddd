import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  NotificationService,
  ProblemDetailsMapper,
} from '@oms-frontend/shared';
import {
  OrderCreateActions,
  OrderDetailsActions,
  OrderLoadActions,
  OrderPaymentActions,
} from './order.actions';
import { ORDER_API_PORT } from '@oms-frontend/models';

@Injectable()
export class OrderEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(ORDER_API_PORT);
  private readonly notifications = inject(NotificationService);
  private readonly router = inject(Router);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderLoadActions.request),
      mergeMap(() =>
        this.api.displayMine().pipe(
          map((orders) => OrderLoadActions.success({ orders })),
          catchError((err) => {
            this.handleError('Failed to load orders', err);
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

  payOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderPaymentActions.request),
      mergeMap(({ orderId }) =>
        this.api.pay(orderId).pipe(
          map(({ paymentUrl }) => {
            window.open(paymentUrl, '_blank');
            this.notifications.success('Redirecting to payment...');
            return OrderPaymentActions.success({ paymentUrl });
          }),
          catchError((err) => {
            this.handleError('Payment failed', err);
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

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderCreateActions.request),
      mergeMap(({ customerId, products }) =>
        this.api.createOrder({ customerId, products }).pipe(
          map((order) => {
            this.notifications.success('Order created successfully');
            return OrderCreateActions.success({ order });
          }),
          catchError((err) => {
            this.handleError('Order creation failed', err);
            return of(
              OrderCreateActions.failure({
                error: err?.message ?? 'Order creation failed',
              })
            );
          })
        )
      )
    )
  );

  loadOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderDetailsActions.request),
      mergeMap(({ orderId }) =>
        this.api.displayBy(orderId).pipe(
          map((order) => OrderDetailsActions.success({ order })),
          catchError((err) => {
            this.handleError('Failed to load order', err);
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

  private handleError(title: string, err: any) {
    if (err.error) {
      const problem = ProblemDetailsMapper.fromApi(err.error);
      this.notifications.fromProblem(problem);
    } else {
      this.notifications.error(title, err.message ?? 'Unknown error');
    }
  }
}

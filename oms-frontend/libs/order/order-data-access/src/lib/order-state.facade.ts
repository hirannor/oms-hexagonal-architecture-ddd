import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllOrders,
  selectOrderLoading,
  selectSelectedOrder,
} from './order.selector';
import {
  OrderCreateActions,
  OrderDetailsActions,
  OrderLoadActions,
  OrderPaymentActions,
} from './order.actions';
import { Basket, OrderItem, OrderState } from '@oms-frontend/models';
import { AuthService } from '@oms-frontend/shared';

@Injectable({ providedIn: 'root' })
export class OrderStateFacade implements OrderState {
  private readonly store = inject(Store);
  private readonly auth = inject(AuthService);

  readonly loading$ = this.store.select(selectOrderLoading);
  readonly selectedOrder$ = this.store.select(selectSelectedOrder);
  readonly allOrders$ = this.store.select(selectAllOrders);

  loadOrders(): void {
    this.store.dispatch(OrderLoadActions.request());
  }

  loadOrderBy(orderId: string): void {
    this.store.dispatch(OrderDetailsActions.request({ orderId }));
  }

  createOrderFrom(basket: Basket): void {
    const customerId = this.auth.extractCustomerId();
    if (!customerId) return;

    const products: OrderItem[] = basket.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    }));

    this.store.dispatch(OrderCreateActions.request({ customerId, products }));
  }

  pay(orderId: string): void {
    this.store.dispatch(OrderPaymentActions.request({ orderId }));
  }
}

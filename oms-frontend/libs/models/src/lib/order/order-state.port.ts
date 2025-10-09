import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Order } from './order';
import { Basket } from '../basket';

export interface OrderState {
  readonly allOrders$: Observable<Order[]>;
  readonly selectedOrder$: Observable<Order | undefined>;
  readonly loading$: Observable<boolean>;

  loadOrders(): void;

  loadOrderById(orderId: string): void;

  createFromBasket(basket: Basket): void;

  pay(orderId: string): void;
}

export const ORDER_STATE = new InjectionToken<OrderState>('ORDER_STATE');

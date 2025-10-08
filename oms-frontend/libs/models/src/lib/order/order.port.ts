import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Order } from './order';
import { Basket } from '../basket/basket';

export interface IOrderPort {
  readonly allOrders$: Observable<Order[]>;
  readonly selectedOrder$: Observable<Order | undefined>;
  readonly loading$: Observable<boolean>;

  loadOrders(): void;

  loadOrderById(orderId: string): void;

  createFromBasket(basket: Basket): void;

  pay(orderId: string): void;
}

export const ORDER_PORT = new InjectionToken<IOrderPort>('ORDER_PORT');

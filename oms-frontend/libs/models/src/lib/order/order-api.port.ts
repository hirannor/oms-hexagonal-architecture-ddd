import { Order } from './order';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { CreateOrder } from './create-order';

export interface OrderApi {
  displayMine(): Observable<Order[]>;

  displayBy(orderId: string): Observable<Order>;

  createOrder(command: CreateOrder): Observable<Order>;

  pay(orderId: string): Observable<{ paymentUrl: string }>;
}

export const ORDER_API = new InjectionToken<OrderApi>('ORDER_API');

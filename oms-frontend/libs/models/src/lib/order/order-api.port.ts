import { Order } from './order';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { CreateOrder } from './create-order';

export interface IOrderApiPort {
  displayMine(): Observable<Order[]>;

  displayBy(orderId: string): Observable<Order>;

  createOrder(command: CreateOrder): Observable<Order>;

  pay(orderId: string): Observable<{ paymentUrl: string }>;
}

export const ORDER_API_PORT = new InjectionToken<IOrderApiPort>(
  'ORDER_API_PORT'
);

import { CreateOrder, OrderApi } from '@oms-frontend/models';
import { OrderApi as GeneratedOrderApi } from '@oms-frontend/api/order-data-access';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { OrderMapper } from './order-mapper';

@Injectable({ providedIn: 'root' })
export class OrderApiService implements OrderApi {
  private readonly api = inject(GeneratedOrderApi);

  displayMine() {
    return this.api
      .displayMine()
      .pipe(map((orders) => orders.map(OrderMapper.mapToOrder)));
  }

  displayBy(orderId: string) {
    return this.api.displayBy(orderId).pipe(map(OrderMapper.mapToOrder));
  }

  createOrder(command: CreateOrder) {
    return this.api
      .createOrder(OrderMapper.mapToCreateOrderModel(command))
      .pipe(map(OrderMapper.mapToOrder));
  }

  pay(orderId: string) {
    return this.api.pay(orderId);
  }
}

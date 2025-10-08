import { CreateOrder, IOrderApiPort, OrderMapper } from '@oms-frontend/models';
import { OrderApi } from '@oms-frontend/api/order-data-access';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderApiAdapter implements IOrderApiPort {
  private readonly api = inject(OrderApi);

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

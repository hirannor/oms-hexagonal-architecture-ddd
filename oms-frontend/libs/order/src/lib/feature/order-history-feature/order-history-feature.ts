import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '@oms-frontend/shared';
import { OrderHistoryUi } from '../../ui/order-history-ui/order-history-ui';
import { ORDER_PORT } from '@oms-frontend/models';

@Component({
  selector: 'lib-order-feature-history',
  standalone: true,
  imports: [CommonModule, OrderHistoryUi, LoadingSpinnerComponent],
  templateUrl: './order-history-feature.html',
})
export class OrderHistoryFeature implements OnInit {
  private readonly orderFacade = inject(ORDER_PORT);

  readonly orders$ = this.orderFacade.allOrders$;
  readonly loading$ = this.orderFacade.loading$;

  ngOnInit(): void {
    this.orderFacade.loadOrders();
  }
}

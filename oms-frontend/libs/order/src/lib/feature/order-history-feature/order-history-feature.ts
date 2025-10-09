import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '@oms-frontend/shared';
import { OrderHistoryUi } from '../../ui/order-history-ui/order-history-ui';
import { ORDER_STATE } from '@oms-frontend/models';

@Component({
  selector: 'lib-order-feature-history',
  standalone: true,
  imports: [CommonModule, OrderHistoryUi, LoadingSpinnerComponent],
  templateUrl: './order-history-feature.html',
})
export class OrderHistoryFeature implements OnInit {
  private readonly orders = inject(ORDER_STATE);

  readonly orders$ = this.orders.allOrders$;
  readonly loading$ = this.orders.loading$;

  ngOnInit(): void {
    this.orders.loadOrders();
  }
}

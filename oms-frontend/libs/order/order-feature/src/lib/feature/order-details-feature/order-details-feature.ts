import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerComponent } from '@oms-frontend/shared';
import { OrderDetailsUi } from '../../ui/order-details-ui/order-details-ui';
import { ORDER_STATE } from '@oms-frontend/models';

@Component({
  selector: 'lib-order-feature-details',
  standalone: true,
  imports: [CommonModule, OrderDetailsUi, LoadingSpinnerComponent],
  templateUrl: './order-details-feature.html',
})
export class OrderDetailsFeature implements OnInit {
  private readonly orders = inject(ORDER_STATE);
  private readonly route = inject(ActivatedRoute);

  readonly order$ = this.orders.selectedOrder$;
  readonly loading$ = this.orders.loading$;

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orders.loadOrderBy(orderId);
    }
  }

  onPay(orderId: string): void {
    this.orders.pay(orderId);
  }
}

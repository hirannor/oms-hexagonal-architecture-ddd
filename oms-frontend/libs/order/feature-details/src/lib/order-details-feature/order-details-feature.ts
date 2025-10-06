import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsUi } from '@oms-frontend/order/ui';
import {
  OrderActions,
  selectOrderLoading,
  selectSelectedOrder,
} from '@oms-frontend/order/data-access';
import { LoadingSpinnerComponent } from '@oms-frontend/shared/ui';

@Component({
  selector: 'lib-order-feature-details',
  standalone: true,
  imports: [CommonModule, OrderDetailsUi, LoadingSpinnerComponent],
  templateUrl: './order-details-feature.html',
})
export class OrderDetailsFeature implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  readonly order$ = this.store.select(selectSelectedOrder);
  readonly loading$ = this.store.select(selectOrderLoading);

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.store.dispatch(OrderActions.loadOrderById({ orderId }));
    }
  }

  onPay(orderId: string) {
    this.store.dispatch(OrderActions.payOrder({ orderId }));
  }
}

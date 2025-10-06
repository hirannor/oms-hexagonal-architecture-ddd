import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  OrderActions,
  selectAllOrders,
  selectOrderLoading,
} from '@oms-frontend/order/data-access';
import { AuthService } from '@oms-frontend/shared/data-access';
import { OrderHistoryUi } from '@oms-frontend/order/ui';
import { LoadingSpinnerComponent } from '@oms-frontend/shared/ui';

@Component({
  selector: 'lib-order-feature-history',
  standalone: true,
  imports: [CommonModule, OrderHistoryUi, LoadingSpinnerComponent],
  templateUrl: './order-history-feature.html',
})
export class OrderHistoryFeature implements OnInit {
  private readonly store = inject(Store);
  private readonly auth = inject(AuthService);
  readonly orders$ = this.store.select(selectAllOrders);
  readonly loading$ = this.store.select(selectOrderLoading);

  ngOnInit() {
    const customerId = this.auth.extractCustomerId();
    if (customerId) {
      this.store.dispatch(OrderActions.loadOrders());
    }
  }
}

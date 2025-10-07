import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { LoadingSpinnerComponent } from '@oms-frontend/shared';
import {
  selectAllOrders,
  selectOrderLoading,
} from '../../data-access/order.selector';
import { OrderHistoryUi } from '../../ui/order-history-ui/order-history-ui';
import { OrderLoadActions } from '../../data-access/order.actions';

@Component({
  selector: 'lib-order-feature-history',
  standalone: true,
  imports: [CommonModule, OrderHistoryUi, LoadingSpinnerComponent],
  templateUrl: './order-history-feature.html',
})
export class OrderHistoryFeature implements OnInit {
  private readonly store = inject(Store);

  readonly orders$ = this.store.select(selectAllOrders);
  readonly loading$ = this.store.select(selectOrderLoading);

  ngOnInit() {
    this.store.dispatch(OrderLoadActions.request());
  }
}


import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerComponent } from '@oms-frontend/shared';
import { OrderDetailsUi } from '../../ui/order-details-ui/order-details-ui';
import { ORDER_PORT } from '@oms-frontend/models';

@Component({
  selector: 'lib-order-feature-details',
  standalone: true,
  imports: [CommonModule, OrderDetailsUi, LoadingSpinnerComponent],
  templateUrl: './order-details-feature.html',
})
export class OrderDetailsFeature implements OnInit {
  private readonly orderFacade = inject(ORDER_PORT);
  private readonly route = inject(ActivatedRoute);

  readonly order$ = this.orderFacade.selectedOrder$;
  readonly loading$ = this.orderFacade.loading$;

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.orderFacade.loadOrderById(orderId);
    }
  }

  onPay(orderId: string): void {
    this.orderFacade.pay(orderId);
  }
}

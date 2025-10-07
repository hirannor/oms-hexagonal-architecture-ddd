import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order, OrderStatus } from '@oms-frontend/domain';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'lib-order-details-ui',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    TagModule,
  ],
  templateUrl: './order-details-ui.html',
  styleUrl: './order-details-ui.scss',
})
export class OrderDetailsUi {
  @Input() order!: Order;
  @Output() pay = new EventEmitter<string>();

  mapStatusToSeverity(
    status: OrderStatus
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case OrderStatus.WAITING_FOR_PAYMENT:
        return 'warn';
      case OrderStatus.PAID_SUCCESSFULLY:
        return 'success';
      case OrderStatus.CANCELLED:
      case OrderStatus.PAYMENT_FAILED:
        return 'danger';
      case OrderStatus.PROCESSING:
      case OrderStatus.SHIPPED:
        return 'info';
      default:
        return 'secondary';
    }
  }

  canPay(): boolean {
    return (
      this.order.status === OrderStatus.WAITING_FOR_PAYMENT ||
      this.order.status === OrderStatus.PAYMENT_FAILED
    );
  }
}

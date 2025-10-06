import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Order, OrderStatus } from '@oms-frontend/shared/data-access';

@Component({
  selector: 'lib-order-history-ui',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    RouterLink,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
  ],
  templateUrl: './order-history-ui.html',
  styleUrls: ['./order-history-ui.scss'],
})
export class OrderHistoryUi {
  @Input() orders: Order[] = [];

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
}

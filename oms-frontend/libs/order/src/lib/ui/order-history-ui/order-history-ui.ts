import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Order, OrderStatus } from '@oms-frontend/domain';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';

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

  mapStatusToLabel(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.WAITING_FOR_PAYMENT:
        return 'Waiting for Payment';
      case OrderStatus.PAID_SUCCESSFULLY:
        return 'Paid Successfully';
      case OrderStatus.PROCESSING:
        return 'Processing';
      case OrderStatus.SHIPPED:
        return 'Shipped';
      case OrderStatus.PAYMENT_FAILED:
        return 'Payment Failed';
      case OrderStatus.CANCELLED:
        return 'Cancelled';
      default:
        return status;
    }
  }

  mapStatusToIcon(status: OrderStatus): string | undefined {
    switch (status) {
      case OrderStatus.WAITING_FOR_PAYMENT:
        return 'pi pi-clock';
      case OrderStatus.PAID_SUCCESSFULLY:
        return 'pi pi-check-circle';
      case OrderStatus.PROCESSING:
        return 'pi pi-sync';
      case OrderStatus.SHIPPED:
        return 'pi pi-truck';
      case OrderStatus.PAYMENT_FAILED:
        return 'pi pi-times-circle';
      case OrderStatus.CANCELLED:
        return 'pi pi-ban';
      default:
        return undefined;
    }
  }
}

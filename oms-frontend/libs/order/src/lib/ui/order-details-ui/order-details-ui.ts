import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order, OrderStatus } from '@oms-frontend/models';
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

  canPay(): boolean {
    return (
      this.order.status === OrderStatus.WAITING_FOR_PAYMENT ||
      this.order.status === OrderStatus.PAYMENT_FAILED
    );
  }
}

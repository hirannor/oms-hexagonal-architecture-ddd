import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '@oms-frontend/shared/data-access';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'lib-order-details-ui',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  templateUrl: './order-details-ui.html',
  styleUrl: './order-details-ui.scss',
})
export class OrderDetailsUi {
  @Input() order!: Order;
  @Output() pay = new EventEmitter<string>();

  getSeverity(
    status: string
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case 'WAITING_FOR_PAYMENT':
        return 'warn';
      case 'PAID_SUCCESSFULLY':
        return 'success';
      case 'CANCELLED':
      case 'PAYMENT_FAILED':
        return 'danger';
      case 'PROCESSING':
      case 'SHIPPED':
        return 'info';
      default:
        return 'secondary';
    }
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '@oms-frontend/shared/data-access';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'lib-order-history-ui',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterLink, TagModule],
  templateUrl: './order-history-ui.html',
  styleUrl: './order-history-ui.scss',
})
export class OrderHistoryUi {
  @Input() orders: Order[] = [];

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

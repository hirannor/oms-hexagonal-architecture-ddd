import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Basket } from '@oms-frontend/shared/data-access';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'lib-basket-ui-summary',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, MessageModule],
  templateUrl: './basket-summary-ui.html',
  styleUrls: ['./basket-summary-ui.scss'],
})
export class BasketSummaryUi {
  @Input() basket!: Basket;
  @Output() confirmOrderClicked = new EventEmitter<Basket>();
}

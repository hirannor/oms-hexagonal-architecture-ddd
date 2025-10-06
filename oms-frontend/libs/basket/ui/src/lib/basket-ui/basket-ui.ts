import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Basket, BasketItem } from '@oms-frontend/shared/data-access';
import { RouterLink } from '@angular/router';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'lib-basket-ui',
  imports: [CommonModule, ButtonDirective, ButtonIcon, ButtonLabel, TableModule, RouterLink, Tooltip],
  standalone: true,
  templateUrl: './basket-ui.html',
  styleUrl: './basket-ui.scss',
})
export class BasketUi {
  @Input() basket?: Basket | null;
  @Input() loading = false;

  @Output() increase = new EventEmitter<BasketItem>();
  @Output() decrease = new EventEmitter<BasketItem>();
  @Output() remove = new EventEmitter<BasketItem>();
  @Output() checkout = new EventEmitter<void>();
}

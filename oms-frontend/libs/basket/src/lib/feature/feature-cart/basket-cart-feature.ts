import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import {
  Basket,
  BASKET_STATE,
  BasketItem,
  ORDER_STATE,
} from '@oms-frontend/models';
import { AuthService, LoadingSpinnerComponent } from '@oms-frontend/shared';
import { BasketUi } from '../../ui/basket-ui/basket-ui';
import { BasketSummaryUi } from '../../ui/basket-summary-ui/basket-summary-ui';

@Component({
  selector: 'lib-basket-feature-cart',
  standalone: true,
  imports: [
    CommonModule,
    BasketUi,
    BasketSummaryUi,
    ButtonDirective,
    ButtonLabel,
    ButtonIcon,
    RouterLink,
    LoadingSpinnerComponent,
  ],
  templateUrl: './basket-cart-feature.html',
  styleUrls: ['./basket-cart-feature.scss'],
})
export class BasketCartFeature implements OnInit {
  private readonly baskets = inject(BASKET_STATE);
  private readonly orders = inject(ORDER_STATE);
  private readonly auth = inject(AuthService);

  readonly basket$ = this.baskets.basket$;
  readonly loading$ = this.baskets.loading$;

  private customerId: string | null = null;

  ngOnInit(): void {
    this.customerId = this.auth.extractCustomerId();
    if (this.customerId) {
      this.baskets.loadBasket(this.customerId);
    }
  }

  onIncrease(item: BasketItem): void {
    if (!this.customerId) return;
    this.baskets.addItem(this.customerId, { ...item, quantity: 1 });
  }

  onDecrease(item: BasketItem): void {
    if (!this.customerId) return;
    this.baskets.removeItem(this.customerId, { ...item, quantity: 1 });
  }

  onRemove(item: BasketItem): void {
    if (!this.customerId) return;
    this.baskets.removeItem(this.customerId, item);
  }

  onCheckout(): void {
    if (!this.customerId) return;
    this.baskets.checkout(this.customerId);
  }

  onConfirmOrder(basket: Basket): void {
    this.orders.createFromBasket(basket);
  }
}

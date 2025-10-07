import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthService, Basket, LoadingSpinnerComponent, OrderItem } from '@oms-frontend/shared';

import { BasketSummaryUi } from '../../ui/basket-summary-ui/basket-summary-ui';
import {
  selectBasket,
  selectBasketLoading,
} from '../../data-access/basket.selector';
import { BasketLoadActions } from '../../data-access/basket.actions';
import { OrderCreateActions } from '@oms-frontend/order';

@Component({
  selector: 'lib-basket-feature-checkout',
  standalone: true,
  imports: [CommonModule, BasketSummaryUi, LoadingSpinnerComponent],
  templateUrl: './basket-checkout-feature.html',
  styleUrls: ['./basket-checkout-feature.scss'],
})
export class BasketCheckoutFeature implements OnInit {
  private readonly store = inject(Store);
  private readonly auth = inject(AuthService);

  readonly basket$ = this.store.select(selectBasket);
  readonly loading$ = this.store.select(selectBasketLoading);

  private customerId: string | null = null;

  ngOnInit(): void {
    this.customerId = this.auth.extractCustomerId();

    if (this.customerId) {
      this.store.dispatch(
        BasketLoadActions.request({ customerId: this.customerId })
      );
    }
  }

  onConfirmOrder(basket: Basket): void {
    if (!this.customerId) return;

    const products: OrderItem[] = basket.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    }));

    this.store.dispatch(
      OrderCreateActions.request({ customerId: this.customerId, products })
    );
  }
}

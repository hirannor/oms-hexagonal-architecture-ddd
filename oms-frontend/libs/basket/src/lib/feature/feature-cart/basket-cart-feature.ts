import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Basket, BasketItem, OrderItem } from '@oms-frontend/domain';
import { AuthService, LoadingSpinnerComponent } from '@oms-frontend/shared';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { RouterLink } from '@angular/router';

import {
  selectBasket,
  selectBasketLoading,
  selectIsBasketEmpty,
} from '../../data-access/basket.selector';
import {
  BasketAddItemActions,
  BasketCheckoutActions,
  BasketClearActions,
  BasketLoadActions,
  BasketRemoveItemActions,
} from '../../data-access/basket.actions';
import { BasketUi } from '../../ui/basket-ui/basket-ui';
import { BasketSummaryUi } from '../../ui/basket-summary-ui/basket-summary-ui';
import { OrderCreateActions } from '@oms-frontend/order';

@Component({
  selector: 'lib-basket-feature-cart',
  standalone: true,
  imports: [
    CommonModule,
    BasketUi,
    BasketSummaryUi,
    ButtonDirective,
    RouterLink,
    LoadingSpinnerComponent,
    ButtonLabel,
    ButtonIcon,
  ],
  templateUrl: './basket-cart-feature.html',
  styleUrls: ['./basket-cart-feature.scss'],
})
export class BasketCartFeature implements OnInit {
  private readonly store = inject(Store);
  private readonly auth = inject(AuthService);

  readonly basket$ = this.store.select(selectBasket);
  readonly isEmpty$ = this.store.select(selectIsBasketEmpty);
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

  onIncrease(item: BasketItem): void {
    if (!this.customerId) return;
    const updatedItem: BasketItem = { ...item, quantity: 1 };

    this.store.dispatch(
      BasketAddItemActions.request({
        customerId: this.customerId,
        item: updatedItem,
      })
    );
  }

  onDecrease(item: BasketItem): void {
    if (!this.customerId) return;
    const oneLess: BasketItem = { ...item, quantity: 1 };

    this.store.dispatch(
      BasketRemoveItemActions.request({
        customerId: this.customerId,
        item: oneLess,
      })
    );
  }

  onRemove(item: BasketItem): void {
    if (!this.customerId) return;

    this.store.dispatch(
      BasketRemoveItemActions.request({ customerId: this.customerId, item })
    );
  }

  onCheckout(): void {
    if (!this.customerId) return;

    this.store.dispatch(
      BasketCheckoutActions.request({ customerId: this.customerId })
    );
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
    this.store.dispatch(BasketClearActions.request());
  }
}

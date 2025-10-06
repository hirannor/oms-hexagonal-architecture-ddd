import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  AuthService,
  Basket,
  BasketItem,
  OrderItem,
} from '@oms-frontend/shared/data-access';
import {
  BasketActions,
  selectBasket,
  selectBasketLoading,
  selectIsBasketEmpty,
} from '@oms-frontend/basket/data-access';
import { BasketSummaryUi, BasketUi } from '@oms-frontend/basket/ui';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { OrderActions } from '@oms-frontend/order/data-access';
import { LoadingSpinnerComponent } from '@oms-frontend/shared/ui';
import { RouterLink } from '@angular/router';

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
  readonly basket$ = this.store.select(selectBasket);
  readonly isEmpty$ = this.store.select(selectIsBasketEmpty);
  readonly loading$ = this.store.select(selectBasketLoading);
  private readonly auth = inject(AuthService);
  private customerId: string | null = null;

  ngOnInit(): void {
    this.customerId = this.auth.extractCustomerId();

    if (this.customerId) {
      this.store.dispatch(
        BasketActions.loadBasket({ customerId: this.customerId })
      );
    }
  }

  onIncrease(item: BasketItem): void {
    if (!this.customerId) return;

    const updatedItem: BasketItem = {
      ...item,
      quantity: 1,
    };

    this.store.dispatch(
      BasketActions.addItem({ customerId: this.customerId, item: updatedItem })
    );
  }

  onDecrease(item: BasketItem): void {
    if (!this.customerId) return;

    const oneLess: BasketItem = { ...item, quantity: 1 };

    this.store.dispatch(
      BasketActions.removeItem({ customerId: this.customerId, item: oneLess })
    );
  }

  onRemove(item: BasketItem): void {
    if (!this.customerId) return;

    this.store.dispatch(
      BasketActions.removeItem({ customerId: this.customerId, item })
    );
  }

  onCheckout(): void {
    if (!this.customerId) return;

    this.store.dispatch(
      BasketActions.checkoutBasket({ customerId: this.customerId })
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
      OrderActions.createOrder({ customerId: this.customerId, products })
    );
  }
}

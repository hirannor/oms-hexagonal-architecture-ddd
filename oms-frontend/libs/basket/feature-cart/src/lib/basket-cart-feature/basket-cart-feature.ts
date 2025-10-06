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
  private readonly auth = inject(AuthService);

  readonly basket$ = this.store.select(selectBasket);
  readonly isEmpty$ = this.store.select(selectIsBasketEmpty);
  readonly loading$ = this.store.select(selectBasketLoading);

  ngOnInit(): void {
    const customerId = this.auth.extractCustomerId();
    if (customerId) {
      this.store.dispatch(BasketActions.loadBasket({ customerId }));
    }
  }

  onIncrease(item: BasketItem): void {
    const customerId = this.auth.extractCustomerId();
    if (!customerId) return;
    const updatedItem: BasketItem = {
      ...item,
      quantity: 1,
    };

    this.store.dispatch(
      BasketActions.addItem({ customerId, item: updatedItem })
    );
  }

  onDecrease(item: BasketItem): void {
    const customerId = this.auth.extractCustomerId();
    if (!customerId) return;

    const oneLess: BasketItem = { ...item, quantity: 1 };

    this.store.dispatch(
      BasketActions.removeItem({ customerId, item: oneLess })
    );
  }

  onRemove(item: BasketItem): void {
    const customerId = this.auth.extractCustomerId();
    if (!customerId) return;
    this.store.dispatch(BasketActions.removeItem({ customerId, item }));
  }

  onCheckout(): void {
    const customerId = this.auth.extractCustomerId();
    if (!customerId) return;
    this.store.dispatch(BasketActions.checkoutBasket({ customerId }));
  }

  onConfirmOrder(basket: Basket): void {
    const customerId = this.auth.extractCustomerId();
    if (!customerId) return;

    const products: OrderItem[] = basket.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
    }));

    this.store.dispatch(OrderActions.createOrder({ customerId, products }));
  }
}

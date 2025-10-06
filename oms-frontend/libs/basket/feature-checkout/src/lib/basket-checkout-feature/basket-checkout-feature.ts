import { Component, inject, OnInit } from '@angular/core';
import {
  BasketActions,
  selectBasket,
  selectBasketLoading,
} from '@oms-frontend/basket/data-access';
import {
  AuthService,
  Basket,
  OrderItem,
} from '@oms-frontend/shared/data-access';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { BasketSummaryUi } from '@oms-frontend/basket/ui';
import { OrderActions } from '@oms-frontend/order/data-access';
import { LoadingSpinnerComponent } from '@oms-frontend/shared/ui';

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

  ngOnInit() {
    const customerId = this.auth.extractCustomerId();
    if (customerId) {
      this.store.dispatch(BasketActions.loadBasket({ customerId }));
    }
  }

  onConfirmOrder(basket: Basket): void {
    const customerId = this.auth.extractCustomerId();
    if (!customerId) return;

    const products: OrderItem[] = basket.items.map((item) => ({
      name: item.name,
      description: item.description,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    this.store.dispatch(OrderActions.createOrder({ customerId, products }));
  }
}

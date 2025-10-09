import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Basket, BasketItem, BasketState } from '@oms-frontend/models';
import {
  BasketAddItemActions,
  BasketCheckoutActions,
  BasketClearActions,
  BasketLoadActions,
  BasketRemoveItemActions,
} from './basket.actions';
import { selectBasket, selectBasketLoading } from './basket.selector';

@Injectable({ providedIn: 'root' })
export class BasketStateFacade implements BasketState {
  private readonly store = inject(Store);

  readonly basket$: Observable<Basket | null> = this.store.select(selectBasket);
  readonly loading$: Observable<boolean> =
    this.store.select(selectBasketLoading);

  loadBasket(customerId: string): void {
    this.store.dispatch(BasketLoadActions.request({ customerId }));
  }

  addItem(customerId: string, item: BasketItem): void {
    this.store.dispatch(BasketAddItemActions.request({ customerId, item }));
  }

  removeItem(customerId: string, item: BasketItem): void {
    this.store.dispatch(BasketRemoveItemActions.request({ customerId, item }));
  }

  checkout(customerId: string): void {
    this.store.dispatch(BasketCheckoutActions.request({ customerId }));
  }

  clear(): void {
    this.store.dispatch(BasketClearActions.request());
  }
}

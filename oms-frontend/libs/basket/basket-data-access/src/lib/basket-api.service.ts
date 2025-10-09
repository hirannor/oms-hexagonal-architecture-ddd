import { inject, Injectable } from '@angular/core';
import { BasketApi as GeneratedBasketApi } from '@oms-frontend/api/basket-data-access';
import { BasketItem, BasketApi } from '@oms-frontend/models';
import { map, switchMap } from 'rxjs';
import { BasketMapper } from './basket.mapper';

@Injectable({ providedIn: 'root' })
export class BasketApiService implements BasketApi {
  private readonly api = inject(GeneratedBasketApi);

  displayBy(customerId: string) {
    return this.api
      .displayBy(customerId)
      .pipe(map((model) => BasketMapper.mapToBasket(model)));
  }

  createBasket(customerId: string) {
    return this.api
      .createBasket({ customerId })
      .pipe(map((model) => BasketMapper.mapToBasket(model)));
  }

  addItem(basketId: string, customerId: string, item: BasketItem) {
    return this.api
      .addItem(basketId, BasketMapper.mapToBasketItemModel(item))
      .pipe(
        switchMap(() => this.api.displayBy(customerId)),
        map((model) => BasketMapper.mapToBasket(model))
      );
  }

  removeItem(basketId: string, customerId: string, item: BasketItem) {
    return this.api
      .removeItem(basketId, BasketMapper.mapToBasketItemModel(item))
      .pipe(
        switchMap(() => this.api.displayBy(customerId)),
        map((model) => BasketMapper.mapToBasket(model))
      );
  }

  checkout(customerId: string) {
    return this.api
      .checkout(customerId)
      .pipe(map((model) => BasketMapper.mapToBasket(model)));
  }
}

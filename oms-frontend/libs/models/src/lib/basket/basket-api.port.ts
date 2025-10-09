import { InjectionToken } from '@angular/core';
import { Basket } from './basket';
import { BasketItem } from './basket-item';
import { Observable } from 'rxjs';

export interface BasketApi {
  displayBy(customerId: string): Observable<Basket>;

  createBasket(customerId: string): Observable<Basket>;

  addItem(
    basketId: string,
    customerId: string,
    item: BasketItem
  ): Observable<Basket>;

  removeItem(
    basketId: string,
    customerId: string,
    item: BasketItem
  ): Observable<Basket>;

  checkout(customerId: string): Observable<Basket>;
}

export const BASKET_API = new InjectionToken<BasketApi>('BASKET_API');

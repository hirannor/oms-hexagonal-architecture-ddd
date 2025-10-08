import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItem } from './basket-item';
import { Basket } from './basket';

export interface IBasketPort {
  readonly basket$: Observable<Basket | null>;

  readonly loading$: Observable<boolean>;

  loadBasket(customerId: string): void;

  addItem(customerId: string, item: BasketItem): void;

  removeItem(customerId: string, item: BasketItem): void;

  checkout(customerId: string): void;

  clear(): void;
}

export const BASKET_PORT = new InjectionToken<IBasketPort>('BASKET_PORT');

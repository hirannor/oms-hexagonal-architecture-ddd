import { Money } from '../core';
import { BasketItem } from './basket-item';
import { BasketStatus } from './basket-status';

export interface Basket {
  id: string;
  customerId: string;
  items: BasketItem[];
  totalPrice: Money;
  status: BasketStatus;
}

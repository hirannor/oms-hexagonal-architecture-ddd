import { BasketItem } from './basket-item';
import { Money } from '@oms-frontend/models';
import { BasketStatus } from './basket-status';

export interface Basket {
  id: string;
  customerId: string;
  items: BasketItem[];
  totalPrice: Money;
  status: BasketStatus;
}

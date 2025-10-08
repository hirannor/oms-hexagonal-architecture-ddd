import { Money } from '../core/money';

export interface BasketItem {
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: Money;
}

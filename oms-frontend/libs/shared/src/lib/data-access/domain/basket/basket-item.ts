import { Money } from '../../../models/money';

export interface BasketItem {
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: Money;
}

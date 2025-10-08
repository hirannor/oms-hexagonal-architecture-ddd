import { Money } from '../core/money';

export interface OrderItem {
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: Money;
}

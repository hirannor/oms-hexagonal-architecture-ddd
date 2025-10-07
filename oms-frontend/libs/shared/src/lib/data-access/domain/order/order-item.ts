import { Money } from '../../../models/money';

export interface OrderItem {
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: Money;
}

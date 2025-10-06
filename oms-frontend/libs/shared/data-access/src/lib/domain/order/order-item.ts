import { Money } from '@oms-frontend/models';

export interface OrderItem {
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: Money;
}

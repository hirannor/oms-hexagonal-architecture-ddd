import { Money } from '@oms-frontend/models';

export interface BasketItem {
  productId: string;
  name: string;
  description: string;
  quantity: number;
  price: Money;
}

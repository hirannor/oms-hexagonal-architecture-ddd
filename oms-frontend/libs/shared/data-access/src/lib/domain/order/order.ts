import { Money } from '@oms-frontend/models';
import { OrderItem } from './order-item';
import { OrderStatus } from './order-status';

export interface Order {
  id: string;
  customerId: string;
  orderedProducts: OrderItem[];
  totalPrice: Money;
  createdAt: string;
  status: OrderStatus;
}


import { Money } from '../../../models/money';
import { OrderItem } from './order-item';
import { OrderStatus } from './order-status';

export interface Order {
  id: string;
  customerId: string;
  orderItems: OrderItem[];
  totalPrice: Money;
  createdAt: string;
  status: OrderStatus;
}

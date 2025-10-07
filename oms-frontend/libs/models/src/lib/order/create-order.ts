import { OrderItem } from './order-item';

export interface CreateOrder {
  customerId: string;
  products: OrderItem[];
}


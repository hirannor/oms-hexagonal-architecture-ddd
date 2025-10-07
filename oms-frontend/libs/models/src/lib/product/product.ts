import { Money } from '../core/money';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: Money;
}


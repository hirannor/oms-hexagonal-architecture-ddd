import { Money } from '../../../models/money';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: Money;
}

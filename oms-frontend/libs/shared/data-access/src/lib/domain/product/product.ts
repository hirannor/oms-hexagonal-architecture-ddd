import { Money } from '@oms-frontend/models';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: Money;
}

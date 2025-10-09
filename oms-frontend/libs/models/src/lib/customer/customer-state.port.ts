import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

export interface CustomerState {
  readonly customer$: Observable<Customer | null>;

  readonly loading$: Observable<boolean>;

  readonly updating$: Observable<boolean>;

  loadCustomer(): void;

  updateCustomer(customer: Customer): void;
}

export const CUSTOMER_STATE = new InjectionToken<CustomerState>(
  'CUSTOMER_STATE'
);

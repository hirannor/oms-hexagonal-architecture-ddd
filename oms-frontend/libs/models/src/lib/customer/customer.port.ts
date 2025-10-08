import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

export interface ICustomerPort {
  readonly customer$: Observable<Customer | null>;

  readonly loading$: Observable<boolean>;

  readonly updating$: Observable<boolean>;

  loadCustomer(): void;

  updateCustomer(customer: Customer): void;
}

export const CUSTOMER_PORT = new InjectionToken<ICustomerPort>('CUSTOMER_PORT');

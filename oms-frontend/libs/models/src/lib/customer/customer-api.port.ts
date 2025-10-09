import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

export interface CustomerApi {
  authenticatedCustomer(): Observable<Customer>;

  changePersonalDetails(
    customerId: string,
    cmd: Customer
  ): Observable<Customer>;
}

export const CUSTOMER_API = new InjectionToken<CustomerApi>('CUSTOMER_API');

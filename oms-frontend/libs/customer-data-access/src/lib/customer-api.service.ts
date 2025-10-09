import { inject, Injectable } from '@angular/core';
import { CustomerApi as GeneratedCustomerApi } from '@oms-frontend/api/customer-data-access';
import { Customer, CustomerApi } from '@oms-frontend/models';
import { map } from 'rxjs';
import { CustomerMapper } from './customer.mapper';

@Injectable({ providedIn: 'root' })
export class CustomerApiService implements CustomerApi {
  private readonly api = inject(GeneratedCustomerApi);

  authenticatedCustomer() {
    return this.api
      .authenticatedCustomer()
      .pipe(map((res) => CustomerMapper.fromApi(res)));
  }

  changePersonalDetails(customerId: string, customer: Customer) {
    return this.api
      .changePersonalDetails(customerId, CustomerMapper.toApi(customer))
      .pipe(map((res) => CustomerMapper.fromApi(res)));
  }
}

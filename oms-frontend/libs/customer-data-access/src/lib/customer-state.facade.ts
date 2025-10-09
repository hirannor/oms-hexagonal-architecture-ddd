import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer, CustomerState } from '@oms-frontend/models';
import {
  selectCustomer,
  selectCustomerLoading,
  selectCustomerUpdating,
} from './customer.selector';
import {
  CustomerProfileLoadActions,
  CustomerProfileUpdateActions,
} from './customer.actions';

@Injectable({ providedIn: 'root' })
export class CustomerStateFacade implements CustomerState {
  private readonly store = inject(Store);

  readonly customer$: Observable<Customer | null> =
    this.store.select(selectCustomer);
  readonly loading$: Observable<boolean> = this.store.select(
    selectCustomerLoading
  );
  readonly updating$: Observable<boolean> = this.store.select(
    selectCustomerUpdating
  );

  loadCustomer(): void {
    this.store.dispatch(CustomerProfileLoadActions.request());
  }

  updateCustomer(customer: Customer): void {
    this.store.dispatch(CustomerProfileUpdateActions.request({ customer }));
  }
}

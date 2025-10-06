import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CustomerActions from '@oms-frontend/customer/data-access';
import {
  selectCustomer,
  selectCustomerLoading,
  selectCustomerUpdating,
} from '@oms-frontend/customer/data-access';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProfileFormComponent } from '@oms-frontend/customer/ui';
import { Customer } from '@oms-frontend/shared/data-access';
import { LoadingSpinnerComponent } from '@oms-frontend/shared/ui';

@Component({
  selector: 'lib-customer-feature-profile',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ProgressSpinnerModule,
    ProfileFormComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './customer-feature-profile.html',
  styleUrls: ['./customer-feature-profile.scss'],
})
export class CustomerFeatureProfile implements OnInit {
  private store = inject(Store);

  readonly customer$ = this.store.select(selectCustomer);
  readonly loading$ = this.store.select(selectCustomerLoading);
  readonly updating$ = this.store.select(selectCustomerUpdating);

  ngOnInit() {
    this.store.dispatch(CustomerActions.loadCustomerProfile());
  }

  onSave(updated: Customer) {
    this.store.dispatch(
      CustomerActions.updateCustomerProfile({ customer: updated })
    );
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Customer } from '@oms-frontend/models';
import { LoadingSpinnerComponent } from '@oms-frontend/shared';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProfileFormComponent } from '../../ui/profile-form/profile-form';
import {
  selectCustomer,
  selectCustomerLoading,
  selectCustomerUpdating,
} from '../../data-access/customer.selector';
import {
  CustomerProfileLoadActions,
  CustomerProfileUpdateActions,
} from '../../data-access/customer.actions';

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
    this.store.dispatch(CustomerProfileLoadActions.request());
  }

  onSave(updated: Customer) {
    this.store.dispatch(
      CustomerProfileUpdateActions.request({ customer: updated })
    );
  }
}


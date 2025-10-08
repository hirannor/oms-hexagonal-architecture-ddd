import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProfileFormComponent } from '../../ui/profile-form/profile-form';
import { LoadingSpinnerComponent } from '@oms-frontend/shared';
import { Customer } from '@oms-frontend/models';
import { CustomerFacade } from '@oms-frontend/customer-data-access';

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
  private readonly customers = inject(CustomerFacade);

  readonly customer$ = this.customers.customer$;
  readonly loading$ = this.customers.loading$;
  readonly updating$ = this.customers.updating$;

  ngOnInit(): void {
    this.customers.loadCustomer();
  }

  onSave(updated: Customer): void {
    this.customers.updateCustomer(updated);
  }
}

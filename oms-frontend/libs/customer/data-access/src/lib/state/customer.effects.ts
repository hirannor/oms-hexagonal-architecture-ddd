import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CustomerActions from './customer.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CustomerApi } from '@oms-frontend/api/customer-data-access';
import { CustomerMapper } from '@oms-frontend/shared/data-access';
import { NotificationService } from '@oms-frontend/services';

@Injectable()
export class CustomerEffects {
  private actions$ = inject(Actions);
  private api = inject(CustomerApi);
  private notifications = inject(NotificationService);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomerProfile),
      mergeMap(() =>
        this.api.authenticatedCustomer().pipe(
          map((res) =>
            CustomerActions.loadCustomerProfileSuccess({
              customer: CustomerMapper.fromApi(res),
            })
          ),
          catchError((err) => {
            this.notifications.error(
              'Failed to load profile',
              err?.message ?? 'Unknown error'
            );
            return of(
              CustomerActions.loadCustomerProfileFailure({
                error: err?.message ?? 'Failed',
              })
            );
          })
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomerProfile),
      mergeMap(({ customer }) =>
        this.api
          .changePersonalDetails(customer.id, CustomerMapper.toApi(customer))
          .pipe(
            map((res) =>
              CustomerActions.updateCustomerProfileSuccess({
                customer: CustomerMapper.fromApi(res),
              })
            ),
            catchError((err) => {
              this.notifications.error(
                'Failed to update profile',
                err?.message ?? 'Unknown error'
              );
              return of(
                CustomerActions.updateCustomerProfileFailure({
                  error: err?.message ?? 'Failed',
                })
              );
            })
          )
      )
    )
  );

  updateProfileSuccessNotify$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomerActions.updateCustomerProfileSuccess),
        map(() => {
          this.notifications.success('Profile updated successfully');
        })
      ),
    { dispatch: false }
  );
}

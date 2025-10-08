import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CustomerMapper } from '@oms-frontend/models';
import { NotificationService } from '@oms-frontend/shared';
import {
  CustomerProfileLoadActions,
  CustomerProfileUpdateActions,
} from './customer.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CustomerApi } from '@oms-frontend/api/customer-data-access';

@Injectable()
export class CustomerEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(CustomerApi);
  private readonly notifications = inject(NotificationService);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerProfileLoadActions.request),
      mergeMap(() =>
        this.api.authenticatedCustomer().pipe(
          map((res) =>
            CustomerProfileLoadActions.success({
              customer: CustomerMapper.fromApi(res),
            })
          ),
          catchError((err) => {
            this.notifications.error(
              'Failed to load profile',
              err?.message ?? 'Unknown error'
            );
            return of(
              CustomerProfileLoadActions.failure({
                error: err?.message ?? 'Failed to load profile',
              })
            );
          })
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerProfileUpdateActions.request),
      mergeMap(({ customer }) =>
        this.api
          .changePersonalDetails(customer.id, CustomerMapper.toApi(customer))
          .pipe(
            map((res) =>
              CustomerProfileUpdateActions.success({
                customer: CustomerMapper.fromApi(res),
              })
            ),
            catchError((err) => {
              this.notifications.error(
                'Failed to update profile',
                err?.message ?? 'Unknown error'
              );
              return of(
                CustomerProfileUpdateActions.failure({
                  error: err?.message ?? 'Failed to update profile',
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
        ofType(CustomerProfileUpdateActions.success),
        tap(() => {
          this.notifications.success('Profile updated successfully');
        })
      ),
    { dispatch: false }
  );
}

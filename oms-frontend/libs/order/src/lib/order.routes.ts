import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { orderReducer } from './data-access/order.reducer';
import { OrderEffects } from './data-access/order.effects';

export const ORDER_ROUTES: Routes = [
    {
        path: '',
        providers: [
            provideState({ name: 'orders', reducer: orderReducer }),
            provideEffects([OrderEffects]),
        ],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./feature/order-history-feature/order-history-feature')
                        .then(m => m.OrderHistoryFeature),
            },
            {
                path: 'success',
                loadComponent: () =>
                    import('./feature/order-payment-success-feature/order-payment-success-feature')
                        .then(m => m.OrderPaymentSuccessFeature),
            },
            {
                path: ':orderId',
                loadComponent: () =>
                    import('./feature/order-details-feature/order-details-feature')
                        .then(m => m.OrderDetailsFeature),
            },
        ],
    },
];


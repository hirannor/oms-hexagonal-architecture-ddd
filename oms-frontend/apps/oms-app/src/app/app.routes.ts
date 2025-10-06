import { Routes } from '@angular/router';
import { LayoutComponent } from '@oms-frontend/shared/ui';
import { OrderHistoryFeature } from '@oms-frontend/order/feature-history';
import { CustomerFeatureProfile } from '@oms-frontend/customer/feature-profile';
import { ProductListFeature } from '@oms-frontend/product/feature-list';
import { BasketCartFeature } from '@oms-frontend/basket/feature-cart';
import { authGuard } from '@oms-frontend/shared/data-access';
import { AuthFeatureShell } from '@oms-frontend/auth/feature-shell';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'orders/success',
        loadComponent: () =>
          import('@oms-frontend/order/feature-payment-success').then(
            (m) => m.OrderPaymentSuccessFeature
          ),
      },

      {
        path: 'orders',
        children: [
          {
            path: '',
            component: OrderHistoryFeature,
          },
          {
            path: ':orderId',
            loadComponent: () =>
              import('@oms-frontend/order/feature-details').then(
                (m) => m.OrderDetailsFeature
              ),
          },
        ],
      },

      { path: 'customers/me', component: CustomerFeatureProfile },
      {
        path: 'products',
        children: [
          { path: '', component: ProductListFeature },
          { path: ':category', component: ProductListFeature },
        ],
      },
      { path: 'basket', component: BasketCartFeature },

      { path: '', pathMatch: 'full', redirectTo: 'products' },
    ],
  },

  { path: 'auth', component: AuthFeatureShell },
  { path: 'login', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'register', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

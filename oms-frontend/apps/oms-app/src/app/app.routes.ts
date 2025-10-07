import { Routes } from '@angular/router';
import { LayoutComponent } from '@oms-frontend/shared/ui';
import { authGuard } from '@oms-frontend/shared/data-access';
import { AuthFeatureShell } from '@oms-frontend/auth';
import { BasketCartFeature } from '@oms-frontend/basket';
import { CustomerFeatureProfile } from '@oms-frontend/customer';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'orders/success',
        loadComponent: () =>
          import('@oms-frontend/order').then(
            (m) => m.OrderPaymentSuccessFeature
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
            import('@oms-frontend/order').then((m) => m.ORDER_ROUTES),
      },
      { path: 'customers/me', component: CustomerFeatureProfile },
      {
        path: 'products',
        loadChildren: () =>
            import('@oms-frontend/product').then((m) => m.PRODUCT_ROUTES),
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

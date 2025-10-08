import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from '@oms-frontend/shared';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/lara';
import { BASE_PATH as AUTH_BASE_PATH } from '@oms-frontend/api/auth-data-access';
import { BASE_PATH as CUSTOMER_BASE_PATH } from '@oms-frontend/api/customer-data-access';
import { BASE_PATH as PRODUCT_BASE_PATH } from '@oms-frontend/api/product-data-access';
import { BASE_PATH as BASKET_BASE_PATH } from '@oms-frontend/api/basket-data-access';
import { BASE_PATH as ORDER_BASE_PATH } from '@oms-frontend/api/order-data-access';
import { App } from './app/app';
import { appRoutes } from './app/app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {
  AUTH_PORT,
  BASKET_PORT,
  CUSTOMER_PORT,
  ORDER_API_PORT,
  ORDER_PORT,
  PRODUCT_PORT,
} from '@oms-frontend/models';
import {
  OrderApiAdapter,
  OrderEffects,
  OrderFacade,
} from '@oms-frontend/order-data-access';
import {
  BasketEffects,
  BasketFacade,
  basketReducer,
} from '@oms-frontend/basket-data-access';
import {
  ProductEffects,
  ProductFacade,
} from '@oms-frontend/product-data-access';
import {
  AuthEffects,
  AuthFacade,
  authReducer,
} from '@oms-frontend/auth-data-access';
import {
  CustomerEffects,
  CustomerFacade,
  customerReducer,
} from '@oms-frontend/customer-data-access';

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
};

bootstrapApplication(App, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),

    { provide: AUTH_BASE_PATH, useValue: environment.apiUrl },
    { provide: CUSTOMER_BASE_PATH, useValue: environment.apiUrl },
    { provide: PRODUCT_BASE_PATH, useValue: environment.apiUrl },
    { provide: BASKET_BASE_PATH, useValue: environment.apiUrl },
    { provide: ORDER_BASE_PATH, useValue: environment.apiUrl },
    provideHttpClient(),
    provideStore({
      auth: authReducer,
      customer: customerReducer,
      basket: basketReducer,
    }),
    provideEffects([
      AuthEffects,
      CustomerEffects,
      BasketEffects,
      OrderEffects,
      ProductEffects,
    ]),
    provideStoreDevtools(),
    MessageService,
    { provide: ORDER_PORT, useExisting: OrderFacade },
    { provide: BASKET_PORT, useExisting: BasketFacade },
    { provide: PRODUCT_PORT, useExisting: ProductFacade },
    { provide: AUTH_PORT, useExisting: AuthFacade },
    { provide: CUSTOMER_PORT, useExisting: CustomerFacade },
    { provide: ORDER_API_PORT, useExisting: OrderApiAdapter },
  ],
}).catch((err) => console.error(err));

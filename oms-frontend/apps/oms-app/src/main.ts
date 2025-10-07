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
import { AuthEffects, authReducer } from '@oms-frontend/auth';
import { BasketEffects, basketReducer } from '@oms-frontend/basket';
import { CustomerEffects, customerReducer } from '@oms-frontend/customer';

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
    ]),
    provideStoreDevtools(),
    MessageService,
  ],
}).catch((err) => console.error(err));


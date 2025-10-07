import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { productReducer } from './data-access/product.reducer';
import { ProductEffects } from './data-access/product.effects';

export const PRODUCT_ROUTES: Routes = [
    {
        path: '',
        providers: [
            provideState({ name: 'product', reducer: productReducer }),
            provideEffects([ProductEffects]),
        ],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./feature/product-list-feature/product-list-feature').then(
                        (m) => m.ProductListFeature
                    ),
            },
            {
                path: ':category',
                loadComponent: () =>
                    import('./feature/product-list-feature/product-list-feature').then(
                        (m) => m.ProductListFeature
                    ),
            },
        ],
    },
];


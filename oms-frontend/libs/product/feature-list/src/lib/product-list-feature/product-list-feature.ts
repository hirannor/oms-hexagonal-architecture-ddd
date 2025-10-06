import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProductCard } from '@oms-frontend/product/ui';
import * as ProductActions from '@oms-frontend/product/data-access';
import {
  selectAllProducts,
  selectProductLoading,
} from '@oms-frontend/product/data-access';
import {
  AuthService,
  BasketItem,
  Product,
} from '@oms-frontend/shared/data-access';
import { BasketActions, selectBasket } from '@oms-frontend/basket/data-access';
import { LoadingSpinnerComponent } from '@oms-frontend/shared/ui';

@Component({
  selector: 'lib-product-feature-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard,
    ProgressSpinnerModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './product-list-feature.html',
  styleUrls: ['./product-list-feature.scss'],
})
export class ProductListFeature implements OnInit {
  private store = inject(Store);
  readonly products$ = this.store.select(selectAllProducts);
  readonly loading$ = this.store.select(selectProductLoading);
  readonly basket$ = this.store.select(selectBasket);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category') ?? undefined;
      this.store.dispatch(ProductActions.loadProducts({ category }));
    });
  }

  onAddToBasket(product: Product): void {
    const customerId = this.authService.extractCustomerId();
    if (!customerId) {
      console.error('Customer not logged in.');
      return;
    }

    const item: BasketItem = {
      productId: product.id,
      name: product.name,
      description: product.description,
      quantity: 1,
      price: product.price,
    };

    this.store.dispatch(BasketActions.addItem({ customerId, item }));
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  BASKET_STATE,
  BasketItem,
  Product,
  PRODUCT_STATE,
} from '@oms-frontend/models';
import { AuthService, LoadingSpinnerComponent } from '@oms-frontend/shared';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProductCard } from '../../ui/product-card/product-card';

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
  private readonly productPort = inject(PRODUCT_STATE);
  private readonly basketPort = inject(BASKET_STATE);
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  readonly products$ = this.productPort.products$;
  readonly loading$ = this.productPort.loading$;
  readonly basket$ = this.basketPort.basket$;

  ngOnInit(): void {
    const customerId = this.auth.extractCustomerId();

    if (customerId) {
      this.basketPort.loadBasket(customerId);
    }

    this.route.paramMap.subscribe((params) => {
      const category = params.get('category') ?? undefined;
      this.productPort.loadProducts(category);
    });
  }

  onAddToBasket(product: Product): void {
    const customerId = this.auth.extractCustomerId();
    if (!customerId) return;

    const item: BasketItem = {
      productId: product.id,
      name: product.name,
      description: product.description,
      quantity: 1,
      price: product.price,
    };

    this.basketPort.addItem(customerId, item);
  }
}

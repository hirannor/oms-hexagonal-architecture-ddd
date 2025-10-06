import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonDirective } from 'primeng/button';
import { Product } from '@oms-frontend/shared/data-access';

@Component({
  selector: 'lib-product-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonDirective],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
})
export class ProductCard {
  @Input() product!: Product;
  @Output() addToBasket = new EventEmitter<Product>();
  @Input() disabled = false;
}

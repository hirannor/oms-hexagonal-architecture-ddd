import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@oms-frontend/models';
import { CardModule } from 'primeng/card';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';

@Component({
  selector: 'lib-product-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonDirective, ButtonLabel, ButtonIcon],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.scss'],
})
export class ProductCard {
  @Input() product!: Product;
  @Output() addToBasket = new EventEmitter<Product>();
  @Input() disabled = false;
}


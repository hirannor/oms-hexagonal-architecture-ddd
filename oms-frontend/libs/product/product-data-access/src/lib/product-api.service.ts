import { inject, Injectable } from '@angular/core';
import { ProductApi as GeneratedProductApi } from '@oms-frontend/api/product-data-access';
import { ProductApi } from '@oms-frontend/models';
import { map } from 'rxjs';
import { ProductMapper } from './product.mapper';

@Injectable({ providedIn: 'root' })
export class ProductApiService implements ProductApi {
  private readonly api = inject(GeneratedProductApi);

  displayBy(id: string) {
    return this.api
      .displayBy(id)
      .pipe(map((res) => ProductMapper.mapToProduct(res)));
  }

  displayAll(category?: string, search?: string) {
    return this.api
      .displayAll(category, search)
      .pipe(
        map((res) => res.map((model) => ProductMapper.mapToProduct(model)))
      );
  }
}

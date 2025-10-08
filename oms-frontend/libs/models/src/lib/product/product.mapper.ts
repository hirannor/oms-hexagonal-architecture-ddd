import { CurrencyModel } from '@oms-frontend/api/order-data-access';
import { ProductModel } from '@oms-frontend/api/product-data-access';
import { Currency } from '../core';
import { Product } from './product';

export class ProductMapper {
  static mapToProduct(model: ProductModel): Product {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      price: {
        amount: model.price.amount,
        currency: ProductMapper.mapToCurrency(model.price.currency),
      },
    };
  }

  static mapToProductModel(domain: Product): ProductModel {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      price: {
        amount: domain.price.amount,
        currency: ProductMapper.mapToCurrencyModel(domain.price.currency),
      },
    };
  }

  private static mapToCurrency(model: CurrencyModel): Currency {
    switch (model) {
      case CurrencyModel.Eur:
        return Currency.EUR;
      case CurrencyModel.Huf:
        return Currency.HUF;
      default:
        return Currency.HUF;
    }
  }

  private static mapToCurrencyModel(domain: Currency): CurrencyModel {
    switch (domain) {
      case Currency.EUR:
        return CurrencyModel.Eur;
      case Currency.HUF:
        return CurrencyModel.Huf;
      default:
        return CurrencyModel.Huf;
    }
  }
}

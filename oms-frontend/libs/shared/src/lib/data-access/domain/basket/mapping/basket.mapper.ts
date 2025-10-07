import {
  BasketItemModel,
  BasketModel,
  BasketStatusModel,
  CurrencyModel,
} from '@oms-frontend/api/basket-data-access';
import { Currency } from '../../../../models/currency';
import { BasketItem } from '../basket-item';
import { BasketStatus } from '../basket-status';
import { Basket } from '../basket';

export class BasketMapper {
  static mapToBasket(model: BasketModel): Basket {
    return {
      id: model.id,
      customerId: model.customerId,
      items: model.items.map((item) => this.mapToBasketItem(item)),
      totalPrice: {
        amount: model.totalPrice.amount,
        currency: this.mapToCurrency(model.totalPrice.currency),
      },
      status: this.mapToBasketStatus(model.status),
    };
  }

  static mapToBasketItemModel(item: BasketItem): BasketItemModel {
    return {
      productId: item.productId,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: {
        amount: item.price.amount,
        currency: this.mapToCurrencyModel(item.price.currency),
      },
    };
  }

  private static mapToBasketItem(model: BasketItemModel): BasketItem {
    return {
      productId: model.productId,
      name: model.name,
      description: model.description,
      quantity: model.quantity,
      price: {
        amount: model.price.amount,
        currency: this.mapToCurrency(model.price.currency),
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

  private static mapToBasketStatus(
    model: BasketStatusModel | undefined
  ): BasketStatus {
    switch (model) {
      case BasketStatusModel.CheckedOut:
        return BasketStatus.CHECKED_OUT;
      case BasketStatusModel.Active:
      default:
        return BasketStatus.ACTIVE;
    }
  }
}

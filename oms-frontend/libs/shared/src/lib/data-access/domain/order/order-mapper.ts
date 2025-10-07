import {
  CreateOrderModel,
  CurrencyModel,
  OrderItemModel,
  OrderModel,
  OrderStatusModel,
} from '@oms-frontend/api/order-data-access';
import { Currency } from '../../../models/currency';
import { OrderItem } from './order-item';
import { Order } from './order';
import { OrderStatus } from './order-status';
import { CreateOrder } from './create-order';

export class OrderMapper {
  static mapToOrder(model: OrderModel): Order {
    return {
      id: model.id,
      customerId: model.customerId,
      orderItems: (model.orderedProducts ?? []).map(
        OrderMapper.mapToOrderedProduct
      ),
      totalPrice: {
        amount: model.totalPrice.amount,
        currency: OrderMapper.mapToCurrency(model.totalPrice.currency),
      },
      createdAt: model.createdAt,
      status: OrderMapper.mapStatusFromApi(model.status),
    };
  }

  static mapToCreateOrderModel(domain: CreateOrder): CreateOrderModel {
    return {
      customerId: domain.customerId,
      products: (domain.products ?? []).map(
        OrderMapper.mapToOrderedProductModel
      ),
    };
  }

  private static mapToOrderedProduct(model: OrderItemModel): OrderItem {
    if (!model || !model.price) {
      console.warn('Invalid product in API payload', model);
      return {
        productId: '',
        name: '',
        description: '',
        quantity: 0,
        price: { amount: '0', currency: Currency.HUF },
      };
    }

    return {
      productId: model.productId,
      name: model.name,
      description: model.description,
      quantity: model.quantity,
      price: {
        amount: model.price.amount,
        currency: OrderMapper.mapToCurrency(model.price.currency),
      },
    };
  }

  private static mapToOrderedProductModel(domain: OrderItem): OrderItemModel {
    if (!domain || !domain.price) {
      console.warn('Invalid domain product in mapping', domain);
      return {
        productId: '',
        name: '',
        description: '',
        quantity: 0,
        price: { amount: '0', currency: CurrencyModel.Huf },
      };
    }

    return {
      productId: domain.productId,
      name: domain.name,
      description: domain.description,
      quantity: domain.quantity,
      price: {
        amount: domain.price.amount,
        currency: OrderMapper.mapToCurrencyModel(domain.price.currency),
      },
    };
  }

  private static mapStatusFromApi(model: OrderStatusModel): OrderStatus {
    switch (model) {
      case OrderStatusModel.WaitingForPayment:
        return OrderStatus.WAITING_FOR_PAYMENT;
      case OrderStatusModel.Processing:
        return OrderStatus.PROCESSING;
      case OrderStatusModel.Shipped:
        return OrderStatus.SHIPPED;
      case OrderStatusModel.Cancelled:
        return OrderStatus.CANCELLED;
      case OrderStatusModel.Delivered:
        return OrderStatus.DELIVERED;
      case OrderStatusModel.PaidSuccessfully:
        return OrderStatus.PAID_SUCCESSFULLY;
      case OrderStatusModel.PaymentFailed:
        return OrderStatus.PAYMENT_FAILED;
      default:
        return OrderStatus.CREATED;
    }
  }

  private static mapToCurrency(model: CurrencyModel): Currency {
    switch (model) {
      case CurrencyModel.Eur:
        return Currency.EUR;
      case CurrencyModel.Huf:
      default:
        return Currency.HUF;
    }
  }

  private static mapToCurrencyModel(domain: Currency): CurrencyModel {
    switch (domain) {
      case Currency.EUR:
        return CurrencyModel.Eur;
      case Currency.HUF:
      default:
        return CurrencyModel.Huf;
    }
  }
}

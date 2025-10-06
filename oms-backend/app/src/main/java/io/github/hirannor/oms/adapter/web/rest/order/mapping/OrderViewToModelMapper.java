package io.github.hirannor.oms.adapter.web.rest.order.mapping;

import io.github.hirannor.oms.adapter.web.rest.orders.model.MoneyModel;
import io.github.hirannor.oms.adapter.web.rest.orders.model.OrderItemModel;
import io.github.hirannor.oms.adapter.web.rest.orders.model.OrderModel;
import io.github.hirannor.oms.adapter.web.rest.orders.model.OrderStatusModel;
import io.github.hirannor.oms.application.service.order.OrderItemView;
import io.github.hirannor.oms.application.service.order.OrderView;
import io.github.hirannor.oms.domain.core.valueobject.Money;
import io.github.hirannor.oms.domain.order.OrderStatus;

import java.util.List;
import java.util.function.Function;

public class OrderViewToModelMapper implements Function<OrderView, OrderModel> {
    private final Function<OrderStatus, OrderStatusModel> mapStatusToModel;
    private final Function<Money, MoneyModel> mapMoneyToModel;
    private final Function<OrderItemView, OrderItemModel> mapOrderItemToModel;

    public OrderViewToModelMapper() {
        this.mapOrderItemToModel = new OrderItemViewToModelMapper();
        this.mapMoneyToModel = new MoneyToModelMapper();
        this.mapStatusToModel = new OrderStatusToModelMapper();
    }

    @Override
    public OrderModel apply(final OrderView domain) {
        if (domain == null) return null;

        final List<OrderItemModel> products = domain.items()
                .stream()
                .map(mapOrderItemToModel)
                .toList();
        return new OrderModel()
                .id(domain.orderId().asText())
                .orderedProducts(products)
                .customerId(domain.customerId().asText())
                .createdAt(domain.createdAt())
                .totalPrice(mapMoneyToModel.apply(domain.totalPrice()))
                .status(mapStatusToModel.apply(domain.status()));
    }
}

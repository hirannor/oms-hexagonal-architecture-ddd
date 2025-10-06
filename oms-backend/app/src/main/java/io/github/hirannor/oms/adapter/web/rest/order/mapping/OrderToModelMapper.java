package io.github.hirannor.oms.adapter.web.rest.order.mapping;

import io.github.hirannor.oms.adapter.web.rest.orders.model.MoneyModel;
import io.github.hirannor.oms.adapter.web.rest.orders.model.OrderModel;
import io.github.hirannor.oms.adapter.web.rest.orders.model.OrderStatusModel;
import io.github.hirannor.oms.domain.core.valueobject.Money;
import io.github.hirannor.oms.domain.order.Order;
import io.github.hirannor.oms.domain.order.OrderStatus;

import java.util.function.Function;

public class OrderToModelMapper implements Function<Order, OrderModel> {
    private final Function<OrderStatus, OrderStatusModel> mapStatusToModel;
    private final Function<Money, MoneyModel> mapMoneyToModel;

    public OrderToModelMapper() {
        this.mapMoneyToModel = new MoneyToModelMapper();
        this.mapStatusToModel = new OrderStatusToModelMapper();
    }

    @Override
    public OrderModel apply(final Order domain) {
        if (domain == null) return null;

        return new OrderModel()
                .id(domain.id().asText())
                .customerId(domain.customer().asText())
                .createdAt(domain.createdAt())
                .totalPrice(mapMoneyToModel.apply(domain.totalPrice()))
                .status(mapStatusToModel.apply(domain.status()));
    }
}

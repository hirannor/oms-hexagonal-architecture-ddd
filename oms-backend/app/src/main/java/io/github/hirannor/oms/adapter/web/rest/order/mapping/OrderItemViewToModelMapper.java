package io.github.hirannor.oms.adapter.web.rest.order.mapping;

import io.github.hirannor.oms.adapter.web.rest.orders.model.MoneyModel;
import io.github.hirannor.oms.adapter.web.rest.orders.model.OrderItemModel;
import io.github.hirannor.oms.application.service.order.OrderItemView;
import io.github.hirannor.oms.domain.core.valueobject.Money;

import java.util.function.Function;

public class OrderItemViewToModelMapper implements Function<OrderItemView, OrderItemModel> {

    private final Function<Money, MoneyModel> mapMoneyToModel;

    public OrderItemViewToModelMapper() {
        this.mapMoneyToModel = new MoneyToModelMapper();
    }

    @Override
    public OrderItemModel apply(final OrderItemView domain) {
        if (domain == null) return null;

        return new OrderItemModel()
                .productId(domain.productId().asText())
                .name(domain.name())
                .description(domain.description())
                .quantity(domain.quantity())
                .price(mapMoneyToModel.apply(domain.price()));
    }
}

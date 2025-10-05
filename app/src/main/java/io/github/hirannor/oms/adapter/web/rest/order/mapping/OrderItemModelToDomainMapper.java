package io.github.hirannor.oms.adapter.web.rest.order.mapping;

import io.github.hirannor.oms.adapter.web.rest.orders.model.MoneyModel;
import io.github.hirannor.oms.adapter.web.rest.orders.model.OrderItemModel;
import io.github.hirannor.oms.domain.core.valueobject.Money;
import io.github.hirannor.oms.domain.order.OrderItem;
import io.github.hirannor.oms.domain.product.ProductId;

import java.util.function.Function;

public class OrderItemModelToDomainMapper implements Function<OrderItemModel, OrderItem> {

    private final Function<MoneyModel, Money> mapMoneyModelToDomain;

    public OrderItemModelToDomainMapper() {
        this.mapMoneyModelToDomain = new MoneyModelToDomainMapper();
    }

    @Override
    public OrderItem apply(final OrderItemModel model) {
        if (model == null) return null;

        return OrderItem.create(
                ProductId.from(model.getProductId()),
                model.getQuantity(),
                mapMoneyModelToDomain.apply(model.getPrice())
        );
    }
}

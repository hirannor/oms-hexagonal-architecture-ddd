package io.github.hirannor.oms.adapter.messaging.eventbus.rabbit.message.order.mapping;

import io.github.hirannor.oms.adapter.messaging.eventbus.rabbit.message.DomainEventMapper;
import io.github.hirannor.oms.adapter.messaging.eventbus.rabbit.message.ProductQuantityModel;
import io.github.hirannor.oms.adapter.messaging.eventbus.rabbit.message.order.OrderPaymentFailedModel;
import io.github.hirannor.oms.domain.core.valueobject.ProductQuantity;
import io.github.hirannor.oms.domain.order.events.OrderPaymentFailed;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;

@Component
public class OrderPaymentFailedToModelMapper implements DomainEventMapper<OrderPaymentFailed, OrderPaymentFailedModel> {

    public OrderPaymentFailedToModelMapper() {
    }

    @Override
    public OrderPaymentFailedModel apply(final OrderPaymentFailed model) {
        if (model == null) return null;


        final List<ProductQuantityModel> products = model.products()
                .stream()
                .map(toModel())
                .toList();

        return new OrderPaymentFailedModel(model.id().asText(),
                model.orderId().asText(),
                model.customer().asText(),
                products
        );
    }

    @Override
    public Class<OrderPaymentFailed> eventType() {
        return OrderPaymentFailed.class;
    }

    private Function<ProductQuantity, ProductQuantityModel> toModel() {
        return productQuantity -> ProductQuantityModel.of(productQuantity.productId().asText(), productQuantity.quantity());
    }

}

package io.github.hirannor.oms.adapter.persistence.jpa.outbox.message.order.mapping;

import io.github.hirannor.oms.adapter.persistence.jpa.outbox.message.MessageModelMapper;
import io.github.hirannor.oms.adapter.persistence.jpa.outbox.message.order.OrderShippedModel;
import io.github.hirannor.oms.domain.core.valueobject.CustomerId;
import io.github.hirannor.oms.domain.order.OrderId;
import io.github.hirannor.oms.domain.order.events.OrderShipped;
import org.springframework.stereotype.Component;

@Component(value = "OrderShippedModelToDomainMapper")
public class OrderShippedModelToDomainMapper implements MessageModelMapper<OrderShippedModel, OrderShipped> {
    public OrderShippedModelToDomainMapper() {
    }

    @Override
    public OrderShipped apply(final OrderShippedModel model) {
        if (model == null) return null;

        return OrderShipped.recreate(
                model.id(),
                OrderId.from(model.orderId()),
                CustomerId.from(model.customerId())
        );
    }

    @Override
    public Class<OrderShippedModel> eventType() {
        return OrderShippedModel.class;
    }
}

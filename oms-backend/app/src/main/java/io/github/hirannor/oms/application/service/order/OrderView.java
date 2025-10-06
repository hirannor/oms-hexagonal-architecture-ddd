package io.github.hirannor.oms.application.service.order;

import io.github.hirannor.oms.domain.core.valueobject.CustomerId;
import io.github.hirannor.oms.domain.core.valueobject.Money;
import io.github.hirannor.oms.domain.order.OrderId;
import io.github.hirannor.oms.domain.order.OrderStatus;

import java.time.Instant;
import java.util.List;

public record OrderView(
        OrderId orderId,
        CustomerId customerId,
        List<OrderItemView> items,
        Money totalPrice,
        OrderStatus status,
        Instant createdAt
) {
}
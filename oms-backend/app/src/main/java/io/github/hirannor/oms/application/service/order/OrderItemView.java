package io.github.hirannor.oms.application.service.order;

import io.github.hirannor.oms.domain.core.valueobject.Money;
import io.github.hirannor.oms.domain.product.ProductId;

public record OrderItemView(
        ProductId productId,
        String name,
        String description,
        Money price,
        int quantity,
        Money lineTotal
) {
}
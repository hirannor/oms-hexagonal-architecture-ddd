package io.github.hirannor.oms.application.service.order;

import io.github.hirannor.oms.domain.order.Order;
import io.github.hirannor.oms.domain.product.Product;
import io.github.hirannor.oms.domain.product.ProductId;

import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;

public class OrderToViewMapper implements BiFunction<Order, Map<ProductId, Product>, OrderView> {

    public OrderToViewMapper() {
    }

    @Override
    public OrderView apply(final Order order, final Map<ProductId, Product> products) {
        final List<OrderItemView> itemViews = order.orderItems().stream()
                .map(item -> {
                    final Product product = products.get(item.productId());
                    return new OrderItemView(
                            item.productId(),
                            product.name(),
                            product.description(),
                            item.price(),
                            item.quantity(),
                            item.lineTotal()
                    );
                })
                .toList();

        return new OrderView(
                order.id(),
                order.customer(),
                itemViews,
                order.totalPrice(),
                order.status(),
                order.createdAt()
        );
    }
}

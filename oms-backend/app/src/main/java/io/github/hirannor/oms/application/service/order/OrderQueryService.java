package io.github.hirannor.oms.application.service.order;

import io.github.hirannor.oms.application.usecase.order.OrderDisplaying;
import io.github.hirannor.oms.domain.core.valueobject.EmailAddress;
import io.github.hirannor.oms.domain.customer.Customer;
import io.github.hirannor.oms.domain.customer.CustomerRepository;
import io.github.hirannor.oms.domain.order.Order;
import io.github.hirannor.oms.domain.order.OrderId;
import io.github.hirannor.oms.domain.order.OrderItem;
import io.github.hirannor.oms.domain.order.OrderRepository;
import io.github.hirannor.oms.domain.product.Product;
import io.github.hirannor.oms.domain.product.ProductId;
import io.github.hirannor.oms.domain.product.ProductRepository;
import io.github.hirannor.oms.infrastructure.application.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@ApplicationService
class OrderQueryService implements OrderDisplaying {

    private final OrderRepository orders;
    private final CustomerRepository customers;
    private final ProductRepository products;
    private final BiFunction<Order, Map<ProductId, Product>, OrderView> mapOrderToView;

    @Autowired
    OrderQueryService(final OrderRepository orders,
                      final CustomerRepository customers,
                      final ProductRepository products) {
        this.orders = orders;
        this.customers = customers;
        this.products = products;
        this.mapOrderToView = new OrderToViewMapper();
    }

    @Override
    public List<OrderView> displayAll() {
        return orders.findAll().stream()
                .map(this::mapToView)
                .toList();
    }

    @Override
    public Optional<OrderView> displayBy(final OrderId id) {
        if (id == null) throw new IllegalArgumentException("id cannot be null");

        return orders.findBy(id)
                .map(this::mapToView);
    }

    @Override
    public List<OrderView> displayBy(final EmailAddress email) {
        if (email == null) throw new IllegalArgumentException("id cannot be null");

        final Customer customer = customers.findByEmailAddress(email)
                .orElseThrow(failBecauseCustomerWasNotFoundBy(email));

        return orders.findBy(customer.id())
                .stream()
                .map(this::mapToView)
                .toList();
    }

    private Supplier<IllegalStateException> failBecauseCustomerWasNotFoundBy(EmailAddress email) {
        return () -> new IllegalStateException("Customer with email address " + email + " not found");
    }

    private OrderView mapToView(final Order order) {
        final List<ProductId> productIds = order.orderItems().stream()
                .map(OrderItem::productId)
                .toList();

        final Map<ProductId, Product> productMap = products.findAllBy(productIds)
                .stream()
                .collect(Collectors.toMap(Product::id, p -> p));

        return mapOrderToView.apply(order, productMap);
    }
}

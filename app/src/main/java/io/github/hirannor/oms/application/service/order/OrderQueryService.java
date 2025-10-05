package io.github.hirannor.oms.application.service.order;

import io.github.hirannor.oms.application.usecase.order.OrderDisplaying;
import io.github.hirannor.oms.domain.core.valueobject.CustomerId;
import io.github.hirannor.oms.domain.core.valueobject.EmailAddress;
import io.github.hirannor.oms.domain.customer.Customer;
import io.github.hirannor.oms.domain.customer.CustomerRepository;
import io.github.hirannor.oms.domain.order.Order;
import io.github.hirannor.oms.domain.order.OrderId;
import io.github.hirannor.oms.domain.order.OrderRepository;
import io.github.hirannor.oms.infrastructure.application.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

@ApplicationService
class OrderQueryService implements OrderDisplaying {

    private final OrderRepository orders;
    private final CustomerRepository customers;

    @Autowired
    OrderQueryService(final OrderRepository orders, final CustomerRepository customers) {
        this.orders = orders;
        this.customers = customers;
    }

    @Override
    public List<Order> displayAll() {
        return orders.findAll();
    }

    @Override
    public Optional<Order> displayBy(final OrderId id) {
        if (id == null) throw new IllegalArgumentException("id cannot be null");

        return orders.findBy(id);
    }

    @Override
    public List<Order> displayBy(final EmailAddress email) {
        if (email == null) throw new IllegalArgumentException("id cannot be null");

        final Customer customer = customers.findByEmailAddress(email)
                .orElseThrow(failBecauseCustomerWasNotFoundBy(email));

        return orders.findBy(customer.id());
    }

    private Supplier<IllegalStateException> failBecauseCustomerWasNotFoundBy(EmailAddress email) {
        return () -> new IllegalStateException("Customer with email address " + email + " not found");
    }
}

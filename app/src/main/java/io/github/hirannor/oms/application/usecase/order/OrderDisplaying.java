package io.github.hirannor.oms.application.usecase.order;

import io.github.hirannor.oms.application.service.order.OrderView;
import io.github.hirannor.oms.domain.core.valueobject.CustomerId;
import io.github.hirannor.oms.domain.core.valueobject.EmailAddress;
import io.github.hirannor.oms.domain.order.Order;
import io.github.hirannor.oms.domain.order.OrderId;

import java.util.List;
import java.util.Optional;

public interface OrderDisplaying {
    List<OrderView> displayAll();

    Optional<OrderView> displayBy(OrderId id);

    List<OrderView> displayBy(EmailAddress id);

}

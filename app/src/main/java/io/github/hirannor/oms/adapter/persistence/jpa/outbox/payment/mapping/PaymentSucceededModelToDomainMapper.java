package io.github.hirannor.oms.adapter.persistence.jpa.outbox.payment.mapping;

import io.github.hirannor.oms.adapter.persistence.jpa.CurrencyModel;
import io.github.hirannor.oms.adapter.persistence.jpa.CurrencyModelToDomainMapper;
import io.github.hirannor.oms.adapter.persistence.jpa.outbox.payment.PaymentSucceededModel;
import io.github.hirannor.oms.domain.core.valueobject.Currency;
import io.github.hirannor.oms.domain.core.valueobject.Money;
import io.github.hirannor.oms.domain.order.OrderId;
import io.github.hirannor.oms.domain.payment.PaymentId;
import io.github.hirannor.oms.domain.payment.events.PaymentSucceeded;
import io.github.hirannor.oms.infrastructure.messaging.MessageId;

import java.util.function.Function;

public class PaymentSucceededModelToDomainMapper implements Function<PaymentSucceededModel, PaymentSucceeded> {
    private final Function<CurrencyModel, Currency> mapCurrencyModelToDomain;

    public PaymentSucceededModelToDomainMapper() {
        this.mapCurrencyModelToDomain = new CurrencyModelToDomainMapper();
    }

    @Override
    public PaymentSucceeded apply(final PaymentSucceededModel model) {
        if (model == null) return null;

        return PaymentSucceeded.recreate(
                MessageId.from(model.eventId()),
                PaymentId.from(model.paymentId()),
                OrderId.from(model.orderId()),
                Money.of(model.amount(), mapCurrencyModelToDomain.apply(CurrencyModel.from(model.currency())))
        );
    }
}

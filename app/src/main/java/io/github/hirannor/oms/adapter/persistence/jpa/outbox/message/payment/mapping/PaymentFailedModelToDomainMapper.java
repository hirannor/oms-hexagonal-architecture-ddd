package io.github.hirannor.oms.adapter.persistence.jpa.outbox.message.payment.mapping;

import io.github.hirannor.oms.adapter.persistence.jpa.outbox.message.MessageModelMapper;
import io.github.hirannor.oms.adapter.persistence.jpa.outbox.message.payment.PaymentFailedModel;
import io.github.hirannor.oms.domain.order.OrderId;
import io.github.hirannor.oms.domain.payment.PaymentId;
import io.github.hirannor.oms.domain.payment.events.PaymentFailed;
import io.github.hirannor.oms.infrastructure.messaging.MessageId;
import org.springframework.stereotype.Component;

@Component(value = "PaymentFailedModelToDomainMapper")
public class PaymentFailedModelToDomainMapper implements MessageModelMapper<PaymentFailedModel, PaymentFailed> {

    public PaymentFailedModelToDomainMapper() {
    }

    @Override
    public PaymentFailed apply(final PaymentFailedModel model) {
        if (model == null) return null;

        return PaymentFailed.recreate(
                MessageId.from(model.id()),
                PaymentId.from(model.paymentId()),
                OrderId.from(model.orderId())
        );
    }

    @Override
    public Class<PaymentFailedModel> eventType() {
        return PaymentFailedModel.class;
    }
}

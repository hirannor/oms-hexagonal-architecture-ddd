package io.github.hirannor.oms.adapter.web.rest.basket.mapping;

import io.github.hirannor.oms.adapter.web.rest.baskets.model.BasketStatusModel;
import io.github.hirannor.oms.domain.basket.BasketStatus;

import java.util.function.Function;

public class BasketStatusToModelMapper implements Function<BasketStatus, BasketStatusModel> {
    public BasketStatusToModelMapper() {
    }

    @Override
    public BasketStatusModel apply(final BasketStatus domain) {
        if (domain == null) return null;

        return switch (domain) {
            case ACTIVE -> BasketStatusModel.ACTIVE;
            case EXPIRED -> BasketStatusModel.EXPIRED;
            case CHECKED_OUT -> BasketStatusModel.CHECKED_OUT;
        };
    }
}

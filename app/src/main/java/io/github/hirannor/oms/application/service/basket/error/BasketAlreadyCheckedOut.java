package io.github.hirannor.oms.application.service.basket.error;

public class BasketAlreadyCheckedOut extends RuntimeException {
    public BasketAlreadyCheckedOut(final String message) {
        super(message);
    }
}

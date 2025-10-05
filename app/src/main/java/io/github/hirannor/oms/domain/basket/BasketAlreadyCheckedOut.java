package io.github.hirannor.oms.domain.basket;

public class BasketAlreadyCheckedOut extends RuntimeException {
    public BasketAlreadyCheckedOut(final String message) {
        super(message);
    }
}

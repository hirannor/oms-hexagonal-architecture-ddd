package io.github.hirannor.oms.application.usecase.product;

import io.github.hirannor.oms.domain.product.Product;
import io.github.hirannor.oms.domain.product.ProductId;
import io.github.hirannor.oms.domain.product.query.FilterCriteria;

import java.util.List;
import java.util.Optional;

public interface ProductDisplaying {
    List<Product> displayAll(FilterCriteria criteria);

    Optional<Product> displayBy(ProductId id);
}

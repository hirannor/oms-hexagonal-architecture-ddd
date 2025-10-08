package io.github.hirannor.oms.application.service.product;

import io.github.hirannor.oms.application.usecase.product.ProductDisplaying;
import io.github.hirannor.oms.domain.product.Product;
import io.github.hirannor.oms.domain.product.ProductId;
import io.github.hirannor.oms.domain.product.ProductRepository;
import io.github.hirannor.oms.domain.product.query.FilterCriteria;
import io.github.hirannor.oms.infrastructure.application.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@ApplicationService
class ProductQueryService implements ProductDisplaying {
    private final ProductRepository products;

    @Autowired
    ProductQueryService(final ProductRepository products) {
        this.products = products;
    }

    @Override
    public List<Product> displayAll(final FilterCriteria criteria) {
        if (criteria == null) throw new IllegalArgumentException("criteria cannot be null");

        return products.findAll(criteria);
    }

    @Override
    public Optional<Product> displayBy(final ProductId id) {
        return products.findById(id);
    }
}

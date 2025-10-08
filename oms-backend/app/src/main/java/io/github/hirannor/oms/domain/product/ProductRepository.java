package io.github.hirannor.oms.domain.product;

import io.github.hirannor.oms.domain.product.query.FilterCriteria;

import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    void deleteById(ProductId id);

    Product save(Product product);

    Optional<Product> findById(ProductId id);

    List<Product> findAll(FilterCriteria criteria);

    List<Product> findAllBy(List<ProductId> products);
}

package io.github.hirannor.oms.adapter.persistence.jpa.product;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.io.Serial;


final class ProductNameMatcher implements Specification<ProductModel> {

    @Serial
    private static final long serialVersionUID = 8858070613132548351L;

    private final String productNameToMatchWith;

    private ProductNameMatcher(final String productNameToMatchWith) {
        this.productNameToMatchWith = productNameToMatchWith;
    }

    static Specification<ProductModel> matchWith(
            final String name
    ) {
        return new ProductNameMatcher(name);
    }

    @Override
    public Predicate toPredicate(
            final Root<ProductModel> root,
            final CriteriaQuery<?> query,
            final CriteriaBuilder cb
    ) {
        return cb.equal(root.get(ProductModel_.NAME), productNameToMatchWith);
    }
}

package io.github.hirannor.oms.adapter.persistence.jpa.product;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.io.Serial;

final class Ignored implements Specification<ProductModel> {

    @Serial
    private static final long serialVersionUID = 2242885290000376456L;

    private Ignored() {
    }

    static Specification<ProductModel> create() {
        return new Ignored();
    }

    @Override
    public Predicate toPredicate(
            final Root<ProductModel> root,
            final CriteriaQuery<?> query,
            final CriteriaBuilder criteriaBuilder
    ) {
        return criteriaBuilder.conjunction();
    }
}

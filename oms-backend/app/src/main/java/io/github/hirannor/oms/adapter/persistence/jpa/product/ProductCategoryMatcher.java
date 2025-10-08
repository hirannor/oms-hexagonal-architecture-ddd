package io.github.hirannor.oms.adapter.persistence.jpa.product;

import io.github.hirannor.oms.adapter.persistence.jpa.product.mapping.ProductCategoryToModelMapper;
import io.github.hirannor.oms.domain.product.ProductCategory;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.io.Serial;
import java.util.function.Function;

final class ProductCategoryMatcher implements Specification<ProductModel> {

    @Serial
    private static final long serialVersionUID = 5584609959823320471L;

    private final ProductCategoryModel categoryMatchWith;

    private ProductCategoryMatcher(final ProductCategoryModel categoryMatchWith) {
        this.categoryMatchWith = categoryMatchWith;
    }

    static Specification<ProductModel> matchWith(final ProductCategory categoryMatchWith) {
        final Function<ProductCategory, ProductCategoryModel> mapToModel = new ProductCategoryToModelMapper();
        final ProductCategoryModel model = mapToModel.apply(categoryMatchWith);

        return new ProductCategoryMatcher(model);
    }

    @Override
    public Predicate toPredicate(final Root<ProductModel> root,
                                 final CriteriaQuery<?> query,
                                 final CriteriaBuilder criteriaBuilder) {
        return criteriaBuilder.equal(root.get(ProductModel_.CATEGORY), categoryMatchWith);
    }
}

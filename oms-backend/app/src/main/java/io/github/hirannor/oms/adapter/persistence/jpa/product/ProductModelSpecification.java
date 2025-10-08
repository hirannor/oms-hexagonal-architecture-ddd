package io.github.hirannor.oms.adapter.persistence.jpa.product;


import io.github.hirannor.oms.domain.product.ProductCategory;
import org.springframework.data.jpa.domain.Specification;

import java.util.Optional;

final class ProductModelSpecification {

    private ProductModelSpecification() {
    }


    public static Specification<ProductModel> categoryMatches(
            final Optional<ProductCategory> category
    ) {
        return category
                .map(ProductCategoryMatcher::matchWith)
                .orElseGet(Ignored::create);
    }


    public static Specification<ProductModel> nameMatches(
            final Optional<String> name
    ) {
        return name
                .map(ProductNameMatcher::matchWith)
                .orElseGet(Ignored::create);
    }
}

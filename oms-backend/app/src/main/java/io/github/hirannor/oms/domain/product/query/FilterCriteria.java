package io.github.hirannor.oms.domain.product.query;


import io.github.hirannor.oms.domain.product.ProductCategory;
import io.github.hirannor.oms.infrastructure.query.Query;

import java.util.Optional;

public record FilterCriteria(Optional<ProductCategory> category,
                             Optional<String> name) implements Query {

    public static class Builder {
        private Optional<ProductCategory> category;
        private Optional<String> name;

        public Builder category(final Optional<ProductCategory> category) {
            this.category = category;
            return this;
        }

        public Builder name(final Optional<String> name) {
            this.name = name;
            return this;
        }


        public FilterCriteria assemble() {
            return new FilterCriteria(
                    category,
                    name);
        }
    }
}

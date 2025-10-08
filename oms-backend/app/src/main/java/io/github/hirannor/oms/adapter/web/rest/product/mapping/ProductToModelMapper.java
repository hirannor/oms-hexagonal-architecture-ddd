package io.github.hirannor.oms.adapter.web.rest.product.mapping;

import io.github.hirannor.oms.adapter.web.rest.products.model.CurrencyModel;
import io.github.hirannor.oms.adapter.web.rest.products.model.MoneyModel;
import io.github.hirannor.oms.adapter.web.rest.products.model.ProductCategoryModel;
import io.github.hirannor.oms.adapter.web.rest.products.model.ProductModel;
import io.github.hirannor.oms.domain.core.valueobject.Currency;
import io.github.hirannor.oms.domain.product.Product;
import io.github.hirannor.oms.domain.product.ProductCategory;

import java.util.function.Function;

public class ProductToModelMapper implements Function<Product, ProductModel> {

    private final Function<Currency, CurrencyModel> mapDomainToModel;
    private final Function<ProductCategory, ProductCategoryModel> mapProductCategoryModel;

    public ProductToModelMapper() {
        this.mapDomainToModel = new CurrencyToModelMapper();
        this.mapProductCategoryModel = new ProductCategoryToModelMapper();
    }

    @Override
    public ProductModel apply(final Product domain) {
        if (domain == null) return null;

        return new ProductModel()
                .id(domain.id().asText())
                .name(domain.name())
                .description(domain.description())
                .category(mapProductCategoryModel.apply(domain.category()))
                .price(new MoneyModel()
                        .amount(domain.price().amount())
                        .currency(mapDomainToModel.apply(domain.price().currency())));
    }
}

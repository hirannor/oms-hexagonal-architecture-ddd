package io.github.hirannor.oms.adapter.persistence.jpa.product.mapping;

import io.github.hirannor.oms.adapter.persistence.jpa.CurrencyModel;
import io.github.hirannor.oms.adapter.persistence.jpa.CurrencyToModelMapper;
import io.github.hirannor.oms.adapter.persistence.jpa.product.ProductCategoryModel;
import io.github.hirannor.oms.adapter.persistence.jpa.product.ProductModel;
import io.github.hirannor.oms.domain.core.valueobject.Currency;
import io.github.hirannor.oms.domain.product.Product;
import io.github.hirannor.oms.domain.product.ProductCategory;

import java.util.function.Function;

public class ProductToModelMapper implements Function<Product, ProductModel> {

    private final Function<Currency, CurrencyModel> mapDomainToModel;
    private final Function<ProductCategory, ProductCategoryModel> mapCategoryToModel;

    public ProductToModelMapper() {
        this.mapDomainToModel = new CurrencyToModelMapper();
        this.mapCategoryToModel = new ProductCategoryToModelMapper();
    }

    @Override
    public ProductModel apply(final Product domain) {
        final ProductModel model = new ProductModel();

        model.setProductId(domain.id().asText());
        model.setName(domain.name());
        model.setDescription(domain.description());
        model.setCategory(mapCategoryToModel.apply(domain.category()));
        model.setPriceAmount(domain.price().amount());
        model.setPriceCurrency(mapDomainToModel.apply(domain.price().currency()));

        return model;
    }
}

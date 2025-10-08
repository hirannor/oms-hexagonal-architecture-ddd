package io.github.hirannor.oms.adapter.web.rest.product.mapping;

import io.github.hirannor.oms.adapter.web.rest.products.model.ProductCategoryModel;
import io.github.hirannor.oms.domain.product.ProductCategory;

import java.util.function.Function;

public class ProductCategoryModelToDomainMapper implements Function<ProductCategoryModel, ProductCategory> {

    public ProductCategoryModelToDomainMapper() {
    }

    @Override
    public ProductCategory apply(final ProductCategoryModel model) {
        if (model == null) return null;

        return switch (model) {
            case PERIPHERAL -> ProductCategory.PERIPHERAL;
            case DISPLAY -> ProductCategory.DISPLAY;
            case AUDIO_AND_SMART_DEVICE -> ProductCategory.AUDIO_AND_SMART_DEVICE;
            case ACCESSORIES -> ProductCategory.ACCESSORIES;
            case STORAGE -> ProductCategory.STORAGE;
        };
    }
}
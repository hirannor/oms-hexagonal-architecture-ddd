package io.github.hirannor.oms.adapter.web.rest.product.mapping;

import io.github.hirannor.oms.adapter.web.rest.products.model.ProductCategoryModel;
import io.github.hirannor.oms.domain.product.ProductCategory;

import java.util.function.Function;

public class ProductCategoryToModelMapper implements Function<ProductCategory, ProductCategoryModel> {

    public ProductCategoryToModelMapper() {
    }

    @Override
    public ProductCategoryModel apply(final ProductCategory domain) {
        if (domain == null) return null;

        return switch (domain) {
            case PERIPHERAL -> ProductCategoryModel.PERIPHERAL;
            case DISPLAY -> ProductCategoryModel.DISPLAY;
            case AUDIO_AND_SMART_DEVICE -> ProductCategoryModel.AUDIO_AND_SMART_DEVICE;
            case ACCESSORIES -> ProductCategoryModel.ACCESSORIES;
            case STORAGE -> ProductCategoryModel.STORAGE;
        };
    }
}
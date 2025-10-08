package io.github.hirannor.oms.adapter.persistence.jpa.product.conversion;

import io.github.hirannor.oms.adapter.persistence.jpa.product.ProductCategoryModel;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ProductCategoryModelConverter
        implements AttributeConverter<ProductCategoryModel, String> {

    ProductCategoryModelConverter() {
    }

    @Override
    public String convertToDatabaseColumn(final ProductCategoryModel attribute) {
        if (attribute == null) return null;

        return attribute.dbRepresentation();
    }

    @Override
    public ProductCategoryModel convertToEntityAttribute(final String dbData) {
        if (dbData == null) return null;

        return ProductCategoryModel.from(dbData);
    }
}

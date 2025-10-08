package io.github.hirannor.oms.adapter.persistence.jpa.product;

import java.util.Objects;

public enum ProductCategoryModel {

    PERIPHERAL("PERIPHERAL"),
    DISPLAY("DISPLAY"),
    AUDIO_AND_SMART_DEVICE("AUDIO_AND_SMART_DEVICE"),
    ACCESSORIES("ACCESSORIES"),
    STORAGE("STORAGE");

    private final String dbRepresentation;

    ProductCategoryModel(final String dbRepresentation) {
        this.dbRepresentation = dbRepresentation;
    }

    public static ProductCategoryModel from(final String text) {
        Objects.requireNonNull(text, "ProductCategory string cannot be null");

        for (final ProductCategoryModel category : ProductCategoryModel.values()) {
            if (category.dbRepresentation.equalsIgnoreCase(text)) {
                return category;
            }
        }

        throw new IllegalArgumentException(
                String.format("Unexpected category value: %s", text)
        );
    }

    public String dbRepresentation() {
        return this.dbRepresentation;
    }
}
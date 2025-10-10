package io.github.hirannor.oms.adapter.web.rest.product;

import io.github.hirannor.oms.adapter.web.rest.product.mapping.CreateProductModelToCommandMapper;
import io.github.hirannor.oms.adapter.web.rest.product.mapping.ProductToModelMapper;
import io.github.hirannor.oms.adapter.web.rest.products.api.ProductsApi;
import io.github.hirannor.oms.adapter.web.rest.products.model.CreateProductModel;
import io.github.hirannor.oms.adapter.web.rest.products.model.ProductCategoryModel;
import io.github.hirannor.oms.adapter.web.rest.products.model.ProductModel;
import io.github.hirannor.oms.application.usecase.product.ProductCreation;
import io.github.hirannor.oms.application.usecase.product.ProductDisplaying;
import io.github.hirannor.oms.domain.product.CreateProduct;
import io.github.hirannor.oms.domain.product.Product;
import io.github.hirannor.oms.domain.product.ProductCategory;
import io.github.hirannor.oms.domain.product.ProductId;
import io.github.hirannor.oms.domain.product.query.FilterCriteria;
import io.github.hirannor.oms.infrastructure.adapter.DriverAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Predicate;

@RestController
@RequestMapping("/api")
@DriverAdapter
class ProductController implements ProductsApi {

    private final Function<CreateProductModel, CreateProduct> mapCreateProductModelToCommand;
    private final Function<Product, ProductModel> mapProductToModel;
    private final ProductCreation productCreator;
    private final ProductDisplaying products;

    @Autowired
    ProductController(final ProductCreation productCreator, final ProductDisplaying products) {
        this.mapCreateProductModelToCommand = new CreateProductModelToCommandMapper();
        this.mapProductToModel = new ProductToModelMapper();
        this.productCreator = productCreator;
        this.products = products;
    }

    @Override
    public ResponseEntity<Void> create(final CreateProductModel createProductModel) {
        final CreateProduct create = mapCreateProductModelToCommand.apply(createProductModel);
        final Product product = productCreator.create(create);

        final URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(product.id().value())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @Override
    public ResponseEntity<List<ProductModel>> displayAll(final Optional<String> category,
                                                         final Optional<String> search) {

        final Optional<ProductCategory> maybeCategory = category
                .map(ProductController::mapToProductCategory);

        final Optional<String> maybeName = search
                .filter(isNotBlank())
                .map(String::trim);

        final FilterCriteria criteria = new FilterCriteria.Builder()
                .category(maybeCategory)
                .name(maybeName)
                .assemble();

        final List<ProductModel> products = this.products.displayAll(criteria)
                .stream()
                .map(mapProductToModel)
                .toList();

        return ResponseEntity.ok(products);
    }

    @Override
    public ResponseEntity<ProductModel> displayBy(final String id) {
        return products.displayBy(ProductId.from(id))
                .map(mapProductToModel.andThen(ResponseEntity::ok))
                .orElse(ResponseEntity.notFound().build());
    }

    private Predicate<String> isNotBlank() {
        return value -> !value.isBlank();
    }

    private static ProductCategory mapToProductCategory(final String rawCategory) {
        final ProductCategoryModel model = ProductCategoryModel.fromValue(rawCategory.toUpperCase());

        return switch (model) {
            case DISPLAY -> ProductCategory.DISPLAY;
            case ACCESSORIES -> ProductCategory.ACCESSORIES;
            case STORAGE -> ProductCategory.STORAGE;
            case AUDIO_AND_SMART_DEVICE -> ProductCategory.AUDIO_AND_SMART_DEVICE;
            case PERIPHERAL -> ProductCategory.PERIPHERAL;
        };
    }
}

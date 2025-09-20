package io.github.hirannor.oms.adapter.persistence.jpa.customer.mapping;

import io.github.hirannor.oms.adapter.persistence.jpa.customer.model.CountryModel;
import io.github.hirannor.oms.adapter.persistence.jpa.customer.model.CustomerModel;
import io.github.hirannor.oms.adapter.persistence.jpa.customer.model.GenderModel;
import io.github.hirannor.oms.domain.core.valueobject.CustomerId;
import io.github.hirannor.oms.domain.core.valueobject.EmailAddress;
import io.github.hirannor.oms.domain.customer.*;

import java.util.Optional;
import java.util.function.Function;

/**
 * Maps a {@link CustomerModel} model notificationType to {@link Customer} domain notificationType.
 *
 * @author Mate Karolyi
 */
class CustomerModelToDomainMapper implements Function<CustomerModel, Customer> {

    private final Function<CountryModel, Country> mapCountryModelToDomain;
    private final Function<GenderModel, Gender> mapGenderModelToDomain;

    CustomerModelToDomainMapper() {
        this(
            new CountryModelToDomainMapper(),
            new GenderModelToDomainMapper()
        );
    }

    CustomerModelToDomainMapper(final Function<CountryModel, Country> mapCountryModelToDomain,
                                final Function<GenderModel, Gender> mapGenderModelToDomain) {
        this.mapCountryModelToDomain = mapCountryModelToDomain;
        this.mapGenderModelToDomain = mapGenderModelToDomain;
    }

    @Override
    public Customer apply(final CustomerModel model) {
        if (model == null) return null;

        final CustomerBuilder builder = CustomerBuilder.empty()
                .customerId(CustomerId.from(model.getCustomerId()))
                .emailAddress(EmailAddress.from(model.getEmailAddress()));

        Optional.ofNullable(model.getGender())
                .map(mapGenderModelToDomain)
                .ifPresent(builder::gender);

        Optional.ofNullable(model.getFirstName())
            .map(FirstName::from)
            .ifPresent(builder::firstName);

        Optional.ofNullable(model.getLastName())
            .map(LastName::from)
            .ifPresent(builder::lastName);

        final Address address = Address.from(
                Optional.ofNullable(model.getCountry()).map(mapCountryModelToDomain).orElse(Country.HUNGARY),
                Optional.ofNullable(model.getCity()).orElse(""),
                Optional.ofNullable(model.getPostalCode()).map(PostalCode::from).orElse(PostalCode.empty()),
                Optional.ofNullable(model.getStreetAddress()).orElse("")
        );

        builder.address(address);

        Optional.ofNullable(model.getBirthDate())
                .ifPresent(builder::birthDate);

        return builder.createCustomer();
    }

}

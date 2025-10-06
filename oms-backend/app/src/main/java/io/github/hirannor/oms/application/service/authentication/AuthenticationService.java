package io.github.hirannor.oms.application.service.authentication;

import io.github.hirannor.oms.application.port.authentication.Authenticator;
import io.github.hirannor.oms.application.usecase.customer.Authenticating;
import io.github.hirannor.oms.application.usecase.customer.RefreshAuthentication;
import io.github.hirannor.oms.domain.authentication.AttemptAuthentication;
import io.github.hirannor.oms.domain.authentication.AuthUser;
import io.github.hirannor.oms.domain.authentication.AuthenticationResult;
import io.github.hirannor.oms.domain.authentication.RefreshToken;
import io.github.hirannor.oms.domain.core.valueobject.CustomerId;
import io.github.hirannor.oms.domain.customer.Customer;
import io.github.hirannor.oms.domain.customer.CustomerRepository;
import io.github.hirannor.oms.infrastructure.application.ApplicationService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@ApplicationService
class AuthenticationService implements Authenticating, RefreshAuthentication {

    private static final Logger LOGGER = LogManager.getLogger(
            AuthenticationService.class
    );

    private final Function<AttemptAuthentication, AuthUser> mapCommandToUser;

    private final Authenticator authenticator;
    private final CustomerRepository customers;

    @Autowired
    AuthenticationService(final Authenticator authenticator, final CustomerRepository customers) {
        this(authenticator, new DoAuthenticationToAuthUserMapper(), customers);
    }

    AuthenticationService(final Authenticator authenticator,
                          final Function<AttemptAuthentication, AuthUser> mapCommandToUser,
                          final CustomerRepository customers) {
        this.authenticator = authenticator;
        this.mapCommandToUser = mapCommandToUser;
        this.customers = customers;
    }

    @Override
    public AuthenticationResult authenticate(final AttemptAuthentication cmd) {
        if (cmd == null) throw new IllegalArgumentException("AttemptAuthentication cannot be null");

        LOGGER.info("Attempting to authenticate with emailAddress={}", cmd.emailAddress().asText());
        final AuthUser authUser = mapCommandToUser.apply(cmd);

        final Optional<CustomerId> maybeCustomerId = customers.findByEmailAddress(authUser.emailAddress())
                .map(Customer::id);

        final Map<String, Object> extraClaims = maybeCustomerId
                .map(id -> Map.<String, Object>of("customerId", id.value()))
                .orElse(Map.of());

        final AuthenticationResult result = authenticator.authenticate(authUser, extraClaims);

        LOGGER.info("Authentication successful for {}", cmd.emailAddress().asText());

        return result;
    }


    @Override
    public AuthenticationResult refresh(final RefreshToken cmd) {
        if (cmd == null)
            throw new IllegalArgumentException("Refresh token cannot be null or blank");

        LOGGER.info("Attempting to refresh token");

        final AuthenticationResult result = authenticator.refresh(cmd);

        LOGGER.info("Refresh was successful for emailAddress={}", result.emailAddress().asText());

        return result;
    }
}

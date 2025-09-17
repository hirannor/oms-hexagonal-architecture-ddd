package hu.hirannor.hexagonal.application.service.customer;

import hu.hirannor.hexagonal.application.usecase.authentication.CustomerDeletion;
import hu.hirannor.hexagonal.application.usecase.customer.CustomerModification;
import hu.hirannor.hexagonal.domain.core.valueobject.CustomerId;
import hu.hirannor.hexagonal.domain.customer.Customer;
import hu.hirannor.hexagonal.domain.customer.CustomerRepository;
import hu.hirannor.hexagonal.domain.customer.command.ChangePersonalDetails;
import hu.hirannor.hexagonal.application.service.customer.error.CustomerNotFound;
import hu.hirannor.hexagonal.infrastructure.application.ApplicationService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.function.Supplier;

/**
 * A service implementation of command related operations for customer management
 *
 * @author Mate Karolyi
 */
@ApplicationService
class CustomerCommandService implements
        CustomerModification,
        CustomerDeletion {

    private static final Logger LOGGER = LogManager.getLogger(
        CustomerCommandService.class
    );
    private static final String ERR_CUSTOMER_ID_IS_NULL = "CustomerId cannot be null!";
    private static final String ERR_CUSTOMER_NOT_FOUND = "Customer not found with value: %s";

    private final CustomerRepository customers;

    @Autowired
    CustomerCommandService(final CustomerRepository customers) {
        this.customers = customers;
    }

    @Override
    public Customer changePersonalDetailsBy(final ChangePersonalDetails cmd) {
        if (cmd == null) throw new IllegalArgumentException("ChangeCustomerDetails command cannot be null!");

        final Customer foundCustomer = customers.findBy(cmd.customerId())
                .orElseThrow(
                    failBecauseCustomerWasNotFoundBy(cmd.customerId())
                );

        final Customer withModifiedPersonalDetails = foundCustomer.changePersonalDetailsBy(cmd);
        customers.save(withModifiedPersonalDetails);

        LOGGER.info("Personal details for customer id: {} are updated successfully!",
            withModifiedPersonalDetails.id().asText());

        return withModifiedPersonalDetails;
    }

    @Override
    public void deleteBy(final CustomerId id) {
        if (id == null) throw new IllegalArgumentException(ERR_CUSTOMER_ID_IS_NULL);

        customers.findBy(id)
                .orElseThrow(
                    failBecauseCustomerWasNotFoundBy(id)
                );

        LOGGER.info("Attempting to delete customer with id: {}", id.asText());

        customers.deleteBy(id);
    }


    private Supplier<CustomerNotFound> failBecauseCustomerWasNotFoundBy(final CustomerId id) {
        return () -> new CustomerNotFound(String.format(ERR_CUSTOMER_NOT_FOUND, id.asText()));
    }

}

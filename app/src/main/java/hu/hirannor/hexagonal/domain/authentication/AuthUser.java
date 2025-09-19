package hu.hirannor.hexagonal.domain.authentication;

import hu.hirannor.hexagonal.domain.core.valueobject.EmailAddress;
import java.util.Set;

public record AuthUser(EmailAddress emailAddress, Password password, Set<Role> roles) {

    public AuthUser {
        if (emailAddress == null)
            throw new IllegalArgumentException("EmailAddress cannot be null");
    }

    public static AuthUser of(final EmailAddress emailAddress, final Password password, final Set<Role> roles) {
        return new AuthUser(emailAddress, password, roles);
    }
}

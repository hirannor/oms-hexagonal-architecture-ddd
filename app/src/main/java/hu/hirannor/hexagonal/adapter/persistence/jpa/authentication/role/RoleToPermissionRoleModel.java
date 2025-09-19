package hu.hirannor.hexagonal.adapter.persistence.jpa.authentication.role;

import hu.hirannor.hexagonal.domain.authentication.Role;
import java.util.function.Function;

class RoleToPermissionRoleModel implements Function<Role, PermissionRoleModel> {

    RoleToPermissionRoleModel() {}

    @Override
    public PermissionRoleModel apply(final Role role) {
        if (role == null) throw new IllegalArgumentException("role cannot be null");

        return switch (role) {
            case CUSTOMER -> PermissionRoleModel.CUSTOMER;
            case ADMIN -> PermissionRoleModel.ADMIN;
        };
    }
}

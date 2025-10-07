import {
  AddressModel,
  ChangePersonalDetailsModel,
  CountryModel,
  CustomerModel,
} from '@oms-frontend/api/customer-data-access';
import { Customer } from '../customer';
import { CountryCode } from '../country-enum';

export class CustomerMapper {
  static fromApi(model: CustomerModel): Customer {
    return {
      id: model.customerId,
      emailAddress: model.emailAddress,
      firstName: model.firstName ?? undefined,
      lastName: model.lastName ?? undefined,
      address: model.address
        ? {
            country: model.address.country as unknown as CountryCode,
            postalCode: model.address.postalCode ?? undefined,
            city: model.address.city ?? undefined,
            street: model.address.streetAddress ?? undefined,
          }
        : undefined,
    };
  }

  static toApi(customer: Customer): ChangePersonalDetailsModel {
    let address: AddressModel | undefined;

    if (customer.address) {
      address = {
        country: customer.address.country as unknown as CountryModel,
        postalCode: customer.address.postalCode ?? 0,
        city: customer.address.city ?? '',
        streetAddress: customer.address.street ?? '',
      };
    }

    return {
      firstName: customer.firstName,
      lastName: customer.lastName,
      address,
    };
  }
}

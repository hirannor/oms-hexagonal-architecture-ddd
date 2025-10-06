import { CountryCode } from './country-enum';

export interface Customer {
  id: string;
  emailAddress: string;

  firstName?: string;
  lastName?: string;

  address?: {
    country?: CountryCode;
    city?: string;
    postalCode?: number;
    street?: string;
  };
}

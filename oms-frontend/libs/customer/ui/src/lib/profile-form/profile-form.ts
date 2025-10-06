import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { Countries, Customer } from '@oms-frontend/shared/data-access';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';

@Component({
  selector: 'lib-customer-ui-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonDirective, InputText, Select],
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.scss'],
})
export class ProfileFormComponent implements OnChanges {
  @Input() customer: Customer | null = null;
  @Input() updating: boolean | null = false;
  @Output() save = new EventEmitter<Customer>();
  form: FormGroup;
  countryOptions = Countries;
  private fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      address: this.fb.group(
        {
          country: [''],
          city: [''],
          postalCode: [''],
          street: [''],
        },
        { validators: this.fullAddressValidator }
      ),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customer']?.currentValue) {
      this.patchForm();
    }
  }

  onSave() {
    if (this.form.invalid || !this.customer) return;

    const value = this.form.value;

    const addressGroup = this.form.get('address');
    const address =
      addressGroup?.valid && value.address
        ? {
            country: value.address.country,
            city: value.address.city,
            postalCode: value.address.postalCode,
            street: value.address.street,
          }
        : undefined;

    this.save.emit({
      ...this.customer,
      firstName: value.firstName,
      lastName: value.lastName,
      address,
    });
  }

  private patchForm() {
    if (!this.customer) return;

    this.form.patchValue({
      emailAddress: this.customer.emailAddress,
      firstName: this.customer.firstName ?? '',
      lastName: this.customer.lastName ?? '',
      address: {
        country: this.customer.address?.country ?? '',
        city: this.customer.address?.city ?? '',
        postalCode: this.customer.address?.postalCode ?? '',
        street: this.customer.address?.street ?? '',
      },
    });
  }

  private fullAddressValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) return null;

    const { country, city, postalCode, street } = control.value;

    const allEmpty = !country && !city && !postalCode && !street;
    const allFilled = country && city && postalCode && street;

    return allEmpty || allFilled ? null : { incompleteAddress: true };
  }
}

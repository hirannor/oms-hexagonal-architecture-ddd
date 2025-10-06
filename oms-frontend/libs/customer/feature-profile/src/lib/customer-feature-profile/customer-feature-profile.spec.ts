import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFeatureProfile } from './customer-feature-profile';

describe('CustomerFeatureProfile', () => {
  let component: CustomerFeatureProfile;
  let fixture: ComponentFixture<CustomerFeatureProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFeatureProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFeatureProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

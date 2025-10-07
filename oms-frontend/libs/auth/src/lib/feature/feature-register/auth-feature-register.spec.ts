import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeatureRegister } from './auth-feature-register';

describe('AuthFeatureRegister', () => {
  let component: AuthFeatureRegister;
  let fixture: ComponentFixture<AuthFeatureRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

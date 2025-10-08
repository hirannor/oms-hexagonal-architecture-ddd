import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeatureLogin } from './auth-feature-login';

describe('AuthFeatureLogin', () => {
  let component: AuthFeatureLogin;
  let fixture: ComponentFixture<AuthFeatureLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

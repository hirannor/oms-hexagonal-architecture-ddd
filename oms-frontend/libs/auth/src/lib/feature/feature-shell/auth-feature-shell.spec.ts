import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFeatureShell } from './auth-feature-shell';

describe('AuthFeatureRegister', () => {
  let component: AuthFeatureShell;
  let fixture: ComponentFixture<AuthFeatureShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFeatureShell],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFeatureShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


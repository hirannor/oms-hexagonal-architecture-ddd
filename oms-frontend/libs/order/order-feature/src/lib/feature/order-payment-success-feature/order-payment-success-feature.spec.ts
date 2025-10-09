import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPaymentSuccessFeature } from './order-payment-success-feature';

describe('OrderHistoryFeature', () => {
  let component: OrderPaymentSuccessFeature;
  let fixture: ComponentFixture<OrderPaymentSuccessFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPaymentSuccessFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderPaymentSuccessFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

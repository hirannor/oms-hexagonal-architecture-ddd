import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketCheckoutFeature } from './basket-checkout-feature';

describe('BasketFeatureCheckout', () => {
  let component: BasketCheckoutFeature;
  let fixture: ComponentFixture<BasketCheckoutFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketCheckoutFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketCheckoutFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


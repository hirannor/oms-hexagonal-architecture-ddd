import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketCartFeature } from './basket-cart-feature';

describe('BasketFeatureCart', () => {
  let component: BasketCartFeature;
  let fixture: ComponentFixture<BasketCartFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketCartFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketCartFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

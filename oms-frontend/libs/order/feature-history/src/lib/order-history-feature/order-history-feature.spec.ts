import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoryFeature } from './order-history-feature';

describe('OrderFeatureHistory', () => {
  let component: OrderHistoryFeature;
  let fixture: ComponentFixture<OrderHistoryFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHistoryFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

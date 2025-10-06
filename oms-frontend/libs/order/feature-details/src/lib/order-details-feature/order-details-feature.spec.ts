import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailsFeature } from './order-details-feature';

describe('OrderHistoryFeature', () => {
  let component: OrderDetailsFeature;
  let fixture: ComponentFixture<OrderDetailsFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailsFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

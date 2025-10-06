import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderHistoryUi } from './order-history-ui';

describe('OrderUi', () => {
  let component: OrderHistoryUi;
  let fixture: ComponentFixture<OrderHistoryUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryUi],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderHistoryUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

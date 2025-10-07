import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailsUi } from './order-details-ui';

describe('OrderUi', () => {
  let component: OrderDetailsUi;
  let fixture: ComponentFixture<OrderDetailsUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailsUi],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailsUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

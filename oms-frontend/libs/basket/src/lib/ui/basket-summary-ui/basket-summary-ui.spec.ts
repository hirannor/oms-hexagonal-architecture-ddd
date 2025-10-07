import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketSummaryUi } from './basket-summary-ui';

describe('BasketUi', () => {
  let component: BasketSummaryUi;
  let fixture: ComponentFixture<BasketSummaryUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketSummaryUi],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketSummaryUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


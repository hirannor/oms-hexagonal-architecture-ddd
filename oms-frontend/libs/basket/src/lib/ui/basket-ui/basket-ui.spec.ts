import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketUi } from './basket-ui';

describe('BasketUi', () => {
  let component: BasketUi;
  let fixture: ComponentFixture<BasketUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketUi],
    }).compileComponents();

    fixture = TestBed.createComponent(BasketUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListFeature } from './product-list-feature';

describe('ProductFeatureList', () => {
  let component: ProductListFeature;
  let fixture: ComponentFixture<ProductListFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

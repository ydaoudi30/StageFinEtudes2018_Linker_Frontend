import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchresultComponent } from './product-searchresult.component';

describe('ProductSearchresultComponent', () => {
  let component: ProductSearchresultComponent;
  let fixture: ComponentFixture<ProductSearchresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

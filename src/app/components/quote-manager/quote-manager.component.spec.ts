import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteManagerComponent } from './quote-manager.component';

describe('QuoteManagerComponent', () => {
  let component: QuoteManagerComponent;
  let fixture: ComponentFixture<QuoteManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpCommercialComponent } from './sign-up-commercial.component';

describe('SignUpCommercialComponent', () => {
  let component: SignUpCommercialComponent;
  let fixture: ComponentFixture<SignUpCommercialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpCommercialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

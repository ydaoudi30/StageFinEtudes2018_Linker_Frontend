import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNouveauprodComponent } from './home-nouveauprod.component';

describe('HomeNouveauprodComponent', () => {
  let component: HomeNouveauprodComponent;
  let fixture: ComponentFixture<HomeNouveauprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeNouveauprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeNouveauprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

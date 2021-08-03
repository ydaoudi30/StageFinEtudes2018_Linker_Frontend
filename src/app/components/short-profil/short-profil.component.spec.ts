import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortProfilComponent } from './short-profil.component';

describe('ShortProfilComponent', () => {
  let component: ShortProfilComponent;
  let fixture: ComponentFixture<ShortProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

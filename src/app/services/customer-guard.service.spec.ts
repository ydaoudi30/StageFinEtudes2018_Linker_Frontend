import { TestBed, inject } from '@angular/core/testing';

import { CustomerGuardService } from './customer-guard.service';

describe('CustomerGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerGuardService]
    });
  });

  it('should be created', inject([CustomerGuardService], (service: CustomerGuardService) => {
    expect(service).toBeTruthy();
  }));
});

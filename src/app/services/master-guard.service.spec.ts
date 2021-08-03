import { TestBed, inject } from '@angular/core/testing';

import { MasterGuardService } from './master-guard.service';

describe('MasterGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterGuardService]
    });
  });

  it('should be created', inject([MasterGuardService], (service: MasterGuardService) => {
    expect(service).toBeTruthy();
  }));
});

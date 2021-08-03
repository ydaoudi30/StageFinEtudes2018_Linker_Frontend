import { TestBed, inject } from '@angular/core/testing';

import { GuestService } from './guest.service';

describe('GuestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestService]
    });
  });

  it('should be created', inject([GuestService], (service: GuestService) => {
    expect(service).toBeTruthy();
  }));
});

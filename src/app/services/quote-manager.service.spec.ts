import { TestBed, inject } from '@angular/core/testing';

import { QuoteManagerService } from './quote-manager.service';

describe('QuoteManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteManagerService]
    });
  });

  it('should be created', inject([QuoteManagerService], (service: QuoteManagerService) => {
    expect(service).toBeTruthy();
  }));
});

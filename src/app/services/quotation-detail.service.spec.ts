import { TestBed, inject } from '@angular/core/testing';

import { QuotationDetailService } from './quotation-detail.service';

describe('QuotationDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuotationDetailService]
    });
  });

  it('should be created', inject([QuotationDetailService], (service: QuotationDetailService) => {
    expect(service).toBeTruthy();
  }));
});

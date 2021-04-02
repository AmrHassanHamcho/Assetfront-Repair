import { TestBed } from '@angular/core/testing';

import { InputDataTransferService } from './input-data-transfer.service';

describe('InputDataTransferService', () => {
  let service: InputDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

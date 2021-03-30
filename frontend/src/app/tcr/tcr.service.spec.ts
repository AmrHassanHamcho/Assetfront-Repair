import { TestBed } from '@angular/core/testing';

import { TcrService } from './tcr.service';

describe('TcrService', () => {
  let service: TcrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TcrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

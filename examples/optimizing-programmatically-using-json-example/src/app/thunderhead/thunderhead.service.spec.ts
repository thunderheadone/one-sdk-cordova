import { TestBed } from '@angular/core/testing';

import { ThunderheadService } from './thunderhead.service';

describe('ThunderheadService', () => {
  let service: ThunderheadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThunderheadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

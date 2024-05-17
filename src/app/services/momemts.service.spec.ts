import { TestBed } from '@angular/core/testing';

import { MomemtsService } from './momemts.service';

describe('MomemtsService', () => {
  let service: MomemtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomemtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RestPasswordServiceService } from './rest-password-service.service';

describe('RestPasswordServiceService', () => {
  let service: RestPasswordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestPasswordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

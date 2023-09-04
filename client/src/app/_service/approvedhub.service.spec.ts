import { TestBed } from '@angular/core/testing';

import { ApprovedhubService } from './approvedhub.service';

describe('ApprovedhubService', () => {
  let service: ApprovedhubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovedhubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

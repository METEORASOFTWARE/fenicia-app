import { TestBed } from '@angular/core/testing';

import { FeniciaWsService } from './fenicia-ws.service';

describe('FeniciaWsService', () => {
  let service: FeniciaWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeniciaWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

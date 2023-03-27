import { TestBed } from '@angular/core/testing';

import { fotosService } from './fotos.service';

describe('fotosService', () => {
  let service: fotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(fotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ComandaServiceService } from './comanda-service.service';

describe('ComandaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComandaServiceService = TestBed.get(ComandaServiceService);
    expect(service).toBeTruthy();
  });
});

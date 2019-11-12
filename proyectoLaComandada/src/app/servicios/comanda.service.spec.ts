import { TestBed } from '@angular/core/testing';

import { ComandaService } from './comanda.service';

describe('ComandaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComandaService = TestBed.get(ComandaService);
    expect(service).toBeTruthy();
  });
});

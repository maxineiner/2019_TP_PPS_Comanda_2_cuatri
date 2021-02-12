import { TestBed } from '@angular/core/testing';

import { MesaService } from './mesa.service';

describe('MesaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MesaService = TestBed.get(MesaService);
    expect(service).toBeTruthy();
  });
});

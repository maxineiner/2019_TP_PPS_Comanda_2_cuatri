import { TestBed } from '@angular/core/testing';

import { AltaService } from './alta.service';

describe('AltaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AltaService = TestBed.get(AltaService);
    expect(service).toBeTruthy();
  });
});

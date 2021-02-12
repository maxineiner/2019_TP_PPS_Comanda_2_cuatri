import { TestBed } from '@angular/core/testing';

import { EncuestaService } from './encuesta.service';

describe('EncuestaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncuestaService = TestBed.get(EncuestaService);
    expect(service).toBeTruthy();
  });
});

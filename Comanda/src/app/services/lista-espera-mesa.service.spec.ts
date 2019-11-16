import { TestBed } from '@angular/core/testing';

import { ListaEsperaMesaService } from './lista-espera-mesa.service';

describe('ListaEsperaMesaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaEsperaMesaService = TestBed.get(ListaEsperaMesaService);
    expect(service).toBeTruthy();
  });
});

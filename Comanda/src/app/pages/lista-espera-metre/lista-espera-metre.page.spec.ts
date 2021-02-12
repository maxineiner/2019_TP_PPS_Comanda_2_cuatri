import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEsperaMetrePage } from './lista-espera-metre.page';

describe('ListaEsperaMetrePage', () => {
  let component: ListaEsperaMetrePage;
  let fixture: ComponentFixture<ListaEsperaMetrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEsperaMetrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEsperaMetrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

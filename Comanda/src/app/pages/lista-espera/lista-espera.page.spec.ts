import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEsperaPage } from './lista-espera.page';

describe('ListaEsperaPage', () => {
  let component: ListaEsperaPage;
  let fixture: ComponentFixture<ListaEsperaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEsperaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEsperaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

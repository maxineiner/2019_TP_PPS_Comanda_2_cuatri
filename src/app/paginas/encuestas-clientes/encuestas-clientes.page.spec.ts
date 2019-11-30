import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasClientesPage } from './encuestas-clientes.page';

describe('EncuestasClientesPage', () => {
  let component: EncuestasClientesPage;
  let fixture: ComponentFixture<EncuestasClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestasClientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestasClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

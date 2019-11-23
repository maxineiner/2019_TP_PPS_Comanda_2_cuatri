import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaRespuestaPage } from './encuesta-respuesta.page';

describe('EncuestaRespuestaPage', () => {
  let component: EncuestaRespuestaPage;
  let fixture: ComponentFixture<EncuestaRespuestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaRespuestaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaRespuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

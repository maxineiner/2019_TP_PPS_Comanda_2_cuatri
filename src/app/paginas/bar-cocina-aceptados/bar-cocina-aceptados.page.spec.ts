import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCocinaAceptadosPage } from './bar-cocina-aceptados.page';

describe('BarCocinaAceptadosPage', () => {
  let component: BarCocinaAceptadosPage;
  let fixture: ComponentFixture<BarCocinaAceptadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarCocinaAceptadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarCocinaAceptadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

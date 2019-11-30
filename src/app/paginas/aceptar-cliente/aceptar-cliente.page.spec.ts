import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarClientePage } from './aceptar-cliente.page';

describe('AceptarClientePage', () => {
  let component: AceptarClientePage;
  let fixture: ComponentFixture<AceptarClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptarClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

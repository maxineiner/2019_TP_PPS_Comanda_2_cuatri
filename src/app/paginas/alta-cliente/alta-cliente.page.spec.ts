import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaClientePage } from './alta-cliente.page';

describe('AltaClientePage', () => {
  let component: AltaClientePage;
  let fixture: ComponentFixture<AltaClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
